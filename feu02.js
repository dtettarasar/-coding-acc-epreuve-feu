// Trouver une forme

const argTester = () => {

    const errorMsg = "Veuillez passer les noms de deux fichiers en argument (Format lisible : .txt).\nPassez en premier le plateau, en deuxième la forme à trouver. \nExemple : node feu02.js board.txt to_find.txt";
    const argument = process.argv.slice(2);
    const fileFormat = [".txt"];

    let fileOnePath = null;
    let fileTwoPath = null;

    if (argument.length !== 2) {

        console.log(errorMsg);
        return false;

    } else {

        fileOnePath = argument[0];
        fileTwoPath = argument[1];

    }

    console.log("fileOne: " + fileOnePath);
    console.log("fileTwo: " + fileTwoPath);

}

argTester();