// Évaluer une expression

const argTester = () => {

    const argument = process.argv.slice(2);
    const errMsg = "erreur argument: ";
    const intPattern = /^(\+?|-?)[0-9]+$/;
    const sepPattern = /\S/m;
    const expArr = [];

    if (argument.length !== 1) {

        console.log(errMsg + "il faut passer une seule chaîne de caractère en argument.");
        return false;

    }

    const strSplit = argument[0].split('');

    // Vérifier que l'expression ne comporte que des opérateurs et des nombres
    for (let i = 0; i < strSplit.length; i++) {
        
        const testChar = intPattern.test(strSplit[i]) || findOperators(strSplit[i]);
        const msgToLog = "char: " + strSplit[i] + " : " + testChar;

        // console.log(msgToLog);

        if (testChar) {

            expArr.push(strSplit[i]);

        } else if (sepPattern.test(strSplit[i])) {

            console.log(errMsg + "l'expression ne doit comporter que des opérateurs et des nombres.");
            return false;

        }

    }

    const testParenthesis = checkParenthesis(expArr);

    if (!testParenthesis) {

        console.log(errMsg + "vérifier les parenthèses.");
        return false;

    }

    console.log(expArr.join(''));

}

const checkParenthesis = (array) => {

    const openParenthesis = "(";
    const closeParenthesis = ")";

    let amountOpPar = 0;
    let amountClPar = 0;

    for (let i = 0; i < array.length; i++) {
        
        if (array[i] === openParenthesis) {
            amountOpPar++;
        } else if (array[i] === closeParenthesis) {
            amountClPar++;
        }

    }

    if (amountClPar !== amountOpPar) {
        return false;
    } else {
        return true;
    }

}

const findOperators = (char) => {

    const valueArr = [
        "+",
        "-",
        "*",
        "/",
        "%",
        "(",
        ")"
    ]

    for (let i = 0; i < valueArr.length; i++) {

        if (valueArr[i] === char) {
            return true;
        }

    }

    return false;

}

// console.log(findOperators("-"));

argTester();