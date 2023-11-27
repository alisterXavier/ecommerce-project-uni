import './styles.css';
import { useEffect, useRef, useState } from 'react';
import { Account, Buttons, LoginSignUp, Logo } from './Header';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserResponse } from '@supabase/supabase-js';
import Link from 'next/link';
import { selectAuthState, setAuthState } from '@/shared/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '@/shared/supabaseConfig';

export const Navbar = () => {
  const path = usePathname();
  const sliderRef = useRef(null);
  const pathArr = path.split('/');
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserResponse | null>();

  const getUser = async () => {
    const user = await authState?.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, [authState]);

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
    if (pathArr) navChangeOnPath.current();
    else if (sliderRef.current) {
      (sliderRef.current as HTMLElement).removeAttribute('style');
    }
  };

  const navChangeOnPath = useRef(() => {
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
  });
  useEffect(() => {
    navChangeOnPath.current();
  }, [navChangeOnPath]);

  return (
    <motion.nav className="navbar-container">
      <div className="navbar-items">
        <Buttons
          type={path === '/'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link className="armyText" id="home" href="/">
            Home
          </Link>
        </Buttons>
        <Buttons
          type={path === '/Men'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link id="men" className="armyText" href="/Category/Men">
            Men
          </Link>
        </Buttons>
        <Buttons
          type={path === '/Women'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link className="armyText" id="women" href="/Category/Women">
            Women
          </Link>
        </Buttons>
        <Buttons
          type={path === '/Kids'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link className="armyText" id="kids" href="/Category/Kids">
            Kids
          </Link>
        </Buttons>
        <Buttons
          type={path === '/Electronics'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link
            className="armyText"
            id="electronics"
            href="/Category/Electronics"
          >
            Electronics
          </Link>
        </Buttons>
        <span className="navbar-item-slider" ref={sliderRef} />
      </div>
      <Logo />
      {user?.data.user ? <Account user={user.data.user} /> : <LoginSignUp />}
    </motion.nav>
  );
};
