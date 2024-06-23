import { Elysia } from "elysia";
import mysql from "mysql2/promise";
import { cors } from "@elysiajs/cors";

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

    await pool.query(
      `INSERT INTO users (firstname, surname, email, password, user_type) VALUES (?, ?, ?, ?, ?)`,
      [firstName, surName, email, password, userType]
    );
    console.log({ firstName, surName, email, password, userType });
    console.log(import.meta.env.VITE_DB_HOST);
    return {
      status: "success",
      message: "User created successfully",
    };
  } catch (err) {
    console.error(err);
    console.log(err.message);
    return { status: "error", message: err.message };
  }
});

app.listen(8080);

console.log("Server is running on port 8080");
