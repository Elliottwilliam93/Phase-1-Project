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

let storedValue;
      const cardTemplate = document.getElementById("card-template");

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
        let mydata = fetch(`https://api.open5e.com/monsters/${newValue}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const element = data;
            console.log(element);
            let crSRC;

            if (element.challenge_rating <= 5 ) {
              crSRC = '<img src="resources/diablo3-difficulty-levels (2).png" style="height: 150px; width: 150px; border-radius: 25px;">'
            }
            else if (element.challenge_rating <= 10 ) {
              crSRC = '<img src="resources/diablo3-difficulty-levels.png" style="height: 150px; width: 150px; border-radius: 25px;">'
            }
            else if (element.challenge_rating <= 15 ) {
              crSRC = '<img src="resources/diablo3-difficulty-levels (3).png" style="height: 150px; width: 150px; border-radius: 25px;">'
            }
            else {
              crSRC = '<img src="resources/diablo3-difficulty-levels (4).png" style="height: 150px; width: 150px; border-radius: 25px;">'
            }
            if(element.detail === "Not found.") {
              alert("Monster Not Found!")
            }else {
            const newCard = cardTemplate.content.cloneNode(true);
            newCard.querySelector(".card-title").textContent = element.name;
            newCard.querySelector(".card-size").textContent = element.size;
            newCard.querySelector(".card-type").textContent = element.type;
            newCard.querySelector(".cr-img").innerHTML = crSRC
            newCard.querySelector(".card-alignment").textContent = element.alignment;
            newCard.querySelector(".card-challenge_rating").textContent = element.challenge_rating
            
            const likeButton = newCard.querySelector(".like-button");
            let likes = 0;
            likeButton.addEventListener("click", () => {
              likes++;
              likeButton.textContent = `Like (${likes})`;
            });
            
            const demoSection = document.getElementById("demo");
            demoSection.appendChild(newCard);
          }
            storedValue = "";
            mydata = "";
          })
          .catch((error) => {           
          });
      }
      const form = document.querySelector('.comment-section form');
      const commentHistory = document.querySelector('.comment-history');

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const comment = form.comment.value.trim();
        if (!comment) return;

        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
          <p>${comment}</p>
          <span>${new Date().toLocaleString()}</span>
          `;
        commentHistory.appendChild(commentElement);
        form.reset();
      });
