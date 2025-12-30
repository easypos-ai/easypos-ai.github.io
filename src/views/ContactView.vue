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
            <router-link to="/about" class="text-gray-700 hover:text-primary-600 font-medium">{{ $t('common.about') }}</router-link>
            <router-link to="/contact" class="text-primary-600 font-medium border-b-2 border-primary-600">{{ $t('common.contact') }}</router-link>
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
      <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ $t('contact.title') }}</h1>
      <p class="text-lg text-gray-600 mb-12">我们期待与您合作，共同推动餐饮行业数字化转型</p>
      
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- 联系表单 -->
        <div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">发送消息</h2>
            <el-form :model="form" label-width="80px" class="space-y-6">
              <el-form-item :label="$t('contact.company')">
                <el-input v-model="form.company" placeholder="请输入公司名称" />
              </el-form-item>
              <el-form-item :label="$t('contact.name')">
                <el-input v-model="form.name" placeholder="请输入您的姓名" />
              </el-form-item>
              <el-form-item :label="$t('contact.phone')">
                <el-input v-model="form.phone" placeholder="请输入手机号码" />
              </el-form-item>
              <el-form-item :label="$t('contact.email')">
                <el-input v-model="form.email" placeholder="请输入邮箱地址" />
              </el-form-item>
              <el-form-item label="需求描述">
                <el-input 
                  v-model="form.message" 
                  type="textarea" 
                  :rows="4" 
                  placeholder="请简要描述您的业务需求"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large" class="w-full" @click="submitForm">
                  {{ $t('contact.submit') }}
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- 联系信息 -->
        <div>
          <div class="bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">联系信息</h2>
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                  <span class="text-white">📍</span>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">公司地址</p>
                  <p class="text-gray-600">深圳市南山区南头街道大新股份有限公司六楼601</p>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                  <span class="text-white">📞</span>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">联系电话</p>
                  <p class="text-gray-600"></p>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                  <span class="text-white">✉️</span>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">电子邮箱</p>
                  <p class="text-gray-600">fuyikai@ydt1.com</p>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                  <span class="text-white">🕒</span>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">工作时间</p>
                  <p class="text-gray-600">周一至周五 9:00-18:00</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 地图占位 -->
          <div class="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <p class="text-gray-500">地图位置展示</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const { locale } = useI18n()

const currentLocale = ref(locale.value)

const form = reactive({
  company: '',
  name: '',
  phone: '',
  email: '',
  message: ''
})

const submitForm = () => {
  if (!form.company || !form.name || !form.phone || !form.email) {
    ElMessage.warning('请填写完整的联系信息')
    return
  }
  
  ElMessage.success('提交成功！我们将尽快与您联系')
  // 重置表单
  Object.assign(form, {
    company: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  })
}

const changeLanguage = (lang: string) => {
  locale.value = lang
}
</script>