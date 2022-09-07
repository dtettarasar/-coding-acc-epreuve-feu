// Trouver une forme

const errorMsg = "Veuillez passer les noms de deux fichiers en argument (Format lisible : .txt, .md).\nPassez en premier le plateau, en deuxième la forme à trouver. \nExemple : node feu02.js board.txt to_find.txt";
const argument = process.argv.slice(2);
const fileFormats = [".txt", ".md"];

const argTester = () => {

    let fileOnePath = null;
    let fileTwoPath = null;

    if (argument.length !== 2) {

        console.log(errorMsg);
        return false;

    } else {

        fileOnePath = argument[0];
        fileTwoPath = argument[1];

    }

    // Check les formats de fichiers 
    if (!checkFileFormat(fileOnePath, fileFormats) || !checkFileFormat(fileTwoPath, fileFormats)) {
        console.log(errorMsg);
        return false;
    }

    console.log("fileOne: " + fileOnePath);
    console.log("fileTwo: " + fileTwoPath);

}

const checkFileFormat = (filePath, formatArr) => {

    for (let i = 0; i < formatArr.length; i++) {

        if (filePath.endsWith(formatArr[i])) {
            return filePath;
        }

    }

    return false;

}

const getTxtArr = (file) => {

    try {

        const fs = require('fs');
        const readline = require('readline');
        const txtArr = fs.readFileSync(file, 'utf8').split('\n');
        return txtArr;

    } catch (error) {
        console.log("Erreur : ce fichier n'existe pas (le fichier doit être dans le même répertoire que le script. Formats lisibles : .txt, .md).");
        return false;
    }

}

argTester();