"use client";
import React from "react";

interface WordInputProps {
  name: string;
  setName: (name: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const WordInput: React.FC<WordInputProps> = ({
  name,
  setName,
  handleSubmit,
}) => {
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2 justify-between">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter a new word"
          className="input grow-1 input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary">
          Add Word
        </button>
      </form>
    </div>
  );
};

export default WordInput;
