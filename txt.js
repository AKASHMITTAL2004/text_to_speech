const textarea = document.querySelector("textarea"),
      speechBtn = document.querySelector("button");

let synth = speechSynthesis,
    isSpeaking = true;

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    // Automatically select the first U.S. English voice
    let voices = synth.getVoices();
    let usEnglishVoice = voices.find(voice => voice.lang === "en-US");
    if (usEnglishVoice) {
        utterance.voice = usEnglishVoice;
        utterance.lang = "en-US"; 
        synth.speak(utterance);
    } else {
        console.error("No U.S. English voices available.");
    }
}

speechBtn.addEventListener("click", e => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            }, 500);

            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        } else {
            speechBtn.innerText = "Convert To Speech";
        }
    }
});
