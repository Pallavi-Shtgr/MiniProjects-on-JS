const quoteText = document.querySelector(".quote"),
  authorName = document.querySelector(".author .name"),
  quoteBtn = document.querySelector("button"),
  soundBtn = document.querySelector(".sounds"), // Corrected selector
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter");

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading quote...";
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.innerText = "New Quote";
      quoteBtn.classList.remove("loading");
    });
}

soundBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
  speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quoteText.innerText} - ${authorName.innerText}`);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quoteText.innerText} - ${authorName.innerText}`)}`;
  window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);
