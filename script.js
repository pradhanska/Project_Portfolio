// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAOS();
    initFormSubmission();
    initSmoothScroll();
    initScrollAnimations();
    initInteractiveElements();
});

// ==================== NAVIGATION ====================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');

            const section = e.target.getAttribute('data-section');
            const target = document.getElementById(section);

            if (target) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== AOS (ANIMATE ON SCROLL) ====================

function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: false,
            offset: 100
        });
    }
}

// ==================== SMOOTH SCROLL ====================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== FORM SUBMISSION ====================

function initFormSubmission() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            // Form validation
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                }
            });

            if (!isValid) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailInput = form.querySelector('input[type="email"]');
            if (!isValidEmail(emailInput.value)) {
                showNotification('Please enter a valid email', 'error');
                emailInput.style.borderColor = '#ef4444';
                return;
            }

            // Simulate form submission
            button.textContent = 'Sending...';
            button.disabled = true;

            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    }
}

// ==================== SCROLL ANIMATIONS ====================

function initScrollAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const statsElements = document.querySelectorAll('.stat h3');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-progress')) {
                    entry.target.style.animation = 'fillProgress 1.5s ease-out forwards';
                }
                if (entry.target.matches('.stat h3')) {
                    animateCounter(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
    statsElements.forEach(element => observer.observe(element));
}

// ==================== INTERACTIVE ELEMENTS ====================

function initInteractiveElements() {
    // Floating cards parallax effect
    document.addEventListener('mousemove', (e) => {
        const floatingCard = document.querySelector('.floating-card');
        const floatingSphere = document.querySelector('.floating-sphere');

        if (floatingCard || floatingSphere) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            if (floatingCard) {
                floatingCard.style.transform = `
                    translateY(calc(-50% + ${mouseY * 20}px))
                    translateX(${mouseX * 30}px)
                `;
            }

            if (floatingSphere) {
                floatingSphere.style.transform = `
                    translateY(${mouseY * 20}px)
                    translateX(${mouseX * 20}px)
                `;
            }
        }
    });

    // Sphere items interactive hover
    const sphereItems = document.querySelectorAll('.sphere-item');
    sphereItems.forEach(item => {
        item.addEventListener('click', () => {
            showNotification(`${item.textContent} skills selected`, 'success');
        });
    });

    // Project card interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Animate counter from 0 to target number
 */
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const start = Date.now();

    const updateCounter = () => {
        const elapsed = Date.now() - start;
        const progress = elapsed / duration;

        if (progress < 1) {
            element.textContent = Math.floor(target * progress) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    };

    updateCounter();
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#00d4ff'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== ADDITIONAL ANIMATIONS ====================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// ==================== ADVANCED FEATURES ====================

/**
 * Keyboard navigation
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    // Tab navigation through navigation links
    if (e.key === 'Tab') {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (document.activeElement === link) {
                link.classList.add('active');
            }
        });
    }
});

/**
 * Detect light/dark preference
 */
function detectColorScheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (prefersDark) {
        document.body.style.colorScheme = 'dark';
    } else if (prefersLight) {
        document.body.style.colorScheme = 'light';
    }
}

detectColorScheme();

/**
 * Performance optimization - Lazy load images
 */
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Service Worker registration for PWA support
 */
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is created
    // navigator.serviceWorker.register('/sw.js').catch(err => {
    //     console.log('Service Worker registration failed:', err);
    // });
}

/**
 * Track user interactions for analytics
 */
function trackInteraction(action, category, label) {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': 1
        });
    }
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackInteraction('click', 'button', btn.textContent);
    });
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        trackInteraction('click', 'link', link.href);
    });
});

// ==================== CONSOLE GREETING ====================

console.log('%c👋 Welcome to Pradhan\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #00d4ff; text-shadow: 0 0 10px #00d4ff;');
console.log('%cBuilt with modern web technologies: React, Node.js, TypeScript, Docker, and more.', 'color: #a855f7; font-size: 14px;');
console.log('%cFeel free to explore the code and reach out for collaboration! 🚀', 'color: #10b981; font-size: 14px;');
console.log('%cGithub: github.com/pradhan | Email: pradhan@example.com | LinkedIn: linkedin.com/in/pradhan', 'color: #f59e0b; font-size: 12px;');
