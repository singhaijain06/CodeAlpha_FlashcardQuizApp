// =====================================================
// FLASHCARD QUIZ APP
// =====================================================

// Load saved flashcards
let savedCards = localStorage.getItem("flashcards");

let flashcards = savedCards
    ? JSON.parse(savedCards)
    : [
        {
            question: "What is Artificial Intelligence?",
            answer: "Artificial Intelligence is the simulation of human intelligence in machines."
        },
        {
            question: "What is Machine Learning?",
            answer: "Machine Learning is a branch of AI that allows computers to learn from data."
        },
        {
            question: "What is HTML?",
            answer: "HTML stands for HyperText Markup Language and is used to create web pages."
        }
    ];

let currentIndex = 0;


// =====================================================
// SAVE CARDS
// =====================================================

function saveCards() {

    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );
}


// =====================================================
// LOAD CARD
// =====================================================

function loadCard() {

    const questionElement =
        document.getElementById("question");

    const answerElement =
        document.getElementById("answer");

    const currentCardElement =
        document.getElementById("currentCard");

    const totalCardsElement =
        document.getElementById("totalCards");

    const showAnswerButton =
        document.getElementById("showAnswerBtn");


    if (flashcards.length === 0) {

        questionElement.innerText =
            "No flashcards available.";

        answerElement.innerText =
            "Add a new flashcard below.";

        answerElement.style.display =
            "block";

        showAnswerButton.style.display =
            "none";

        currentCardElement.innerText =
            "0";
        const progressFill =
    document.getElementById("progressFill");

progressFill.style.width = "0%";

        totalCardsElement.innerText =
            "0";

        return;
    }


    const card =
        flashcards[currentIndex];


    questionElement.innerText =
        card.question;

    answerElement.innerText =
        card.answer;


    answerElement.style.display =
        "none";


    showAnswerButton.style.display =
        "inline-block";

    showAnswerButton.innerText =
        "👁️ Show Answer";


    currentCardElement.innerText =
        currentIndex + 1;

    totalCardsElement.innerText =
        flashcards.length;
    const progressFill =
    document.getElementById("progressFill");

const progress =
    ((currentIndex + 1) / flashcards.length) * 100;

progressFill.style.width =
    progress + "%";
}
// =====================================================
// QUIZ MODE
// =====================================================

let quizCards = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;


// ================= START QUIZ =================

function startQuiz() {

    if (flashcards.length === 0) {

        alert("Please add some flashcards first.");

        return;
    }

    quizCards = [...flashcards];

    quizCards.sort(
        () => Math.random() - 0.5
    );

    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;

    document.getElementById("quizArea").style.display = "block";

    document.getElementById("quizResult").style.display = "none";

    document.getElementById("startQuizBtn").style.display = "none";

    document.getElementById("quizScore").innerText = "0";

    document.getElementById("quizTotal").innerText =
        quizCards.length;

    showQuizQuestion();
}


// ================= SHOW QUESTION =================

function showQuizQuestion() {

    const question =
        document.getElementById("quizQuestion");

    const answer =
        document.getElementById("quizAnswer");

    const feedback =
        document.getElementById("quizFeedback");

    const nextButton =
        document.getElementById("nextQuizBtn");


    question.innerText =
        quizCards[quizIndex].question;

    answer.value = "";

    answer.disabled = false;

    feedback.innerText = "";

    feedback.className =
        "quiz-feedback";

    nextButton.style.display =
        "none";

    quizAnswered = false;
}


// ================= SUBMIT ANSWER =================

function submitQuizAnswer() {

    if (quizAnswered) {
        return;
    }

    const answerInput =
        document.getElementById("quizAnswer");

    const feedback =
        document.getElementById("quizFeedback");


    const userAnswer =
        answerInput.value
            .trim()
            .toLowerCase();


    if (userAnswer === "") {

        alert("Please enter your answer.");

        return;
    }


    const correctAnswer =
        quizCards[quizIndex].answer
            .trim()
            .toLowerCase();


    quizAnswered = true;

    answerInput.disabled = true;


    if (
        userAnswer === correctAnswer ||
        correctAnswer.includes(userAnswer) ||
        userAnswer.includes(correctAnswer)
    ) {

        quizScore++;

        feedback.innerText =
            "🎉 Correct! Great job!";

        feedback.className =
            "quiz-feedback correct";

    } else {

        feedback.innerHTML =
            "❌ Incorrect! Correct answer: " +
            quizCards[quizIndex].answer;

        feedback.className =
            "quiz-feedback wrong";
    }


    document.getElementById("quizScore").innerText =
        quizScore;


    document.getElementById("nextQuizBtn").style.display =
        "block";
}


// ================= NEXT QUESTION =================

function nextQuizQuestion() {

    quizIndex++;

    if (quizIndex >= quizCards.length) {

        finishQuiz();

        return;
    }

    showQuizQuestion();
}


// ================= FINISH QUIZ =================

function finishQuiz() {

    document.getElementById("quizArea").style.display =
        "none";

    document.getElementById("quizResult").style.display =
        "block";

    document.getElementById("startQuizBtn").style.display =
        "inline-block";


    document.getElementById("finalScore").innerText =
        quizScore + " / " + quizCards.length;


    const percentage =
        Math.round(
            (quizScore / quizCards.length) * 100
        );


    const message =
        document.getElementById("scoreMessage");


    if (percentage === 100) {

        message.innerText =
            "🏆 Perfect Score! Excellent work!";

    } else if (percentage >= 70) {

        message.innerText =
            "🌟 Great job! Keep practicing!";

    } else if (percentage >= 40) {

        message.innerText =
            "👍 Good effort! Keep improving!";

    } else {

        message.innerText =
            "📚 Keep studying and try again!";
    }
}


// =====================================================
// SHOW ANSWER
// =====================================================

function showAnswer() {

    const answerElement =
        document.getElementById("answer");

    const button =
        document.getElementById("showAnswerBtn");


    if (answerElement.style.display === "none") {

        answerElement.style.display =
            "block";

        button.innerText =
            "🙈 Hide Answer";

    } else {

        answerElement.style.display =
            "none";

        button.innerText =
            "👁️ Show Answer";
    }
}


// =====================================================
// NEXT CARD
// =====================================================

function nextCard() {

    if (flashcards.length === 0) {
        return;
    }


    currentIndex++;


    if (currentIndex >= flashcards.length) {

        currentIndex = 0;
    }


    loadCard();
}


// =====================================================
// PREVIOUS CARD
// =====================================================

function previousCard() {

    if (flashcards.length === 0) {
        return;
    }


    currentIndex--;


    if (currentIndex < 0) {

        currentIndex =
            flashcards.length - 1;
    }


    loadCard();
}


// =====================================================
// ADD CARD
// =====================================================

function addCard() {

    const questionInput =
        document.getElementById("questionInput");

    const answerInput =
        document.getElementById("answerInput");


    const question =
        questionInput.value.trim();

    const answer =
        answerInput.value.trim();


    if (question === "" || answer === "") {

        alert(
            "Please enter both question and answer."
        );

        return;
    }


    flashcards.push({

        question: question,

        answer: answer

    });


    saveCards();


    currentIndex =
        flashcards.length - 1;


    questionInput.value = "";

    answerInput.value = "";


    loadCard();


    alert(
        "Flashcard added successfully!"
    );
}


// =====================================================
// EDIT CARD
// =====================================================

function editCard() {

    if (flashcards.length === 0) {

        alert(
            "There is no flashcard to edit."
        );

        return;
    }


    const questionInput =
        document.getElementById("questionInput");

    const answerInput =
        document.getElementById("answerInput");


    const question =
        questionInput.value.trim();

    const answer =
        answerInput.value.trim();


    if (question === "" || answer === "") {

        alert(
            "Enter the new question and answer."
        );

        return;
    }


    flashcards[currentIndex] = {

        question: question,

        answer: answer

    };


    saveCards();


    questionInput.value = "";

    answerInput.value = "";


    loadCard();


    alert(
        "Flashcard updated successfully!"
    );
}


// =====================================================
// DELETE CARD
// =====================================================

function deleteCard() {

    if (flashcards.length === 0) {

        alert(
            "There are no flashcards to delete."
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this flashcard?"
        );


    if (!confirmDelete) {
        return;
    }


    flashcards.splice(
        currentIndex,
        1
    );


    saveCards();


    if (flashcards.length === 0) {

        currentIndex = 0;

        loadCard();

        return;
    }


    if (currentIndex >= flashcards.length) {

        currentIndex =
            flashcards.length - 1;
    }


    loadCard();


    alert(
        "Flashcard deleted successfully!"
    );
}


// =====================================================
// START APP
// =====================================================

loadCard();