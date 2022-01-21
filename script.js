let userData = [];
let pendingCounter = 0;

// Was soll alles mit "data" passieren, 
//solange das userData-Array kleiner als 8 ist? (z.B. "data" zum Array hinzufügen )

function getUserData() {
    fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
        .then((res) => res.json())
        .then((data) => {
            if (userData.length < 8) {
                userData.push(data);
                //console.log(userData);
                getUserData();
            } else {
                renderUserData();
            }
        });
}
    

    /* Eine Methode finden und anwenden, jedes Element aus dem userData-Array 
    im DOM anzuzeigen */
    /* Außerdem: Buttons hinzufügen für jedes Element ("Connect" und "Delete") 
    und mit entsprechenden EventListenern versehen */

function renderUserData() {
    const cards = document.querySelector("#cards");
    cards.innerTex = "";

    userData.forEach((user) => {
        user = user[0];
        const container = document.createElement("div");

        const profileImg = document.createElement("img");
        profileImg.src = user.picture;
        //console.log(user.picture)

        const name = document.createElement("p")
        name.innerText = `${user.name.first} ${user.name.last}`;

        const btnConnect = document.createElement("button");
        btnConnect.innerText = "Connect"
        btnConnect.addEventListener("click", function(e) {
            pendingCounter = pendingCounter + 1;
            //console.log(pendingCounter)
            const pending = document.querySelector("#pending-text");
            let stringPendingInvitations = pendingCounter + "pending invintations";
            pending.innerText = stringPendingInvitations;
        }
        
        );
        //btnConnect.addEventListener("click", pendingCounter);

        container.append(profileImg, name, btnConnect);
        cards.append(container);
    });
}

getUserData();