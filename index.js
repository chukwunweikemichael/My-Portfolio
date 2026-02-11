// ================= DARK/LIGHT MODE =================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "🌙";
  }
});

// ================= HERO TYPING EFFECT =================
const typedElement = document.getElementById("typed");
const heroParagraph = document.querySelector(".hero-content p");
const introText = "Michael";
const paragraphText = "Creating interactive web experiences with modern design and smooth animations.";

let charIndex = 0;
let paraIndex = 0;

// Type the main heading first
function typeHeading() {
  if (charIndex < introText.length) {
    typedElement.textContent += introText.charAt(charIndex);
    charIndex++;
    setTimeout(typeHeading, 100); // typing speed in ms
  } else {
    setTimeout(typeParagraph, 500); // wait a bit before typing paragraph
  }
}

// Type the paragraph
function typeParagraph() {
  if (paraIndex < paragraphText.length) {
    heroParagraph.textContent += paragraphText.charAt(paraIndex);
    paraIndex++;
    setTimeout(typeParagraph, 50);
  }
}

// Start typing on page load
window.addEventListener("load", () => {
  typedElement.textContent = ""; 
  heroParagraph.textContent = "";
  typeHeading();
});

// ================= HERO CANVAS PARTICLES =================
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const colors = ["#38bdf8", "#0ea5e9", "#2563eb", "#7b8bd4"];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Particle class
class Particle {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1.5 - 0.75;
    this.speedY = Math.random() * 1.5 - 0.75;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){
  particlesArray = [];
  for(let i=0;i<100;i++){
    particlesArray.push(new Particle());
  }
}
initParticles();

function connectParticles(){
  let opacityValue = 0.2;
  for(let a=0;a<particlesArray.length;a++){
    for(let b=a;b<particlesArray.length;b++){
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < 100){
        ctx.strokeStyle = `rgba(56,189,248,${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ================= SKILLS FLOATING =================
const skillCircles = document.querySelectorAll(".skill-circle");

skillCircles.forEach((circle, index) => {
  let angle = Math.random() * 2 * Math.PI;
  const radius = 5 + Math.random() * 10; // floating radius
  const speed = 0.01 + Math.random() * 0.02;

  function float(){
    angle += speed;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    circle.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(float);
  }
  float();
});

// ================= TOOLS FLOAT ON HOVER =================
const toolCards = document.querySelectorAll(".tool-card");

toolCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x - rect.width / 2) * 0.05;
    const moveY = (y - rect.height / 2) * 0.05;
    card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translate(0,0) scale(1)";
  });
});

// ================= PROJECT FILTER =================
const filterButtons = document.querySelectorAll(".project-filters button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    projectCards.forEach(card => {
      if(filter === "all" || card.getAttribute("data-category") === filter){
        card.style.display = "flex";
        setTimeout(()=> card.style.opacity="1", 50);
      } else {
        card.style.opacity="0";
        setTimeout(()=> card.style.display="none", 300);
      }
    });
  });
});

// ================= FADE IN ON SCROLL =================
const faders = document.querySelectorAll(".fade-in");

const appearOptions = { threshold: 0.3, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ================= SCROLL DOWN =================
document.querySelector(".scroll-down").addEventListener("click", ()=>{
  document.getElementById("about").scrollIntoView({behavior:"smooth"});
});
// ================= HERO PROFESSIONAL CODE STREAM WITH SKILLS =================

// List of real skills or keywords
const skillWords = [
  "Fullstack", "Frontend", "Backend", "JavaScript", "React", 
  "Node.js", "Python", "CSS", "HTML5", "Tailwind", "API", "Database"
];

class CodeStream {
  constructor(x) {
    this.x = x; // horizontal position
    this.y = Math.random() * -1000; // start above canvas
    this.speed = 2 + Math.random() * 2; // falling speed
    this.fontSize = 14 + Math.random() * 8;
    this.length = 5 + Math.floor(Math.random() * 12); // number of characters per stream
    this.chars = []; 
    this.generateChars();
  }

  generateChars() {
    this.chars = [];
    for (let i = 0; i < this.length; i++) {
      if (Math.random() < 0.2) {
        // 20% chance to use a skill word
        const word = skillWords[Math.floor(Math.random() * skillWords.length)];
        this.chars.push(word);
      } else {
        this.chars.push(this.randomChar());
      }
    }
  }

  randomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]=<>+-*/%!@#$&";
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  update() {
    this.y += this.speed;

    if (this.y > canvas.height + this.length * this.fontSize) {
      this.y = Math.random() * -200;
      this.generateChars();
    }

    // Randomly change characters or words
    this.chars.forEach((c, i) => {
      if (Math.random() < 0.03) {
        if (Math.random() < 0.2) {
          const word = skillWords[Math.floor(Math.random() * skillWords.length)];
          this.chars[i] = word;
        } else {
          this.chars[i] = this.randomChar();
        }
      }
    });
  }

  draw() {
    ctx.font = `${this.fontSize}px monospace`;
    for (let i = 0; i < this.chars.length; i++) {
      const alpha = i / this.length; // fade effect
      ctx.fillStyle = body.classList.contains("light")
        ? `rgba(0,128,0,${alpha})` // green in light mode
        : `rgba(56,189,248,${alpha})`; // blue neon in dark mode
      ctx.fillText(this.chars[i], this.x, this.y - i * this.fontSize);
    }
  }
}

// Initialize multiple streams
let codeStreams = [];
const streamCount = Math.floor(canvas.width / 20); // one stream per 20px
for (let i = 0; i < streamCount; i++) {
  codeStreams.push(new CodeStream(i * 20));
}

// Animate all
function animateHeroProfessional() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Draw particles behind
  particlesArray.forEach(p => { p.update(); p.draw(); });
  connectParticles();

  // Draw code streams with skills
  codeStreams.forEach(stream => { stream.update(); stream.draw(); });

  requestAnimationFrame(animateHeroProfessional);
}

animateHeroProfessional();
