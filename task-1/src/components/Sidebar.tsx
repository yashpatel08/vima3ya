import React from 'react'

interface SidebarProps {
    activeSection: number  
    onNavClick: (index: number) => void
}

const sections = [
    { label: 'Section A', sub: 'Personal Info' },
    { label: 'Section B', sub: 'Contact Details' },
    { label: 'Section C', sub: 'Professional Info' },
    { label: 'Section D', sub: 'Preferences' },
]

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavClick }) => {
    return (
        <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col justify-between px-8 py-12 border-r border-ink-800/60 bg-ink-950/95 backdrop-blur z-20">
            <div>
                <div className="mb-12">
                    <p className="text-xs font-mono tracking-[0.25em] uppercase text-amber-500 mb-1">
                        Vima3ya
                    </p>
                    <h1 className="font-display text-2xl text-ink-50 leading-tight">
                        Registration
                        <br />
                        <span className="italic text-ink-400">Form</span>
                    </h1>
                </div>

                <nav className="flex flex-col gap-1">
                    {sections.map((sec, i) => {
                        const isHighlighted = i <= activeSection
                        return (
                            <button
                                key={sec.label}
                                onClick={() => onNavClick(i)}
                                className={`
                                    group flex items-center gap-4 px-3 py-3 rounded-lg text-left
                                    transition-all duration-300 cursor-pointer
                                    ${isHighlighted
                                        ? 'bg-amber-500/10'
                                        : 'hover:bg-ink-800/40'
                                    }
                `}
                            >
                                <div className="relative flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                    <div
                                        className={`
                                            absolute inset-0 rounded-full border transition-all duration-400
                                            ${isHighlighted
                                                ? 'border-amber-500 scale-100'
                                                : 'border-ink-600 group-hover:border-ink-400'
                                            }
                    `}
                                    />
                                    <div
                                        className={`
                                            w-2 h-2 rounded-full transition-all duration-300
                                            ${isHighlighted
                                                ? 'bg-amber-500 scale-100'
                                                : 'bg-ink-600 group-hover:bg-ink-400 scale-75'
                                            }
                    `}
                                    />
                                </div>

                                <div>
                                    <p
                                        className={`
                                            text-xs font-mono tracking-widest uppercase transition-colors duration-300
                                            ${isHighlighted ? 'text-amber-400' : 'text-ink-500 group-hover:text-ink-300'}
                                            `}
                                    >
                                        {sec.label}
                                    </p>
                                    <p
                                        className={`
                                            text-sm font-body transition-colors duration-300
                                            ${isHighlighted ? 'text-ink-100' : 'text-ink-600 group-hover:text-ink-400'}
                                            `}
                                    >
                                        {sec.sub}
                                    </p>
                                </div>

                                {isHighlighted && (
                                    <div className="ml-auto w-0.5 h-6 bg-amber-500 rounded-full animate-scaleIn" />
                                )}
                            </button>
                        )
                    })}
                </nav>

                <div className="mt-8 px-3">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono text-ink-500 tracking-widest uppercase">Progress</span>
                        <span className="text-xs font-mono text-amber-500">{activeSection + 1}/4</span>
                    </div>
                    <div className="h-0.5 bg-ink-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-amber-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${((activeSection + 1) / 4) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="text-xs font-mono text-ink-700 tracking-wider">
                © 2025 Vima3ya
            </div>
        </aside>
    )
}

export default Sidebar