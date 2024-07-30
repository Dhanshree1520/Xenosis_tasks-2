const questions = [
    {
        question: "What is the capital of Japan?" , 
        answers: [
            { text: "Beijing", correct: false},
            { text: "Tokyo", correct: true},
            { text: "Seoul", correct: false},
            { text: "Bangkok", correct: false},
        ]
    },
    {
        question: "Which river is the longest in the world?" , 
        answers: [
            { text: "Amazon", correct: false},
            { text: "Mississippi", correct: false},
            { text: "Yangtze", correct: false},
            { text: "Nile", correct: true},
        ]
    },
    {
        question: "What gas is used to extinguish fires?" , 
        answers: [
            { text: "Oxygen", correct: false},
            { text: "Nitrogen", correct: true},
            { text: "Carbon dioxide", correct: false},
            { text: "Hydrogen", correct: false},
        ]
    },
    {
        question: "Which one is the hottest continent?" , 
        answers: [
            { text: "South Asia", correct: false},
            { text: "Africa", correct: true},
            { text: "North America", correct: false},
            { text: "Australia", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
} 

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
