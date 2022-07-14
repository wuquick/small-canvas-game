import { Actor } from "../../base/Actor";

export class BoomEffect extends Actor {
  public duration: number;
  private initTime: number = 0;
  constructor(name: string, duration = 300) {
    super(name);
    this.duration = duration;
    this.initTime = performance.now();
  }

  autoDie() {
    if (performance.now() - this.initTime > this.duration) {
      this.die();
    }
  }

  tick() {
    super.tick([() => this.autoDie()]);
  }
}