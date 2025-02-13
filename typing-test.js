document.addEventListener("DOMContentLoaded", () => {
    console.log("Typing Test Page Loaded!");

    const sentenceDisplay = document.getElementById("sentence");
    const typingArea = document.getElementById("typing-area");
    const timerDisplay = document.getElementById("timer");
    const wpmDisplay = document.getElementById("wpm");
    const accuracyDisplay = document.getElementById("accuracy");
    const restartBtn = document.getElementById("restart-btn");

    let sentences = [
        "The quick brown fox jumps over the lazy dog.",
        "Typing speed is a useful skill in today's digital world.",
        "Coding is both an art and a science.",
        "Consistency is the key to improvement.",
        "Fast fingers make a fast typist."
    ];

    let startTime, interval;
    let currentSentence = "";
    let timerRunning = false;

    function startTimer() {
        startTime = new Date();
        interval = setInterval(() => {
            let elapsedTime = (new Date() - startTime) / 1000;
            timerDisplay.textContent = elapsedTime.toFixed(1);
        }, 100);
    }

    function calculateResults() {
        clearInterval(interval);
        let elapsedTime = (new Date() - startTime) / 1000 / 60; // Time in minutes
        let wordsTyped = typingArea.value.trim().split(/\s+/).length;
        let wpm = Math.round(wordsTyped / elapsedTime);

        let correctChars = 0;
        let typedText = typingArea.value.trim();
        let minLen = Math.min(typedText.length, currentSentence.length);

        for (let i = 0; i < minLen; i++) {
            if (typedText[i] === currentSentence[i]) {
                correctChars++;
            }
        }

        let accuracy = Math.round((correctChars / currentSentence.length) * 100);

        wpmDisplay.textContent = isNaN(wpm) || wpm < 0 ? "0" : wpm;
        accuracyDisplay.textContent = isNaN(accuracy) ? "0%" : accuracy + "%";
    }

    function loadNewSentence() {
        currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
        sentenceDisplay.textContent = currentSentence;
        typingArea.value = "";
        timerDisplay.textContent = "0";
        wpmDisplay.textContent = "0";
        accuracyDisplay.textContent = "100%";
        timerRunning = false;
        console.log("New sentence loaded:", currentSentence);
    }

    typingArea.addEventListener("input", () => {
        if (!timerRunning) {
            timerRunning = true;
            startTimer();
        }
        if (typingArea.value.trim() === currentSentence) {
            calculateResults();
        }
    });

    typingArea.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            calculateResults();
        }
    });

    restartBtn.addEventListener("click", () => {
        clearInterval(interval);
        loadNewSentence();
    });

    loadNewSentence();

    const Keyboard = window.SimpleKeyboard.default;

    const keyboard = new Keyboard({
        onChange: input => {
            document.getElementById("typing-area").value = input;
        },
        onKeyPress: button => {
            console.log("Button pressed", button);
        }
    });

    document.getElementById("typing-area").addEventListener("input", (event) => {
        keyboard.setInput(event.target.value);
    });
});

// Key Highlighting Feature

document.addEventListener("keydown", function(event) {
    let keyPressed = event.key.toUpperCase();
    let keyElement = document.querySelector(`.key[data-key="${keyPressed}"]`);
    
    if (keyElement) {
        keyElement.classList.add("active");
    }
});

document.addEventListener("keyup", function(event) {
    let keyPressed = event.key.toUpperCase();
    let keyElement = document.querySelector(`.key[data-key="${keyPressed}"]`);
    
    if (keyElement) {
        keyElement.classList.remove("active");
    }
});
