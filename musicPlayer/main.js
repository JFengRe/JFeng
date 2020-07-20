var playList = [
    {
        id: 169185,
        name: "认真的雪",
        artists: "薛之谦",
        picUrl:
            "https://p2.music.126.net/yWtj0UXRJBCT9YI7csmAcw==/109951164190741294.jpg",
        playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
    },
    {
        id: 5253734,
        name: "恋爱达人",
        artists: "罗志祥",
        picUrl:
            "https://p1.music.126.net/n4YTVSO7QK1VRQMCEeOPqA==/80264348845281.jpg",
        playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
    },
    {
        id: 277302,
        name: "爱",
        artists: "莫文蔚",
        picUrl:
            "https://p1.music.126.net/hcY73QYZt36DeGf91euboQ==/18921495602636668.jpg",
        playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
    },
];

// 歌曲列表
var list = document.querySelector(".songList ul");
// 歌名
var songName = document.querySelector(".info_control .info h3")
// 歌手
var singer = document.querySelector(".info_control .info h5")
// 歌手图片
var singerImg = document.querySelector(".picture img")
// 播放器背景

var audio = document.querySelector("audio");

// 进度条
var speed_of_progress = document.querySelector(".controlDown .speed_of_progress");
// 替代进度条
var sider = document.querySelector(".controlDown .sider")

var stage = document.querySelector(".stage")
// 音量
var bvolume = document.querySelector(".volume input")
// 替代音量大小
var replaceVolume = document.querySelector(".volume .replace .bgc")
// 当前播放的时间
var currentTime = document.querySelector(".controlDown .currentTime")
// 歌曲的总时长
var endTime = document.querySelector(".controlDown .endTime")
// 暂停与播放按钮
var play_pause = document.querySelector(".controlUp .controlUp_btn .play_pause")
// 音乐是否在播放
var playing = false;

// 播放顺序
var playSequence = "listLoopPlay";

// 当音频播放时
audio.addEventListener("play", function () {
    // console.log("1");
    stage.classList.add("active");
});
//  当音频暂停时
audio.addEventListener("pause", function () {
    // console.log("2")
    stage.classList.remove("active");
});

// 遍历playList
playList.forEach(function (element, index) {
    // 新建歌曲
    var node = document.createElement("li");
    node.innerText = element.name;
    node.id = element.id;
    list.appendChild(node);

    // 给node添加点击事件
    node.addEventListener("click", function () {
        // 替换歌曲路径
        audio.src = "https://music.163.com/song/media/outer/url?id=" + element.id + ".mp3"
        // 修改为当前歌名
        songName.innerText = element.name;
        // 修改为当前歌手
        singer.innerText = element.artists;
        // 修改歌手图片
        singerImg.src = element.picUrl
        // 修改播放器背景
        $(".mask").css("background", "url(" + element.picUrl + ")");
        playing = false;
        $(this).addClass("play").siblings().removeClass("play");
        playPause()
    })
})
$(".songList ul li").eq(1).addClass("play")


audio.addEventListener("durationchange", function () {
    // console.log(audio.duration);
    // 调整进度条最大值
    speed_of_progress.max = audio.duration;
    // 调整歌曲总时长
    var minute = Math.floor(audio.duration / 60);
    if (minute < 10) {
        minute = "0" + minute;
    } else {
        minute = minute;
    }

    var second = Math.floor(audio.duration % 60);
    if (second < 10) {
        second = "0" + second;
    } else {
        second = second
    }
    endTime.innerText = minute + ":" + second;


})

audio.addEventListener("timeupdate", function () {
    //    console.log(audio.currentTime);
    speed_of_progress.value = audio.currentTime;
    // console.log(this.currentTime,this.duration);
    sider.style.width = (this.currentTime / this.duration) * 100 + "%";

    // 调节当前播放时间

    var minute = Math.floor(audio.currentTime / 60);
    if (minute < 10) {
        minute = "0" + minute;
    } else {
        minute = minute;
    }

    var second = Math.floor(audio.currentTime % 60);
    if (second < 10) {
        second = "0" + second;
    } else {
        second = second
    }
    currentTime.innerText = minute + ":" + second;

    if (playSequence == "listLoopPlay") {
        listLoopPlay()
    } else {
        randomPlay()
    }

})

//  当拖动进度条时
speed_of_progress.addEventListener("input", function () {
    //  console.log(this.value ,this.max);
    //  更改当前播放的时间
    audio.currentTime = this.value;

    sider.style.width = (this.value / this.max) * 100 + "%";

})


// 音量调节
bvolume.addEventListener("input", function () {
    // console.log(audio.volume);
    // 改变音量
    audio.volume = this.value / 100;
    // console.log(audio.volume)
    replaceVolume.style.width = this.value + "%";

})


//  暂停与播放按钮的切换
play_pause.onclick = function () {
    // console.log(this);
    playPause();
}


//  暂停与播放的方法
function playPause() {
    if (playing == false) {
        play_pause.className = "play_pause glyphicon glyphicon-pause";
        playing = true;
        audio.play();
    } else {
        play_pause.className = "play_pause suspend glyphicon glyphicon-play";
        playing = false;
        audio.pause();
    }
}



//  点击下一曲
$(".controlUp .controlUp_btn .Next").click(function () {
    // console.log("1");
    next();
    playing = false
    playPause()

})
//  点击上一曲
$(".controlUp .controlUp_btn .Last").click(function () {
    // console.log("1");
    last();
    playing = false
    playPause()

})



function startPlaying() {
    playList.forEach(function (element, index) {
        // console.log(element.id)
        // audio.pause();
        if ($(".songList li.play").attr("id") == element.id) {
            // 替换歌曲路径
            audio.src = "https://music.163.com/song/media/outer/url?id=" + element.id + ".mp3"
            // 修改为当前歌名
            songName.innerText = element.name;
            // 修改为当前歌手
            singer.innerText = element.artists;
            // 修改歌手图片
            singerImg.src = element.picUrl
            // 修改播放器背景
            $(".mask").css("background", "url(" + element.picUrl + ")");
            playing = false
            playPause()
        }
    })

}


//  下一曲
function next() {
    // console.log( $(".songList li.play") )
    if ($(".songList li.play").index() == $(".songList li").length - 1) {
        $(".songList li").first().addClass("play").siblings().removeClass("play");
        startPlaying();
    } else {
        $(".songList li.play").next().addClass("play").siblings().removeClass("play");
        startPlaying();
    }

}
//  上一曲
function last() {
    // console.log( $(".songList li.play") )
    if ($(".songList li.play").index() == 0) {
        $(".songList li").last().addClass("play").siblings().removeClass("play");
        startPlaying();
    } else {
        $(".songList li.play").prev().addClass("play").siblings().removeClass("play");
        startPlaying();
    }

}




$(".playMode").click(function () {
    if (playSequence == "listLoopPlay") {
        this.className = "playMode glyphicon glyphicon-random"
        playSequence = "randomPlay"
    } else {
        this.className = "playMode glyphicon glyphicon-refresh"
        playSequence = "listLoopPlay"
    }
})


// 列表循环播放
function listLoopPlay() {
    if (audio.ended == true) {
        next()
    }

}

//  随机播放
function randomPlay() {
    if (audio.ended == true) {
        // 随机的歌曲
        var randomSong = Math.floor(Math.random() * ($(".songList ul li").length - 1)) + 1;;
        //   判断随机的歌曲是否与当前歌曲一样
        console.log(randomSong == $(".songList ul li.play").index());
        while (randomSong == ($(".songList ul li.play").index())) {
            console.log("1")
            randomSong = Math.floor(Math.random() * ($(".songList ul li").length - 1)) + 1;
        }
        $(".songList ul li").eq(randomSong).addClass("play").siblings().removeClass("play");
        startPlaying();
    }
}

