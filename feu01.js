// Évaluer une expression

const intPattern = /^(\+?|-?)[0-9]+$/;
const sepPattern = /\S/m;

const expSpecChars = ["+","-","*","/","%"];
const parChar = ["(",")"];

const argTester = () => {

    const argument = process.argv.slice(2);
    const errMsg = "erreur argument: ";
    const expArr = [];

    if (argument.length !== 1) {

        console.log(errMsg + "il faut passer une seule chaîne de caractère en argument.");
        return false;

    }

    const strSplit = argument[0].split('');

    let intArr = [];

    // Vérifier que l'expression ne comporte que des opérateurs et des nombres
    for (let i = 0; i < strSplit.length; i++) {
    
        const testChar = intPattern.test(strSplit[i]) || findChars(strSplit[i], expSpecChars);

        const charIsInt = intPattern.test(strSplit[i]);
        const charIsOp = findChars(strSplit[i], expSpecChars);
        const charIsPar = findChars(strSplit[i], parChar);
        const charIsSpace = sepPattern.test(strSplit[i]);


        if (charIsInt) {
            intArr.push(strSplit[i]);
        } else if ((charIsOp || charIsPar) && intArr.length !== 0) {
            const finalInt = parseInt(intArr.join(''));
            expArr.push(finalInt);
            intArr = [];
            expArr.push(strSplit[i]);
        } else if ((charIsOp || charIsPar) && intArr.length == 0) {
            expArr.push(strSplit[i]);
        }

        
        if (i === strSplit.length - 1) {

            if (intArr.length !== 0) {
                const finalInt = parseInt(intArr.join(''));
                expArr.push(finalInt);
                intArr = [];
            }

        }
        

    }

    const testParenthesis = checkParenthesis(expArr);
    const testOperators = checkOperators(expArr);

    if (!testParenthesis) {

        console.log(errMsg + "vérifier les parenthèses.");
        return false;

    }

    if (!testOperators) {

        console.log(errMsg + "vérifier les opérateurs.");
        return false;

    }

    console.log(expArr);
    console.log(expArr.join(''));

}

// Vérifier qu'il n'y a pas d'erreur de parenthèses 
const checkParenthesis = (array) => {

    const openParenthesis = parChar[0];
    const closeParenthesis = parChar[1];

    let amountOpPar = 0;
    let amountClPar = 0;

    for (let i = 0; i < array.length; i++) {
        
        if (array[i] === openParenthesis) {

            /* Vérifier que la parenthèse ouvrante est suivie d'un nombre
            if (!intPattern.test(array[i+1])) {
                return false;
            }*/

            amountOpPar++;

        } else if (array[i] === closeParenthesis) {

            /* Vérifier que la parenthèse fermante est précédée d'un nombre
            if (!intPattern.test(array[i-1])) {
                return false;
            }*/

            amountClPar++;
        }

    }
    
    // (même nombre de parenthèses ouvrantes et fermantes)
    if (amountClPar !== amountOpPar) {
        return false;
    } else {
        return true;
    }

}

const checkOperators = (array) => {

    let intQty = 0;
    let opQty = 0;

    for (let i = 0; i < array.length;i++) {
        
        // console.log(typeof(array[i]));

        if (typeof(array[i]) === 'number') {
            intQty++;
        } else if (typeof(array[i]) === 'string' && findChars(array[i], expSpecChars)) {
            opQty++;
        }

    }

    console.log("int: " + intQty);
    console.log("op: " + opQty);

    if (opQty !== intQty - 1) {
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