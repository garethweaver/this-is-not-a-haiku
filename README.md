# This is not a haiku

Simple express app that takes a `text` GET string and tests it for Haikus to return to Slack.

After a colleague at work automated me out of a job writing Haikus using OpenAI it became clear we were at war. As OpenAI doesn't appear to be able to count syllables effectievly (for now) the only way to fight back was to call them out on it.

The app is [deployed to Cyclic here](https://energetic-colt-slip.cyclic.app/?text=Charcoal%20flames%20dance%0AA%20tiny%20corpse%20sizzles%20whole%0ABBQ%2C%20oh%20so%20grim.).


### Example data

```
const haiku = encodeURI(`
  Charcoal flames dance
  A tiny corpse sizzles whole
  BBQ, oh so grim.
`)

const response = await fetch(`https://energetic-colt-slip.cyclic.app/?text=${haiku}`)
const json = await response.json()
```

```
{
  "response_type": "in_channel",
  "text": "🤖 Boop beep beep, I'm checking your haiku for syllables...\n\n❌ line 1: Charcoal flames dance [4]\n✅ line 2: A tiny corpse sizzles whole [7]\n❌ line 3: BBQ, oh so grim. [6]\n\n⚠️ This is not a valid haiku! ⚠️"
}
```
