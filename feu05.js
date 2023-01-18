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

                if (boardObj.caseValueEqVoidChar(upCaseId) || boardObj.caseValueEqEndChar(upCaseId)) {
                    freeCasesArr.push(upCaseId);
                }


            } else if (isDwnCase) {

                dwnCaseId = caseObj.id;

                if (boardObj.caseValueEqVoidChar(dwnCaseId) || boardObj.caseValueEqEndChar(dwnCaseId)) {
                    freeCasesArr.push(dwnCaseId);
                }


            } else if (isLftCase) {

                lftCaseId = caseObj.id;

                if (boardObj.caseValueEqVoidChar(lftCaseId) || boardObj.caseValueEqEndChar(lftCaseId)) {
                    freeCasesArr.push(lftCaseId);
                }


            } else if (isRgtCase) {

                rgtCaseId = caseObj.id;

                if (boardObj.caseValueEqVoidChar(rgtCaseId) || boardObj.caseValueEqEndChar(rgtCaseId)) {
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

    // Checker si une case est égale au caractère sortie
    boardObj.caseValueEqEndChar = (caseId) => {

        const caseToCheck = boardObj.getCaseObj(caseId);
        
        if (caseToCheck.caseValue === boardObj.endChar) {

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

    boardObj.allPathes = [];

    // Construire un chemin sur le plateau
    boardObj.buildPath = (pathObj) => {

        //console.log("buildPath func");
        
        let caseObj = null;

        // Si pas de pathObj passé en argument, alors on commence par la case d'entrée du labyrinthe        
        if (boardObj.allPathes.length === 0) {

            const startCaseId = boardObj.getStartCaseId();
            caseObj = boardObj.getCaseObj(startCaseId);

            if (caseObj.hasOwnProperty('freeCases')) {

                for (let i = 0; i < caseObj.freeCases.length; i++) {
    
                    const pathObj = {};
                    pathObj.arr = [];
    
                    const newPathArr = [];
                    pathObj.arr.push(caseObj.id);
    
                    const nextCaseId = caseObj.freeCases[i];
                    pathObj.endCaseFound = boardObj.caseValueEqEndChar(nextCaseId);

                    pathObj.isChecked = false;
    
                    pathObj.arr.push(nextCaseId)
                    //console.log("pathObj");
                    //console.log(pathObj);
                    pathObj.id = boardObj.allPathes.length;
                    boardObj.allPathes.push(pathObj);
    
                    /*
                    if (!pathArr.includes(nextCase)) {
    
                        boardObj.buildPath(nextCase, pathArr);
    
                    }*/
    
                }
    
            }

        } else {

            const arrLastCaseId = pathObj.arr[pathObj.arr.length - 1];
            caseObj = boardObj.getCaseObj(arrLastCaseId);
            pathObj.endCaseFound = boardObj.caseValueEqEndChar(arrLastCaseId);

            /*
            if (pathObj.endCaseFound) {
                console.log("end case found")
                console.log(pathObj);
                return true;
            }
            */
            
            

            /*
            console.log("pathObj passed in arg:")
            console.log(pathObj);
            console.log("arrLastCase");
            console.log(arrLastCaseId);
            console.log(caseObj);
            */
            

            if (caseObj.hasOwnProperty('freeCases')) {

                for (let i = 0; i < caseObj.freeCases.length; i++) {

                    // Créer une copie de pathObj passé en arg
                    const newPathObj = JSON.parse(JSON.stringify(pathObj));

                    // conditions pour s'assurer que l'array de l'objet path ne contient pas deux fois la même case
                    if (!newPathObj.arr.includes(caseObj.freeCases[i])) {

                        newPathObj.arr.push(caseObj.freeCases[i]);
                        newPathObj.id = boardObj.allPathes.length;
                        boardObj.allPathes.push(newPathObj);

                    }


                }

            }

            pathObj.isChecked = true;

        }

        //console.log(caseObj);

        /*
        pathArr.push(caseObj.id);
        
        console.log("-------");
        console.log("PathArr");
        console.log(pathArr);
        */
        /*
        if () {

            boardObj.buildPath(false);

        }*/


        // On refait parcourir l'intégralité de l'array allPathes.
        // Trouver un moyen d'isoler les pathObj déjà checké de ceux à faire passer dans BuildPath
        // Sinon Trouver un moyen de supprimer les pathObj dont on a plus besoin au fur et à mesure
        /*
        for (let i = 0; i < boardObj.allPathes.length; i++) {

            //console.log(boardObj.allPathes[i]);

            
            if (boardObj.allPathes[i].endCaseFound) {
                //console.log("end case found!");
                //console.log(boardObj.allPathes[i]);
                return boardObj.allPathes[i];
            }

            else if (boardObj.allPathes[i].isChecked === false) {

                boardObj.buildPath(boardObj.allPathes[i]);

            }
            

        }
        */

        

    }

    boardObj.buildPathVerTwo = (pathArrVerTwo) => {

        console.log("start BuildPath Ver Two");
        let caseObj = null; 

        if (pathArrVerTwo.length === 0) {

            console.log("pathArr is empty");

            const startCaseId = boardObj.getStartCaseId();
            caseObj = boardObj.getCaseObj(startCaseId);
            console.log(caseObj);

            if (caseObj.hasOwnProperty('freeCases')) {

                for (let i = 0; i < caseObj.freeCases.length; i++) {
    
                    const pathObj = {};
                    pathObj.arr = [];
    
                    const newPathArr = [];
                    pathObj.arr.push(caseObj.id);
    
                    const nextCaseId = caseObj.freeCases[i];
                    pathObj.endCaseFound = boardObj.caseValueEqEndChar(nextCaseId);

                    pathObj.isChecked = false;
    
                    pathObj.arr.push(nextCaseId)
                    //console.log("pathObj");
                    //console.log(pathObj);
                    pathObj.id = pathArrVerTwo.length;
                    pathArrVerTwo.push(pathObj);


    
                }
    
            }

            /*
            console.log("pathArrVerTwo");
            console.log(pathArrVerTwo);
            */

            console.log("pathArrVerTwo after 1st exec of method");
            console.log(pathArrVerTwo);

            return pathArrVerTwo;

        } else {

            console.log("pathArr has values");
            console.log(pathArrVerTwo);
            console.log("-------------");

            const newPathToAdd = [];

            for (let i = 0; i < pathArrVerTwo.length; i++) {

                if (pathArrVerTwo[i].isChecked === false) {

                    console.log(pathArrVerTwo[i]);
                    const arrLastCaseId = pathArrVerTwo[i].arr[pathArrVerTwo[i].arr.length - 1];

                    console.log("arrLastCaseId:");
                    console.log(arrLastCaseId);

                    console.log("--------");
                    console.log("check caseObj from lastID");
                    caseObj = boardObj.getCaseObj(arrLastCaseId);
                    pathArrVerTwo[i].endCaseFound = boardObj.caseValueEqEndChar(arrLastCaseId);
                    console.log(caseObj);
                    console.log("--------")

                    if (caseObj.hasOwnProperty('freeCases')) {

                        console.log("case obj freecase");

                        for (let j = 0; j < caseObj.freeCases.length; j++) {

                            console.log(caseObj.freeCases[j]);

                            
                            // Créer une copie de pathObj passé en arg
                            const newPathObj = JSON.parse(JSON.stringify(pathArrVerTwo[i]));

                            // conditions pour s'assurer que l'array de l'objet path ne contient pas deux fois la même case
                            if (!newPathObj.arr.includes(caseObj.freeCases[j])) {

                                console.log("newPath Obj");

                                newPathObj.arr.push(caseObj.freeCases[j]);
                                newPathObj.id = boardObj.allPathes.length;
                                console.log(newPathObj);
                                newPathToAdd.push(newPathObj);

                            }
                            

                        }

                    }

                    pathArrVerTwo[i].isChecked = true;

                }

            }

            console.log("newPathToAdd");
            console.log(newPathToAdd);
            console.log("-------");
            
            for (let i = 0; i < newPathToAdd.length; i++) {

                newPathToAdd[i].id = pathArrVerTwo.length;

                pathArrVerTwo.push(newPathToAdd[i]);
            }

        }

        /*
        console.log("pathArr after loop");
        console.log(pathArrVerTwo);
        */

        // TODO : 

        /* 
            créer for loop qui va itérer sur tout le pathArr : 
            si l'un des path.endCaseFound === true : retourner le pathArr
            else : on execute buildPath(pathArrVerTwo)
        */

        console.log("------------------------");

        console.log("for loop on pathArr;");

        for (let i = 0; i < pathArrVerTwo.length; i++) {
            console.log(pathArrVerTwo[i]);

            if (pathArrVerTwo[i].endCaseFound === true) {
                console.log("end case found");
                return pathArrVerTwo[i];
            }

        }

        boardObj.buildPathVerTwo(pathArrVerTwo);

        return pathArrVerTwo;

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
    console.log("startCase");
    const startCase = board.getCaseObj(board.getStartCaseId());
    console.log(startCase);

    
    //board.printBoard();
    //console.log("----------");
    //board.printAllData();
    //console.log("----------");
    
    //board.buildPath(false);
    //board.buildPath(0,[]);
    //board.buildPath(5,[]);
    /*
    board.buildPath(board.allPathes[0]);
    board.buildPath(board.allPathes[1]);
    board.buildPath(board.allPathes[2]);

    console.log(board.allPathes);
    */

    //board.getAllPathes();
    /*
    console.log(board.buildPath(false));
    console.log("amount of pathes:");
    console.log(board.allPathes.length);

    
    for (let i = 0; i < board.allPathes.length; i++) {

        console.log(board.allPathes[i]);

    }
    */

    const test = board.buildPathVerTwo([]);
    const sndTest = board.buildPathVerTwo([...test]);
    const thrdTest = board.buildPathVerTwo([...sndTest]);
    /*
    console.log("test");
    console.log(test);
    console.log("second test");
    console.log(sndTest);
    console.log("third Test")
    console.log(thrdTest);
    */
    
    
    //console.log(board.caseValueEqEndChar(28));
    


}

main();
