import { Howl } from "howler";

export const beats = (preset: number) => {
  const src = "sounds/preset" + preset + "/";
  const main = new Howl({
    src: [src + "main.wav"],
    onplayerror: (e) => console.log(e),
  });
  const second = new Howl({
    src: [src + "second.wav"],
    onplayerror: (e) => console.log(e),
  });
  return { main, second };
};

export const buttonClick = new Howl({
  src: ["sounds/button_click.mp3"],
  onplayerror: (e) => console.log(e),
});

export const withSound: (...args: any[]) => any = (
  func: (...args: any[]) => any
) => () => {
  buttonClick.play();
  func();
};
