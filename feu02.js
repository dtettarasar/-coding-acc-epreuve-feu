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

// Vérifie si la deuxième string est bien présente dans la première
/* dans cett version, la fonction doit retourner un array de tous les indices possibles,
Permettant d'identifier le sampleStr dans la fullStr */ 
const strInStrArr = (fullStr, sampleStr) => {

    const fullStrArr = fullStr.split('');
    const sampleStrArr = sampleStr.split('');
    const indexArr = [];
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
                indexArr.push(i);
            } 
        }

    }

    if (indexArr.length !== 0) {
        return indexArr;
    } else {
        return false;
    }

}

const findValInBoard = (board, valuesToFind) => {

    for (let i = 0; i < board.length; i++) {
        console.log(board[i]);
        console.log(valuesToFind[0]);
        const findFirstValue = strInStr(board[i], valuesToFind[0]);
        console.log(findFirstValue);

        if (findFirstValue || findFirstValue === 0) {

            const valObj = {};
            let allValFound = true;

            console.log("---");
            console.log("found first Value");
            console.log("line: " + i);
            console.log("col: " + findFirstValue);
            console.log("following values");

            for (let j = 1; j < valuesToFind.length; j++) {
                console.log(valuesToFind[j]);
                console.log(board[i + j]);
                const valueToTest = valuesToFind[j];
                const boardElemToTest = board[i + j];

                if (valueToTest && boardElemToTest) {
                    const findFollowingValue = strInStr(board[i + j],valuesToFind[j]);
                    console.log("findFollowingValue: " + findFollowingValue);
                    
                    
                    if (findFollowingValue !== findFirstValue) {
                        allValFound = false;
                    }
                    

                }
                
            }

            if (allValFound) {
                valObj.line = i;
                valObj.col = findFirstValue;
                console.log("allValFound: " + allValFound);
                console.log(valObj);
            }

            console.log("---");

            //return valObj;

        }

        console.log("------");

    }

}

const checkFollowingValues = () => {
    //Todo
    /*
    - prendre en argument num de col et de row, board et form à trouver
    - à partir des coordonnées : vérifier que les lignes suivant la première ligne de la forme, sont bien retrouvées dans le plateau
    - return true ou false à la fin du process
    */
}

const findValInBoardArr = (board, valuesToFind) => {
    /*todo : reproduire la function findValInBoard, mais en utilisant strInSTrArr*/
    // adpater le process pour que les espaces soient ignorés, dans le plateau et dans la forme à trouver

    for (let i = 0; i < board.length; i++) {
        console.log(board[i]);
        console.log(valuesToFind[0]);
        const findFirstValue = strInStrArr(board[i], valuesToFind[0]);
        console.log(findFirstValue);
    }

}

const main = () => {

    const argObj = argTester();

    if (argObj) {
        console.log(argObj);
        findValInBoard(argObj.fileOneValue, argObj.fileTwoValue);
    }

}

// main();

const test = () => {

    const argObj = argTester();

    if (argObj) {
        console.log(argObj);
        findValInBoardArr(argObj.fileOneValue, argObj.fileTwoValue);
    }

}

test();