
//声明变量，达到最后一次请求完成时，才结束加载组件
let loading = 0;

//路径封装
export default {
  //基准路径
  baseURL:"https://api-hmugo-web.itheima.net/api/public/v1",
  //get请求
  async get (options) {
    loading++;
    //显示加载组件
    uni.showLoading({ title: '加载中' })
    //发送请求
    const res = await uni.request({
      //包含请求头参数等其他参数
      ...options,
      url:this.baseURL+options.url
    })
    loading--
    if (loading === 0) {
      //关闭加载组件
      uni.hideLoading();
    }
    //直接返回最后的数据
    return res[1].data.message;
  },
  //post请求
  async postMessage (option) {
    loading++;
    //显示加载组件
    uni.showLoading({ title: "加载中" });
    //发送请求
    const res = await uni.request({
      //包含请求头参数等其他参数
      ...option,
      url:this.baseURL+option.url
    })
    loading--;
    if(loading===0) {
      //关闭加载组件
      uni.hideLoading();
    }
    //直接返回最后的数据
    return res[1].data.message;
  }
}