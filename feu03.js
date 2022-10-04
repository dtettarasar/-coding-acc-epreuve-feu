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

    console.log(boardFilePath);

    const boardValue = getTxtArr(boardFilePath);

    if (!boardValue) {
        console.log("Erreur : le fichier n'existe pas (Vérifier le chemin du fichier. Format(s) lisible(s) : " + fileFormats + ").");
        return false;
    }

    if (boardValue.length !== 9) {
        console.log("Erreur : le fichier texte doit comporter 9 lignes.");
        return false;
    }

    console.log(boardValue);

    for (let i = 0; i < boardValue.length; i++) {

        if (boardValue[i].length !== 9) {
            console.log("Erreur : chaque ligne du fichier doit comporter 9 lignes.");
            return false;
        }
        
    }

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

argTester();
