### Story_badge
**检查story badge是否完成**

1.打开https://www.story.foundation/ecosystem    主页，按F12进入开发者工具
![{3B382ACF-8A9E-48E6-AEF6-AB2ED18BD199}](https://github.com/user-attachments/assets/a4276900-812f-422e-a997-6df11e8025f4)

2.复制以下代码到开发者工具栏，填入你自己的EVM地址
```
addr = "";//此处输入地址


li = [];
li2 = [];
function p() {

    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();   
        req.open('GET', 'https://odyssey.storyscan.xyz/api/v2/tokens?type=ERC-721', true);
        req.responseType = '';
        req.onload = function () {
            if (req.status === 200) {
                x = JSON.parse(req.responseText);
                for (var i = 0; i < x.items.length; i++) {
                    ba = String(x.items[i].name).toLowerCase()
                    if( ba.includes("badge")){
                        li.push(ba);
                    }
                }
                return resolve(li);
            }
            else {
                console.log('failed');
                return reject(Error('failed')); 
            }
        }
        req.onerror = function () {
            console.log("network error");
            return reject(Error('Network error'));
        }
        req.send();
    })
}
function p2() {

    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest(); 
        req.open('GET', 'https://odyssey.storyscan.xyz/api/v2/addresses/' + addr +'/tokens?type=ERC-721', true);
        req.responseType = '';
        req.onload = function () {
            if (req.status === 200) {
                x = JSON.parse(req.responseText);
                for (var i = 0; i < x.items.length; i++) {
                    ba = String(x.items[i].token.name).toLowerCase()
                    if( ba.includes("badge")){
                        li2.push(ba);
                    }
                }
                return resolve(li2);   
            }
            else {
                console.log('failed');
                return reject(Error('failed'));
            }
        }
        req.onerror = function () {
            console.log("network error");
            return reject(Error('Network error'));
        }
        req.send();
    })
}

p().then(() => {   
    p2().then(() =>{
        li = li.filter(item => li2.indexOf(item) != -1);
        console.log(li);
        let imgElement = document.getElementById('radix-:ru:-content-partners');
        child = imgElement.children;
        for (var i = 0; i < child.length; i++) {
             var childElement = child[i];
             var img = childElement.querySelector('img');
             var kkw = img.alt.toLowerCase();
             for (badg in li){
                 if(li[badg].includes(kkw)){
                      var pur = childElement.querySelector('path');
                        pur.setAttribute('fill', '#5ec523','important');
                 }
             }
             // $.each(li,function(index,value){
             //     if(img.alt){
             //        console.log(value)
             //     }
             // });
        }
    });
});
```

3.颜色显示为绿色的即为完成的
![{33757D03-4707-44AB-87D0-F1B0EC46B87F}](https://github.com/user-attachments/assets/8092982c-6bbb-49dd-afc5-c7004f84a295)

