// Gets all the elements from the HTML
const grid = document.getElementById("grid");
const scoreValue = document.getElementById("score-value");
const resetButton = document.getElementById("reset-button");
let score = 0;
// The cards
const images = [
  "sand",
  "sand",
  "water",
  "water",
  "grass",
  "grass",
  "fire",
  "fire",
  "rocks",
  "rocks",
  "lightning",
  "lightning",
  "walnut",
  "walnut",
  "cloud",
  "cloud",
];

// Function to create a card element
function createCard(image) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.addEventListener("click", () => {
    //when clicked
    if (!card.classList.contains("flipped")) {
      //I'm basically using the classes as attributes because you can add more than 1
      card.classList.add("flipped");
      card.style.backgroundImage = `url(/images/${image}.jpg)`;
      clickedCards.push(card);
      //increments score
      score++;
      scoreValue.textContent = score;
      if (clickedCards.length === 2) {
        //checks if you clicked on 2 cards
        const [card1, card2] = clickedCards;
        if (
          //if same image and not the same card
          card1.style.backgroundImage === card2.style.backgroundImage &&
          card1 !== card2
        ) {
          remainingPairs--;
          if (remainingPairs === 0) {
            checkWin();
          }
          clickedCards = []; //resets clicked cards so you can click another 2
        } else {
          setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.style.backgroundImage = `url(/images/gray.jpg)`;
            card2.style.backgroundImage = `url(/images/gray.jpg)`;
            clickedCards = [];
          }, 1000);
        }
      }
    }
  });

  return card;
}

// Function to create the grid of cards
function createGrid() {
  //initialize the game
  grid.innerHTML = "";
  score = 0;
  scoreValue.textContent = score;
  clickedCards = [];
  remainingPairs = 8;

  shuffleArray(images);

  images.forEach((image) => {
    const card = createCard(image);
    grid.appendChild(card);
  });
}

// Shuffles the cards
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to check if the player has won
function checkWin() {
  if (remainingPairs === 0) {
    alert(`Game Over!\nYour Score: ${score}`);
  }
}

resetButton.addEventListener("click", createGrid);

createGrid();
