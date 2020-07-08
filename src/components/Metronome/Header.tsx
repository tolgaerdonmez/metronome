import React, { Component, ChangeEvent } from "react";
import "../../sass/Metronome/Header.scss";

import { connect, ConnectedProps } from "react-redux";
import { ReduxState } from "../../types/redux";
import {
  start,
  stop,
  setBpm,
  incrementBeat,
} from "../../store/actions/metronome";
import UIButton from "../UIButton";
import { mainBeat, secondBeat } from "../../utils/sounds";
import { bpmToMs } from "../../utils/misc";

const mapState = (state: ReduxState) => ({ ...state.metronome });

const mapDispatch = { start, stop, setBpm, incrementBeat };

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

class Header extends Component<Props> {
  beatInterval: NodeJS.Timeout | null = null;

  componentDidMount() {
    console.log(this.props.bpm);
  }

  handleBpmChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = Number(e.target.value);
    if (isNaN(v)) v = 60;
    this.props.setBpm(v > 500 ? 500 : v);
  };

  adjustBpm = (value: number) => {
    const { bpm, setBpm } = this.props;
    setBpm(bpm + value);
  };

  togglePower = () => {
    const { playing, start, stop } = this.props;
    if (playing) {
      this.stopBeats();
      stop();
    } else {
      this.startBeats();
      start();
    }
  };

  startBeats = () => {
    this.playBeat();
    this.beatInterval = setTimeout(() => {
      this.startBeats();
    }, bpmToMs(this.props.bpm));
  };

  stopBeats = () => {
    if (this.beatInterval) {
      secondBeat.playing && secondBeat.stop();
      clearInterval(this.beatInterval);
    }
  };

  playBeat = () => {
    this.props.incrementBeat();
    const { currentBeat } = this.props;
    if (currentBeat === 1 || currentBeat === 0) mainBeat.play();
    else secondBeat.play();
  };

  render() {
    const { bpm, playing } = this.props;
    return (
      <div className="header-container">
        <button
          className={`power-button ${playing ? "power-button-on" : ""}`}
          onClick={this.togglePower}
        ></button>
        <div className="bpm-controller-container">
          <input type="text" value={bpm} onChange={this.handleBpmChange} />
          <div>
            <UIButton onClick={() => this.adjustBpm(10)}>+</UIButton>
            <UIButton onClick={() => this.adjustBpm(-10)}>-</UIButton>
          </div>
        </div>
        <UIButton className="tap-bpm-button">Tap BPM</UIButton>
      </div>
    );
  }
}

export default connector(Header);
