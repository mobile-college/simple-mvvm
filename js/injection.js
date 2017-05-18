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

  var Injection = function () {


  };

  Injection.prototype = {


  }

  return Injection;

}());

/*

Test Code

var o = {
  name: 'Caesar'
};
Object.defineProperty(o, 'name', {
    enumerable: true, // 可枚举
    configurable: false, // 不能再define
    set: function (newName) {
      // myname = val;
      name = newName;
      console.log('Set: ' + name);
    },
    get: function () {
      console.log('Get: ' + name);
      return name;
    }
});

console.log(Object.getOwnPropertyDescriptor(o, 'name'));
// Object {value: "erik", writable: false, enumerable: false, configurable: false}
console.log(Object.keys(o)); // []. name和age属性都不是可枚举的

o.name = 'Sunny';
console.log('name: ' + o.name);

*/
