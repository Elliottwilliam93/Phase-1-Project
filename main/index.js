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
    document.body.style.backgroundSize = 'cover'; // set background size to cover
    backgroundImageIndex = (backgroundImageIndex + 1) % backgroundImages.length;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    changeBackgroundImage(); // set initial background image
    setInterval(changeBackgroundImage, 10000); // change background image every 10 seconds
  
    // CSS transitions for fade effect
    document.body.style.transition = 'background-image 2s ease-in-out';
  });
