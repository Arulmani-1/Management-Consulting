// forms.js

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.needs-validation');

  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        // Simulate form submission success
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
          btn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
          btn.classList.remove('btn-primary-stackly');
          btn.classList.add('btn-success');
          form.reset();
          form.classList.remove('was-validated');
          
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.add('btn-primary-stackly');
            btn.classList.remove('btn-success');
            btn.disabled = false;
          }, 3000);
        }, 1500);
      }
      form.classList.add('was-validated');
    }, false);
  });
});
