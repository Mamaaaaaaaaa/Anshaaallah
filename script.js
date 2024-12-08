const questions = [
    { question: "🎨 ما لون توتا المفضل؟ 🌈", correct: "الأصفر", options: ["الأصفر", "الوردي", "الأزرق", "الأخضر"] },
    { question: "🏅 ما الرياضة المفضلة عند توتا؟ ⚽🎾", correct: "التنس", options: ["التنس", "كرة القدم", "السباحة", "كرة السلة"] },
    { question: "🍝 ما أكلة توتا المفضلة؟ 🍛", correct: "المكرونة بالبشاميل", options: ["المكرونة بالبشاميل", "البيتزا", "الكفتة", "الكشري"] },
    { question: "🥭 ما الفاكهة المفضلة عند توتا؟ 🍎🍌", correct: "المانجو", options: ["المانجو", "التفاح", "الموز", "البرتقال"] },
    { question: "🥤 ما العصير المفضل عند توتا؟ 🥤", correct: "عصير المانجو", options: ["عصير المانجو", "عصير البرتقال", "عصير الليمون", "عصير الفراولة"] },
    { question: "✨ قد ايه توتا جميلة؟ 💃", correct: "100%", options: ["50%", "75%", "100%", "1000%"] },
    { question: "🏖️ ما المكان المفضل عند توتا؟ 🏝️", correct: "الإسكندرية", options: ["الإسكندرية", "القاهرة", "أسوان", "الأقصر"] },
    { question: "🎤 ما هواية توتا المفضلة؟ 🎨🎶", correct: "الغناء", options: ["الغناء", "الرقص", "الرسم", "القراءة"] },
    { question: "👿 مين أكبر عدو لتوتا؟ 😡", correct: "عيشة", options: ["عيشة", "فاطمة", "ندى", "أمل"] }
];

const questionsContainer = document.getElementById("questionsContainer");
const resultDiv = document.getElementById("result");
const emailButton = document.getElementById("emailButton");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

questions.forEach((q, index) => {
    const shuffledOptions = [...q.options];
    shuffle(shuffledOptions);

    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `<span>${q.question}</span>`;
    shuffledOptions.forEach(option => {
        questionDiv.innerHTML += `
            <div>
                <label>
                    <input type="radio" name="q${index}" value="${option}" required>
                    ${option}
                </label>
            </div>
        `;
    });
    questionsContainer.appendChild(questionDiv);
});

function submitQuiz() {
    const form = document.getElementById("quizForm");
    const formData = new FormData(form);
    let score = 0;

    questions.forEach((q, index) => {
        if (formData.get(`q${index}`) === q.correct) {
            score++;
        }
    });

    const percentage = Math.round((score / questions.length) * 10);
    resultDiv.classList.remove("hidden");
    resultDiv.textContent = `حصلت على ${percentage} من 10!`;
    resultDiv.style.color = percentage > 5 ? "green" : "red";

    emailButton.classList.remove("hidden");
}

function sendEmail() {
    const name = document.querySelector("[name='name']").value;
    const result = resultDiv.textContent;
    const mailtoLink = `mailto:Playstation4M1977@gmail.com?subject=نتيجة اختبار توتا&body=الاسم: ${name}%0A${result}`;
    window.location.href = mailtoLink;
}
