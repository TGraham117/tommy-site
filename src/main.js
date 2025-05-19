
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  x: 300,
  duration: 2
});
