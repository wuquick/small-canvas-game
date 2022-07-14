import { Actor } from "./Actor";

export class Scene {
  public width: number;
  public height: number;
  static instance: Scene | null;
  static ctx: CanvasRenderingContext2D;
  private actorMap: Map<string, Set<Actor>>;
  static gameOver: boolean;
  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    if (Scene.instance) {
      return Scene.instance;
    }
    Scene.ctx = ctx;
    this.width = width;
    this.height = height;
    this.actorMap = new Map();
    Scene.instance = this;
    Scene.gameOver = false;
    this.tick();
  }
  addActor(actor: Actor) {
    if (this.actorMap.has(actor.name)) {
      this.actorMap.get(actor.name)?.add(actor);
    } else {
      const set = new Set<Actor>();
      set.add(actor);
      this.actorMap.set(actor.name, set);
    }
  }
  getActors(name: string): Set<Actor> {
    return this.actorMap.get(name) || new Set<Actor>();
  }

  tickActors(actors: Set<Actor>) {
    actors.forEach((actor) => {
      if (actor.children.size) {
        this.tickActors(actor.children);
      }
      actor.tick();
    });
  }

  tick() {
    Scene.ctx.clearRect(0, 0, this.width, this.height);
    this.actorMap.forEach((actors) => {
      this.tickActors(actors);
    });
    requestAnimationFrame(() => {
      this.tick();
    });
  }
}
