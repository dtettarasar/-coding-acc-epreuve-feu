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

    //console.log("subPar: " + subPar);

    // Executer la fonction si l'array a encore des parenthèses imbriquées
    if (subPar) {
        finalArray = convertParenthesis(finalArray);
    }
    
    /*console.log(finalArray);

    
    for (let i = 0; i < finalArray.length; i++) {
        console.log(finalArray[i]);
    }

    console.log("------");
    */

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

const calculate = (array, operator) => {

    const copyArr = [];

    for (let i = 0; i < array.length; i++) {

        if (array[i] === operator) {
            console.log("calcul repéré:")
            console.log(array[i-1]);
            console.log(array[i]);
            console.log(array[i+1]);
            console.log("----")

            switch (operator) {
                case "*":
                    const multiply = array[i-1] * array[i+1];
                    insertResult(array, i, multiply);
                    break;
                case "/":
                    const divide = array[i-1] / array[i+1];
                    insertResult(array, i, divide);
                    break;
            }
        }
    }

    console.log(array);

}

const insertResult = (array, index, result) => {
    array.insert(index, result);
    array.splice(index-1, 1);
    array.splice(index, 2);
}

const priorityCalc = (array) => {

    // Utiliser une for loop avec expSpecChars pour executer calculate avec chaque opérateur

    // exécuter les divisions, multiplication et modulo tant que les symboles associés sont encore présents dans l'array

    calculate(array, "*");
    calculate(array, "/");
}

const main = () => {

    const argument = argTester();

    if (argument) {
        //priorityCalc(argument);
        //calculate(argument, "*");
        calculate(argument, "*");
        calculate(argument, "/");
    }

}

main();