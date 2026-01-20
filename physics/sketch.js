import { Fruit } from './Fruit.js';
import { ShapeStage } from './shapes.js';
import { drawBody, isOutOfBounds } from './util.js';
// import { drawBody, isOutOfBounds } from './util.js';

let { Engine, Bodies, Composite, Events } = Matter; // モジュールを変数化
let engine; // 物理エンジン

let se = {};
Fruit.se = se;

let scene = 'title';

let delta = 1000 / 60;

function setup() {
  createCanvas(400, 400);

  loadSound('./assets/po.wav', data => {
    se.merge = data;
  })
  loadSound('./assets/gameover.mp3', s => {
    se.gameover = s;
  });

  // 物理エンジン（世界）を初期化
  engine = Engine.create();

  //let apple = new Fruit ("apple",200,200,engine.world)

  // 箱を生成 (X, Y, 幅, 高さ)
  let stage = Bodies.fromVertices(200, 300, ShapeStage, { isStatic: true });
  // 箱を世界に配置
  Composite.add(engine.world, stage);


  Events.on(engine, 'collisionStart', ev => {

    console.log('衝突しました', ev.pairs);
    for (let i = 0; i < ev.pairs.length; i++) {
      let pair = ev.pairs[i];
      let a = pair.bodyA.parent;
      let b = pair.bodyB.parent;
      if (a.fruit) {
        console.log('fruit hit')
        a.fruit.hit(b, b.fruit);
      }
    }
  });
}


function draw() {
  background(220);



  // 世界に配置された全ての物体を取得（配列） 
  let bodies = Composite.allBodies(engine.world);

  // 全ての物体を描画（配列をスキャン）
  for (let i = 0; i < bodies.length; i++) {
    if (bodies[i].fruit) {
      bodies[i].fruit.draw();
      if (isOutOfBounds(bodies[i], 0, 0, width, height)) {
        if (scene !== 'gameover') {
          scene = 'gameover';
          if (se.gameover) se.gameover.play();
        }
      }
    } else drawBody(bodies[i]);
  }

  // 世界の更新（1 フレーム時間を進める）
  Engine.update(engine, delta);

  if (scene == 'title') {
    textAlign(CENTER);
    textSize(40);
    fill(255, 255, 255);
    text(`Fruits Game`, 200, 200);

  } else if (scene == 'play') {
    textAlign(LEFT);
    textSize(30);
    // text('Next:'+nextFruit,20,40);

  } else if (scene == 'gameover') {
    textAlign(CENTER);
    textSize(40);
    text('Game over!', 200, 200);
  }
}

function mousePressed() {
  if (scene == 'title') {
    scene = 'play';

  } else if (scene == 'play') {
    new Fruit('cherry', mouseX, 0, engine.world);

  }

}



window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;