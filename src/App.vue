<template>
  <div class="container">
      {{initData}}
      <img :src="BingWallpaper" alt="" srcset="">
  </div>
</template>

<script>
import BingWallpaper from "./assets/images/BingWallpaper.jpg";
export default {
  data(){
      return {
          initData:'vue开发环境',
          BingWallpaper:BingWallpaper
      }
  }
}
</script>

<style lang="less" scoped>
  .container{
      color: red;
      img {
          width: 600px;
      }
  }
</style>>

