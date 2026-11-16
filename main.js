// Small shared interactions for the Roam & Root demo website.
const headerSlot = document.querySelector('[data-shell="header"]');
const footerSlot = document.querySelector('[data-shell="footer"]');

if (headerSlot) {
  headerSlot.innerHTML = `<a class="brand" href="index.html" aria-label="Roam and Root home"><span class="brand-mark">r.</span><span>roam <i>&</i> root<small>TRAVEL CO.</small></span></a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="main-nav"><a href="index.html">Home</a><a href="destinations.html">Destinations</a><a href="packages.html">Packages</a><a href="blog.html">Travel journal</a><a href="contact.html">Contact</a><a class="nav-cta" href="booking.html">Plan a trip <span>↗</span></a></nav>`;
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  headerSlot.querySelectorAll('.main-nav a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
}

if (footerSlot) {
  footerSlot.innerHTML = `<div class="footer-top"><div class="footer-about"><a class="brand brand-footer" href="index.html"><span class="brand-mark">r.</span><span>roam <i>&</i> root<small>TRAVEL CO.</small></span></a><p>Small-group trips for people who like to look a little closer.</p></div><div><span class="footer-label">COME ALONG</span><a href="destinations.html">Destinations</a><a href="packages.html">Our trips</a><a href="blog.html">Travel journal</a></div><div><span class="footer-label">THE PRACTICALS</span><a href="about.html">Our story</a><a href="contact.html">Get in touch</a><a href="booking.html">Plan a trip</a></div><div class="footer-note"><span class="eyebrow">GOOD THINGS AHEAD</span><p>Your next favourite story is out there.</p><a class="text-link light-link" href="packages.html">Let’s find it <span>→</span></a></div></div><div class="footer-bottom"><span>© 2026 Roam & Root Travel Co.</span><span>Made for the curious. <a href="contact.html">Say hello ↗</a></span><span><a href="privacy.html">Privacy</a> &nbsp;·&nbsp; <a href="terms.html">Terms</a></span></div>`;
}

const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuButton.textContent = isOpen ? '×' : '☰';
});

// The home page has three large photos; these controls swap the visible slide.
const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.slider-dots button')];
let activeSlide = 0;
function showSlide(index) {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === activeSlide));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === activeSlide));
}
document.querySelector('.slider-prev')?.addEventListener('click', () => showSlide(activeSlide - 1));
document.querySelector('.slider-next')?.addEventListener('click', () => showSlide(activeSlide + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
if (slides.length > 1) window.setInterval(() => showSlide(activeSlide + 1), 6500);

// A tiny testimonial carousel, kept short so it's easy to understand and edit.
const stories = [
  { quote: 'I came home with a camera roll full of sunsets, sure. But mostly, I came home with friends.', name: 'Jamie M.', trip: 'Travelled with us in Portugal, May 2025', initials: 'JM' },
  { quote: 'For once, I didn’t have to plan every minute. Somehow those were the moments I remember best.', name: 'Priya R.', trip: 'Travelled with us in Italy, June 2025', initials: 'PR' },
  { quote: 'Our guide made the place feel less like a destination and more like somewhere we belonged for a week.', name: 'Daniel K.', trip: 'Travelled with us in Japan, October 2025', initials: 'DK' }
];
let storyIndex = 0;
function showStory(index) {
  const story = stories[index];
  const quote = document.querySelector('.quote-content blockquote');
  const byline = document.querySelector('.quote-byline');
  const count = document.querySelector('.quote-count');
  if (!quote || !byline || !count) return;
  quote.textContent = `“${story.quote}”`;
  byline.innerHTML = `<span class="avatar">${story.initials}</span><span><strong>${story.name}</strong><small>${story.trip}</small></span>`;
  count.textContent = `0${index + 1} / 0${stories.length}`;
}
document.querySelector('.quote-prev')?.addEventListener('click', () => { storyIndex = (storyIndex + stories.length - 1) % stories.length; showStory(storyIndex); });
document.querySelector('.quote-next')?.addEventListener('click', () => { storyIndex = (storyIndex + 1) % stories.length; showStory(storyIndex); });

// Keep the example trip estimate responsive to both number fields.
const peopleInput = document.querySelector('#people');
const nightsInput = document.querySelector('#nights');
const estimate = document.querySelector('#calc-result');
function updateEstimate() {
  if (!peopleInput || !nightsInput || !estimate) return;
  const people = Math.max(1, Number(peopleInput.value) || 1);
  const nights = Math.max(1, Number(nightsInput.value) || 1);
  // The example package price is $2,190 for 7 nights, per traveller.
  const total = Math.round((2190 / 7) * nights * people);
  estimate.textContent = total.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
peopleInput?.addEventListener('input', updateEstimate);
nightsInput?.addEventListener('input', updateEstimate);

// These forms demonstrate validation and a friendly confirmation. Connect a
// form service or your own backend if you want to receive submissions.
function showFormMessage(form, message, type) {
  const output = form.querySelector('.form-message');
  if (output) {
    output.textContent = message;
    output.className = `form-message ${type}`;
  }
}
['booking-form', 'contact-form'].forEach((formId) => {
  const form = document.getElementById(formId);
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      showFormMessage(form, 'A couple of details are missing above. Have a quick look and try again.', 'error');
      return;
    }
    showFormMessage(form, 'Thanks for your note! This demo form is ready to connect to an email service when you are.', 'success');
    form.reset();
  });
});

document.querySelector('.newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const note = document.createElement('small');
  note.textContent = 'Thanks for joining us — this demo signup is not connected to a mailing list yet.';
  note.className = 'form-message success';
  form.append(note);
  form.reset();
});

// Read the destination query from the home-page search and preselect it here.
const placeSelect = document.querySelector('select[name="place"]');
const requestedPlace = new URLSearchParams(location.search).get('place');
if (placeSelect && requestedPlace) {
  const option = [...placeSelect.options].find((item) => item.value.toLowerCase() === requestedPlace.toLowerCase() || item.textContent.toLowerCase() === requestedPlace.toLowerCase());
  if (option) placeSelect.value = option.value;
}
