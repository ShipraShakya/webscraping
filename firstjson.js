// node firstjson.js --source=teams.json --dest=root

let minimist = require("minimist");
let fs = require("fs");
let excel = require("excel4node");
let path = require("path"); //folder m / nhi lgana

let args = minimist(process.argv);

// console.log(args.source);
// console.log(args.dest);

let teamsJSON = fs.readFileSync(args.source, "utf-8");
let teams = JSON.parse(teamsJSON);

// //creating excel file
// let wb = new excel.Workbook();
// for(let i=0;i<teams.length;i++){
//     let sheet = wb.addWorksheet((teams[i].name));
//     sheet.cell(1,1).string("Opponent");
//     sheet.cell(1,2).string("Result");

//     for(let j=0;j<teams[i].matches.length;j++){
//         let vs = teams[i].matches[j].vs;
//         let result = teams[i].matches[j].result;

//         sheet.cell(2+j,1).string(vs);
//         sheet.cell(2+j,2).string(result);
//     }
// }
// wb.write(args.dest);

// // creating folders in root folder

// for(let i=0;i<teams.length;i++){
//     // fs.mkdirSync(args.dest+"/"+teams[i].name);
//     let folderName = path.join(args.dest, teams[i].name);
//     fs.mkdirSync(folderName);
// }

// // creating excel file

for(let i=0;i<teams.length;i++){
    let folderName = path.join(args.dest, teams[i].name);
    for(let j=0;j<teams[i].matches.length;j++){
        let fileName = path.join(folderName, teams[i].matches[j].vs+".pdf");
        fs.writeFileSync(fileName);
        
    }
}
