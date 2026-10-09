// Animation des textes du Hero, lettre par lettre
const heroSection = document.querySelector(".hero");
const heroText = document.querySelector(".hero-text");

if (heroSection && heroText) {
const textElements = heroText.querySelectorAll("h1, .subtitle, p");
const originalContent = [];

textElements.forEach((element) => {
originalContent.push({
element,
html: element.innerHTML
});


const walker = document.createTreeWalker(
  element,
  NodeFilter.SHOW_TEXT
);

const textNodes = [];
while (walker.nextNode()) {
  textNodes.push(walker.currentNode);
}

textNodes.forEach((node) => {
  const fragment = document.createDocumentFragment();

  [...node.textContent].forEach((character) => {
    if (character === " ") {
      fragment.appendChild(document.createTextNode(" "));
    } else {
      const span = document.createElement("span");
      span.className = "letter";
      span.textContent = character;
      fragment.appendChild(span);
    }
  });

  node.replaceWith(fragment);
});


});

let animationTimer;

function animateLetters() {
clearTimeout(animationTimer);


const letters = heroText.querySelectorAll(".letter");
letters.forEach((letter) => letter.classList.remove("active"));

letters.forEach((letter, index) => {
  animationTimer = setTimeout(() => {
    letter.classList.add("active");
  }, index * 25);
});
 
const heroButton = heroSection.querySelector(".hero-btn");

if (heroButton) {
heroButton.classList.remove("button-scroll-animation");
void heroButton.offsetWidth;
heroButton.classList.add("button-scroll-animation");
}





}

const heroObserver = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
animateLetters();
} else {
clearTimeout(animationTimer);
heroText.querySelectorAll(".letter").forEach((letter) => {
letter.classList.remove("active");
});
}
});
}, { threshold: 0.25 });

heroObserver.observe(heroSection);


}


/* ===== ANIMATION ABOUT AU SCROLL ===== */

const aboutSection = document.querySelector(".about");
const aboutText = document.querySelector(".about .about-text");
const aboutImage = document.querySelector(".about .about-image");

if (aboutSection && aboutText) {
  const elements = aboutText.querySelectorAll("h2, .about-link");

  elements.forEach((element) => {
    if (element.querySelector(".letter")) return;

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];

    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();

      [...node.textContent].forEach((char) => {
        if (/\s/.test(char)) {
          fragment.appendChild(document.createTextNode(char));
        } else {
          const span = document.createElement("span");
          span.className = "letter";
          span.textContent = char;
          fragment.appendChild(span);
        }
      });

      node.replaceWith(fragment);
    });
  });

  let timers = [];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      timers.forEach(clearTimeout);
      timers = [];

      const letters = aboutText.querySelectorAll(".letter");

      if (entry.isIntersecting) {
        letters.forEach((letter, index) => {
          timers.push(setTimeout(() => {
            letter.classList.add("active");
          }, index * 25));
        });

        if (aboutImage) aboutImage.classList.add("visible");
      } else {
        letters.forEach((letter) => letter.classList.remove("active"));
        if (aboutImage) aboutImage.classList.remove("visible");
      }
    });
  }, { threshold: 0.25 });

  observer.observe(aboutSection);
}

/* ===== ANIMATION PROCESS AU SCROLL ===== */

const processSection = document.querySelector(".process");

if (processSection) {
const processElements = processSection.querySelectorAll(
  ".process-heading h2, .process-heading > p"
);
  processElements.forEach((element) => {
    if (element.querySelector(".letter")) return;

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT
    );

    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      const fragment = document.createDocumentFragment();

      [...node.textContent].forEach((character) => {
        if (/\s/.test(character)) {
          fragment.appendChild(document.createTextNode(character));
        } else {
          const span = document.createElement("span");
          span.className = "letter";
          span.textContent = character;
          fragment.appendChild(span);
        }
      });

      node.replaceWith(fragment);
    });
  });

  let processTimers = [];

  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      processTimers.forEach(clearTimeout);
      processTimers = [];

      const letters = processSection.querySelectorAll(".letter");

      if (entry.isIntersecting) {
        letters.forEach((letter, index) => {
          processTimers.push(
            setTimeout(() => {
              letter.classList.add("active");
            }, index * 15)
          );
        });
      } else {
        letters.forEach((letter) => {
          letter.classList.remove("active");
        });
      }
    });
  }, {
    threshold: 0.15
  });

  processObserver.observe(processSection);
}


/* ===== ANIMATION OWN A PIECE AU SCROLL ===== */

const ownSection = document.querySelector(".own-piece");

if (ownSection) {
  const ownElements = ownSection.querySelectorAll(
    ".section-label span,.own-content h2, .own-text p"
  );

  ownElements.forEach((element) => {
    if (element.querySelector(".letter")) return;

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT
    );

    const nodes = [];

    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();

      [...node.textContent].forEach((character) => {
        if (/\s/.test(character)) {
          fragment.appendChild(document.createTextNode(character));
        } else {
          const letter = document.createElement("span");
          letter.className = "letter";
          letter.textContent = character;
          fragment.appendChild(letter);
        }
      });

      node.replaceWith(fragment);
    });
  });

  const ownButton = ownSection.querySelector(".shop-btn");
  let ownTimers = [];

  const ownObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      ownTimers.forEach(clearTimeout);
      ownTimers = [];

      const letters = ownSection.querySelectorAll(".letter");

      if (entry.isIntersecting) {
        letters.forEach((letter, index) => {
          ownTimers.push(setTimeout(() => {
            letter.classList.add("active");
          }, index * 8));
        });

        if (ownButton) {
          ownTimers.push(setTimeout(() => {
            ownButton.classList.add("visible");
          }, Math.min(letters.length * 8, 350)));
        }
      } else {
        letters.forEach((letter) => {
          letter.classList.remove("active");
        });

        if (ownButton) {
          ownButton.classList.remove("visible");
        }
      }
    });
  }, {
    threshold: 0.15
  });

  ownObserver.observe(ownSection);
}