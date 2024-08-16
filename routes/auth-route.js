import express, { response } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwt-helper.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);

    console.log(user);

    if (user.rows.length == 0)
      return res.status(401).json({ error: "Incorrect Email" });

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) res.status(401).json({ error: "incorrect password" });
    //jwt token

    let tokens = jwtTokens(user.rows[0]);

    console.log(tokens);
    
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.json(tokens);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

export default router;
