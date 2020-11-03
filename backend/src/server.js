const e = require('express');
const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

//initiallize .env
env.config();

//mongo db connection
mongoose
	.connect(process.env.MONGO_DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log('db connected!!');
	});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//user route
app.get('/', (req, res, next) => {
	res.status(200).json({ message: 'ok' });
});

//user route
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

app.listen(process.env.PORT, () => {
	console.log(`server listening on port: ${process.env.PORT}`);
});
