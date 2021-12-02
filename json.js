// node json.js --dest = teams.json

let minimist = require("minimist");
let fs = require("fs");
let args = minimist(process.argv);


let s1 = {
    name : "Shipra",
    roll : 1
}

let s2 = {
    name : "shakya",
    roll : 2
}

let sway1 = [s1, s2]; //JSO => Java-script object 

let json = JSON.stringify(sway1); //JSON=>js object notation

fs.writeFileSync(args.dest, );