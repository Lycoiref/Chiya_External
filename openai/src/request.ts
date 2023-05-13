import axios from 'axios'
export async function askChatGPT(requestMessage) {
  try {
    let params = {
      model: "gpt-3.5-turbo",
      max_tokens: 2048,
      temperature: 0.5,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      messages: requestMessage,
    }
    let response: any = await axios({
      url: 'https://api.openai.com/v1/chat/completions',
      method: "POST",
      data: params,
      headers: {
        Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    response = await response.data
    return response.choices[0].message.content
  } catch (e) {
    console.log('error', e.response.data)
    // return e
  }
}