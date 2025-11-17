// Shared site JavaScript: renders header/footer and manages the consultation popup
(function () {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function renderHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    const isAbout = document.body.classList.contains('about-page');
    header.innerHTML = [
      '<div class="header-overlay"></div>',
      '<div class="container">',
      '  <div class="logo-section">',
      '    <div class="logo">',
      '      <img src="/img/MCS_NEW_logo.png" alt="Mortgage Capital Services LLC Logo">',
      '    </div>',
      '    <div class="company-name">',
      '      <h1>MORTGAGE CAPITAL SERVICES LLC</h1>',
      '    </div>',
      '  </div>',
      '  <nav class="nav">',
      '    <a href="index.html">Home</a>',
      `    <a href="about.html"${isAbout ? ' aria-current="page"' : ''}>About</a>`,
      '    <a href="index.html#services">Services</a>',
      '    <a href="#" data-open-popup aria-haspopup="dialog" aria-controls="formPopup">Contact</a>',
      '  </nav>',
      '</div>'
    ].join('');
  }

  function renderFooter() {
    const footer = document.querySelector('.contact-section');
    if (!footer) return;
    const isAbout = document.body.classList.contains('about-page');

    // Build profile/contact block
    const profileBlock = isAbout
      ? [
          '<div class="profile-section">',
          '  <div class="contact-details">',
          '    <h3>Contact</h3>',
          '    <p><strong>Billy Peel</strong></p>',
          '    <p>Managing Partner</p>',
          '    <p>NMLS # 332044</p>',
          '  </div>',
          '</div>'
        ].join('')
      : [
          '<div class="profile-section">',
          '  <div class="profile-image">',
          '    <img src="/img/BPeel.jpg" alt="Billy Peel, Managing Partner">',
          '  </div>',
          '  <div class="contact-details">',
          '    <h3>Contact</h3>',
          '    <p><strong>Billy Peel</strong></p>',
          '    <p>Managing Partner</p>',
          '    <p>NMLS # 332044</p>',
          '  </div>',
          '</div>'
        ].join('');

    footer.innerHTML = [
      '<div class="container">',
      '  <div class="contact-info">',
           profileBlock,
      '    <div class="contact-methods">',
      '      <p class="phone"><a href="tel:+17062502757">(706) 250-2757</a></p>',
      '      <p class="email"><a href="mailto:BPeel@MCSFunding.Net">BPeel@MCSFunding.Net</a></p>',
      '      <p class="license">Residential Mortgage Broker</p>',
      '      <p class="license-number">NMLS # 2694379</p>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderPopup() {
    const overlay = document.getElementById('formPopup');
    if (!overlay) return;
    overlay.innerHTML = [
      '<div class="popup-container">',
      '  <button class="close-popup" type="button" aria-label="Close" data-close-popup>&times;</button>',
      '  <h2>Request a Consultation</h2>',
      '  <p class="popup-subtitle">Fill out the form and we\'ll contact you within 24 hours</p>',
      '  <form action="https://formspree.io/f/xgvrewqo" method="POST" class="popup-form">',
      '    <div class="form-group">',
      '      <input type="text" name="name" placeholder="Your Name *" required>',
      '    </div>',
      '    <div class="form-group">',
      '      <input type="email" name="email" placeholder="Your Email *" required>',
      '    </div>',
      '    <div class="form-group">',
      '      <input type="tel" name="phone" placeholder="Phone Number *" required>',
      '    </div>',
      '    <div class="form-group">',
      '      <select name="service" required>',
      '        <option value="">Select Service *</option>',
      '        <option value="purchases">Purchases</option>',
      '        <option value="working-capital">Working Capital</option>',
      '        <option value="construction">Construction Loans</option>',
      '        <option value="private-equity">Private Equity</option>',
      '      </select>',
      '    </div>',
      '    <div class="form-group">',
      '      <textarea name="message" rows="4" placeholder="Tell us about your project... *" required></textarea>',
      '    </div>',
      '    <button type="submit" class="submit-button">Submit Request</button>',
      '  </form>',
      '</div>'
    ].join('');
  }

  function setupPopupHandlers() {
    const overlay = document.getElementById('formPopup');
    if (!overlay) return;

    function openFormPopup(e) {
      if (e) e.preventDefault();
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeFormPopup() {
      overlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // Expose for any inline hooks still present
    window.openFormPopup = openFormPopup;
    window.closeFormPopup = closeFormPopup;

    // Open triggers
    document.querySelectorAll('[data-open-popup]').forEach((el) => {
      el.addEventListener('click', openFormPopup);
    });

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeFormPopup();
    });

    // Close button
    overlay.addEventListener('click', function (e) {
      if (e.target && e.target.matches('[data-close-popup]')) {
        closeFormPopup();
      }
    });

    // Escape to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeFormPopup();
    });
  }

  ready(function () {
    renderHeader();
    renderFooter();
    renderPopup();
    setupPopupHandlers();
  });
})();
