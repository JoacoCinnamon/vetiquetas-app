import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg viewBox="0 0 446 434"
            {...props}
        >
            <path fill="#f44f5e" d="M-.5-.5h446v434H-.5V-.5Z" />
            <path fill="#254769" d="M16.5 11.5h412v410h-412v-410Z" />
            <path fill="#f4505e"
                d="M126.5 96.5c11.754-.632 23.254.035 34.5 2a41491.593 41491.593 0 0 0 57.5 193 20934.428 20934.428 0 0 0 57.5-194c11.105-1.32 22.272-1.32 33.5 0a67772.828 67772.828 0 0 0-76 245l-16 1c-5.746-.026-11.246-.693-16.5-2a34418.73 34418.73 0 0 1-74.5-245Z" />
        </svg>
    );
}
