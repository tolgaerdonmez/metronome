export interface MetronomeReducerState {
  playing: boolean;
  bpm: number;
  currentBeat: number;
  beats: number;
  notes: number;
  preset: number;
  beatTimeout: NodeJS.Timeout | null;
}

export interface AppReducerState {
  focusMode: boolean;
}

export interface ReduxState {
  metronome: MetronomeReducerState;
  app: AppReducerState;
}
