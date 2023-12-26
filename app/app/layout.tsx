'use client';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from './Navbar/Navbar';
import { usePathname } from 'next/navigation';
import { MantineProvider, createTheme } from '@mantine/core';
import { AppDispatch, store } from '@/shared/redux/store';
import { Provider, useDispatch } from 'react-redux';
// import { setAuthState } from '@/shared/redux/authSlice';
import { supabase } from '@/shared/supabaseConfig';
import { useEffect } from 'react';
import { fetchUser } from '@/shared/redux/authSlice';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({});
function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        <Provider store={store}>
          <MantineProvider theme={theme}>
            <InnerRoot>
              <>
                {path
                  .split('/')
                  .some((i) => i === 'Login' || i === 'SignUp') ? (
                  <></>
                ) : (
                  <Navbar></Navbar>
                )}
                {children}
              </>
            </InnerRoot>
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}

const InnerRoot = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        dispatch(fetchUser(supabase));
      } else if (event === 'SIGNED_OUT') {
        dispatch(fetchUser(null));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return children;
};
export default RootLayout;
