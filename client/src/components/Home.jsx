import React from 'react';
import Footer from './Footer';
import Header from './Header';
import SingleProject from './SingleProject';
import portfolioImg from '../img/portfolio.png';

function Home() {

  return (
    <>
      <div className='section-blue'>
        <section id='projects'>
          <h2>Easy and fast way to show your work!</h2>
          <article className=''>
            <div className='text'>
              <h4>This can be one of your portfolio website</h4>
              <h3>Just write your name...</h3>
              <p className='blackbox'>
                Very asy to customize. Write some text, upload photos, make
                anywhere in the description. A link looks like{' '}
                <a href='https://frontendmasters.github.io/grid-flexbox-v2/'>
                  link
                </a>{' '}
                to your projects..it is simple like that! Register today and
                create your portfolio website.
              </p>
              <h4>Technologies used include:</h4>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>SVG</li>
              </ul>
            </div>
            <img src={portfolioImg} alt='Screenshot of the Wall of Wonder.' />
          </article>
        </section>
      </div>
    </>
  );
}

export default Home;
