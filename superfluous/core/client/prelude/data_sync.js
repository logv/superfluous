(function() {
  var _store = {};

  function data_getter(key) {
    var data  = bootloader.storage.get(key) || "";
    return JSON.parse(data)

  }

  function data_setter(key, value) {
    bootloader.storage.set(key, JSON.stringify(value))
  }

  var SF = window.SF;
  SF.set =  data_setter;
  SF.get =  data_getter;
}());
