document.getElementById('modbutton').addEventListener('click',function() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var modal = document.getElementById('modcontainer');
    modal.classList.toggle('active');
}
);

document.getElementById('closemod').addEventListener('click',function(){
    var modal = document.getElementById('modcontainer');
    modal.classList.toggle('active');
});

document.getElementById('picadder').addEventListener('click',function(){
    var modal2 = document.getElementById('modcontainer2');
    modal2.classList.toggle('active');
    var modal = document.getElementById('modcontainer');
    modal.classList.toggle('active');
    loadCategories();
});

document.getElementById('closemod2').addEventListener('click', function(){
    var modal2 = document.getElementById('modcontainer2');
    modal2.classList.toggle('active');
});

document.getElementById('return').addEventListener('click', function(){
    var modal = document.getElementById('modcontainer');
    modal.classList.toggle('active');
    var modal2 = document.getElementById('modcontainer2');
    modal2.classList.toggle('active');

    var dropdown = document.getElementById("dropdowncatI");
    if (dropdown) {
        let L = dropdown.options.length - 1;
        for (let i = L; i >= 0; i--) {
            dropdown.remove(i);
        }}
    const reloadworks = fetch('http://localhost:5678/api/works');
});

//dropzone action

const dropzone = document.getElementById("dropzone");
const fileupload = document.getElementById("imageInput")
const imgpreview = document.getElementById("imgdz")

dropzone.addEventListener("click", ()=> fileupload.click());
fileupload.addEventListener("change", (e) => {
    if (e.target.files.length) {
        showPreview(e.target.files[0]);
    }
});

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "#333";
});

dropzone.addEventListener('dragleave', (e) => {
    dropzone.style.borderColor = "none";
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    if(e.dataTransfer.files.length){
        showPreview(e.dataTransfer.files[0]);
        const file = e.dataTransfer.files[0];
        const Imageupload = document.getElementById("imageInput");
        const Imagedata = new DataTransfer();
        Imagedata.items.add(file);
        Imageupload.files = Imagedata.files;
    }
    const dzbuttonA = document.getElementById("dzbutton");
    dzbuttonA.classList.toggle('active');
    const dztext = document.getElementById("dztext");
    dztext.classList.toggle("active");
});

function showPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        imgpreview.src = e.target.result;
        imgpreview.style.display = "block";
    };
    reader.readAsDataURL(file);
}


// SUBMIT DISBALE

function disablesubmit(){
    const invalidform = document.querySelector('form:invalid');
    const submitbtn = document.getElementById('mod2submit');
    if(invalidform) {
        submitbtn.setAttribute('disabled', true);
        document.getElementById('mod2submit').style.backgroundColor="grey";

    } else {
        submitbtn.disabled = false;
        document.getElementById('mod2submit').style.backgroundColor="#1B6055";
    }
} // disable the submiut button if title and categories aren't filled in

disablesubmit();

const inputs = document.getElementsByTagName("input");
for (let input of inputs) {
    input.addEventListener('change', disablesubmit)
} // monitors any changing value  on an input field, then calls the 'disableField()' function

//image preview

async function loadCategories() {
    try {
        const refetch = await fetch('http://localhost:5678/api/works');
        const DDCats = await refetch.json();
        const CatMap = new Map();

        DDCats.forEach(DDCat => {
            if (DDCat.category && !CatMap.has(DDCat.category.id)) {
                CatMap.set(DDCat.category.id, DDCat.category.name);
            }
        });

        const dropdown = document.getElementById("dropdowncatI");
        CatMap.forEach((name, id) => {
            const CatOption = document.createElement("option");
            CatOption.value = id;
            CatOption.textContent = name;
            dropdown.appendChild(CatOption);
        });

    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

document.getElementById("mod2submit").addEventListener('click', async function(event){
    event.preventDefault();
    const form = document.getElementById("newassetinput");
    const Ftitle = form.querySelector('input[name="title"]').value;
    const Fcategory = form.querySelector('select[name="assetid"]').value;
    const Fimage = document.getElementById("imageInput").files[0];

    if(!Fimage){
        console.error("Aucune image selectionnée");
        return;
    }

    // Utiliser FormData pour envoyer les données en multipart/form-data
    const formData = new FormData();
    formData.append('title', Ftitle);
    formData.append('category', Fcategory);
    formData.append('image', Fimage);

    try {
        const postform = await fetch("http://localhost:5678/api/works/", {
            method: 'POST',
            body: formData,
            headers: { 
                    Authorization: 'Bearer ' + localStorage.getItem('token')  
          }
        });

        if (!postform.ok){
            throw new Error("Status: ${postform.status}")
        }

        const result = await postform.json();
        console.log('Work added:', result);
        form.reset();

    } catch (error) {
        console.error('Error:', error);
    }
});

