var stageScene = document.querySelector(".stage");
var gameScene = stageScene.querySelector(".game");
var startButton = stageScene.querySelector(".start button");
var restartButton = gameScene.querySelector(".restart");
var scoreDom = gameScene.querySelector('.score');


// 我的飞机
var ourPlane = {
  node: gameScene.querySelector(".our-plane"),
  x: 360 / 2,
  y: 640 - 80 / 2 - 20,
  w:66,
  h:80,
  // 保存子弹
  bullets: [],
}

// 敌方飞机
var enemies = [];

// 敌方小飞机对象
var enemyPlaneS = {
  imgSrc: 'enemy-plane-s.png',
  w: 34,
  h: 24,
  speed: 5,
  blood: 1
}
// 敌方中飞机对象
var enemyPlaneM = {
  imgSrc: 'enemy-plane-m.png',
  w: 46,
  h: 60,
  speed: 3,
  blood: 3,
}
// 敌方小飞机对象
var enemyPlaneL = {
  imgSrc: 'enemy-plane-l.png',
  w: 110,
  h: 164,
  speed: 1,
  blood: 5
}
// 我方子弹对象
var bullet = {
  imgSrc: 'our-bullet.png',
  w: 6,
  h: 14,
  speed: -10
}

// 初始化分数
var score = 0;
// 初始化游戏场景背景定位
var gameScenePosY = 0;
// 初始化游戏暂停状态
var gamePausedState = false;
// 飞机死亡
var gameDeathState = false;
// 保存定时器返回的id
var gameFrameId;
// 动画帧数
var gameFrames = 0;

// 随机数生成  用来作为 敌方飞机 x轴 的位置
function randomNum() {
  return Math.round(Math.random() * gameScene.offsetWidth)
}



// 更新动画帧的方法
function updataFrame() {

  // 动画帧 返回定时器id
  return setInterval(function () {

    // 更新帧数
    gameFrames++;
    // 更新背景
    gameScene.style.backgroundPositionY = ++gameScenePosY + "px";

    // 每一帧检测死亡状态
    if (gameDeathState) {
      // 如果死亡 暂停游戏
      gamePause();
      // 显示死亡视图
      console.log('1')
      stageScene.classList.add("death");
    }

    // 每隔多少帧 就创建子弹
    if (gameFrames % 10 === 0) {

      // new Bullet().create();

      var newBullet = new Element(Object.assign(bullet, { x: ourPlane.x, y: ourPlane.y }));
      // console.log(newBullet)
      newBullet.create();
      ourPlane.bullets.push(newBullet);
    }

    // 每帧都移动【所有】子弹 ourPlane.bullets所有子弹
    ourPlane.bullets.forEach(function (bullet, index, bullets) {
      // 实例对象的方法
      bullet.move();
      // 顺便判断是否超出画布
      if (bullet.death) {
        // 超出画布  1 删除节点 2 从数组里面删除
        gameScene.removeChild(bullet.node);
        bullets.splice(index, 1);
      }
    });

    // 每隔多少帧  就创建 敌方飞机
    if (gameFrames % 800 === 0) {
      var newEnemy = new Element(Object.assign(enemyPlaneL, { x: randomNum(), y: -enemyPlaneL.h / 2 }))
      newEnemy.create();
      enemies.push(newEnemy);
    }
    if (gameFrames % 400 === 0) {
      var newEnemy = new Element(Object.assign(enemyPlaneM, { x: randomNum(), y: -enemyPlaneM.h / 2 }))
      newEnemy.create();
      enemies.push(newEnemy);
    }
    if (gameFrames % 100 === 0) {
      var newEnemy = new Element(Object.assign(enemyPlaneS, { x: randomNum(), y: -enemyPlaneS.h / 2 }))
      newEnemy.create();
      enemies.push(newEnemy);
    }
    // 每帧都移动【所有】敌机 
    enemies.forEach(function (enemy, index, enemies) {
      // 实例对象的方法
      enemy.move();
      // 顺便判断是否超出画布
      if (enemy.death) {
        // 超出画布  1 删除节点 2 从数组里面删除
        gameScene.removeChild(enemy.node);
        enemies.splice(index, 1);
      }
    });

    // 检测碰撞
    // 敌方飞机遍历
    enemies.forEach(function (enemy, indexE, enemies) { 
      //子弹遍历
      ourPlane.bullets.forEach(function (bullet, indexB, bullets) { 
        // console.log(bullet, indexB, bullets)
        
        // 子弹与敌方飞机碰撞
        if(checkCollision(bullet, enemy)){
          // 子弹消失
           bullet.death = true;
          //  敌方飞机减血
           enemy.blood --;
          
          //  判断飞机死亡
           if(enemy.blood == 0){
             enemy.death = true;
           }

          //  分数增加
          // score++ ;

        }
        // console.log(gameDeathState)

        
      })
      // 我方飞机与敌方飞机碰撞死亡
      if(checkCollision(ourPlane, enemy)){
        gameDeathState = true
        console.log(gameDeathState)
        enemy.death = true
        score++
      }
    })

    //  每帧修改分数
    scoreDom.innerHTML = score;
  }, 50);
}

    // 点击开始游戏
    startButton.onclick = function () {
      // 切换场景
      stageScene.classList.add("play");

      // 游戏开始
      gameFrameId = updataFrame();
    };

    // 游戏播放
    function gamePlay() {
      // 切换游戏暂停状态 视图更新
      stageScene.classList.remove("paused");
      // 更改游戏状态
      gamePausedState = false;
      // 开始游戏 创建定时器
      gameFrameId = updataFrame();
    }

    // 游戏暂停
    function gamePause() {
      stageScene.classList.add("paused");
      gamePausedState = true;
      // 清除定时器
      clearInterval(gameFrameId);
    } 

    // 游戏场景绑定点击 切换暂停游戏
    gameScene.onclick = function () {
      // 判断游戏暂停状态
      if (gamePausedState) {
        gamePlay();
      } else {
        gamePause();
      }
    };

    // 重新开始 重新加载页面 刷新
    restartButton.onclick = function () {
      // 刷新页面
      window.location.reload();
    };

    // 更改我方飞机节点对象视图 位置
    ourPlane.updataOurPlanePos = function () {
      this.node.style.left = this.x - 33 + "px";
      this.node.style.top = this.y - 40 + "px";
    };
    // 初始化我方飞机视图
    ourPlane.updataOurPlanePos();

    // 触屏拖动 我方飞机跟随移动
    gameScene.ontouchmove = function (event) {
      ourPlane.x = event.changedTouches[0].clientX;
      ourPlane.y = event.changedTouches[0].clientY;
      // 调用更改我方飞机节点对象视图的方法
      ourPlane.updataOurPlanePos();
    };

    // 兼容PC 没有触摸 只有鼠标移动
    gameScene.onmousemove = function (event) {
      // console.log(event.clientX - stageScene.offsetLeft);

      // 更改我方飞机对象 坐标点信息
      ourPlane.x = event.clientX - stageScene.offsetLeft;
      ourPlane.y = event.clientY - stageScene.offsetTop;
      // 更改我放飞机节点对象视图 位置
      ourPlane.updataOurPlanePos();
    };

  
    // 敌方飞机与我方子弹的坐标，长宽与速度
    function Element(params) {
      this.imgSrc = params.imgSrc;
      this.h = params.h
      this.w = params.w;
      this.x = params.x;
      this.y = params.y;
      // 速度
      this.speed = params.speed;
      // 血量
      this.blood = params.blood;
    };

    // 敌方飞机与我方子弹的创建方法
    Element.prototype.create = function () {
      this.node = document.createElement("img");
      this.node.src = "./img/" + this.imgSrc;
      this.node.style.left = this.x - this.w / 2 + "px";
      this.node.style.top = this.y - this.h / 2 + "px";
      gameScene.appendChild(this.node);
    };

    // 敌方飞机与我方子弹的移动方法
    Element.prototype.move = function () {
      this.y += this.speed;
      // 判断是否超出画布 垂直方向
      var topOutRange = this.y < -this.h / 2;
      var bottomOutRange = this.y > 640 + this.h / 2;
      if (topOutRange || bottomOutRange) {
        // 超出画布是标记，相当于死亡标记死亡
        this.death = true;
      }
      this.node.style.top = this.y - this.h / 2 + "px";
    };

    
    //检测碰撞
    function  checkCollision(obj1, obj2) { 
     
        var h = Math.abs(obj1.x - obj2.x) <= (obj1.w + obj2.w) / 2
        var v = Math.abs(obj1.y - obj2.y) <= (obj2.w + obj2.h) / 2 
        // console.log(h && v)
        return h && v
        
      }

     


      