// Sudoku

const argTester = () => {

    /*
    - 1 seul fichier passé en argument
    - fichier au format .txt
    - vérifier que le fichier texte possède 9 lignes
    - avec une regex, vérifier que le texte de chaque ligne contient 9 char. chaque char est soit un nombre soit un point "."
    */

    const argument = process.argv.slice(2);
    const errorMsg = "erreur";
    const fileFormats = [".txt", ".md"];
    const linePattern = /^([0-9]|[.]){9}$/;
    const boardArr = [];

    let boardFilePath = null;

    if (argument.length !== 1) {

        console.log("Erreur : veuillez passer le chemin du fichier en argument");
        console.log("Exemple : node feu03.js feu03_files/board1.txt");
        return false;

    } else {

        boardFilePath = argument[0];

    }

    // Check les formats de fichiers 

    if (!checkFileFormat(boardFilePath, fileFormats)) {
        console.log(errorMsg);
        return false;
    }

    const boardValue = getTxtArr(boardFilePath);

    if (!boardValue) {
        console.log("Erreur : le fichier n'existe pas (Vérifier le chemin du fichier. Format(s) lisible(s) : " + fileFormats + ").");
        return false;
    }

    if (boardValue.length !== 9) {
        console.log("Erreur : le fichier texte doit comporter 9 lignes.");
        return false;
    }

    for (let i = 0; i < boardValue.length; i++) {

        if (boardValue[i].length !== 9) {
            console.log("Erreur : chaque ligne du fichier doit comporter 9 caractères.");
            return false;
        } else if (!linePattern.test(boardValue[i])) {
            console.log("Erreur: une ou plusieurs lignes du fichier comportent des erreurs de caractère");
            return false;
        } else {
            boardArr.push(boardValue[i].split(''));
        }
        
    }

    return boardArr;

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

        // regex to split the contents by new line
        /*
            \r
            matches a carriage return (ASCII 13)
            ? matches the previous token between zero and one times, as many times as possible, giving back as needed (greedy)
            \n matches a line-feed (newline) character (ASCII 10)
        */
        const lines = data.split(/\r?\n/);

        lines.forEach((line) => {
            txtArr.push(line);
        });

        return txtArr;

    } catch (error) {

        return false;

    }

}

const getCaseArea = (caseId) => {

    const areaData = [
        {
            idArr:  [
                0,1,2,9,10,11,18,19,20
            ],
            areaValue: 1
        },
        {
            idArr:  [
                3,4,5,12,13,14,21,22,23
            ],
            areaValue: 2
        },
        {
            idArr:  [
                6,7,8,15,16,17,24,25,26
            ],
            areaValue: 3
        },
        {
            idArr:  [
                27,28,29,36,37,38,45,46,47
            ],
            areaValue: 4
        },
        {
            idArr:  [
                30,31,32,39,40,41,48,49,50
            ],
            areaValue: 5
        },
        {
            idArr:  [
                33,34,35,42,43,44,51,52,53
            ],
            areaValue: 6
        },
        {
            idArr:  [
                54,55,56,63,64,65,72,73,74
            ],
            areaValue: 7
        },
        {
            idArr:  [
                57,58,59,66,67,68,75,76,77
            ],
            areaValue: 8
        },
        {
            idArr:  [
                60,61,62,69,70,71,78,79,80
            ],
            areaValue: 9
        }
    ]

    for (let i = 0; i < areaData.length; i++) {

        if (areaData[i].idArr.includes(caseId)) {
            return areaData[i].areaValue;
        }

    }

}

const getCaseData = (fileArray) => {

    const caseData = [];

    let idVal = 0;
    
    for (let i = 0; i < fileArray.length; i++) {

        for (let j = 0; j < fileArray[i].length; j++) {

            const caseObj = {
                id: idVal,
                row: i + 1,
                col: j + 1,
                area: getCaseArea(idVal)
            };

            if (fileArray[i][j] === ".") {

                caseObj.value = null;
                caseObj.possibleValues = [];

            } else {

                caseObj.value = parseInt(fileArray[i][j]);
                
            }

            caseData.push(caseObj);

            idVal++;
        }

    }

    return caseData;

}

const getNullCaseId = (caseDataArr) => {

    const nullCaseIdArr = [];
    
    for (let i = 0; i < caseDataArr.length; i++) {

        if (caseDataArr[i].value === null) {
            nullCaseIdArr.push(caseDataArr[i].id);
        }

    }

    return nullCaseIdArr;

}

getTakenValues = (caseId, caseDataArr) => {

    const takenValues = [];

    for (let i = 0; i < caseDataArr.length; i++) {

        const sameRow = caseDataArr[caseId].row === caseDataArr[i].row && caseDataArr[i].value !== null;
        const sameCol = caseDataArr[caseId].col === caseDataArr[i].col && caseDataArr[i].value !== null;
        const sameArea = caseDataArr[caseId].area === caseDataArr[i].area && caseDataArr[i].value !== null;

        if (sameRow || sameCol || sameArea) {
            
            takenValues.push(caseDataArr[i].value);

        }

    }

    const uniqueTakenValues = [];

    takenValues.forEach((item) => {

        if (!uniqueTakenValues.includes(item)) {

            uniqueTakenValues.push(item);

        }

    });

    return uniqueTakenValues;

}

const getPossibleValues = (arr) => {

    const possibleValues = [];

    for (let i = 1; i <= 9; i++) {

        if (!arr.includes(i)) {

            possibleValues.push(i);

        }

    }

    return possibleValues;

}

const updatePossibleValues = (caseIdArr, caseDataArr) => {

    for (let i = 0; i < caseIdArr.length; i++) {

        const caseObj = caseDataArr[caseIdArr[i]];
        const takenValues = getTakenValues(caseObj.id, caseDataArr);
        caseObj.possibleValues = getPossibleValues(takenValues);

        if (caseObj.possibleValues.length === 1) {

            caseObj.value = caseObj.possibleValues[0];
            delete caseObj.possibleValues;

        }
        
    }

}

const printBoard = (caseDataArr) => {

    let rowArr = []

    for (let i = 0; i < caseDataArr.length; i++) {

        const caseObj = caseDataArr[i];

        rowArr.push(caseObj.value);

        if (rowArr.length === 9) {

            console.log(rowArr.join(''));
            rowArr = [];
            
        } 

    }

}

const main = () => {

    const argument = argTester();

    if (argument) {

        const caseData = getCaseData(argument);
        let nullCaseIdArr = getNullCaseId(caseData);

        while(nullCaseIdArr.length !== 0) {

            updatePossibleValues(nullCaseIdArr, caseData);
            nullCaseIdArr = getNullCaseId(caseData);

        }

        printBoard(caseData);

    }
}

main();

