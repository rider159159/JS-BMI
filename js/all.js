//變數
var list = document.querySelector('.list')
var send = document.querySelector('.send')
var height = document.querySelector('.BMI-height')
var weight =document.querySelector('.BMI-bodyweight')
var returnBtn = document.querySelector('.return')
var result = document.querySelector('.result')
var resultType = document.querySelector('.result>.h2')
var allClose = document.querySelector('.all-delData')
var heightnum=''
var weightnum=''
var bminum=''
var BmiColor
var Bmitype
//字串轉陣列，如果沒有資料就回傳空陣列
var dataList = JSON.parse(localStorage.getItem('BMIList')) || []; 
if (dataList.length > 0) {
    upData(dataList);
}

//函式
//判斷bmi，並透過if設定顯示狀態
function checkBMI(e){
    e.preventDefault();
     heightnum = parseInt(height.value)
     weightnum = parseInt(weight.value)
    var num = weightnum / (heightnum / 100) / (heightnum / 100)
   //取小數第2位
    bminum = num.toFixed(2)
   
   //身高、體重各一沒輸入跳錯，並終止
    if (!heightnum || !weightnum) {
        alert('請輸入正確資料!')
        return
    }
    //將看結果按鈕隱藏，顯示bmi值
    send.style.display='none'
    result.style.display='flex'
    document.querySelector('.result-num .BMI').textContent =bminum;
  
    if (bminum<18.5){
        //添加class進result
        result.classList.add('underweight')
        resultType.textContent='過輕'
        BmiColor ='underweight-bc'
        Bmitype='過輕'
    }
    else if (bminum >= 18.5 && bminum < 24) {
        result.classList.add('great')
        resultType.textContent = '理想'
        BmiColor = 'great-bc'
        Bmitype = '理想'
    }
    else if (bminum >= 24 && bminum < 27) {
        result.classList.add('overweight')
        resultType.textContent = '過重'
        BmiColor = 'overweight-bc'
        Bmitype = '過重'

    }
    else if (bminum >= 27 && bminum < 30) {
        result.classList.add('mild-obesity')
        resultType.textContent = '輕度肥胖'
        BmiColor = 'mild-obesity-bc'
        Bmitype = '輕度肥胖'
    }
    else if (bminum >= 30 && bminum < 35) {
        result.classList.add('moderate-obesity')
        resultType.textContent = '中度肥胖'
        BmiColor = 'moderate-obesity-bc'
        Bmitype = '中度肥胖'
    }
    else  {
        result.classList.add('severe-obesity')
        resultType.textContent = '重度肥胖'
        BmiColor = 'severe-obesity-bc'
        Bmitype = '重度肥胖'
    }
    saveData();
    //將資料以陣列方式傳至upData
    upData(dataList);
}
//儲存至資料庫
function saveData() {
    //獲取時間
    var d = new Date();
    var getNewDate = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
//整理要push資料
    var todo={
        weight:weightnum,
        height:heightnum,
        BMI:bminum,
        Color: BmiColor,
        type:Bmitype,
        time:getNewDate
    }
  //將todo資料push(添加至末端)進dataList陣列
    dataList.push(todo)
    //將陣列資料(dataList)傳至upData
    upData(dataList);
    //轉成string並存入資料庫
    localStorage.setItem('BMIList',JSON.stringify(dataList))
}
//顯示的function
function upData(items) {
   
    var  str =''
    var len=items.length
    for(var i= 0;i<len;i++){
        str += '<table class="table mb-4"><tbody><tr class="' + items[i].Color + ' my-2"  style="width:18%"><th style="width:18%"><span class="BMI-type">' + items[i].type + '</span></th><th style="width:18%">BMI <span class="BMI">' + items[i].BMI + '</span></th><th style="width:18%">weight <span class="weight">' + items[i].weight + '</span></th><th style="width:18%">height <span class="height">' + items[i].height + '</th><th class="pt-6" style="width:18%">'+items[i].time+'</th><th class="d-flex justify-content-end p-0"><i class="fas fa-times fa-2x" data-num="' + i + '"></i></th></tr></tbody></table>'
    }
    list.innerHTML=str
}

//將按鈕返回'變回.send (看結果)'
function returnButton() {
    send.style.display = 'block'
    result.style.display = 'none'
    //移除第一個class(bmi值)
    result.classList.remove(result.classList[1]);
}

function heightkeyup() {
    height.value = height.value.replace(/[^\d]/g, '');
}
function weightkeyup() {
    weight.value = weight.value.replace(/[^\d]/g, '');
}
//刪除資料庫及畫面
function delData(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'I') { return }; 
    var num = e.target.dataset.num;
    dataList.splice(num, 1); //刪除指定那一個

    localStorage.setItem("BMIList", JSON.stringify(dataList));
    upData(dataList);

}
//全部刪除
function allDelData(e){
    dataList = [];
    localStorage.setItem("BMIList", JSON.stringify(dataList));
    upData(dataList);
}
//監聽
send.addEventListener('click', checkBMI)
height.addEventListener('keyup',heightkeyup)
weight.addEventListener('keyup',weightkeyup)
returnBtn.addEventListener('click',returnButton)
list.addEventListener('click',delData)
allClose.addEventListener('click',allDelData)