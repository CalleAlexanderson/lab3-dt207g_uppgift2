// Globala konstanter och variabler

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    const form = document.getElementById('add_form');
    form.onsubmit = (event) => {
        event.preventDefault();
        console.log("formulär skickat");
        let cNameInp = document.getElementById('comp').value;
        let jobTInp = document.getElementById('title').value;
        let locInp = document.getElementById('place').value;
        let descInp = document.getElementById('descript').value;

        if (cNameInp != "" && jobTInp != "" && locInp != "" && descInp != "") {
            console.log("funkar");
            addWork(cNameInp, jobTInp, locInp, descInp)
            document.getElementById('comp').value = "";
            document.getElementById('title').value = "";
            document.getElementById('place').value = "";
            document.getElementById('descript').value = "";
            alert("Ny jobbpost tillagd")
        } else {
            alert("Var snäll och fyll i alla fält för att lägga till en ny jobbpost")
        }
    };
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

async function addWork(c, j, l, d) {
    let cname = c;
    let jt = j;
    let loc = l;
    let desc = d;
    let newWorkplace;

    if (cname != "" && jt != "" && loc != "" && desc != "") {
        newWorkplace = {
            companyname: cname,
            jobtitle: jt,
            location: loc,
            description: desc
        }
    }
    const response = await fetch(`http://127.0.0.1:3000/api/workplaces`, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(newWorkplace)
    });

    const res = await response.json();
    console.log(res);
}
