import { Actor } from "./base/Actor";
import { Scene } from "./base/Scene";
import { Level } from "./level/level";

export class GameLogic extends Actor {
  private startTime: number;
  private startEnemyCount: number;
  constructor(name: string) {
    super(name);
    this.startTime = performance.now();
    this.startEnemyCount = 5;
    Scene.instance?.addActor(this);
  }

  createEnemys() {
    if (!Scene.gameOver && performance.now() - this.startTime > 5000) {
      this.startEnemyCount += 2;
      for (let i = 0; i < this.startEnemyCount; i++) {
        Level.initEnemy()
      }
      this.startTime = performance.now();
    }
  }

  tick() {
    super.tick([() => this.createEnemys()]);
  }
}