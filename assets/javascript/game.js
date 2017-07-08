//set objects
var reyObj = {
	hp: 120,
	attackPower: 8,
	counterAttackPower: 25,
	charSelect: false
}

var finnObj = {
	hp: 100,
	attackPower: 7,
	counterAttackPower: 30,
	charSelect: false
}

var kylorenObj = {
	hp: 140,
	attackPower: 9,
	counterAttackPower: 20,
	charSelect: false
}

var captainphasmaObj = {
	hp: 160,
	attackPower: 6,
	counterAttackPower: 15,
	charSelect: false
}

//set other variables needed
var attackCount = 0;
var fighterSelected = false;
var enemySelected = false;
var player;
var playerObj;
var enemy;
var enemyObj;
var clicks;

var characters = [Rey, Finn, KyloRen, CaptainPhasma];
var charLower = ["rey", "finn", "kyloren", "captainphasma"];
var charObj = [reyObj, finnObj, kylorenObj, captainphasmaObj];

function determineEnemies(){
	console.log(player);
	for (var i=0; i<charLower.length;i++){
		if (player != charLower[i]){
			console.log(characters[i]);
			$("#availableEnemies").append(characters[i]);
		}
		if (player == charLower[i]){
			playerObj = charObj[i];
			console.log(playerObj);
		}
	}
}

function determineEnemy(){
	console.log(enemy);
	for (var i=0; i<charLower.length;i++){
		if (enemy == charLower[i]){
			console.log(characters[i]);
			$("#defender").append(characters[i]);
			enemyObj = charObj[i];
			console.log(enemyObj);
		}
	}
}

$(document).on("click", function(e){
	console.log(fighterSelected);

	if (fighterSelected === false){
		console.log(e.target.id);
		player = (e.target.id).toLowerCase();
		console.log(player);
		// player.charSelect = true;
		fighterSelected = true;
		console.log(fighterSelected);
		determineEnemies();

	}
	else if (fighterSelected === true){
		console.log(e.target.id);
		enemy = (e.target.id).toLowerCase();
		console.log(enemy);
		determineEnemy();


	}
});


$(".attack").on("click", function(){
	attackCount++;
	console.log(attackCount);
	enemyObj.hp = enemyObj.hp - playerObj.attackPower;
	console.log(enemyObj.hp);
	//if enemy.hp is <=0, enemy is killed. if not then keep playing
	playerObj.hp = playerObj.hp - enemyObj.counterAttackPower;
	console.log(playerObj.hp);


});