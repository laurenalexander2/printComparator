// Print Comparator — main.js
// Configure links, run the wordmark “alignment lock-in” animation, and reveal sections on scroll.

(() => {
  // 1) Configure your links here
  const LINKS = {
    try: "https://example.com",
    github: "https://github.com/example",
    docs: "#"
  };

  const setHref = (id, href) => {
    const el = document.getElementById(id);
    if (el && href) el.setAttribute("href", href);
  };

  // Apply links across the page
  ["heroTry","introTry","techTry","footerTry"].forEach(id => setHref(id, LINKS.try));
  ["heroGitHub","introGitHub","techGitHub"].forEach(id => setHref(id, LINKS.github));
  ["heroDocs","introDocs"].forEach(id => setHref(id, LINKS.docs));

  // 2) Wordmark lock-in animation
  const wordmark = document.querySelector(".wordmark");
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (wordmark && !prefersReduced) {
    requestAnimationFrame(() => wordmark.classList.add("is-animating"));
  }

  // 3) Scroll reveal (float up)
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  // 4) Back to top
  const back = document.getElementById("backToTop");
  if (back) {
    back.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }
})(); 
