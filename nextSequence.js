function nextSequence(isFirstSequence) {
    userClickedPattern = [];
    level++;

    remainScore = level; // levels' number is always equal with the clicks on each round

    if (remainScore === 1) {
        $("#remain-score").text(`You've got ${level} click`);
    } else if (remainScore > 1) {
        $("#remain-score").text(`You've got ${level} clicks`);
    }
    // $("#remain-score").text(`You've got ${level} clicks`);

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4); // never reaches to 4, max=3, 0, 1, 2, 3 ==> to get the 4 colors of array
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);


    if (isFirstSequence) {
        playFirstSequence();//Play the first sequence with a faster animation
        playSound();
    } else {
        playSequence();//Play subsequent sequences with regular animation
        // playSound();
    }
}


function playFirstSequence() {
    let i = 0;
    const intervalId = setInterval(function () {// runs the function not only once, but regularly after the given interval of time.
        const currentColor = gamePattern[i];

        $("#" + currentColor).fadeIn(100).fadeOut(100).fadeIn(100);//computer animation
        playSound(currentColor);

        i++;

        if (i >= gamePattern.length) {//stops once all the colors in the gamePattern array have been shown. 
            clearInterval(intervalId);
        }

    }, 50); // Faster interval for the first sequence
}


function playSequence() {
    let i = 0;
    const intervalId = setInterval(function () {// runs the function not only once, but regularly after the given interval of time.
        const currentColor = gamePattern[i]; // gamePattern['red', 'blue']; "i" runs twice time

        $("#" + currentColor).fadeIn(100).fadeOut(100).fadeIn(100);//computer animation
        playSound(currentColor);

        i++;

        if (i >= gamePattern.length) { //stops once all the colors in the gamePattern array have been shown. 
            clearInterval(intervalId);
        }

    },600);
}