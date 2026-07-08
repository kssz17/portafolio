const roles = ["Webs", " Apps Escritorios", "APIs"];
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
  if (!about) return;
  const trigger = window.innerHeight * 0.7;
  const top = about.getBoundingClientRect().top;

  if (top < trigger) {
    about.classList.add("visible");
  }
});

// ==== Filtro de proyectos ====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCardsAll = document.querySelectorAll('.proj-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCardsAll.forEach(card => {
      const categories = (card.getAttribute('data-category') || '').split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// ==== Contador animado de stats ====
const statNums = document.querySelectorAll('.stat-num');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const aboutSection = document.querySelector('.about');
  if (!aboutSection) return;
  const rect = aboutSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    statsAnimated = true;
    statNums.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

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

// ==== Reveal progresivo con data-delay ====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.getAttribute('data-delay'), 10) || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

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

function toggleFolder(header) {
  // Cerrar otras carpetas (opcional - si quieres que solo una esté abierta)
  const allFolders = document.querySelectorAll('.folder-card');
  allFolders.forEach(folder => {
    const wrapper = folder.querySelector('.projects-wrapper');
    const headerEl = folder.querySelector('.folder-header');
    if (folder !== header.closest('.folder-card')) {
      wrapper.style.maxHeight = null;
      headerEl.classList.remove('active');
      // También rotar la flecha de vuelta
      const arrow = headerEl.querySelector('.arrow');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  });

  // Toggle la carpeta actual
  const folder = header.closest('.folder-card');
  const wrapper = folder.querySelector('.projects-wrapper');
  const arrow = header.querySelector('.arrow');
  
  // Verificar si está abierto
  const isOpen = wrapper.style.maxHeight && wrapper.style.maxHeight !== '0px' && wrapper.style.maxHeight !== '';
  
  if (isOpen) {
    // Cerrar
    wrapper.style.maxHeight = null;
    header.classList.remove('active');
    if (arrow) arrow.style.transform = 'rotate(0deg)';
  } else {
    // Abrir
    wrapper.style.maxHeight = wrapper.scrollHeight + "px";
    header.classList.add('active');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
}

// Inicializar todas las carpetas cerradas (opcional)
document.addEventListener('DOMContentLoaded', function() {
  const folders = document.querySelectorAll('.folder-card');
  folders.forEach(folder => {
    const wrapper = folder.querySelector('.projects-wrapper');
    const header = folder.querySelector('.folder-header');
    wrapper.style.maxHeight = null;
    header.classList.remove('active');
    
    // Asegurar que las flechas apunten hacia abajo inicialmente
    const arrow = header.querySelector('.arrow');
    if (arrow) arrow.style.transform = 'rotate(0deg)';
  });
});