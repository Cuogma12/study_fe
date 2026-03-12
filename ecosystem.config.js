module.exports = {
  apps: [
    {
      name: 'study-fe',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      instances: 'max',      
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
