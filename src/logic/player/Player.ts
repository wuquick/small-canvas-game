import { Action, ComponentType, Speed } from "../../../types/type";
import { Actor } from "../../base/Actor";
import { TransformComponent } from "../../base/components/Transform";
import { Scene } from "../../base/Scene";
import { SpriteImageComponent } from "../../base/components/SpriteImage";
import { PlayerControllerComponent } from "./PlayerController";
import { Level } from "../../level/level";
import { AudioPlayerComponent } from "../../base/components/AudioPlayer";

export class Player extends Actor {
  public speed: Speed;
  public shootFrequency: number;
  static instance: Player;
  private lastFireTime: number;
  constructor(name: string, speed: Speed, shootFrequency: number) {
    super(name);
    this.speed = speed;
    this.shootFrequency = shootFrequency;
    this.lastFireTime = 0;
  }

  tick() {
    super.tick([() => this.action()]);
  }

  die() {
    super.die();
    Scene.gameOver = true;
  }

  action() {
    const transform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    const scene = Scene.instance as Scene;
    const { width, height } = scene;
    const sprite = this.getComponent(ComponentType.SPRITE) as SpriteImageComponent;
    const controller = this.getComponent(ComponentType.CONTROLLER) as PlayerControllerComponent;
    controller.actions.forEach(val => {
      switch (val) {
        case Action.MOVE_TOP:
          transform.position.y -= this.speed.y;
          transform.position.y = transform.position.y < 0 ? 0 : transform.position.y;
          break;
        case Action.MOVE_BOTTOM:
          transform.position.y += this.speed.y;
          transform.position.y = transform.position.y > height - sprite.height ? height - sprite.height : transform.position.y;
          break;
        case Action.MOVE_LEFT:
          transform.position.x -= this.speed.x;
          transform.position.x = transform.position.x < 0 ? 0 : transform.position.x;
          break;
        case Action.MOVE_RIGHT:
          transform.position.x += this.speed.x;
          transform.position.x = transform.position.x > width - sprite.width ? width - sprite.width : transform.position.x;
          break;
        case Action.ROTATE_LEFT:
          transform.rotation -= 2 * Math.PI / 180;
          break;
        case Action.ROTATE_RIGHT:
          transform.rotation += 2 * Math.PI / 180;
          break;
        case Action.FIRE:
          this.fire();
          break;
      }
    })
  }

  fire() {
    const fireStart = performance.now();
    if (this.lastFireTime && fireStart - this.lastFireTime < this.shootFrequency) {
      return;
    }
    let bullet: Actor = Level.initPlayerBullet();
    const audioComp = this.getComponent(ComponentType.AUDIO_PLAYER) as AudioPlayerComponent;
    audioComp.play();
    this.addChildren(bullet);
    this.lastFireTime = fireStart;
  }
}