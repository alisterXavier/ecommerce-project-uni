'use client';
import '@mantine/core/styles.css';
import { Combobox, useCombobox } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import Image from 'next/image';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/shared/supabaseConfig';
import { useGetUser } from '@/shared/hooks/products';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

interface IButton {
  children: React.ReactNode;
  type: boolean;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
}

export const Logo = () => {
  return (
    <div className="navbar-item ml-auto mr-auto">
      <a href="/" className="navbar-item-header armyText">
        Store
      </a>
    </div>
  );
};

export const Buttons = ({
  children,
  type,
  onMouseEnter,
  onMouseLeave,
}: IButton) => {
  return (
    <div
      className="navbar-item"
      data-active={type}
      onMouseEnter={(event: React.MouseEvent) => onMouseEnter(event)}
      onMouseLeave={(event: React.MouseEvent) => onMouseLeave(event)}
    >
      {children}
    </div>
  );
};

export const Account = ({ user }: { user: User }) => {
  const { data, customerError, customerIsLoading } = useGetUser(user?.id);

  const combOptions = [
    {
      name: 'Settings',
      url: '',
    },
    {
      name: 'Sign Out',
      url: '',
    },
  ];
  const router = useRouter();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    router.refresh();
  };

  const options = combOptions.map((item, index) => (
    <Combobox.Option
      w={'200px'}
      value={item as unknown as string}
      key={index}
      onClick={() => {
        if (item.name === 'signOut') signOut();
      }}
    >
      {item.name === 'signOut' ? <p>{item.name}</p> : <p>{item.name}</p>}
    </Combobox.Option>
  ));

  return (
    <div className="navbar-item navbar-item-account w-[400px]">
      <Combobox
        variant=""
        width={'200px'}
        store={combobox}
        onOptionSubmit={(val) => {
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <figure
            className="navbar-account-logo"
            onClick={() => combobox.toggleDropdown()}
          >
            {user?.user_metadata.avatar_url ? (
              <Image
                src={user?.user_metadata.avatar_url}
                alt={'UserProfile'}
                fill
              />
            ) : (
              <IconUser />
            )}
          </figure>
        </Combobox.Target>

        <Combobox.Dropdown w={'200px'}>
          <Combobox.Options w={'200px'}>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};

export const LoginSignUp = () => {
  return (
    <div className="navbar-item navbar-item-account">
      <a href="/Login">Login</a>
    </div>
  );
};
