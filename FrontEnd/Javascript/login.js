

const connectSection = document.querySelector(".loginUI2");
const connectButton = document.createElement("button");
connectButton.innerHTML = "Se connecter";
connectButton.className = "btnConnect";
connectButton.type = "submit";

connectSection.appendChild(connectButton);

async function postData(url = "", data = {}) {

  const response = await fetch(url, {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache", 
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(data),
  });
  return response.json(); 
}

connectButton.addEventListener("click", async function (c) {
  c.preventDefault;
  var inputMail = document.getElementById("email").value;
  var inputPassword = document.getElementById("password").value;
  
  postData("http://localhost:5678/api/users/login", {email: inputMail,
  password: inputPassword}).then((response) => {
  
  const token = response.token

  localStorage.setItem('token', token) 
  if(token){
    window.location = "index.html";
  } else {
    alert("Identifiants erronés...");
  }
});
})
