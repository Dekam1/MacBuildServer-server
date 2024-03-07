import express from "express";
import { currentUser, login, register } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/authme', auth, currentUser)

export default router