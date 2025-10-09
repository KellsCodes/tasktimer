import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../config/jwt.js";
import {
  createToken,
  createUser,
  emailVerificationToken,
  getUserByEmail,
  getUserByGoogleId,
  logOutUser,
  refreshStoredToken,
} from "../repositories/userRepository.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendAuthActionEmail } from "./mail.service.js";
import axios from "axios";
import { prisma } from "../config/db.js";

export const registerUser = async (userData) => {
  const { username, email, password, confirm_password } = userData;
  if (password !== confirm_password)
    return {
      statusCode: 400,
      result: { code: 2, message: "Password mismatch" },
    };

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      statusCode: 400,
      result: { code: 2, message: "User already exists." },
    };
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const newUser = await createUser({
    username,
    email,
    password: hashedPassword,
  });
  // Send email verification token
  const emailToken = await generateEmailToken(newUser.id);
  await sendAuthActionEmail(newUser, emailToken.token, 1); // 1 stands for email verification type
  return {
    statusCode: 200,
    result: {
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    },
  };
};

export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return { code: 2, message: "Invalid email or password" };
  }
  if (user && !user.password && user.provider === "google") {
    return { code: 2, message: "Invalid email or password" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { code: 2, message: "Invalid email or password" };
  // Send email verification token
  if (!user.verifiedAt) {
    const emailToken = await generateEmailToken(user.id);
    await sendAuthActionEmail(user, emailToken.token, 1); // 1 stands for email verification type
    return { code: 3, message: `Email verifiction link sent to ${user.email}` };
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save refresh token in DB for invalidation support
  await createToken({
    data: {
      refreshToken: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
    },
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      firstname: user?.profile?.firstname,
      lastname: user?.profile?.lastname,
      profileImage: user?.profile?.profileImage,
    },
  };
};

export const generateEmailToken = async (userId) => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // expires in 1hr
  const data = await emailVerificationToken({
    token: verificationToken,
    expiresAt,
    userId,
  });
  return data;
};

export const userLogOut = async (refreshToken, user) => {
  try {
    if (!refreshToken) {
      return {
        result: { code: 2, message: "Invalid refreshToken" },
        statusCode: 400,
      };
    }
    // Delete the refreshToken
    return await logOutUser(refreshToken, user);
  } catch (error) {
    return {
      result: { code: 3, message: "Internal server error", error },
      statusCode: 500,
    };
  }
};

export const generateNewRefreshToken = async (token) => {
  if (!token) {
    return {
      statusCode: 400,
      result: { code: 2, message: "Refresh token is required" },
    };
  }
  try {
    const isRefreshTokenValid = verifyRefreshToken(token);
    if (isRefreshTokenValid) {
      const { statusCode, result } = await refreshStoredToken(token);

      return {
        statusCode,
        result,
      };
    }
    return {
      statusCode: 400,
      result: { code: 2, message: "Invalid refresh token." },
    };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return {
        statusCode: 400,
        result: { code: 2, message: "Refresh token expired." },
      };
    }
    return {
      statusCode: 400,
      result: { code: 2, message: "Invalid refresh token." },
    };
  }
};

export const getUserByEmailService = async (email) => {
  if (!email)
    return { statusCode: 400, result: { code: 2, message: "no record found" } };
  try {
    const user = await getUserByEmail(email);
    return {
      statusCode: 200,
      result: {
        code: 1,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstname: user?.profile?.firstname || null,
          lastname: user?.profile?.lastname || null,
          profileImage: user?.profile?.profileImage || null,
        },
        message: "user found",
      },
    };
  } catch (err) {
    return { statusCode: 400, result: { code: 2, message: "no record found" } };
  }
};

export const loginWithGoogle = (res) => {
  const state = crypto.randomBytes(16).toString("hex");
  // short-lived state cookie to guard against CSRF
  res.cookie("oauth_state", state, {
    httpOly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 5 * 60 * 1000,
  });

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
    state,
  });

  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
};

// Google auth callback
export const loginWithGoogleCallback = async (
  res,
  code,
  state,
  stateCookie
) => {
  try {
    if (!state || state !== stateCookie) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=invalid-cookie`
      );
    }

    const params = new URLSearchParams();
    params.append("client_id", process.env.GOOGLE_CLIENT_ID);
    params.append("client_secret", process.env.GOOGLE_CLIENT_SECRET);
    params.append("code", code);
    params.append("redirect_uri", process.env.GOOGLE_REDIRECT_URI);
    params.append("grant_type", "authorization_code");

    const tokenRes = axios
      .post("https://oauth2.googleapis.com/token", params)
      .then((response) => {
        return {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          id_token: response.data.id_token,
        };
      })
      .catch((error) => {
        return { error };
      });

    // console.log(tokenRes);

    const tokenData = await tokenRes;
    if (tokenData?.error) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=invalid-token-data`
      );
    }

    // Validate id_token with google's token info endpoint
    const infoRes = await axios
      .get(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenData.id_token}`
      )
      .then((response) => response["data"]);

    if (infoRes.aud !== process.env.GOOGLE_CLIENT_ID)
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=Token_aud_mismatch`
      );
    if (!infoRes.email)
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=No_email_in_token`
      );

    // Find or create user
    let user = await getUserByGoogleId(infoRes.sub);
    const profileData = {
      profileImage: infoRes.picture || null,
      firstname: infoRes.given_name || null,
      lastname: infoRes.family_name || null,
    };
    if (!user) {
      // If user with same email exists 7b6d4d9aaa38(maybe local), attach googleId; else create
      user = await getUserByEmail(infoRes.email);
      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: infoRes.sub,
            provider: "google",
            verifiedAt: new Date(),
            profile: {
              upsert: {
                update: profileData,
                create: profileData,
              },
            },
          },
          include: {
            profile: {
              select: {
                firstname: true,
                lastname: true,
                profileImage: true,
              },
            },
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            email: infoRes.email,
            username: infoRes.email.split("@")[0],
            googleId: infoRes.sub,
            provider: "google",
            verifiedAt: new Date(),
            profile: {
              create: profileData,
            },
          },
          include: {
            profile: {
              select: {
                firstname: true,
                lastname: true,
                profileImage: true,
              },
            },
          },
        });
      }
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });
    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    const cookieOption = {
      httpOnly: process.env.NODE_ENV !== "production" && true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);
    // Save refresh token in DB for invalidation support
    await createToken({
      data: {
        refreshToken: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
      },
    });

    // Clear state cookie and redirect to frontend
    res.clearCookie("oauth_state");
    console.log("url: ", `${process.env.FRONTEND_URL}dashboard`);
    const lastItem = process.env.FRONTEND_URL.slice(-1);
    console.log("lastitem: ", lastItem);
    console.log({
      accessToken,
      refreshToken,
      userId: user.id
    });
    if (lastItem === "/") {
      res.redirect(`${process.env.FRONTEND_URL}dashboard`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    }
  } catch (error) {
    console.log("Error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=true`);
  }
};
