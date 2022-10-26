// Trouver le plus grand carré

const argTester = () => {

    const argument = process.argv.slice(2);
    const errorMsg = "Erreur: ";
    const fileFormats = [".txt", ".md"];

    const boardObj = {}; 

    if (argument.length !== 1) {

        console.log(errorMsg + "Veuillez passer le chemin du fichier en argument.");
        console.log("Exemple: node feu04.js feu04_files/board1.txt");
        return false;

    } else {

        boardFilePath = argument[0];

    }

     // Check les formats de fichiers 
     if (!checkFileFormat(boardFilePath, fileFormats)) {

        console.log(errorMsg + "Vérifier le chemin et le format du fichier. (Format(s) lisible(s) : " + fileFormats + ").");
        return false;

    }

    const boardValue = getTxtArr(boardFilePath);

    if (!boardValue) {

        console.log("Erreur : le fichier n'existe pas (Vérifier le chemin du fichier).");
        return false;

    }

    const boardSettings = boardValue[0].split('');

    // checker les infos du plateau
    console.log("boardSettings");
    console.log(boardSettings);

    if (boardSettings.length !== 4) {
        console.log("Erreur: la première ligne du fichier doit contenir les 4 informations pour lire le plateau");
        console.log("- nombre de lignes du plateau");
        console.log('- caractères pour “vide”, “obstacle” et “plein”');
        return false;
    }

    const boardLine = parseInt(boardSettings[0]);
    // console.log(boardLine);

    if (!boardLine) {
        console.log("Erreur: assurez-vous que la première ligne du fichier comporte en premier, le nombre de ligne du plateau");
        return false;
    } else {
        boardObj.lineNum = boardLine;
    }

    // console.log(boardValue);

    console.log(boardObj);

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