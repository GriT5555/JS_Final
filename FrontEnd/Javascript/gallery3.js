var data = await fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(dataFetch => data = dataFetch);

const jsondata = [data]

for (let i = 0; i < data.length; i++) {

  const work = data[i];
  const sectiongallery = document.querySelector(".gallery");
  const projectElement = document.createElement("figure");
  const workElement = document.createElement("img");
  workElement.src = work.imageUrl;
  const titleElement = document.createElement("p");
  titleElement.innerText = work.title;
  projectElement.className = "element" + " " + work.categoryId; // displayed id 1 2 3 in class tag

  sectiongallery.appendChild(projectElement);
  projectElement.appendChild(workElement);
  projectElement.appendChild(titleElement);
}

// modgallery

for (let i = 0; i < data.length; i++) {

  const modwork = data[i];
  const modalgallery = document.querySelector("#modgallery");
  const modElements = document.createElement("assets");
  modElements.id = modwork.id;
  modElements.className = "assets";

  const modaldeletebutton = document.createElement('button');
  modaldeletebutton.className = "modaldeletebutton";
  modaldeletebutton.textContent = "";

  const delbuttonimg = document.createElement('img');
  delbuttonimg.src='poubelle.png';
  delbuttonimg.className="poubelle";

  const modworks = document.createElement("img");
  modworks.src = modwork.imageUrl;
  modworks.className= "modalgallery";

  modalgallery.appendChild(modElements);
  modElements.appendChild(modworks);
  modElements.appendChild(modaldeletebutton);  
  modaldeletebutton.appendChild(delbuttonimg);

}

const modaldeletebuttonS = document.querySelectorAll(".modaldeletebutton");
modaldeletebuttonS.forEach(button => {
  button.addEventListener("click", async () => {
    const Parentelement = button.closest(".assets")
      try {
        const Delresponse = await fetch("http://localhost:5678/api/works/" + Parentelement.id , {
          method: "DELETE",
          headers: { "Content-Type": "application/json",
                      Authorization: 'Bearer ' + localStorage.getItem('token')  
          }
        });

        if (!Delresponse.ok) {
          throw new Error("Supression non autorisée..."); 
        }
        Parentelement.remove(); // si c'est ok...
        alert("Le projet a bien été supprimé !") // outdated, on rempalce par des notifs
      } catch (error) {
        console.error(error);   // ou si ca rate
        alert("L'asset n'a pas pu être supprimé..."); 
      }
  })
}) 

var iddata = await fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(dataFetch => iddata = dataFetch)

const jsondata2 = [iddata]  

for (let i = 0; i < iddata.length; i++) {

  const categoryId = iddata[i];
  const sectionButtons = document.querySelector("#buttonrow");
  const buttonElement = document.createElement("button");
  buttonElement.innerHTML = categoryId.name;
  buttonElement.className = "buttons";
  buttonElement.id = categoryId.id;

  buttonElement.addEventListener("click", function (e) {
    document.querySelector(".gallery").innerHTML = "";
    var filteredlist = data.filter(x => x.categoryId == e.srcElement.id);
    for (let i = 0; i < filteredlist.length; i++) {

      const work = filteredlist[i];
      const sectiongallery = document.querySelector(".gallery");
      const projectElement = document.createElement("figure");
      const workElement = document.createElement("img");
      workElement.src = work.imageUrl;
      const titleElement = document.createElement("p");
      titleElement.innerText = work.title;
      projectElement.className = "element" + " " + work.categoryId; // displayed id 1 2 3 in class tag
    
      sectiongallery.appendChild(projectElement);
      projectElement.appendChild(workElement);
      projectElement.appendChild(titleElement);
    }

  })
  sectionButtons.appendChild(buttonElement);
}

const btnfilterall = document.querySelector(".buttons");
btnfilterall.addEventListener("click", function (f) {
  document.querySelector(".gallery").innerHTML = "";
  for (let i = 0; i < data.length; i++) {

    const work = data[i];
    const sectiongallery = document.querySelector(".gallery");
    const projectElement = document.createElement("figure");
    const workElement = document.createElement("img");
    workElement.src = work.imageUrl;
    const titleElement = document.createElement("p");
    titleElement.innerText = work.title;
    projectElement.className = "element" + " " + work.categoryId; // displayed id 1 2 3 in class tag
  
    sectiongallery.appendChild(projectElement);
    projectElement.appendChild(workElement);
    projectElement.appendChild(titleElement);
  }  
});
