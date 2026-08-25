// DOM Element References
const menuButtons = document.querySelectorAll('.menu-button');
const pageSections = document.querySelectorAll('.page-section');
const themeButton = document.querySelector('#theme-button');
const heroBg = document.querySelector('.hero-bg');
const heroContent = document.querySelector('.hero-content');
const heroHeader = document.querySelector('.hero-header');
const menu = document.querySelector('.menu');

// ==========================================================================
// SCROLL-DRIVEN ZOOM, BLUR & PARALLAX EFFECT FOR HERO HEADER
// ==========================================================================
let ticking = false;

function updateHeaderParallax() {
  if (!heroHeader || !heroBg) return;

  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const headerHeight = heroHeader.offsetHeight;

  // Calculate effect only when hero header is within viewing bounds
  if (scrollY <= headerHeight + 60) {
    const progress = Math.min(Math.max(scrollY / headerHeight, 0), 1);

    // Zoom from 1.0 up to 1.35 smoothly
    const scale = 1 + (progress * 0.35);
    // Blur from 0px up to 14px progressively
    const blur = progress * 14;

    // Apply hardware-accelerated transform & filter to background
    heroBg.style.transform = `scale(${scale.toFixed(3)}) translateY(${(scrollY * 0.12).toFixed(1)}px)`;
    heroBg.style.filter = `blur(${blur.toFixed(1)}px)`;

    // Parallax fade and subtle vertical shift for text content
    if (heroContent) {
      const opacity = Math.max(1 - (progress * 1.4), 0);
      const translateY = scrollY * 0.32;
      heroContent.style.opacity = opacity.toFixed(3);
      heroContent.style.transform = `translateY(${translateY.toFixed(1)}px)`;
    }
  }

  // Add subtle shadow and backdrop highlight to navbar when scrolled
  if (menu) {
    if (scrollY > 50) {
      menu.classList.add('is-scrolled');
    } else {
      menu.classList.remove('is-scrolled');
    }
  }

  ticking = false;
}

// Optimized scroll listener using requestAnimationFrame
window.addEventListener('scroll', function () {
  if (!ticking) {
    window.requestAnimationFrame(updateHeaderParallax);
    ticking = true;
  }
}, { passive: true });

// Initialize parallax on load
window.addEventListener('DOMContentLoaded', updateHeaderParallax);
updateHeaderParallax();

// ==========================================================================
// NAVIGATION TAB SWITCHING
// ==========================================================================
function showSection(sectionId) {
  pageSections.forEach(function (section) {
    section.classList.toggle('hidden', section.id !== sectionId);
  });

  menuButtons.forEach(function (button) {
    button.classList.toggle('active', button.dataset.section === sectionId);
  });

  // Smooth scroll to content top if user clicks nav while further down
  const container = document.querySelector('.container');
  if (container && window.pageYOffset > (heroHeader ? heroHeader.offsetHeight : 300)) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

menuButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    showSection(button.dataset.section);
  });
});

// ==========================================================================
// DARK / LIGHT THEME TOGGLE & PERSISTENCE
// ==========================================================================
if (themeButton) {
  themeButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    const darkModeIsOn = document.body.classList.contains('dark-mode');
    themeButton.innerHTML = darkModeIsOn ? '☀️ Light mode' : '🌙 Dark mode';
    localStorage.setItem('darkMode', darkModeIsOn);
  });

  // Restore saved preference
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
    themeButton.innerHTML = '☀️ Light mode';
  } else {
    themeButton.innerHTML = '🌙 Dark mode';
  }
}
