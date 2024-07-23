import "@app/styles/globals.css";

export const metadata = {
    title: "Shikanoko but it's a Markov chain",
    description: 'A Markov chain to play the "Shikanoko"',
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
