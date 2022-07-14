import { ComponentType, Position, Rotation, Scale } from "../../../types/type";
import { Component } from "./Component";
import { PlayerBullet } from "../../logic/playerBullet/PlayerBullet";
import { Actor } from "../Actor";


export class TransformComponent extends Component {
  public position: Position;
  public rotation: Rotation;
  public scale: Scale;
  constructor(actor: Actor, position: Position = { x: 0, y: 0 },rotation: Rotation = 0,scale: Scale = { x: 1, y: 1 }) {
    super(actor, ComponentType.TRANSFORM);
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }
}
