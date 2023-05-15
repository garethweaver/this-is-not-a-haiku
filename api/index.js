import express from 'express'
import { syllableCount } from "syllable-count-english";
import cors from 'cors'
const corsConfig = { origin: ['http://localhost:3000'] }
const app = express()
const port = 3000

app.get('/', cors(corsConfig), async (req, res) => {
  const { haiku } = req.query

  console.log('-------------')

  if (!haiku) {
    return res.send('You must send a haiku.')
  }

  const lines = haiku?.trim().split(/\r?\n/)
  let errored = false
  let message = ''

  if (lines.length !== 3) {
    message += '🤖 Boop beep beep. This haiku does not have 3 lines\n'
    errored = true
  } else {
    message += `🤖 Boop beep beep, I'm checking your haiku for syllables...\n\n`

    lines.forEach((line, idx) => {
      console.log(line, syllableCount(line))
      const s = syllableCount(line)
      const allowed = idx !== 1 ? 5 : 7
      const isValid = s === allowed
      message += `${isValid ? '✅' : '❌'} line ${idx + 1}: ${line} [${s}]\n`
      if (!isValid) {
        errored = true
      }
    })
  }

  if (errored) {
    console.log('INVALID')
    message += `\n⚠️ This is not a valid haiku! ⚠️`
  }

  return res.send(`${message}`)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})