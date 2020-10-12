<template>
  <view>
    <!-- 搜索框 -->
    <search-bar @click="tiaozhuan"></search-bar>
    <!-- 标签组件 -->
    <van-tabs :active="active" @change="onChange">
      <van-tab title="综合">
        <!-- 滚动条 -->
        <scroll-view 
          scroll-y
          class="scroll"
          refresher-enabled
          @refresherrefresh="refresherrefresh"
          @scrolltolower="scrolltolower"
          >
            <!-- cart商品卡 -->
            <van-card
              v-for="(item,index) in pageList" :key="index"
              title-class="title-class"
              custom-class="custom-class"
              :price="item.goods_price"
              :title="item.goods_name"
              :thumb="item.goods_small_logo||'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg'"
            />
        </scroll-view>
      </van-tab>
      <van-tab title="销量">销量</van-tab>
      <van-tab title="价格">价格</van-tab>
    </van-tabs>
  </view>
</template>

<script>
import SearchBar from '@/components/SearchBar'
export default {
  components: {
      SearchBar
    },
  data () {
    return {
      active:0,
      //页面数据设置
      pages:{
        //分类id
        cid:null,
        //页码
        pagenum:1,
        //也容量
        pagesize:10
      },
      //页面数据
      pageList:[],
      //总页数
      pageTotal:0,
      //节流，上一次请求没有发送完成，就不进行下一次
      flag:false
    }
  },
  methods: {
    //点击搜索框跳转到搜索页面
    tiaozhuan() {
      uni.navigateTo({
        url: '/pages/search/index'
      });
    },
    onChange(e) {
      console.log(e.detail.name);
    },
    //获取综合数据
   async getList() {
      const res=await this.get({url:'/goods/search',data:this.pages})
      //将之前的数据，与新数据进行合并
      this.pageList=[...this.pageList,...res.goods]
      this.pageTotal=Math.ceil(res.total/this.pages.pagesize)
    },
    //下拉菜单
    refresherrefresh() {
      console.log('refresherrefresh');
    },
    //滑到底部
   async scrolltolower() {
      
      //判断是否还有下一页
      if(this.pages.pagenum>this.pageTotal) {
        //不存在下一页,出现提示
        uni.showToast({
          title:'已达到底部，没有数据了',
          icon:'none'
        })
        return
      }
      //如果节流是开的，就不进行下一次的请求
      if(this.flag) {
        uni.showToast({
          title:'上一次的请求为完成',
          icon:'none'
        })
        return
      }
      //开启节流
      this.flag=true
      //如果存在下一页
      this.pages.pagenum++
      //重新发送请求
     await this.getList()
     //关闭节流
     this.flag=false
    }
  },
  onLoad(option) {
    const id=option.id || 5
    this.pages.cid=id
    //获取综合数据
    this.getList()
  }
}
</script>

<style lang="less">
.title-class {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.custom-class {
  background-color: #fff !important;
  border-bottom: 1px solid #ccc;
}
.scroll {
  height: calc(100vh - 180rpx);
}
</style>