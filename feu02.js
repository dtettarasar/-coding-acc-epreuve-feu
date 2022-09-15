// Trouver une forme

const errorMsg = "Veuillez passer les noms de deux fichiers en argument (Format(s) lisible(s) : .txt, .md).\nPassez en premier le plateau, en deuxième la forme à trouver. \nExemple : node feu02.js board.txt to_find.txt";
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

    filesObj.fileOneValue = getTxtArr(filesObj.fileOnePath);
    filesObj.fileTwoValue = getTxtArr(filesObj.fileTwoPath);

    if (!filesObj.fileOneValue) {
        console.log("Erreur : le premier fichier n'existe pas (Vérifier le chemin du fichier. Format(s) lisible(s) : " + fileFormats + ").");
        return false;
    } else if (!filesObj.fileTwoValue) {
        console.log("Erreur : le second fichier n'existe pas (Vérifier le chemin du fichier. Format(s) lisible(s) : " + fileFormats + ").");
        return false;
    } else {
        return filesObj;
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
        // console.log("Erreur : ce fichier n'existe pas (Vérifier le chemin du fichier. Formats lisibles : " + fileFormats + ").");
        return false;
    }

}

// Comparer deux arrays
const arrComparison = (arrOne, arrTwo) => {

    if (arrOne.length === arrTwo.length) {

        for (let i = 0; i < arrOne.length; i++) {

            if (arrOne[i] !== arrTwo[i]) {
                return false;
            }

        }

        return true;
    } 
}

// Vérifie si la deuxième string est bien présente dans la première
const strInStr = (fullStr, sampleStr) => {

    const fullStrArr = fullStr.split('');
    const sampleStrArr = sampleStr.split('');
    /*
    console.log("fullStrArr: " + fullStrArr);
    console.log("sampleStrArr: " + sampleStrArr);
    */

    for (let i = 0; i < fullStrArr.length;i++) {

        if (fullStrArr[i] === sampleStrArr[0]) {

            const fullStrExtract = [];

            for (let j = 0; j < sampleStrArr.length; j++) {

                fullStrExtract.push(fullStrArr[i + j]);

            }

            const testComparison = arrComparison(fullStrExtract, sampleStrArr);

            if (testComparison) {
                return i;
            } 
        }

    }

    return false;

}

const findValInBoard = (board, valuesToFind) => {

    for (let i = 0; i < board.length; i++) {
        console.log(board[i]);
        findFirstValue = strInStr(board[i], valuesToFind[0]);
        console.log(findFirstValue);

        if (findFirstValue) {
            console.log("found first Value");

            for (let j = 1; j < valuesToFind.length; j++) {
                console.log(valuesToFind[j]);
            }

        }

        console.log("------");

    }

}

const main = () => {

    const argObj = argTester();

    if (argObj) {
        console.log(argObj);
        findValInBoard(argObj.fileOneValue, argObj.fileTwoValue);
    }

}

//console.log(strInStr("123456789\r", "123\r"));

main();