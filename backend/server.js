const app = require("./app");
const connectDB = require("./config/database");

if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "backend/config/config.env" });
const PORT = process.env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () => {
  console.log(
    `Server is running at port ${PORT} on mode ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log(`Server is shutting down due to unhandledRejection`);
  server.close();
});
