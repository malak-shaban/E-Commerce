import React from 'react'

export default function loading() {
    return (
        <div>
            <div className="flex justify-center items-center h-[90vh]">
                <div className="w-12 h-12 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>

        </div>
    )
}
