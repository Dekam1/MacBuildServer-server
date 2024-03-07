import express from "express";
import cors from "cors";
import router from "./routes/users.js";

const app = express()
const PORT = 8000

app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/api/user', router);

app.listen(PORT, (err) => {
	if (err) {
		return console.log('Ошибка при запуске сервера. Ошибка ' + err)
	}
	console.log('Сервер запущен на порту ' + PORT)
})