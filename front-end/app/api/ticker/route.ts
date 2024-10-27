import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url as string);
  const ticker = searchParams.get("ticker");

  if (!ticker) {
    return new Response(
      JSON.stringify({ error: "Ticker symbol is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/v6/finance/quote?region=US&lang=en&symbols=${ticker}`,
      {
        headers: {
          "X-API-KEY": process.env.YF_API_KEY as string,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Error fetching data from Yahoo finance api");
    }

    const data = await response.json();
    console.log("data", data);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching data from Yahoo Finance api" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
