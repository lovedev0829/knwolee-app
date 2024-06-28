import { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
    pathFill?: string;
}

function NotificationIcon({ pathFill = "#FFF", }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5201 15.208L18.7201 13.398V8.938C18.744 7.28183 18.1679 5.67291 17.0982 4.40834C16.0285 3.14377 14.5373 2.30894 12.9001 2.058C11.9499 1.93287 10.9839 2.01182 10.0667 2.28958C9.14942 2.56734 8.30194 3.03752 7.5808 3.66876C6.85965 4.3 6.28142 5.07778 5.88468 5.9502C5.48794 6.82262 5.28182 7.76961 5.28007 8.728V13.398L3.48007 15.208C3.25398 15.4379 3.10066 15.7293 3.03927 16.0458C2.97789 16.3623 3.01117 16.6899 3.13495 16.9876C3.25873 17.2854 3.46752 17.54 3.73522 17.7197C4.00292 17.8994 4.31766 17.9962 4.64007 17.998H8.00007V18.338C8.04678 19.3532 8.49403 20.3085 9.2438 20.9945C9.99357 21.6806 10.9847 22.0414 12.0001 21.998C13.0154 22.0414 14.0066 21.6806 14.7563 20.9945C15.5061 20.3085 15.9534 19.3532 16.0001 18.338V17.998H19.3601C19.6825 17.9962 19.9972 17.8994 20.2649 17.7197C20.5326 17.54 20.7414 17.2854 20.8652 16.9876C20.989 16.6899 21.0223 16.3623 20.9609 16.0458C20.8995 15.7293 20.7462 15.4379 20.5201 15.208ZM14.0001 18.338C13.9446 18.819 13.7057 19.2601 13.3331 19.5693C12.9606 19.8785 12.4831 20.0321 12.0001 19.998C11.5171 20.0321 11.0396 19.8785 10.667 19.5693C10.2944 19.2601 10.0555 18.819 10.0001 18.338V17.998H14.0001V18.338ZM5.51007 15.998L6.69007 14.818C6.87724 14.6319 7.02574 14.4107 7.127 14.167C7.22826 13.9233 7.28028 13.6619 7.28007 13.398V8.728C7.28062 8.0534 7.42546 7.38673 7.70487 6.77271C7.98428 6.1587 8.3918 5.61155 8.90007 5.168C9.40149 4.71368 9.99565 4.37375 10.6414 4.17173C11.2872 3.96972 11.9691 3.91044 12.6401 3.998C13.7966 4.18578 14.8463 4.78501 15.596 5.68538C16.3457 6.58575 16.7449 7.72664 16.7201 8.898V13.398C16.7186 13.6612 16.7691 13.9221 16.8686 14.1658C16.9681 14.4095 17.1148 14.6311 17.3001 14.818L18.4901 15.998H5.51007Z"
        fill={pathFill}
      />
    </svg>
  );
};

export default NotificationIcon;