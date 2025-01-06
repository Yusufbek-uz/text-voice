document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('bt');
    const textInput = document.getElementById('text');
    const voiceSelect = document.getElementById('sel');
    let voices = [];

    btn.addEventListener("click", () => {
        gapir();
    });

    function loadVoices() {
        voices = window.speechSynthesis.getVoices();

        if (voices.length === 0) {
            voiceSelect.innerHTML = '<option disabled>No voices available</option>';
            return;
        }

        voiceSelect.innerHTML = "";
        voices.forEach((voice, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    }

    function ensureVoicesLoaded() {
        if (voices.length === 0) {
            loadVoices();
        }
        if (voices.length === 0) {
            setTimeout(ensureVoicesLoaded, 500);
        }
    }

    window.speechSynthesis.onvoiceschanged = loadVoices;
    ensureVoicesLoaded();

    function gapir() {
        if (!textInput.value.trim()) {
            alert("Iltimos, matn kiriting!");
            return;
        }

        const msg = new SpeechSynthesisUtterance();
        msg.text = textInput.value;

        const selectedVoiceIndex = parseInt(voiceSelect.value, 10);

        if (!isNaN(selectedVoiceIndex)) {
            msg.voice = voices[selectedVoiceIndex];
        } else {
            alert("Iltimos, ovoz tanlang!");
            return;
        }

        speechSynthesis.speak(msg);
    }
});