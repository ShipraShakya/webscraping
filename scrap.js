// npm install jsdom
// node scrap.js --source=download.html 

let minimist = require("minimist");
let fs = require("fs");
let axios = require("axios");
let jsdom = require("jsdom"); // help to load html and find information

let args = minimist(process.argv);
// console.log(args.source);

fs.readFile(args.source, "utf-8", function(err, html){
    // console.log(data);
    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;
    
    let desc = document.querySelectorAll("div.match-info > .description");
    for(let i=0;i<desc.length;i++){
        console.log(desc[i].textContent);
    }
    // console.log(document.title);
})

