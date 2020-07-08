import { Howl } from "howler";

export const mainBeat = new Howl({
  src: ["sounds/Boutique808.mp3"],
  onplayerror: (e) => console.log(e),
});
export const secondBeat = new Howl({
  src: ["sounds/tick.mp3"],
  onplayerror: (e) => console.log(e),
});
export const buttonClick = new Howl({
  src: ["sounds/button_click.mp3"],
  onplayerror: (e) => console.log(e),
});
