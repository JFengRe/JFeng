"use strict";

var stageScene = document.querySelector(".stage");
var startButton = stageScene.querySelector(".start button"); // 点击开始游戏

startButton.onclick = function () {
  // 切换场景
  stageScene.classList.add("play");
  console.log("1");
};