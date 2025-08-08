import { useEffect, useRef } from 'react'; // Import useRef
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const scrollWrapperRef = useRef(null); // Create a ref for the horizontal scroll wrapper
  const panelRefs = useRef([]); // Create refs for each panel

  useEffect(() => {
    // Use useLayoutEffect instead of useEffect for GSAP in React
    // to ensure the DOM is painted in its final state before animations begin.
    // Also, wrap GSAP code in a gsap.context() for better cleanup and isolation.
    let ctx;
    if (typeof window !== 'undefined' && scrollWrapperRef.current) {
      ctx = gsap.context(() => {
        const panels = panelRefs.current;
        const totalPanels = panels.length;

        // Horizontal scroll animation tied to ScrollTrigger, pins the scroll container
        const horizontalScroll = gsap.to(scrollWrapperRef.current, {
          xPercent: -100 * (totalPanels - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: scrollWrapperRef.current, // Use the ref for the trigger
            pin: true,
            scrub: 1,
            start: 'top top',
            // End value calculation needs to be precise.
            // It should be the total scroll distance required to move all panels across.
            // This is roughly `total panels * viewport width` - `viewport width`
            // to allow the last panel to settle.
            end: () => `+=${window.innerWidth * totalPanels}`, // Adjusted for more robust calculation.
            // markers: true, // Uncomment for debugging scrolltrigger points
          },
        });

        // Animate image and text in each panel on horizontal scroll progress
        panels.forEach((panel) => {
          if (!panel) return; // Ensure the panel exists

          const image = panel.querySelector('.phone-img');
          const text = panel.querySelector('.text-content');

          // Animation for the image: subtle zoom in/out as it enters
          gsap.fromTo(image,
            { scale: 0.5, opacity: 0, y: 50 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: panel, // Trigger animation when the individual panel comes into view
                containerAnimation: horizontalScroll, // Crucial for linking to horizontal scroll.
                start: 'left center+=100', // Start when left edge of panel passes viewport center + 100px
                end: 'center center', // End when center of panel hits viewport center
                scrub: true,
                // markers: true, // Uncomment for debugging scrolltrigger points
              },
            }
          );

          // Animation for the text: subtle zoom in/out as it enters
          gsap.fromTo(text,
            { scale: 0.7, opacity: 0, y: 50 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalScroll,
                start: 'left center+=100',
                end: 'center center',
                scrub: true,
                // markers: true, // Uncomment for debugging scrolltrigger points
              },
            }
          );
        });
      }, scrollWrapperRef); // Pass the scope to gsap.context.
    }

    // Cleanup function: revert all animations and ScrollTriggers.
    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []); // Empty dependency array means this effect runs once after initial render.

  return (
    <>
      <div className="background-gradient" />

      <div className="horizontal-scroll-wrapper" ref={scrollWrapperRef}> {/* Assign the ref */}
        {/* Iterate through panels to assign refs dynamically */}
        {[
          { image: '/images/6k.png', title: 'Activate Your Superconscious', text: 'Activation is the bridge between knowing and becoming. Whether it\'s a sound, a symbol, or a moment in time, each Activation is designed to shift your state and rewire your focus. This is not motivation — it is your bridge to your future self.' },
          { image: '/images/1k.png', title: 'Your Patterns Revealed Through Reflection', text: 'Reflection is not thinking — it’s perceiving. When you reflect consciously, patterns are revealed. And when patterns are revealed, they can be rewired. Through clarity, we create conscious choice.' },
          { image: '/images/3k.png', title: 'The Conscious Reward Loop', text: 'Every aligned action is a seed. The loop is built through reward — but only when you consciously reward the behavior you want repeated. Build your own loop of alignment. Action. Reward. Repeat.' },
          { image: '/images/15k.png', title: 'Align Your Energetic Blueprint', text: 'Just as a blueprint guides construction, your energetic blueprint shapes your identity. When you realign it with your vision, you shift the way you move, act, and perceive the world — instantly.' },
          { image: '/images/14k.png', title: 'Integrate Your Superconscious', text: 'Integration is the ongoing process of becoming. It is not something you finish — it’s who you are. As you integrate the superconscious into your daily actions, it becomes your new baseline.' },
        ].map((panelData, index) => (
          <section className="panel" key={index} ref={el => (panelRefs.current[index] = el)}> {/* Assign refs to panels */}
            <div className="panel-content">
              <img src={panelData.image} className="phone-img" alt={panelData.title} />
              <div className="text-content">
                <h2>{panelData.title}</h2>
                <p>{panelData.text}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
