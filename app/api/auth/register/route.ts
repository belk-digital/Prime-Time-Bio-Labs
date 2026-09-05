import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, acceptsMarketing } = body ?? {};

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: String(email).toLowerCase() } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const user = await payload.create({
      collection: "users",
      data: {
        email,
        password,
        firstName,
        lastName,
        role: "customer",
        acceptsMarketing: acceptsMarketing ?? true,
      },
      overrideAccess: true,
    });

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Unable to create account. Please try again." },
      { status: 500 }
    );
  }
}
