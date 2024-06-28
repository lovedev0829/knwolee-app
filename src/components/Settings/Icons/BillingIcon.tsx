import React from 'react';
import type { SVGAttrib } from './index';

export const BillingIcon: React.FC<SVGAttrib> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM5 16V4h10v12H5z" fill={props.fill || "#6C7275"}/>
    <path d="M7 6h6v2H7zM7 9h6v2H7zM7 12h6v2H7z" fill={props.fill || "#6C7275"}/>
    <circle cx="14" cy="6" r="1" fill={props.fill || "#6C7275"}/>
  </svg>
);
