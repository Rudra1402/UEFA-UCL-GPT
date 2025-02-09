import "./global.css";

export const metadata = {
    title: "UCL-GPT",
    description: "THe place to go for all your UEFA Champions League questions!"
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}

export default RootLayout