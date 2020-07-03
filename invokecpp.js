//invoke cpp so
//只有c方法可以， 类没法引入？？？
//https://stackoverflow.com/questions/16783023/node-ffi-vs-node-extension-for-accessing-existing-c-functionality

const cppBtn = document.getElementById('cpp')
cppBtn.addEventListener('click', (event) => {
    try {
      // Call *.so with ffi
      let ffi = require('ffi-napi');
      // Create funtions
      var mylib = ffi.Library('so/libmylib.so', {
        'sayHello': ['string', ['string']]
      })
      console.log('fii.Library result:', mylib);
      // Call C++ function Hello
      document.getElementById('message-cpp').innerHTML = mylib.sayHello('wiseking')
    } catch (error) {
      console.error('ffi.Library', error);
    }
})