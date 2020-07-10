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

// export const mainBeat = new Howl({
//   src: ["sounds/Boutique808Stressed4.mp3"],
//   onplayerror: (e) => console.log(e),
// });
// export const secondBeat = new Howl({
//   src: ["sounds/Boutique8082.mp3"],
//   onplayerror: (e) => console.log(e),
// });

export const buttonClick = new Howl({
  src: ["sounds/button_click.mp3"],
  onplayerror: (e) => console.log(e),
});
