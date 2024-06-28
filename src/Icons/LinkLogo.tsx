interface Props {
  fill?: string
}

export default function LinkLogo({ fill = "currentColor" }: Props) {  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 11C19.7348 11 19.4804 11.1054 19.2929 11.2929C19.1054 11.4804 19 11.7348 19 12V18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H12C12.2652 5 12.5196 4.89464 12.7071 4.70711C12.8946 4.51957 13 4.26522 13 4C13 3.73478 12.8946 3.48043 12.7071 3.29289C12.5196 3.10536 12.2652 3 12 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V12C21 11.7348 20.8946 11.4804 20.7071 11.2929C20.5196 11.1054 20.2652 11 20 11Z"
        fill={fill}
      />
      <path
        d="M16 5H17.58L11.29 11.28C11.1725 11.3965 11.0856 11.5402 11.0371 11.6985C10.9886 11.8567 10.9801 12.0245 11.0123 12.1868C11.0445 12.3491 11.1164 12.501 11.2216 12.6287C11.3267 12.7565 11.4619 12.8562 11.615 12.919C11.7986 12.9957 12.0009 13.0158 12.196 12.9768C12.3911 12.9378 12.5701 12.8414 12.71 12.7L19 6.42V8C19 8.26522 19.1054 8.51957 19.2929 8.70711C19.4805 8.89464 19.7348 9 20 9C20.2653 9 20.5196 8.89464 20.7071 8.70711C20.8947 8.51957 21 8.26522 21 8V4C21 3.73478 20.8947 3.48043 20.7071 3.29289C20.5196 3.10536 20.2653 3 20 3H16C15.7348 3 15.4805 3.10536 15.2929 3.29289C15.1054 3.48043 15 3.73478 15 4C15 4.26522 15.1054 4.51957 15.2929 4.70711C15.4805 4.89464 15.7348 5 16 5Z"
        fill={fill}
      />
    </svg>
  );
}