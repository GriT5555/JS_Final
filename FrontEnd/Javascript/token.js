document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('token') === null ){
        document.getElementById("LogoutButton").style.display="none",
        document.getElementById("modbutton").style.display="none",
        document.getElementById("hairs").style.display="none";
    }
    else{
        document.getElementById("logbutton").style.display="none";
        document.getElementById("LogoutButton").style.display="flex";
        document.getElementById("LogoutButton").style.justifyContent="flex-end";
        document.getElementById("buttonrow").style.display="none";
        document.getElementById("hairs").style.display="flex";
    }
}, false);

document.getElementById("LogoutButton").addEventListener("click", function(){
    localStorage.clear();
    window.location = "Connect.html";
});