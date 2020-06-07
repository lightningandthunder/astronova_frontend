import React from "react";

export default function Kofi(props) {
  return (
    <div className="donationDiv">
      <p className="donationText">Want to support Nova?</p>
      <a href='https://ko-fi.com/T6T019VKL' target='_blank' rel="noopener noreferrer" >
        <img height='36'
          style={{ border: "0px", height: "36px" }}
          src='https://az743702.vo.msecnd.net/cdn/kofi2.png?v=2'
          border='0'
          alt='Buy Me a Coffee at ko-fi.com' />
      </a>
    </div>
  );
}