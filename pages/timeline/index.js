import React from 'react';
import Link from 'next/link';

export default function Timeline({ userName }) {
  return (
    <>
      <div>this is the timeline of {userName}</div>
      <Link href="/">
        <a>go to home</a>
      </Link>
    </>
  );
}

Timeline.getInitialProps = () => {
  return fetch('http://localhost:3000/api/hello')
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      const { userName } = response;
      return { userName };
    });
};
