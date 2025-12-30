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
            <router-link to="/cases" class="text-gray-700 hover:text-primary-600 font-medium">{{ $t('common.cases') }}</router-link>
            <router-link to="/about" class="text-primary-600 font-medium border-b-2 border-primary-600">{{ $t('common.about') }}</router-link>
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
      <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ $t('about.title') }}</h1>
      <p class="text-lg text-gray-600 mb-12">{{ $t('about.subtitle') }}</p>
      
      <!-- 公司简介 -->
      <div class="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 mb-12">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">关于YDT POS</h2>
            <p class="text-gray-700 leading-relaxed mb-6">
              YDT POS是一家专注于餐饮行业数字化解决方案的高科技企业。我们致力于通过先进的技术手段，
              为餐饮企业提供全方位的POS系统和服务，助力企业实现数字化转型和智能化升级。
            </p>
            <p class="text-gray-700 leading-relaxed">
              自成立以来，我们已经服务了超过1000家餐饮企业，涵盖正餐、快餐、火锅、茶饮、烘焙、咖啡、自助餐等多个细分领域。
              我们的解决方案帮助客户提升了运营效率，降低了成本，增强了市场竞争力。
            </p>
          </div>
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">核心优势</h3>
            <ul class="space-y-3">
              <li class="flex items-center">
                <div class="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                <span class="text-gray-700">10年餐饮行业经验</span>
              </li>
              <li class="flex items-center">
                <div class="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                <span class="text-gray-700">1000+成功案例</span>
              </li>
              <li class="flex items-center">
                <div class="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                <span class="text-gray-700">7x24小时技术支持</span>
              </li>
              <li class="flex items-center">
                <div class="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                <span class="text-gray-700">定制化解决方案</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 发展历程 -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">发展历程</h2>
        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 h-full"></div>
          <div v-for="(milestone, index) in milestones" :key="index" class="relative mb-8">
            <div :class="['flex items-center', index % 2 === 0 ? 'flex-row' : 'flex-row-reverse']">
              <div class="w-1/2 px-8">
                <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ milestone.year }}</h3>
                  <p class="text-gray-700">{{ milestone.event }}</p>
                </div>
              </div>
              <div class="w-8 h-8 bg-primary-500 rounded-full border-4 border-white z-10"></div>
              <div class="w-1/2 px-8"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 团队介绍 -->
      <div class="bg-gray-50 rounded-2xl p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">核心团队</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="member in team" :key="member.id" class="text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white text-2xl font-bold">{{ member.initials }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ member.name }}</h3>
            <p class="text-primary-600 font-medium mb-2">{{ member.position }}</p>
            <p class="text-gray-600 text-sm">{{ member.description }}</p>
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

const milestones = [
  { year: '2015年', event: '公司成立，专注于餐饮POS系统研发' },
  { year: '2017年', event: '推出第一代智能POS系统，服务100+餐饮企业' },
  { year: '2019年', event: '推出云POS平台，实现连锁门店统一管理' },
  { year: '2021年', event: 'AI智能分析系统上线，服务客户超1000家' },
  { year: '2024年', event: '拓展国际市场，支持多语言多币种' }
]

const team = [
  {
    id: 1,
    initials: '黄',
    name: '道泳',
    position: '创始人兼CEO',
    description: '15年餐饮信息化经验，曾任职于多家知名餐饮企业'
  }
]

const changeLanguage = (lang: string) => {
  locale.value = lang
}
</script>