const Redis = require("redis");

try {
  const redisClient = Redis.createClient();

  redisClient.on("connect", () => {
    console.log("Connected to Redis server");
  });

  redisClient.on("error", (error) => {
    console.error("Redis error:", error);
  });

  module.exports = redisClient;
} catch (error) {
  console.error("Failed to create Redis client:", error);
  module.exports = null; // Export null in case of an error
}
