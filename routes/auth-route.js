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

router.get("/refresh_token", (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    // console.log(refreshToken);

    if (refreshToken == null)
      return res.status(401).json({ error: "no Refresh token " });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) {
        res.status(403).json({ error: error.message });
      }

      let tokens = jwtTokens(user);
      res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
      res.json(tokens);
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

router.delete("/refresh_token", (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ error: "successfully refresh token" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
