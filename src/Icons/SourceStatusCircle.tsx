import { SVGProps } from "react";

const SourceStatusCircle = ({
    width = 12,
    height = 12,
    cx = 6,
    cy = 6,
    r = 6,
    fill = "#FFAB3F",
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        {...props}
    >
        <circle cx={cx} cy={cy} r={r} fill={fill} />
    </svg>
);
export default SourceStatusCircle;
