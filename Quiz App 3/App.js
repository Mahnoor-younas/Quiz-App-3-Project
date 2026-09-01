const questions = [
    {
      q: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: 1
    },
    {
      q: "What is the capital of Japan?",
      options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      answer: 2
    },
    {
      q: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
      answer: 1
    },
    {
      q: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: 3
    },
    {
      q: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Silver"],
      answer: 1
    },
    {
      q: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"],
      answer: 2
    },
    {
      q: "Which language is primarily used for styling web pages?",
      options: ["HTML", "CSS", "Python", "JSON"],
      answer: 1
    },
    {
      q: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      answer: 2
    }
  ];
 
  let current = 0;
  let score = 0;
  let selected = null;
  let answered = false;
 
  const card = document.getElementById('card');
  const tally = document.getElementById('tally');
  const trackFill = document.getElementById('trackFill');
  const letters = ['A', 'B', 'C', 'D'];
 
  function renderQuestion() {
    answered = false;
    selected = null;
    const item = questions[current];
 
    tally.textContent = `Question ${current + 1} of ${questions.length}`;
    trackFill.style.width = `${(current / questions.length) * 100}%`;
 
    card.className = 'card fade-in';
    card.innerHTML = `
      <div class="q-index">SCORE: ${score}</div>
      <p class="q-text">${item.q}</p>
      <div class="options" id="options"></div>
      <div class="foot">
        <div class="feedback" id="feedback"></div>
        <button class="btn" id="actionBtn" disabled>Submit</button>
      </div>
    `;
 
    const optionsEl = document.getElementById('options');
    item.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.innerHTML = `<span class="letter">${letters[i]}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => selectOption(i));
      optionsEl.appendChild(btn);
    });
 
    document.getElementById('actionBtn').addEventListener('click', handleAction);
  }
 
  function selectOption(i) {
    if (answered) return;
    selected = i;
    document.querySelectorAll('.option').forEach((el, idx) => {
      el.classList.toggle('selected', idx === i);
    });
    document.getElementById('actionBtn').disabled = false;
  }
 
  function handleAction() {
    if (!answered) {
      lockAnswer();
    } else {
      goNext();
    }
  }
 
  function lockAnswer() {
    answered = true;
    const item = questions[current];
    const options = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    const actionBtn = document.getElementById('actionBtn');
 
    options.forEach((el, idx) => {
      el.classList.add('locked');
      if (idx === item.answer) el.classList.add('correct');
      else if (idx === selected) el.classList.add('wrong');
    });
 
    if (selected === item.answer) {
      score++;
      feedback.textContent = 'Correct!';
      feedback.className = 'feedback correct';
    } else {
      feedback.textContent = 'Not quite.';
      feedback.className = 'feedback wrong';
    }
 
    document.querySelector('.q-index').textContent = `SCORE: ${score}`;
    actionBtn.textContent = current === questions.length - 1 ? 'See results' : 'Next';
  }
 
  function goNext() {
    current++;
    if (current < questions.length) {
      renderQuestion();
    } else {
      renderResult();
    }
  }
 
  function renderResult() {
    trackFill.style.width = '100%';
    tally.textContent = 'Complete';
 
    const pct = Math.round((score / questions.length) * 100);
    let verdict;
    if (pct === 100) verdict = "Perfect score. Nicely done.";
    else if (pct >= 70) verdict = "Strong showing.";
    else if (pct >= 40) verdict = "Decent effort — room to improve.";
    else verdict = "Worth another go.";
 
    card.className = 'card fade-in result';
    card.innerHTML = `
      <div class="score-num">${score}/${questions.length}</div>
      <div class="score-label">${pct}% correct</div>
      <p class="verdict">${verdict}</p>
      <button class="btn restart-btn" id="restartBtn">Restart quiz</button>
    `;
 
    document.getElementById('restartBtn').addEventListener('click', () => {
      current = 0;
      score = 0;
      renderQuestion();
    });
  }
 
  renderQuestion();

 
