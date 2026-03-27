import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert math tutor and solver. When given a math problem:

1. First, clearly restate the problem.
2. Then solve it step-by-step, showing ALL work and reasoning.
3. Explain the method/rule used at each step (e.g., "Apply the power rule", "Factor the quadratic").
4. Give the final answer clearly marked.
5. If relevant, mention a tip or related concept the student should know.

Use clear mathematical notation. Use ** for exponents (e.g., x**2), fractions as a/b, and √ for square roots.
Format your response with markdown headers and bullet points for clarity.
Always be encouraging and educational in tone.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, imageBase64 } = await req.json();

    if (!question && !imageBase64) {
      return new Response(
        JSON.stringify({ error: "Please provide a math question or image" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userContent: any[] = [];
    
    if (question) {
      userContent.push({ type: "text", text: `Solve this math problem:\n\n${question}` });
    }
    
    if (imageBase64) {
      userContent.push({
        type: "image_url",
        image_url: { url: imageBase64 },
      });
      if (!question) {
        userContent.push({ type: "text", text: "Solve the math problem shown in this image. Identify the problem first, then solve step by step." });
      }
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent.length === 1 && typeof userContent[0].text === "string" ? userContent[0].text : userContent },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Failed to process your math problem" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("math-solver error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
