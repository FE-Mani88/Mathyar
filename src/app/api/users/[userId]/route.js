import userModel from "../../../../../models/Users"

export async function DELETE(req, context) {
    try {
        const { userId } = context.params; // اینجا هیچ await نیاز نیست

        await userModel.findOneAndDelete({ _id: userId });

        return new Response(null, { status: 204 }); // چون body نداره
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Unknown Server Error! :(' }, { status: 500 });
    }
}