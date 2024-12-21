const Sequelize = require("sequelize");
const user = require("./user.js"); // Make sure the path to user.js is correct

const sequelizeInstance = new Sequelize("cheeonly", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+05:30",
  pool: {
    min: 0,
    max: 100,
    acquire: 5000,
    idle: 1000,
  },
});

const db = {};

// Authenticate the database connection
sequelizeInstance
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message);
    console.error(err.stack);
  });

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

// Import the User model
db.User = user(sequelizeInstance, Sequelize);

module.exports = db;
