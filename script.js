// City Metro Transit Police — shared behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------------- Report form ----------------
  var form = document.getElementById('report-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = {
        category: form.category.value,
        location: form.location.value,
        occurred: form.occurred.value,
        description: form.description.value,
        name: form.reporter_name.value || 'Not provided',
        phone: form.reporter_phone.value || 'Not provided',
        email: form.reporter_email.value || 'Not provided',
        anonymous: form.anonymous.checked ? 'Yes' : 'No'
      };

      var subject = 'Safety Concern Report — ' + (data.category || 'General') + ' — ' + (data.location || 'Unspecified location');

      var bodyLines = [
        'SAFETY CONCERN REPORT',
        'Submitted via citymetro transit police website',
        '',
        'Category: ' + data.category,
        'Location: ' + data.location,
        'Date / time of incident: ' + (data.occurred || 'Not provided'),
        '',
        'Description:',
        data.description,
        '',
        '-----------------------------',
        'Reporter name: ' + data.name,
        'Reporter phone: ' + data.phone,
        'Reporter email: ' + data.email,
        'Submitted anonymously: ' + data.anonymous
      ];

      var body = bodyLines.join('\n');

      var mailto = 'mailto:police@citymetro.xyz'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      var summaryEl = document.getElementById('modal-summary');
      if (summaryEl) summaryEl.textContent = body;

      var sendBtn = document.getElementById('modal-send-btn');
      if (sendBtn) sendBtn.setAttribute('href', mailto);

      openModal();
    });
  }

  function openModal() {
    var overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.add('open');
  }
  function closeModal() {
    var overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('open');
  }

  var closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  var overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
});
