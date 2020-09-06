import React from "react";
import "./Kofi.scss";

export default function Kofi(props) {
  return (
    <div className="kofi">
      <a
        href='https://ko-fi.com/T6T019VKL'
        target='_blank'
        rel="noopener noreferrer"
      >
        <img
          src='https://cdn.ko-fi.com/cdn/kofi5.png?v=2'
          alt='Buy Me a Coffee at ko-fi.com'
        />
      </a>
    </div>
  );
}