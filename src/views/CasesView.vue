<template>
  <div class="min-h-screen pt-16">
    <!-- 导航栏 -->
    <nav class="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold text-primary-800">YDT POS</router-link>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <router-link to="/" class="text-gray-700 hover:text-primary-600 font-medium">{{ $t('common.home') }}</router-link>
            <router-link to="/products" class="text-gray-700 hover:text-primary-600 font-medium">{{ $t('common.products') }}</router-link>
            <router-link to="/cases" class="text-primary-600 font-medium border-b-2 border-primary-600">{{ $t('common.cases') }}</router-link>
            <router-link to="/about" class="text-gray-700 hover:text-primary-600 font-medium">{{ $t('common.about') }}</router-link>
            <router-link to="/contact" class="text-gray-700 hover:text-primary-600 font-medium">{{ $t('common.contact') }}</router-link>
            <el-select v-model="currentLocale" class="w-32" @change="changeLanguage">
              <el-option label="简体中文" value="zh-CN" />
              <el-option label="繁體中文" value="zh-TW" />
              <el-option label="English" value="en" />
            </el-select>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ $t('cases.title') }}</h1>
      <p class="text-lg text-gray-600 mb-8">{{ $t('cases.subtitle') }}</p>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="caseItem in cases" :key="caseItem.id" class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div class="h-48 bg-gray-100 overflow-hidden">
              <img :src="caseItem.image" :alt="caseItem.name" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ caseItem.name }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ caseItem.industry }} • {{ caseItem.scale }}</p>
              <p class="text-gray-700 mb-4">{{ caseItem.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-primary-600 font-semibold">{{ caseItem.result }}</span>
                <el-button type="primary" text>查看详情</el-button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = ref(locale.value)

const cases = [
  {
    id: 1,
    brand: '陈',
    name: '陈鹏鹏潮汕菜',
    industry: '潮汕菜系',
    scale: '50+门店',
    description: '通过智能POS系统实现菜品标准化管理，提升出餐效率35%，顾客满意度显著提高',
    result: '效率提升35%',
    image: '/images/cases/cpp.jpg'
  },
  {
    id: 2,
    brand: '臻',
    name: '臻享·大师兄（香港）',
    industry: '粤菜餐饮',
    scale: '30+门店',
    description: '多语言POS系统支持，实现香港地区门店智能化管理，营业额增长40%',
    result: '营业额增长40%',
    image: '/images/cases/dsx.jpg'
  },
  {
    id: 3,
    brand: '文',
    name: '文章捞面（大陆、新加坡）',
    industry: '面食连锁',
    scale: '100+门店',
    description: '跨国连锁管理解决方案，支持多币种结算，助力国际化业务拓展',
    result: '跨国管理支持',
    image: '/images/cases/wzlm.jpg'
  },
  {
    id: 4,
    brand: '大',
    name: '大碗先生',
    industry: '中式快餐',
    scale: '80+门店',
    description: '使用门店选址系统，科学分析商圈数据，新店开业成功率提升40%',
    result: '选址成功率提升40%',
    image: '/images/cases/dw.png'
  },
  {
    id: 5,
    brand: '辣',
    name: '辣妈（香港）',
    industry: '川菜餐饮',
    scale: '20+门店',
    description: '会员营销系统结合数据分析，提升顾客复购率30%，品牌影响力显著增强',
    result: '复购率提升30%',
    image: '/images/cases/lm.png'
  },
  {
    id: 6,
    brand: '乐',
    name: '乐凯撒披萨',
    industry: '披萨连锁',
    scale: '200+门店',
    description: '全链路数字化解决方案，实现从供应链到门店运营的全面智能化管理',
    result: '全面数字化升级',
    image: '/images/cases/lekaisa.png'
  }
]

const changeLanguage = (lang: string) => {
  locale.value = lang
}
</script>