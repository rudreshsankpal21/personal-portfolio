import React from 'react';
import styled from 'styled-components';

const AnimatedButton = ({ children = 'BUTTON', href, fontSize = '2rem', ...rest }) => {
  const Tag = href ? 'a' : 'button';
  return (
    <StyledWrapper style={{ '--fs': fontSize }}>
      <Tag className="animated-btn" href={href} {...rest}>
        {children}
      </Tag>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: inline-block;

  .animated-btn {
    --c: #fff;
   /* text color */
    background: linear-gradient(90deg, #0000 33%, #fff5, #0000 67%) var(--_p,100%)/300% no-repeat,
      #3B82F6;
   /* background color */
    color: #0000;
    border: none;
    transform: perspective(500px) rotateY(calc(20deg*var(--_i,-1)));
    text-shadow: calc(var(--_i,-1)* 0.08em) -.01em 0   var(--c),
      calc(var(--_i,-1)*-0.08em)  .01em 2px #0004;
    outline-offset: .1em;
    transition: 0.3s;
  }

  .animated-btn:hover,
  .animated-btn:focus-visible {
    --_p: 0%;
    --_i: 1;
  }

  .animated-btn:active {
    text-shadow: none;
    color: var(--c);
    box-shadow: inset 0 0 9e9q #0005;
    transition: 0s;
  }

  .animated-btn {
    display: inline-flex;
    align-items: center;
    gap: .5em;
    white-space: nowrap;
    text-decoration: none;
    font-family: system-ui, sans-serif;
    font-weight: bold;
    font-size: var(--fs, 2rem);
    margin: 0;
    cursor: pointer;
    padding: .1em .3em;
  }

  /* text is drawn via text-shadow, so icons need an explicit color */
  .animated-btn svg {
    color: var(--c);
    flex-shrink: 0;
  }`;

export default AnimatedButton;
