import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const panels = document.querySelectorAll('.panel');
    const totalPanels = panels.length;

    // Horizontal scroll animation tied to ScrollTrigger, pins the scroll container
    const horizontalScroll = gsap.to('.horizontal-scroll-wrapper', {
      xPercent: -100 * (totalPanels - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.horizontal-scroll-wrapper',
        pin: true,
        scrub: 1,
        end: () => `+=${window.innerWidth * totalPanels}`,
      },
    });

    // Animate image and text in each panel on horizontal scroll progress
    panels.forEach((panel) => {
      const image = panel.querySelector('.phone-img');
      const text = panel.querySelector('.text-content');

      gsap.fromTo(image,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalScroll,
            start: 'left center',
            end: 'center center',
            scrub: true,
          },
        }
      );

      gsap.fromTo(text,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalScroll,
            start: 'left center',
            end: 'center center',
            scrub: true,
          },
        }
      );
    });

    // Optional: return a cleanup function to kill ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      {/* Background gradient div for subtle radial glow */}
      <div className="background-gradient" />

      <div className="horizontal-scroll-wrapper">
        {/* Panel 1 */}
        <section className="panel">
          <div className="panel-content">
            <img src="/images/6k.png" className="phone-img" alt="Activate Superconscious" />
            <div className="text-content">
              <h2>Activate Your Superconscious</h2>
              <p>
                Activation is the bridge between knowing and becoming. Whether it's a sound, a symbol, or a moment in time, each Activation is designed to shift your state and rewire your focus. This is not motivation — it is your bridge to your future self.
              </p>
            </div>
          </div>
        </section>

        {/* Panel 2 */}
        <section className="panel">
          <div className="panel-content">
            <img src="/images/1k.png" className="phone-img" alt="Your Patterns Revealed" />
            <div className="text-content">
              <h2>Your Patterns Revealed Through Reflection</h2>
              <p>
                Reflection is not thinking — it’s perceiving. When you reflect consciously, patterns are revealed. And when patterns are revealed, they can be rewired. Through clarity, we create conscious choice.
              </p>
            </div>
          </div>
        </section>

        {/* Panel 3 */}
        <section className="panel">
          <div className="panel-content">
            <img src="/images/3k.png" className="phone-img" alt="The Conscious Reward Loop" />
            <div className="text-content">
              <h2>The Conscious Reward Loop</h2>
              <p>
                Every aligned action is a seed. The loop is built through reward — but only when you consciously reward the behavior you want repeated. Build your own loop of alignment. Action. Reward. Repeat.
              </p>
            </div>
          </div>
        </section>

        {/* Panel 4 */}
        <section className="panel">
          <div className="panel-content">
            <img src="/images/15k.png" className="phone-img" alt="Align Energetic Blueprint" />
            <div className="text-content">
              <h2>Align Your Energetic Blueprint</h2>
              <p>
                Just as a blueprint guides construction, your energetic blueprint shapes your identity. When you realign it with your vision, you shift the way you move, act, and perceive the world — instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Panel 5 */}
        <section className="panel">
          <div className="panel-content">
            <img src="/images/14k.png" className="phone-img" alt="Integrate Superconscious" />
            <div className="text-content">
              <h2>Integrate Your Superconscious</h2>
              <p>
                Integration is the ongoing process of becoming. It is not something you finish — it’s who you are. As you integrate the superconscious into your daily actions, it becomes your new baseline.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
