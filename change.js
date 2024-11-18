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
        let imgElement = document.getElementById('radix-:r2n:-content-partners');
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
