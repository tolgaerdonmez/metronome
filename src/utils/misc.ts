export const bpmToMs = (bpm: number): number => {
  const ms = 60000 / bpm;
  return ms;
};
