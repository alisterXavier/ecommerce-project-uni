import './styles.css';
import { useEffect, useRef, useState } from 'react';
import { Account, Buttons, LoginSignUp, Logo } from './Header';
import { usePathname } from 'next/navigation';
import { UserMetadata } from '@supabase/supabase-js';
import Link from 'next/link';
import { selectAuthState } from '@/shared/redux/authSlice';
import { useSelector } from 'react-redux';
import { IconSearch, IconShoppingCart } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const path = usePathname();
  const sliderRef = useRef(null);
  const pathArr = path.split('/');
  const authState = useSelector(selectAuthState);
  const [user, setUser] = useState<UserMetadata | null>();
  const [searchToggle, setSearchToggle] = useState<boolean>(false);
  const getUser = async () => {
    const user = authState?.data.user?.user_metadata;
    setUser(user);
  };

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
    getUser();
  }, [authState]);

  useEffect(() => {
    navChangeOnPath.current();
  }, [navChangeOnPath]);

  return (
    <>
      <motion.nav className="navbar-wrapper">
        <div className="navbar-container relative z-[2]">
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
          <div className="flex">
            <div className="flex items-center justify-center">
              <div className="py-[4px] px-[10px]">
                <IconSearch
                  size={30}
                  color='black'
                  cursor={'pointer'}
                  onClick={() => setSearchToggle(!searchToggle)}
                />
              </div>
            </div>
            {user ? (
              <>
                <Buttons
                  customClassName={'navbar-right-item'}
                  type={path === '/basket'}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <Link className="armyText" id="basket" href={`/cart`}>
                    <IconShoppingCart size={30} />
                  </Link>
                </Buttons>
                <Account user={user} />
              </>
            ) : (
              <LoginSignUp />
            )}
          </div>
        </div>
        <motion.div
          className="z-[1] relative shadow-xl"
          initial={{
            translateY: '-100%',
          }}
          transition={{ type: 'tween' }}
          animate={
            searchToggle
              ? {
                  translateY: '0%',
                }
              : {
                  translateY: '-100%',
                }
          }
        >
          <TextInput placeholder="Search for products" height={50} radius={0} />
        </motion.div>
      </motion.nav>
    </>
  );
};
