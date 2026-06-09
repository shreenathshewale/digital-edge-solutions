/**
 * Digital Edge Solutions - Landing Page Script
 * 
 * Contains interactivity for:
 * 1. EmailJS Configuration Placeholders
 * 2. Sticky Navbar & Active Section Link Highlighting
 * 3. Mobile Hamburger Menu Toggle
 * 4. FAQ Accordion (Smooth slide transitions)
 * 5. Intersection Observer Scroll Reveal Animations
 * 6. Back-to-Top Button
 * 7. Contact Form EmailJS submission & Validation
 */

// EmailJS Configuration - Replace these placeholders with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = "UnLbZ079x90jBaqyE";
const EMAILJS_SERVICE_ID = "service_u79o2rj";
const EMAILJS_TEMPLATE_ID = "template_c1v6u9o";

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     0. INITIALIZE EMAILJS
     ========================================================================== */
  if (typeof emailjs !== 'undefined') {
    console.log("Initializing EmailJS with Public Key:", EMAILJS_PUBLIC_KEY);
    emailjs.init({
      publicKey: "UnLbZ079x90jBaqyE"
    });
    console.log("EmailJS initialized successfully");
    console.log("Public Key:", "UnLbZ079x90jBaqyE");
    console.log("Service ID:", "service_u79o2rj");
    console.log("Template ID:", "template_c1v6u9o");
  } else {
    console.error("EmailJS SDK is not loaded. Form submissions will not be sent to EmailJS. Please verify CDN import in index.html.");
  }


  /* ==========================================================================
     1. STICKY NAVBAR & ACTIVE LINK HIGHLIGHTING
     ========================================================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleScrollEffects() {
    const scrollY = window.scrollY;

    // Sticky Header Scroll State
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Link Highlighting
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120; // offset header height
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScrollEffects);
  handleScrollEffects(); // run initially on load


  /* ==========================================================================
     2. MOBILE HAMBURGER MENU TOGGLE
     ========================================================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const mobileNavLinks = document.querySelectorAll('.nav-menu .nav-link, .nav-menu .nav-cta, .nav-menu .nav-phone-link');

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scrolling when menu is active
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  /* ==========================================================================
     3. FAQ ACCORDION (SMOOTH SLIDE TRANSITIONS)
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parentItem = this.parentElement;
      const content = this.nextElementSibling;
      const isActive = parentItem.classList.contains('active');

      // Collapse all accordion items first
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Toggle current item
      if (!isActive) {
        parentItem.classList.add('active');
        // Smoothly set height to scrollHeight
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });


  /* ==========================================================================
     4. INTERSECTION OBSERVER SCROLL REVEAL ANIMATIONS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ==========================================================================
     5. BACK-TO-TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  function handleBackToTopVisibility() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  /* ==========================================================================
     6. CONTACT FORM EMAILJS SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successModal = document.getElementById('success-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');

  // Track page/form interaction initialization time for anti-spam (minimum 2s completion)
  const formLoadTime = Date.now();

  function showModal() {
    successModal.classList.add('active');
    successModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Helper validation methods
  function showError(inputEl, message) {
    const group = inputEl.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      const errorSpan = group.querySelector('.error-message');
      if (errorSpan) {
        errorSpan.textContent = message;
      }
    }
  }

  function clearError(inputEl) {
    const group = inputEl.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
      const errorSpan = group.querySelector('.error-message');
      if (errorSpan) {
        errorSpan.textContent = '';
      }
    }
  }

  function validateIndianMobile(mobileVal) {
    // Strip all non-digit characters
    let cleaned = mobileVal.replace(/\D/g, '');

    // Strip leading 0 if it is 11 digits
    if (cleaned.startsWith('0') && cleaned.length === 11) {
      cleaned = cleaned.substring(1);
    }

    // Strip 91 country code prefix if it has 12 digits
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      cleaned = cleaned.substring(2);
    }

    // Match exactly 10 digits starting with 6, 7, 8, or 9
    const mobileRegex = /^[6-9]\d{9}$/;
    return {
      isValid: mobileRegex.test(cleaned),
      cleanedNumber: cleaned
    };
  }

  // Clear errors dynamically on input / change
  const formInputs = contactForm.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', () => clearError(input));
    input.addEventListener('change', () => clearError(input));
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Form submit event triggered");

    // Anti-spam protections
    const honeypotVal = document.getElementById('website-honeypot').value;
    const submissionDelay = Date.now() - formLoadTime;
    console.log("Anti-spam verification: honeypot =", honeypotVal, "submissionDelay =", submissionDelay);

    if (honeypotVal || submissionDelay < 2000) {
      console.warn("Spam submission blocked silently.");
      // Silently reject: show success to user/bot, reset form and return without EmailJS
      showModal();
      contactForm.reset();
      return;
    }

    // Form fields validation check
    const nameInput = document.getElementById('name');
    const businessNameInput = document.getElementById('business-name');
    const mobileInput = document.getElementById('mobile');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const businessName = businessNameInput.value.trim();
    const mobile = mobileInput.value.trim();
    const service = serviceInput.value;
    const message = messageInput.value.trim();

    let formValid = true;
    let firstInvalidEl = null;

    // Reset error states
    formInputs.forEach(input => clearError(input));

    // Custom validations
    if (!name) {
      showError(nameInput, "Name required");
      if (!firstInvalidEl) firstInvalidEl = nameInput;
      formValid = false;
    }

    if (!businessName) {
      showError(businessNameInput, "Business name required");
      if (!firstInvalidEl) firstInvalidEl = businessNameInput;
      formValid = false;
    }

    if (!mobile) {
      showError(mobileInput, "Mobile number required");
      if (!firstInvalidEl) firstInvalidEl = mobileInput;
      formValid = false;
    } else {
      const mobileCheck = validateIndianMobile(mobile);
      if (!mobileCheck.isValid) {
        showError(mobileInput, "Please enter a valid mobile number");
        if (!firstInvalidEl) firstInvalidEl = mobileInput;
        formValid = false;
      }
    }

    if (!service) {
      showError(serviceInput, "Service required");
      if (!firstInvalidEl) firstInvalidEl = serviceInput;
      formValid = false;
    }

    if (!message) {
      showError(messageInput, "Message required");
      if (!firstInvalidEl) firstInvalidEl = messageInput;
      formValid = false;
    }

    // If validations fail, focus the first incorrect field and abort
    if (!formValid) {
      console.warn("Validation failed. Aborting submission.");
      if (firstInvalidEl) {
        firstInvalidEl.focus();
      }
      return;
    }

    // Set button loading state & prevent duplicate submissions
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Sending Inquiry...</span>
      <i class="fa-solid fa-circle-notch fa-spin submit-icon"></i>
    `;

    // Retrieve service display text for WhatsApp
    const selectedServiceText = serviceInput.options[serviceInput.selectedIndex].text;

    // Prepare template parameters for EmailJS
    const templateParams = {
      name: name,
      business_name: businessName,
      mobile: mobile,
      service: service,
      message: message,
      date_time: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
      }),
      subject: `New Website Inquiry - ${businessName}`
    };

    // Construct WhatsApp Backup link message
    const waText = `Hello Digital Edge Solutions,\n\nHere are my website inquiry details:\n\n` +
                   `*Name:* ${name}\n` +
                   `*Business:* ${businessName}\n` +
                   `*Mobile:* ${mobile}\n` +
                   `*Service:* ${selectedServiceText}\n` +
                   `*Message:* ${message}`;
    const waUrl = `https://wa.me/918999657949?text=${encodeURIComponent(waText)}`;
    modalWhatsappBtn.href = waUrl;

    console.log("Sending EmailJS request...");
    console.log(templateParams);

    // Send email using EmailJS
    emailjs.send(
      "service_u79o2rj",
      "template_c1v6u9o",
      templateParams
    )
      .then(function(response) {
         console.log("Email sent successfully");
         
         // Restore button state
         submitBtn.disabled = false;
         submitBtn.innerHTML = originalBtnHTML;
         
         // Show success popup
         showModal();
         
         // Reset the form
         contactForm.reset();
      }, function(error) {
         console.error("EmailJS Error:", error);
         alert(`EmailJS Error: ${error.text || error.message}`);
         
         // Restore button state
         submitBtn.disabled = false;
         submitBtn.innerHTML = originalBtnHTML;
      });
  });

  // Log that form loaded successfully and controls are active
  console.log("Form loaded");
  console.log("Inputs enabled");
  console.log("Submit button enabled");
});
