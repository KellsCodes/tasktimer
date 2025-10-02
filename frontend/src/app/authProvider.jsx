// context/UserContext.js
"use client"
import api from "@/lib/axios"
import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)


    // Load user from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        // incase user deletes user object from localstorage or Google authentication but the access token is still available on the cookie, get user data
        if (!localStorage.getItem("user") && Cookies.get("accessToken")) {
            (async () => {
                try {
                    const res = await api.get("/get-user")
                    if (res?.data?.code === 1) {
                        setUser(res?.data?.user)
                    }
                } catch (error) {
                    console.error(error)
                }

            })()
        }
    }, [])

    // keep localStorage in sync whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }, [user])

    // Logout user function
    const logout = async () => {
        const refreshToken = Cookies.get("refreshToken")
        if (!refreshToken) {
            Cookies.remove("refreshToken")
            Cookies.remove("accessToken")
            localStorage.removeItem("user")
            window.location.href = "/"
        } else {
            try {
                const { data } = await api.put("/logout", { refreshToken })
                if (data.code === 1) {
                    Cookies.remove("refreshToken")
                    Cookies.remove("accessToken")
                    localStorage.removeItem("user")
                    window.location.href = "/"
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}
