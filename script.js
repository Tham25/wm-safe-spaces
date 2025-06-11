document.addEventListener('DOMContentLoaded', function () {
  // Navigation menu toggle for mobile
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', function () {
    // Toggle navigation
    nav.classList.toggle('nav-active');

    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });

    // Burger animation
    burger.classList.toggle('toggle');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for navbar height
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (nav.classList.contains('nav-active')) {
          nav.classList.remove('nav-active');
          burger.classList.remove('toggle');
          navLinks.forEach(link => {
            link.style.animation = '';
          });
        }
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.padding = '10px 0';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
      navbar.style.padding = '15px 0';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    }
  });

  // Registration counter animation
  const counter = document.getElementById('registration-counter');
  let count = 0;
  const target = 32; // Set your target number here
  const speed = 50;

  const updateCounter = () => {
    if (count < target) {
      count++;
      counter.innerText = count;
      setTimeout(updateCounter, speed);
    }
  };

  // Start counter animation when element is in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(counter);

  // Registration form handling
  const registrationForm = document.getElementById('register-form');
  const registrationSuccess = document.getElementById('registration-success');

  if (registrationForm) {
    registrationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        facebook: document.getElementById('facebook').value,
        notes: document.getElementById('notes').value
      };

      // Get submit button and show loading spinner
      const submitBtn = document.getElementById('submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const loadingSpinner = submitBtn.querySelector('.loading-spinner');
      
      // Disable button and show spinner
      submitBtn.disabled = true;
      btnText.textContent = 'Đang xử lý...';
      loadingSpinner.classList.remove('hidden');

      // Increment counter for visual effect
      setTimeout(() => {
        counter.innerText = parseInt(counter.innerText) + 1;
      }, 1000);

      // Send data to Google Sheets
      const scriptURL = 'https://script.google.com/macros/s/AKfycbz7KpHOJV1GkNPhOPH9XGD7sbubefy5gbLbKYPcPrJHxmE8OxhbN1FQwl76r6tv-wkj/exec';

      fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Success:', response);
          // Show success message
          registrationForm.reset();
          
          // Reset button state
          submitBtn.disabled = false;
          btnText.textContent = 'Đăng ký';
          loadingSpinner.classList.add('hidden');

          window.alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.');
        })
        .catch(error => {
          console.error('Error:', error);
          
          // Reset button state even on error
          submitBtn.disabled = false;
          btnText.textContent = 'Đăng ký';
          loadingSpinner.classList.add('hidden');
          
          window.alert('Có lỗi xảy ra. Vui lòng thử lại sau!');
        });
    });
  }
  // Add animation when elements come into view
  const animateOnScroll = function () {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial styles for sections
  document.querySelectorAll('section').forEach(section => {
    if (section.id !== 'hero') { // Don't animate hero section
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'all 0.8s ease';
    }
  });

  // Run animation on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Run once on page load
  animateOnScroll();
});
