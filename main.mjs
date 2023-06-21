const text = decodeURI(window.location.search.slice(1)) || 'use /?your meme here in the url'
const addTextToImage = (imageUrl, text) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const image = new Image()
  image.src = imageUrl

  const draw_wrapped_text = (context, text, color, box) => {
    let [ textBoxX , textBoxY,textBoxWidth , textBoxHeight] = box
    textBoxX += textBoxWidth/2
    const font_size = (textBoxWidth*2)/text.length

    context.font = `bold italic ${font_size}pt Arial`
    //context.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight)
    context.fillStyle = color
    context.textBaseline = 'top'
    context.textAlign = 'center'
    
    const words = text.split(' ')
    let line = ''
    let lineNumber = 0
    const lineHeight = font_size*1.3
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' '
      const metrics = context.measureText(testLine)
      const testWidth = metrics.width
      
      if (testWidth > textBoxWidth && i > 0) {
        context.fillText(line, textBoxX, textBoxY + (lineNumber * lineHeight))
        line = words[i] + ' '
        lineNumber++
      } else {
        line = testLine
      }
    }
    
    context.fillText(line, textBoxX, textBoxY + (lineNumber * lineHeight))
  }
  
  image.onload = () => {
    canvas.width = image.width
    canvas.height = image.height
    
    context.drawImage(image, 0, 0)
    draw_wrapped_text(context, text, 'black', [23,86,156,60])
    draw_wrapped_text(context, text, 'black', [593,91,156,60])
    draw_wrapped_text(context, text, 'black', [3,282,135,55])
    draw_wrapped_text(context, text, 'black', [185,287,135,55])
    draw_wrapped_text(context, text, 'black', [75,415,135,55])
    draw_wrapped_text(context, text, 'white', [593,294,156,44])
    
    document.body.appendChild(canvas)
  }
}

const imageUrl = 'blank_recursion.jpg'
addTextToImage(imageUrl, text)
