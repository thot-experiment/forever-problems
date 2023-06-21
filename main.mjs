const text = decodeURI(window.location.search.slice(1)) || 'use /?your meme here in the url'
const addTextToImage = (imageUrl, text) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const image = new Image()
  image.src = imageUrl

  const draw_wrapped_text = (context, text, color, box) => {
    let [ textBoxX , textBoxY,textBoxWidth , textBoxHeight] = box
    textBoxX += textBoxWidth/2

    let lines = ((text, ratio) => {
      let tl = text.length
      let tll = ((tl/(ratio*0.62))/tl)**1.4*tl+3
      console.log(tll)
      let lines = ['']
      let pos = 0
      text.split(/\W/).forEach(word => {
        if (lines[pos].length+word.length < tll) {
          lines[pos] += ' '+word
        } else {
          pos++ 
          lines[pos] = word
        }
      })
      return lines
    })(text,3).filter(a => a)

    let maxl = lines.reduce((c, ll) => ll.length + c,0)/lines.length
    //let maxl = lines.reduce((c, ll) => ll.length < c?c:ll.length,0)

    const font_size = textBoxWidth/maxl*1.2
    const lineHeight = font_size*1.3

    console.log(lines,maxl)
    context.font = `bold italic ${font_size}pt Arial`
    //context.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight)
    context.fillStyle = color
    context.textBaseline = 'top'
    context.textAlign = 'center'

    lines.forEach((line,i) => context.fillText(line, textBoxX, textBoxY + (i * lineHeight)))
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

    const modImage = new Image()
    modImage.src = canvas.toDataURL()
    document.body.appendChild(modImage)
  }
}

const imageUrl = 'blank_recursion.jpg'
addTextToImage(imageUrl, text)
