'use strict';

const isTouch = window.matchMedia('(hover: none)').matches;

// ===== Прелоадер =====
const preloader = document.getElementById('preloader');
const preloaderProgress = document.getElementById('preloaderProgress');
let loadValue = 0;

const loadTimer = setInterval(() => {
  loadValue = Math.min(100, loadValue + Math.random() * 18);
  preloaderProgress.style.width = loadValue + '%';

  if (loadValue >= 100) {
    clearInterval(loadTimer);
    setTimeout(() => {
      preloader.classList.add('preloader--hidden');
      document.body.classList.remove('page--loading');
      startTyping();
    }, 300);
  }
}, 120);

// ===== Печатающийся текст =====
const phrases = [
  'Добро пожаловать в Зону, сталкер.',
  'Здесь всё не то, чем кажется.',
  'Осторожно: впереди аномалия.',
  'Исполнитель желаний ждёт тебя в центре.'
];
const typingEl = document.getElementById('typing');

function startTyping() {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    typingEl.textContent = phrase.slice(0, charIndex);

    let delay = deleting ? 30 : 70;
    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      delay = 2000;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  }
  tick();
}

// ===== Кастомный курсор =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursor.style.left = ringX + 'px';
  cursor.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .card').forEach((el) => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
});

// ===== Частицы (радиоактивная пыль) =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const count = Math.floor(innerWidth / 15);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -Math.random() * 0.4 - 0.1,
    alpha: Math.random() * 0.5 + 0.1
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    // Частицы разлетаются от курсора
    const dx = p.x - mouseX;
    const dy = p.y - mouseY;
    const dist = Math.hypot(dx, dy);
    if (dist < 120) {
      p.x += (dx / dist) * 1.5;
      p.y += (dy / dist) * 1.5;
    }

    p.x += p.vx;
    p.y += p.vy;
    if (p.y < 0) p.y = canvas.height;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(198, 224, 20, ${p.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

resizeCanvas();
drawParticles();
addEventListener('resize', resizeCanvas);

// ===== Шапка, параллакс, дозиметр, хроника =====
const header = document.getElementById('header');
const parallaxEls = document.querySelectorAll('[data-parallax]');
const dosimeter = document.getElementById('dosimeter');
const dosimeterFill = document.getElementById('dosimeterFill');
const dosimeterValue = document.getElementById('dosimeterValue');
const timelineList = document.querySelector('.timeline__list');
const timelineProgress = document.getElementById('timelineProgress');

function onScroll() {
  const scrollY = window.scrollY;
  header.classList.toggle('header--scrolled', scrollY > 50);

  parallaxEls.forEach((el) => {
    el.style.transform = `translateY(${scrollY * el.dataset.parallax}px)`;
  });

  // Чем глубже в Зону — тем выше радиация
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  const ratio = maxScroll > 0 ? scrollY / maxScroll : 0;
  dosimeterFill.style.width = ratio * 100 + '%';
  dosimeterValue.textContent = (ratio * 9.99).toFixed(2);
  dosimeter.classList.toggle('dosimeter--danger', ratio > 0.8);

  const rect = timelineList.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, (innerHeight * 0.6 - rect.top) / rect.height));
  timelineProgress.style.height = progress * 100 + '%';
}

addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Бургер-меню =====
const burger = document.getElementById('burger');
burger.addEventListener('click', () => header.classList.toggle('header--open'));
document.querySelectorAll('.header__link').forEach((link) => {
  link.addEventListener('click', () => header.classList.remove('header--open'));
});

// ===== Появление элементов и счётчики =====
function animateCounter(el) {
  const target = Number(el.dataset.count);
  const duration = 2000;
  const start = performance.now();

  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(target * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    el.style.transitionDelay = siblings.indexOf(el) * 0.08 + 's';
    el.classList.add('reveal--visible');

    const counter = el.querySelector('[data-count]');
    if (counter) animateCounter(counter);

    observer.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ===== 3D-наклон карточек =====
if (!isTouch) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -14;
      const rotateY = (x / rect.width - 0.5) * 14;

      card.style.transition = 'transform .1s ease-out, border-color .3s';
      card.style.transitionDelay = '0s';
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      card.style.setProperty('--x', x + 'px');
      card.style.setProperty('--y', y + 'px');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1), border-color .3s';
      card.style.transform = '';
    });
  });
}

// ===== Мини-игра: найди артефакт =====
const field = document.getElementById('anomalyField');
const dark = document.getElementById('anomalyDark');
const artifact = document.getElementById('artifact');
const found = document.getElementById('anomalyFound');

function placeArtifact() {
  const maxX = field.clientWidth - 60;
  const maxY = field.clientHeight - 60;
  artifact.style.left = 20 + Math.random() * maxX + 'px';
  artifact.style.top = 20 + Math.random() * maxY + 'px';
}

function moveFlashlight(clientX, clientY) {
  const rect = field.getBoundingClientRect();
  dark.style.setProperty('--fx', clientX - rect.left + 'px');
  dark.style.setProperty('--fy', clientY - rect.top + 'px');
}

field.addEventListener('mousemove', (e) => moveFlashlight(e.clientX, e.clientY));
field.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  moveFlashlight(touch.clientX, touch.clientY);
}, { passive: true });
field.addEventListener('mouseleave', () => {
  dark.style.setProperty('--fx', '-500px');
  dark.style.setProperty('--fy', '-500px');
});

artifact.addEventListener('click', () => {
  found.classList.add('anomaly__found--visible');
  setTimeout(() => {
    found.classList.remove('anomaly__found--visible');
    placeArtifact();
  }, 2500);
});

placeArtifact();

// ===== Группировки =====
const factions = [
  { name: 'Долг', desc: 'Военизированная группировка с железной дисциплиной. Считает Зону угрозой для человечества и стремится её уничтожить. Главный враг — «Свобода».' },
  { name: 'Свобода', desc: 'Анархисты, которые верят, что Зона должна быть открыта для всех. Ценят личную свободу и не любят приказы. Вечные соперники «Долга».' },
  { name: 'Монолит', desc: 'Фанатики, поклоняющиеся таинственному Монолиту в центре Зоны. Охраняют подступы к ЧАЭС и не идут на переговоры.' },
  { name: 'Бандиты', desc: 'Преступники всех мастей, которые охотятся на новичков и грабят одиночек на Свалке и Кордоне.' }
];

const tabs = document.querySelectorAll('.factions__tab');
const factionPanel = document.getElementById('factionPanel');
const factionName = document.getElementById('factionName');
const factionDesc = document.getElementById('factionDesc');

function showFaction(index) {
  factionName.textContent = factions[index].name;
  factionDesc.textContent = factions[index].desc;
  factionPanel.classList.remove('factions__panel--switch');
  void factionPanel.offsetWidth; // перезапуск анимации
  factionPanel.classList.add('factions__panel--switch');
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('factions__tab--active'));
    tab.classList.add('factions__tab--active');
    showFaction(Number(tab.dataset.faction));
  });
});

showFaction(0);
