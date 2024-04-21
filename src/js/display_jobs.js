// Globala konstanter och variabler

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    getWorks();
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

async function getWorks() {
    let workplaces;
    try {
        const response = await fetch(`http://127.0.0.1:3000/workposts`);
        workplaces = await response.json();
    } catch (error) {
        console.log(error);
    }
    console.log(workplaces);
    displayWorks(workplaces);
}

function displayWorks(works) {
    let worksDiv = document.getElementById('works_div');
    console.log(works[0]);
    worksDiv.innerHTML = "";
    for (let index = 0; index < works.length; index++) {
        let art = document.createElement("article");
        let jobtitle = document.createElement("h3");
        jobtitle.innerHTML = works[index].jobTitle;
        let company = document.createElement("p");
        company.innerHTML = "Företag: "+works[index].companyName;
        let loc = document.createElement("p");
        loc.innerHTML = "Plats: "+works[index].location;
        let desc = document.createElement("p");
        if (works[index].description != undefined) {
            desc.innerHTML = "Arbetsbeskrivning: "+works[index].description;
        } else {
            desc.innerHTML = "Ingen arbetsbeskrivning";
        }
        desc.classList.add("artDesc");
        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Ta bort jobbpost";
        btnDelete.id = works[index]._id;
        btnDelete.addEventListener("click",  ()=>{
            deleteWorks(btnDelete.id)
        })
        
        art.appendChild(jobtitle);
        art.appendChild(company);
        art.appendChild(loc);
        art.appendChild(desc);
        art.appendChild(btnDelete);
        worksDiv.appendChild(art);

    }
}

// async function deleteWorks(id) {
//     const response = await fetch(`http://127.0.0.1:3000/workposts/${id}`, {
//         method: "DELETE"
//     });

//     const res = await response.json();
//     console.log(res);
//     getWorks();
// }