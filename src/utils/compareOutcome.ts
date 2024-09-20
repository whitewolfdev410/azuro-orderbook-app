type ComparableOutcome = {
  gameId?: string;
  conditionId?: string;
  outcomeId?: string;
};

const generateKey = (outcome: ComparableOutcome) => {
  return `${outcome.gameId}-${outcome.conditionId}-${outcome.outcomeId}`;
};

export default function compareOutcome(
  outcome1: ComparableOutcome,
  outcome2: ComparableOutcome
) {
  if (!outcome1) return false;
  if (!outcome2) return false;

  const key1 = generateKey(outcome1);
  const key2 = generateKey(outcome2);

  return key1 === key2;
}
