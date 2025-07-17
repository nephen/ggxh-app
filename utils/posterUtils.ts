import QRCode from 'qrcode'

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y,     x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x,     y + h, x,     y + h - r, r)
  ctx.lineTo(x,     y + r)
  ctx.arcTo(x,     y,     x + r, y,     r)
  ctx.closePath()
}

export async function generatePromotionPoster(url) {
  // 1) Create our 600×600 canvas
  const canvas = document.createElement('canvas')
  canvas.width = 600
  canvas.height = 600
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('无法获取canvas上下文')

  // 2) Draw deep purple-blue background
  ctx.fillStyle = '#3b429f'
  ctx.fillRect(0, 0, 600, 600)

  // 3) Draw red quarter-circle fan in top-right
  ctx.fillStyle = '#ef4444'
  ctx.beginPath()
  ctx.moveTo(600, 0)
  ctx.lineTo(600, 100)
  // arc(centerX, centerY, radius, startAngle, endAngle)
  ctx.arc(600, 0, 100, Math.PI / 2, Math.PI, false)
  ctx.closePath()
  ctx.fill()

  // 4) White main title
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 42px Arial'
  ctx.fillText('关关相互', 40, 60)

  // 5) Yellow subtitles
  ctx.fillStyle = '#fcd34d'
  ctx.font = 'bold 36px Arial'
  // first line at absolute y = 140 + 80 = 220
  ctx.fillText('万人互阅、互粉', 40, 220)
  ctx.font = 'bold 30px Arial'
  // second line at y = 140 + 130 = 270
  ctx.fillText('每日上百阅读量', 40, 270)

  // 6) Bottom rounded-corner card
  drawRoundedRect(ctx, 20, 420, 560, 140, 20)
  ctx.fillStyle = '#4338ca'
  ctx.fill()

  // 7) Generate QR code onto an offscreen canvas
  const qrCanvas = document.createElement('canvas')
  await QRCode.toCanvas(qrCanvas, url, {
    width: 120,
    margin: 1,
    color: { dark: '#000000', light: '#ffffff' }
  })

  // 8) Paint QR and its accompanying text
  ctx.drawImage(qrCanvas, 60, 440)
  ctx.fillStyle = '#ffffff'
  ctx.font = '26px Arial'
  ctx.fillText('1w+真人在线互助平台', 300, 490)
  ctx.fillStyle = '#d1d5db'
  ctx.font = '20px Arial'
  ctx.fillText('—— 一键开启你的互助之旅', 300, 520)

  // 9) Return as PNG data URL
  return canvas.toDataURL('image/png')
}
