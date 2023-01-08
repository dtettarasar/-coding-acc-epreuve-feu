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
    boardObj.value = [];

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

        }   

    }

    let startCaseFound = false;
    
    for (let i = 0; i < boardObj.value.length; i++) {

        const testCase = boardObj.value[i].caseValue;
        const notValidChar = testCase !== boardObj.voidChar && testCase !== boardObj.fillChar && testCase !== boardObj.endChar && testCase !== boardObj.startChar;

        if (notValidChar) {

            console.log("Erreur: le plateau ne doit être composé que des caractères vides, obstacles, entrée et sortie, spécifiés en première ligne");
            return false;

        }
        
        if (testCase === boardObj.startChar && !startCaseFound) {

            startCaseFound = true;

        } else if (testCase === boardObj.startChar && startCaseFound) {

            console.log("le plateau ne doit comporter qu'une seule entrée");
            return false;

        }

    }

    // création des méthodes pour manipuler des données dans l'objet du plateau

    // affiche le plateau dans la console
    boardObj.printBoard = () => {

        const mainArr = [];
        let rowTracker = boardObj.value[0].row;
        let rowArr = [];

        for (let i = 0; i < boardObj.value.length; i++) {
            

            if (rowTracker !== boardObj.value[i].row) {

                mainArr.push(rowArr);
                rowArr = [];

                rowTracker++;
            }

            rowArr.push(boardObj.value[i].caseValue);

        }

        mainArr.push(rowArr);
        rowArr = [];

        for (let i = 0; i < mainArr.length; i++) {

            console.log(mainArr[i].join(''));
            
        }

    }

    // retourne l'objet d'une case du plateau, en fonction de son ID
    boardObj.getCaseObj = (caseId) => {return boardObj.value[caseId]};

    // affiche tous les objets case composant le plateau
    boardObj.printAllData = () => {

        for (let i = 0; i < boardObj.value.length; i++) {

            const caseObj = boardObj.getCaseObj(i);
            console.log(caseObj);

        }

    }

    // identifier chaque case possible autour d’une case donnée
    boardObj.findFreeCases = (caseId) => {

        const caseToCheck = boardObj.getCaseObj(caseId);
        const freeCasesArr = [];

        // Calcul des coordonnées des case autour de la caseToCheck
        // Création des variables pour stocker les id des cases autour de la caseToCheck
        let upCaseId = null;
        const rowUpCase = caseToCheck.row - 1;
        const colUpCase = caseToCheck.col;

        let dwnCaseId = null;
        const rowDwnCase = caseToCheck.row + 1;
        const colDwnCase = caseToCheck.col;

        let lftCaseId = null;
        const rowLftCase = caseToCheck.row;
        const colLftCase = caseToCheck.col - 1;

        let rgtCaseId = null;
        const rowRgtCase = caseToCheck.row;
        const colRgtCase = caseToCheck.col + 1;

        for (let i = 0; i < boardObj.value.length; i++) {
            
            const caseObj = boardObj.getCaseObj(i);

            // Conditions pour identifier les cases autour de caseToCheck, selon les coordonnées calculées en amont
            const isUpCase = caseObj.col === colUpCase && caseObj.row === rowUpCase;
            const isDwnCase = caseObj.col === colDwnCase && caseObj.row === rowDwnCase;
            const isLftCase = caseObj.col === colLftCase && caseObj.row === rowLftCase;
            const isRgtCase = caseObj.col === colRgtCase && caseObj.row === rowRgtCase;

            if (isUpCase) {

                upCaseId = caseObj.id;

                if (boardObj.caseValueEqVoidChar(upCaseId)) {
                    freeCasesArr.push(upCaseId);
                }


            } else if (isDwnCase) {

                dwnCaseId = caseObj.id;

                if (boardObj.caseValueEqVoidChar(dwnCaseId)) {
                    freeCasesArr.push(dwnCaseId);
                }


            } else if (isLftCase) {

                lftCaseId = caseObj.id;

                if (boardObj.caseValueEqVoidChar(lftCaseId)) {
                    freeCasesArr.push(lftCaseId);
                }


            } else if (isRgtCase) {

                rgtCaseId = caseObj.id;

                if (boardObj.caseValueEqVoidChar(rgtCaseId)) {
                    freeCasesArr.push(rgtCaseId);
                }

            }

        }

        return freeCasesArr;
        
    }

    // Checker si une case est égale au caractère vide
    boardObj.caseValueEqVoidChar = (caseId) => {

        const caseToCheck = boardObj.getCaseObj(caseId);
        
        if (caseToCheck.caseValue === boardObj.voidChar) {

            return true;

        } else {

            return false;

        }

    }

    // Récupérer pour chaque case, les cases disponibles autour
    boardObj.loadAllFreeCases = () => {

        for (let i = 0; i < boardObj.value.length; i++) {

            const caseObj = boardObj.getCaseObj(i);
            
            if (caseObj.caseValue !== boardObj.fillChar) {
                caseObj.freeCases = boardObj.findFreeCases(caseObj.id);
            }

        }

    }

    // Récupérer l'ID de la case de départ 
    boardObj.getStartCaseId = () => {

        for (let i = 0; i < boardObj.value.length; i++) {

            const caseObj = boardObj.getCaseObj(i);

            if (caseObj.caseValue === boardObj.startChar) {

                return caseObj.id;

            }

        }

    }

    // Construire un chemin sur le plateau
    boardObj.buildPath = (caseId, pathArr) => {
        
        let caseObj = null;

        // Si pas de CaseID passé en argument, alors on commence par la case d'entrée du labyrinthe        
        if (caseId === false && caseId !== 0) {

            const startCaseId = boardObj.getStartCaseId();
            caseObj = boardObj.getCaseObj(startCaseId);

        } else {

            caseObj = boardObj.getCaseObj(caseId);

        }

        console.log(caseObj);

    }

    return boardObj;


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

    const board = argTester();

    if (board) {
        board.loadAllFreeCases();
    } else {
        return false;
    }
    

    //console.log(board);
    //console.log(board.getStartCaseId());

    /*
    board.printBoard();
    console.log("----------");
    board.printAllData();
    console.log("----------");
    */

    board.buildPath(false, []);
    board.buildPath(0,[]);
    board.buildPath(5,[]);
    


}

main();