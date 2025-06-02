'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function SweetAlertModal({ title, icon, confirmButtonText, redirectURL }) {
    const router = useRouter()

    useEffect(() => {
        Swal.fire({
            title,
            icon,
            confirmButtonText,
            allowOutsideClick: false,
        }).then(() => {
            router.replace(redirectURL)
        })
    }, [])

    return null
}
