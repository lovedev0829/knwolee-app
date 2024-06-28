interface Props {
  fill?: string
}

export default function DocumentIcon({ fill = "#6C7275" }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 16H9C8.73478 16 8.48043 16.1054 8.29289 16.2929C8.10536 16.4804 8 16.7348 8 17C8 17.2652 8.10536 17.5196 8.29289 17.7071C8.48043 17.8946 8.73478 18 9 18H15C15.2652 18 15.5196 17.8946 15.7071 17.7071C15.8946 17.5196 16 17.2652 16 17C16 16.7348 15.8946 16.4804 15.7071 16.2929C15.5196 16.1054 15.2652 16 15 16Z"
        fill={fill}
      />
      <path
        d="M9 14H12C12.2652 14 12.5196 13.8946 12.7071 13.7071C12.8946 13.5196 13 13.2652 13 13C13 12.7348 12.8946 12.4804 12.7071 12.2929C12.5196 12.1054 12.2652 12 12 12H9C8.73478 12 8.48043 12.1054 8.29289 12.2929C8.10536 12.4804 8 12.7348 8 13C8 13.2652 8.10536 13.5196 8.29289 13.7071C8.48043 13.8946 8.73478 14 9 14Z"
        fill={fill}
      />
      <path
        d="M19.74 8.33L14.3 2.33C14.2065 2.2264 14.0924 2.14353 13.9649 2.08669C13.8375 2.02986 13.6995 2.00033 13.56 2H6.56C6.22775 1.99603 5.89797 2.05756 5.5895 2.18105C5.28103 2.30455 4.9999 2.4876 4.76218 2.71975C4.52446 2.9519 4.33479 3.22861 4.20402 3.53406C4.07324 3.83952 4.00392 4.16775 4 4.5V19.5C4.00392 19.8322 4.07324 20.1605 4.20402 20.4659C4.33479 20.7714 4.52446 21.0481 4.76218 21.2802C4.9999 21.5124 5.28103 21.6954 5.5895 21.8189C5.89797 21.9424 6.22775 22.004 6.56 22H17.44C18.1109 22.0077 18.7575 21.7487 19.2375 21.2799C19.7176 20.8112 19.9918 20.1709 20 19.5V9C19.9994 8.75216 19.9067 8.51339 19.74 8.33ZM14 5L16.74 8H14.74C14.6353 7.99367 14.5329 7.96656 14.4387 7.92023C14.3446 7.8739 14.2607 7.80929 14.1918 7.73016C14.1229 7.65103 14.0704 7.55898 14.0375 7.45937C14.0046 7.35976 13.9918 7.25459 14 7.15V5ZM17.44 20H6.56C6.49037 20.004 6.42063 19.9943 6.35477 19.9714C6.28892 19.9484 6.22824 19.9127 6.17621 19.8662C6.12419 19.8198 6.08184 19.7635 6.0516 19.7007C6.02137 19.6378 6.00383 19.5696 6 19.5V4.5C6.00383 4.43036 6.02137 4.36216 6.0516 4.29931C6.08184 4.23647 6.12419 4.1802 6.17621 4.13375C6.22824 4.0873 6.28892 4.05158 6.35477 4.02863C6.42063 4.00567 6.49037 3.99594 6.56 4H12V7.15C11.9839 7.88662 12.2598 8.59972 12.7675 9.13367C13.2752 9.66761 13.9735 9.97905 14.71 10H18V19.5C17.9962 19.5696 17.9786 19.6378 17.9484 19.7007C17.9182 19.7635 17.8758 19.8198 17.8238 19.8662C17.7718 19.9127 17.7111 19.9484 17.6452 19.9714C17.5794 19.9943 17.5096 20.004 17.44 20Z"
        fill={fill}
      />
    </svg>
  );
}
