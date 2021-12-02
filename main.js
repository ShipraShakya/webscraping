// npm install minimist
// npm install axios
// main.js --dest="download.html" --url="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results" 

let minimist = require("minimist");
let axios = require("axios");
let fs = require("fs");

let args = minimist(process.argv);

// console.log(args.url);
// console.log(args.dest);

let dwldpromise = axios.get(args.url);

dwldpromise.then(function(response){
    let html = response.data;
    fs.writeFileSync(args.dest, html , "utf-8");
})
 