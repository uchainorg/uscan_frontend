<template lang="">
  <div class="header-info">
    <div class="header-left-items" @click="moveToHome">
      <img src="../../assets/logo.png" width="33" height="33" />
      &nbsp;&nbsp;
      <p style="font-size: 23px">{{ getTitle() }} Chain Scan</p>
    </div>
    <div class="header-right-items">
      <div class="search-info">
        <div v-if="screenWidth >= 1000">
          <el-autocomplete
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            placeholder="Search by Address / Txhash / Block"
            @select="handleSelect"
            style="width: 600px"
            @keyup.enter.native="searchFilter"
            size="large"
          >
          </el-autocomplete>
        </div>
        <div v-else>
          <el-autocomplete
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            placeholder="Search by Address / Txhash / Block"
            @select="handleSelect"
            style="width: 300px"
            @keyup.enter.native="searchFilter"
            size="large"
          >
          </el-autocomplete>
        </div>

        <el-button text bg style="height: 42px; width: 42px; background-color: #5296d5" @click="searchFilter">
          <el-icon color="white" size="large"><Search /></el-icon>
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <router-link :to="'/'" style="font-size: 15px; font-weight: bold" @click="moveToHome"> Home </router-link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-dropdown>
          <span style="font-size: 15px; font-weight: bold">
            Token Transfers<el-icon><ArrowDown /></el-icon>
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
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowDown, Search } from '@element-plus/icons-vue';
import { SearchByType } from '../../script/service/searchService';
import { getTitle } from '../../script/global';

const router = useRouter();

interface LinkItem {
  value: string;
  link: string;
}
const inputValue = ref('');
const searchRes = ref<LinkItem>();
const screenWidth = ref<number>(0);

onMounted(async () => {
  screenWidth.value = document.body.clientWidth;
  window.onresize = () => {
    return (() => {
      // console.log('document.body.clientWidth', document.body.clientWidth);
      screenWidth.value = document.body.clientWidth;
    })();
  };
});

const querySearch = async (queryString: string, cb: (arg: any) => void) => {
  const typeMap = {
    1: { display: 'Null', route: '' },
    2: { display: 'Address', route: '/address/' },
    3: { display: 'Block', route: '/block/' },
    4: { display: 'Transaction', route: '/tx/' },
  };
  const resList: LinkItem[] = [];
  if (queryString.trim() !== '') {
    if (queryString.trim().length == 42 || !isNaN(Number(queryString.trim()))) {
      const searchTypeRes = await SearchByType(1, queryString.trim());
      // console.log('queryResType.value', searchTypeRes.data.type);
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
  router.push('/');
};

const moveToErc = (type: string) => {
  router.push('/txs/' + type);
};
</script>
<style lang="less" scoped>
@import '../../css/style.css';

.header-right {
  display: flex;
  align-items: center;
}

.header-right-items {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: auto;
}
</style>
