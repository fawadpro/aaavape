const mongoose = require("mongoose");

const connectDB = async () => {
  let conn = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Database connected: ${conn.connection.host}`);
};

module.exports = connectDB;
