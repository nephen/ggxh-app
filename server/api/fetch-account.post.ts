import { defineEventHandler } from 'h3'
import axios from 'axios'
import * as cheerio from 'cheerio'

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)
  
  if (!url) {
    throw createError({
      status: 400,
      message: 'URL is required'
    })
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      }
    })

    // 使用正则表达式匹配 var title = "xxx";
    const titleRegex = /var title\s*=\s*"([^"]+)"/;
    const match = response.data.match(titleRegex);
    const title = match ? match[1] : null;

    if (!title) {
      return {
        status: 404,
        message: 'Title not found',
        title: ''
      }
    }

    return {
      title: title,
      status: 200
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Failed to fetch title',
      title: '',
      data: error
    }
  }
})