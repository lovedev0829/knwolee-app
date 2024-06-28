import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
    pathFill?: string;
}

const LogIn04AltIcon = ({ pathFill = "#0C0D0D", ...svgProps }: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...svgProps}
    >
        <path
            fill={pathFill}
            d="M2.134 14.477c-.117-.454-.175-.681-.1-.925a.994.994 0 0 1 .4-.51c.22-.133.491-.133 1.035-.133h9.896l-2.103 2.084a.903.903 0 0 0 0 1.286.923.923 0 0 0 1.297 0l3.67-3.636a.903.903 0 0 0 0-1.286l-3.67-3.636a.923.923 0 0 0-1.297 0 .903.903 0 0 0 0 1.285l2.103 2.085H3.47c-.544 0-.815 0-1.035-.132a.994.994 0 0 1-.4-.511c-.075-.244-.017-.47.1-.925C3.245 5.198 7.2 2 11.91 2 17.483 2 22 6.477 22 12s-4.517 10-10.09 10c-4.709 0-8.665-3.198-9.777-7.523Z"
        />
    </svg>
);
export default LogIn04AltIcon;
