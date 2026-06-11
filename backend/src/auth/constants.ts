export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'supersecretkey123',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshsecretkey123',
};
