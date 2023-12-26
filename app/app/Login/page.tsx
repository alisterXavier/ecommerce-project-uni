'use client';
import Image from 'next/image';
import womenLogin from '@/public/images/login/loginWomen.png';
import mensLogin from '@/public/images/login/menLogin.jpg';
import {
  IconChevronsLeft,
  IconChevronsRight,
  IconLock,
  IconUser,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import {
  Button,
  ButtonProps,
  Divider,
  InputError,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import '@mantine/core/styles.css';
import { useRef, useState } from 'react';
import { LoginSwitch, BoxSwitch, RegSwitch } from '@/shared/animations';
import { useDispatch } from 'react-redux';
import { supabase } from '@/shared/supabaseConfig';
import axios from 'axios';
import toast from 'react-hot-toast';

const GoogleIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 262"
      style={{ width: '0.9rem', height: '0.9rem' }}
      {...props}
    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      />
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      />
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      />
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      />
    </svg>
  );
};

const LoginInputs = ({
  isSignUp,
  setIsSignUp,
}: {
  isSignUp: boolean;
  setIsSignUp: (temp: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();
  const router = useRouter();
  // const googleAuth = async () => {
  //   await supabase.auth
  //     .signInWithOAuth({
  //       provider: 'google',
  //       // options: {
  //       //     // redirectTo: getURL() // function to get your URL
  //       // }
  //     })
  // };

  // const GoogleButton = (
  //   props: ButtonProps & React.ComponentPropsWithoutRef<'button'>
  // ) => {
  //   return (
  //     <Button
  //       fullWidth
  //       leftSection={<GoogleIcon />}
  //       variant="default"
  //       className="my-2"
  //       {...props}
  //       onClick={googleAuth}
  //     />
  //   );
  // };

  const onLogin = async () => {
    await supabase.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.user) {
          toast.success('Logged in successfully', {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          router.push('http://localhost:3000');
        }
        if (res.error) {
          if (res.error.message == 'Email not confirmed')
            toast.error('Verify your email to login', {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
          else setError('Invalid login credentials');
        }
      });
  };

  const onSignUp = async () => {
    axios
      .post('http://localhost:5001/register', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          toast.success('Registered successfully', {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          setIsSignUp(false);
        }
      });
  };

  return (
    <div className="w-[300px] h-[45%] flex flex-col items-start justify-center">
      <InputError h={'10px'}>{error}</InputError>
      <TextInput
        style={{
          outline: 'none',
          background: 'transparent',
        }}
        color='black'
        leftSectionPointerEvents="none"
        leftSection={<IconUser />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="unstyled"
        placeholder="Your email"
        className="my-2 login-input-field"
        w={'100%'}
        h={'45px'}
      />
      <PasswordInput
        className="my-2 login-input-field"
        w={'100%'}
        color='black'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="unstyled"
        leftSection={<IconLock />}
        placeholder="Password"
        defaultValue=""
      />
      <div className="w-full flex flex-col items-center justify-center">
        <Button
          w={'80%'}
          className="my-2 login-button"
          style={{
            background: 'var(--testColor)',
            border: '1px solid white',
          }}
          variant="Light"
          onClick={isSignUp ? onSignUp : onLogin}
        >
          {isSignUp ? 'Sign up' : 'Login'}
        </Button>

        {/* ToDo Create support for google auth */}
        {/* <div className="w-full">
          <Divider
            w={'100%'}
            my="xs"
            label="Or"
            variant="dashed"
            color="white"
            labelPosition="center"
          />
        </div>
        <GoogleButton>Continue with Google</GoogleButton> */}
      </div>
    </div>
  );
};

const Login = () => {
  const credentialsRef = useRef<null | HTMLDivElement>(null);
  const imageRef = useRef<null | HTMLDivElement>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <div className="login-container w-screen h-screen">
      <div className="login-wrapper relative w-full h-full flex items-center justify-around">
        <div className="login-form-container relative z-10 rounded-sm w-[70%] h-[80%] overflow-hidden">
          <div className="relative transition flex items-center justify-start w-full h-full bg-white">
            <motion.div className="absolute w-[45%] h-full" ref={imageRef}>
              <figure className="absolute w-full h-full bg-[var(--nightBlue)]">
                <Image alt="" src={womenLogin} className="absolute" fill />
              </figure>
            </motion.div>

            <motion.div
              className="absolute w-[45%] h-full right-0"
              ref={imageRef}
            >
              <figure className="absolute w-full h-full bg-[var(--nightBlue)]">
                <Image alt="" src={mensLogin} className="absolute" fill />
              </figure>
            </motion.div>

            {/* Sign Up */}
            <motion.div
              className="bg-transparent absolute right-0 h-full w-[50%] p-10 flex justify-center items-center"
              ref={credentialsRef}
              animate={isSignUp ? 'switchToReg' : 'default'}
              variants={LoginSwitch}
            >
              <div className="w-fit">
                <h1 className=" text-[30px] uppercase text-black">Sign In</h1>
                <LoginInputs isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
                <div>
                  <p
                    className=" my-5 flex items-end text-black uppercase cursor-pointer"
                    onClick={() => setIsSignUp(true)}
                  >
                    <IconChevronsLeft />
                    <span className="text-[15px]">Sign UP</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white z-[1] absolute right-0 h-full w-[50%] p-10 flex justify-center items-center"
              ref={credentialsRef}
              animate={isSignUp ? 'switchToReg' : 'default'}
              variants={BoxSwitch}
            ></motion.div>

            {/* Sign In */}
            <motion.div
              className="bg-white absolute left-0 h-full w-[50%] p-10 flex justify-center items-center"
              ref={credentialsRef}
              initial={{ opacity: 0 }}
              animate={!isSignUp ? 'default' : 'switchToReg'}
              variants={RegSwitch}
            >
              <div className="w-fit flex flex-col justify-center items-start">
                <h1 className=" text-[30px] uppercase text-black">Sign Up</h1>
                <LoginInputs isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
                <div>
                  <p
                    className=" my-5 flex items-end text-black uppercase cursor-pointer"
                    onClick={() => setIsSignUp(false)}
                  >
                    <span className="text-[15px]">Sign In</span>
                    <IconChevronsRight />
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
