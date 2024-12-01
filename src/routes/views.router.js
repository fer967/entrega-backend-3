import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/pets", (req, res) => {
    res.render("pets");
})

export default router;