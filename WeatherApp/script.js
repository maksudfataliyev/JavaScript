let loginfield = document.getElementById('login_field');
let registerfield = document.getElementById('register_field');
let loginpage = document.getElementById('loginpage');
let registerpage = document.getElementById('registerpage');
let registerbutton = document.getElementById('registerbutton');
let rbigtext = document.getElementById('rbig_text');
let loginbutton = document.getElementById('loginbutton');
let bigtext = document.getElementById('big_text');

loginfield.addEventListener("click", () =>{
    loginfield.style.width = "280px";
    loginfield.style.height = "75px";
    registerfield.style.width = "250px";
    registerfield.style.height = "60px";
    registerpage.style.display = "none";
    loginpage.style.display = "flex";
});

registerfield.addEventListener("click", ()=>{
    registerfield.style.width = "280px";
    registerfield.style.height = "75px";
    loginfield.style.width = "250px";
    loginfield.style.height = "60px";
    loginpage.style.display = "none";
    registerpage.style.display = "flex";
});

registerbutton.addEventListener("click", ()=>{
    var rpassword = document.getElementById('rpasswordinput').value;
    var rpasswordrepeat = document.getElementById('rpasswordrepeat').value;
    var rusername = document.getElementById('rusernameinput').value;
    var location = document.getElementById('rlocationinput').value;


    if (rpasswordrepeat !== rpassword){
        rbigtext.textContent = "Passwords do not match!";
        return;
    }
    if (rpassword.length < 6){
        rbigtext.textContent = "Password is too short!";
        return; 
    }
    if (rusername == ""){
        rbigtext.textContent = "Enter the username!";
        return; 
    }

    let users;
    let stored = localStorage.getItem('users');

    if (stored !== null) { 
        users = JSON.parse(stored);
    }
    else {
        users = [];
    }


        let userinfo = {
            username: rusername,
            password: rpassword,
            location: location
        };

    users.push(userinfo); 
    localStorage.setItem('users', JSON.stringify(users)); 

    sessionStorage.setItem('loggeduser', JSON.stringify(userinfo));

    rbigtext.textContent = "Registration is done";
    
    
    document.getElementById('rpasswordinput').value = '';
    document.getElementById('rpasswordrepeat').value = '';
    document.getElementById('rusernameinput').value = '';
    document.getElementById('rlocationinput').value = '';


    window.location.href = "html2.html"

});


loginbutton.addEventListener('click', ()=> {
    var usernameinput = document.getElementById('usernameinput').value
    var passwordinput = document.getElementById('passwordinput').value

    let loggedin = false;
    let users;
    let stored = localStorage.getItem('users');

    if (stored !== null) { 
        users = JSON.parse(stored);
    }
    else {
        users = [];
    }

    users.forEach(element => {
        if (element.username == usernameinput && element.password == passwordinput){
            let temp = element.location
            loggedin = true;

            let loggeduser = {
                username: usernameinput,
                password: passwordinput,
                location: temp
            };

            sessionStorage.setItem('loggeduser', JSON.stringify(loggeduser));

            window.location.href = "html2.html"
            
            return;
        }
    });

    if (loggedin == false){
        bigtext.textContent = "Wrong username or password";
    }
});