import type {NextApiRequest,NextApiResponse} from 'next'
import OpenAI from 'openai'

const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY})

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end()
  const {text,education} = req.body
  if(!text) return res.status(400).json({error:'text required'})

  const systemPrompt = `You are an expert teacher. Tailor your explanation to the following education level: ${education}. Explain deeply, starting with an intuitive overview, then formal details, then examples, and finish with common pitfalls. Keep the tone friendly and clear.`

  try{
    const completion = await client.chat.completions.create({
      model:'gpt-4o-mini',
      messages:[
        {role:'system',content:systemPrompt},
        {role:'user',content:`Please explain the following material in depth:\n\n${text}`}
      ],
      max_tokens:800
    })

    const explanation = completion.choices?.[0]?.message?.content || 'No response'
    // Return as simple HTML
    const html = explanation.replace(/\n\n/g,'<p>')
    return res.status(200).json({explanation:html})
  }catch(err:any){
    console.error(err)
    return res.status(500).json({error:err.message || 'error'})
  }
}
