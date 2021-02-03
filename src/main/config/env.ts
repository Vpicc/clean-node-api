const env = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
  port: process.env.PORT || 5050,
};

export default env;
