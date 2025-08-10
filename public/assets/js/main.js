// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Mobile Menu Toggle (for future hamburger menu)
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('header nav ul');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Contact Form Submission Handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      phone: contactForm.phone.value.trim(),
      problem: contactForm.problem.value.trim(),
      message: contactForm.message.value.trim()
    };

    // Enhanced validation
    if (!formData.name || !formData.email || !formData.phone || !formData.problem || !formData.message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      showFormMessage('Please enter a valid phone number.', 'error');
      return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showFormMessage('Your consultation request has been sent successfully! We will contact you within 24 hours.', 'success');
      contactForm.reset();
    } catch (error) {
      console.error('Form Submission Error:', error);
      showFormMessage('An error occurred while sending your request. Please try again later.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Form message display function
function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;
  
  // Insert after the form
  const form = document.querySelector('.contact-form form');
  form.parentNode.insertBefore(messageDiv, form.nextSibling);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Testimonials Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const testimonialsTrack = document.querySelector('.testimonials-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  
  if (!testimonialsTrack || !prevBtn || !nextBtn) return;
  
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.testimonial-card').length;
  let slideWidth = 350 + 32; // card width + gap
  
  // Initialize carousel
  function initCarousel() {
    updateCarousel();
    updateDots();
    updateButtons();
  }
  
  // Update carousel position
  function updateCarousel() {
    const translateX = -currentSlide * slideWidth;
    testimonialsTrack.style.transform = `translateX(${translateX}px)`;
  }
  
  // Update active dot
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  // Update button states
  function updateButtons() {
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
  }
  
  // Go to specific slide
  function goToSlide(slideIndex) {
    currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
    updateCarousel();
    updateDots();
    updateButtons();
  }
  
  // Next slide
  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }
  
  // Previous slide
  function prevSlide() {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }
  
  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Auto-play carousel
  let autoPlayInterval;
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        nextSlide();
      } else {
        goToSlide(0); // Reset to first slide
      }
    }, 5000); // Change slide every 5 seconds
  }
  
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }
  
  // Pause auto-play on hover
  testimonialsTrack.addEventListener('mouseenter', stopAutoPlay);
  testimonialsTrack.addEventListener('mouseleave', startAutoPlay);
  
  // Touch/swipe support for mobile
  let startX = 0;
  let endX = 0;
  
  testimonialsTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAutoPlay();
  });
  
  testimonialsTrack.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }
    
    startAutoPlay();
  });
  
  // Initialize carousel
  initCarousel();
  startAutoPlay();
  
  // Responsive adjustments
  function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    
    if (isMobile) {
      slideWidth = 280 + 16; // mobile card width + gap
    } else if (isTablet) {
      slideWidth = 300 + 24; // tablet card width + gap
    } else {
      slideWidth = 350 + 32; // desktop card width + gap
    }
    
    updateCarousel();
  }
  
  window.addEventListener('resize', handleResize);
});
