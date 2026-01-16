import { NextResponse } from "next/server";

const API_URL = "https://connect.mailerlite.com/api/subscribers";
const API_KEY = process.env.MAILERLITE_API_KEY;
const GROUP_ID = process.env.MAILERLITE_GROUP_ID;

export async function POST(request: Request) {
  if (!API_KEY || !GROUP_ID) {
    return NextResponse.json(
      { error: "Server misconfiguration. Missing MailerLite credentials." },
      { status: 500 }
    );
  }

  const { email, firstName, lastName } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const payload = {
    email,
    fields: {
      name: firstName,
      last_name: lastName,
    },
    groups: [GROUP_ID],
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: "MailerLite request failed.", details: errorText },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
