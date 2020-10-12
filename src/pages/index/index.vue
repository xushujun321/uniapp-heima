<template>
	<view >
		<!-- 搜索框 -->
		<search-bar @click="tiaozhuan"></search-bar>
    <!-- 轮播图 -->
		<view class="index-swiper">
			<swiper indicator-dots autoplay circular>
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.image_src" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
    <!-- 导航 -->
		<view class="index-nav">
			<view v-for="(item,index) in navList" :key="index">
				<image :src="item.image_src" mode="widthFix"></image>
			</view>
		</view>
    <!-- 楼层 -->
		<view class="index-footList">
			<view class="index-footList-item" v-for="(item,index) in footList" :key="index">
				<image :src="item.floor_title.image_src" mode="widthFix"></image>
				 <view class="floor_content">
          <view
            class="floor_item"
            v-for="(item2,index2) in item.product_list "
            :key="index2"
          >
            <image
              :mode="index2===0?'widthFix':'scaleToFill'"
              :src="item2.image_src"
            />
          </view>
        </view>
			</view>
		</view>
	</view>
</template>

<script>
import SearchBar from '@/components/SearchBar'
	export default {
		components: {
      SearchBar
    },
		data() {
			return {
				//轮播图数据
				swiperList:[],
				//导航栏数据
				navList:[],
				//楼层数据
				footList:[]
			}
		},
		onLoad() {
			this.swiperList1()	
			this.navList1() 
			this.footTitle1()
		},
		methods: {
			async swiperList1() {
				//发送轮播图请求
				this.swiperList=await this.get({url: "/home/swiperdata"})
			},
			async navList1() {
				//发送导航请求
				this.navList=await this.get({url: "/home/catitems"})
			},
		  async	footTitle1() {
				//发送楼层请求
				this.footList=await this.get({url:"/home/floordata"})
			},
			//点击搜索框跳转到搜索页面
			tiaozhuan() {
				console.log(111);
				uni.navigateTo({
   			  url: '/pages/search/index'
				});
			}
		}
	}
</script>

<style lang="less">
.index-swiper {
  swiper {
		height: 340rpx;
	}
}
.index-nav {
	display: flex;
	view {
		flex:1;
		padding: 20rpx;
	}
}
.index-footList {
	background-color: #f1f1f1;
	  .floor_content {
      // display: flex;
			// flex-wrap: wrap;
			// 清除浮动
			overflow: hidden;
      .floor_item {
				width: 33.33%;
				float: left;
				border: 3rpx solid #fff;
			}
			/* 前四个 nth-child(-n + 4)  */
			/* 后四个 nth-last-child(-n + 4) */
      .floor_item:nth-last-child(-n + 4) {
				height: 208rpx;
        image {
					height: 100%;
        }
    }
	}
}
</style>
