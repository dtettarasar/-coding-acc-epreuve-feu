// Évaluer une expression

const argTester = () => {

    const argument = process.argv.slice(2);
    const errMsg = "erreur argument";
    const intPattern = /^(\+?|-?)[0-9]+$/;

    if (argument.length !== 1) {
        console.log(errMsg);
        return false;
    }

    const strSplit = argument[0].split('');

    console.log(strSplit);

}

argTester();