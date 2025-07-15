const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const PICTURES = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];

/* Declaring the alternative text for each image file */
const PICTURES_ALT = ["eyeball", "maybe a seashell", "flowers", "false gods", "niagara"];

/* Looping through images */
for (let i = 0; i < PICTURES.length; i++) {
    let img_path = "../images/" + PICTURES[i];
    img = document.createElement("img");
    img.setAttribute("src", img_path);
    img.setAttribute("alt", PICTURES_ALT[i]);
    thumbBar.appendChild(img);
}

const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
newImage.setAttribute('alt', xxx);
thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
