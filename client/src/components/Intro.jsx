import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const Intro = () => {
  return (
    <>
      <section id="intro">
        <p className="name">
          Hi, my name is <span>Kamil Wawrzyńczuk.</span>
        </p>

        <h2>I am a Developer.</h2>

        <p>I'm a student specializing in HTML, CSS, JavaScript, UX</p>

        <p>
          Currently, I'm at Bootcamp at{' '}
          <a href="#" target="_blank">
            DCI.
          </a>
        </p>
      </section>
    </>
  );
};

export default Intro;
