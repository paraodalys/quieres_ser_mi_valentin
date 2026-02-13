document.addEventListener("DOMContentLoaded", () => {

  const frames = document.querySelectorAll(".frame");
  const envelope = document.getElementById("openEnvelope");
  const nextButtons = document.querySelectorAll(".next");
  const yesBtn = document.querySelector(".yes");
  const noBtn = document.querySelector(".no");
  const bg = document.querySelector(".hearts-bg");
  const downloadBtn = document.getElementById("downloadLetter");

  let current = 0;
  let yesScale = 1;

  /* ---------- CONTROL DE FRAMES ---------- */

  function showFrame(index) {
    frames.forEach(frame => frame.classList.remove("active"));
    if (frames[index]) {
      frames[index].classList.add("active");
      current = index;
    }
  }

  /* ---------- SOBRE ---------- */

  if (envelope) {
    envelope.addEventListener("click", () => {
      envelope.classList.add("open");
      setTimeout(() => showFrame(1), 700);
    });
  }

  /* ---------- BOTONES NEXT ---------- */

  nextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showFrame(current + 1);
    });
  });

  /* ---------- BOTÓN SÍ ---------- */

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      showFrame(5);
    });
  }

  /* ---------- CORAZONES ---------- */

  if (bg) {
    for (let i = 0; i < 18; i++) {
      const heart = document.createElement("span");
      heart.innerText = "💗";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 12 + Math.random() * 16 + "px";
      heart.style.animationDuration = 5 + Math.random() * 6 + "s";
      bg.appendChild(heart);
    }
  }

  /* ---------- PDF ---------- */

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {

      const textArea = document.getElementById("responseText");
      const finalLetter = document.getElementById("finalLetter");
      const element = document.getElementById("letterContent");

      const text = textArea.value.trim();

      if (!text) {
        alert("Escribe algo antes 💗");
        return;
      }

      finalLetter.textContent = text;

      const options = {
        margin: 0.8,
        filename: "mi_carta.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          ignoreElements: el => el.classList.contains("no-pdf")
        },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait"
        }
      };

      html2pdf().set(options).from(element).save();
    });
  }

/* ---------- BOTÓN NO QUE SE MUEVE POR TODA LA PANTALLA ---------- */

if (noBtn) {

  const frases = [
    "¿Segura? 😳",
    "Piénsalo mejor 👀",
    "Ándale di que sí 🥺",
    "No me rompas el corazón 💔",
    "Te prometo que será bonito 🥹",
    "Por faaa 🥺",
    "No seas cruel 😭",
    "Te voy a tratar bonito 🫶",
    "Una oportunidad más 🙈",
    "Di que síii 😭💗"
  ];

  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "999";
  noBtn.style.transition = "left 0.3s ease, top 0.3s ease, transform 0.2s ease";

  function moveButton() {

    const padding = 20;

    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    const randomPhrase = frases[Math.floor(Math.random() * frases.length)];
    noBtn.innerText = randomPhrase;

    if (yesBtn) {
      yesScale += 0.15;
      yesBtn.style.transform = `scale(${yesScale})`;
    }
  }

  function escape(e) {
    e.preventDefault();
    e.stopPropagation();
    moveButton();
  }

  noBtn.addEventListener("click", escape);
  noBtn.addEventListener("touchstart", escape);

}

  });


