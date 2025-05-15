let circles = [
    document.getElementById("circle1"),
    document.getElementById("circle2"),
    document.getElementById("circle3")
];

let redIndex = 2;
let button = document.getElementById("button");
button.addEventListener("click", () => {

    circles[redIndex].style.backgroundColor = "black";

    redIndex = (redIndex + 1) % 3;

    circles[redIndex].style.backgroundColor = "red";
});
