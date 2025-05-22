const coin = document.getElementById("coin");
const flipBtn = document.getElementById("flip-btn");
const resultText = document.getElementById("result-text");
const headsCount = document.getElementById("heads-count");
const tailsCount = document.getElementById("tails-count");
const totalCount = document.getElementById("total-count");
const flipSound = document.getElementById("flip-sound");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const iconSun = document.getElementById("icon-sun");
const iconMoon = document.getElementById("icon-moon");
const shareBtn = document.getElementById('share-btn');
const resultText = document.getElementById('result-text');

let isFlipping = false;
let heads = 0;
let tails = 0;

// Flip coin functionality
flipBtn.addEventListener("click", () => {
  if (isFlipping) return;
  isFlipping = true;

  resultText.textContent = "";
  flipBtn.disabled = true;
  flipBtn.classList.add("opacity-50", "cursor-not-allowed");

  flipSound.currentTime = 0;
  flipSound.play();

  coin.classList.remove("animate-spin");
  void coin.offsetWidth; // force reflow
  coin.classList.add("animate-spin");

  setTimeout(() => {
    const isHeads = Math.random() < 0.5;
    coin.src = isHeads ? "/static/img/heads.png" : "/static/img/tails.png";

    if (isHeads) {
      heads++;
      resultText.textContent = "It's HEADS! Fortune smiles at you.";
    } else {
      tails++;
      resultText.textContent = "It's TAILS! Maybe next time.";
    }

    headsCount.textContent = heads;
    tailsCount.textContent = tails;
    totalCount.textContent = heads + tails;

    isFlipping = false;
    flipBtn.disabled = false;
    flipBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }, 1500);
});


// Dark mode toggle with icon switch
darkModeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");

  // Toggle background and text colors on body
  document.body.classList.toggle("bg-slate-900");
  document.body.classList.toggle("bg-slate-200");
  document.body.classList.toggle("text-slate-50");
  document.body.classList.toggle("text-slate-900");

  // Toggle sun and moon icons visibility
  if (isDark) {
    iconSun.classList.remove("hidden");
    iconMoon.classList.add("hidden");
  } else {
    iconSun.classList.add("hidden");
    iconMoon.classList.remove("hidden");
  }
});

// Initialize icons on page load based on current mode
(() => {
  const isDark = document.documentElement.classList.contains("dark");
  if (isDark) {
    iconSun.classList.remove("hidden");
    iconMoon.classList.add("hidden");
  } else {
    iconSun.classList.add("hidden");
    iconMoon.classList.remove("hidden");
  }
})();

// WhatsApp share button functionality
shareBtn.addEventListener('click', () => {
  const textToShare = resultText.textContent.trim();

  if (!textToShare) {
    alert("No toss result yet! Please toss the coin first.");
    return;
  }

  const message = encodeURIComponent(`Hey! I just tossed a coin. Result: ${textToShare}`);
  const whatsappUrl = `https://wa.me/?text=${message}`;

  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});