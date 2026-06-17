import { Link } from 'react-router-dom'

// Test
export default function Logo() {
    return (
        <Link to={'/'}>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7c3aed] rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                        />
                    </svg>
                </div>
                <span className="text-xl font-extrabold tracking-tighter text-white">
                    MUSIC<span className="text-[#a78bfa]">BOX</span>
                </span>
            </div>
        </Link>
    )
}
