import { ComponentType } from "../../../types/type";
import { Actor } from "../Actor";
import { Scene } from "../Scene";
import { Component } from "./Component";
import { TransformComponent } from "./Transform";

export class SpriteComponent extends Component {
  public visible: boolean;
  constructor(actor: Actor) {
    super(actor, ComponentType.SPRITE);
    this.visible = true;
  }
  draw(callback?: Function) {
    if (this.visible && callback) {
      const transform = this.getActor().getComponent(ComponentType.TRANSFORM) as TransformComponent;
      const { x, y } = transform.position;
      Scene.ctx.save();
      Scene.ctx.translate(x, y);
      Scene.ctx.rotate(transform.rotation);
      Scene.ctx.beginPath();
      callback();
      Scene.ctx.restore();
    }
  }
  tick() {}
}