import ReactMarkdown from 'react-markdown'

const Bubble = ({ message }) => {
    const { content, role } = message;
    return (
        <ReactMarkdown
            className={role == "user" ? "rounded ml-auto p-2 text-left text-sm max-w-[80%] w-fit bg-white !text-gray-800" : "rounded m-2 p-2 text-left text-sm max-w-[80%] w-fit bg-white !text-gray-800"}
        >
            {content}
        </ReactMarkdown>
    )
}

export default Bubble