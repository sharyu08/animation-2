import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    const panels = document.querySelectorAll('.panel')
    const totalPanels = panels.length

    // Horizontal scroll animation
    const horizontalScroll = gsap.to('.horizontal-scroll-wrapper', {
      xPercent: -100 * (totalPanels - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.horizontal-scroll-wrapper',
        pin: true,
        scrub: 1,
        end: () => `+=${window.innerWidth * totalPanels}`,
        id: 'horizontalScroll', // Needed for containerAnimation
      },
    })

    // Image zoom effect as panels scroll
    panels.forEach((panel) => {
      const image = panel.querySelector('.phone-img')

      gsap.fromTo(
        image,
        { scale: 0.85 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalScroll, // Use the scroll tween above
            start: 'center center',
            end: 'center center',
            scrub: true,
          },
        }
      )
    })
  }, [])

  return (
    <>
      <div className="background-blur" />

      <div className="horizontal-scroll-wrapper">
        {/* Panel 1 */}
        <section className="panel">
          <div className="panel-content">
            <img src="/images/cat1.jpg" className="phone-img" alt="Cat 1" />
            <div className="text-content">
              <h2>Collective Purr</h2>
              <p>Three heads, one mission: to spread purr-powered harmony through the universe.</p>
              <p>Together, they form a living trinity of feline philosophy.</p>
            </div>
          </div>
        </section>

        {/* Panel 2 */}
        <section className="panel">
          <div className="panel-content">
            <img src="/images/cat4.jpg" className="phone-img" alt="Cat 4" />
            <div className="text-content">
              <h2>Deep Cat Meditation</h2>
              <p>This cat is a master of mindfulness. Notice its relaxed posture, gentle gaze, and unbothered vibe.</p>
              <p>This cat reminds us to slow down and simply be. Sit, breathe, and purr your stress away.</p>
              <p>Every blink is a mantra. Every purr is an affirmation.</p>
            </div>
          </div>
        </section>

        {/* Panel 3 */}
        <section className="panel">
          <div className="panel-content">
            <img src="/images/cat3.jpg" className="phone-img" alt="Cat 3" />
            <div className="text-content">
              <h2>Blue-Eyed Wisdom</h2>
              <p>Those blue eyes don't just see — they understand. She is silence, and silence is wise.</p>
            </div>
          </div>
        </section>

        {/* Panel 4 */}
        <section className="panel">
          <div className="panel-content">
            <img src="/images/cat51.jpg" className="phone-img" alt="Cat 5" />
            <div className="text-content">
              <h2>Sunbeam Seeker</h2>
              <p>With precision and purpose, this cat always finds the perfect patch of sunlight to nap in.</p>
              <p>A master of warmth and timing.</p>
            </div>
          </div>
        </section>

        {/* Panel 5 */}
        <section className="panel">
          <div className="panel-content">
            <img src="/images/cat61.jpg" className="phone-img" alt="Cat 6" />
            <div className="text-content">
              <h2>The Watchful Gaze</h2>
              <p>Quiet, focused, alert — this guardian cat surveys its kingdom with calm confidence.</p>
              <p>Nothing escapes its notice.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
