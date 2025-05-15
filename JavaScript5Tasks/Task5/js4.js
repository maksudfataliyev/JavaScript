list = document.getElementById("list");
let previous = null;

list.addEventListener("click", function(event){
    event.target.style.backgroundColor = "black";
    if (previous!==null){
        previous.style.backgroundColor = "";
    }
    previous = event.target
});