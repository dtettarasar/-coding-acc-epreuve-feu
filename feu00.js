//Récupérer les arguments
const argTester = () => {

    const argument = process.argv.slice(2);
    const pattern = /^[0-9]+$/;
    const argOneIsNumber = pattern.test(argument[0]);
    const argTwoIsNumber = pattern.test(argument[1]);

    const rectangleObj = {};

    if (argument.length !== 2 || !argOneIsNumber || !argTwoIsNumber) {
        console.log("Veuillez passer deux nombres entiers positifs en argument.");
        console.log("Exemple: node feu00.js 3 4");
        return false;
    }

    rectangleObj['column'] = parseInt(argument[0]);
    rectangleObj['row'] = parseInt(argument[1]);

    return rectangleObj;

}

const arg = argTester();

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

generateBorders(arg.column, true);
generateBorders(arg.column, false);
generateBorders(arg.column, true);
