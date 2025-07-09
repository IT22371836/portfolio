// Modern Portfolio JavaScript - Enhanced Interactivity
// Author: Nadee Hewapathirana

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio...');
    
    // Test if buttons exist
    const letsTalkBtn = document.querySelector('a[href="#contact"]');
    const viewWorkBtn = document.querySelector('a[href="#projects"]');
    const contactSection = document.getElementById('contact');
    const projectsSection = document.getElementById('projects');
    
    console.log('Let\'s Talk button:', letsTalkBtn);
    console.log('View Work button:', viewWorkBtn);
    console.log('Contact section:', contactSection);
    console.log('Projects section:', projectsSection);
    
    initTheme();
    initNavigation();
    initSmoothScrolling();
    initTypingAnimation();
    initScrollAnimations();
    initSkillsToggle();
    initContactForm();
    initScrollEffects();
    initParallax();
    
    console.log('All functions initialized!');
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Enhanced Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Active nav link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const offset = 100;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= offset) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    console.log('Initializing smooth scrolling...');
    
    // Handle all anchor links that start with #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        console.log('Found anchor link:', anchor.getAttribute('href'));
        
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            console.log('Clicked link:', targetId);
            console.log('Target element:', target);
            
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                console.log('Scrolling to:', offsetTop);
                
                // Use smooth scrolling
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fallback for older browsers
                if (window.scrollTo.toString().indexOf('behavior') === -1) {
                    smoothScrollTo(offsetTop, 600);
                }
            } else {
                console.error('Target not found:', targetId);
            }
        });
    });
    
    console.log('Smooth scrolling initialized for', document.querySelectorAll('a[href^="#"]').length, 'links');

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Fallback smooth scroll function for older browsers
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Enhanced Typing Animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const words = [
        'Full Stack Developer',
        'Frontend Specialist', 
        'React Developer',
        'Mobile App Developer',
        'UI/UX Enthusiast'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 200;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing animation after a delay
    setTimeout(typeEffect, 1000);
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animate skill tags with stagger
                if (entry.target.classList.contains('skill-category')) {
                    const skillTags = entry.target.querySelectorAll('.skill-tag');
                    skillTags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.animation = `fadeInUp 0.6s ease-out forwards`;
                        }, index * 100);
                    });
                }

                // Animate project cards with stagger
                if (entry.target.classList.contains('projects-grid')) {
                    const projectCards = entry.target.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.6s ease-out forwards`;
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .about-card,
        .skills-section,
        .skill-category,
        .projects-grid,
        .contact-card,
        .contact-form-wrapper
    `);

    animateElements.forEach(el => observer.observe(el));
}

// Skills Toggle Functionality
function initSkillsToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const skillsView = document.getElementById('skills-view');
    const educationView = document.getElementById('education-view');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide views with smooth transition
            if (view === 'skills') {
                skillsView.style.display = 'block';
                educationView.style.display = 'none';
            } else {
                skillsView.style.display = 'none';
                educationView.style.display = 'block';
            }
        });
    });
}

// Enhanced Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const statusDiv = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            
            // For GitHub Pages compatibility, you'd need to use a service like Formspree
            // Replace this URL with your actual form handler
            const response = await fetch('YOUR_FORM_HANDLER_URL', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showFormStatus('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    function showFormStatus(message, type) {
        if (statusDiv) {
            statusDiv.textContent = message;
            statusDiv.className = `form-status ${type}`;
            statusDiv.style.opacity = '1';
            
            setTimeout(() => {
                statusDiv.style.opacity = '0';
            }, 5000);
        }
    }
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background opacity based on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            }
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Parallax Effect
function initParallax() {
    const heroGrid = document.querySelector('.hero-grid');
    const floatingElements = document.querySelectorAll('.tech-badge');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (heroGrid) {
            heroGrid.style.transform = `translateY(${rate}px)`;
        }

        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Handle prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-normal', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger?.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Print optimization
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Test function to verify buttons work
function testButtons() {
    console.log('Testing buttons...');
    
    // Specifically target the hero action buttons
    const letsTalkBtn = document.querySelector('.hero-actions a[href="#contact"]');
    const viewWorkBtn = document.querySelector('.hero-actions a[href="#projects"]');
    
    if (letsTalkBtn) {
        console.log('Let\'s Talk button found, adding click handler...');
        letsTalkBtn.addEventListener('click', function(e) {
            console.log('Let\'s Talk button clicked!');
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                console.log('Scrolling to contact section at:', offsetTop);
            } else {
                console.error('Contact section not found!');
            }
        });
    } else {
        console.error('Let\'s Talk button not found!');
    }
    
    if (viewWorkBtn) {
        console.log('View Work button found, adding click handler...');
        viewWorkBtn.addEventListener('click', function(e) {
            console.log('View Work button clicked!');
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                console.log('Scrolling to projects section at:', offsetTop);
            } else {
                console.error('Projects section not found!');
            }
        });
    } else {
        console.error('View Work button not found!');
    }
}

// Call test function after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(testButtons, 100); // Run after other initializations
});
