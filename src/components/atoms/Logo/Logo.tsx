import React, { FC } from 'react';

interface Props {
  width?: string;
  height?: string;
}

export const Logo: FC<Props> = ({ width = '52', height = '52' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M26 0H39L26 13V0Z" fill="white" />
      <path d="M13 13H26L13 26V13Z" fill="white" />
      <path d="M0 26H13L0 39V26Z" fill="white" />
      <path d="M13 39H26L13 52V39Z" fill="white" />
      <path d="M26 39H39L26 52V39Z" fill="#F9FE54" />
      <path d="M39 26H52L39 39V26Z" fill="#F9FE54" />
      <path d="M39 39H52L39 52V39Z" fill="white" />
      <path d="M39 13L26 13L39 0L39 13Z" fill="white" />
      <path d="M13 26L0 26L13 13L13 26Z" fill="#F9FE54" />
      <path d="M13 39L0 39L13 26L13 39Z" fill="white" />
      <path d="M26 52L13 52L26 39L26 52Z" fill="white" />
    </svg>
  );
};
