/**
 * Timmy's Revenge Chili - Interactive Website
 * Because regular chili websites are too mild
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initMobileMenu();
    initFAQAccordion();
    initSpiceMeter();
    initWaiverForm();
    initScrollAnimations();
    initSmoothScroll();
    initParallaxEffects();
});

/**
 * Mobile Navigation Menu
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }
}

/**
 * FAQ Accordion
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Add some spice (literally)
            if (item.classList.contains('active')) {
                createMiniFirework(question);
            }
        });
    });
}

/**
 * Spice Meter Animation
 */
function initSpiceMeter() {
    const activateBtn = document.getElementById('activateSpice');
    const spiceFill = document.getElementById('spiceFill');
    const spiceResult = document.getElementById('spiceResult');
    
    if (!activateBtn || !spiceFill || !spiceResult) return;
    
    const spiceMessages = [
        "Warming up... 🌡️",
        "Getting toasty... 🔥",
        "Entering danger zone... ⚠️",
        "MAXIMUM SPICE ACHIEVED! 🌶️👻💀"
    ];
    
    let isAnimating = false;
    
    activateBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        
        activateBtn.disabled = true;
        activateBtn.textContent = 'Measuring...';
        
        spiceFill.style.width = '0%';
        spiceFill.classList.remove('active');
        spiceResult.textContent = '';
        
        // Animate the meter
        let progress = 0;
        const targetProgress = 95;
        const duration = 3000;
        const steps = 60;
        const increment = targetProgress / steps;
        const stepDuration = duration / steps;
        
        const animateStep = () => {
            progress += increment;
            
            if (progress >= targetProgress) {
                progress = targetProgress;
                spiceFill.style.width = progress + '%';
                spiceFill.classList.add('active');
                spiceResult.textContent = spiceMessages[3];
                activateBtn.textContent = 'Spice Confirmed!';
                
                // Fire rain celebration
                createFireRain();
                
                setTimeout(() => {
                    activateBtn.disabled = false;
                    activateBtn.textContent = 'Activate Again';
                    isAnimating = false;
                }, 2000);
                
                return;
            }
            
            spiceFill.style.width = progress + '%';
            
            // Update message based on progress
            if (progress < 25) {
                spiceResult.textContent = spiceMessages[0];
            } else if (progress < 50) {
                spiceResult.textContent = spiceMessages[1];
            } else if (progress < 80) {
                spiceResult.textContent = spiceMessages[2];
            }
            
            setTimeout(animateStep, stepDuration);
        };
        
        setTimeout(animateStep, 100);
    });
}

/**
 * Waiver Form Interaction
 */
function initWaiverForm() {
    const signatureInput = document.getElementById('signature');
    const signWaiverBtn = document.getElementById('signWaiver');
    const waiverResult = document.getElementById('waiverResult');
    
    if (!signatureInput || !signWaiverBtn || !waiverResult) return;
    
    // Enable button when name is entered
    signatureInput.addEventListener('input', () => {
        const hasValue = signatureInput.value.trim().length >= 2;
        signWaiverBtn.disabled = !hasValue;
    });
    
    // Handle waiver signing
    signWaiverBtn.addEventListener('click', () => {
        const name = signatureInput.value.trim();
        
        if (name.length < 2) return;
        
        // Disable button and show loading
        signWaiverBtn.disabled = true;
        signWaiverBtn.innerHTML = '<span class="btn-text">Processing...</span><span class="btn-icon">⏳</span>';
        
        // Simulate dramatic processing
        setTimeout(() => {
            // Success!
            waiverResult.innerHTML = `
                <div class="success">
                    🎉 WAIVER SIGNED! 🎉<br>
                    <span style="font-size: 1rem; font-family: 'Poppins', sans-serif;">
                        ${name}, you are now legally allowed to experience transformation.<br>
                        Good luck. You'll need it. 🔥
                    </span>
                </div>
            `;
            waiverResult.classList.add('success');
            
            signWaiverBtn.innerHTML = '<span class="btn-text">Fate Accepted!</span><span class="btn-icon">✓</span>';
            signWaiverBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            // Celebration!
            createConfetti();
            createFireRain();
            
            // Reset after delay
            setTimeout(() => {
                signWaiverBtn.style.background = '';
                signWaiverBtn.innerHTML = '<span class="btn-text">I Accept My Fate</span><span class="btn-icon">🔥</span>';
                signWaiverBtn.disabled = false;
            }, 5000);
            
        }, 1500);
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    const animateElements = document.querySelectorAll(
        '.story-grid, .ingredient-card, .testimonial-card, .faq-item'
    );
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/**
 * Smooth Scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 120;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax Effects
 */
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
}

/**
 * Create confetti celebration
 */
function createConfetti() {
    const colors = ['#e63946', '#ff6b35', '#ffc300', '#ffd700', '#ff4500'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 50);
    }
}

/**
 * Create fire emoji rain
 */
function createFireRain() {
    const fireEmojis = ['🔥', '🌶️', '💥', '☄️', '🧨'];
    const fireCount = 20;
    
    for (let i = 0; i < fireCount; i++) {
        setTimeout(() => {
            const fire = document.createElement('div');
            fire.className = 'fire-rain';
            fire.textContent = fireEmojis[Math.floor(Math.random() * fireEmojis.length)];
            fire.style.left = Math.random() * 100 + 'vw';
            fire.style.animationDuration = Math.random() * 1 + 1.5 + 's';
            
            document.body.appendChild(fire);
            
            setTimeout(() => fire.remove(), 2500);
        }, i * 100);
    }
}

/**
 * Create mini firework effect on element
 */
function createMiniFirework(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: #ffc300;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: spark-${i} 0.5s ease-out forwards;
        `;
        
        // Create unique keyframe for each spark
        const angle = (i / 8) * Math.PI * 2;
        const distance = 30;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spark-${i} {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(${endX}px, ${endY}px) scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(spark);
        
        setTimeout(() => {
            spark.remove();
            style.remove();
        }, 500);
    }
}

/**
 * Easter Egg: Konami Code
 */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Create epic celebration
    document.body.style.animation = 'rainbow-bg 2s ease-in-out';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow-bg {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Show secret message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #e63946, #ff6b35);
        color: white;
        padding: 40px;
        border-radius: 20px;
        font-family: 'Bangers', cursive;
        font-size: 2rem;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 0 50px rgba(230, 57, 70, 0.8);
        animation: pop-in 0.5s ease-out;
    `;
    message.innerHTML = '🎮 SECRET UNLOCKED! 🎮<br><span style="font-size: 1rem; font-family: Poppins, sans-serif;">Timmy approves of your gaming skills!<br>Enjoy a 0% discount! 🔥</span>';
    
    const popStyle = document.createElement('style');
    popStyle.textContent = `
        @keyframes pop-in {
            0% { transform: translate(-50%, -50%) scale(0); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(popStyle);
    
    document.body.appendChild(message);
    
    // Fire rain!
    createFireRain();
    createConfetti();
    
    setTimeout(() => {
        message.remove();
        style.remove();
        popStyle.remove();
        document.body.style.animation = '';
    }, 4000);
}

// Console easter egg for developers
console.log(`
🌶️🔥 TIMMY'S REVENGE CHILI 🔥🌶️
================================
Looking at the code, huh?
Just like Timmy looked at hot sauce formulas for a year.

Fun fact: The spice meter goes to 95% because
even Timmy isn't crazy enough to go full 100%.

Try the Konami Code for a surprise! 
↑↑↓↓←→←→BA

- Made with 🔥, 😭, and many gallons of 🥛
`);
