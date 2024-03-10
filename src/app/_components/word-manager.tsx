"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import WordInput from "./word-input";
import WordRow from "./word-row";

type WordManageProps = {
  wordsList: Word[];
  onRemoveWord: (wordId: number) => void;
  onSelectedChange: (wordId: number, selected: boolean) => void;
  onDefinitionChange: (wordId: number, direction: -1 | 1) => void;
};

type DefinitionData = {
  meanings: Array<Meaning>;
};

type Meaning = {
  definitions: Array<Definition>;
};

type Definition = {
  definition: string;
};

const fetchDictionary = async (word: string) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      // disable cors
      {
        mode: "cors",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = (await response.json()) as DefinitionData[];
    return data;
  } catch (error) {
    console.error("Error fetching dictionary", error);
  }
};

const WordManager: React.FC<WordManageProps> = (
  { wordsList, onRemoveWord, onSelectedChange, onDefinitionChange } = {
    wordsList: [],
    onRemoveWord: () => void {},
    onSelectedChange: () => void {},
    onDefinitionChange: () => void {},
  },
) => {
  const [name, setName] = useState<string>("");

  const create = api.word.create.useMutation({
    onSuccess: () => {
      setName("");
      alert("Word added");
    },
  });

  const getDefinition = async (name: string): Promise<WordInputData | null> => {
    const data = await fetchDictionary(name);

    if (!data) {
      return null;
    }

    const definitions = data[0]?.meanings[0]?.definitions;
    const definition = definitions?.[0]?.definition;

    if (!definition) {
      return null;
    }

    return {
      name,
      definition,
      definitions: definitions.map((d) => d.definition),
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    const definition = await getDefinition(name);
    if (definition) {
      create.mutate(definition);
    } else {
      alert("No definition found");
    }
  };
  return (
    <>
      <WordInput
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
      ></WordInput>
      <div className="card mt-2 card-bordered flex w-full bg-base-100 px-5">
        <ul className="w-full divide-y divide-gray-800 rounded-box">
          {wordsList.map((dictionary, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-5">
              <WordRow
                showRemoveButton={true}
                {...dictionary}
                key={index}
                onSelectedChange={(selected) => {
                  onSelectedChange(dictionary.id, selected);
                }}
                onDefinitionChange={(direction) => {
                  onDefinitionChange(dictionary.id, direction);
                }}
                onRemoveWord={() => onRemoveWord(dictionary.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WordManager;
