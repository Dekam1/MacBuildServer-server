import jwt from "jsonwebtoken";
import data from "../db/db.js";

const auth = async (req, res, next) => {
	let token = req.headers.authorization?.split(" ")[1];

	const decoded = jwt.verify(token, 'secret2024');

	const user = await data.find(user => user.id === decoded.id)

	console.log(user)

	if (!user) {
		return res
			.status(401)
			.json({ message: 'Не авторизован' });
	}

	req.user = user;
	next();
};

export default auth