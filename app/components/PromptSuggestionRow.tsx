import PromptRowButton from "./PromptRowButton"

const PromptSuggestionRow = ({ onClickHandler }) => {
    const prompts = [
        "When did the UEFA Champions League begin?",
        "Did Real Madrid won the UEFA Champions League three years in a row?",
        "Which teams from England, Germany, and Spain play in the UEFA Champions League?",
        "How can I get live updates about games in the UEFA Champions League?"
    ]
    return(
        <div className="flex flex-wrap justify-center gap-2">
            {prompts.map((prompt, index) => (
                <PromptRowButton key={index} text={prompt} onClickHandler={() => onClickHandler(prompt)} />
            ))}
        </div>
    )
}

export default PromptSuggestionRow