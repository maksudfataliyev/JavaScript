var field = document.querySelector(".field");
var ball = document.querySelector(".ball");

field.addEventListener("click", (e) => {
    var fieldRect = field.getBoundingClientRect(); 
    var ballWidth = ball.offsetWidth; 
    var ballHeight = ball.offsetHeight;  

    var clickX = e.clientX - fieldRect.left;  
    var clickY = e.clientY - fieldRect.top;   

    var maxX = field.clientWidth - ballWidth;
    var maxY = field.clientHeight - ballHeight;

    if (clickX >= 0 && clickX <= maxX && clickY >= 0 && clickY <= maxY) {
        ball.style.left = `${clickX}px`;   
        ball.style.top = `${clickY}px`;  
    }
});
