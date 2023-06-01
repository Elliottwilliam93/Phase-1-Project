const backgroundImages = [
  'https://wallpaperaccess.com/full/117898.jpg',
  'https://wallpaperaccess.com/full/2077763.jpg',
  'https://e1.pxfuel.com/desktop-wallpaper/875/598/desktop-wallpaper-fantasy-art-artwork-pathfinder-and-mobile-backgrounds-pathfinder-kingmaker.jpg',
  'https://wallpaper-house.com/data/out/9/wallpaper2you_294923.jpg',
  'https://e0.pxfuel.com/wallpapers/145/280/desktop-wallpaper-dota-1-digital.jpg',
];

let backgroundImageIndex = 0;

function changeBackgroundImage() {
  const currentImage = backgroundImages[backgroundImageIndex];
  document.body.style.backgroundImage = `url(${currentImage})`;
  document.body.style.backgroundSize = 'cover';
  backgroundImageIndex = (backgroundImageIndex + 1) % backgroundImages.length;
}

document.addEventListener('DOMContentLoaded', function() {
  changeBackgroundImage();
  setInterval(changeBackgroundImage, 10000);

  document.body.style.transition = 'background-image 2s ease-in-out';
});

const cardTemplate = document.getElementById("card-template");
const demoSection = document.getElementById("demo");

let storedValue;

function storeInputValue() {
  let input = document.getElementById("myInput");
  storedValue = input.value;
  useStoredValue();
}

function convertSpacesToDashes(str) {
  return str.replace(/\s+/g, "-");
}

function useStoredValue() {
  let lowerValue = storedValue.toLowerCase();
  let newValue = convertSpacesToDashes(lowerValue);
  fetch(`https://api.open5e.com/monsters/${newValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const element = data;

      if (element.detail === "Not found.") {
        alert("Monster Not Found!");
      } else {
        const monsters = Array.isArray(element) ? element : [element];
        monsters.forEach((monster) => {
          const newCard = createCard(monster);
          demoSection.appendChild(newCard);
        });
      }

      storedValue = "";
    })
    .catch((error) => {
      console.error(error);
    });
}

function createCard(monster) {
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector(".card-title").textContent = monster.name;
  newCard.querySelector(".card-size").textContent = monster.size;
  newCard.querySelector(".card-type").textContent = monster.type;
  newCard.querySelector(".card-alignment").textContent = monster.alignment;
  newCard.querySelector(".card-challenge_rating").textContent = monster.challenge_rating;

  const likeButton = newCard.querySelector(".like-button");
  let likes = 0;
  likeButton.addEventListener("click", () => {
    likes++;
    likeButton.textContent = `Like (${likes})`;
  });

  let challengeRatingImg = newCard.querySelector(".cr-img");
  let challengeRating = monster.challenge_rating;
  let crSRC = "";

  if (challengeRating <= 5) {
    crSRC = './resources/diablo3-difficulty-levels (2).png';
  } else if (challengeRating <= 10) {
    crSRC = './resources/diablo3-difficulty-levels.png';
  } else if (challengeRating <= 15) {
    crSRC = './resources/diablo3-difficulty-levels (3).png';
  } else {
    crSRC = './resources/diablo3-difficulty-levels (4).png'
  }

  const imgElement = document.createElement("img");
  imgElement.src = crSRC;
  challengeRatingImg.appendChild(imgElement);
  imgElement.src = crSRC;
  imgElement.style.width = "150px";
  imgElement.style.height = "150px";
  imgElement.style.borderRadius = "25px";

  return newCard;
}

const form = document.querySelector(".comment-section form");
const commentHistory = document.querySelector(".comment-history");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const comment = form.comment.value.trim();
  if (!comment) return;

  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");
  commentElement.innerHTML = `
    <p>${comment}</p>
    <span>${new Date().toLocaleString()}</span>
  `;
  commentHistory.appendChild(commentElement);
  form.reset();
});