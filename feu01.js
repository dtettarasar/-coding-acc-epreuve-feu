// Évaluer une expression

// créer la méthode insert pour l'objet array
Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

const intPattern = /^(\+?|-?)[0-9]+$/;
const sepPattern = /\s/m;

const expSpecChars = ["+","-","*","/","%"];
const parChar = ["(",")"];

const argTester = () => {

    const argument = process.argv.slice(2);
    const errMsg = "erreur argument: ";
    const expArr = [];

    if (argument.length === 0) {
        
        console.log(errMsg + "veuillez passer une chaîne de caractère en argument.");
        return false;

    } else if (argument.length > 1) {

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

        } else if (!charIsSpace) {

            console.log(errMsg + "présence de caractères incorrects");
            return false;

        }

        
        if (i === strSplit.length - 1) {

            if (intArr.length !== 0) {

                const finalInt = parseInt(intArr.join(''));
                expArr.push(finalInt);
                intArr = [];

            }

        }
        

    }

    //console.log(expArr);

    checkNegNum(expArr);

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

    const arrWithoutPars = convertParenthesis(expArr);
    
    return arrWithoutPars;

}

// Vérifier qu'il n'y a pas d'erreur de parenthèses 
const checkParenthesis = (array) => {

    const openParenthesis = parChar[0];
    const closeParenthesis = parChar[1];

    let amountOpPar = 0;
    let amountClPar = 0;

    for (let i = 0; i < array.length; i++) {
        
        if (array[i] === openParenthesis) {

            amountOpPar++;

        } else if (array[i] === closeParenthesis) {

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

// Vérifier qu'il n'y a pas d'erreurs d'opérateurs
const checkOperators = (array) => {

    let intQty = 0;
    let opQty = 0;

    for (let i = 0; i < array.length;i++) {
        
        if (typeof(array[i]) === 'number') {
            intQty++;
        } else if (typeof(array[i]) === 'string' && findChars(array[i], expSpecChars)) {
            opQty++;
        }

    }

    if (opQty !== intQty - 1) {
        return false;
    } else {
        return true;
    }

}

const checkNegNum = (array) => {
    /*
    si deux opérateurs se suivent et que l'op numéro 2 est un moins, si l'element suivant le signe moins est un nombre 
    alors on calcule nombre * -1, on remplace nombre par nombre *-1 dans l'array et on retire le signe moins de l'array
    Executer cette fonction avant checkOperators.
    */

    console.log(array);

    for (let i = 0; i < array.length; i++) {

        findSegSymb = array[i] === '-' && Number.isInteger(array[i+1]) && findChars(array[i - 1], expSpecChars)

        if (findSegSymb) {
            console.log(array[i] + array[i+1]);
        }

    }

}

// Convertir les section de l'expression entre parenthèse, en sous array
const convertParenthesis = (array) => {

    const openParenthesis = parChar[0];
    const closeParenthesis = parChar[1];

    let finalArray = [];
    let subArray = [];
    let subArrayOpen = false;

    // Variable pour tracker les parenthèses imbriquées
    let opParQty = 0;
    let clParQty = 0;
    let subPar = false;

    for (let i = 0; i < array.length; i++) {

        if (array[i] === openParenthesis && !subArrayOpen) {

            subArrayOpen = true;

        } else if (array[i] === openParenthesis && subArrayOpen) {

            subPar = true;
            opParQty++;
            subArray.push(array[i]);

        } else if (array[i] === closeParenthesis && subArrayOpen && opParQty === clParQty) {

            finalArray.push(subArray);
            subArray = [];
            subArrayOpen = false;
            opParQty = 0;
            clParQty = 0;
        
        } else if (array[i] === closeParenthesis && opParQty !== clParQty) {    

            clParQty++;
            subArray.push(array[i]);

        } else if (subArrayOpen) {

            subArray.push(array[i]);

        } else if (typeof(array[i]) === "object") {

            const convertSubArr = convertParenthesis(array[i]);
            finalArray.push(convertSubArr);

        } else {

            finalArray.push(array[i]);

        }

    }

    // TODO : 
    /*
    Tant que l'array contient des parenthèses:
    dans la boucle for, si array[i] est également un array, alors faire convert parenthesis sur array[i].
    Stocker le résultat dans une variable et intégrer cette variable dans finalArray.
    Si jamais on détecte la présence de parenthèse imbriqué, il faut réexecuter la fonction. sur l'array.    
    */

    // Executer la fonction si l'array a encore des parenthèses imbriquées
    if (subPar) {
        finalArray = convertParenthesis(finalArray);
    }

    return finalArray;

}

const findChars = (char, valueArr) => {
    
    for (let i = 0; i < valueArr.length; i++) {

        if (valueArr[i] === char) {
            return true;
        }

    }

    return false;

}

const calculate = (array, operatorArr) => {

    // première boucle pour gérer les calculs entre parenthèses
    for (let i = 0; i < array.length; i++) {

        if (Array.isArray(array[i])) {
            const arrResult = fullCalc(array[i]);
            array[i] = arrResult;
        }

    }

    for (let i = 0; i < array.length; i++) {

        if (operatorArr.includes(array[i])) {

            switch (array[i]) {
                case expSpecChars[0]:
                    const sum = array[i-1] + array[i+1];
                    insertResult(array, i, sum);
                    break;
                case expSpecChars[1]:
                    const sub = array[i-1] - array[i+1];
                    insertResult(array, i, sub);
                    break;
                case expSpecChars[2]:
                    const multiply = array[i-1] * array[i+1];
                    insertResult(array, i, multiply);
                    break;
                case expSpecChars[3]:
                    const divide = array[i-1] / array[i+1];
                    insertResult(array, i, divide);
                    break;
                case expSpecChars[4]:
                    const modulo = array[i-1] % array[i+1];
                    insertResult(array, i, modulo);
                    break;
            }

            // décrémenter i pour éviter de sauter des éléments (notamment des opéreteurs)
            i-=1;

        }
    }

    return array;

}


const insertResult = (array, index, result) => {
    array.insert(index, result);
    array.splice(index-1, 1);
    array.splice(index, 2);
}

const fullCalc = (array) => {

    const firstCalc = calculate(array, ["*","/", "%"]);
    const finalCalc = calculate(firstCalc, ["+","-"]);

    if (finalCalc.length === 1) {
        return finalCalc[0];
    }

}

const main = () => {

    const argument = argTester();

    if (argument) {
        //console.log(fullCalc(argument));
    }

}

main();