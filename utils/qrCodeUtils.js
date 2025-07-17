import QRCode from 'qrcode'

// 生成带网站名称的二维码
export async function generateUrlQrWithText(url, siteName) {
  try {
    // 生成基础二维码
    const qrCodeUrl = await QRCode.toDataURL(url)
    
    // 创建canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // 设置canvas尺寸
    const qrSize = 300
    const padding = 20
    const textHeight = 30
    canvas.width = qrSize
    canvas.height = qrSize + padding + textHeight
    
    // 绘制二维码
    const qrImage = new Image()
    qrImage.src = qrCodeUrl
    await new Promise((resolve) => (qrImage.onload = resolve))
    ctx.drawImage(qrImage, 0, 0, qrSize, qrSize)
    
    // 添加文字
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = 'center'
    ctx.fillStyle = '#000'
    ctx.fillText(siteName, qrSize / 2, qrSize + padding)
    
    return canvas.toDataURL()
  } catch (error) {
    console.error('生成二维码失败:', error)
    return null
  }
}