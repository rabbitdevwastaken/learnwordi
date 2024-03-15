"use client";
import WordManager from "./word-manager";
import { api } from "~/trpc/react";

type WordManageAuthProps = {
  wordsList: Word[];
};

const WordManageAuth: React.FC<WordManageAuthProps> = ({ wordsList }) => {
  const utils = api.useUtils();

  const removeMutation = api.word.remove.useMutation({
    onSuccess: async () => {
      void utils.word.getMany.invalidate();
    },
    onError: (wordId, error) => {
      console.error(error);
      alert("Failed to remove word");
    },
  });

  const selectedMutation = api.word.updateSelected.useMutation({
    onSuccess: () => {
      void utils.word.getMany.invalidate();
    },
    onError: (wordId, error) => {
      console.error(error);
      alert("Failed to update selected");
    },
  });

  const definitionMutation = api.word.updateDefinition.useMutation({
    onSuccess: () => {
      void utils.word.getMany.invalidate();
    },
    onError: (wordId, error) => {
      console.error(error);
      alert("Failed to update definition");
    },
  });

  const handleRemoveWord = async (wordId: number) => {
    removeMutation.mutate({ wordId });
  };

  const handleSelectedChange = async (wordId: number, selected: boolean) => {
    selectedMutation.mutate({ wordId, selected });
  };

  const handleDefinitionChange = async (wordId: number, direction: -1 | 1) => {
    const word = wordsList.find((word) => word.id === wordId);
    if (!word) {
      return;
    }
    const currentDefinitionIndex = word.definitions.indexOf(word.definition);
    const newDefinitionIndex = currentDefinitionIndex + direction;
    const newDefinition = word.definitions[newDefinitionIndex];
    if (!newDefinition) {
      return;
    }
    definitionMutation.mutate({ wordId, definition: newDefinition });
  };

  return (
    <WordManager
      wordsList={wordsList}
      onRemoveWord={handleRemoveWord}
      onSelectedChange={handleSelectedChange}
      onDefinitionChange={handleDefinitionChange}
    />
  );
};

export default WordManageAuth;
