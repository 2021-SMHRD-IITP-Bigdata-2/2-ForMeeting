const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0];

function calResult(){

    // var pointArray = [
    //     { name: '0', value: 0, key: 0 },
    //     { name: "1", value: 0, key: 1 },
    //     { name: '2', value: 0, key: 2 },
    //     { name: '3', value: 0, key: 3 },
    //     { name: '4', value: 0, key: 4 },
    //     { name: '5', value: 0, key: 5 },
    //     { name: '6', value: 0, key: 6 },
    //     { name: '7', value: 0, key: 7 },
    //     { name: '8', value: 0, key: 8 },
    //     { name: '9', value: 0, key: 9 },
    //     { name: '10', value: 0, key: 10 },
    //     { name: '11', value: 0, key: 11 },
    // ]
    //
    // for(let i = 0; i < endPoint; i++){
    //     var target = qnaList[i].a[select[i]];
    //     for(let j = 0; j < target.type.length; j++){
    //         for(let k = 0; k < pointArray.length; k++){
    //             if(target.type[j] === pointArray[k].name){
    //                 pointArray[k].value += 1;
    //             }
    //         }
    //     }
    // }
    // compareFunction
    // var resultArray = pointArray.sort(function (a,b){
    //     if(a.value > b.value){
    //         return -1;
    //     }
    //     if(a.value < b.value){
    //         return 1;
    //     }
    //     return 0;
    // });
    // console.log(resultArray)
    console.log(select);
    var result = select.indexOf(Math.max(...select));
    return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}


// 결과화면
function goResult(){

    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";

    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)})
        // setResult();
    // console.log(select);
    setResult();
}


// qna section
function addAnswer(answerText, qIdx, idx){
    // answer button -> a 에게 소속
    // html button 만드는 코드랑 똑같다고 생각하면 됨
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer);
    // a-a, a-b, a-c
    answer.innerHTML = answerText;
    // onclick 이벤트처럼 -> addEventListener
    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = 'fadeOut 0.5s';
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++){
                select[target[i]] += 1;
            }

            for(let i = 0; i < children.length; i++){
                children[i].style.display = "none";
            }
        goNext(++qIdx);
        }, 450)

    }, false);
}

function goNext(qIdx){
    // 결과 화면
    if(qIdx === endPoint){
        goResult()
        return
    }
    // data.js q 가져오기
    // qIdx 1씩 증가
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    // let 반복문 answer
    // a 3번 반복되야함
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    // 질문이 진행될때마다 statusbar 채우기
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}
// qna section end


// 시작버튼 실행시
// main 화면은 사라지고 qna 화면 나오게 설정
// 시작하기 onclick 버튼 추가

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";

// 애니메이션 적용
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);

    // main.style.display = "none";
    // qna.style.display = "block";

}





