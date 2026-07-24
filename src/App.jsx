import { useEffect, useState } from "react";
import questions from "./assets/question.json";
import { Select } from "./components/Select";

const QUESTION_TIME = 15_000;

export const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerRecords, setAnswerRecords] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const saveAnswerAndMoveNext = (timedOut = false) => {
    if (!currentQuestion) return;

    const record = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer: timedOut ? null : selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect:
        !timedOut && selectedAnswer === currentQuestion.correctAnswer,
      timedOut,
    };

    setAnswerRecords((previousRecords) => [
      ...previousRecords,
      record,
    ]);

    setSelectedAnswer(null);

    const isLastQuestion = currentIndex === questions.length - 1;

    if (isLastQuestion) {
      setQuizCompleted(true);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
  };

  useEffect(() => {
    if (quizCompleted) return;

    const timer = setTimeout(() => {
      saveAnswerAndMoveNext(true);
    }, QUESTION_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, quizCompleted]);

  const score = answerRecords.reduce((total, answer) => {
    return answer.isCorrect ? total + 1 : total;
  }, 0);

  if (quizCompleted) {
    return (
      <main>
        <h1>Quiz completed</h1>

        <h2>
          Your score: {score}/{questions.length}
        </h2>

        {answerRecords.map((record, index) => (
          <section key={record.questionId}>
            <h3>
              {index + 1}. {record.question}
            </h3>

            <p>
              Your answer:{" "}
              {record.selectedAnswer ?? "Not answered"}
            </p>

            <p>
              Correct answer: {record.correctAnswer}
            </p>

            <p>
              Status:{" "}
              {record.timedOut
                ? "Timed out"
                : record.isCorrect
                  ? "Correct"
                  : "Incorrect"}
            </p>
          </section>
        ))}
      </main>
    );
  }

  return (
    <main>
      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>

      <h2>{currentQuestion.question}</h2>

      <Select
        chooseanswer={selectedAnswer}
        setchooseanswer={setSelectedAnswer}
        curroption={currentQuestion.options}
      />

      <button
        type="button"
        disabled={selectedAnswer === null}
        onClick={() => saveAnswerAndMoveNext(false)}
      >
        {currentIndex === questions.length - 1
          ? "Finish"
          : "Next"}
      </button>
    </main>
  );
};