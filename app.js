//selecting element from the DOM
const cardElm = document.querySelectorAll('.card')
const gameBoard = document.querySelector('.board')
const timerElm = document.getElementById('timer')
const resetBtn = document.getElementById('reset')
const startBtn = document.getElementById('start')
const difficulties = document.querySelectorAll("input[name='difficulty']")
let selectedDifficulty = 'normal'
let cardImages = [
  './images/1.jpeg',
  './images/2.jpeg',
  './images/3.jpeg',
  './images/4.jpeg',
  './images/5.jpeg',
  './images/6.jpeg',
  './images/7.jpeg',
  './images/8.jpeg',
  './images/9.jpeg',
  './images/10.jpeg',
  './images/11.jpeg',
  './images/12.jpeg',
  './images/13.jpeg',
  './images/14.jpeg',
  './images/15.jpeg'
]
let firstCard = null
let secondCard = null
let matchedPairs = 0 // to see how many pairs that the player has sucesfully matched
let timer
let timeElapsed = 0
let isTimerActive = false // dude u want to stop the time and have condition to start so use this
let difficultyImages = [] // ah the difficult part for me so I make empty array to choose no. of images/cards displayed and shuffled based on difficulty
let canClick = false // I see if I comment you the player can play even he is not starting the game

// sounds
const winSound = new Audio('./sounds/winSound.wav')

// function to shuffle images Fisher-Yates shuffle algorithm (cited)
const shuffleImages = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// function to start the game
const start = () => {
  canClick = true // allow clicking on the cards :)
  startTimer()
}

// function to set difficulty
const setDifficulty = () => {
  let numberOfImages = 0
  if (selectedDifficulty === 'easy') {
    numberOfImages = 5 // 5 pairs
  } else if (selectedDifficulty === 'normal') {
    numberOfImages = 10 // 10 pairs
  } else if (selectedDifficulty === 'hard') {
    numberOfImages = 15 // 15 pairs
  }
  difficultyImages = []
  for (let i = 0; i < numberOfImages; i++) {
    difficultyImages.push(cardImages[i], cardImages[i]) // duplicate each image for matching pairs
  }
}

// function to create the board
const createBoard = () => {
  gameBoard.innerHTML = '' // Clear the board
  setDifficulty()
  const shuffledImages = shuffleImages(difficultyImages)
  shuffledImages.forEach((image) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('data-image', image) // store image path in custom data attribute
    card.addEventListener('click', handleCardClick)
    gameBoard.appendChild(card) // add card to the game board
  })
}

// function to handle card click
const handleCardClick = (event) => {
  if (!canClick) return // u cant click when the game not start
  const cardElm = event.target
  if (cardElm === firstCard || cardElm.classList.contains('matched')) return // cant click if it is already matched
  cardElm.style.backgroundImage = `url(${cardElm.getAttribute('data-image')})` //display image
  if (!firstCard) {
    firstCard = cardElm
  } else if (!secondCard) {
    secondCard = cardElm
    canClick = false
    checkForMatch()
  }
}

// function to check if two cards match
const checkForMatch = () => {
  const imag1 = firstCard.getAttribute('data-image')
  const imag2 = secondCard.getAttribute('data-image')
  if (imag1 === imag2) {
    firstCard.classList.add('matched')
    secondCard.classList.add('matched')
    matchedPairs++
    resetCardSelection()
    if (matchedPairs === difficultyImages.length / 2) {
      winGame()
    }
    canClick = true // cant click more than two cards
  } else {
    setTimeout(() => {
      // if not match display the cards for 1 sec
      firstCard.style.backgroundImage = ''
      secondCard.style.backgroundImage = ''
      resetCardSelection()
      canClick = true
    }, 1000)
  }
}

// function to reset card selection
const resetCardSelection = () => {
  firstCard = null
  secondCard = null
}

// function to handle game win
const winGame = () => {
  if (isTimerActive) {
    stopTimer()
  }
  winSound.play() // play win sound
  alert(`You win! Time: ${timeElapsed} seconds`)
}

// function to start the timer
const startTimer = () => {
  if (isTimerActive) return // Prevent multiple timers from starting
  isTimerActive = true
  timer = setInterval(() => {
    timeElapsed++
    timerElm.textContent = `Timer: ${timeElapsed} seconds`
  }, 1000)
}

// function to stop the timer
const stopTimer = () => {
  clearInterval(timer)
  isTimerActive = false
}

// create the default board
createBoard()

// event listener for difficulty change
difficulties.forEach((diff) => {
  diff.addEventListener('click', () => {
    selectedDifficulty = diff.value // change difficulty
    createBoard()
    canClick = false // cant clicking until start
    stopTimer() // stop timer when changing difficulty
    timeElapsed = 0
    timerElm.textContent = 'Timer: 0 seconds' // reset timer display
  })
})

// event listener for start button
startBtn.addEventListener('click', () => {
  start()
})

// event listener for reset button
resetBtn.addEventListener('click', () => {
  matchedPairs = 0
  timeElapsed = 0
  timerElm.textContent = 'Timer: 0 seconds'
  resetCardSelection()
  createBoard()
  canClick = false
  stopTimer()
})
