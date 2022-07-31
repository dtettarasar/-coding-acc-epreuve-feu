// Évaluer une expression

const argTester = () => {

    const argument = process.argv.slice(2);
    const errMsg = "erreur argument";
    const intPattern = /^(\+?|-?)[0-9]+$/;
    const sepPattern = /\S/m;
    const expArr = [];

    if (argument.length !== 1) {

        console.log(errMsg);
        return false;
        
    }

    const strSplit = argument[0].split('');

    for (let i = 0; i < strSplit.length; i++) {
        
        const testChar = intPattern.test(strSplit[i]) || findOperators(strSplit[i]);
        const msgToLog = "char: " + strSplit[i] + " : " + testChar;

        console.log(msgToLog);

        if (testChar) {

            expArr.push(strSplit[i]);

        } else if (sepPattern.test(strSplit[i])) {

            console.log(errMsg);
            return false;

        }

    }

    console.log(expArr.join(''));

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