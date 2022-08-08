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

    let intArr = [];

    // Vérifier que l'expression ne comporte que des opérateurs et des nombres
    for (let i = 0; i < strSplit.length; i++) {

        const expSpecChars = ["+","-","*","/","%"];
        const parChar = ["(",")"];
        
        const testChar = intPattern.test(strSplit[i]) || findChars(strSplit[i], expSpecChars);

        const charIsInt = intPattern.test(strSplit[i]);
        const charIsOp = findChars(strSplit[i], expSpecChars);
        const charIsPar = findChars(strSplit[i], parChar);

        const msgToLog = "char: " + strSplit[i] + " : " + testChar;

        if (charIsInt) {
            intArr.push(strSplit[i]);
        } else if ((charIsOp || charIsPar) && intArr.length !== 0) {
            expArr.push(intArr);
            intArr = [];
            expArr.push(strSplit[i]);
        } else if ((charIsOp || charIsPar) && intArr.length == 0) {
            expArr.push(strSplit[i]);
        }

        
        if (i === strSplit.length - 1) {

            if (intArr.length !== 0) {
                expArr.push(intArr);
                intArr = [];
            }

        }
        

    }

    const testParenthesis = checkParenthesis(expArr);

    /*
    if (!testParenthesis) {

        console.log(errMsg + "vérifier les parenthèses.");
        return false;

    }*/

    console.log(expArr);
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

const findChars = (char, valueArr) => {
    
    for (let i = 0; i < valueArr.length; i++) {

        if (valueArr[i] === char) {
            return true;
        }

    }

    return false;

} 

argTester();