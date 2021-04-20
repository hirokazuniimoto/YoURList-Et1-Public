
window.onload = function() {
  $(".marker-animation").each(function(){
    $(this).addClass('active'); //クラス「active」を与える
  });
}

/* シーザーー暗号化 */
function caesar(val, key) {
  console.log(val);
  val = encodeURIComponent(val);
  var result = "";
  for (var i = 0; i < val.length; i++) {
    result += String.fromCharCode(val.charCodeAt(i) + key);
  }
  return result;
}

$("#btn").on("click", () => {

  'use strict'; //決まり文句（エラーチェックをしてくれる）

  //結果を表示する領域を取得
  var results = document.getElementById("results");

  //結果を格納する配列を宣言
  var array = [];

  //★ブラウザのタブを取得
  chrome.tabs.query({lastFocusedWindow: true},function(tabs){

   //取得したタブ数分を繰り返し

   let word = "yourlistdateisdividedthisword";
   let data = "";

   //リストの作成データ
   let dir_name = document.getElementById('dir_name').value;
   console.log(dir_name);
   if(dir_name == ""){
     alert("ディレクトリ名を入力してください。")
     return true;
   }

   data += dir_name;
   data += word;
   for(var i=0; i<tabs.length; i++){

     //,を-に変えてバグ修正
     if (tabs[i].title.match(/,/)){
       //tabs[i].title = tabs[i].title.replace(',', '-')
       tabs[i].title = tabs[i].title.split(',').join('-');
     }

     data += tabs[i].title;
     data += ",";
   }
   data += "newdir";
   data += word;

   //ページデータ
   for(var i=0; i<tabs.length; i++){
     data += tabs[i].title;
     data += word;
     data += tabs[i].url;
     data += word;
   }

   //データをシーザー暗号化する
   data = caesar(data,5);

   //テキストファイルに保存してダウンロード
   let blob = new Blob([data],{type:"text/plain"});
   let link = document.createElement('a');
   link.href = URL.createObjectURL(blob);
   var today = new Date();
   let today_data = today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate()+"/"+today.getHours()+":"+today.getMinutes()
   link.download = 'Your_Data_'+dir_name+"_"+ today_data +'.txt';
   link.click();

   var message = document.getElementById("message");
   message.innerHTML = "<p class='alert alert-primary mt-2 mb-4'>データファイルをダウンロードしました。</p>";

   //results.value = array.join("\n"); //arrayの要素を改行で区切ってresultsに表示
   //results.select(); //resultsを選択状態に

  });

});
