type WordInputData = {
    name: string;
    definition: string;
    definitions: string[];
}

type Word = WordInputData & {
    id: number;
    selected?: boolean;
}