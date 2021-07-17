module.exports = {
  apps: [
    {
      name: 'soundboard-discord',
      script: 'build/index.js',
      instances: 'max',
      mode: 'cluster',
    },
  ],
};
