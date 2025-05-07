// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const testimonials = document.querySelectorAll('.testimonial');
const testimonialPrev = document.querySelector('.testimonial-controls .prev');
const testimonialNext = document.querySelector('.testimonial-controls .next');
const header = document.querySelector('header');

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking on menu items
document.querySelectorAll('.nav-menu a').forEach(item => {
    item.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Testimonial Slider
let currentTestimonial = 0;

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Show the selected testimonial
    testimonials[index].classList.add('active');
}

// Initialize testimonials if they exist on the page
if (testimonials.length > 0) {
    // Show the first testimonial
    showTestimonial(currentTestimonial);
    
    // Previous button click
    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    // Next button click
    if (testimonialNext) {
        testimonialNext.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Animation on scroll
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('revealed');
        }
    });
}

// Add the 'revealed' class to the first section on page load
window.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('section')) {
        document.querySelector('section').classList.add('revealed');
    }
    
    // Initialize lightbox for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item, .featured-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            const imgAlt = item.querySelector('img').getAttribute('alt');
            
            // Create and show lightbox
            openLightbox(imgSrc, imgAlt);
        });
    });
});

// Trigger reveal animation on scroll
window.addEventListener('scroll', revealOnScroll);

// Form validation for contact form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form inputs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate inputs
        let isValid = true;
        
        if (name === '') {
            showError('name', 'Name is required');
            isValid = false;
        } else {
            removeError('name');
        }
        
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        } else {
            removeError('email');
        }
        
        if (message === '') {
            showError('message', 'Message is required');
            isValid = false;
        } else {
            removeError('message');
        }
        
        // If form is valid, submit it (in a real site, this would send data to a server)
        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                contactForm.insertBefore(successMessage, contactForm.firstChild);
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        }
    });
}

// Helper function to show form error
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const parent = input.parentElement;
    
    // Remove any existing error message
    removeError(inputId);
    
    // Add new error message
    parent.appendChild(errorDiv);
    input.classList.add('error');
}

// Helper function to remove form error
function removeError(inputId) {
    const input = document.getElementById(inputId);
    const parent = input.parentElement;
    const errorDiv = parent.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.classList.remove('error');
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to open lightbox
function openLightbox(imgSrc, imgAlt) {
    // Check if lightbox.js is loaded and the function is available
    if (typeof showLightbox === 'function') {
        showLightbox(imgSrc, imgAlt);
    } else {
        console.error('Lightbox functionality is not available');
    }
}
