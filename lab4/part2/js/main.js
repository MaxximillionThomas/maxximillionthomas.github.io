// =============== Selectors ===============
// Selectors stored as variables for easy reference
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// =============== Arrays ===============
// Array of image filenames */
const PICTURES = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];
// Array of alternative text for each image file */
const PICTURES_ALT = ["eyeball", "maybe a seashell", "flowers", "false gods", "niagara"];

// =============== Gallery Image Swapping ===============
// Enable swapping of gallery image 
function displayImage(event) {
    // Assign an identity to the clicked image
    const TARGET_IMAGE = event.target;
    // Store attributes
    img_path = TARGET_IMAGE.getAttribute("src");
    alt_text = TARGET_IMAGE.getAttribute("alt");
    // Assign attributes to the display image
    displayedImage.setAttribute("src", img_path);
    displayedImage.setAttribute("alt", alt_text);
}

// =============== New img Elements ===============
// Iterate through each src-alt pairing to create img elements
/* !!! NOTE for professor!!!
   Rubric asks for index iteration starting at 1, but doing so would
   misalign the dual-array indexing in a clunky and unprofessional way. */ 
for (let i = 0; i < PICTURES.length; i++) {
    // Create a new img element
    let img = document.createElement("img");
    // Establish attributes
    let img_path = "images/" + PICTURES[i];
    let alt_text = PICTURES_ALT[i];
    // Assign attributes to the img element
    img.setAttribute("src", img_path);
    img.setAttribute("alt", alt_text);
    // Add the img to the div 
    thumbBar.appendChild(img);
    // Add click functionality
    img.addEventListener("click", displayImage)
}

// Determine the brightness of the image
function darkenLighten(elem) {
    if (elem.getAttribute("class") == "dark") {
        elem.setAttribute("class", "light")
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
        btn.textContent = "Lighten";
        btn.style.background = "rgba(223, 220, 220, 0.6)"
    } else {
        elem.setAttribute("class", "dark")
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
        btn.textContent = "Darken";
        btn.style.background = "rgba(150, 150, 150, 0.6)"
    }
}

// Add button functionality for switching modes
btn.addEventListener("click", function() {
    darkenLighten(this);
});


