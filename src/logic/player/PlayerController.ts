import { Action, ComponentType } from "../../../types/type";
import { Actor } from "../../base/Actor";
import { Component } from "../../base/components/Component";

export class PlayerControllerComponent extends Component {
  public actions: Set<Action>;
  constructor(actor: Actor) {
    super(actor, ComponentType.CONTROLLER);
    this.actions = new Set();
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      switch (e.key.toLocaleLowerCase()) {
        case 'arrowup':
          this.actions.add(Action.MOVE_TOP);
          break;
        case 'arrowdown':
          this.actions.add(Action.MOVE_BOTTOM);
          break;
        case 'arrowleft':
          this.actions.add(Action.MOVE_LEFT);
          break;
        case 'arrowright':
          this.actions.add(Action.MOVE_RIGHT);
          break;
        case 'z':
          this.actions.add(Action.ROTATE_LEFT);
          break;
        case 'c':
          this.actions.add(Action.ROTATE_RIGHT);
          break;
        case 'x':
          this.actions.add(Action.FIRE);
          break;
      }
    });
    document.addEventListener('keyup', (e) => {
      switch (e.key.toLocaleLowerCase()) {
        case 'arrowup':
          this.actions.delete(Action.MOVE_TOP);
          break;
        case 'arrowdown':
          this.actions.delete(Action.MOVE_BOTTOM);
          break;
        case 'arrowleft':
          this.actions.delete(Action.MOVE_LEFT);
          break;
        case 'arrowright':
          this.actions.delete(Action.MOVE_RIGHT);
          break;
        case 'z':
          this.actions.delete(Action.ROTATE_LEFT);
          break;
        case 'c':
          this.actions.delete(Action.ROTATE_RIGHT);
          break;
        case 'x':
          this.actions.delete(Action.FIRE);
          break;
      }
    })
  }
}