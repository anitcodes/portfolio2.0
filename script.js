// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// Theme Toggle
function initTheme() {
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.fa-sun').style.display = 'inline-block';
        themeToggle.querySelector('.fa-moon').style.display = 'none';
    } else {
        themeToggle.querySelector('.fa-sun').style.display = 'none';
        themeToggle.querySelector('.fa-moon').style.display = 'inline-block';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Toggle icons
    themeToggle.querySelector('.fa-sun').style.display = isDark ? 'inline-block' : 'none';
    themeToggle.querySelector('.fa-moon').style.display = isDark ? 'none' : 'inline-block';
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Initialize theme
initTheme();

// Mobile Navigation
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    const icon = mobileNavToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    const icon = mobileNavToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// Event Listeners for Mobile Navigation
mobileNavToggle.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            closeMobileMenu();
            
            setTimeout(() => {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    });
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !navLinks.contains(e.target) && 
        !mobileNavToggle.contains(e.target) && 
        navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Active section highlighting
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("wKxaQW641bilFOT0g"); // Replace with your EmailJS public key
})();

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form elements
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const loadingSpinner = submitBtn.querySelector('.loading-spinner');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';

        try {
            // Send email using EmailJS
            await emailjs.send(
                "service_hstymie", // Replace with your EmailJS service ID
                "template_s4u5vpy", // Replace with your EmailJS template ID
                {
                    to_email: "anitshrestha10@gmail.com",
                    from_name: document.getElementById('name').value,
                    from_email: document.getElementById('email').value,
                    message: document.getElementById('message').value,
                }
            );

            // Show success message
            showFormMessage('Message sent successfully!', 'success');
            contactForm.reset();

        } catch (error) {
            console.error('Error sending email:', error);
            showFormMessage('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            loadingSpinner.style.display = 'none';
        }
    });
}

// Helper function to show form messages
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create and show new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    contactForm.insertAdjacentElement('afterend', messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Intersection Observer for animations
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll('section, .project-card').forEach(element => {
    observer.observe(element);
});