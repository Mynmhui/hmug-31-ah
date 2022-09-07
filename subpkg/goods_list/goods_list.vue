<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods_datil/goods_datil?id=${item.goods_id}`"
      :thumb="item.goods_small_logo || defaultPic" v-for="item in goods" :key="item.goods_id"
      :price="item.goods_price | toFixed" :title="item.goods_name" />
  </view>
</template>

<script>
  import {
    getGoodsListApi
  } from "@/api/goods.js"
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        queryData: {
          query: '', // 关键字
          cid: '', // 分类id
          pagenum: 1, // 页码
          pagesize: 10 // 页码条数
        },
        goods: [], // 后台返回的商品项
        total: 0, // 后台返回的总条数
        isLoading: false,
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods: {
      // 获取商品列表
      async loadGoodsList(stopPullDown) {
        this.isLoading = true
        const {
          goods,
          total
        } = await getGoodsListApi(this.queryData)
        this.isLoading = false
        this.goods = [...this.goods, ...goods]
        this.total = total
        stopPullDown && stopPullDown()
      }
    },
    // 进入页面就调用
    onLoad({
      query
    }) {
      console.log(query)
      this.queryData.query = query
      this.loadGoodsList()
    },
    //下拉刷新
    onPullDownRefresh() {
      this.queryData = {
        query: this.queryData.query,
        cid: '',
        pagenum: 1,
        pagesize: 10
      }
      this.goods = []
      this.total = 0
      this.loadGoodsList(() => {
        uni.stopPullDownRefresh()
      })
    },
    // 上拉触底
    onReachBottom() {
      if (this.queryData.pagenum * this.queryData.pagesize >= this.total) return toast('亲，没有更多数据了')
      if (this.isLoading) return
      // 让页码值自增 +1
      this.queryData.pagenum++
      // 重新获取列表数据
      this.loadGoodsList()
    }
  }
</script>

<style lang="scss">

</style>
