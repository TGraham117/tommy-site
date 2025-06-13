import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";


/* Allow menu scroll */
// let anchorScrollInProgress = false;


// window.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll(".inner-header a[href^='#']").forEach(link => {
//     link.addEventListener("click", (e) => {
//       const targetId = link.getAttribute("href");
//       const targetEl = document.querySelector(targetId);
//       if (!targetEl) return;
  
//       e.preventDefault();
//       anchorScrollInProgress = true;
  
//       // Temporarily disable observer
//       if (typeof intentObserver !== "undefined") {
//         intentObserver.disable();
//       }
  
//       // Scroll smoothly
//       const y = targetEl.getBoundingClientRect().top + window.scrollY;
//       window.scrollTo({ top: y, behavior: "smooth" });
  
//       // Re-enable snapping logic
//       setTimeout(() => {
//         anchorScrollInProgress = false;
//         intentObserver?.enable();
//       }, 1200);
//     });
//   });  
// });


/* Whole site snapping (fake) scroll animation */
if (window.innerWidth >= 1024) {
  gsap.registerPlugin(ScrollTrigger);

  let allowScroll = true;
  let scrollTimeout = gsap.delayedCall(1, () => allowScroll = true).pause();
  let currentIndex = 0;
  let swipePanels = gsap.utils.toArray(".swipe-section .panel");

  gsap.set(swipePanels, { zIndex: i => swipePanels.length - i });

  let intentObserver = ScrollTrigger.observe({
    type: "wheel,touch",
    onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
    onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
    tolerance: 10,
    preventDefault: true,
    onEnable(self) {
      // if (anchorScrollInProgress) return; // ⛔ Don't restore scroll if it's from menu click

      allowScroll = false;
      scrollTimeout.restart(true);
      let savedScroll = self.scrollY();
      self._restoreScroll = () => self.scrollY(savedScroll);
      document.addEventListener("scroll", self._restoreScroll, { passive: false });
    },
    onDisable: self => document.removeEventListener("scroll", self._restoreScroll)
  });
  intentObserver.disable();

  function gotoPanel(index, isScrollingDown) {
    if ((index === swipePanels.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
      intentObserver.disable();
      return;
    }
    allowScroll = false;
    scrollTimeout.restart(true);

    let target = isScrollingDown ? swipePanels[currentIndex] : swipePanels[index];
    gsap.to(target, {
      yPercent: isScrollingDown ? -100 : 0,
      duration: 0.75
    });

    currentIndex = index;
  }

  ScrollTrigger.create({
    id: "swipe-pin",
    trigger: ".swipe-section",
    pin: true,
    start: "top top",
    end: "+=200",
    onEnter: (self) => {
      if (intentObserver.isEnabled) return;
      self.scroll(self.start + 1);
      intentObserver.enable();
    },
    onEnterBack: (self) => {
      if (intentObserver.isEnabled) return;
      self.scroll(self.end - 1);
      intentObserver.enable();
    }
  });
}

// 2. Optional: Reload the page if screen crosses the 1024px threshold
let lastWidth = window.innerWidth;

window.addEventListener("resize", () => {
  let currentWidth = window.innerWidth;
  if (
    (lastWidth < 1024 && currentWidth >= 1024) ||
    (lastWidth >= 1024 && currentWidth < 1024)
  ) {
    location.reload(); // reload to apply/remove scroll snapping
  }
  lastWidth = currentWidth;
});







/* Function to open the text box with the light */
 const light = document.querySelector(".light-contain");
 const additionalText = document.querySelector(".additional-text");
 light.addEventListener("click", () => {
   additionalText.classList.toggle("hidden");
   additionalText.classList.toggle("opacity-0");
 });


/* Animate Text */
gsap.registerPlugin(SplitText);

let split, animation;
document.querySelector("#devtext").addEventListener("hover", () => {
  animation && animation.revert();
  animation = gsap.from(split.devtext, {
    x: 150,
    opacity: 0,
    duration: 0.7, 
    ease: "power4",
    stagger: 0.04
  })
});

function setup() {
  split && split.revert();
  animation && animation.revert();
  split = SplitText.create(".dev-content", {type:"devtext"});
}
setup();
window.addEventListener("resize", setup);

