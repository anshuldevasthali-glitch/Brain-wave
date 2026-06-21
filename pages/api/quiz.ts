import type {NextApiRequest,NextApiResponse} from 'next'
import OpenAI from 'openai'

const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY})

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end()
  const {text,education} = req.body
  if(!text) return res.status(400).json({error:'text required'})

  const prompt = `You are a teacher. Create a short 3-question quiz (varied types: multiple choice, short answer) for this material tuned to ${education}. Output JSON with an array 'questions' where each question has: type, question, choices (if mcq), answer.`

  try{
    const completion = await client.chat.completions.create({
      model:'gpt-4o-mini',
      messages:[{role:'system',content:'You are a helpful quiz generator.'},{role:'user',content:prompt + '\n\n' + text}],
      max_tokens:500
    })

    const raw = completion.choices?.[0]?.message?.content || ''
    // Try to parse JSON from response
    let parsed = null
    try{ parsed = JSON.parse(raw) }catch(e){
      // fallback: return raw
      parsed = {raw}
    }
    return res.status(200).json({quiz:parsed})
  }catch(err:any){
    console.error(err)
    return res.status(500).json({error:err.message || 'error'})
  }
}
