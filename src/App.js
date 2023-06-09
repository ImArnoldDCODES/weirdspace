import './App.css';
import IMG1 from './assets/IMG-1.svg'
import IMG2 from './assets/IMG-2.svg'
import IMG3 from './assets/IMG-3.svg'
import HOVER from './assets/hoverimg.jpg'
import Hamburger from './assets/Menu.svg'
import { useState, useEffect, useRef } from 'react'
import { Power3, gsap } from "gsap";


const App = ({ onClose }) => {
  const app = useRef(null);
  const tl = useRef()
  let ease = Power3.easeOut;

  useEffect(() => {
    let ctx = gsap.context(() => {

      tl.current = gsap.timeline()
        .to(".logo", { rotate: 360 })
        .from(".img1", 1.2, {
          ease: ease,
          opacity: 0
        }, "-=1")
        .from(".img1", 2, {
          scale: 1.6,
          ease: ease
        }, "-=1.2")
        .from(".img2", 1.2, {
          y: -1200,
          ease: ease,
          opacity: 0
        }, "-=1")
        .from(".img2", 2, {
          scale: 1.6,
          ease: ease
        }, "-=1")
        .from(".img3", 1.2, {
          ease: ease,
          opacity: 0
        }, "-=1")
        .from(".img3", 2, {
          scale: 1.6,
          ease: ease
        }, "-=1")
        .from([".center h3", ".center h5"], 1, {
          opacity: 0,
          y: -50,
          stagger: {
            amount: .4
          },
          ease: ease
        }, "-=1")
        .from([".text1 span", ".text2"], 1, {
          opacity: 0,
          y: -30,
          stagger: {
            amount: 2
          }
        }, "-=4")

    }, app);



    return () => ctx.revert()

  }, [])

  const animateIn = (image) => {
    gsap.to(image, { opacity: 1, duration: 0.5 });
  };

  const animateOut = (image) => {
    gsap.to(image, { opacity: 0, duration: 0.5 });
  };

  const modalRef = useRef();
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (open && modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [open])



  return (
    <div className="App" ref={app}>
      <div className='container'>
        <img src={IMG1} alt="1" className="image" style={{ opacity: '0' }} />
        <img src={IMG2} alt="2" className="image" style={{ opacity: '0' }} />
        <div className='logo'>
          Weird Space
        </div>
        <div>
          <img src={Hamburger} alt='' width={100} height={100} className='hamburger' onClick={() => setOpen(!open)} />
        </div>
        <div className='center'>
          <h3>Possible</h3>
          <h5>Objects</h5>
        </div>
        <h6 className='text1'
          onMouseEnter={() => animateIn('.imgshow')}
          onMouseLeave={() => animateOut('.imgshow')}
        >
          <span>Painting creates silence.</span>
          <span> You could examine the objects themselves,</span>
          <span> the actors in a Dutch still life. </span>
        </h6>
        <h6 className='text2'>Portraits often seem pregnant with speech, or as if their subjects have just finished saying something, or will soon speak the thoughts that inform their faces, the thoughts we’re invited to read.</h6>
        <img src={IMG1} alt='' width={100} height={100} className='img1' />
        <img src={IMG2} alt='' width={100} height={100} className='img2' />
        <img src={IMG3} alt='' width={100} height={100} className='img3' />
      </div>
      <img src={HOVER} alt='' width={100} height={100} className='imgshow' />
      <div ref={modalRef}>
        <div onClose={onClose} className={open ? 'navbar' : ''}>
          <ul>
            <li>HOME</li>
            <li>GALLERY</li>
            <li>ABOUT</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App