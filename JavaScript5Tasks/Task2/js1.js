let openbutton = document.getElementById('openbutton');
let closebutton = document.getElementById('closeButton');
let modalwindow = document.getElementById('myModal');

openbutton.addEventListener('click', function() {
    modalwindow.style.display = "flex"; 
});

closebutton.addEventListener('click', function() {
    modalwindow.style.display = "none"; 
});
