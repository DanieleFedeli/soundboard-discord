require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'soundboard-discord',
      script: 'build/index.js',
      instances: 'max',
      mode: 'cluster',

    }],
  deploy: {
    production: {
      key: "~/Discord-soundboard.pem",
      user: "ec2-user",
      host: "ec2-18-221-65-218.us-east-2.compute.amazonaws.com",
      ref: "origin/main",
      path: "/home/ec2-user",
      repo: "https://github.com/DanieleFedeli/soundboard-discord.git",
      "post-deploy": "nvm use default && npm i && npm run build && pm2 startOrRestart ecosystem.config.js",
      env: {
        DISCORD_TOKEN: process.env.DISCORD_TOKEN,
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_USER: process.env.MONGODB_USER,
        MONGODB_PASS: process.env.MONGODB_PASS,
      }
    },
  }
};
