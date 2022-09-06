// Trouver une forme

const argTester = () => {

    const errorMsg = "Veuillez passer les noms de deux fichiers en argument (Format lisible : .txt).\nExemple : node feu02.js board.txt to_find.txt";
    const argument = process.argv.slice(2);
    const fileFormat = [".txt"];

    if (argument.length !== 2) {
        console.log(errorMsg);
        return false;
    }

}

argTester();