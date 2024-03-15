type WordRowProps = {
  word: string;
  definition: string;
};

const WordRow: React.FC<WordRowProps> = ({ word, definition }) => {
  return (
    <>
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p style={{ fontSize: "0.7rem" }} className="font-semibold leading-6">
            {word}
          </p>
          <p
            style={{ fontSize: "0.6rem" }}
            className="wrap leading-5 text-gray-500"
          >
            {definition}
          </p>
        </div>
      </div>
    </>
  );
};

export default WordRow;
