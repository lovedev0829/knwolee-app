import { FC } from "react";

const MediumIcon: FC<{ fill?: string; height?: string; width?: string }> = ({
    fill = "red",
    height = "24px",
    width = "24px",
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0,0,256,256"
            width={width}
            height={height}
        >
            <g
                fill={fill}
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
            >
                <g transform="scale(4,4)">
                    <path d="M18.99805,15c-9.37431,0.02204 -16.96202,7.62762 -16.96202,17.00195c0,9.37434 7.58771,16.97991 16.96202,17.00195c9.37431,-0.02204 16.96202,-7.62762 16.96202,-17.00195c0,-9.37434 -7.58771,-16.97991 -16.96202,-17.00195zM45.49805,16c-4.68747,0.02138 -8.48139,7.17943 -8.48139,16.00195c0,8.82252 3.79393,15.98057 8.48139,16.00195c4.68747,-0.02138 8.48139,-7.17943 8.48139,-16.00195c0,-8.82252 -3.79393,-15.98057 -8.48139,-16.00195zM58.5,17c-1.25251,-0.01344 -2.41123,2.84297 -3.03839,7.49012c-0.62716,4.64714 -0.62716,10.37654 0,15.02368c0.62716,4.64714 1.78588,7.50355 3.03839,7.49012c1.25251,0.01344 2.41123,-2.84297 3.03839,-7.49012c0.62716,-4.64714 0.62716,-10.37654 0,-15.02368c-0.62716,-4.64714 -1.78588,-7.50355 -3.03839,-7.49012z"></path>
                </g>
            </g>
        </svg>
    );
};

export default MediumIcon;
