import { NextResponse } from 'next/server'
import ticketModel from '../../../../../models/Tickets'
import connectToDB from '../../../../../configs/connectToDB'

export async function PATCH(req, context) {
    await connectToDB()

    const { ticketId } = context.params

    try {
        const updatedTicket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: 'closed' },
            { new: true }
        )

        if (!updatedTicket) {
            return NextResponse.json({ message: 'تیکت پیدا نشد' }, { status: 404 })
        }

        return NextResponse.json({ message: 'تیکت با موفقیت بسته شد', ticket: updatedTicket }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'خطا در سرور' }, { status: 500 })
    }
}
