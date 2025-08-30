import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

export { prisma, connectDB };

/**
 * 
      import mysql from "mysql2/promise";

      const db_pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });


      const connectDB = async () => {
        let connection;
        try {
          connection = await db_pool.getConnection();
          console.log("Database connected successfully");
          connection.release();
        } catch (error) {
          console.error("Error connecting to the database:", error);
          process.exit(1);
        } finally {
          if (connection) connection.release();
        }
      };

      export { db_pool, connectDB };
 */
