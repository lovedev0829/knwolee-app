import { SVGProps } from "react";

const ReduceHeightIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <path fill="url(#reduce-height-icon-svg-height-pattern)" d="M0 0h20v20H0z" />
        <defs>
            <pattern
                id="reduce-height-icon-svg-height-pattern"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
            >
                <use xlinkHref="#reduce-height-icon-svg-image" transform="scale(.01)" />
            </pattern>
            <image
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACx0lEQVR4nO3cwWrUQADG8VlwrSB43j27PSv2XbR30VfoyfoOQh+hSxEvghi9lFVowTexRw96q38dzepSkpikJPOt8/0hUJbSTeZHtrvZyYRQBsyBPW+kGIP52mGN8Rz4jktVHPvDzTPDGOm7BGYRZDf1nrg/LSLIBHj39zGXqLfRYv2yNQUeAgdbti0rDmwpsF9dtzj2N8K2B+xXgOyn3q9swyBaYRCtMIhWGEQrDKIVBtEKg2iFQbTCIFphEK0wiFYYRCsMohUG0QqDaIVBtMIggwzqAvgEfAWOgTtjgcTnAk6Ab8DZr0kGuQecXhnQ87Yo1wEpMeJzbfYx5B5wUTGo521Q+oLUYMQ+h9wDjioGphVKH5AGjNiLkHvATeB1HxQ6ggC3gQ81z1UAtwY70BxQ6ABijBFQaAlijJFQaAFijBFR+AeIMUZGoQHEGAlQqAExRjqUpxWPP/Zb2wEDdoA3NShfWj5G+Td2htzXbKL5TGmTP/QJoRT+BK6DUhhDB6Uwhg5KYQwdlMIYad8Sv9zAiD/7rW3qgPvAvdT74ZxzzjnnnHPOOScY8MCXTnQuLr7yxUWB8OV3nfAXVDrhr3B1wpMcdMLTgHTCE+V0wlNJt2qy9ZOaydYrTw/Sux1hZZQRMUK7G3aMMhZGh1vajCJ40+fKL18DY/S4LdooggsHrHymDIRxjaU1jNJUXPClD8ZAi88chdyLSyL1wRhoeaaLkHtx0bA+GAMtYHYacq9c4u+sXGbvJMESf8fl8oJxH+72PhAXvAimWnhVUq0wiFYYRCsMohUG0QqDaIVBtMIgWmEQrTCIVhhEKwyiFQbRCoNohUG0wiBa8b+CAFPgEXCwZduyAmQpsF9dtzj20zXGBHhfcWBu3OLinZMIsjvyE7v6FhFkDlw2/JIbp2gwW79sHRolOcazq//YZ8CeN1KMwe8z4yfEDx8wdEbgVBznAAAAAElFTkSuQmCC"
                id="reduce-height-icon-svg-image"
                width={100}
                height={100}
            />
        </defs>
    </svg>
);
export default ReduceHeightIcon;
