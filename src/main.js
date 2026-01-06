document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  const speed = 50;
  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/,/g, '');
        const inc = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc).toLocaleString();
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };
      updateCount();
    });
  };
  animateCounters();

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const observeElements = () => {
    document.querySelectorAll('.fade-up:not(.in-view)').forEach(el => observer.observe(el));
  };

  observeElements();

  // Watch for dynamic elements
  const mutationObserver = new MutationObserver(() => {
    observeElements();
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  const toggleMenu = (show) => {
    if (show) {
      mobileMenu.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('translate-x-full');
      document.body.style.overflow = '';
    }
  };

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(true);
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(false);
    });
  }

  // Close menu on link click
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close menu when clicking outside the menu content
  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
      if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
        toggleMenu(false);
      }
    }
  });
});
