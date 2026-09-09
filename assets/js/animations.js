// animations.js

document.addEventListener('DOMContentLoaded', () => {
  // Only run if GSAP is loaded
  if (typeof gsap !== 'undefined') {
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const heroTl = gsap.timeline();
    
    if(document.querySelector('.hero-eyebrow')) {
      heroTl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
            .from('.hero-title', { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
            .from('.hero-desc', { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
            .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");
    }

    // Counter Animations
    const counters = gsap.utils.toArray('.counter-val');
    if(counters.length > 0) {
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isPercentage = counter.textContent.includes('%');
        
        gsap.to(counter, {
          scrollTrigger: {
            trigger: counter,
            start: "top 90%"
          },
          innerHTML: target,
          duration: 2,
          ease: "power1.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            if(isPercentage) {
               counter.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
            } else if (counter.getAttribute('data-target').includes('+')) {
               counter.innerHTML = Math.round(this.targets()[0].innerHTML) + '+';
            } else {
               counter.innerHTML = Math.round(this.targets()[0].innerHTML);
            }
          }
        });
      });
    }
    
    // Progress Bar Animations
    const progressBars = gsap.utils.toArray('.progress-bar');
    if(progressBars.length > 0) {
      progressBars.forEach(bar => {
        gsap.from(bar, {
          scrollTrigger: {
            trigger: bar,
            start: "top 95%"
          },
          width: "0%",
          duration: 1.5,
          ease: "power2.out"
        });
      });
    }
    
    // Parallax Effect
    if(document.querySelector('.parallax-bg')) {
      gsap.to('.parallax-bg', {
        scrollTrigger: {
          trigger: '.featured-section',
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        ease: "none"
      });
    }
  }
});
