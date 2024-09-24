const POST = async (req: Request) => {
  try {
    const { url, payload } = await req.json();

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
