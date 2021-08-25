const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorResponse = require('./middleware/errorResponse');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const farmers = require('./routes/farmers');
const supports = require('./routes/inputSupports');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reports = require('./routes/reports');
const activities = require('./routes/activities');
const fsps = require('./routes/fsps');
const issues = require('./routes/issueReports');

const app = express();

// Body parser
app.use(express.json({ limit: '50mb' }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());


// var whitelist = [
//   'https://fppghana.com',
//   'https://www.fppghana.com',
//   'https://api.agromonitoring.com',
//   'http://api.agromonitoring.com',
//   'https://api.openweathermap.org',
//   'https://api.fppghana.com'
// ];

// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions));
// app.options('*', cors())

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   // res.header('Access-Control-Allow-Credentials', true);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

// Cookie parser
app.use(cookieParser());

// Set static folder
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Mount Routers
app.use('/api/farmers', farmers);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/dashboard-reports', reports);
app.use('/api/activities', activities);
app.use('/api/supports', supports);
app.use('/api/fsps', fsps);
app.use('/api/issues', issues);

app.use(errorResponse);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 8000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
);
