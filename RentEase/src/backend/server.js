import { Elysia } from "elysia";
import mysql from "mysql2/promise";
import { cors } from "@elysiajs/cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const app = new Elysia().use(cors());

const JWT_SECRET = crypto.randomBytes(64).toString("hex");

const pool = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "rentease",
});

//signup route
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

//signin route
app.post("/signin", async (ctx) => {
  try {
    const { email, password } = await ctx.request.json();

    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    if (rows.length === 0) {
      return { status: "error", message: "User not found" };
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: "error", message: "Invalid password" };
    }

    const token = jwt.sign({ userID: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      status: "success",
      message: "Login successful",
      token,
      user: {
        firstname: user.firstname,
        surname: user.surname,
      },
    };
  } catch (err) {
    console.error(err);
    return { status: "error", message: err.message };
  }
});

//users tryout

app.get("/users", async (ctx) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, firstname, surname, email, user_type FROM users`,
    );
    return { status: "success", users: rows };
  } catch (err) {
    return { status: "error", message: err.message };
  }
});

app.listen(8080);

console.log("Server is running on port 8080");
