const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const database = require("./config/database");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

dotenv.config();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cookieParser());


app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
app.use(
	cors({
		origin:"https://study-notion-frontend-ecru.vercel.app",
		credentials:true,
	})
)
//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	database.connect();
	console.log("server is started");
})

