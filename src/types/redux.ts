export interface MetronomeReducerState {
  playing: boolean;
  bpm: number;
  currentBeat: number;
  beats: number;
  notes: number;
  preset: number;
}

export interface ReduxState {
  metronome: MetronomeReducerState;
}
