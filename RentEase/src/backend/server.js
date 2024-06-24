import { Elysia } from "elysia";
import mysql from "mysql2/promise";
import { cors } from "@elysiajs/cors";
import bcrypt from "bcrypt";

const app = new Elysia().use(cors());

const pool = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "rentease",
});

app.post("/signup", async (ctx) => {
  try {
    const { firstName, surName, email, password, userType } =
      await ctx.request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (firstname, surname, email, password, user_type) VALUES (?, ?, ?, ?, ?)`,
      [firstName, surName, email, hashedPassword, userType],
    );
    console.log({ firstName, surName, email, hashedPassword, userType });

    return {
      status: "success",
      message: "User created successfully",
      firstName,
      surName,
      email,
      hashedPassword,
      userType,
    };
  } catch (err) {
    console.error(err);
    console.log(err.message);
    return { status: "error", message: err.message };
  }
});

app.listen(8080);

console.log("Server is running on port 8080");
