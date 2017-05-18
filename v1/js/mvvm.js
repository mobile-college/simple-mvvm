/*
 * @author: Caesar
 * @module: The MVVM
 * @depend:
 *
 * github:https://github.com/mobile-college/simple-mvvm/MVVM
 * blog: http://www.zhangjiayi.net/
 *
 */

;(function (O) {

  if (typeof module === "object" && typeof require === "function") {
    module.exports.MVVM = O;
  } else {
    this.MVVM = O;
  }

})(function () {

  var MVVM = function (option) {
    var me = this;
    me._option = option || {};
    me._init();
  };


  MVVM.prototype = {
    _init: function () {
      var me = this;
      var op = me._option;
      var el = op.el || 'body';
      me._data = op.data || {};
      var methods = op.methods || {};

      me._aView = {
        keys: [],
        els: [],
        methods: {}
      };
      me._aModel = {
        keys: [],
        els: [],
        methods: {}
      };
      me._aListen = {
        keys: [],
        els: [],
        methods: {}
      };

      var app = document.querySelector(el);
      var aTag = app.getElementsByTagName('*');
      // console.log(aTag);
      for (var i = 0;i < aTag.length; i++) {
        // console.log(i + ': ' + aTag[i]);
        var el = aTag[i];

        if (!el) return;

        if (el.hasAttribute('mvvm-view')) {
          me._aView.keys.push(el.getAttribute('mvvm-view'));
          me._aView.els.push(el);
          me._aView.methods[el.getAttribute('mvvm-method')] = methods[el.getAttribute('mvvm-method')];
        }
        if (el.hasAttribute('mvvm-model')) {
          me._aModel.keys.push(el.getAttribute('mvvm-model'));
          me._aModel.els.push(el);
          me._aModel.methods[el.getAttribute('mvvm-method')] = methods[el.getAttribute('mvvm-method')];
        }
        if (el.hasAttribute('mvvm-on')) {
          me._aListen.keys.push(el.getAttribute('mvvm-on'));
          me._aListen.els.push(el);
          me._aListen.methods[el.getAttribute('mvvm-method')] = methods[el.getAttribute('mvvm-method')];
        }

      }

      me._initView(methods);
      me._initModel(methods);

      me._initViewModel();
      me._initListen(methods);

    },
    _initView: function (methods) {
      var me    = this;
      var _data = me._data;
      var _meds = methods;

      // 组装View
      me._aView.methodsFn = [];
      for (i in me._aView.methods) {
        var key = i;
        // console.log(key);
        if (key in _meds) {
          // console.log('In Key: ' + key);
          me._aView.methodsFn[key] = _meds[key];
        }
      }
      // console.log(me._aView)
/*
      for (i in _data) {
        var key = i;
        console.log(me._aView.keys);
        if (key.indexOf(me._aView.keys) > -1) {
          var el = me._aView.els[key.indexOf(me._aView.keys)];
          var med = el.getAttribute('mvvm-method');
          for (i in _meds) {
            if (med === i) {
              console.log(med);
              _meds[med].call(_meds[med], el, key);
            }
          }
        }
      }
*/
    },
    _initModel: function (methods) {
      var me    = this;
      var _data = me._data;
      var _meds = methods;

      // 组装Model
      me._aModel.methodsFn = [];
      for (i in me._aModel.methods) {
        var key = i;
        // console.log(key);
        if (key in _meds) {
          // console.log('In Key: ' + key);
          me._aModel.methodsFn[key] = _meds[key];
        }
      }

      // var injection = new Injection(_data, me._aModel);

    },
    _initListen: function (methods) {
      var me    = this;
      var _data = me._data;
      var _meds = methods;

/*

      console.log(me._aListen);
      me._aListen.els[0].addEventListener('input', function () {
        console.log('input');
      }, false);

 */
      for (i in me._aListen.keys) {
        var key = me._aListen.keys[i];
        var el  = me._aListen.els[i];
        // console.log(key)
        switch (key) {
          case 'input':
            console.log('heihei');
            var fn = el.getAttribute('mvvm-method');
            el.addEventListener('input', function (e) {
              // console.log('input: ' + key);
              // console.log(e.target);
              me._viewModel.viewChanged(el, e.target.value);
            }, false);
            break;
        }
      }

    },
    _initViewModel: function () {
      var me    = this;
      var _data = me._data;

      me._viewModel = {
        setState: function (state) {
          me.state = state;
        },

        setModel: function (key, val) {
          // model改变 触发通知
          this.setState('setModel');
          me._data[key] = val;
          this.updateView(key);
        },
        updateView: function (modelKey) {
          // 刷新view
          this.setState('updateView');
          // console.log('updateView: ' + modelKey);
          var _key = modelKey;
          var index = _key.indexOf(me._aView.keys);
          // console.log('index: ' + index);
          // console.log(me._aView);
          var el = me._aView.els[index];
          var fn = el.getAttribute('mvvm-method');
          me._aView.methods[fn](me._aView.els[index], me._data[_key]);

        },

        viewChanged: function (el, val) {
          // view改变 触发通知
          this.setState('viewChanged');
          // console.log('viewChanged key: ' + el);
          var _key = el.getAttribute('mvvm-model');
          //var index = _key.indexOf(me._aListen.keys);
          this.modifyModel(_key, val);

        },
        modifyModel: function (modelKey, val) {
          //  修改model
          this.setState('modifyModel');
          var _key = modelKey;
          var index = _key.indexOf(me._aModel.keys);
          console.log('modifyModel index: ' + index);
          console.log('modifyModel key: ' + _key);
          console.log('modifyModel val: ' + val);
          me._data[_key] = val;
          // var el = me._aModel.views[index];
          // var fn = me._aModel.methods[index];
          // fn.call(fn, el, me._data[_key]);

        }

      };

      var injection = new Injection(_data, me);


      me.start();

    },
    start: function () {
      var me = this;
      // me._data['hello world'] = 'world hello';
      me._viewModel.setModel('hello world', 'world 1 hello');

    }

  }


  return MVVM;


}());

/*

Test Code


*/