import { FC } from "react";

const EmailIcon: FC<{ fill?: string; height?: string; width?: string }> = ({
  fill = "#fffefb",
  height = "24px",
  width = "24px",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
    >
      <path
        fill={fill}
        d="M21,4H3C1.895,4,1,4.895,1,6v12c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C23,4.895,22.105,4,21,4z M21,8.238l-9,5.42 l-9-5.42V6l9,5.4l9-5.4V8.238z"
      />
    </svg>
  );
};

export default EmailIcon;
