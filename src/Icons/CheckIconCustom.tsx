interface Props {
    fill?: string
}

function CheckIconCustom({ fill = "#4386F4" }: Props) {
    return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="check">
                <path id="Solid" fillRule="evenodd" clipRule="evenodd" d="M21.0406 5.29289C21.4311 5.68342 21.4311 6.31658 21.0406 6.70711L10.0406 17.7071C9.65008 18.0976 9.01691 18.0976 8.62639 17.7071L3.62639 12.7071C3.23586 12.3166 3.23586 11.6834 3.62639 11.2929C4.01691 10.9024 4.65008 10.9024 5.0406 11.2929L9.3335 15.5858L19.6264 5.29289C20.0169 4.90237 20.6501 4.90237 21.0406 5.29289Z" fill={fill} />
            </g>
        </svg>
    )
}

export default CheckIconCustom