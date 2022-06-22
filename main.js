let computerNumber = 0; //컴퓨터가 지정하는 번호
let playButton = document.getElementById('play_button');
let userInput = document.querySelector('#user_input');
let resultArea = document.getElementById('result_area');
let resetButton = document.querySelector('#reset_button');
let chancesArea = document.getElementById('chances_area');
let chances = 7;
let gameOver = false;
let userValueList = [];
/* 
document는  DOM트리의 최상위 객체이다.
DOM(Document Object Model)이라 하면 자바스크립트 입장에서 그저 일종의 문자열일 뿐인 HTML을 자바스크립트가 이해할 수 있게 
객체의 형태로 바꿔둔 것이다. 
(Document를 HTML이라고 이해하면 편하다.) 이 DOM을 이제 자바스크립트가 마음대로 컨트롤 할 수 있어야 하는데 
이때 필요한 기본 함수들과 속성값을 제공해주는 게 document 라는 객체이다. 
*/
/* 
document.getElementById : id로 선택
document.getElementByClassName : class로 선택, 같은 class가 여러 개 있을 경우엔 모두 다 선택돼서 배열에 저장된다.
*/
/* 
document.querySelector : id, class 둘 다 선택 가능하고 좀 더 디테일한 선택이 가능하다. 
참고로 선택 가능한 값이 여러 개 있을 경우 그 중에 첫 번째 태그 하나만 반환한다. 

let userInput = document.querySelector("#user-input");
 >> id=user-input을 선택
let resultAreaImg = document.querySelector(".main-img");
 >> class=main-img를 선택
let menus = document.querySelector("nav a")
 >> nav 태그 밑에 있는 a 태그를 선택 
 
document.querySelectorAll : 위의  document.querySelector와 같다. 
하지만 All에서 알 수 있듯이 선택된 값 모두를 NodeList에 담아 반환한다. 
*/
playButton.addEventListener('click', play); 
/* addEventListener('이벤트의 이름', '이벤트 발생 시 실행시킬 함수의 이름') */
/* 플레이버튼에게 이벤트를 줄 건데 이 플레이버튼을 클릭했을 때 play 함수를 실행하겠다 */
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', function(){
    userInput.value = '';
});

function pickRandomNumber () {
    computerNumber = Math.floor(Math.random() * 100) + 1;
    /* Math.floor () - 소수점 버리는 함수 */
    /* Math.random() - 랜덤 숫자를 뽑아주는 함수 */
    /* 
    Math : 자바스크립트에서 유용한 객체 중 하나인 Math. 
    수학적으로 어지간한 함수들이 다 들어가 있다.
    
     Math.random() : 0에서 1사이의 값을 반환(1에 근접한 값까지, 1은 미포함)
     Math.floor() : 소수점 버림
     Math.ceil() : 소수점 올림
     Math.round() : 소수점 반올림
     Math max() : 여러개의 값 중 제일 큰 값 반환
     Math.min() : 여러개의 값 중 제일 작은 값 반환
    
    등등 여러가지 유용한 함수들이 많으니 참고하자
     */ 
    console.log(computerNumber);
}
function play() {
    const USER_VALUE = userInput.value;
    if (USER_VALUE < 1 || USER_VALUE > 100) {
        resultArea.textContent = '1부터 100 사이의 숫자를 입력 하시오.' ;
        return;
    }
    if (userValueList.includes(USER_VALUE)) {
        resultArea.textContent = '이미 입력한 숫자'
        return;
    }
    userValueList.push(USER_VALUE);
    if (USER_VALUE < computerNumber) {
        resultArea.textContent = 'UP';
    } else if (USER_VALUE > computerNumber) {
        resultArea.textContent = 'DOWN';
    } else {
       resultArea.textContent = '정답';
       gameOver = true;
    }
    /* 
    다양한 노드의 속성값
    
    textContent : 노드의 text 값을 반환
    innerText : 노드의 text 값을 반환, textContent랑 비슷하지만 textContent는 모든 요소를 반환하는 반면, 
    innerText는 사람이 읽을 수 있는 요소만 가져온다. 
    (글자 사이에 여백이 많다면 textContent는 있는 그대로, 가져오는 반면, innerTExt는 여백을 한 칸 정도만 남기고 가져온다.)
    innerHTML : html 요소를 반환
    
    셋의 차이를 잘 보여주는 예제 코드. 
    다음 코드를 실행하면 차이가 확연하게 보인다. 
    
    HTML 상의 마크업
    <h1 id="test">
        <div>Hello      World</div>
    </h1>
    
    Script 상의 코드
    let test = document.getElementById("test")
    console.log(test.innerText)
    console.log(test.textContent)
    console.log(test.innerHTML)
    
    이외에도 다양한 노드 속성과 함수는 다음 사이트에서 확인할 수 있다. 
    http://developer.mozilla.org/ko/docs/web/API/Node 
    */
    chances--; /* 플레이 함수 실행될 때마다 하나씩 사라짐 */
    chancesArea.innerHTML = `남은 기회 : ${chances}번`;
    if (chances == 0) {
        gameOver = true;
    } 
    if (gameOver == true) {
        playButton.disabled = true; 
    }
}
function focusInput () {
    userInput.value = '';
}
function reset () {
    pickRandomNumber();
    userInput.value = '';
    resultArea.textContent = '결과가 나온다';
    gameOver = false;
    playButton.disabled = false;
    chances = 7;
    chancesArea.innerHTML = `남은 기회 : ${chances}번`;
    userValueList = [];
}
pickRandomNumber ();

