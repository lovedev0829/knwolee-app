import { SVGProps } from "react";
const AroundTheGlobeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={25}
        height={25}
        fill="none"
        {...props}
    >
        <path fill="url(#a)" fillOpacity={0.7} d="M0 0h25v25H0z" />
        <defs>
            <pattern
                id="a"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
            >
                <use xlinkHref="#b" transform="scale(.01)" />
            </pattern>
            <image
                xlinkHref="data:image/png;base64,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"
                id="b"
                width={100}
                height={100}
            />
        </defs>
    </svg>
);
export default AroundTheGlobeIcon;
