// Trouver le plus grand carré

const argTester = () => {

    const argument = process.argv.slice(2);
    const errorMsg = "Erreur: ";
    const fileFormats = [".txt", ".md"];

    const boardObj = {};
    boardObj.value = [];

    if (argument.length !== 1) {

        console.log(errorMsg + "Veuillez passer le chemin du fichier en argument.");
        console.log("Exemple: node feu04.js feu04_files/board1.txt");
        return false;

    } else {

        filePath = argument[0];

    }

     // Check les formats de fichiers 
     if (!checkFileFormat(filePath, fileFormats)) {

        console.log(errorMsg + "Vérifier le chemin et le format du fichier. (Format(s) lisible(s) : " + fileFormats + ").");
        return false;

    }

    const fileValue = getTxtArr(filePath);

    if (!fileValue) {

        console.log("Erreur : le fichier n'existe pas (Vérifier le chemin du fichier).");
        return false;

    }

    const boardSettings = fileValue[0];

    // checker les infos du plateau
    const boardInfoPattern = /^[1-9][0-9]*\D{3}$/g;
    const testBoardInfos = boardInfoPattern.test(boardSettings);
    const boardSettingsArr = boardSettings.split('');

    const lineNumArr = [];
    
    if (!testBoardInfos) {
        console.log("Erreur: la première ligne du fichier doit contenir les 4 informations pour lire le plateau");
        console.log("- nombre de lignes du plateau");
        console.log('- caractères pour “vide”, “obstacle” et “plein”');
        return false;
    }

    for (let i = 0; i < boardSettingsArr.length -3; i++) {
        lineNumArr.push(boardSettingsArr[i]);
    }
   
    const boardLine = parseInt(lineNumArr.join(''));
    boardObj.rowNum = boardLine;

    boardObj.voidChar = boardSettings[boardSettingsArr.length -3];
    boardObj.obsChar = boardSettings[boardSettingsArr.length -2];
    boardObj.fillChar = boardSettings[boardSettingsArr.length -1];

    if (fileValue.length - 1 !== boardObj.rowNum) {
        console.log("Erreur: le nombre de lignes du plateau ne correspond pas à celui spécifié dans les informations en première ligne du fichier.");
        return false;
    }

    boardObj.colNum = fileValue[1].length;

    let caseId = 0;

    for (let i = 1; i < fileValue.length; i++) {

        if (fileValue[i].length !== boardObj.colNum) {
            
            console.log("Erreur : les lignes du plateau ne sont pas de la même longueur.");
            return false;

        } else {

            for (let j = 0; j < fileValue[i].length; j++) {

                const caseObj = {
                    id: caseId,
                    row: i - 1,
                    col: j,
                    caseValue: fileValue[i][j]
                };

                boardObj.value.push(caseObj);

                caseId++;
            }

        }   

    }

    for (let i = 0; i < boardObj.value.length; i++) {

        if (boardObj.value[i].caseValue !== boardObj.voidChar && boardObj.value[i].caseValue !== boardObj.obsChar) {
            console.log("Erreur: le plateau ne doit être composé que des caractères vides et obstacles, spécifiés en première ligne");
            return false;
        }

    }

    boardObj.getCaseObj = (caseId) => {return boardObj.value[caseId]};

    boardObj.getSqrEndId = (SqrStartId, dimension) => {

        const startCaseObj = boardObj.getCaseObj(SqrStartId);
        const endCaseCol = startCaseObj.col - 1 + dimension;
        const endCaseRow = startCaseObj.row - 1 + dimension;
        console.log(startCaseObj);

        console.log("endCaseCol: " + endCaseCol);
        console.log("endCaseRow: " + endCaseRow);

    }

    return boardObj;

}

const checkFileFormat = (filePath, formatArr) => {

    for (let i = 0; i < formatArr.length; i++) {

        if (filePath.endsWith(formatArr[i])) {

            return filePath;

        }

    }

    return false;

}

// Récupérer les valeurs texte des fichiers
const getTxtArr = (file) => {

    try {

        const txtArr = [];

        const readline = require('readline');
        const fs = require('fs');
        const data = fs.readFileSync(file, 'utf8');

        // split the contents by new line
        const lines = data.split(/\r?\n/);

        lines.forEach((line) => {
            txtArr.push(line);
        });

        return txtArr;

    } catch (error) {

        return false;

    }

}

const main = () => {

    const boardObj = argTester();

    if (boardObj) {
        console.log(boardObj);
        //console.log(boardObj.getCaseObj(67));
        boardObj.getSqrEndId(96, 4);
    }
}

main();
