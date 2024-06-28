import { SVGProps } from "react";

const CryptoTradingMarginIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path fill="url(#crypto-trading-margin-pattern)" d="M0 0h24v24H0z" />
        <defs>
            <pattern
                id="crypto-trading-margin-pattern"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
            >
                <use xlinkHref="#crypto-trading-margin-image" transform="scale(.01)" />
            </pattern>
            <image
                xlinkHref="data:image/png;base64,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"
                id="crypto-trading-margin-image"
                width={100}
                height={100}
            />
        </defs>
    </svg>
);
export default CryptoTradingMarginIcon;
