/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: "/picker",
    image: "https://frames-meme-generator.vercel.app/meme1.jpeg",
    imageAspectRatio: '1:1',
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="A">Option A</Button>,
      <Button value="B">Option B</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/picker', (c) => {
  // console.log(c)
  const { buttonValue } = c;
  console.log(buttonValue)
  if (buttonValue == "A"){
    return c.res({
      action: '/meme/a',
      image: "https://frames-meme-generator.vercel.app/meme2.jpeg",
      imageAspectRatio: '1:1',
      intents: [
        <TextInput placeholder="Enter custom fruit..." />,
        <Button value="Value A">D</Button>,
        <Button value="Value B">E</Button>,
      ],
    })
  }

  return c.res({
    action: '/meme/b',
    image: "https://frames-meme-generator.vercel.app/meme3.jpeg",
    imageAspectRatio: '1:1',
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="Value A">F</Button>,
      <Button value="Value B">G</Button>,
    ],
  })


})

app.frame('/meme/:id', (c) => {
  const id = c.req.param('id')

  const {inputText = '' } = c
  console.log(inputText);
  const newSearchParams = new URLSearchParams({
    text: inputText,
  })

  if (id == "a"){
    return c.res({
      image: `https://frames-meme-generator.vercel.app/meme/a?${newSearchParams}`,
    })
  }
  return c.res({
    image: `https://frames-meme-generator.vercel.app/meme/b?${newSearchParams}`,
  })

  // return c.res({
  //   image: `http://localhost:3000/meme2.jpeg`,
  // })
})

export const GET = handle(app)
export const POST = handle(app)
