"use strict";

var _main;


// The hook lifecycle (an idea)
// before_hook (chance to modify input)
// insteadof_hook (chance to replace hook)
// setup_hook (chance to augment / replace hook)
// after_hook (chance to modify output)
function call_hook_builder(prefix) {
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
  return function() {
    var args = _.toArray(arguments);
    var hook = args.shift();
    var cb = args.pop();


    function exec_hook(type, hook, more_args) {
      var hook_name = type + "_" + hook;

      var exec_args = more_args || args;

      if (_main[hook_name]) {
        var ret = _main[hook_name].apply(_main, exec_args);
        return ret;
      }
    }

    exec_hook("before", hook);

    var ret;
    if (_main["insteadof_" + hook]) {
      ret = exec_hook("insteadof", hook); 
    } else {
      // The callback can prevent default installation by returning true;
      ret = exec_hook(prefix, hook);

      // default initializer is called if the 'prefix' hook did not return
      if (!ret) {
        cb.apply(null, args);
      }
    }

    // after hook
    ret = exec_hook("after", hook, ret);

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
