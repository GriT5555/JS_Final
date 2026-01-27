const token = localStorage.getItem('token')

function Authed() {
    if (localStorage.getItem('token') === null );
    else {
        document.getElementById("logbutton").style.display="none";
        document.getElementById("connected").style.display="flex";
        document.getElementById("connected").style.justifyContent="flex-end";
        document.getElementById("connected").style.margin="2em";
    }
}

