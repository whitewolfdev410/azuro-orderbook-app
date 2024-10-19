'use client'
import BetslipButtonContent from "@/components/BetslipButton/BetslipButtonContent";
import { useBreakpoints } from "@/hooks";
import React, { useEffect } from "react";

export default function ClientBetSlipButtonContent() {
    const breakpoints = useBreakpoints();
    const [isOpen, setIsOpen] = React.useState(false)

    useEffect(() => {
        setIsOpen(breakpoints.isMinLg)
    })

    return (
        <BetslipButtonContent isOpen={isOpen} setIsOpen={setIsOpen} />
    )
}