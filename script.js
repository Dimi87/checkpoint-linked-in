let userData = [];
let pendingCounter = 0;

// Was soll mit "data" passieren, solange das userData-Array kleiner als 8 ist? "data" zum Array hinzufügen//

function ReceiveUserData() {
    fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
        .then((res) => res.json())
        .then((data) => {
            if (userData.length < 8) {
                userData.push(data);
                //console.log(userData);
                ReceiveUserData();
            } else {
                renderUserData();
            }
        });
}
ReceiveUserData();   

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

        //container.style.border = "solid 1px black"
        //container.style.border-radius = "5px"
        container.classList.add("div-css")

        const profileImg = document.createElement("img");
        profileImg.src = user.picture;
        //console.log(user.picture)

        const name = document.createElement("p")
        name.innerText = `${user.name.first} ${user.name.last}`;

        const btnConnect = document.createElement("button");
        btnConnect.classList.add("btn-connect")
        btnConnect.innerText = "Connect"
        btnConnect.addEventListener("click", function(e) {
            //pendingCounter = pendingCounter + 1;
            //console.log(pendingCounter)
            const pending = document.querySelector("#pending-text");
            let stringPendingInvitations = pendingCounter + " pending invintations";
            pending.innerText = stringPendingInvitations;
            
        }
        
        );
        btnConnect.addEventListener("click", pending);

        container.append(profileImg, name, btnConnect);
        cards.append(container);
    });
}

function pending(e) {
    const button = e.target;
    const pendingText = document.querySelector("#pending-text");
    // Was soll passieren, wenn auf den "Connect"-Button geklickt wird?
     console.log(button.innerText)
    if (button.innerText === "Connect") {
        pendingCounter = pendingCounter + 1;
        button.innerText = "Pending";
        console.log(pendingCounter)
        pendingText.innerText = `${pendingCounter} pending invitations`;
    } else if (button.innerText === "Pending") {
        // Was soll passieren, wenn auf den "Pending"-Button geklickt wird?
        pendingCounter = pendingCounter - 1;
        button.innerText = "Connect";
        pendingText.innerText = `${pendingCounter} pending invitations`;
    }
}

