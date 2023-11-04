'use client';
import { useEffect, useRef } from 'react';
import { Account, Buttons, Header } from './Header';
import './styles.css';
import { usePathname } from 'next/navigation';

export const Navbar = ({ auth }: { auth: boolean }) => {
  const path = usePathname();
  const sliderRef = useRef(null);
  const pathArr = path.split('/');

  const onMouseEnter = (e: React.MouseEvent) => {
    const { id } = e.currentTarget.querySelector('a') as HTMLElement;

    const translate =
      id === 'home'
        ? '0px'
        : id === 'mens'
        ? '90px 0px'
        : id === 'womens'
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
            : i === 'Mens'
            ? '90px 0px'
            : i === 'Womens'
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
    <nav className="navbar-container">
      <Header />
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
          type={path === '/Mens'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <a id="mens" className="armyText" href="/Category/Mens">
            Mens
          </a>
        </Buttons>
        <Buttons
          type={path === '/Womens'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <a className="armyText" id="womens" href="/Category/Womens">
            Womens
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
      <Account auth={auth} />
    </nav>
  );
};
