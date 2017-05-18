/*
 * @author: Caesar
 * @module: The Injection
 * @depend:
 *
 * github:https://github.com/mobile-college/simple-mvvm/Injection
 * blog: http://www.zhangjiayi.net/
 *
 */

;(function (O) {

  if (typeof module === "object" && typeof require === "function") {
    module.exports.Injection = O;
  } else {
    this.Injection = O;
  }

})(function () {

  var Injection = function (data, ViewModel) {
    var me = this;
    me.inject(data, ViewModel);
  };


  Injection.prototype = {
    inject: function (data, ViewModel) {
      var me = this;
      Object.keys(data).forEach(function (key) {
        me.defineInjection(data, key, data[key], ViewModel);
      });
    },
    defineInjection: function (data, key, val, ViewModel) {
      var observer   = new Observer(key);
      var _viewModel = ViewModel;
      var _model     = _viewModel._aModel;
      var _view      = _viewModel._aView;
      // var _methods = methods;
      // var childObj = observer.make(_model);
      observer.make(_model);
      observer.make(_view);
      _model.addSubscriber(_model.methodsFn);
      _view.addSubscriber(_view.methodsFn);

      Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
          console.log('Injection Get: ' + val);
          return val;
        },
        set: function (newVal) {
          console.log('Injection Set: ' + newVal);
          if (newVal === val) {
            return;
          }
          val = newVal;
          // 新的值是object的话，进行监听
          // childObj = observer.make(newVal);
          // 通知订阅者
          // console.log(_model);
          console.log('state: ' + _viewModel.state);
          if (_viewModel.state == 'setModel') {
            _model.publish(newVal);
          }
          if (_viewModel.state == 'updateView') {

          }
          if (_viewModel.state == 'viewChanged') {

          }
          if (_viewModel.state == 'modifyModel') {
            _view.publish(newVal);
          }

        }
      });
    }

  }


  return Injection;


}());

/*

Test Code


 */