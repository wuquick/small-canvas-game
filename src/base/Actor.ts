
import { ComponentType } from "../../types/type";
import { Component } from "./components/Component";
import { SpriteComponent } from "./components/Sprite";
import { TransformComponent } from "./components/Transform";
import { Scene } from "./Scene";

export class Actor {
  public name: string;
  private componentMap: Map<ComponentType, Component> = new Map();
  public children: Set<Actor> = new Set();
  public parent: Actor | null = null;
  public isDie: boolean = false;
  constructor(name: string) {
    this.name = name;
  }

  addComponent(component: Component) {
    component.setActor(this);
    this.componentMap.set(component.name, component);
  }

  getComponent<T>(name: ComponentType) {
    const component = this.componentMap.get(name);
    return component || null;
  }

  getChildren(name: string) {
    let res: Actor[] = [];
    this.children.forEach(c => {
      if (c.name === name) {
        res.push(c);
      }
    })
    return res;
  }

  tick(fns?: Function[]) {
    if (!this.isDie) {
      fns && fns.forEach(fn => fn());
      this.componentMap.forEach(comp => comp.tick());
    }
  }

  die() {
    if (this.parent) {
      this.parent.children.delete(this);
      this.parent = null;
    }
    this.isDie = true;
  }

  init(parent: Actor) {
    const parentTransform = parent.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    const selfTransform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    selfTransform.position.x += parentTransform.position.x;
    selfTransform.position.y += parentTransform.position.y;
    selfTransform.rotation += parentTransform.rotation;
  }

  addChildren(actor: Actor) {
    this.children.add(actor);
    actor.parent = this;
    actor.init(this);
  }
}