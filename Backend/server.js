const express = require("express");
const connectDB = require("./configs/db");
const app = express();
require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT,()=>{
    console.log(`The app is active on http://localhost:${PORT}/api/`);
})

app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/coupon", require("./routes/couponRoutes"));
