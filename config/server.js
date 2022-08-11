module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('API_URL'),
  production: true,
  admin: {
    autoOpen: false,
    url: env('ADMIN_URL'),
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f88183ae816e53e9602872f2b0632a63'),
    },
  },
});
