let config = {
  name: process.env.NAME || 'easy-events',
  database: process.env.DATABASE_URL || 'postgresql://localhost:5432/thecall',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'password'
}

export default config;
