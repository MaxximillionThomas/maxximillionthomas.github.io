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

// =============== New img Elements ===============
// Iterate through each src-alt pairing to create img elements
for (let i = 0; i < PICTURES.length; i++) {
    // Create a new img element
    let img = document.createElement("img");
    // Establish attributes
    let img_path = "../images/" + PICTURES[i];
    let alt_text = PICTURES_ALT[i];
    // Assign attributes to the img element
    img.setAttribute("src", img_path);
    img.setAttribute("alt", alt_text);
    // Add the img to the div 
    thumbBar.appendChild(img);
}

// =============== Gallery Image Swapping ===============
// Enable swapping of gallery image 
IMG_ELEMENTS.forEach((picture) => {
    picture.addEventListener("click", displayImage)
});


/* Wiring up the Darken/Lighten button */
