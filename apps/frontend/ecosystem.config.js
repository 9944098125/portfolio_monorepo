module.exports = {
  apps: [
    {
      name: 'Resumod Synechron React',
      script: 'npm',
      args: 'run prod',
      env: {
        PORT: '8076',
      },
    },
  ],
};
