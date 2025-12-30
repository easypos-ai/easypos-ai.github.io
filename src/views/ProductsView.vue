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
            <router-link to="/products" class="text-primary-600 font-medium border-b-2 border-primary-600">{{ $t('common.products') }}</router-link>
            <router-link to="/cases" class="text-gray-700 hover:text-primary-600 font-medium">{{ $t('common.cases') }}</router-link>
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
      <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ $t('products.title') }}</h1>
      
      <!-- 产品分类导航 -->
      <div class="mb-8">
        <el-tabs v-model="activeCategory" type="card">
          <el-tab-pane v-for="category in productCategories" :key="category.key" :label="$t(`products.${category.key}.title`)" :name="category.key">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div v-for="feature in category.features" :key="feature" class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ $t(`products.${category.key}.${feature}`) }}</h3>
                <p class="text-gray-600 text-sm">{{ getFeatureDescription(category.key, feature) }}</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const currentLocale = ref(locale.value)
const activeCategory = ref('store')

const productCategories = [
  { key: 'store', features: ['pos', 'kds', 'mobile', 'queue'] },
  { key: 'online', features: ['miniprogram', 'platform', 'payment', 'review', 'invoice'] },
  { key: 'supply', features: ['purchase', 'order', 'supplier', 'replenish', 'cost'] },
  { key: 'marketing', features: ['member', 'activity', 'recharge', 'coupon', 'analysis', 'points'] },
  { key: 'data', features: ['business', 'memberBoard', 'productBoard', 'dashboard'] },
  { key: 'chain', features: ['organization', 'brand', 'region'] },
  { key: 'storeManagement', features: ['location', 'process', 'warning', 'archive', 'rent'] },
  { key: 'scheduling', features: ['position', 'forecast', 'recommend', 'attendance', 'productivity'] },
  { key: 'sentiment', features: ['research', 'evaluation', 'analysis', 'improvement', 'tracking'] },
  { key: 'service', features: ['hall', 'notice', 'feedback', 'mobile'] }
]

const getFeatureDescription = (category: string, feature: string) => {
  const descriptions: Record<string, Record<string, string>> = {
    store: {
      pos: '高效稳定的收银系统，支持多种支付方式，提升收银效率',
      kds: '智能厨房显示系统，优化出餐流程，减少等待时间',
      mobile: '移动点餐解决方案，提升顾客体验，增加营业额',
      queue: '智能排队叫号系统，优化顾客等待体验'
    },
    online: {
      miniprogram: '定制化小程序和H5页面，打造线上智慧餐厅',
      platform: '聚合美团、饿了么等平台订单，统一管理',
      payment: '安全便捷的在线支付，支持多种支付渠道',
      review: '顾客评价管理系统，及时获取反馈改进服务',
      invoice: '电子发票服务，简化开票流程，提升效率'
    }
  }
  
  return descriptions[category]?.[feature] || '专业的餐饮管理功能，助力企业数字化转型'
}

const changeLanguage = (lang: string) => {
  locale.value = lang
}
</script>