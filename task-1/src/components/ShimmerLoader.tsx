import React from 'react'

interface ShimmerLoaderProps {
    visible: boolean
}

const KEYFRAMES = `
@keyframes sh {
  0%   { background-position: -500px 0; }
  100% { background-position:  500px 0; }
}
`

const Bar: React.FC<{ h: number; w?: number | string; mb?: number; r?: number }> = ({
    h, w = '100%', mb = 0, r = 6,
}) => (
    <div style={{
        height: h, width: w, marginBottom: mb, borderRadius: r, flexShrink: 0,
        background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
        backgroundSize: '500px 100%',
        animation: 'sh 1.4s linear infinite',
    }} />
)

const Field: React.FC<{ tall?: boolean }> = ({ tall = false }) => (
    <div>
        <Bar h={9} w={72} mb={8} />
        <Bar h={tall ? 80 : 46} r={8} />
    </div>
)

const ShimmerLoader: React.FC<ShimmerLoaderProps> = ({ visible }) => {
    if (!visible) return null

    return (
        <>
            <style>{KEYFRAMES}</style>

            <div className="fixed inset-0 z-50 flex bg-white">

                <div className="w-64 flex-shrink-0 border-r border-gray-100 px-8 py-12 flex flex-col">
                    <Bar h={8} w={48} mb={6} />
                    <Bar h={24} w={130} mb={48} />

                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-3 px-3 py-3 mb-1 rounded-lg">
                            <div className="w-5 h-5 rounded-full flex-shrink-0 bg-gray-200" />
                            <div className="flex-1">
                                <Bar h={7} w={44} mb={5} />
                                <Bar h={10} w={80} />
                            </div>
                        </div>
                    ))}

                    <div className="mt-8 px-3">
                        <Bar h={8} w="100%" mb={8} />
                        <div className="h-0.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-full" style={{
                                background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
                                backgroundSize: '500px 100%',
                                animation: 'sh 1.4s linear infinite',
                            }} />
                        </div>
                    </div>
                </div>

                <div className="flex-1 py-16 px-12 overflow-y-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    <div className="mb-10">
                        <Bar h={9} w={64} mb={10} />
                        <Bar h={32} w={200} mb={8} />
                        <Bar h={11} w={280} />
                    </div>

                    <div className="max-w-2xl flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Field />
                            <Field />
                        </div>
                        <Field />
                        <Field tall />
                        <Field />

                        <div className="flex items-center gap-4 pt-2">
                            <div className="h-11 w-44 rounded-lg" style={{
                                background: 'linear-gradient(90deg, #fcd34d 25%, #fde68a 50%, #fcd34d 75%)',
                                backgroundSize: '500px 100%',
                                animation: 'sh 1.4s linear infinite',
                            }} />
                            <div className="flex items-center gap-1.5">
                                {[0, 0.2, 0.4].map((d, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" style={{
                                        animation: `pulse 1.2s ease ${d}s infinite`,
                                    }} />
                                ))}
                                <span className="ml-2 text-xs font-mono tracking-widest uppercase text-gray-400">
                                    Submitting...
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShimmerLoader