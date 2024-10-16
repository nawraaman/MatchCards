Initialize Variables:
Create an array cardImages with pairs of matching image URLs. Shuffle the array using a shuffle function shuffles (randomly reorders) elements of the array. Declare variables firstCard, secondCard to store the currently selected cards. Initialize matchedPairs to 0 to track the number of pairs found. Declare timer to store the timer interval ID and timeElapsed to track elapsed time. Use isTimerActive to determine if the timer run.

Create Board Function:
Loop through cardImages to create card elements. Assign each card a data attribute with its image URL. Add a click event listener that calls a function to handle card clicks.Append each card to the game board container in the DOM.

Handle Card Click Function:
Check if the clicked card is the same as firstCard or already matched; if so, return. Display the card's image by setting its background.If firstCard is null, set it to the clicked card.
If secondCard is null, set it to the clicked card and call checkForMatch().

Check For Match Function:
Compare the data attributes (image URLs) of firstCard and secondCard. If they match, mark both as matched by adding a CSS class. Increment matchedPairs. If matchedPairs equals the total number of pairs, call endGame().If they don't match, use setTimeout to hide the card images after a brief delay. Reset firstCard and secondCard to null.

End Game Function:
If isTimerActive is true, call stopTimer(). Display a win message to the user.

Timer Functions:
In startTimer(), use setInterval to increment timeElapsed every second and update the interface. In stopTimer(), clear the interval using clearInterval(timer).

Restart Game Function:
Reset matchedPairs and timeElapsed. Clear the game board in the DOM.
Call createBoard() to set up a new game with shuffled images. If isTimerActive is true, call startTimer().

citation:
Shuffle function:https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/

creating the board:https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

creating sound:https://gomakethings.com/how-to-play-a-sound-with-javascript/
