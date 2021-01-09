## The main idea of building a 2048 game:

## init:

#### 1.*function init()*  : initial a new outlook, setup a list to store number, update the HTML and CSS

#### 2.*function generateOneNumber()* : generate a 2 or 4  randomly on a random empty place

#### 3.add eventlistener to keyboard input

#### 4.add 2 at top-left at the beginning.



## update progress:

#### 1.function *checkBackgroundColor()* : check the number added and generate the background color.

#### 2.function *checkFigureColor()*: check the number and set the color of figure.

#### 3.function *checkMerge()* : check there is a merge in each row/column.

#### 4.function *moveBox()*: check if there is a merge, and create a new list to store the new position.

#### 5.function *updateApperance()*: update the html and css according to the merge result.



## Merge detail:

#### 1.checkmerge(): (Take Move Left as example) 

#### foreach index( left->right ) in row/column, check if index not 0, check next index equal to formal one(keep check not 0), if so merge, add result to newDict[], and check next two index(if exist), or add to newDict[], and check next one index(if exist) 

#### [0,1,2,3] if index=3,stop check, update this row/column

#### 2.function *checkExistMerge()*: if no empty, check each column and row can be merge.(return false mean there is no merge)

#### 3.after merge all rows/columns, check the status.



## check result:

#### 1.function *checkFull()*: check if there exist a empty place.

#### 2.function *checkStatus()*: after merge progress, check the status: contain *checklose()*, *checkwin()* .

#### 3.function *checklose()* : check if (*checkempty()* == false && *checkExistMerge()* == false), stop the game.

#### 4.function checkwin(): check if there is a 2048 in a list.





#### 

