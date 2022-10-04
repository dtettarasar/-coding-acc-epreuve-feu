// Sudoku

const argTester = () => {
    /*
    - 1 seul fichier passé en argument
    - fichier au format .txt
    - vérifier que le fichier texte possède 9 lignes
    - avec une regex, vérifier que le texte de chaque ligne contient 9 char. chaque char est soit un nombre soit un point "."
    */

    const argument = process.argv.slice(2);
    const errorMsg = "erreur";
    const fileFormats = [".txt", ".md"];
    let boardFilePath = null;

    if (argument.length !== 1) {

        console.log(errorMsg);
        return false;

    } else {
        boardFilePath = argument[0];
    }

    console.log(boardFilePath);

}

argTester();