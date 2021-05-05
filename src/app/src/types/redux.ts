export interface TapBpm {
  startTime: number;
  endTime: number;
  count: number;
  focusMode: boolean;
}

export interface MetronomeReducerState {
  playing: boolean;
  bpm: number;
  currentBeat: number;
  beats: number;
  notes: number;
  preset: number;
  beatTimeout: NodeJS.Timeout | null;
  tapBpm: TapBpm;
}

export type AppShortcut = {
  title: string;
  shortcuts: { label: string; mapping: string }[];
};

export interface AppReducerState {
  focusMode: boolean;
  shortcuts: AppShortcut[];
  showShortcuts: boolean;
}

export interface ReduxState {
  metronome: MetronomeReducerState;
  app: AppReducerState;
}
