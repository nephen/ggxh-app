export default defineEventHandler(async (event) => {
  const { category } = getQuery(event)
  
  // 模拟数据
  return [
    { 
      id: 1, 
      name: '互联网早报', 
      followers: '12.3w', 
      isPromoted: true,
      promotionInfo: {
        price: 399,
        duration: 24
      }
    },
    { 
      id: 2, 
      name: '科技前沿', 
      followers: '9.8w', 
      isPromoted: false,
      promotionInfo: {}
    },
    { 
      id: 3, 
      name: '财经观察', 
      followers: '15.2w', 
      isPromoted: true,
      promotionInfo: {
        price: 599,
        duration: 48
      }
    }
  ]
})
