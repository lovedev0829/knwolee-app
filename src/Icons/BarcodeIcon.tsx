import { SVGProps } from "react";
const BarcodeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path
            fill="#D84C10"
            fillRule="evenodd"
            d="M6.2 4h-.039c-.527 0-.981 0-1.356.03-.395.033-.789.104-1.167.297a3 3 0 0 0-1.311 1.311c-.193.378-.264.772-.296 1.167C2 7.18 2 7.635 2 8.161V9a1 1 0 1 0 2 0v-.8c0-.577 0-.949.024-1.232.022-.272.06-.373.085-.422a1 1 0 0 1 .437-.437c.05-.025.15-.063.422-.085C5.25 6 5.623 6 6.2 6H7a1 1 0 1 0 0-2h-.8Zm11.6 16h.038c.528 0 .982 0 1.357-.03.395-.033.789-.104 1.167-.297a3 3 0 0 0 1.311-1.311c.193-.378.264-.772.296-1.167.031-.375.031-.83.031-1.356V15a1 1 0 1 0-2 0v.8c0 .577 0 .949-.024 1.232-.022.272-.06.372-.085.422a1 1 0 0 1-.437.437c-.05.025-.15.063-.422.085C18.75 18 18.377 18 17.8 18H17a1 1 0 1 0 0 2h.8ZM2 15.838V15a1 1 0 1 1 2 0v.8c0 .577 0 .949.024 1.232.022.272.06.372.085.422a1 1 0 0 0 .437.437c.05.025.15.063.422.085C5.25 18 5.623 18 6.2 18H7a1 1 0 1 1 0 2H6.161c-.527 0-.981 0-1.356-.03-.395-.033-.789-.104-1.167-.297a3 3 0 0 1-1.311-1.311c-.193-.378-.264-.772-.296-1.167C2 16.82 2 16.365 2 15.838ZM22 8.2v-.039c0-.527 0-.981-.03-1.356-.033-.395-.104-.789-.297-1.167a3 3 0 0 0-1.311-1.311c-.378-.193-.772-.264-1.167-.296A17.9 17.9 0 0 0 17.839 4H17a1 1 0 1 0 0 2h.8c.577 0 .949 0 1.232.024.272.022.372.06.422.085a1 1 0 0 1 .437.437c.025.05.063.15.085.422C20 7.25 20 7.623 20 8.2V9a1 1 0 1 0 2 0v-.8ZM7 9a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V9Zm4 0a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0V9Zm5-1a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1Z"
            clipRule="evenodd"
        />
    </svg>
);
export default BarcodeIcon;
