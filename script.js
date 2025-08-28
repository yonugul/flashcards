let flashcards = [];
let originalCards = [];
let currentIndex = 0;
let isFlipped = false;
let totalCards = 100;
// Sayfa yüklendiğinde otomatik olarak kartları yüklemeyi dene
window.addEventListener("load", function () {
  initCards(totalCards);
  loadCards();
});

function initCards(totalCount) {
  flashcards = [];
  for (let i = 1; i <= totalCount; i++) {
    flashcards.push({
      id: i,
      front: `images/front/${i}.png`,
      back: `images/back/${i}.png`,
    });
  }
  originalCards = [...flashcards];
}

function loadCards() {
  if (flashcards.length > 0) {
    document.getElementById("cardSection").style.display = "block";
    document.getElementById("shuffleBtn").disabled = false;
    document.getElementById("shuffleBtn").style.display = "inline-block";
    document.getElementById("resetBtn").disabled = false;
    document.getElementById("resetBtn").style.display = "inline-block";
    document.getElementById("totalCards").textContent = flashcards.length;
    currentIndex = 0;
    loadCard(currentIndex);
    updateNavigation();
    updateProgress();
  } else {
    document.getElementById("cardSection").style.display = "none";
    document.getElementById("shuffleBtn").disabled = true;
    document.getElementById("shuffleBtn").style.display = "none";
    document.getElementById("resetBtn").disabled = true;
    document.getElementById("resetBtn").style.display = "none";
  }
}

function loadCard(index) {
  const card = flashcards[index];
  if (!card) return;

  const flashcardEl = document.getElementById("flashcard");
  const frontElement = document.getElementById("cardFront");
  const backElement = document.getElementById("cardBack");

  isFlipped = false;

  flashcardEl.style.transition = "none";
  flashcardEl.classList.remove("flipped");
  flashcardEl.offsetHeight;
  flashcardEl.style.transition = "";

  loadImage(card.front, frontElement);
  loadImage(card.back, backElement);

  document.getElementById("currentCard").textContent = index + 1;
}

function loadImage(imagePath, element) {
  element.innerHTML = '<div class="loading">Yükleniyor...</div>';

  const img = new Image();
  img.onload = function () {
    element.innerHTML = `<img src="${imagePath}" alt="Flash Card">`;
  };
  img.onerror = function () {
    element.innerHTML = `<div class="error">❌<br>Resim yüklenemedi<br><small>${imagePath}</small></div>`;
  };
  img.src = imagePath;
}

function flipCard() {
  const flashcard = document.getElementById("flashcard");
  isFlipped = !isFlipped;

  if (isFlipped) {
    flashcard.classList.add("flipped");
  } else {
    flashcard.classList.remove("flipped");
  }
}

function nextCard() {
  if (currentIndex < flashcards.length - 1) {
    currentIndex++;
    loadCard(currentIndex);
    updateNavigation();
    updateProgress();
  }
}

function previousCard() {
  if (currentIndex > 0) {
    currentIndex--;
    loadCard(currentIndex);
    updateNavigation();
    updateProgress();
  }
}

function updateNavigation() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === flashcards.length - 1;
}

function updateProgress() {
  const progress = document.getElementById("progress");
  const percentage =
    flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;
  progress.style.width = percentage + "%";
}

function shuffleCards() {
  for (let i = flashcards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
  }
  currentIndex = 0;
  loadCard(currentIndex);
  updateNavigation();
  updateProgress();
}

function resetCards() {
  flashcards = [...originalCards]; // Orijinal listeyi geri yükle
  currentIndex = 0;
  loadCard(currentIndex);
  updateNavigation();
  updateProgress();
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (flashcards.length === 0) return;

  switch (e.key) {
    case "ArrowLeft":
      previousCard();
      break;
    case "ArrowRight":
      nextCard();
      break;
    case " ":
    case "Enter":
      e.preventDefault();
      flipCard();
      break;
  }
});
