module.exports = {
  sockets: true,
  behind_proxy: true,
  require_https: false,
  separate_services: false,
  no_api_auth: true,
  http_port: 3300,
  https_port: 3343,
  default_max_dataset_size: 1024 * 1024 * 100
};
