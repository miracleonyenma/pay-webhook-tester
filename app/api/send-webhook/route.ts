const POST = async (req: Request) => {
  try {
    const { url, verificationToken, payload } = await req.json();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "verification-token": verificationToken,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return Response.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("🚨🚨🚨🚨 ~ error:", error);
    return new Response(error.message);
  }
};

export { POST };
