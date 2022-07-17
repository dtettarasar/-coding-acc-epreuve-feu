//Récupérer l'argument
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

    console.log(argument);

    //return parseInt(argument[0]);

}

argTester();
