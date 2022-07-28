//Récupérer les arguments
const argTester = () => {

    const argument = process.argv.slice(2);
    const pattern = /^[0-9]+$/;
    const argOneIsNumber = pattern.test(argument[0]);
    const argTwoIsNumber = pattern.test(argument[1]);

    const rectangleObj = {};

    const errorMsg = "Veuillez passer deux nombres entiers positifs en argument.\nExemple: node feu00.js 3 4";

    if (argument.length !== 2 || !argOneIsNumber || !argTwoIsNumber) {
        console.log(errorMsg);
        return false;
    }

    rectangleObj['column'] = parseInt(argument[0]);
    rectangleObj['row'] = parseInt(argument[1]);

    if (rectangleObj['column'] === 0 || rectangleObj['row'] === 0) {
        console.log(errorMsg);
        return false;
    } else {
        return rectangleObj;
    }

}

const generateBorders = (col, topAndBottom) => {
    
    const arr = [];

    const corner = topAndBottom ? "o" : "|";
    const line = topAndBottom ? "-" : " ";

    arr.push(corner);

    if (col > 2) {

        for (let i = 0; i < col - 2; i++ ) {
            arr.push(line);
        }

    }

    if (col !== 1) {
        arr.push(corner);
    }

    console.log(arr.join(''));

}

const generateRect = (col, row) => {

    generateBorders(col, true);

        if (row > 2) {
            
            for (let i = 0; i < row - 2; i++) {
                generateBorders(col, false);
            }

        }

        if (row !== 1) {

            generateBorders(col, true);

        }

}

const main = () => {

    const arg = argTester();

    if (arg) {

        generateRect(arg.column, arg.row)

    }

}

main();
