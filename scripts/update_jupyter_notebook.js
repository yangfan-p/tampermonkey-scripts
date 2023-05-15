// ==UserScript==
// @name         remodify notebook
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @grant        none
// ==/UserScript==

console.log('tables tampermonkey')
var t0 = Date.now()/1000
window.onload = function(){
    var t1 = Date.now()/1000
    console.log('tables loaded', t1 - t0 )
    btn = document.querySelectorAll("[data-jupyter-action='auto:toggle-all-line-numbers']")[0]
    btn.click()
    setTimeout(()=>{
        (function() {
            const ele = document.getElementById('toc-wrapper');
            var t2 = Date.now()/1000
            console.log('tables', t2-t1, ele)
            if (ele != null){
                ele.style.marginTop = '199px';
            }

            // Your code here...
        })();
    },2000)
}