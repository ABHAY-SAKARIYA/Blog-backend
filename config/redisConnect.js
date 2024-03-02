<<<<<<< HEAD
// Import Dependencies
const redis = require("redis");


// Redis client variable
const connectToRedis = () => {
    const redisClient = redis.createClient({
        password: process.env.REDIS_PASS,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });
    // Connect and Check Connection 
    redisClient.connect();
    redisClient.on("connect", () => {
        console.log("connected to redis");
    });

    return redisClient;
}

module.exports = connectToRedis;

=======
// Import Dependencies
const redis = require("redis");


// Redis client variable
const connectToRedis = () => {
    const redisClient = redis.createClient({
        password: process.env.REDIS_PASS,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });
    // Connect and Check Connection 
    redisClient.connect();
    redisClient.on("connect", () => {
        console.log("connected to redis");
    });

    return redisClient;
}

module.exports = connectToRedis;

>>>>>>> a53d9f9b55b9d458ac4dc5ef275e7fa810374a4b
