// =============== Selectors ===============
// Selectors stored as variables for easy reference
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// =============== Images ===============
// Dictionary of image names and alternate text
const IMAGE_PAIRS = {"pic1.jpg": "eyeball", "pic2.jpg": "maybe a seashell", 
                    "pic3.jpg": "flowers", "pic4.jpg": "false gods", "pic5.jpg": "niagara"};

// =============== Gallery Image Swapping ===============
// Enable swapping of gallery image 
function displayImage(event) {
    // Assign attributes to the display image
    displayedImage.setAttribute("src", this.src); 
    displayedImage.setAttribute("alt", this.alt);
}

// =============== New img Elements ===============
// Iterate through each src-alt pairing to create img elements
for (let i = 1; i < Object.keys(IMAGE_PAIRS).length + 1; i++) {
    // Create a new img element
    let img = document.createElement("img");
    // Establish attributes
    let key = "pic" + i + ".jpg";
    let img_path = "images/" + key;      
    let alt_text = IMAGE_PAIRS[key];
    // Assign attributes to the img element
    img.setAttribute("src", img_path);
    img.setAttribute("alt", alt_text);
    // Add the img to the div 
    thumbBar.appendChild(img);
    // Add click functionality
    img.addEventListener("click", displayImage)
}

// Determine the brightness of the image
function darkenLighten() {
    if (btn.getAttribute("class") == "dark") {
        btn.setAttribute("class", "light")
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
        btn.textContent = "Lighten";
        btn.style.background = "rgba(223, 220, 220, 0.6)"
    } else {
        btn.setAttribute("class", "dark")
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
        btn.textContent = "Darken";
        btn.style.background = "rgba(150, 150, 150, 0.6)"
    }
}

// Add button functionality for switching modes
btn.addEventListener("click", darkenLighten);



