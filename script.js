let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = []; // "red", "blue", "yellow". length = 3, length - 1 = 2

let started = false;
let level = 0;
let remainScore = 0;

$(document).keypress(function() {
    if (!started) { // "!" operator returns true for false and false for true statements
        $("#level-title").text("Level " + level);

        nextSequence(true);//Pass "true" to indicate it's the first sequence

        started = true; // once when you press any on of your keys on your keyboard, if else's condition becomes falsy which is not run after that
    }

    $("#start").addClass("display");

});


$("#start").on('click', function () {
    if (!started) { // "!" operator returns true for false and false for true statements
        $("#level-title").text("Level " + level);

        nextSequence(true);//Pass "true" to indicate it's the first sequence

        started = true; // once when you press the key of your keyboard, if else's condition becomes falsy which is not run after that
    }

    $("#start").addClass("display");
})


$(".btn").click(function() {
    let userChosenColor = $(this).attr("id"); // returns a value of "id" attribute, in our case, it can be any color
    userClickedPattern.push(userChosenColor);

    
    playSound(userChosenColor); // for sound
    animatePress(userChosenColor); // for clicking animation

    checkAnswer(userClickedPattern.length-1); // to get the latest clicked button

    remainScore--;

    if (remainScore === 1) {
        $("#remain-score").text(`You've got ${remainScore} click`);
    } else if (remainScore > 1) {
        $("#remain-score").text(`You've got ${remainScore} clicks`);
    } else { // when "remainScore" <= 0, Show nothing on the screen
        $("#remain-score").text(" ");
    }
});


function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {// for current level
    // gamePattern[anyNumber] === userClickedPattern[anyNumber]
        if(gamePattern.length === userClickedPattern.length) { // this is second level check for number of elements in the array!
        /*
        In the second iteration, "gamePatter" would have two elements in its array whereas "userClickedPattern" would have one and not entering to the second "if-else" statement.
        */
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over"); // for instant flash red color to be appeared
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(() => { // for instant flash red color to be removed
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function animatePress(currentColor) { //This animation is for user-click
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function playSound(name) {
    let audio = new Audio("Sounds/" + name + ".mp3");
    audio.play();
}


function startOver() {
    level = 0;
    remainScore = 0;
    gamePattern = [];
    started = false;
    
    $("#start").removeClass("display");
}

