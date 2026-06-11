export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecretkey123',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshsecretkey123',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
});
