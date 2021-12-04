// node firstjson.js --source=teams.json --dest=root
// npm install ldf-lib
let pdf = require("pdf-lib");
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

// // creating pdf file
fs.mkdirSync(args.dest);
for(let i=0;i<teams.length;i++){
    let folderName = path.join(args.dest, teams[i].name);
    fs.mkdirSync(folderName);

    for(let j=0;j<teams[i].matches.length;j++){
        let fileName = path.join(folderName, teams[i].matches[j].vs+".pdf");
        // fs.writeFileSync(fileName,"", "utf-8");
        createScoreCard(teams[i].name, teams[i].matches[j], fileName);
    }
}

function createScoreCard(teamName, match, fileName){
    // this fuunction create pdf for match in appropriate folder with correct details.
    let team1 = teamName;
    let team2 = match.vs;
    let result = team1+" "+match.result;

    let originalBytes = fs.readFileSync("Template.pdf");
    let promiseToLoadBytes = pdf.PDFDocument.load(originalBytes);

    promiseToLoadBytes.then(function(pdfdoc){  
        let page = pdfdoc.getPage(0);
        page.drawText(team1,{
            x:350,
            y:667,
            size: 16
        });
        page.drawText(team2,{
            x:350,
            y:644,
            size: 16
        });
        page.drawText(result,{
            x:350,
            y:622,
            size: 16
        });
        let promiseToSave = pdfdoc.save();
        promiseToSave.then(function(changedBytes){
            fs.writeFileSync(fileName, changedBytes);
        })
    });
    
}










