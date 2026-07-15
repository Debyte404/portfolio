"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PortfolioMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    const refreshScrollTriggers = () => {
      ScrollTrigger.refresh(true);
    };

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-reveal], [data-float]", {
        clearProps: "transform,opacity",
        opacity: 1,
      });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-reveal]").forEach((element, index) => {
        gsap.from(element, {
          y: 42,
          opacity: 0,
          rotate: index % 2 ? 0.7 : -0.7,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray("[data-float]").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 ? 10 : -12,
          rotate: index % 2 ? 1.2 : -1.2,
          duration: 2.4 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".hero-title .word", {
        yPercent: -4,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.12,
      });

      window.addEventListener("portfolio:layout-change", refreshScrollTriggers);

      return () => {
        window.removeEventListener("portfolio:layout-change", refreshScrollTriggers);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    return () => mm.revert();
  });

  return null;
}
