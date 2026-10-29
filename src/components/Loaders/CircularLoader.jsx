import React from "react";
import styled from "styled-components";

const CircularLoader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="grid-background" />
        <div className="ring outer">
          <div className="item item-1">
            <span className="symbol">∫</span>
          </div>
          <div className="item item-2">
            <span className="symbol">∑</span>
          </div>
          <div className="item item-3">
            <span className="symbol">∂</span>
          </div>
        </div>
        <div className="ring middle">
          <div className="item item-1">
            <span className="symbol">π</span>
          </div>
          <div className="item item-2">
            <span className="symbol">e</span>
          </div>
        </div>
        <div className="ring inner">
          <div className="item item-1">
            <span className="symbol">∞</span>
          </div>
          <div className="item item-2">
            <span className="symbol">√</span>
          </div>
        </div>
        <div className="core" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader * {
    box-sizing: border-box;
  }

  .loader {
    position: relative;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 20px rgba(0, 0, 0, 1);
  }

  .ring {
    position: absolute;
    border-radius: 50%;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);
    transform-style: preserve-3d;
  }

  .ring::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1;
  }

  .outer {
    width: 140px;
    height: 140px;
    z-index: 10;
    animation: spin 12s linear infinite;
  }

  .outer::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid transparent;
    border-top-color: rgba(21, 88, 201, 0.9);
    border-right-color: rgba(21, 88, 201, 0.25);
    box-shadow: 0 0 15px rgba(21, 88, 201, 0.6);
    z-index: 2;
    pointer-events: none;
  }

  .middle {
    width: 100px;
    height: 100px;
    z-index: 20;
    animation: spin 8s linear infinite reverse;
  }

  .middle::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid transparent;
    border-left-color: rgba(212, 255, 36, 0.8);
    border-bottom-color: rgba(212, 255, 36, 0.2);
    box-shadow: 0 0 15px rgba(212, 255, 36, 0.35);
    z-index: 2;
    pointer-events: none;
  }

  .inner {
    width: 60px;
    height: 60px;
    z-index: 30;
    animation: spin 4s linear infinite;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 60%
    );
  }

  .inner::before {
    border: 1px dashed rgba(255, 255, 255, 0.3);
  }

  .item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    z-index: 5;
  }

  .symbol {
    display: block;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 400;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }

  .outer .item-1 {
    transform: rotate(0deg) translate(0, -70px);
  }

  .outer .item-2 {
    transform: rotate(120deg) translate(0, -70px);
  }

  .outer .item-3 {
    transform: rotate(240deg) translate(0, -70px);
  }

  .middle .item-1 {
    transform: rotate(0deg) translate(0, -50px);
  }

  .middle .item-2 {
    transform: rotate(180deg) translate(0, -50px);
  }

  .inner .item-1 {
    transform: rotate(90deg) translate(0, -30px);
  }

  .inner .item-2 {
    transform: rotate(270deg) translate(0, -30px);
  }

  @keyframes spin-reverse-0 {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes spin-reverse-120 {
    from {
      transform: rotate(-120deg);
    }

    to {
      transform: rotate(-480deg);
    }
  }

  @keyframes spin-reverse-240 {
    from {
      transform: rotate(-240deg);
    }

    to {
      transform: rotate(-600deg);
    }
  }

  .outer .item-1 .symbol {
    animation: spin-reverse-0 12s linear infinite;
  }

  .outer .item-2 .symbol {
    animation: spin-reverse-120 12s linear infinite;
  }

  .outer .item-3 .symbol {
    animation: spin-reverse-240 12s linear infinite;
  }

  @keyframes spin-forward-0 {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-forward-180 {
    from {
      transform: rotate(-180deg);
    }

    to {
      transform: rotate(180deg);
    }
  }

  .middle .item-1 .symbol {
    animation: spin-forward-0 8s linear infinite;
  }

  .middle .item-2 .symbol {
    animation: spin-forward-180 8s linear infinite;
  }

  @keyframes spin-reverse-90 {
    from {
      transform: rotate(-90deg);
    }

    to {
      transform: rotate(-450deg);
    }
  }

  @keyframes spin-reverse-270 {
    from {
      transform: rotate(-270deg);
    }

    to {
      transform: rotate(-630deg);
    }
  }

  .inner .item-1 .symbol {
    animation: spin-reverse-90 4s linear infinite;
  }

  .inner .item-2 .symbol {
    animation: spin-reverse-270 4s linear infinite;
  }

  .core {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    box-shadow:
      0 0 5px #fff,
      0 0 15px #1558c9,
      0 0 30px #d4ff24;
    z-index: 10;
    animation: heartbeat-core 4s ease-in-out infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes heartbeat-core {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }

    5% {
      transform: scale(1.1);
      opacity: 0.9;
    }

    10% {
      transform: scale(1);
      opacity: 0.8;
    }

    15% {
      transform: scale(1.4);
      opacity: 1;
      box-shadow:
        0 0 10px #fff,
        0 0 25px #1558c9;
    }

    20% {
      transform: scale(1);
      opacity: 0.8;
    }

    25% {
      transform: scale(1);
      opacity: 0.8;
    }

    30% {
      transform: scale(1.1);
      opacity: 0.9;
    }

    35% {
      transform: scale(1);
      opacity: 0.8;
    }

    40% {
      transform: scale(1.4);
      opacity: 1;
      box-shadow:
        0 0 10px #fff,
        0 0 25px #1558c9;
    }

    45% {
      transform: scale(1);
      opacity: 0.8;
    }

    50% {
      transform: scale(1);
      opacity: 0.8;
    }

    55% {
      transform: scale(1.1);
      opacity: 0.9;
    }

    60% {
      transform: scale(1);
      opacity: 0.8;
    }

    65% {
      transform: scale(1.4);
      opacity: 1;
      box-shadow:
        0 0 10px #fff,
        0 0 25px #1558c9;
    }

    70% {
      transform: scale(1);
      opacity: 0.8;
    }

    75% {
      transform: scale(1);
      opacity: 0.8;
    }

    80% {
      transform: scale(0.9);
      opacity: 0.6;
    }

    82% {
      transform: scale(1.3);
      opacity: 0.9;
    }

    84% {
      transform: scale(0.9);
      opacity: 0.6;
    }

    86% {
      transform: scale(1.7);
      opacity: 1;
      box-shadow:
        0 0 15px #fff,
        0 0 40px #d4ff24;
    }

    90% {
      transform: scale(1);
      opacity: 0.8;
    }

    100% {
      transform: scale(1);
      opacity: 0.8;
    }
  }

  @keyframes grid-move {
    0% {
      background-position:
        center center,
        0 0,
        0 0;
    }

    100% {
      background-position:
        center center,
        0 30px,
        0 30px;
    }
  }
`;

export default CircularLoader;
