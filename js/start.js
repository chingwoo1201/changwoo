const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12; //질문갯수
const select = [];

function calResult(){
  var pointArray = [                                                                     //인기도 배열
        {name: 'uppoint', value:0, key:0},
        {name: 'downpoint', value:0, key:1},
    ]
    for(let i =0; i < endPoint; i++){                                                         //결과를 계산할 배열 (3중 for문)
        var target = qnaList[i].a[select[i]];
        for(let j =0; j < target.type.length; j++){
            for(let k = 0; k < pointArray.length; k++){
                if(target.type[j] === pointArray[k].name){
                    pointArray[k].value += 1;
                }
            }
        }
    }
    var resultArray = pointArray.sort(function (a,b){                                                    //질문 답변에 따라 value 값에 추가
        if(a.value > b.value){
            return -1;
        }
        if(a.value < b.value){
            return 1;
        }
        return 0;
    });
    console.log(resultArray);                                                                            //결과 미리 확인하기 (오류검출)
    let resultword = resultArray[0].key;
    return resultword;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'imge/image-' + point + '.png';                                                                 //결과값에 이미지 출력
    resultImg.src = imgURL;
    resultImg.alt = point;
    imgDiv.appendChild(resultImg);
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}
function goResult(){                                                                                            //화면 넘어가는 애니메이션
    qna.style.webkitAnimation = "fadeOut 1s";
    qna.style.Animation = "fadeOut 1s";

    setTimeout(() => {
        result.style.webkitAnimation = "fadeIn 1s";
        result.style.Animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        },450)})
        setResult();
}

function addAnswer(answerText, qIdx, idx){                                                                 //답변 버튼
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-2');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer);
    answer.innerHTML = answerText;
    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');                                                //질문 바뀌는 애니메이션
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.webkitAnimation = "fadeOut 0.5s";
            children[i].style.Animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            select[qIdx] = idx;
            for(let i =0; i< children.length; i++){
                children[i].style.display = 'none';
            }
        goNext(++qIdx);                                                                                 //answer 함수가 끝나면 다음 q로 넘어감
        },450);
    },false);
}

function goNext(qIdx){
    if(qIdx === endPoint){
        goResult()
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';                                                     //질문 답변에 따라 vlaue 값에 %로 추가

}

function begin(){                                                           //메인화면 시작하기 버튼
    main.style.webkitAnimation = "fadeOut 1s";
    main.style.Animation = "fadeOut 1s";

    setTimeout(() => {                                                      //화면 전환 애니메이션 효과
        qna.style.webkitAnimation = "fadeIn 1s";
        qna.style.Animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        },450)
    let qIdx = 0;
    goNext(qIdx);
    },450);
}
