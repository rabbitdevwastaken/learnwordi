"use client";
import WordManagerAuth from "../_components/word-manager-auth";
import { api } from "~/trpc/react";

export default function Words() {
  const wordsList = api.word.getMany.useQuery();

  if (!wordsList.data) {
    return <div>Loading...</div>;
  }

  const formattedWordsList = wordsList.data.reduce<Word[]>((acc, word) => {
    const existingWord = acc.find((w) => w.name === word.word.name);
    if (existingWord && word.definition.definition) {
      existingWord.definitions.push(word.definition.definition);
    } else {
      acc.push({
        id: word.word.id,
        name: word.word.name,
        definition: word.word.definition,
        definitions: word.definition.definition
          ? [word.definition.definition]
          : [],
        selected: word.word.selected,
      });
    }
    return acc;
  }, []);

  return (
    <div>
      <WordManagerAuth wordsList={formattedWordsList} />
    </div>
  );
}
