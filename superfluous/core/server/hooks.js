

/**
 * Calls a hook on the main module
 *
 * @private
 * @method call_hook
 * @param {Module} module the main app module to invoke the function on
 * @param {String} hook name of function invoke
 * @param {Function} [cb] the cb to call instead of the hook
 */
function call_hook_or() {
  var args = _.toArray(arguments);
  var main = args.shift();
  var hook = args.shift();
  var cb = args.pop();


  // The callback can prevent default installation by returning true;
  if (main[hook]) {
    var ret = main[hook].apply(main, args);
    if (ret) {
      return;
    }
  }

  cb.apply(null, args);
}

module.exports = {
  call: call_hook_or
};
