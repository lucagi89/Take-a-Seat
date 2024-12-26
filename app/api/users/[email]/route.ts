import { NextResponse } from "next/server";
import { getUserData } from "../../../../lib/data";

export async function GET(req: Request, { params }: { params: { email: string } }) {
    const { email } = params;

    try {
        const user = await getUserData(email);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
