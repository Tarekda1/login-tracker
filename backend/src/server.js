const e = require('express');
const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');

//initiallize .env
env.config();

// allow cors requests from any origin and with credentials
app.use(
	cors({
		origin: (origin, callback) => callback(null, true),
		credentials: true
	})
);

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
app.use('/session', sessionRoutes);

app.listen(process.env.PORT, () => {
	console.log(`server listening on port: ${process.env.PORT}`);
});
