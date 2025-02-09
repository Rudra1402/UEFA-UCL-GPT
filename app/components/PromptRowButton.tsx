const PromptRowButton = ({ text, onClickHandler }) => {
    return (
        <button
            className="py-1 px-2 bg-white !text-gray-800 rounded text-sm"
            onClick={onClickHandler}
        >
            {text}
        </button>
    )
}

export default PromptRowButton