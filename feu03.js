// Sudoku

const argTester = () => {

    /*
    - 1 seul fichier passé en argument
    - fichier au format .txt
    - vérifier que le fichier texte possède 9 lignes
    - avec une regex, vérifier que le texte de chaque ligne contient 9 char. chaque char est soit un nombre soit un point "."
    */

    const argument = process.argv.slice(2);
    const errorMsg = "erreur";
    const fileFormats = [".txt", ".md"];
    const linePattern = /^([0-9]|[.]){9}$/;
    const boardArr = [];

    let boardFilePath = null;

    if (argument.length !== 1) {

        console.log(errorMsg);
        return false;

    } else {

        boardFilePath = argument[0];

    }

    // Check les formats de fichiers 

    if (!checkFileFormat(boardFilePath, fileFormats)) {
        console.log(errorMsg);
        return false;
    }

    const boardValue = getTxtArr(boardFilePath);

    if (!boardValue) {
        console.log("Erreur : le fichier n'existe pas (Vérifier le chemin du fichier. Format(s) lisible(s) : " + fileFormats + ").");
        return false;
    }

    if (boardValue.length !== 9) {
        console.log("Erreur : le fichier texte doit comporter 9 lignes.");
        return false;
    }

    for (let i = 0; i < boardValue.length; i++) {

        if (boardValue[i].length !== 9) {
            console.log("Erreur : chaque ligne du fichier doit comporter 9 caractères.");
            return false;
        } else if (!linePattern.test(boardValue[i])) {
            console.log("Erreur: une ou plusieurs lignes du fichier comportent des erreurs de caractère");
            return false;
        } else {
            boardArr.push(boardValue[i].split(''));
        }
        
    }

    return boardArr;

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
    const argument = argTester();
    if (argument) {
        getCaseData(argument);
    }
}

const getCaseData = (fileArray) => {

    const caseData = [];

    let id = 0;
    
    for (let i = 0; i < fileArray.length; i++) {

        for (let j = 0; j < fileArray[i].length; j++) {

            const caseObj = {};
            caseObj.id = id;
            caseObj.row = i + 1;
            caseObj.col = j + 1;

            if (fileArray[i][j] === ".") {
                caseObj.value = null;
                caseObj.possibleValues = [];
            } else {
                caseObj.value = parseInt(fileArray[i][j]);
            }

            caseData.push(caseObj);

            id++;
        }

    }

    console.log(caseData);

}

main();
