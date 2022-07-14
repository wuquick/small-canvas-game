import { ComponentType } from "../../../types/type";
import { Actor } from "../Actor";
import { Component } from "./Component";
import { TransformComponent } from "./Transform";

export class Collider2DComponent extends Component {
  private width: number;
  private height: number;
  constructor(actor: Actor, width: number, height: number) {
    super(actor, ComponentType.COLLIDER_2D);
    this.width = width;
    this.height = height;
  }

  onCollision(actor: Actor, callback: Function) {
    const collision = actor.getComponent(ComponentType.COLLIDER_2D) as Collider2DComponent;
    const transform = actor.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    if (!collision || !transform) {
      return;
    }
    const selfTransfrom = this.getActor().getComponent(ComponentType.TRANSFORM) as TransformComponent;
    const { x: ax, y: ay } = transform.position;
    const { width: aw, height: ah } = collision;
    const { x: sx, y: sy } = selfTransfrom.position;
    const { width: sw, height: sh } = this;

    // 判断两个碰撞矩形是否相交
    const insertRect: number[] = [
      Math.max(ax, sx),
      Math.max(ay, sy),
      Math.min(ax + aw, sx + sw),
      Math.min(ay + ah, sy + sh)
    ]

    if (insertRect[0] > insertRect[2] || insertRect[1] > insertRect[3]) {
      return;
    } else {
      callback();
    }
  }
}