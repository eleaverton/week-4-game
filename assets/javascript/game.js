//set objects
var reyObj = {
    hp: 120,
    attackPower: 17,
    counterAttackPower: 20,
    charSelect: false
}

var finnObj = {
    hp: 100,
    attackPower: 20,
    counterAttackPower: 23,
    charSelect: false
}

var kylorenObj = {
    hp: 140,
    attackPower: 15,
    counterAttackPower: 17,
    charSelect: false
}

var captainphasmaObj = {
    hp: 160,
    attackPower: 13,
    counterAttackPower: 15,
    charSelect: false
}

//set other variables needed
var attackCount = 0;
var fighterSelected = false;
var enemySelected = false;
var lockButtons = false;
var lockCharScore = false;
var player;
var playerObj;
var enemy;
var enemyObj;



//these arrays are to switch between the div id and the object
//associated with each div
var characters = [rey, finn, kyloren, captainphasma];
var charLower = ["rey", "finn", "kyloren", "captainphasma"];
var charObj = [reyObj, finnObj, kylorenObj, captainphasmaObj];

//this function is run to determine which characters are 
//available to select as enemies
function determineEnemies() {
    console.log(player);
    for (var i = 0; i < charLower.length; i++) {
        if (player != charLower[i]) {
            console.log(characters[i]);
            $("#availableEnemies").append(characters[i]);
            $("#" + charLower[i]).css("width", "70%");
        }
        if (player == charLower[i]) {
            playerObj = charObj[i];
            console.log(playerObj);
            $("#charSpace").append(characters[i]);
            $("#" + player).css("width", "70%");
        }
    }
}

//this function is run to determine which character will be the  
//enemy for this round
function determineEnemy() {
    console.log(enemy);
    for (var i = 0; i < charLower.length; i++) {
        if (enemy == charLower[i]) {
            console.log(characters[i]);
            $("#defSpace").empty();
            $("#defSpace").append(characters[i]);
            enemyObj = charObj[i];
            console.log(enemyObj);
            $("#" + enemy).css("width", "70%");
        }
    }
}

//when the div charClick is clicked, check to see if fighter is 
//selected and that character selections are not locked
//if false, this indicates the first click - selecting the fighter
//if true, fighter has been selected and we are choosing a single enemy
//from the available enemies for this round
$("#charClick").on("click", function(e) {
    console.log(fighterSelected);

    if (fighterSelected === false && !lockButtons) {
        console.log(e.target.id);
        player = (e.target.id).toLowerCase();
        console.log(player);
        fighterSelected = true;
        console.log(fighterSelected);
        determineEnemies();
        $("#characterPick").empty();

    } else if (fighterSelected === true && !lockButtons) {
        console.log(e.target.id);
        enemy = (e.target.id).toLowerCase();
        console.log(enemy);
        determineEnemy();
        //no more characters can be clicked until these two fight
        lockButtons = true;
        //once enemy is selected, character score can change
        lockCharScore = false;
    }

});

//on the click of the attack button, the attack count goes up and
//the player attacks the enemy.
$(".attack").on("click", function() {
    if (!lockCharScore) {
        attackCount++;
        console.log(attackCount);
        console.log(playerObj.attackPower * attackCount);
        enemyObj.hp = enemyObj.hp - playerObj.attackPower * attackCount;
        console.log(enemyObj.hp);
        enemyscoreid = enemy + "hp";
        console.log(enemyscoreid);
        $("#" + enemyscoreid).html(enemyObj.hp);
        //if enemyObj.hp is <=0, enemy is killed. if not then keep playing
        if (enemyObj.hp <= 0) {
            $("#" + enemy).remove();
            enemy = "";
            //character buttons are unlocked so a new defender can be chosen
            lockButtons = false;
            //character score can't change unless new enemy is chosen
            lockCharScore = true;
            $("#defSpace").html("Pick a new defender");
        }

        playerObj.hp = playerObj.hp - enemyObj.counterAttackPower;
        console.log(playerObj.hp);
        playerscoreid = player + "hp";
        console.log(playerscoreid);
        $("#" + playerscoreid).html(playerObj.hp);
        //if playerObj.hp is <= 0, character has been killed and the game needs to be started over
        if (playerObj.hp <= 0) {
            $("#" + player).remove();
            player = "";
            $("#charSpace").html("Click Refresh to play again!");

        }

    }

});
