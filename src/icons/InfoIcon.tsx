import type { SVGProps } from "react";

export default function InfoIcon(props: Readonly<SVGProps<SVGSVGElement>>) {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1f2937"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12" stroke-width="2"/>
        <line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2"/>
    </svg>
}
