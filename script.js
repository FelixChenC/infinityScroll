const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArry = [];
let isInitialLoad = true;

//Unsplash API
const initialCount = 5;
// const apiKey = config.APIKey;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${config.APIKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(PCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${config.APIKey}&count=${PCount}`;
}

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}
// helper function to set attribute on DOM elements
function setAttributes(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

// create elements for links and photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArry.length;
  // Run function for each object in photosArray
  photosArry.forEach((photo) => {
    // create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check when each is finish loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a> ,then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArry = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    // Catch error here
  }
}

// Check to see iff scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
  }
});

// On load
getPhotos();
