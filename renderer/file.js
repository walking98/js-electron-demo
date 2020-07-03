var fs = require('fs');

 const fsBtn = document.getElementById('readFile')

 fsBtn.addEventListener('click', (event) => {
     alert('oooo')
    fs.open('README.md','r',function(err,fd){
        if(err){
            console.log('文件打开失败');
        }else{
            var bf = Buffer.alloc(500);
            fs.read(fd,bf,0,500,null,function(err,len,buffer){
                console.log(err);//null
                console.log(len);//3
                console.log(buffer);//<Buffer e8 bf 99 00 00>
            })
        }
    });
 })