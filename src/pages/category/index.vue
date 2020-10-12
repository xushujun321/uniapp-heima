<template>
  <view>
    <!-- 搜索框 -->
		<search-bar @click="tiaozhuan"></search-bar>
    <!-- 纵向 active-id="{{ activeId }}" bind:click-nav="onClickNav" bind:click-item="onClickItem"-->
     
     <!-- 左边内容 -->
        <van-tree-select
          :items="leftTitle"
          height="calc(100vh - 90rpx)"
          :main-active-index="mainActiveIndex"
          @click-nav="onClickNav"
        >
          <!-- 右边内容 -->
          <scroll-view slot="content" scroll-y class="sc_view" :scroll-top="scrollTop">
            <view v-for="(item,index) in rightList" :key="index">
              <!-- 标题 -->
              <view class="cate_name">{{item.cat_name}}</view>
              <!-- 图片 -->
              <view class="cate_list">
                <navigator :url="'/pages/goods_list/index?id='+item2.cat_id" class="cate_item" v-for="(item2,index2) in item.children" :key="index2">
                  <image :src="item2.cat_icon" mode="widthFix"></image>
                  <view>{{item2.cat_name}}</view>
                </navigator>
              </view>
            </view>
          </scroll-view>
        </van-tree-select>
      
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
    mainActiveIndex: 0,
    //左侧导航栏数据
    leftTitle:[],
    //右边侧边栏的内容
    rightList:[],
    //总的所有数据
    category:[],
    scrollTop:0
    }
  },
  onLoad(){
   
   //从本地存储获取数据，看是否存有数据
   const categorys=uni.getStorageSync('categorys')
   //判断是否有数据，没有，默认为空数组
   if(!categorys) {
     //获取数据
     this.scroll()
   }else {
     //判断是否过期，以1分钟为期限
     if(new Date()-categorys.time>60*1000) {
       //如果过期，重新获取数据
       this.scroll()
     }else {
       //如果没过期，直接拿旧数据
       this.category=categorys.list
       this.leftTitle=this.category.map(v=>({text:v.cat_name}))
       this.rightList=this.category[0].children
     }
   }
  },
  methods: {
    //纵向导航栏
   async scroll() {
     this.category=await this.get({url: "/categories"})
     //存储数据
     uni.setStorageSync({
       time:Date.now(),
       list:this.category,
     })
      this.leftTitle=this.category.map(v=>({text:v.cat_name}))
      this.rightList=this.category[0].children
    },
    //点击搜索框跳转到搜索页面
    tiaozhuan() {
      uni.navigateTo({
        url: '/pages/search/index'
      });
    },
    //点击左侧导航栏
    onClickNav(e) {
      // console.log(e.detail.index);
      const index=e.detail.index
      this.rightList=this.category[index].children
      this.scrollTop= Math.random();
    }
  }
}
</script>

<style lang="less">
 .cate_name {
    height: 51px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.cate_list {
    display: flex;
    flex-wrap: wrap;
    .cate_item {
			width: 33.33%;
			text-align: center;
      image {
				width: 80%;
				margin: 0 auto;
      }
    }
  }
.sc_view {
  height: 100%;
}
</style>