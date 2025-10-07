// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Navbar scroll effect and active link highlighting
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  const scrollPosition = window.scrollY;
  
  // Add scrolled class to navbar
  if (scrollPosition > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Highlight active navigation link
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');
  
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    
    if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`a[href="#${section.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
  navMenu.classList.toggle('active');
  
  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (navMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'rotate(0) translate(0, 0)';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'rotate(0) translate(0, 0)';
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'rotate(0) translate(0, 0)';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'rotate(0) translate(0, 0)';
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Basic validation
  if (!name || !email || !phone || !subject || !message) {
    showFormResponse('Please fill in all required fields.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showFormResponse('Please enter a valid email address.', 'error');
    return;
  }
  
  if (!isValidPhone(phone)) {
    showFormResponse('Please enter a valid phone number.', 'error');
    return;
  }
  
  // Simulate form submission (replace with actual form submission logic)
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showFormResponse('Thank you for your message! I will get back to you within 24 hours.', 'success');
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

function showFormResponse(message, type) {
  formResponse.textContent = message;
  formResponse.className = type;
  formResponse.style.display = 'block';
  
  if (type === 'success') {
    setTimeout(() => {
      formResponse.style.display = 'none';
    }, 5000);
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Animate stats counter
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start) + (element.dataset.suffix || '');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate stat counters
      if (entry.target.classList.contains('stats')) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const endValue = parseInt(stat.textContent.replace(/\D/g, ''));
          stat.dataset.suffix = stat.textContent.replace(/\d/g, '');
          animateCounter(stat, 0, endValue, 2000);
        });
      }
      
      // Add fade-in animation to elements
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.practice-card, .service-item, .achievement-item, .stats').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Profile image click handler
document.getElementById('profile-img').addEventListener('click', function() {
  this.style.transform = this.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    if (this.type !== 'submit') {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = (e.clientX - this.offsetLeft) + 'px';
      ripple.style.top = (e.clientY - this.offsetTop) + 'px';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Console log for developers
console.log('🏛️ Legal Website by Adv. Shubham Thariwal - Developed with excellence!');
