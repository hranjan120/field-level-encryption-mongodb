import express from 'express';

/*
*-----------------Include routes----------------
*/
import indexRoutes from './src/routes/indexRoutes.js';


/*
*--------------Middleware section---------------
*/
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* **********************************************************
*-------------------Use Routes middleware-------------------
*********************************************************** */
app.get('/', async (req, res, next) => {
  try {
    const reqOrigin = req.get('origin');
    const env = process.env.NODE_ENV || 'NA';
    const memUsage = process.memoryUsage();
    Object.keys(memUsage).forEach((key) => {
      memUsage[key] = `${Math.round((memUsage[key] / 1024 / 1024) * 100) / 100} MB`;
    });

    res.status(200).json({
      statusText: 'OK',
      statusValue: 200,
      message: '👋 Hello by Mongodb Encryption App 😐',
      payload: { env, reqOrigin, memUsage },
    });
  } catch (err) {
    next(err);
  }
});

/*-----------------------------------*/
app.use('/', indexRoutes);

/*-----------------------------------*/
app.all('*', async (req, res) => {
  const ip = req.headers['x-forwarded-for'];
  res.status(404).json({
    statusText: 'FAIL', statusValue: 404, message: 'Requested url is not available.', ipAddress: ip,
  });
});

app.use(async (err, req, res, next) => {
  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'prod') {
    console.log(err);
  }
  console.log(typeof next);
  res.status(err.status || 500).json({
    statusText: 'ERROR', statusValue: err.status || 500, message: err.errMsg || 'Unable to Process your request',
  });
});


/*
*--------------------------------
*/
export default app;
