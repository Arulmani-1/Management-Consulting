// main.js

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar
  const navbar = document.querySelector('.navbar-stackly');
  
  if(navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // Set active nav item based on current URL
  let pathName = window.location.pathname.split('/').pop();
  if (pathName === '') pathName = 'index.html';
  
  document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    const href = link.getAttribute('href');
    if(href && href !== '#' && href === pathName) {
      link.classList.add('active');
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
          const toggle = parentDropdown.querySelector('.dropdown-toggle');
          if (toggle) toggle.classList.add('active');
      }
    }
  });
  
  // Initialize AOS
  if(typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50
    });
  }
  // Load Navbar Component
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
        navbarPlaceholder.outerHTML = data;
        
        // Re-initialize navbar scroll listener since navbar is freshly added
        const newNavbar = document.querySelector('.navbar-stackly');
        if(newNavbar) {
          window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
              newNavbar.classList.add('scrolled');
            } else {
              newNavbar.classList.remove('scrolled');
            }
          });
          
          // Trigger scroll check immediately
          if (window.scrollY > 50) newNavbar.classList.add('scrolled');
        }
        
        // Re-initialize active nav items
        let pathName = window.location.pathname.split('/').pop();
        if (pathName === '') pathName = 'index.html';

        document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
          const href = link.getAttribute('href');
          if(href && href !== '#' && href === pathName) {
            link.classList.add('active');
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const toggle = parentDropdown.querySelector('.dropdown-toggle');
                if (toggle) toggle.classList.add('active');
            }
          }
        });
        
        // Explicitly initialize the mobile offcanvas menu
        const toggler = document.querySelector('.navbar-toggler');
        const offcanvasEl = document.getElementById('offcanvasNavbar');
        if (toggler && offcanvasEl && typeof bootstrap !== 'undefined') {
          // Remove data-bs-toggle so it doesn't conflict if Bootstrap already handles it
          toggler.removeAttribute('data-bs-toggle');
          const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);
          toggler.addEventListener('click', function(e) {
            e.preventDefault();
            bsOffcanvas.toggle();
          });
        }
      })
      .catch(error => console.error('Error loading navbar:', error));
  }

  // Load Footer Component
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('footer.html')
      .then(response => response.text())
      .then(data => {
        footerPlaceholder.outerHTML = data;
      })
      .catch(error => console.error('Error loading footer:', error));
  }
});
