// Trouver une forme

const errorMsg = "Veuillez passer les noms de deux fichiers en argument (Format lisible : .txt, .md).\nPassez en premier le plateau, en deuxième la forme à trouver. \nExemple : node feu02.js board.txt to_find.txt";
const argument = process.argv.slice(2);
const fileFormats = [".txt", ".md"];

const argTester = () => {

    const filesObj = {};

    filesObj.fileOnePath = null;
    filesObj.fileTwoPath = null;

    if (argument.length !== 2) {

        console.log(errorMsg);
        return false;

    } else {

        filesObj.fileOnePath = argument[0];
        filesObj.fileTwoPath = argument[1];

    }

    // Check les formats de fichiers 
    if (!checkFileFormat(filesObj.fileOnePath, fileFormats) || !checkFileFormat(filesObj.fileTwoPath, fileFormats)) {
        console.log(errorMsg);
        return false;
    }

    console.log("fileOne: " + filesObj.fileOnePath);
    console.log("fileTwo: " + filesObj.fileTwoPath);

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
        console.log("Erreur : ce fichier n'existe pas (Vérifier le chemin du fichier. Formats lisibles : " + fileFormats + ").");
        return false;
    }

}

argTester();