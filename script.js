
const roles = ["Webs", " Escritorios", "APIs"];
const roleElement = document.getElementById("role");

let roleIndex = 0;
let charIndex = 0;
let borrando = false;

function typeRole() {
  const roleActual = roles[roleIndex];

  if (!borrando) {
    // Escribiendo
    roleElement.textContent = roleActual.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === roleActual.length) {
      // Pausa antes de borrar
      borrando = true;
      setTimeout(typeRole, 1500);
      return;
    }
  } else {
    // Borrando
    roleElement.textContent = roleActual.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      borrando = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = borrando ? 100 : 150; // velocidad de borrado/escritura
  setTimeout(typeRole, speed);
}

// Inicia el efecto
typeRole();






window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


window.addEventListener("scroll", () => {
  const about = document.querySelector(".about");
  const trigger = window.innerHeight * 0.7;
  const top = about.getBoundingClientRect().top;

  if (top < trigger) {
    about.classList.add("visible");
  }
});

// ==== Animación Fade-In con Scroll ====
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
sections.forEach(section => observer.observe(section));

// ==== Efecto 3D en las tarjetas ====
const cards = document.querySelectorAll('.card-3d');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 25) * -1;
    const rotateY = (x - centerX) / 25;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
});


const projectCards = document.querySelectorAll('.project');
projectCards.forEach((card, i) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(40px)";
  setTimeout(() => {
    card.style.transition = "all 0.8s ease";
    card.style.opacity = 1;
    card.style.transform = "translateY(0)";
  }, i * 200);
});


const hamburger = document.getElementById("hamburgerBtn");
const menu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active"); // anima hamburguesa a ✖
});
