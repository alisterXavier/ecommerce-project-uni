"use client";

import * as React from "react";

interface IButton {
  children: React.ReactNode;
  type: boolean;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
}

export const Header = () => {
  return (
    <div className="navbar-item">
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

export const Account = ({ auth }: { auth: boolean }) => {
  return auth ? (
    <div className="navbar-item navbar-item-account ">
      <a className="armyText" href="/">
        Account
      </a>
    </div>
  ) : (
    <></>
  );
};
