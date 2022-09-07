// Trouver une forme

const argTester = () => {

    const errorMsg = "Veuillez passer les noms de deux fichiers en argument (Format lisible : .txt, .md).\nPassez en premier le plateau, en deuxième la forme à trouver. \nExemple : node feu02.js board.txt to_find.txt";
    const argument = process.argv.slice(2);

    let fileOnePath = null;
    let fileTwoPath = null;

    if (argument.length !== 2) {

        console.log(errorMsg);
        return false;

    } else {

        fileOnePath = argument[0];
        fileTwoPath = argument[1];

    }

    // Check les formats de fichiers 
    if (!checkFileFormat(fileOnePath) || !checkFileFormat(fileTwoPath)) {
        console.log(errorMsg);
        return false;
    }

    console.log("fileOne: " + fileOnePath);
    console.log("fileTwo: " + fileTwoPath);

}

const checkFileFormat = (filePath) => {

    const fileFormat = [".txt", ".md"];

    for (let i = 0; i < fileFormat.length; i++) {

        if (filePath.endsWith(fileFormat[i])) {
            return filePath;
        }

    }

    return false;

}

argTester();