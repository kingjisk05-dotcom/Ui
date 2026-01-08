/* ==================================================
   GOD-TIER WEATHER FX ENGINE
   - Multi-Particle System (Rain, Snow, Drizzle)
   - Dynamic Atmospheric Lighting (Time + Weather)
   - Thunderstorm Flash Effects
   - Physics-based Wind Sway
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const weatherEl = document.getElementById("weather");
    if (!weatherEl) return;

    // --- CONFIGURATION ---
    const CONFIG = {
        particleCount: 60,
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
    weatherEl.style.transition = "box-shadow 1s ease, background 1s ease";
    
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
        @keyframes subtleSway { 0%,100%{transform:rotate(-3deg);} 50%{transform:rotate(3deg);} }
        @keyframes heavyShake { 0%{transform:rotate(0deg);} 25%{transform:rotate(5deg);} 75%{transform:rotate(-5deg);} 100%{transform:rotate(0deg);} }
        @keyframes thunderFlash { 
            0%, 90%, 100% { background-color: rgba(255,255,255,0); } 
            92%, 96% { background-color: rgba(255,255,255,0.3); } 
        }
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

            // Snow oscillation
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
        const hour = new Date().getHours();
        const isNight = hour >= 19 || hour < 6;
        
        // A. Determine Type
        let type = 'clear';
        if (t.includes('rain') || t.includes('drizzle')) type = 'rain';
        if (t.includes('snow') || t.includes('flake')) type = 'snow';
        if (t.includes('storm') || t.includes('thunder')) type = 'storm';

        // B. Resize Canvas (Responsive)
        canvas.width = weatherEl.offsetWidth;
        canvas.height = weatherEl.offsetHeight;

        // C. Particles
        if (type === 'storm') initParticles('rain'); // Storm has rain
        else initParticles(type);

        // D. Icon Animation
        const icon = weatherEl.querySelector('i');
        if (icon) {
            weatherEl.className = "weather-badge"; // Reset classes
            if (type === 'storm') {
                weatherEl.classList.add('fx-thunder', 'fx-sway-heavy');
            } else if (type === 'rain' || type === 'snow') {
                weatherEl.classList.add('fx-sway-light');
            }
        }

        // E. Dynamic Glow (The "God Mode" Lighting)
        let glowColor, borderColor;

        if (type === 'storm') {
            glowColor = 'rgba(100, 0, 255, 0.4)'; // Purple/Dark
            borderColor = 'rgba(200, 200, 255, 0.3)';
        } else if (type === 'snow') {
            glowColor = 'rgba(200, 240, 255, 0.6)'; // Ice Blue
            borderColor = 'rgba(255, 255, 255, 0.5)';
        } else if (type === 'rain') {
            glowColor = 'rgba(0, 150, 255, 0.4)'; // Deep Blue
            borderColor = 'rgba(100, 200, 255, 0.3)';
        } else if (isNight) {
            glowColor = 'rgba(120, 80, 255, 0.5)'; // Night Violet
            borderColor = 'rgba(150, 100, 255, 0.2)';
        } else {
            // Sunny / Day
            if (hour < 10) glowColor = 'rgba(255, 200, 100, 0.6)'; // Morning Gold
            else if (hour > 16) glowColor = 'rgba(255, 100, 50, 0.6)'; // Sunset Orange
            else glowColor = 'rgba(0, 255, 200, 0.5)'; // Noon Cyan
            borderColor = 'rgba(255, 255, 255, 0.3)';
        }

        weatherEl.style.boxShadow = `0 0 15px ${glowColor}, inset 0 0 10px ${borderColor}`;
        weatherEl.style.border = `1px solid ${borderColor}`;
    }

    // --- 5. OBSERVER (Auto-Detect Changes) ---
    const observer = new MutationObserver(() => {
        // Debounce slightly to prevent flicker on rapid updates
        requestAnimationFrame(() => updateAtmosphere(weatherEl.innerText));
    });

    observer.observe(weatherEl, { childList: true, characterData: true, subtree: true });

    // Initial Run
    updateAtmosphere(weatherEl.innerText);
});
