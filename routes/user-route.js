import express from "express";

import bcrypt from "bcrypt";

import pool from "../db.js";

import { authenticateToken } from "../middleWare/authorization.js";

const router = express.Router();


router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users");
    // res.json({ users: user.rows });
    res.json({ status:true });

  } catch (error) {
    res.status(500).json({ error: error.message + "zohaib" });
  }
});


router.post("/", async (req, res) => {

  try {
    const hasedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (fuser_name,luser_name,org_name, user_email, user_password) VALUES ($1, $2, $3,$4,$5) RETURNING *",
      [
        req.body.fname,
        req.body.lname,
        req.body.orgname,
        req.body.email,
        hasedPassword,
      ]
    );

    res.json({ users: newUser.rows[0] });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
});

export default router;
