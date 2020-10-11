<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/styles/iconfont.wxss";

	 page,view,text,navigator,swiper,swiper-item,image{
        box-sizing: border-box;
    }
    image{
        width: 100%;
        display: block;
    }
    view{
        /* 设计稿的宽度 375px 1px = 2rpx */
        font-size: 28rpx;
        color:#666;
    }
</style>
