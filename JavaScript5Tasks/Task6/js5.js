let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let tip1 = document.getElementById("tip1");
let tip2 = document.getElementById("tip2");

button1.addEventListener('mouseover',function(){
    tip1.style.display = "block";
});

button1.addEventListener('mouseout',function(){
    tip1.style.display = "none";
});


button2.addEventListener('mouseover',function(){
    tip2.style.display = "block";
});


button2.addEventListener('mouseout',function(){
    tip2.style.display = "none";
});