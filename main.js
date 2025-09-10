// Immediate fix for blank sections
const makeVisible = () => {
  const elements = document.querySelectorAll('section, .about, .project-panel, .container1, .service-list');
  elements.forEach(el => {
      if (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.visibility = 'visible';
      }
  });
};

// Run immediately and also when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', makeVisible);
} else {
  makeVisible();
}

// Loading Screen
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  setTimeout(() => {
      if (loader) {
          loader.style.opacity = '0';
          setTimeout(() => {
              loader.style.display = 'none';
          }, 500);
      }
  }, 2000);
});

// Typed.js Animation for dynamic text
let typed;
document.addEventListener('DOMContentLoaded', () => {
  const dynamicTextElement = document.querySelector(".dynamic-text");
  if (dynamicTextElement) {
    typed = new Typed(".dynamic-text", {
        strings: ["digital experiences", "web applications", "user interfaces", "innovative solutions"],
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 1200,
        startDelay: 1000,
        loop: true,
        showCursor: false
    });
  }
});

// Modal Functionality
const openBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('aboutModal');
const closeBtn = document.querySelector('.close-btn');

if (openBtn && modal && closeBtn) {
  openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'flex';
      modal.classList.add('active');
      // Do not block page scrolling or interactions
      modal.setAttribute('aria-hidden', 'false');
  });

  closeBtn.addEventListener('click', () => {
      closeModal();
  });

  window.addEventListener('click', (e) => {
      if (e.target === modal) {
          closeModal();
      }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
          closeModal();
      }
  });
}

function closeModal() {
  modal.classList.remove('active');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

// Navigation Functionality
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

// Active Navigation Highlighting
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
      }
  });

  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
      }
  });

  // Header scroll effect
  if (window.scrollY > 100) {
      header.classList.add('scrolled');
  } else {
      header.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
      navbar.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
  });
}

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
          e.preventDefault();
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
              const offsetTop = targetSection.offsetTop - 80;
              window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
              });
          }
          // Close mobile menu if open
          if (navbar.classList.contains('active')) {
              navbar.classList.remove('active');
              mobileMenuBtn.classList.remove('active');
          }
      }
  });
});

// Scroll Animations with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
      }
  });
}, observerOptions);

// Make sure all sections are visible immediately and then optionally animate
const sectionsToShow = document.querySelectorAll('section, .about, .project-panel, .container1');
sectionsToShow.forEach(el => {
  el.style.opacity = '1';
  el.style.transform = 'none';
  // Optional: Add scroll animations only to specific elements if desired
  if (!el.classList.contains('home') && !el.classList.contains('contact')) {
      observer.observe(el);
  }
});

// Contact Form Validation and Submission
const contactForm = document.querySelector('.contact_form form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = contactForm.querySelector('input[placeholder*="name"]').value.trim();
      const email = contactForm.querySelector('input[placeholder*="email"]').value.trim();
      const subject = contactForm.querySelector('input[placeholder*="subject"]').value.trim();
      const message = contactForm.querySelector('textarea').value.trim();
      
      // Validation
      if (!name || !email || !subject || !message) {
          showNotification('Please fill in all fields', 'error');
          return;
      }
      
      if (!isValidEmail(email)) {
          showNotification('Please enter a valid email address', 'error');
          return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('.send');
      const originalText = submitBtn.value;
      submitBtn.value = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
          showNotification('Message sent successfully! Thank you for reaching out.', 'success');
          contactForm.reset();
          submitBtn.value = originalText;
          submitBtn.disabled = false;
      }, 2000);
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
      notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
          document.body.removeChild(notification);
      }, 300);
  }, 4000);
}

// Download Resume Function
function downloadResume() {
  // Update this path to match your uploaded resume file name
  // Examples: './resume.pdf', './Rudra_Resume_2024.pdf', './CV_Rudra.pdf'
  const resumeUrl = './123Bm0745_resume__.pdf'; // Change this to match your actual file name
  
  try {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Rudra_Pratap_Chauhan_Resume.pdf';
    link.target = '_blank'; // Open in new tab as fallback
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Resume download started!', 'success');
  } catch (error) {
    console.error('Resume download failed:', error);
    showNotification('Resume download failed. Please try again or contact me directly.', 'error');
    // Fallback: try to open in new tab
    window.open(resumeUrl, '_blank');
  }
}

// Skill Progress Animation
function animateSkillBars() {
  const progressLines = document.querySelectorAll('.progress-line');
  progressLines.forEach(line => {
      line.classList.add('animate');
  });
}

// Initialize animations when skills section is visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateSkillBars();
              skillsObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.3 });
  
  skillsObserver.observe(skillsSection);
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
}

// Parallax Effect for Home Section and Back to Top Button Visibility
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
      requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          
          // Parallax effect (reduced for performance)
          const parallax = document.querySelector('.home');
          if (parallax && scrolled < window.innerHeight) {
              const speed = scrolled * 0.3;
              parallax.style.transform = `translateY(${speed}px)`;
          }
          
          // Back to top button visibility
          if (backToTopBtn) {
              if (scrolled > 300) {
                  backToTopBtn.classList.add('show');
              } else {
                  backToTopBtn.classList.remove('show');
              }
          }
          
          ticking = false;
      });
      ticking = true;
  }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio initialized successfully!');
  
  // Ensure all sections are visible immediately
  const allSections = document.querySelectorAll('section, .about, .project-panel, .container1');
  allSections.forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'none';
      section.style.transition = 'all 0.3s ease';
  });
  
  // Add loading class to body initially
  document.body.classList.add('loading');
  
  // Remove loading class after everything is loaded
  window.addEventListener('load', () => {
      setTimeout(() => {
          document.body.classList.remove('loading');
      }, 500);
  });
});
