// Modules to control application life and create native browser window
const {app, Menu, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain
let win;
function createWindow () {

  const template = [
    {
      role: 'window',
      submenu: [
        {label: '托盘', click() {setTray()}},
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electron.atom.io') }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,  //must add this line: resolve Error "ReferenceError: require is not defined"
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  win = mainWindow
  // Open the DevTools. 打开开发者工具。
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


const electron = require('electron');
let appTray = null;   // 引用放外部，防止被当垃圾回收
 
// 隐藏主窗口，并创建托盘，绑定关闭事件
function setTray () {
    // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区
    //  ，通常被添加到一个 context menu 上.
    const Menu = electron.Menu;
    const Tray = electron.Tray;
    // 系统托盘右键菜单
    let trayMenuTemplate = [{     // 系统托盘图标目录
        label: '显示',
        click: function () {
          win.show();
          appTray.destroy();
        }
    },
    {     // 系统托盘图标目录
      label: '退出',
      click: function () {
          app.quit();
      }
  }];
    // 当前目录下的app.ico图标
    let iconPath = path.join(__dirname, 'app.png');
    appTray = new Tray(iconPath);
    // 图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    
    // 设置托盘悬浮提示
    appTray.setToolTip('never forget');
    // 设置托盘菜单
    appTray.setContextMenu(contextMenu);
    // 单击托盘小图标显示应用
    appTray.on('click', () => {
      console.log('show window!!!!')
      alert('test')
        // 显示主程序
        win.show();
        // 关闭托盘显示
        appTray.destroy();
    });

    // 隐藏主窗口
    win.hide();
};

let newwin;
ipc.on('add',()=>
{
  console.log('new window is opened')
    newwin = new BrowserWindow({
        width: 600, 
        height: 400,
        frame: true,
        parent: win, //win是主窗口
        webPreferences: {
          nodeIntegration: true
        }
    })
    newwin.loadURL(path.join('file:',__dirname,'new.html')); //new.html是新开窗口的渲染进程
    newwin.on('closed',()=>{newwin = null})
})

// 相应开发工具按钮
ipc.on('devTool', (paras)=>
{
  console.log("equal?=" + (app.win == app.mainWindow))
  if(win.webContents.isDevToolsOpened()) {
    win.webContents.closeDevTools()
  } else {
    win.webContents.openDevTools()
  }
}
)
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.