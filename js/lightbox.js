// Lightbox Component for MYCAM Studios
// This script creates a lightbox for viewing images

// Create lightbox elements when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createLightboxElements();
});

// Create all necessary lightbox elements
function createLightboxElements() {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    // Create lightbox content container
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    // Create image element
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    lightboxContent.appendChild(lightboxImage);
    
    // Create caption
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';
    lightboxContent.appendChild(lightboxCaption);
    
    // Create close button
    const closeButton = document.createElement('div');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    
    // Create navigation controls
    const controls = document.createElement('div');
    controls.className = 'lightbox-controls';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'lightbox-prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'lightbox-next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
    
    // Append all elements to the lightbox
    lightbox.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(controls);
    
    // Append lightbox to body
    document.body.appendChild(lightbox);
    
    // Setup event listeners
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });
    
    // Navigation buttons
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);
}

// Global variables to track the current gallery
let currentImages = [];
let currentIndex = 0;

// Function to show the lightbox with an image
function showLightbox(imgSrc, imgAlt) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    // Collect all images from the same gallery
    collectGalleryImages();
    
    // Find the index of the clicked image
    currentIndex = currentImages.findIndex(img => img.src === imgSrc);
    
    // Set the image source and caption
    lightboxImage.src = imgSrc;
    lightboxCaption.textContent = imgAlt || '';
    
    // Show the lightbox
    lightbox.classList.add('active');
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
}

// Function to close the lightbox
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('active');
    
    // Re-enable body scroll
    document.body.style.overflow = '';
}

// Function to navigate to the next image
function nextImage() {
    if (currentImages.length <= 1) return;
    
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
}

// Function to navigate to the previous image
function prevImage() {
    if (currentImages.length <= 1) return;
    
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
}

// Function to update the lightbox image
function updateLightboxImage() {
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    const currentImg = currentImages[currentIndex];
    
    // Animate the transition
    lightboxImage.style.opacity = 0;
    
    setTimeout(() => {
        lightboxImage.src = currentImg.src;
        lightboxCaption.textContent = currentImg.alt || '';
        lightboxImage.style.opacity = 1;
    }, 300);
}

// Function to collect all images from the same gallery
function collectGalleryImages() {
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item img, .featured-item img');
    
    // Reset the images array
    currentImages = [];
    
    // Add each image to the array
    galleryItems.forEach(img => {
        currentImages.push({
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt')
        });
    });
}

// Make the function available globally
window.showLightbox = showLightbox;
