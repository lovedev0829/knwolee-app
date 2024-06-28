import { FC } from "react";

const EditIcon: FC<{ fill: string }> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.4002 7.337L16.6602 4.597C16.3025 4.26109 15.8339 4.06836 15.3435 4.05545C14.853 4.04254 14.3749 4.21037 14.0002 4.527L5.00015 13.527C4.67692 13.853 4.47566 14.2802 4.43015 14.737L4.00015 18.907C3.98762 19.0457 4.00419 19.1855 4.0488 19.3174C4.09341 19.4493 4.16508 19.5704 4.25922 19.673C4.35336 19.7756 4.46789 19.8575 4.59548 19.9133C4.72307 19.969 4.8609 19.9976 5.00015 19.997H5.09015L9.26015 19.617C9.71695 19.5715 10.1442 19.3702 10.4702 19.047L19.4702 10.047C19.8195 9.67796 20.0083 9.18551 19.9951 8.67753C19.982 8.16956 19.7681 7.6875 19.4002 7.337ZM9.08015 17.617L6.08015 17.897L6.35015 14.897L12.0002 9.317L14.7002 12.017L9.08015 17.617ZM16.0002 10.677L13.3202 7.997L15.2702 5.997L18.0002 8.727L16.0002 10.677Z"
        fill={props.fill}
      />
    </svg>
  );
};

export default EditIcon;
