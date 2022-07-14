import { ComponentType } from "../../../types/type";
import { Actor } from "../Actor";
import { Component } from "./Component";

export class AudioPlayerComponent extends Component {
  public audio: HTMLAudioElement;
  constructor(actor: Actor, src: string, loop: boolean = false) {
    super(actor, ComponentType.AUDIO_PLAYER);
    this.audio = document.createElement('audio');
    this.audio.src = src;
    this.audio.loop = loop;
  }
  play(src?: string) {
    if (src) {
      this.audio.src = src;
    }
    Promise.resolve().then(() => {
      this.audio.play();
    })
  }
}