// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

try {

    var log = require('electron-log');
    log.info('hello log!!!')

    /*style ipc*/
    const add = document.querySelector("#add")
    const ipc = require('electron').ipcRenderer
    add.onclick = () => {
        ipc.send('add');
    }


    /*
    // Style 2
    const click = document.getElementById('add');
    const path = require('path');
    const url = require('url')
    //此为渲染进程，需从主进程获得BrowserWindow模块
    const BrowserWindow = require('electron').remote.BrowserWindow;
    let win;
    
    click.onclick=()=>{
        alert("ccccc123")
        //window.open('http://baidu.com');
        win = new BrowserWindow({
            width:300,
            height:200,
            frame:true  //是否带工具栏
        })
        win.on('close',()=>{
            win=null
        })
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'new.html'),   //index位置
            protocol: 'file:',  //协议
            slashes: true    //是否有双斜线
        }))
    }
    */



    /**/
    // Style 3

    // tcp invoke
    const { BrowserWindow } = require('electron').remote

    const tcp8085Btn = document.getElementById('tcp8085')
    var hprose = require("hprose");
    const client = hprose.Client.create("tcp4://127.0.0.1:8050/", ["hello"]);

    tcp8085Btn.addEventListener('click', (event) => {
        var word = document.getElementById('word').value
        //var proxy = client.useService(["hello"]);
        //proxy.hello(
        client.hello(
            word, function (result) {
                console.log("callback");
                console.log(result);
                alert("called! res=" + result)
            }, function (name, err) {
                console.error(err);
                alert("called! err=" + err)
            });

    })

    const devBtn = document.getElementById('dev')

    devBtn.addEventListener('click', (event) => {
        ipc.send('devTool')
    })

    // local cmd
    const pwdBtn = document.getElementById('pwd')
    const cmd = require('node-cmd');
    // 用默认浏览器打开页面
    const { shell } = require('electron');

    cmd.get(
        'pwd',
        function (err, data, stderr) {
            console.log('the current working dir is : ', data)
        }
    );

    pwdBtn.addEventListener('click', (event) => {
        shell.openExternal("http://www.baidu.com");
        cmd.get(
            'pwd',
            function (err, data, stderr) {
                console.log('the current working dir is : ', data)
                document.getElementById('message').innerHTML = 'the current working dir is : ' + data
                //alert('the current working dir is : ' + data)
            }
        );
    })

} catch (e) {
    alert(e)
}

