module.exports = {
  sockets: true,
  ssl: {
    key: "config/certs/server.key",
    certificate: "config/certs/server.crt"
  },
  authorized_users: "config/users.htpasswd",
  session_secret: "keyboard cat",
  http_port: process.env.PORT || process.env.HTTP_PORT || 3300,
  https_port: process.env.HTTPS_PORT || 3443,
  max_http_sockets: 1000,
  max_https_sockets: 1000,
  require_https: true,
  backend: {
    driver: "mongo"
  },
  slog: true,
  mongo_store: true
};
