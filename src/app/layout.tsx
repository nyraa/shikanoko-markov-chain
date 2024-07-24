import "@app/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shikanoko but it's a Markov chain",
    description: 'A Markov chain to play the "Shikanoko"',
    openGraph: {
        images: [
            {
                url: "https://nyraa.github.io/shikanoko-markov-chain/thumbnail.png",
                width: 1000,
                height: 500,
            }
        ]
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
