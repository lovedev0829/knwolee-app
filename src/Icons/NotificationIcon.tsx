import { FC } from "react";

const  NotificationIcon: FC<{ isRead: boolean}> = ({ isRead}) => {
  const getFill = () => (isRead ? "#CFE0FC" : "#4386F4")

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.3335 8.333C3.3335 5.57158 5.57207 3.33301 8.3335 3.33301H16.6668V16.6663H8.33349C5.57207 16.6663 3.3335 14.4278 3.3335 11.6663V8.333ZM14.1668 9.16634L5.8335 9.16634L5.8335 7.16634L14.1668 7.16634L14.1668 9.16634ZM10.8335 14.1663L14.1668 14.1663V11.1663L10.8335 11.1663V14.1663Z"
        fill={getFill()}
      />
    </svg>
  );
}

export default NotificationIcon
