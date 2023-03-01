const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
	button.disabled = !button.disabled;
}

// Get Jokes from Joke API
async function getJokes() {
	let joke = "";
	const apiUrl =
		"https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		msg = new SpeechSynthesisUtterance(joke);
		msg.addEventListener("end", toggleButton);
		window.speechSynthesis.speak(msg);

		// Disalbe Button
		toggleButton();
	} catch (error) {
		// Catch Errors here
		console.log("Whoops", error);
	}
}

// Event Listeners
button.addEventListener("click", getJokes);
