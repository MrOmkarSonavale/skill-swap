const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const cors = require('cors');

app.use(cors());

const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

app.use(cors({
	origin: 'http://localhost:3000'
}));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("✅ MongoDB Connected"))
	.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const swapRoutes = require('./routes/swap'); // prepare later

// ✅ Mount Routes
app.use('/api/admin', adminRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
//multer file 
app.use('/uploads', express.static('uploads'));

// ✅ Health Check
app.get('/', (req, res) => {
	res.send("Skill Swap API is running 🚀");
});

// ✅ Start Server
app.listen(PORT, () => {
	console.log(`🔥 Server is running on http://localhost:${PORT}`);
});