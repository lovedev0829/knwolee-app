import { SVGProps } from "react";

const CircularArrowsIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path fill="url(#circular-arrows-icon-svg-pattern)" d="M0 0h24v24H0z" />
        <defs>
            <pattern
                id="circular-arrows-icon-svg-pattern"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
            >
                <use xlinkHref="#circular-arrows-icon-svg-image" transform="scale(.01)" />
            </pattern>
            <image
                xlinkHref="data:image/png;base64,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"
                id="circular-arrows-icon-svg-image"
                width={100}
                height={100}
            />
        </defs>
    </svg>
);
export default CircularArrowsIcon;
