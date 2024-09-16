export default function compareOutcome(outcome1: any, outcome2: any) {
  if (!outcome1 || !outcome2) return false;
  const initKey = (outcome: any) => {
    return outcome.gameId + outcome.conditionId + outcome.outcomeId;
  };
  return initKey(outcome1) === initKey(outcome2);
}
