import { SVGProps } from "react";

const ExpandIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path fill="url(#expand-icon-svg-pattern)" d="M0 0h24v24H0z" />
        <defs>
            <pattern
                id="expand-icon-svg-pattern"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
            >
                <use xlinkHref="#expand-icon-svg-image" transform="scale(.01)" />
            </pattern>
            <image
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADnklEQVR4nO2d7W7TMBSGvY0rAVHY0FTEh8pNo/E1rQWkckPQsQIbBelFRkZCU1Pbx+ekdvI+Uv+1PsfniZ00cRLnCCGEEEIIIYQQ0iCw4yuA1wBO9ti3RwDehFxMsEjamjWAU/XE4/06DbFNsUi8Dxbqicf79b6Pjlkk3gcbAEfqyXf36SjENMci+T7YUEhdQubqW1K8X5yyOrjiTj1vS7JiBeAMwLHdOIj27QTAq5CLCRZJS7gE8MINBABPAXxpWchgpKBARm1CmpeCQhk1CmlWChRk1CqkOSlQkuGxSC6l2Ej83sxVDoBZZp92YpFgjCcAPg9hpCBvZPzdwGJfskgyGnAIUiCQkVof7USTArYsBUIZOfXRTDY5YItSUCAjtz5aCWcFbEkKCmVI6qORdHbAFqRAQYa0PqWJiwLWLAVKMkrqU5K8OGCNUqAoo7Q+0g7s+vOzSvh9NVKgLEOjPpJO+KU6XZwZ/fudGfTDJAeN+kgu4qw7rvQlr6napxQYxtaqj2QN0wLAz/BZSNZS7UMKeoipVR/p8pmi5Tp9SkHPG4BGffZCZqFWACaCGA8yrpU3cSa6JilvBe2fU0Z+0VIPiW9ypoIwdfi5nCPDSMomU8gdAL8ibXKaKpi+lgLRnyijXMpqSxGvATwTtPc8/PY2Psa4d+CpAJj4HXjYZ/gpZymRcUvKMrR1E27Oua+b9QgAcKh5PB928oda7RFCCCGEEEIIIYTsEQAHNbc3GgAch9uUL8OZ2jmAaUF7j0Mb1+GClT9x+VA36/Gdfl9LpAQZ25bn8PS7wgWqC4EQPzK64NXCAhkIU85B5un7bRen/odShDI83wUj5AfiUIpAhuelQIh/jkoKlCJYKHdXIOTe4BfKheU1XEpqWJ+cxQcfAPwOn4/+sFLQzlAXW0806pMabNpxPJ/1NNEB344w1aiP1hrZd4ltDPmGnfPS+uR25NuOgOsWZFjmUlqfbGJZ931PXyna9zyW1EfaAVHAGmVYSJHWR4wkYM0ytKVI6lNEbsAWZGhKya1PMTkBW5KhJSWnPiqkBmxRhoaU1PqokRKwZRmlUlLqo0pCcs3LKJES+5LTJjGx5mUM6SGYg5EhHCk7cdqMTYa2FKfNGGVoSnHajFWGlhSnzZhlaEhxlQhJge8xrEzIP9Z85VFdQjx8j2FlQjZ8bR6FbPrY0lodIXP1xOP94nsMO7jiTj1vS7KC7zEkhBBCCCGEEEKIq5M/KOek3hxfg5wAAAAASUVORK5CYII="
                id="expand-icon-svg-image"
                width={100}
                height={100}
            />
        </defs>
    </svg>
);
export default ExpandIcon;
