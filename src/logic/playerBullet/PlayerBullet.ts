import { ComponentType, Speed } from "../../../types/type";
import { Actor } from "../../base/Actor";
import { SpriteComponent } from "../../base/components/Sprite";
import { TransformComponent } from "../../base/components/Transform";
import { Scene } from "../../base/Scene";

export class PlayerBullet extends Actor {
  private speed: number;
  private realSpeed: Speed;
  static bulletPool: Set<PlayerBullet>;
  constructor(name: string, speed: number) {
    super(name);
    this.speed = speed;
    this.realSpeed = { x: 0, y: -this.speed };
    PlayerBullet.bulletPool = new Set();
  }
  init(parent: Actor) {
    super.init(parent);
    const transform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    this.realSpeed.x = this.speed * Math.sin(transform.rotation);
    this.realSpeed.y = -this.speed * Math.cos(transform.rotation);
  }

  move() {
    const transform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    transform.position.x += this.realSpeed.x;
    transform.position.y += this.realSpeed.y;
    const scene = Scene.instance as Scene;
    const { width, height } = scene;
    const { x, y } = transform.position;
    if (x < 0 || x > width || y < 0 || y > height) {
      this.die();
      PlayerBullet.bulletPool.add(this);
    }
  }

  tick() {
    super.tick([() => this.move()]);
  }
}