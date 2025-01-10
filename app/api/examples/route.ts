import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { request, gql } from "graphql-request";

export const GET = async (req: NextRequest) => {
  const session = await getSession();

  if (session) {
    const secret = process.env.NEXTAUTH_SECRET;

    const token = await getToken({
      req,
      secret,
      raw: true,
    });

    const query = gql`
      query GetUserName($id: uuid!) {
        users_by_pk(id: $id) {
          name
        }
      }
    `;

    const { users_by_pk: user } = await request<{ users_by_pk: { name: string } }>(
      process.env.HASURA_PROJECT_ENDPOINT!,
      query,
      { id: session.user?.id },
      { authorization: `Bearer ${token}` }
    );

    return NextResponse.json({
      content: `This is protected content. Your name is ${user.name}`,
    });
  } else {
    return NextResponse.json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};
