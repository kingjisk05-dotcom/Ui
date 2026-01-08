/* ==================================================
   GOD-TIER WEATHER FX ENGINE
   - Canvas Particle System (Rain, Snow, Mist)
   - Dynamic Atmospheric Lighting (Time + Temp)
   - Thunderstorm Flash Effects
   - Physics-based Wind Sway
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const weatherEl = document.getElementById("weather");
    if (!weatherEl) return;

    // --- CONFIGURATION ---
    const CONFIG = {
        particleCount: 50,
        rainColor: 'rgba(174, 194, 224, 0.6)',
        snowColor: 'rgba(255, 255, 255, 0.8)',
        gravity: 0.5,
        windForce: 0
    };

    // --- 1. SETUP CANVAS & STYLES ---
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // High-performance styling
    weatherEl.style.position = "relative";
    weatherEl.style.overflow = "hidden"; // Keeps particles inside
    weatherEl.style.transition = "box-shadow 1s ease, background 1s ease, border-color 1s ease";
    
    canvas.style.cssText = `
        position: absolute; top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none; z-index: 0;
        opacity: 0.8;
    `;
    weatherEl.appendChild(canvas);

    // Inject CSS for Thunder & Sway
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes sunSpin { from {transform:rotate(0deg);} to {transform:rotate(360deg);} }
        @keyframes subtleSway { 0%,100%{transform:rotate(-3deg);} 50%{transform:rotate(3deg);} }
        @keyframes heavyShake { 0%{transform:rotate(0deg);} 25%{transform:rotate(5deg);} 75%{transform:rotate(-5deg);} 100%{transform:rotate(0deg);} }
        @keyframes thunderFlash { 
            0%, 90%, 100% { background-color: rgba(255,255,255,0); } 
            92%, 96% { background-color: rgba(255,255,255,0.3); } 
        }
        .fx-sun i { animation: sunSpin 12s linear infinite; display:inline-block; }
        .fx-sway-light i { animation: subtleSway 4s ease-in-out infinite; display:inline-block; }
        .fx-sway-heavy i { animation: heavyShake 0.5s ease-in-out infinite; display:inline-block; }
        .fx-thunder { animation: thunderFlash 5s infinite; }
    `;
    document.head.appendChild(style);

    // --- 2. PARTICLE SYSTEM ---
    let particles = [];
    let animationId = null;
    let currentType = 'clear';

    class Particle {
        constructor(type) {
            this.reset(type);
        }

        reset(type) {
            this.type = type;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * -1; // Start above
            
            if (type === 'snow') {
                this.vx = Math.random() * 1 - 0.5; // Drift left/right
                this.vy = Math.random() * 1 + 0.5; // Fall slow
                this.size = Math.random() * 2 + 1;
            } else { // Rain
                this.vx = 0.5; // Slight slant
                this.vy = Math.random() * 4 + 4; // Fall fast
                this.size = Math.random() * 10 + 5; // Length
            }
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Snow oscillation (sine wave)
            if (this.type === 'snow') this.x += Math.sin(this.y * 0.05) * 0.5;

            // Reset if out of bounds
            if (this.y > canvas.height) this.reset(this.type);
            if (this.x > canvas.width) this.x = 0;
        }

        draw() {
            ctx.beginPath();
            if (this.type === 'snow') {
                ctx.fillStyle = CONFIG.snowColor;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else { // Rain
                ctx.strokeStyle = CONFIG.rainColor;
                ctx.lineWidth = 1.5;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.vx, this.y + this.size);
                ctx.stroke();
            }
        }
    }

    // --- 3. RENDER LOOP ---
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (currentType !== 'clear') {
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationId = requestAnimationFrame(loop);
        }
    }

    function initParticles(type) {
        if (animationId) cancelAnimationFrame(animationId);
        currentType = type;
        particles = [];
        
        if (type === 'clear') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        for (let i = 0; i < CONFIG.particleCount; i++) {
            particles.push(new Particle(type));
        }
        loop();
    }

    // --- 4. ATMOSPHERE & LOGIC ---
    function updateAtmosphere(text) {
        const t = text.toLowerCase();
        
        // A. Extract Data
        const match = text.match(/(-?\d+)\s*°/);
        const temp = match ? parseInt(match[1]) : 25; // Default 25 if fail
        const hour = new Date().getHours();
        const isNight = hour >= 19 || hour < 6;
        
        // B. Determine Weather Type
        let type = 'clear';
        if (t.includes('rain') || t.includes('drizzle')) type = 'rain';
        if (t.includes('snow') || t.includes('flake')) type = 'snow';
        if (t.includes('storm') || t.includes('thunder')) type = 'storm';

        // C. Resize Canvas (Responsive)
        canvas.width = weatherEl.offsetWidth;
        canvas.height = weatherEl.offsetHeight;

        // D. Start Particles
        if (type === 'storm') initParticles('rain'); // Storm has rain particles
        else initParticles(type);

        // E. Icon Animation & Effects
        weatherEl.classList.remove('fx-sun', 'fx-sway-light', 'fx-sway-heavy', 'fx-thunder');
        
        if (type === 'storm') {
            weatherEl.classList.add('fx-thunder', 'fx-sway-heavy');
        } else if (type === 'rain' || type === 'snow') {
            weatherEl.classList.add('fx-sway-light');
        } else if (type === 'clear' && !isNight) {
            weatherEl.classList.add('fx-sun');
        }

        // F. Dynamic Glow (God Mode Color Logic)
        let glowColor, borderColor;

        if (type === 'storm') {
            glowColor = 'rgba(130, 0, 255, 0.6)'; // Electric Purple
            borderColor = 'rgba(200, 200, 255, 0.4)';
        } else if (type === 'snow') {
            glowColor = 'rgba(200, 240, 255, 0.7)'; // Ice Blue
            borderColor = 'rgba(255, 255, 255, 0.5)';
        } else if (type === 'rain') {
            glowColor = 'rgba(0, 160, 255, 0.5)'; // Deep Blue
            borderColor = 'rgba(100, 200, 255, 0.3)';
        } else if (temp <= 10) {
            glowColor = 'rgba(0, 255, 255, 0.6)'; // Cold Cyan
            borderColor = 'rgba(0, 255, 255, 0.3)';
        } else if (temp >= 30) {
            glowColor = 'rgba(255, 80, 0, 0.6)'; // Hot Orange
            borderColor = 'rgba(255, 100, 50, 0.3)';
        } else {
            // Pleasant / Default
            glowColor = isNight ? 'rgba(100, 80, 255, 0.5)' : 'rgba(0, 255, 150, 0.5)';
            borderColor = 'rgba(255, 255, 255, 0.2)';
        }

        weatherEl.style.boxShadow = `0 0 15px ${glowColor}, inset 0 0 10px ${borderColor}`;
        weatherEl.style.borderColor = borderColor;
    }

    // --- 5. OBSERVER (Auto-Detect Changes) ---
    const observer = new MutationObserver(() => {
        // Debounce to prevent flicker
        requestAnimationFrame(() => updateAtmosphere(weatherEl.innerText));
    });

    observer.observe(weatherEl, { childList: true, characterData: true, subtree: true });

    // Initial Run
    updateAtmosphere(weatherEl.innerText);
});
