export const calculatePercentage = (current: number): string => {
  const percentage = Math.min(Math.max((current / 100) * 100, 0), 100);

  return `${Math.round(percentage)}%`;
};
