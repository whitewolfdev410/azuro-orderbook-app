import { ExploreContext } from "@/contexts";
import { use, useContext } from "react";
import BetInfo_ from "@/components/BetInfo/Betinfo_";

export default function BetInfo({ ignoreChartSelected = false }: { ignoreChartSelected?: boolean }) {
    const { isBetInfoOpen, isChartSelected } = use(ExploreContext)
    const { outcomeSelected } = useContext(ExploreContext)
    if (!outcomeSelected) {
        return null
    }
    return <BetInfo_ isBetInfoOpen={isBetInfoOpen} isChartSelected={isChartSelected} outcomeSelected={outcomeSelected} ignoreChartSelected={ignoreChartSelected} />
}