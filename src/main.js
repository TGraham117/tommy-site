import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";



/* Whole site snapping (fake) scroll animation */
gsap.registerPlugin(ScrollTrigger);

let allowScroll = true; // sometimes we want to ignore scroll-related stuff, like when an Observer-based section is transitioning.
let scrollTimeout = gsap.delayedCall(1, () => allowScroll = true).pause(); // controls how long we should wait after an Observer-based animation is initiated before we allow another scroll-related action
let currentIndex = 0;
let swipePanels = gsap.utils.toArray(".swipe-section .panel");

// set z-index levels for the swipe panels
gsap.set(swipePanels, { zIndex: i => swipePanels.length - i})

// create an observer and disable it to start
let intentObserver = ScrollTrigger.observe({
  type: "wheel,touch",
  onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
  onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
  tolerance: 10,
  preventDefault: true,
  onEnable(self) {
    allowScroll = false;
    scrollTimeout.restart(true);
    // when enabling, we should save the scroll position and freeze it. This fixes momentum-scroll on Macs, for example.
    let savedScroll = self.scrollY();
    self._restoreScroll = () => self.scrollY(savedScroll); // if the native scroll repositions, force it back to where it should be
    document.addEventListener("scroll", self._restoreScroll, {passive: false});
  },
  onDisable: self => document.removeEventListener("scroll", self._restoreScroll)
});
intentObserver.disable();

// handle the panel swipe animations
function gotoPanel(index, isScrollingDown) {
  // return to normal scroll if we're at the end or back up to the start
  if ((index === swipePanels.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
    intentObserver.disable(); // resume native scroll
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

// pin swipe section and initiate observer
ScrollTrigger.create({
  trigger: ".swipe-section",
  pin: true,
  start: "top top",
  end: "+=200", // just needs to be enough to not risk vibration where a user's fast-scroll shoots way past the end
  onEnter: (self) => {
    if (intentObserver.isEnabled) { return } // in case the native scroll jumped past the end and then we force it back to where it should be.
    self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
    intentObserver.enable(); // STOP native scrolling
  },
  onEnterBack: (self) => {
    if (intentObserver.isEnabled) { return } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
    self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
    intentObserver.enable(); // STOP native scrolling
  }
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

