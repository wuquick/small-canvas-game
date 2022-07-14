import { ComponentType, Speed } from "../../../types/type";
import { Actor } from "../../base/Actor";
import { AudioPlayerComponent } from "../../base/components/AudioPlayer";
import { Collider2DComponent } from "../../base/components/Collider2D";
import { SpriteImageComponent } from "../../base/components/SpriteImage";
import { TransformComponent } from "../../base/components/Transform";
import { Scene } from "../../base/Scene";
import { Level } from "../../level/level";
import { PlayerBullet } from "../playerBullet/PlayerBullet";

export class Enemy extends Actor {
  private speed: Speed;
  static enemyPool: Set<Enemy>;
  private lastFireTime: number;
  private frequency: number;
  constructor(name: string, speed: Speed, frequency: number) {
    super(name);
    this.speed = speed;
    this.frequency = frequency;
    this.lastFireTime = 0;
    if (Math.random() < 0.5) {
      this.speed.x = -this.speed.x;
    }
    Enemy.enemyPool = new Set();
  }

  move() {
    const transform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    transform.position.x += this.speed.x;
    transform.position.y += this.speed.y;
    const scene = Scene.instance as Scene;
    const { width, height } = scene;
    if (transform.position.x < 0 || transform.position.x > width) {
      this.speed.x = -this.speed.x;
    }
    if (transform.position.y > height + 10) {
      this.die();
      Enemy.enemyPool.add(this);
    }
  }

  fire() {
    const transform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    if (transform.position.y < 0) {
      return;
    }
    const fireStart = performance.now();
    if (this.lastFireTime && fireStart - this.lastFireTime < this.frequency) {
      return;
    }
    const bullet = Level.initEnemyBullet();
    this.addChildren(bullet);
    this.lastFireTime = fireStart;
  }

  onCollider() {
    const player = Level.player;
    if (!player) {
      throw Error('no player');
    }
    const playerBullets = player.getChildren('playerBullet') as PlayerBullet[];
    const collider = this.getComponent(ComponentType.COLLIDER_2D) as Collider2DComponent;
    if (!collider) {
      return;
    }
    
    // 敌人碰到玩家，玩家死亡
    collider.onCollision(player, () => {
      player.die();
      (player.getComponent(ComponentType.AUDIO_PLAYER) as AudioPlayerComponent).play('mp3/boom.mp3');
    })
    
    // 玩家子弹击中敌人，敌人死亡，子弹死亡
    if (playerBullets.length) {
      playerBullets.forEach(bullet => {
        collider.onCollision(bullet, () => {
          this.die();
          Enemy.enemyPool.add(this);
          bullet.die();
          PlayerBullet.bulletPool.add(bullet);
          (this.getComponent(ComponentType.AUDIO_PLAYER) as AudioPlayerComponent).play();
        })
      })
    }
  }

  tick() {
    super.tick([() => this.fire(), () => this.move(), () => this.onCollider()]);
  }

  die() {
    const transform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    const { x, y } = transform.position;
    Level.initBoomEffect(x, y);
    super.die();
  }
}