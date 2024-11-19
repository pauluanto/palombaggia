import OpenAI from 'openai';

export const testOpenAIConnection = async (apiKey: string) => {
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Test de connexion. Réponds simplement 'OK' si tu me reçois."
        }
      ],
      max_tokens: 5
    });

    return {
      success: true,
      message: completion.choices[0].message.content
    };
  } catch (error: any) {
    console.error('Erreur de test OpenAI:', error);
    return {
      success: false,
      error: error.message,
      status: error.status,
      type: error.type
    };
  }
};