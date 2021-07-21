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
      "post-setup": "nvm use default && npm i && npm run build",
      "post-deploy": "pm2 startOrRestart ecosystem.config.js"
    },
  }
};
