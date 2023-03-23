const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// TODO: Add the missing query selectors:
const score = document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timer'); // use querySelector() to get the timer element.
const LastScore = document.querySelector('#Lscore');
const HighScore = document.querySelector('#Hscore');
const easyBtn = document.querySelector('#easy');
const normalBtn = document.querySelector('#normal');
const hardBtn = document.querySelector('#hard')


let time = 30;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";
let gameStopped = stopGame();
let lastClicked;

function chooseEasy(event){
  difficulty = "easy";
  easyBtn.classList.add("highlight");
  normalBtn.classList.remove("highlight");
  hardBtn.classList.remove("highlight");
}
function chooseNormal(event){
  difficulty = "normal";
  normalBtn.classList.add("highlight");
  easyBtn.classList.remove("highlight");
  hardBtn.classList.remove("highlight");
}
function chooseHard(event){
  difficulty = "hard";
  hardBtn.classList.add("highlight");
  normalBtn.classList.remove("highlight");
  easyBtn.classList.remove("highlight");
}


/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */

//how to test & if else encapsulating hard is ok or is there a chance the setting isnt easy/normal/ or hard
function setDelay(difficulty) {
// TODO: Write your code here.
  let delay = 0;
  if(difficulty === 'easy') {
    delay = 1500;
  } else if(difficulty === 'normal') {
    delay = 1000;
  } else{
    delay = randomInteger(600,1200);
  }
  return delay
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */

//how to test
function chooseHole(holes) {
  // TODO: Write your code here.
  const index = randomInteger(0,8);
  const hole = holes[index]
  if(lastHole === hole){
    return chooseHole(holes)
  }
  lastHole = hole;
  return hole;
}

/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
//the if function should continuly return show up every iteration until gameStopped??
//something is wrong here with gameStopped
function gameOver() {
  // TODO: Write your code here
  if(time > 0) {
    timeoutID = showUp()
    return timeoutID
  } 
  else {
     //return gameStopped
      return stopGame()
  }
  
  //return stopGame()
}

/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/

//do i need to put anything in setDelay & chooseHole parameters
function showUp() {
  let delay = setDelay(difficulty); // TODO: Update so that it uses setDelay()
  const hole = chooseHole(holes);  // TODO: Update so that it use chooseHole()
  return showAndHide(hole, delay);
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/

function showAndHide(hole, delay){
  // TODO: call the toggleVisibility function so that it adds the 'show' class.
  toggleVisibility(hole);

  const timeoutID = setTimeout(() => {
    // TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
    toggleVisibility(hole)
    gameOver();
  }, delay); // TODO: change the setTimeout delay to the one provided as a parameter
  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/

////i think im calling the wrong css class here vvv no css class called show 
function toggleVisibility(hole){
  // TODO: add hole.classList.toggle so that it adds or removes the 'show' class.

 hole.classList.toggle("show")
  return hole;
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  // TODO: Write your code here
  points = points + 1;
  score.textContent = points;
  return points;
}

function bestScore(){
  if(points > HighScore.textContent){
    HighScore.textContent = points;
  }
}
/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  // TODO: Write your code here
   points = 0;
   score.textContent = points;
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  // TODO: Write your code here.
  // hint: this code is provided to you in the instructions.
  if (time >= 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  // TODO: Write your code here
   timer = setInterval(updateTimer, 1000);
  return timer;
}


/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  // TODO: Write your code here.
  if(lastClicked != event.target.id){
    lastClicked = event.target.id
    console.log(event.target.id,lastHole)
   updateScore()
    return points;
  }
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
//walk through this one, when i call whack do i need to add parathesis "whack()"
//got it i had to call setEventListeners()
function setEventListeners(){
  // TODO: Write your code here
  /*
  moles.forEach((mole) =>{
    mole.addEventListener("click", whack)
  })
*/
moles.forEach((mole) =>{
  mole.addEventListener("click", whack)
});
  return moles;
}
function setDifficulty(){
easyBtn.addEventListener("click",chooseEasy);
normalBtn.addEventListener("click", chooseNormal);
hardBtn.addEventListener("click",chooseHard)
return difficulty
}
setDifficulty();
 
/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  // stopAudio(song);  //optional
  clearInterval(timer);
  LastScore.textContent = points;
  bestScore();
  startButton.disabled = false;
  easyBtn.disabled = false;
  normalBtn.disabled = false;
  hardBtn.disabled = false;
 // console.log("stop")
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame(){
  setDuration(30);
  clearScore()
  showUp();
  startTimer();
  setEventListeners();
  startButton.disabled = true;
  easyBtn.disabled = true;
  normalBtn.disabled = true;
  hardBtn.disabled = true;
//  console.log("start")
  return "game started";
}

startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
