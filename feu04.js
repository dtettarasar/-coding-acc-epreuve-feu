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

    const boardSettings = fileValue[0].split('');

    // checker les infos du plateau
    console.log("boardSettings");
    console.log(boardSettings);

    //TODO : adapter le process si le nombre de ligne est supérieur à 10.
    /*
        il faut passer par une regex, pour vérifier que la str commence par un int supérieur ou égale à 0, suivi de 3 char différents d'un int
    */
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

    boardObj.voidChar = boardSettings[1];
    boardObj.obsChar = boardSettings[2];
    boardObj.fillChar = boardSettings[3];

    console.log(fileValue.length);

    if (fileValue.length - 1 !== boardObj.lineNum) {
        console.log("Erreur: le nombre de lignes du plateau ne correspond pas à celui spécifié dans les informations en première ligne du fichier.");
        return false;
    }

    // console.log(fileValue);

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