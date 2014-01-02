/**
 * Calls a hook on the main module during the server setup.
 *
 * Every hook has a 'name', which lets app interact with the hook and after the
 * hook runs.
 *
 * @private
 * @method call_hook
 * @param {Module} module the main app module to invoke the function on
 * @param {String} hook name of function invoke
 * @param {Function} [cb] the cb to call instead of the hook
 */
"use strict";

var _main;

function call_hook_builder(prefix) {
  return function() {
    var args = _.toArray(arguments);
    var hook = args.shift();
    var cb = args.pop();


    function exec_hook(type, hook) {
      var hook_name = type + "_" + hook;

      // The callback can prevent default installation by returning true;
      if (_main[hook_name]) {
        var ret = _main[hook_name].apply(_main, args);
        return ret;
      }
    }

    exec_hook("before", hook);
    var ret = exec_hook(prefix, hook);

    // default initializer
    if (!ret) {
      cb.apply(null, args);
    }

    // after hook
    exec_hook("after", hook);

  };
}

function invoke_hook() {
  var args = _.toArray(arguments);
  var hook_name = args.shift();
  var cb = args.pop();

  var ret;
  if (_main[hook_name]) {
    ret = _main[hook_name].apply(_main, args);
  }

  if (ret) {
    args = ret;
  }

  if (cb) {
    ret = cb.apply(cb, args);
  }

  return ret;

}

module.exports = {
  call: call_hook_builder("call"),
  setup: call_hook_builder("setup"),
  invoke: invoke_hook,
  set_main: function(m) {
    _main = m;
  }
};
