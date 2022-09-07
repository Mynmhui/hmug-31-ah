import fly from '@/utils/request.js'

// 获取首页轮播图
export const getBannersApi = () => fly.get('/home/swiperdata')
// 获取导航
export const getNavListApi = () => fly.get('/home/catitems')
// 获取楼层数据
export const getFloorDataApi = () => fly.get('/home/floordata')
