import { ComponentType } from "../../../types/type";
import { Actor } from "../Actor";

export class Component {
  private actor: Actor;
  public name: ComponentType;
  constructor(actor: Actor, name: ComponentType) {
    this.name = name;
    actor.addComponent(this);
  }
  setActor(actor: Actor) {
    this.actor = actor;
  }
  getActor() {
    return this.actor;
  }
  tick() {}
}