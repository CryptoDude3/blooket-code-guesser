var guess = 0;
var sleep = 0;
var display = document.querySelector("div[class*='titleText']");
function reactHandler(){return Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner.stateNode;};
function generateRandomId() {
  // Generate a random 7-digit code with leading zeros
  const randomId = Math.floor(Math.random() * 9000000) + 1000000;
  return randomId;
}
function checkGameExists() {
  const randomId = generateRandomId();
  const url = `https://fb.blooket.com/c/firebase/id?id=${randomId}`;

  fetch(url, {
    method: 'GET',
    credentials: 'include', // Include cookies
  })
    .then(response => response.json())
    .then(data => {
      if (data.success === true) {
        console.log("Game found:", randomId);
        display.innerHTML = "Game Found!"
        reactHandler().setState({client:{hostId:randomId.toString()}});
        reactHandler().onJoin();
      } else {
        console.log("No game found for:", randomId);
        reactHandler().setState({client:{hostId:randomId.toString()}});
        guess++;
        display.innerHTML = "Guesses: " + guess;
        sleep++;
        if (sleep > 15) {
          setTimeout(checkGameExists, 1000); // Retry after a delay of 1 seconds
          sleep = 0;
        } else {
          checkGameExists(); // Retry immediately
        }
      }
    })
    .catch(error => {
      alert("Error:"+error);
    });
}

// Call checkGameExists to start the process
checkGameExists();
