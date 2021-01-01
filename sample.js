let win_width; //ウィンドウの横サイズ
let win_height; //ウィンドウの縦サイズ
let draw;

let supportTouch = 'ontouchend' in document; // タッチイベントが利用可能かの判別

// イベント名
let EVENTNAME_TOUCHSTART = supportTouch ? 'touchstart' : 'mousedown';
let EVENTNAME_TOUCHMOVE = supportTouch ? 'touchmove' : 'mousemove';
let EVENTNAME_TOUCHEND = supportTouch ? 'touchend' : 'mouseup';

// jQueryでHTMLの読み込みが完了してからCSSを読みこむ
$(function(){
  let style = "<link rel='stylesheet' href='animation.css'>";
  $('head:last').after(style);
});

// スクロールを禁止する関数
(function() {
    function noScroll(event) {
      event.preventDefault();
    }
    document.addEventListener('touchmove', noScroll, { passive: false }); // スクロール禁止(SP)
    document.addEventListener('mousewheel', noScroll, { passive: false }); // スクロール禁止(PC)
})();

// 初期設定
function initDefine() {
  win_width = window.innerWidth; //ウィンドウの横サイズ
  win_height = window.innerHeight; //ウィンドウの縦サイズ

  // 左くす玉作成
  let newElementL = document.createElement("img"); // p要素作成
  newElementL.setAttribute("id","kusudamaLeft"); // img要素にidを設定
//  newElementL.setAttribute("class","rotLeft"); // img要素にclassを設定
  newElementL.setAttribute("src","./pictures/kusudama_left.png"); // img要素にsrcを設定
  newElementL.setAttribute("width","100px"); // img要素にwidthを設定
  newElementL.setAttribute("style","position: absolute; left: "+(win_width/2-100)+"px; top: 0px; z-index: 1000;"); // img要素にstyleを設定

  // 右くす玉作成
  let newElementR = document.createElement("img"); // p要素作成
  newElementR.setAttribute("id","kusudamaRight"); // img要素にidを設定
//  newElementR.setAttribute("class","rotRight"); // img要素にclassを設定
  newElementR.setAttribute("src","./pictures/kusudama_right.png"); // img要素にsrcを設定
  newElementR.setAttribute("width","100px"); // img要素にwidthを設定
  newElementR.setAttribute("style","position: absolute; left: "+(win_width/2)+"px; top: 0px; z-index: 1000;"); // img要素にstyleを設定

  parentDiv = document.getElementById("parent-kusudama"); // 親要素（div）への参照を取得
  parentDiv.appendChild(newElementL); // 左くす玉追加
  parentDiv.appendChild(newElementR); // 右くす玉追加



  const kusuBY = $('#parent-kusudama').offset().top + 200;
  //上矢印作成
  let newElement = document.createElement("img"); // img要素作成
  newElement.setAttribute("id","up"); // img要素にidを設定
  newElement.setAttribute("class","up-effect"); // img要素にclassを設定
  newElement.setAttribute("src","./pictures/up.png"); // img要素にsrcを設定
  newElement.setAttribute("width","50px"); // img要素にwidthを設定
  newElement.setAttribute("height","133px"); // img要素にheightを設定
  newElement.setAttribute("style","position: absolute; left: "+(win_width/2-25)+"px; top: "+(kusuBY)+"px;"); // img要素にstyleを設定
  parentDiv = document.getElementById("parent-up"); // 親要素（div）への参照を取得
  parentDiv.appendChild(newElement); // 上矢印追加

  let newSpan = document.createElement('span');
  newSpan.setAttribute("class", "up-effect");
  newSpan.setAttribute("width","100px"); // img要素にwidthを設定
  newSpan.setAttribute("style","font-size: 150%; font-weight: bold; position: absolute; left: "+(win_width/2-75)+"px; top: "+(kusuBY+140)+"px;"); // img要素にstyleを設定
  let newContent = document.createTextNode("おみくじをひく")
  newSpan.appendChild(newContent)
  parentDiv.appendChild(newSpan);


  draw = document.getElementById("parent-kusudama");
  draw.addEventListener(EVENTNAME_TOUCHSTART, kusudama); // モアイに指が触れたときの処理を追加
}

// window(HTML)の読み込みが完了してから初期設定
window.onload = function(){
    initDefine();
};


// くす玉関数
function kusudama() {
  win_width = window.innerWidth; //ウィンドウの横サイズ
  win_height = window.innerHeight; //ウィンドウの縦サイズ

  document.getElementById("parent-up").remove()
  document.getElementById("kusudamaLeft").classList.add('rotLeft'); //左くす玉に回転のclassを追加
  document.getElementById("kusudamaRight").classList.add('rotRight'); //右くす玉に回転のclassを追加

  // 大吉:45%  吉:10%  中吉:10%  小吉:10%  末吉:10%  凶:10%  大凶:5%
  let kuji1 = ["大", "",   "中", "小", "末", "",   "大"];
  let kuji2 = ["吉", "吉", "吉", "吉", "吉", "凶", "凶"];
  rand_kuji = Math.floor( Math.random()*100 )+1; // 1~100
  if (rand_kuji <= 45) {
    rand_kuji = 0 // 大吉
    setTimeout(() => {
      document.body.style.backgroundImage = "url('./pictures/moai1.gif')";
    }, 500)
  }
  else if (rand_kuji <= 55)
    rand_kuji = 1 // 吉
  else if (rand_kuji <= 65)
    rand_kuji = 2 // 中吉
  else if (rand_kuji <= 75)
    rand_kuji = 3 // 小吉
  else if (rand_kuji <= 85)
    rand_kuji = 4 // 末吉
  else if (rand_kuji <= 95)
    rand_kuji = 5 // 凶
  else {
    rand_kuji = 6 // 大凶
    setTimeout(() => {
      document.body.style.backgroundImage = "url('./pictures/moai2.gif')";
    }, 500)
  }

  rand_kuji1 = kuji1[rand_kuji]
  rand_kuji2 = kuji2[rand_kuji]

  // 幕作成
  let newDiv = document.createElement('div');
  newDiv.setAttribute("id", "flag")
  newDiv.setAttribute("class", "flag")
  newDiv.setAttribute("width","100px"); // img要素にwidthを設定
  newDiv.setAttribute("style", "font-size: 500%; position: absolute; left: "+(win_width/2-60)+"px; z-index: 400")
  let parentDiv = document.getElementById("parent-maku"); // 親要素（div）への参照を取得
  parentDiv.appendChild(newDiv)

  parentDiv = document.getElementById("flag"); // 親要素（div）への参照を取得

  let newSpan1 = document.createElement('span');
  newSpan1.setAttribute("class", "red-font");
  newSpan1.setAttribute("style", "z-index: 400");
  let newContent1 = document.createTextNode(rand_kuji1)
  newSpan1.appendChild(newContent1)
  parentDiv.appendChild(newSpan1);

  let newSpan2 = document.createElement('span');
  newSpan2.setAttribute("class", "text-combine");
  newSpan2.setAttribute("style", "z-index: 400");
  let newContent2 = document.createTextNode("ﾓｱ")
  newSpan2.appendChild(newContent2)
  parentDiv.appendChild(newSpan2);

  let newSpan3 = document.createElement('span');
  newSpan3.setAttribute("style", "z-index: 400");
  newSpan3.setAttribute("class", "red-font mar-offset");
  let newContent3 = document.createTextNode(rand_kuji2)
  newSpan3.appendChild(newContent3)
  parentDiv.appendChild(newSpan3);

  class Paper{
    constructor(num, width, G, color, startX, startY, finishX) {
      this.num = num; //ナンバー idが"paper(num)"となる
      this.width = width; // 大きさ
      this.G = G; // 初速度
      this.D = 5; //遅延度
      this.startX = startX // 初期位置(x座標)
      this.startY = startY // 初期位置(y座標)
      this.finishX = finishX // 最終位置(x座標)
      this.newElement = document.createElement("img"); // img要素作成
      this.newElement.setAttribute("id","paper"+num); // img要素にidを設定
      this.newElement.setAttribute("class",color); // img要素にclassを設定
      this.newElement.setAttribute("src","./pictures/moai.png"); // img要素にsrcを設定
      this.newElement.setAttribute("width",this.width+"px"); // img要素にwidthを設定
      this.newElement.setAttribute("style","position: absolute; left: "+(this.startX)+"px; top: "+(this.startY)+"px; z-index:800;"); // img要素にstyleを設定
      let parentDiv = document.getElementById("parent-papers"); // 親要素（div）への参照を取得
      parentDiv.appendChild(this.newElement); // 追加
    }
  }

  let papers = []; // 各紙吹雪の格納場所
  let colors = ["red", "blue", "green", "yellow", "orange", "aqua", "purple"];
  let rand_width = 0;
  let rand_G = 0;
  for (let i = 0; i < 60; i++) {
    rand_width = 20 + Math.floor( Math.random()*20 - 10 );
    rand_G = 7 + Math.random()*6 - 3;
    rand_color = colors[Math.floor( Math.random()*colors.length )];
    rand_X = Math.floor( Math.random()*60 - 30 );
    rand_startX = win_width/2 + rand_X;
    rand_startY = 20+Math.floor( Math.random()*10 - 5 );
    rand_finishX = win_width/2 + rand_X*1.7;
	  papers.push( new Paper(i, rand_width, rand_G, rand_color, rand_startX, rand_startY, rand_finishX) );
  }
  console.log(papers[0].num)

  movepaper(papers, papers.length); // 紙吹雪を動かす
};


// 紙吹雪を動かす関数
function movepaper(papers, length){
  let promise = new Promise((resolve, reject) => { // #1
    resolve('1')
  })
  promise.then(() => { // 上記処理後0.1秒後class追加
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (let paper of papers) {
          document.getElementById("paper"+paper.num).classList.add('slowly'); //0.1秒後にclass"slowly"を追加する 
        }
        resolve("2")
      }, 50)
    })
  }).then(() => { // 上記処理後に紙吹雪を動かすs
    let t = 0, // 時間
        X = 0, // X座標
        Y = 0, // Y座標
        dx = 0.5

    function draw_pa(){
      t += dx;
      let icount = 0; //カウント
      let rmCount = 0; //削除する要素のカウント
      for (let paper of papers) {
        X = paper.startX + (paper.finishX - paper.startX)*(t/20)
        Y = paper.startY+ 0.5*paper.G*t^2
        $('#paper'+paper.num).animate({
          'left': (X+'px'),
          'top': (Y+'px')
        }, paper.D, 'linear');
        if (Y > win_height+50){ // 画面外(横)に出たら
          tmp = papers.splice(icount, 1);
          papers.unshift(tmp[0]);
          rmCount++;
        }
        icount++
      }
      for (let i = 0; i < rmCount; i++) {
        papers.splice(0, 1)
      }
      dx += 0.02
      if (dx > 1) {
        dx = 1;
      }
      if (papers.length != 0){ // 一つが画面外(横)に出たら終了
        draw_pa();
      }
    };

    draw_pa(); // 描画
  }).then(() => { //上記処理後1000秒後，以下の関数を実行
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (let i = 0; i < length; i++) {
          $('#paper'+i).remove(); //紙吹雪削除
        }
        resolve("3")
      }, 7000)
    })
  }).catch(() => { // エラーハンドリング
    console.error('Something wrong!')
  })
}