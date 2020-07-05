let content = document.querySelector(".content");
let spkBtn = document.querySelector(".speak-btn");
const greetings = ["well, hello there!", "Hi", "aha", "Hey boy", "Hello"];
const weather = [
  "OK",
  "you can actually get up and see for yourself",
  "haven't you actually built a weather app before? you can use it then",
  "do you really care?",
  "please, you don't go out!"
];
try {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = () => {
    console.log("voice activated");
  };

  recognition.onresult = function(e) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
  };

  spkBtn.addEventListener("click", () => {
    recognition.start();
  });

  function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();

    if (message.includes("hello")) {
      let answer = greetings[Math.floor(Math.random() * greetings.length)];
      speech.text = answer;
    } else if (message.includes("weather")) {
      let answer = weather[Math.floor(Math.random() * weather.length)];
      speech.text = answer;
    } else {
      speech.text = "I didn't catch that dude";
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }
} catch (e) {
  console.log(e);
}
