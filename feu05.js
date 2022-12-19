// Labyrinthe

const argTester = () => {

    const argument = process.argv.slice(2);
    const errorMsg = "Erreur: ";
    const fileFormats = [".txt", ".md"];

    const boardObj = {};

    if (argument.length !== 1) {

        console.log(errorMsg + "Veuillez passer le chemin du fichier en argument.");
        console.log("Exemple: node feu05.js feu05_files/board1.txt");
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

    console.log(fileValue);
    const boardSettings = fileValue[0];

    // checker les infos du plateau
    const boardInfoPattern = /^[1-9][0-9]*x[1-9][0-9]*.{5}$/g;
    const testBoardInfos = boardInfoPattern.test(boardSettings);
    
    if (!testBoardInfos) {
        console.log("Assurez-vous que la première ligne du fichier contienne les informations, en respectant le format demandé.");
        console.log("Dimension du plateau: Lignes x Colonnes");
        console.log("Suivi de 5 caractères: plein, vide, chemin, entrée et sortie du labyrinthe.");
        console.log("Exemple: 10x10* o12");
        return false;
    }
    
    console.log(boardSettings);
    //console.log(testBoardInfos);

    const boardSettingsArr = boardSettings.split('');

    const lineNumArr = [];

    for (let i = 0; i < boardSettingsArr.length -5; i++) {
        lineNumArr.push(boardSettingsArr[i]);
    }

    const dimensionArr = lineNumArr.join('').split("x");
    boardObj.rowNum = parseInt(dimensionArr[0]);
    boardObj.colNum = parseInt(dimensionArr[1]);
    boardObj.endChar = boardSettings[boardSettingsArr.length -1];
    boardObj.startChar = boardSettings[boardSettingsArr.length -2];
    boardObj.pathChar = boardSettings[boardSettingsArr.length -3];
    boardObj.voidChar = boardSettings[boardSettingsArr.length -4];
    boardObj.fillChar = boardSettings[boardSettingsArr.length -5];

    if (fileValue.length - 1 !== boardObj.rowNum) {
        console.log("Erreur: le nombre de lignes du plateau ne correspond pas à celui spécifié dans les informations en première ligne du fichier.");
        return false;
    }

    let caseId = 0;

    for (let i = 1; i < fileValue.length; i++) {

        if (fileValue[i].length !== boardObj.colNum) {
            
            console.log("Erreur : les lignes du plateau ne sont pas de la même longueur.");
            return false;

        } else {

            /*
            for (let j = 0; j < fileValue[i].length; j++) {
                
                // création des objets pour chaque case du plateau
                const caseObj = {
                    id: caseId,
                    row: i - 1,
                    col: j,
                    caseValue: fileValue[i][j]
                };

                boardObj.value.push(caseObj);

                caseId++;
            }
            */

        }   

    }

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