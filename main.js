window.addEventListener('load', (event) => {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.normalizeScroll(true)

  const btn_play = document.querySelector('.btn_play')
  const video = document.querySelector('#my-video')

  btn_play.addEventListener('pointerdown', (e) => {
    gsap.to('.controls_wrap', { autoAlpha: 0, duration: 0.3 })
    video.play()
  })
  video.addEventListener('pointerdown', (e) => {
    video.pause()
    gsap.to('.controls_wrap', { autoAlpha: 1, duration: 0.3 })
  })

  let swipePanels = gsap.utils.toArray('.swipe-section .panel')

  gsap.set(swipePanels, {
    zIndex: (i) => i,
  })

  let tl1 = gsap.timeline({})

  ScrollTrigger.create({
    trigger: '.swipe-section',
    start: 'top top',
    end: () => (window.innerWidth > 1024 ? '+=500%' : '+500%'),
    animation: tl1,
    pin: true,
    scrub: 1,
  })

  tl1
    .to('.panel.second', {
      top: '0vh',
      duration: 0.5,
      ease: 'none',
    })
    .fromTo(
      '.text_block_clarity',
      {
        top: '-30vh',
        bottom: 'auto',
      },
      {
        bottom: 0,
        top: 'auto',
        duration: 0.5,
        ease: 'none',
      },
      0
    )
    .from(
      '.sels_text',
      {
        yPercent: 300,
        duration: 0.5,
        ease: 'none',
      },
      '<+=0.5'
    )
    .from(
      '.bg_image',
      {
        opacity: 0,
        duration: 0.5,
        ease: 'none',
      },
      '<+=0.5'
    )
    .to('.panel.third', {
      top: '0vh',
      duration: 0.5,
      ease: 'none',
    })
    .from('.create_text', { opacity: 0, duration: 0.1 })
    .from(
      '.create_text',
      {
        yPercent: () => (window.innerWidth > 1024 ? 400 : 1200),
        duration: 0.5,
        ease: 'none',
      },
      '<+=0.3'
    )
    .from('.innovate_text', { opacity: 0, duration: 0.1 })
    .from('.innovate_text', {
      yPercent: () => (window.innerWidth > 1024 ? 400 : 1200),
      duration: 0.5,
      ease: 'none',
    })

    .to('.panel.fourth', {
      top: '0vh',
      duration: 0.5,
      ease: 'none',
    })
    .from('.text_clear_show_big', { opacity: 0, duration: 1 })

    .to('.text_clear_show_big', {
      filter: 'blur(0px)',
      duration: 0.5,
    })
    .to('.text_clear_show_big', {
      fontSize: () =>
        window.innerWidth > 1024
          ? '3rem'
          : window.innerWidth > 445
            ? '2rem'
            : '1.3rem',
      xPercent: 0,
      left: () => {
        const rectWidth = document.querySelector('.text_clear_show')
        return rectWidth.getBoundingClientRect().left
      },
      top: () => {
        const rectWidth = document.querySelector('.text_clear_show')
        return rectWidth.getBoundingClientRect().top
      },
      // top: '0vh',
      yPercent: -9,
      duration: 0.5,
    })
    .to('.text_clear_hide', {
      autoAlpha: 1, duration: 1,
      onUpdate: () => {
        video.pause()
        gsap.to('.controls_wrap', { autoAlpha: 1, duration: 0.3 })
      },
    }, '<+=0.8')

    .to('.panel.six', {
      top: '0vh',
      duration: 0.5,
      ease: 'none',

    })
    .to('.panel.six', {
      top: '0vh',
      duration: 1,
      ease: 'none',
      onComplete: () => {
        video.pause()
        gsap.to('.controls_wrap', { autoAlpha: 1, duration: 0.3 })
      },
    })
    .to('.panel.seven', {
      top: '0vh',
      duration: 0.5,
      ease: 'none',
    })
    .to('.line1', { xPercent: 100, duration: 0.5 })
    .to('.line2', { xPercent: 100, duration: 0.5 }, '<+=0.4')
    .to(
      '.contact_line',
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
      '<+=0.4'
    )

  setTimeout(() => {
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
  }, 300)


  window.addEventListener('resize', () => {
    setTimeout(() => {
      console.log('resize');
      window.location.reload()
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    }, 500)
  })

  floaty();
})


function floaty() {
  function onFocus() {
    setLabelActive(this.floatingLabel);
  }

  function onBlur() {
    setLabel(this);
  }

  function setLabelActive(label) {
    label.classList.add('floating-label-active');
  }

  function setLabelInactive(label) {
    label.classList.remove('floating-label-active');
  }

  function setLabel(input = {}) {
    if (input.value && input.value.length) {
      setLabelActive(input.floatingLabel);
    } else {
      setLabelInactive(input.floatingLabel);
    }
  }

  const inputs = [].slice.call(document.querySelectorAll('[floating-label]'));
  inputs.forEach(input => {
    const inputId = input.id,
      placeholder = input.getAttribute('floating-label');

    let labelEl = document.createElement('label');

    labelEl.setAttribute('for', inputId);
    labelEl.innerHTML = placeholder;
    labelEl.classList.add('floating-label');

    input.floatingLabel = labelEl;
    input.parentNode.appendChild(labelEl);

    input.addEventListener('focus', onFocus);
    input.addEventListener('blur', onBlur);

    setLabel(input);
  });
}