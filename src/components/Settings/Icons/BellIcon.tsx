import React from 'react';
import type { SVGAttrib } from './index';

export const BellIcon: React.FC<SVGAttrib> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.1001 12.6734L15.6001 11.1651V7.44841C15.6201 6.06826 15.14 4.7275 14.2486 3.67369C13.3571 2.61988 12.1145 1.92419 10.7501 1.71507C9.95832 1.6108 9.15336 1.67659 8.38898 1.90805C7.6246 2.13952 6.91837 2.53134 6.31741 3.05737C5.71646 3.58341 5.2346 4.23155 4.90398 4.95857C4.57337 5.68558 4.4016 6.47475 4.40014 7.27341V11.1651L2.90014 12.6734C2.71173 12.865 2.58396 13.1078 2.53281 13.3716C2.48166 13.6353 2.50939 13.9083 2.61254 14.1564C2.71569 14.4045 2.88968 14.6167 3.11277 14.7665C3.33585 14.9162 3.59813 14.9969 3.86681 14.9984H6.66681V15.2817C6.70573 16.1277 7.07844 16.9238 7.70325 17.4955C8.32806 18.0672 9.15402 18.3679 10.0001 18.3317C10.8463 18.3679 11.6722 18.0672 12.297 17.4955C12.9218 16.9238 13.2946 16.1277 13.3335 15.2817V14.9984H16.1335C16.4022 14.9969 16.6644 14.9162 16.8875 14.7665C17.1106 14.6167 17.2846 14.4045 17.3877 14.1564C17.4909 13.9083 17.5186 13.6353 17.4675 13.3716C17.4163 13.1078 17.2886 12.865 17.1001 12.6734ZM11.6668 15.2817C11.6206 15.6826 11.4215 16.0501 11.111 16.3078C10.8006 16.5655 10.4026 16.6935 10.0001 16.6651C9.59766 16.6935 9.19973 16.5655 8.88925 16.3078C8.57877 16.0501 8.37969 15.6826 8.33348 15.2817V14.9984H11.6668V15.2817Z"
      fill={props.fill || "#6C7275"}
    />
  </svg>
);