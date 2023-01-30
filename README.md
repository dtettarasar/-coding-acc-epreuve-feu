# coding-acc-epreuve-feu
Solutions des exercices de l'épreuve du feu, du programme Coding Accelerator

## feu00.js - Afficher un rectangle

Programme qui affiche un rectangle dans le terminal.

~~~
$> node feu00.js 5 3
o---o
|   |
o---o

$> node feu00.js 5 1
o---o

$> node feu00.js 1 1
o
~~~

## feu01.js - Évaluer une expression

Programme qui reçoit une expression arithmétique dans une chaîne de caractères et en retourne le résultat après l’avoir calculé.
Vous devez gérer les 5 opérateurs suivants : “+” pour l’addition, “-” pour la soustraction, “*” la multiplication, “/” la division et “%” le modulo.

~~~
$> node feu01.js “4 + 21 * (1 - 2 / 2) + 38”
42
~~~

## feu02.js - Trouver une forme

Programme qui affiche la position de l’élément le plus en haut à droite (dans l’ordre) d’une forme au sein d’un plateau.

~~~
$> node feu02.js feu02_files/bg1.txt feu02_files/sm1.txt
Trouvé !
Coordonnées : 2,1
------
--123-
--321-
--123-
------
~~~

## feu03.js - Sudoku

Programme qui trouve et affiche la solution d’un Sudoku.

~~~
$> node feu03.js feu03_files/board1.txt
195784263
386529147
472163985
637852419
859641732
214397658
923418576
548976321
761235894
~~~

## feu04.js - Trouver le plus grand carré

Programme qui remplace les caractères vides par des caractères plein pour représenter le plus grand carré possible sur un plateau. 
Le plateau sera transmis dans un fichier. La première ligne du fichier contient les informations pour lire la carte : nombre de lignes du plateau, caractères pour “vide”, “obstacle” et “plein”.

~~~
$> node feu04.js feu04_files/board1.txt
.....ooooooo...............
....xooooooo...............
.....ooooooox..............
.....ooooooo...............
....xooooooo...............
.....ooooooo...x...........
.....ooooooo...............
......x..............x.....
..x.......x................
~~~

## feu05.js - Labyrinthe

Programme qui trouve le plus court chemin entre l’entrée et la sortie d’un labyrinthe en évitant les obstacles.

Le labyrinthe est transmis en argument du programme. La première ligne du labyrinthe contient les informations pour lire la carte : LIGNESxCOLS, caractère plein, vide, chemin, entrée et sortie du labyrinthe. 

Le but du programme est de remplacer les caractères “vide” par des caractères “chemin” pour représenter le plus court chemin pour traverser le labyrinthe. Un déplacement ne peut se faire que vers le haut, le bas, la droite ou la gauche.

~~~
$> node feu05.js feu05_files/board1.txt
10x10* o12
*****2****
* *   ****
*   **** *
* ****   *
*  * oooo2
*  **o*  *
*  ooo* **
***o **  *
1ooo  ****
**********
=> SORTIE ATTEINTE EN 12 COUPS !
~~~

