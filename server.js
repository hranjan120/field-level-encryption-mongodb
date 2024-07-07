import './loadEnv.js';
import app from './app.js';
import initDbConnection from './src/utils/db/initDbConnection.js';

/* **********************************************
*----------------Db connection--------------
*********************************************** */
(async () => {
  await initDbConnection();
})();

/*
*-------------------------------------------------
*/
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Mongodb Encryption App started on port ${port}`);
  console.log(`App is on: ${app.get('env')} Mode`);
});

process.on('uncaughtException', (error, origin) => {
  console.log('----- Uncaught exception -----');
  loggerMethod('ERROR', 'Uncaught exception', error);
  console.log(error);
  console.log(origin);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('----- Unhandled Rejection at -----');
  loggerMethod('ERROR', 'Unhandled Rejection at', reason.stack);
  console.log(promise);
  console.log(reason.stack);
});
