// ================================
// MANSHA MOTORS - JAVASCRIPT
// ================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // NAVBAR SCROLL EFFECT
    // ================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Update scroll progress bar
        updateScrollProgress();
    });
    
    // ================================
    // SCROLL PROGRESS BAR
    // ================================
    function updateScrollProgress() {
        const progressBar = document.getElementById('progressBar');
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
    
    // ================================
    // MOBILE MENU TOGGLE
    // ================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    // Close mobile menu
    closeMobileMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // ================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Adjust for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================
    // FADE IN ON SCROLL ANIMATION
    // ================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFadeIn() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkFadeIn);
    
    // Check on load
    checkFadeIn();
    
    // ================================
    // COUNTER ANIMATION
    // ================================
    const counters = document.querySelectorAll('.counter');
    let counterAnimated = false;
    
    function animateCounters() {
        if (counterAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
        
        counterAnimated = true;
    }
    
    // Animate counters when about section is visible
    function checkCountersVisibility() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const rect = aboutSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100 && rect.bottom > 0) {
                animateCounters();
            }
        }
    }
    
    window.addEventListener('scroll', checkCountersVisibility);
    checkCountersVisibility();
    
    // ================================
    // CONTACT FORM SUBMISSION
    // ================================
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !phone || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number');
                return;
            }
            
            // Show success message
            successMessage.classList.remove('hidden');
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, phone, email, message });
        });
    }
    
    // ================================
    // INITIAL HERO ANIMATION
    // ================================
    // Trigger hero fade-in on page load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-bg .fade-in');
        if (heroContent) {
            heroContent.classList.add('visible');
        }
    }, 300);
    
    // ================================
    // LAZY LOADING IMAGES
    // ================================
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ================================
    // PREVENT SCROLL WHEN MOBILE MENU IS OPEN
    // ================================
    mobileMenuBtn.addEventListener('click', function() {
        document.body.style.overflow = 'hidden';
    });
    
    closeMobileMenu.addEventListener('click', function() {
        document.body.style.overflow = 'auto';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.body.style.overflow = 'auto';
        });
    });
    
    // ================================
    // PARALLAX EFFECT ON HERO SECTION
    // ================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-bg');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
        }
    });
    
    // ================================
    // ADD HOVER SOUND EFFECT (OPTIONAL)
    // ================================
    // Uncomment if you want button click sounds
    /*
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-outlined');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Add your sound effect here
            // const audio = new Audio('hover-sound.mp3');
            // audio.play();
        });
    });
    */
    
    // ================================
    // KEYBOARD ACCESSIBILITY
    // ================================
    // Allow Enter key to submit on focused buttons
    document.querySelectorAll('button, a[role="button"]').forEach(element => {
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });
    
    // ================================
    // PERFORMANCE OPTIMIZATION
    // ================================
    // Debounce scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            // Scroll handling code
        });
    }, { passive: true });
    
    // ================================
    // CONSOLE MESSAGE
    // ================================
    console.log('%c🚗 Mansha Motors - Premium Car Showroom', 'color: #FACC15; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite loaded successfully!', 'color: #4CAF50; font-size: 14px;');
});

// ================================
// WHATSAPP BUTTON TRACKING
// ================================
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // Add analytics tracking here if needed
    });
}

// ================================
// WINDOW RESIZE HANDLER
// ================================
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }, 250);
});