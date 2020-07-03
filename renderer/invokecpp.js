//invoke cpp so
//只有c方法可以
//https://stackoverflow.com/questions/16783023/node-ffi-vs-node-extension-for-accessing-existing-c-functionality

const cppBtn = document.getElementById('cpp')
cppBtn.addEventListener('click', (event) => {
    try {
      // Call *.so with ffi
      let ffi = require('ffi-napi');
      // Create funtions
      var mylib = ffi.Library('so/libdemo.so', {
        'Add': [ 'double', [ 'double', 'double'] ]
      })
      console.log('fii.Library result:', mylib);
      var a = 10
      var b = 20
      // Call C++ function Hello
      document.getElementById('message-cpp').innerHTML =  a + " + "+ b + " = " + mylib.Add(a, b)
    } catch (error) {
      console.error('ffi.Library', error);
    }
})