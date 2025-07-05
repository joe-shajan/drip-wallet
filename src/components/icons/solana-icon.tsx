
export const SolanaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
        <defs>
            <linearGradient id="solana-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9945FF" />
                <stop offset="1" stopColor="#14F195" />
            </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="#19161C" />
        <path d="M7 8.5C7.1 8.2 7.4 8 7.7 8h8.6c.4 0 .6.4.3.7l-1.2 1.3c-.1.1-.2.1-.3.1H6.5c-.4 0-.6-.4-.3-.7L7 8.5Z" fill="url(#solana-gradient)" />
        <path d="M7 14.5C7.1 14.2 7.4 14 7.7 14h8.6c.4 0 .6.4.3.7l-1.2 1.3c-.1.1-.2.1-.3.1H6.5c-.4 0-.6-.4-.3-.7L7 14.5Z" fill="url(#solana-gradient)" />
        <path d="M17 11.2c-.1-.2-.3-.2-.5-.2H7.9c-.4 0-.6.4-.3.7l1.2 1.3c.1.1.2.1.3.1h8.3c.4 0 .6-.4.3-.7l-1.2-1.2Z" fill="url(#solana-gradient)" />
    </svg>
)


