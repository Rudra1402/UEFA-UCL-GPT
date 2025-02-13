import Navbar from "./components/Navbar";
import "./global.css";

export const metadata = {
    title: "UCL-GPT",
    description: "THe place to go for all your UEFA Champions League questions!"
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <div className="h-[calc(100vh-60px)] w-full">
                    {children}
                </div>
            </body>
        </html>
    )
}

export default RootLayout