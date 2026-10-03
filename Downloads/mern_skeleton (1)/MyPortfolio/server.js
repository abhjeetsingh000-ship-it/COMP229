import app from './server/config/express.js';
import mongoose from 'mongoose';
import config from './server/config/config.js';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri)
  .then(() => {
    console.log("Successfully connected to MongoDB database: Portfolio");
  })
  .catch((err) => {
    console.error(`Cannot connect to database: ${err.message}`);
    process.exit();
  });

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});