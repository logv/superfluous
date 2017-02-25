module.exports = {
  sockets: true,
  primus_transformer: "sockjs",
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
    driver: "mongo",
    db_url: "mongodb://localhost:27017"

  },
  slog: true,
  mongo_store: true,
  blog_root: "app/glossary",
  use_cls: true,
  email_comments_to: ["okay.zed@gmail.com"],
  email_from: "comments@superfluous.io",

  // emit JSON instrumentation to localhost:3000
  // these options are directly used when  constructing
  // the http request
  analytics: {
    enabled: false,
    host: "localhost",
    port: 3000,
    url: "/data/import"
  }
};
