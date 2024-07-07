const questions= [
    {
        question: "Which planet is known as the Red Planet?",
        answers:[
            {text:"Earth",correct: false},
            {text:"Mars",correct: true},
            {text:"Jupiter",correct: false},
            {text:"Saturn",correct: false},
        ]
    },
    {
        question: "What is the largest ocean on Earth",
        answers:[
            {text:"Atlantic Ocean",correct: false},
            {text:"Indian Oceans",correct: false},
            {text:"Arctic Ocean",correct: false},
            {text:"Pacific Ocean",correct: true},
        ]
    },
    {
        question:"What is the boiling point of water at sea level in degrees Celsius?",
        answers:[
            {text:"90°C", correct:false},
            {text:"95°C", correct:false},
            {text:"100°C", correct:true},
            {text:"105°C", correct:false},
        ]
    },
    {
        question:"What is the capital of France?",
        answers:[
            {text:"Berlin", correct:false},
            {text:"Madrid", correct:false},
            {text:"Paris", correct:true},
            {text:"Rome", correct:false}
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Claude Monet", correct: false }
        ]
    }

];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currIndex=0;
let score=0;

function startQuiz()
{
    currIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currquestion=questions[currIndex];
    let questionNo=currIndex+1;
    questionElement.innerHTML=questionNo+ "." +currquestion.question;

    currquestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct=== "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore()
{
resetState();
questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
nextButton.innerHTML="Play Again";
nextButton.style.display="block";
}
function handleNextButton(){
    currIndex++;
    if(currIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();