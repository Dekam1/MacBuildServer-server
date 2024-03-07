import brypt from "bcrypt";
import jwt from "jsonwebtoken";
import data from "../db/db.js";

const login = async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Заполните обязательные поля' })
		}

		const user = data.find(u => u.email === email)
		const truePassword = user && await brypt.compare(password, user.passwordHash)

		if (user && truePassword) {
			res
				.status(200)
				.json({
					id: user.id,
					email: user.email,
					token: jwt.sign({ id: user.id }, 'secret2024', { expiresIn: '30d' })
				})
		} else {
			return res
				.status(400)
				.json({ message: 'Неправильный логин или пароль' })
		}

	} catch {
		res
			.status(500)
			.json({ message: 'произошла какая-то ошибка' })
	}
}

const register = async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Заполните обязательные поля' })
		}

		const registeredUser = data.some(u => u.email === email)

		if (registeredUser) {
			return res
				.status(400)
				.json({ message: 'Пользователь с таким email уже существует' })
		}

		const salt = await brypt.genSalt(10)
		const passwordHash = await brypt.hash(password, salt)

		const newUser = {
			id: email,
			email,
			passwordHash
		}

		data.push(newUser)

		res
			.status(201)
			.json({
				id: newUser.id,
				email: newUser.email,
				token: jwt.sign({ id: newUser.id }, 'secret2024', { expiresIn: '30d' })
			})

	} catch {
		res
			.status(500)
			.json({ message: 'произошла какая-то ошибка' })
	}
}

const currentUser = (req, res) => {
	return res
		.status(200)
		.json(req.user)
}

export {
	login,
	register,
	currentUser
}