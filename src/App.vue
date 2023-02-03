<template>
  <div class="index">
    <el-container>
      <el-header>
        <div :class="isHome ? 'home-header' : 'info-header'">
          <component :is="isHome ? HomeHeaderVue : InfoHeaderVue"></component>
        </div>
      </el-header>
      <el-main>
        <Suspense>
          <router-view class="content"></router-view>
          <template #fallback> Loading... </template>
        </Suspense>
      </el-main>
      <div class="footer">
        <el-footer> <scan-tail></scan-tail> </el-footer>
      </div>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { watch, ref, Ref } from 'vue';
import HomeHeaderVue from '@/views/Header/HomeHeader.vue';
import InfoHeaderVue from '@/views/Header/InfoHeader.vue';
import { useCustomizationParametersStore } from '@/store/customizationParameters';

const { appTitle } = useCustomizationParametersStore();
document.title = 'The ' + appTitle + ' Explorer';
const route = useRoute();
const isHome: Ref<boolean> = ref(false);
if (route.path === '/') {
  isHome.value = true;
}

watch(
  () => route.path,
  (val) => {
    // console.log('val', val);
    if (val === '/') {
      isHome.value = true;
    } else {
      isHome.value = false;
    }
  }
);
</script>

<style lang="less" scoped>
@import './style/mixin.less';

.content {
  max-width: @max-width;
  margin: 0 auto;
  margin-top: 15px;
}

.el-header {
  padding: 0;
  height: 100%;
}

.el-main {
  min-height: 100%;
  width: 100%;
  padding: 0;
}

.home-header {
  background-color: @home-item-bc;
  height: @home-height;
}

.info-header {
  background-color: white;
  height: @info-header-height;
}

.el-footer {
  display: flex;
  height: @home-height;
  max-width: @max-width;
  background-color: transparent;
  justify-content: center;
  margin: 0 auto;
}

.footer {
  background-color: @home-item-bc;
  margin-top: 2%;
  bottom: 0;
}

@media screen {
  @media (max-width: 500px) {
    .el-footer {
      height: 1000px;
    }
    .footer {
      margin-top: 10%;
    }
    .info-header {
      height: 170px;
    }
  }
}

.el-container {
  width: 100%;
  min-height: 100vh;
}
</style>
