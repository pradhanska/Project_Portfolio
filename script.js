// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavigation();
    initAOS();
    initFormSubmission();
    initSmoothScroll();
    initScrollAnimations();
    initSectionTransitions();
    initScrollProgress();
    initBackToTop();
    initCursorGlow();
    initInteractiveElements();
});

const THEMES = [
    { id: 'default', label: 'Default' },
    { id: 'light', label: 'Light' },
    { id: 'neo', label: 'Neo' }
];

function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const label = document.getElementById('themeToggleLabel');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('portfolio-theme');
    const startTheme = THEMES.some(theme => theme.id === savedTheme) ? savedTheme : 'default';
    applyTheme(startTheme, label);

    toggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'default';
        const currentIndex = THEMES.findIndex(theme => theme.id === currentTheme);
        const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];
        applyTheme(nextTheme.id, label);
    });
}

function applyTheme(themeId, labelElement) {
    document.body.setAttribute('data-theme', themeId);
    localStorage.setItem('portfolio-theme', themeId);

    if (labelElement) {
        const theme = THEMES.find(item => item.id === themeId);
        labelElement.textContent = theme ? theme.label : 'Default';
    }
}

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

            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            // Form validation
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ffffff33';
                } else {
                    input.style.borderColor = 'rgba(245, 245, 245, 0.12)';
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

// ==================== SECTION TRANSITIONS ====================

function initSectionTransitions() {
    const sections = document.querySelectorAll('.hero, .section');

    if (!('IntersectionObserver' in window)) {
        sections.forEach(section => section.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, sectionObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    sections.forEach(section => observer.observe(section));
}

function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;

    const toggleVisibility = () => {
        if (window.scrollY > 520) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
}

function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    document.addEventListener('mousemove', (event) => {
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
    });
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
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#334155'};
        color: #e2e8f0;
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

console.log('%cWelcome to Pradhan\'s Portfolio', 'font-size: 20px; font-weight: 600; color: #f5f5f5;');
console.log('%cBuilt with modern web technologies: React, Node.js, TypeScript, Docker, and more.', 'color: #b0b0b0; font-size: 14px;');
console.log('%cFeel free to explore the code and reach out for collaboration.', 'color: #a6a6a6; font-size: 14px;');
console.log('%cGithub: github.com/pradhan | Email: pradhan@example.com | LinkedIn: linkedin.com/in/pradhan', 'color: #8c8c8c; font-size: 12px;');
// ================= TECH FILTER SYSTEM =================

function initTechFilter() {
    const techButtons = document.querySelectorAll('.tech-badge');
    const projectCards = document.querySelectorAll('.project-card');

    techButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTech = button.getAttribute('data-filter');
            const isAlreadyActive = button.classList.contains('active');
            const isAllFilter = selectedTech === 'all';

            // Clicking the active badge clears filtering.
            if (isAlreadyActive || isAllFilter) {
                techButtons.forEach(btn => btn.classList.remove('active'));
                if (!isAlreadyActive && isAllFilter) {
                    button.classList.add('active');
                }
                projectCards.forEach(card => {
                    card.classList.remove('hidden');
                    card.classList.remove('highlighted');
                });
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                return;
            }

            techButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const matchingCards = [];

            projectCards.forEach(card => {
                const techList = (card.getAttribute('data-tech') || '').toLowerCase();
                const hasMatch = techList.split(/\s+/).includes((selectedTech || '').toLowerCase());

                card.classList.remove('highlighted');

                if (hasMatch) {
                    matchingCards.push(card);
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

            // Prevent blank project area when no project matches a selected tech.
            if (matchingCards.length === 0) {
                button.classList.remove('active');
                projectCards.forEach(card => {
                    card.classList.remove('hidden');
                    card.classList.remove('highlighted');
                });
                showNotification(`No project tagged with "${selectedTech}" yet.`, 'info');
                return;
            }

            setTimeout(() => {
                matchingCards.forEach(card => card.classList.add('highlighted'));
            }, 250);

            // Scroll to the first relevant project card for the selected technology.
            matchingCards[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}

initTechFilter();
