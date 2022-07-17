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

const generateTopBtmBorders = (int) => {

    console.log(int);


    const arr = [];

    arr.push("o");

    if (int > 2) {

        for (let i = 0; i < int - 2; i++ ) {
            arr.push("-");
        }

    }

    if (int !== 1) {
        arr.push("o");
    }

    console.log(arr);


}

generateTopBtmBorders(arg.column);
