import React, { useRef } from 'react';
import portfolioImg from '../img/portfolio.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Line from './Line';
function Home() {
  const spanElement = useRef();

  function goToTopOfPage() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function typeSentence(sentence, eleRef, delay = 100) {
    if (eleRef === undefined) return;
    const letters = sentence.split('');
    let i = 0;
    while (i < letters.length) {
      await waitForMs(delay);
      eleRef.innerHTML = eleRef.innerHTML + letters[i];
      i++;
    }
    return;
  }

  async function deleteSentence(eleRef) {
    if (eleRef === undefined) return;
    const sentence = eleRef.innerHTML;
    const letters = sentence.split('');
    let i = 0;
    while (letters.length > 0) {
      await waitForMs(100);
      letters.pop();
      eleRef.innerHTML = letters.join('');
    }
  }

  async function carousel(carouselList, eleRef) {
    if (eleRef === undefined) return;
    var i = 0;
    while (true) {
      updateFontColor(eleRef, carouselList[i].color);
      await typeSentence(carouselList[i].text, eleRef);
      await waitForMs(1500);
      await deleteSentence(eleRef);
      await waitForMs(500);
      i++;
      if (i >= carouselList.length) {
        i = 0;
      }
    }
  }

  function updateFontColor(eleRef, color) {
    if (eleRef === undefined) return;
    eleRef.style.color = color;
  }

  function waitForMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const carouselText = [
    { text: 'Web Developer', color: 'red' },
    { text: 'Designer', color: 'orange' },
    { text: 'Illustrator', color: 'yellow' },
  ];

  useEffect(() => {
    carousel(carouselText, spanElement.current);
  }, []);

  return (
    <>
      <section id='intro'>
        <p className='name'>
          Hi, my name is <span>John Doe</span>
        </p>

        <div className='typing-container'>
          <h2>I am </h2>
          <div className='heading-and-cursor'>
            <h2 id='feature-text' ref={spanElement}></h2>
            <span className='input-cursor'></span>
          </div>
        </div>
      </section>
      <Line />
      <div className='section-blue'>
        <section id='projects'>
          <h2>
            Are you looking to create an impressive portfolio that showcases
            your work and skills?
          </h2>
          <article className=''>
            <div className='text'>
              <h3>Look no further! </h3>
              <p className='blackbox'>
                Our portfolio creator tool is easy to use and offers a variety
                of customization options to make your portfolio truly unique.
                With features like customizable templates, drag-and-drop
                functionality, and easy integration with your existing projects,
                you'll have a stunning portfolio in no time. Whether you're a
                freelancer, artist, or professional, our portfolio creator is
                the perfect platform to showcase your talent and reach your next
                big opportunity.
              </p>
              <h4>Key characteristics:</h4>
              <ul>
                <li>User friendly</li>
                <li>Customizable Templates</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <img src={portfolioImg} alt='Screenshot of the Wall of Wonder.' />
          </article>
        </section>
      </div>
      <Line />
      <div className='section-plum'>
        <section id='contact'>
          <h2>Try it today and start creating your online presence!</h2>
          <p>
            <Link onClick={goToTopOfPage} to='/login' className='button'>
              Log in
            </Link>{' '}
            or{' '}
            <Link onClick={goToTopOfPage} to='/register' className='button'>
              Sign up
            </Link>
          </p>
        </section>
      </div>
      <Line />
    </>
  );
}

export default Home;
