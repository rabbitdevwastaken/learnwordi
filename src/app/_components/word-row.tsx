"use client";
type WordRowProps = {
    name: string;
    definition: string;
    selected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
    onDefinitionChange: (direction: -1 | 1) => void
    onRemoveWord: () => void;
    showRemoveButton: boolean;
  };
  
  const WordRow: React.FC<WordRowProps> = ({
    name,
    definition,
    selected,
    onRemoveWord,
    showRemoveButton = true,
    onSelectedChange,
    onDefinitionChange
  }) => {
    return (
      <>
        <div
          className="flex min-w-0 gap-x-4 items-center"
          onClick={() => onSelectedChange?.(!selected)}
        >
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => onSelectedChange?.(e.target.checked)}
            className="checkbox checkbox-primary"
          />
  
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6">{name}</p>
            <p className="mt-1 wrap text-xs leading-5 text-gray-500">
              {definition}
            </p>
            <div className="gap-1 ty-2 flex">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDefinitionChange(-1)
                }}
                className="btn btn-square btn-xs text-gray-400"
              >
                {/* lower than */}
                &lt;
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDefinitionChange(1)
                }}
                className="btn btn-square btn-xs text-gray-400"
              >
                {/* greater than */}
                &gt;
              </button>
            </div>
          </div>
        </div>
        <div className="shrink-0 flex flex-wrap gap-2 items-center justify-center">
          {showRemoveButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveWord();
              }}
              className="btn btn-outline btn-square btn-xs"
            >
              x
            </button>
          )}
        </div>
      </>
    );
  };
  
  export default WordRow;
  