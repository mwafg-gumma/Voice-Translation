const textInput = document.querySelector('#textInput');
const playButton = document.querySelector('.btn');
const selectVoice = document.querySelector('#select');

// Load available voices
let voices = [];
function load() {
    voices = speechSynthesis.getVoices();
    selectVoice.innerHTML = voices
        .map((ele, index) => `<option value="${index}">${ele.name} (${ele.lang})</option>`)
        .join('');
}

// Trigger load function
speechSynthesis.onvoiceschanged = load;
load();

playButton.addEventListener("click", () => {
    const text = textInput.value; // Get the text from the input
    console.log("Text to speak:", text); // Debugging: Log the text to the console

    if (!text) {
        console.warn("No text provided in the input field.");
        return; // Exit if the input is empty
    }

    const language = new SpeechSynthesisUtterance(text);
    const selectedIndex = selectVoice.value; // Get the selected voice index from the dropdown
    const selected = voices[selectedIndex]; // Retrieve the selected voice from the voices array

    if (selected) {
        language.voice = selected; // Set the selected voice
    }

    speechSynthesis.speak(language);

    // Ensure the text in the input field remains unchanged
    console.log("Text input value after speaking:", textInput.value);
});

