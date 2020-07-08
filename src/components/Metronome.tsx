import React, { Component } from "react";
import { mainBeat, secondBeat, buttonClick } from "../utils/sounds";
import "../sass/Metronome.scss";
import UIButton from "./UIButton";

const bpmToMs = (bpm: number): number => {
  const ms = 60000 / bpm;
  return ms;
};

interface Props {}

interface State {
  currentBpm: number;
  playing: boolean;
  beats: number;
  currentBeat: number;
}

class Metronome extends Component<Props, State> {
  state = { currentBpm: 60, playing: false, beats: 4, currentBeat: 0 };
  beatInterval: NodeJS.Timeout | null = null;

  componentDidMount() {
    window.ipcRenderer.on("beats:start-stop", () => {
      this.startStopHandler();
    });
    window.ipcRenderer.on("beats:change-speed", (_, v) => {
      this.setState(({ currentBpm }) => ({ currentBpm: currentBpm + v }));
      buttonClick.play();
    });
  }

  startStopHandler = () => {
    if (this.state.playing) this.stopBeats();
    else this.startBeats();
  };

  startBeats = (..._: any[]) => {
    if (!this.state.playing) this.setState({ playing: true });
    this.playBeat();
    this.beatInterval = setTimeout(() => {
      this.startBeats();
    }, bpmToMs(this.state.currentBpm));
  };

  stopBeats = (..._: any[]) => {
    if (this.beatInterval) {
      secondBeat.playing && secondBeat.stop();
      clearInterval(this.beatInterval);
      this.setState({ playing: false, currentBeat: 0 });
    }
  };

  playBeat = () => {
    this.incrementBeat();
    if (this.state.currentBeat === 1 || this.state.currentBeat === 0)
      mainBeat.play();
    else secondBeat.play();
  };

  incrementBeat = () => {
    const reset = this.state.currentBeat >= this.state.beats;
    this.setState(({ currentBeat }) => ({
      currentBeat: reset ? 1 : currentBeat + 1,
    }));
  };

  adjustBpm = (value: number) => {
    this.setState(({ currentBpm }) => ({ currentBpm: currentBpm + value }));
  };

  render() {
    const { currentBpm, playing } = this.state;

    return (
      <div className="metronome-container">
        <ul className="beats">
          {[...new Array(this.state.beats)].map((_, index) => (
            <li
              key={index}
              className={`beat ${
                index + 1 === this.state.currentBeat ? "beat-highlight" : ""
              }`}
            ></li>
          ))}
        </ul>
        <div className="bpm-input-container">
          <UIButton onClick={() => this.adjustBpm(-10)}>-</UIButton>
          <input
            value={currentBpm}
            onChange={(e) => {
              console.log(e.target.value);

              let v = Number(e.target.value);
              if (isNaN(v)) v = 60;
              this.setState({ currentBpm: v > 500 ? 500 : v });
            }}
          />
          <UIButton onClick={() => this.adjustBpm(10)}>+</UIButton>
        </div>
        {playing ? (
          <button className="startButton" onClick={this.stopBeats}>
            <span className="material-icons">pause</span>
          </button>
        ) : (
          <button
            className="startButton"
            onClick={this.startBeats}
            disabled={this.state.currentBpm <= 0}
          >
            <span className="material-icons">play_arrow</span>
          </button>
        )}
      </div>
    );
  }
}

export default Metronome;
