<template lang="">
  <div class="header-menu">
    <div class="home-header">
      <div class="header-left-items" @click="moveToHome">
        <img src="../../assets/logo.png" width="33" height="33" />
        &nbsp;&nbsp;
        <p class="header-title">{{ customizationParametersStore.appTitle }} Chain Scan</p>
      </div>
      <div class="header-link">
        <router-link :to="'/'" class="header-click-text" @click="moveToHome"> Home </router-link>
        &nbsp; &nbsp;
        <div style="margin-bottom: 1px">
          <el-dropdown>
            <span class="header-click-text">
              Token Transfers <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="moveToErc('erc20')">View ERC20 Transfers</el-dropdown-item>
                <el-dropdown-item @click.native="moveToErc('erc721')">View ERC721 Transfers</el-dropdown-item>
                <el-dropdown-item @click.native="moveToErc('erc1155')">View ERC1155 Transfers</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="home-header-search">
      <div class="home-header-search-content">
        <p class="header-search-title">The {{ customizationParametersStore.appTitle }} Chain Explorer</p>
        <div class="row-center">
          <el-autocomplete
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            placeholder="Search by Address / Txhash / Block"
            @select="handleSelect"
            style="width: 700px"
            @keyup.enter.native="searchFilter"
            size="large"
          >
          </el-autocomplete>
          <el-button text bg class="header-button" @click="searchFilter">
            <el-icon color="white" size="large"><Search /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowDown, Search } from '@element-plus/icons-vue';
import { SearchByType } from '../../script/service/searchService';
import { useCustomizationParametersStore } from '@/store/customizationParameters';
import { LinkItem, typeMap } from '@/model/search';

const customizationParametersStore = useCustomizationParametersStore();
const router = useRouter();
const inputValue = ref('');
const searchRes = ref<LinkItem>();
const querySearch = async (queryString: string, cb: (arg: any) => void) => {
  const resList: LinkItem[] = [];
  if (queryString.trim() !== '') {
    if (queryString.trim().length == 42 || !isNaN(Number(queryString.trim()))) {
      const searchTypeRes = await SearchByType(1, queryString.trim());
      if (searchTypeRes.data.type == 1 || searchTypeRes.data.type == 0) {
        resList.push({ value: 'Not Found', link: '404' });
        searchRes.value = {} as LinkItem;
      } else {
        const res: LinkItem = {
          value: typeMap[searchTypeRes.data.type as keyof typeof typeMap].display + ' : ' + queryString.trim(),
          link: typeMap[searchTypeRes.data.type as keyof typeof typeMap].route + queryString.trim(),
        };
        resList.push(res);
        searchRes.value = res;
      }
    } else {
      searchRes.value = {} as LinkItem;
    }
  } else {
    searchRes.value = {} as LinkItem;
  }
  cb(resList);
};

const handleSelect = (item: LinkItem) => {
  inputValue.value = '';
  if (item.value != 'Not Found') {
    router.push(item.link);
  }
};
const searchFilter = () => {
  if (inputValue.value.trim() !== '') {
    if (searchRes.value?.link) {
      router.push(searchRes.value?.link);
    } else {
      router.push('search/' + inputValue.value.trim());
    }
  }
};

const moveToHome = () => {
  router.go(0);
  router.push('/');
};

const moveToErc = (type: string) => {
  router.push('/txs/' + type);
};
</script>
<style lang="less" scoped>
@import '../../style/mixin.less';

.header-menu {
  background-color: white;
  height: 60px;
}

.home-header {
  display: flex;
  flex-direction: row;
  background-color: transparent;
  height: 80px;
  margin: 0 auto;
  max-width: 1350px;
}

.home-header-search {
  margin: 0 auto;
  max-width: @max-width;
}

.home-header-search-content {
  margin-top: 30px;
}
</style>
