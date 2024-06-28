import { SVGProps } from "react";

const JoyentIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={21}
        height={21}
        fill="none"
        {...props}
    >
        <path fill="url(#joyent-icon-svg-pattern)" d="M0 0h21v21H0z" />
        <defs>
            <pattern
                id="joyent-icon-svg-pattern"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
            >
                <use xlinkHref="#joyent-icon-svg-image" transform="scale(.01)" />
            </pattern>
            <image
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE7ElEQVR4nO2d249fUxTHV2Zo6z+YPlD3eHFJ+kZIWm1RHosHJIL3PkjTiJZ5UURE+ihCZYow/0JDiFvQh+KlSEXKm0zd9TI1H1mZ9fD7oXou+5y9zjr7k8zL3PZe5ztz9t5rrb2WSKFQKBQKQQHWATcA9wJ7gdeBj4EvgGPACeC0fZywz+nXPrLv1Z+5x37Hutz2DA7gAmAjsBs4BJwkHcvAYeAZYAuwNre9LgFmga3AQeB3+uM3YMHEmZGxA2wAngV+ID/f23/OJTI2gMuB/cAp/HHG/muukegAVwBvAn/hn7PAG/rHI9EA1tginXKB7os/gfkwOzTgduAbhs/XwDYZ+PZVF8kV4rBia98aGRK6U7HDW1QO63ooQwC4E/iZ+PwEbBfPAA/YtnEsnAUeEY8AO4OtF1VRm+fFE7Z4j5194gE7XxRW2ZVbjPtH+po6F/osHsolxl3mzi5Mo5uaO3J4aZf+MZHC9Jb4sr7EuDD4oS8Vn/ZyojfXQaEaz/fhKMy1iL8FzDWY8xywmGnO+qy2dplskNNrO9di7ipKLr7qJHZvMYFsSPv55+TxNCpMR/qyBpekvQ25g1zpIo8Wds2KtLchN6+lEuNK82pmRYYviD7Dq1IIcgAHyPAFUV5qa8TFlqKZHYkhiLpVNrQxQpPYXCAxBFGebmrAjGXzuUDiCKJZmrNNDNiGIySOIMrmJgZo4rMbJJYgB5pkGvaZhT42QX5Vr3mdyd+CMySWIMpNg/FbjUSQvXUm/x7OkHiCvFN14hd5vLch8QQ5WSmj3i5HukPiCaJcW2Xiets1e6TPGx1FHu+uMvATiQcdvBgdRh73yPmwu93JkGCQloUqA36YckQJBml5v8qAX6YcUYJBWj6vMuB3KUeUYJCWb6sMmDRFVIJBWn6sMmDSCKEEg7ScqjJgEcSZIOWV5eyVVRZ1Z4t62fY62/Z+kHJECQYZDobFdeLMdaI1ClMSybm4vveseCsYmZLFCKKwKkZq9/uOKgOXAJWzAJXelCoh3H5CuNVuVgHv4gxpCf54u87kn8QZEk+QPXUmfzPOkHiC3Fg3lVSLDLtBYgnyS61UUjNAa9e6QWIJ8koTA7T0txskliCbml7YOY4TJNaFnZnBV4qTOII0rzxXLn06u/RporyMA6Ql+ODFVGU1sleOk+ELkqZwgBmjXQKyIsMX5Pyxj5ol/f7IaY20tyF38Zm0Jf86yIqvhbSff04eS6PCtEFrrWXDEAuYrc8476Od1V60YgK5SvwtNizx10Wkryr6rG7tRIwJA1/IZNwQea5TMSbKxGrTxsL/80lvjV+sYUsppHxutOPopb2IMSHKdg8HRoeoe+S2XsWYEOW+Uoz/X4v4g1nEmBBl1/ScRs2j4gF1Ked+Eg54Shy2PBpCB88uXlO7xSPW4GVMTcGWgYfFM9rMxLZ90VnKtptqeE5JWoDAGZ8NrmmxtV6dD7aurAyy9ep/pBNpy4ahc7RzR2FfmP9rp7dsyJrtu9P3AMmNRs20S4CH4v4Vd1AHW2eJDEiY/U4b3p+xNNqrZWxY3tc+JxmSx/W0rXOSsWNpq5uBV63IcJ9Z6NqOY1Pj9M7oALPARuuxeyjxa23ZmtNriuyWkAt117CaXHG9FozUa8S20GpxgyPAMTsxn7aPJfvcEfueBfuZHcB1RYBCoVAoSGD+Bmj1khnYtbPgAAAAAElFTkSuQmCC"
                id="joyent-icon-svg-image"
                width={100}
                height={100}
            />
        </defs>
    </svg>
);
export default JoyentIcon;
