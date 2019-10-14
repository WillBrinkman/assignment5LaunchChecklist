// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

//empty, invalid, valid

function init() {
    form = document.querySelector("form");
    pilotName = document.getElementById("pilotName");
    copilotName = document.getElementById("copilotName");
    fuelLevel = document.getElementById("fuelLevel");
    cargoMass = document.getElementById("cargoMass");
    pilotStatus = document.getElementById("pilotStatus");
    copilotStatus = document.getElementById("copilotStatus");
    faultyItems = document.getElementById("faultyItems");
    launchStatus = document.getElementById("launchStatus");
    fuelStatus = document.getElementById("fuelStatus");
    cargoStatus = document.getElementById("cargoStatus");

    const planets = fetch(
        "https://handlers.education.launchcode.org/static/planets.json"
    );

    planets.then(function(response) {
        response.json().then(function(json) {
            // document.addEventListener("click", function(json) {
            //     for (let i=0; i < json.length; i++) {
            //         i += 1;
            //     }
            // })

            n = Math.floor(Math.random() * json.length);
            let div = document.getElementById("missionTarget");

            div.innerHTML += `
                    <h2>Mission Destination</h2>
            <ol>
            <li>Name: ${json[n].name}</li>
            <li>Diameter: ${json[n].diameter}</li>
            <li>Star: ${json[n].star}</li>
            <li>Distance from Earth: ${json[n].distance}</li>
            <li>Number of Moons: ${json[n].moons}</li>
            </ol>
            <img src="${json[n].image}">
        
        
        `;
        });
    });

    form.addEventListener("submit", function(event) {
        //console.log(pilotName.value);
        console.log(copilotName.value);
        if (
            pilotName.value == "" ||
            copilotName.value == "" ||
            fuelLevel.value == "" ||
            cargoMass.value == ""
        ) {
            alert("All fields are required!");
        } else if (
            !/^[a-zA-Z]*$/g.test(pilotName.value) ||
            !/^[a-zA-Z]*$/g.test(copilotName.value) ||
            isNaN(fuelLevel.value) ||
            isNaN(cargoMass.value)
        ) {
            alert("Make sure to enter valid information for each field");
        } else {
            pilotStatus.innerHTML = `Pilot Name: ${pilotName.value} is ready!`; // need to use template literals!!!
            copilotStatus.innerHTML = `Pilot Name: ${copilotName.value} is ready!`;

            if (fuelLevel.value < 10000) {
                faultyItems.style.visibility = "visible";
                launchStatus.innerHTML = `Shuttle not ready for launch`;
                fuelStatus.innerHTML = `Not enough fuel for the journey`;
                launchStatus.style.color = "red";
            }

            if (cargoMass.value > 10000) {
                faultyItems.style.visibility = "visible";
                cargoStatus.innerHTML = `Too much mass for the shuttle to take off`;
                launchStatus.innerHTML = `Shuttle not ready for launch`;
                launchStatus.style.color = "red";
            }
            if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
                launchStatus.style.color = "green";
                launchStatus.innerHTML = `Shuttle is ready for launch`;
                faultyItems.style.visibility = "hidden";
            }
        }
        event.preventDefault();
        //index 2, planet 3, moon titan
    });
}

window.onload = init;
