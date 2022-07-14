interface Position {
  x: number,
  y: number
}
type Rotation = number
type Scale = Position
type Speed = Position

enum ComponentType {
  TRANSFORM,
  SPRITE,
  CONTROLLER,
  COLLIDER_2D,
  AUDIO_PLAYER
}

enum Action {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_TOP,
  MOVE_BOTTOM,
  ROTATE_LEFT,
  ROTATE_RIGHT,
  FIRE
}

enum Shape {
  SQUARE,
  CIRCLE
}

export {
  Position,
  Rotation,
  Scale,
  Speed,
  ComponentType,
  Action,
  Shape
}