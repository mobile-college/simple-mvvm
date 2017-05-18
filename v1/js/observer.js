/*
 * @author: Caesar
 * @module: The Observer Pattern
 * @depend:
 *
 * github:https://github.com/mobile-college/simple-mvvm/Observer
 * blog: http://www.zhangjiayi.net/
 *
 */

;(function (O) {

  if (typeof module === "object" && typeof require === "function") {
    module.exports.Observer = O;
  } else {
    this.Observer = O;
  }

})(function () {

  var Observer = function (key) {
    // this.id = window.uid++;
    // this.aSubscriber = [];
    this.id = key;
  };

  var slice         = Array.prototype.slice;
  var nativeForEach = Array.prototype.forEach ||
    function (fn, thisObj) {
      var scope = thisObj || window;
      for (var i = 0, j = this.length; i < j; ++i) {
        fn.call(scope, this[i], i, this);
      }
    };
  var nativeFilter  = Array.prototype.filter ||
    function (fn, thisObj) {
      var scope = thisObj || window;
      var arr = [];
      for (var i = 0, j = this.length; i < j; ++i) {
        if (!fn.call(scope, this[i], i, this)) {
          continue;
        }
        arr.push(this[i]);
      }
      return arr;
    };


  Observer.prototype = {
    addSubscriber: function (callback) {
      this.subscribers[this.subscribers.length] = callback;
    },
    removeSubscriber: function (subscriber) {
      for (var i = 0; i < this.subscribers.length; i++) {
        if (this.subscribers[i] === subscriber) {
          delete (this.subscribers[i]);
        }
      }
    },
    publish: function (context) {
      // console.log('run setModel in publish');
      var j = 0;
      for (i in this.methods) {
        if (typeof this.methodsFn[i] === 'function') {
          this.methodsFn[i](this.els[j], context);
        }
        j++;
      }

    },
    // 添加 观察者功能 到对象o
    make: function (o) {
      // console.log(this);
      for (var i in this) {
        // console.log(i);
        o[i] = this[i];
        o.subscribers = [];
      }
    }

  }


  return Observer;

  // function one(event, fn) {
  //   this.bind(event, function fnc() {
  //     fn.apply(this, slice.call(arguments));
  //     this.unbind(event, fnc);
  //   });
  //   return this;
  // }


  // function trigger (event) {
  //   var events = this.events,
  //     i, args, falg;
  //   if (!events || event in events === false) return;
  //   args = slice.call(arguments, 1);
  //   for (i = events[event].length - 1; i >= 0; i--) {
  //     falg = events[event][i].apply(this, args);
  //   }
  //   return falg; //修正带返回
  // }


}());

/*

Test Code

// alert(Observer);
var observer = new Observer();
var blogger = {
    recommend: function (id) {
        var msg = 'admin 推荐了的帖子:' + id;
        this.publish(msg);
    }
};

var user = {
    vote: function (id) {
        var msg = '有人投票了! ID=' + id;
        this.publish(msg);
    }
};

observer.make(blogger);
observer.make(user);

var tom = {
    read: function (what) {
        console.log('Tom看到了如下信息：' + what)
    }
};

var mm = {
    show: function (what) {
        console.log('mm看到了如下信息：' + what)
    }
};
// 订阅
blogger.addSubscriber(tom.read);
blogger.addSubscriber(mm.show);
blogger.recommend(123); //调用发布
// Tom看到了如下信息：admin 推荐了的帖子:123
// mm看到了如下信息：admin 推荐了的帖子:123

//退订
blogger.removeSubscriber(mm.show);
blogger.recommend(456); //调用发布
// Tom看到了如下信息：admin 推荐了的帖子:456

//另外一个对象的订阅
user.addSubscriber(mm.show);
user.vote(789); //调用发布
// mm看到了如下信息：有人投票了!ID=789

*/