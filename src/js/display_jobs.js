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
        const response = await fetch(`http://127.0.0.1:3000/api/workplaces`);
        workplaces = await response.json();
    } catch (error) {
        console.log(error);
    }
    console.log(workplaces);
    displayWorks(workplaces);
}

function displayWorks(works) {
    let worksDiv = document.getElementById('works_div');
    worksDiv.innerHTML = "";
    for (let index = 0; index < works.length; index++) {
        let art = document.createElement("article");
        let jobtitle = document.createElement("h3");
        jobtitle.innerHTML = works[index].jobtitle;
        let company = document.createElement("p");
        company.innerHTML = "Företag: "+works[index].companyname;
        let loc = document.createElement("p");
        loc.innerHTML = "Plats: "+works[index].location;
        let desc = document.createElement("p");
        desc.innerHTML = works[index].description;
        desc.classList.add("artDesc");
        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Ta bort jobbpost";
        btnDelete.id = works[index].ID;
        btnDelete.addEventListener("click",  ()=>{
            deleteWorks(btnDelete.id)
        })
        // aDelete.href = `/api/workplaces/:${works[index].ID}`;
        
        art.appendChild(jobtitle);
        art.appendChild(company);
        art.appendChild(loc);
        art.appendChild(desc);
        art.appendChild(btnDelete);
        worksDiv.appendChild(art);

    }
}

async function deleteWorks(id) {
    const response = await fetch(`http://127.0.0.1:3000/api/workplaces/${id}`, {
        method: "DELETE"
    });

    const res = await response.json();
    console.log(res);
    getWorks();
}