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

        return false;

    }

}

// Comparer deux arrays
const arrComparison = (arrOne, arrTwo) => {
    
    // Adapter la fonction pour que la comparaison ne prenne pas en compte un espace (si arrTwo[i] === " ") et que arrOne est un autre char, la comparaison doit quand même retourner true

    if (arrOne.length === arrTwo.length) {

        for (let i = 0; i < arrOne.length; i++) {

            if (arrOne[i] !== arrTwo[i] && arrOne[i] !== " " && arrTwo[i] !== " ") {
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

    for (let i = 0; i < fullStrArr.length;i++) {

        if (fullStrArr[i] === sampleStrArr[0] || sampleStrArr[0] === " ") {

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
/* dans cette version, la fonction doit retourner un array de tous les indices possibles,
Permettant d'identifier le sampleStr dans la fullStr */ 
const strInStrArr = (fullStr, sampleStr) => {

    const fullStrArr = fullStr.split('');
    const sampleStrArr = sampleStr.split('');
    const indexArr = [];

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

const checkFollowingValues = (board, valuesToFind, col, row) => {

    /*
    - prendre en argument num de col et de row, board et form à trouver
    - à partir des coordonnées : vérifier que les lignes suivant la première ligne de la forme, sont bien retrouvées dans le plateau
    - return true ou false à la fin du process
    */

   const valObj = {};
   let allValFound = true;

   for (let j = 1; j < valuesToFind.length; j++) {

    const valueToTest = valuesToFind[j];
    const boardElemToTest = board[row + j];

        if (valueToTest && boardElemToTest) {

            const findFollowingValue = strInStr(board[row + j],valuesToFind[j]);
            
            if (findFollowingValue !== col) {
                allValFound = false;
            }
            

        }
    
    }

    if (allValFound) {
        valObj.col = col;
        valObj.row = row;
        return valObj;
    }


    return false;

}

const findValInBoard = (board, valuesToFind) => {
    // adapter le process pour que les espaces soient ignorés, dans le plateau et dans la forme à trouver

    for (let i = 0; i < board.length; i++) {

        const findFirstValue = strInStrArr(board[i], valuesToFind[0]);
        let followingValues = null;

        if (findFirstValue !== false) {
            /*
            findFirstValue, récupère toutes les colonnes potentielles à partir desquelles, on retrouve la première ligne, 
            de la forme à trouver. Tester checkFollowingValues(), avec en paramètre 
            - col sera chaque valeur dans findFirstValue
            - row sera i
            - board 
            - valuesToFind 
            */

            for (let j = 0; j < findFirstValue.length; j++) {
                followingValues = checkFollowingValues(board, valuesToFind, findFirstValue[j], i);
                
                if (followingValues) {
                    return followingValues;
                }

            }          

        }
        
    }

    return false;

}

const main = () => {

    const argObj = argTester();

    if (argObj) {
        //console.log(argObj);
        const result = findValInBoard(argObj.fileOneValue, argObj.fileTwoValue);

        if (result) {
            console.log("Trouvé !");
            console.log("Coordonnées : " + result.col + "," + result.row);
        } else {
            console.log("Introuvable");
        }

    }

}

main();
