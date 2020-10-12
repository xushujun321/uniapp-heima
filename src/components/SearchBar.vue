<template>
  <view class="search_bar" @click="tiaozhuan">
    <navigator>搜索</navigator>
  </view>
</template>

<script>
export default {
  methods: {
    //事件传递，跳转页面
    tiaozhuan() {
      this.$emit('click')
    }
  }
};
</script>

<style lang="less" >
.search_bar {
  /* 
  45px 
  rpx 750 
  vw vh 

  设计稿的宽度 375px  

  小程序中 把所有的宽度的屏幕 看成了750rpx
  375px =  750rpx
  1px = 2rpx 
  45px = 90rpx
   */
  height: 90rpx;
  background-color: #eb4450;
  padding: 15rpx;
  navigator {
    background-color: #fff;
    height: 100%;
    border-radius: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  
  }
}
</style>