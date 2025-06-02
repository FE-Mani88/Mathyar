import React from 'react'

export default function Footer({ isNeedDark }) {
    return (
        <footer>
            <div className={"flex flex-wrap items-center md:justify-between justify-center w-full bg-gray-500 text-gray-200 dark:bg-gray-800 py-5 dark:text-white"}>
                <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                    <div className="text-sm text-blueGray-500 py-1">
                        Copyright © <span id="get-current-year">2025</span> MathYar Created By Dev Mani , Javad & Iliya
                    </div>
                </div>
            </div>
        </footer>
    )
}
