import { SVGProps } from "react";

const FantasyIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path fill="url(#fantasy-icon-svg-pattern)" d="M0 0h24v24H0z" />
        <defs>
            <pattern
                id="fantasy-icon-svg-pattern"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
            >
                <use xlinkHref="#fantasy-icon-svg-image" transform="scale(.01)" />
            </pattern>
            <image
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE60lEQVR4nO2dWahVVRiAl1Zem2hAKxokJCS0kiyMJuqhCbIoEonASkgqn2wiwgorjHpoeAiiIqwIGqAgiQYIessByqIybHgoRNK0bj00mX6xuP/G5fbsc/Y5e++111r7/+C83bvXv8531njW+ZcxiqIoiqIoiqIoilInwPnAc/Ka3vS7CyyWssaaLitKgJXs5SIP5X0oZZ3adFlRArzqCFnqobwfpKyrmy4rSoD1jpDHGy7rRGCPp7IOlO7xHuCKKLpIYDIw7ghZ03B5Tztl/Qwc01A5Y8C77MtPwG3AFBMqwPxc0DuaCJiJN+ghp3VkfFr3WFIgw2UzcKYJEeCNHgHfWtOzbwCeAt4D/ujzBllJnwGrgRXA8Q3KyPgLWGZCAri5IFjbhZ1Ww/M3MhoXNyzD5QnTNhK4neru7hPoTmBhxXLmifRVwLo+ZW0DXgSWA1cCh3uSkfFklXoOG+gBwMnApcDtwAvA9iGC3WQ/RcAS4ALg2AqxXCtdhcubwGEV61hFRsaqKjGUDfQI4G/qZ12FmO5wnvMNMNWDjPxEouhvFlSJpUywR9IMGyvG9K88Z4UHGb9Iy/68RL3sDHNGlZgGBXywdFEfA1sqStgFfAe8D9xXMa5N8szLPciY6yxIy7wHb1ep27CVOBQ4T6aif5YIzlbgbmAOcFCNcayR58/0IcP5v7nSCgZ1Xf7XKMAs4Ns+gb0zymynDMBlwL12a8OXjFy9bUvvx+umDWT29VuPgNaGuL1ARRnOc6ZJHYsY91er/YOzn9Q8Z5tEZViAk5wd56Juq50PJHBcLpivTbdlWD7wU7PiIH9kLy+bbsvYYKfmfmpXHOhHTkCV1gZ1YrsNmVz041fgrJIyvh/wLLvzfLRpG+BZJ6hFJgDoqgwLcJcT2LwA4pnSWRnOwH6JvMYiGTPOSGbMCBW63jJCApURDqiMcEBlhAMqIxxQGeGAyggHVEZ0MrYPsejTdUbDK/AdugIPp2VY/hn0EwVtGf5kDJSiMvzLKJSiMtqTsZ8UlVFdxlgNZ22RY7BLdQu93ZYxLLqFrjIiAG0Z4YDKCAdURjiojIBQGQGhMgJCZQSEyggIlREQKiMgVEaau7Zlqf3gM3CU85psYiWFlgFMD/23k52RYQHOzZVzvYmNVGRYgBtzZT1gYiIlGRbg4Vx5Qf2gtVMyLMBruTI/MTGQwmyqF8CXPTLlhT3TSljGCQUZ884xoZKqDIukFezFKyZEEpcxu0cqwYzdPtKpD0XiMmaUOBVvT9ifbkIgcRnXSbbsMvwO3NLqIJ+SDCayrc60aQKBB4GvRozRJhZ4FLhKkpv5ScuUggxggdRhs5z9bYJdIsleqbGkzviTW/Sx7z0nPlhtGqjEpNz9IDHvTa0kASHXpDKAk0KXlUtO1iQbfGbVyQ3q9wNfjBi3zVD6iJdBXbqrJlKNB5niiIneYGvJmMcln/0knwEeQkdkZMivrQbl5bW3McwxbSALoE7IyLA39vTJ3G23Ti40bQG81SUZGTIu9OIl0ybyvfKeLsmw2GuTCrbf55u2kcu4OiMjii+ogMe69gNLQv8Kt6KUqGREc8hhRCnRyYjqGNCQUqKUEdVBOVnB21t2BrE+lgE8iaOkco2eew9uxn/A83albyKH2A5bS6A3SYt5BrgTOKXtuBRFURRFURRFURTFxML/qwC9qlFozYAAAAAASUVORK5CYII="
                id="fantasy-icon-svg-image"
                width={100}
                height={100}
            />
        </defs>
    </svg>
);
export default FantasyIcon;
