'use client';
import { useEffect, useRef, useState } from 'react';
import { Account, Buttons, Logo } from './Header';
import './styles.css';
import { usePathname } from 'next/navigation';
import {
  useScroll,
  useAnimationFrame,
  useTransform,
  useSpring,
  motion,
} from 'framer-motion';

export const Navbar = ({ auth }: { auth: boolean }) => {
  const path = usePathname();
  const sliderRef = useRef(null);
  const pathArr = path.split('/');

  const { scrollY } = useScroll();
  const yTransform = useTransform(
    scrollY,
    [7, 8, 8.5, 8.9, 9, 9.5, 9.9, 10],
    ['10vh', '9.9vh', '9.5vh', '9vh', '8.9vh', '8.5vh', '8vh', '7vh']
  );

  const onMouseEnter = (e: React.MouseEvent) => {
    const { id } = e.currentTarget.querySelector('a') as HTMLElement;

    const translate =
      id === 'home'
        ? '0px'
        : id === 'men'
        ? '90px 0px'
        : id === 'women'
        ? '180px 0px'
        : id === 'kids'
        ? '270px 0px'
        : '360px 0px';
    if (sliderRef.current) {
      (sliderRef.current as HTMLElement).style.translate = translate;
    }
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    if (pathArr) navChangeOnPath();
    else if (sliderRef.current) {
      (sliderRef.current as HTMLElement).removeAttribute('style');
    }
  };

  const navChangeOnPath = () => {
    if (pathArr) {
      var translate;
      pathArr.map((i) => {
        translate =
          i === 'Electronics'
            ? '360px 0px'
            : i === 'Men'
            ? '90px 0px'
            : i === 'Women'
            ? '180px 0px'
            : i === 'Kids'
            ? '270px 0px'
            : '0px';
      });
      if (sliderRef.current && translate) {
        (sliderRef.current as HTMLElement).style.translate = translate;
      }
    }
  };

  useEffect(() => {
    navChangeOnPath();
  }, []);

  return (
    <motion.nav
      className="navbar-container"
      style={{
        height: yTransform,
      }}
    >
      <div className="navbar-items">
        <Buttons
          type={path === '/'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <a className="armyText" id="home" href="/">
            Home
          </a>
        </Buttons>
        <Buttons
          type={path === '/Men'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <a id="men" className="armyText" href="/Category/Men">
            Men
          </a>
        </Buttons>
        <Buttons
          type={path === '/Women'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <a className="armyText" id="women" href="/Category/Women">
            Women
          </a>
        </Buttons>
        <Buttons
          type={path === '/Kids'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <a className="armyText" id="kids" href="/Category/Kids">
            Kids
          </a>
        </Buttons>
        <Buttons
          type={path === '/Electronics'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <a className="armyText" id="electronics" href="/Category/Electronics">
            Electronics
          </a>
        </Buttons>
        <span className="navbar-item-slider" ref={sliderRef} />
      </div>
      <Logo />
      <Account auth={auth} />
    </motion.nav>
  );
};
