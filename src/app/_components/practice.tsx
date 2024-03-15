import { useState } from "react";

type PracticeProps = {
  wordsList: Word[];
};

function shuffle<T>(array: T[]): T[] {
  return array.slice().sort(() => Math.random() - 0.5);
}

function random<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

const Practice: React.FC<PracticeProps> = ({ wordsList }) => {
  const colors = ["bg-primary", "bg-secondary", "bg-accent"];
  const [answeredWords, setAnsweredWords] = useState<Word[]>([]);
  let leftWords = wordsList.filter((word) => !answeredWords.includes(word));

  if (leftWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">You won!</h2>
        <p className="text-center text-xl font-bold">
          You have guessed all the words
        </p>
        <button
          onClick={() => setAnsweredWords([])}
          className="btn btn-primary"
        >
          Restart
        </button>
      </div>
    );
  }

  if (leftWords.length < 3) {
    leftWords = [...leftWords, ...answeredWords].slice(0, 3);
  }

  const randomAnswers = shuffle<Word>(leftWords).slice(0, 3);

  let randomWord = random<Word>(randomAnswers);

  while (randomWord && answeredWords.includes(randomWord)) {
    randomWord = random<Word>(randomAnswers);
  }

  const onClick = (answer: Word) => {
    if (answer.name === randomWord?.name) {
      setAnsweredWords([...answeredWords, answer]);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Guess the word</h2>
        <p className="text-center text-xl font-bold">
          {randomWord?.definitions && random(randomWord?.definitions)}
        </p>
      </div>

      <div className="spacer my-6"></div>

      <div className="flex flex-col items-center justify-center gap-4">
        {randomAnswers.map((answer, index) => (
          <div
            key={index}
            onClick={() => onClick(answer)}
            className={`card cursor-pointer ${colors[index]} w-96 text-white`}
          >
            <div className="card-body p-4">{answer?.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Practice;
