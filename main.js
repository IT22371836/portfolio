// Portfolio JavaScript - Animations and Interactivity
// Author: Nadee Hewapathirana

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    initTypingAnimation();
    initScrollAnimations();
    initTabFunctionality();
    initScrollEffects();
    initContactForm();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('About');
            if (aboutSection) {
                aboutSection.scrollIntoView({behavior: 'smooth'});
            }
        });
    }
}

// Typing Animation for Hero Text
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const words = ['Full Stack Developer', 'Frontend Developer', 'React Developer', 'Web Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 200);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    // Start typing animation after a delay
    setTimeout(typeEffect, 1000);
}

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill bars when skills section comes into view
                if (entry.target.querySelector('.skill-progress')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe all sections with fade-in animation
    document.querySelectorAll('.fade-in-section, .slide-in-left, .slide-in-up, .card-animation').forEach(el => {
        observer.observe(el);
    });
}

// Animate Skill Bars
function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            bar.style.width = width;
        }
    });
}

// Tab Functionality with Enhanced Animations
function initTabFunctionality() {
    // Make opentab function global for onclick handlers
    window.opentab = function(tabname) {
        const tablinks = document.getElementsByClassName("tab-links");
        const tabcontents = document.getElementsByClassName("tab-contents");

        for (let tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (let tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }
        
        event.currentTarget.classList.add("active-link");
        const targetTab = document.getElementById(tabname);
        if (targetTab) {
            targetTab.classList.add("active-tab");
        }
        
        // Re-animate skill bars when skills tab is opened
        if (tabname === 'skills') {
            setTimeout(animateSkillBars, 200);
        }
    };
}

// Optimize Scroll Performance with Throttling
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const header = document.getElementById('header');
        if (header && scrolled < window.innerHeight) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw8VnKfCxSSB1jksgbCsuyKj2OG-bECMlIGfnIYF1MzuvSYxy4sOAlw6l19sIVTo53M/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    if (form && msg) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    msg.innerHTML = "✅ Message sent successfully!";
                    msg.classList.add('show');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    setTimeout(function() {
                        msg.classList.remove('show');
                        setTimeout(() => msg.innerHTML = "", 300);
                    }, 4000);
                    form.reset();
                })
                .catch(error => {
                    msg.innerHTML = "❌ Error sending message. Please try again.";
                    msg.style.color = 'var(--error-color)';
                    msg.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                    msg.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    msg.classList.add('show');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    console.error('Error!', error.message);
                    setTimeout(function() {
                        msg.classList.remove('show');
                        setTimeout(() => {
                            msg.innerHTML = "";
                            msg.style.color = '';
                            msg.style.backgroundColor = '';
                            msg.style.borderColor = '';
                        }, 300);
                    }, 4000);
                });
        });
    }
}

// Page Load Initialization
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize animations with better performance
    requestAnimationFrame(() => {
        // Additional initialization if needed
        console.log('Portfolio animations initialized successfully!');
    });
});

// Export functions for potential external use
window.PortfolioJS = {
    animateSkillBars,
    opentab: window.opentab
};
