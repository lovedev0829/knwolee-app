import { SVGProps } from "react";

const MinusRoundedIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <path fill="url(#minus-rounded-icon-svg-pattern)" d="M0 0h20v20H0z" />
        <defs>
            <pattern
                id="minus-rounded-icon-svg-pattern"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
            >
                <use xlinkHref="#minus-rounded-icon-svg-image" transform="scale(.01)" />
            </pattern>
            <image
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEUklEQVR4nO2dx4sVQRCH27Tu/2COJ8PBi4LiGla8m/Xg3YCKimBCTCyIBy8imJ/hn1DwYBYPBlQ8KOpVdzHuumv4pLHAJ646815PT093ffAuL+zUzG/p6q6uqjZGURRFUSIFaAWmAkuBncAF4CbwAHgGdAG98uqS9+xnN4Dz8psl8jeGln0/lQMYDEwDtgGXgB7c8QW4C3QA81Wgv4swEJgHnAXe4493wGlgjrXBpA4wAjgIvKJ8XgIHgOEmNYAxwBHHw5Er+oAaMNEkIoR1yl8Jny/AOWCUiQ1gCLAB+ED16Ab2RDMBkNnMU6rPE2Cuqfj01f5nfSMevovvazEVnD1dJ17uWH9oqgCwUFbMsfMGaDchA6ySaWMq9AIrTIgA6yPzF3n8yhYTEsDezObHyx4TAsDasp9EQGwqW4yViQ5T/xq+Vpc5m0rJgedx9O1lrDPstE/pny5vMTCJS8W86HPFLfusfAhy2JnJ8dPhI1BoHZeSDfus2ooSo0Uinko+nhYSugd25TRE+cU212KMAj7WXUDJxydgtEtBLuY0QPmTs67EGCf7y0pz2DyC8S4EOdGkIcovjrlYkdtQgOIGG2oa2YwgNolNccv+ZtI7Q8gojI0XDaWtyqpcKYb8q3dJfFaK4WQjYRKfWeip8S5XJBiYVbbFCTAjjyC7y7Y2AXbkEeRK2dYmwOU8NX2fy7Y2AXoyheWlOFLxw6QsgthqV8UPi7IIog49JMcuJWeKH2pZBNEUH39czSLIQ48Gpc79LILYaKTih+dZBOks4sqm4lAMr7NcuJAdQlNxKIbPWS6sggQmiA5ZgQ1Z6tQDc+o67Q1s2nvNo0GpczWLILYtnhJKeqlmuXtlexZBNPweWPhdN6gC26BqDbT1Xmx0Z66s0iQHL1zKJIYIoruGITj0OkFmejAodabnbQ6gqaTF8da2QMwsiIhypkCDUudELjFEENv6WymG2Y0IogU7IRXsiCha0uaefQ2JIYIM16JPp9ic6WENCyKiHHdrU9IcbUoMEWSsNg5wVhLtpvmy7pE44bQTMUSQkdp8punmM25b/tlM7eZsSpqtTsWoq8x9XPadVZBHhfVetOdnaIu/XHxraFWeU5RD+WxKmoOFilF3UIumCv2fm17axIoo2kj533R6P0wMWKCtxvvFJqvP8ypGnSjLtRn/H058WSli1Imy5nebkmajCQE5jS11dpuQANYlOnx9BzabEJEDXvoSc+DLTcjI7CuFs0VelzabanCdEvPi8bbT1uE+iPzo1SGmqgBzIjnm4lHhgUJfVPz47k9RHd/dz7EXtYrs0fdJ9uYIEzvWIcpY3BPoVLYGTDCpIXlf+4GXgWQU7ms6byoGJG21DTglTYZ9ZqGftM4aGFD2cwgSYBAwzZ7bZKuMpPTLFd2yPuqQ3vYtZd9v5eBncsUUYLFkvtTkod4DnslmUK+8OuW9e/Id+93t8tvJKoCiKIpiIuYHu2UvdfK13i8AAAAASUVORK5CYII="
                id="minus-rounded-icon-svg-image"
                width={100}
                height={100}
            />
        </defs>
    </svg>
);
export default MinusRoundedIcon;
