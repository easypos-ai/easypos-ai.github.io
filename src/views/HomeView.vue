<template>
  <div class="min-h-screen">
    <!-- 粒子背景 -->
    <div class="fixed inset-0 z-0">
      <canvas ref="particleCanvas" class="w-full h-full"></canvas>
    </div>

    <!-- 导航栏 -->
    <nav class="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm transition-all duration-300" 
         :class="{'bg-white/95 shadow-lg': scrolled}">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-primary-800 animate-pulse">YDT POS</h1>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <router-link to="/" class="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-110">{{ $t('common.home') }}</router-link>
            <router-link to="/products" class="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-110">{{ $t('common.products') }}</router-link>
            <router-link to="/cases" class="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-110">{{ $t('common.cases') }}</router-link>
            <router-link to="/about" class="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-110">{{ $t('common.about') }}</router-link>
            <router-link to="/contact" class="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-110">{{ $t('common.contact') }}</router-link>
            <el-select v-model="currentLocale" class="w-32 transition-all duration-300 hover:scale-105" @change="changeLanguage">
              <el-option label="简体中文" value="zh-CN" />
              <el-option label="繁體中文" value="zh-TW" />
              <el-option label="English" value="en" />
            </el-select>
          </div>
        </div>
      </div>
    </nav>

    <!-- 英雄区块 -->
    <section class="pt-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 animate-gradient"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div class="text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up" style="animation-delay: 0.2s">{{ $t('home.title') }}</h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up" style="animation-delay: 0.4s">{{ $t('home.subtitle') }}</p>
          <div class="flex justify-center space-x-4 animate-fade-in-up" style="animation-delay: 0.6s">
            <el-button type="primary" size="large" class="transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl" 
                       @click="$router.push('/products')">了解产品</el-button>
            <el-button size="large" class="transform hover:scale-110 transition-all duration-300 border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
                       @click="$router.push('/contact')">联系我们</el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- 行业解决方案 -->
    <section class="py-20 bg-white relative">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-primary-50/20 to-transparent animate-pulse"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12 animate-fade-in" data-scroll>{{ $t('home.industry.title') }}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(industry, index) in industries" :key="industry.key" 
               class="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-blue-100/50 group cursor-pointer"
               :style="`animation-delay: ${index * 0.2}s`" data-scroll>
            <div class="flex items-start mb-6">
              <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 transform group-hover:rotate-12 transition-transform duration-300">
                <span class="text-2xl">{{ industry.icon }}</span>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $t(`home.industry.${industry.key}`) }}</h3>
                <p class="text-gray-600 text-sm">{{ industry.description }}</p>
              </div>
            </div>
            
            <div class="space-y-3 mb-6">
              <div v-for="feature in industry.features" :key="feature" 
                   class="flex items-center text-sm text-gray-700">
                <div class="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                <span>{{ feature }}</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-primary-600 font-semibold text-sm">专属解决方案</span>
              <button class="bg-gradient-to-r from-primary-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transform hover:scale-105 transition-all duration-200">
                了解更多
              </button>
            </div>
          </div>
        </div>
        
        <!-- 行业特色展示 -->
        <div class="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">为什么选择我们的行业解决方案？</h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-xl">🎯</span>
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">深度定制</h4>
              <p class="text-gray-600 text-sm">针对不同行业特点，提供专属的功能模块和业务流程</p>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-xl">🚀</span>
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">快速实施</h4>
              <p class="text-gray-600 text-sm">标准化的实施流程，确保项目快速上线和稳定运行</p>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-xl">💡</span>
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">持续创新</h4>
              <p class="text-gray-600 text-sm">紧跟行业发展趋势，持续优化产品功能和用户体验</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 国际化服务 -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-32 h-32 bg-primary-200 rounded-full -translate-x-16 -translate-y-16 animate-ping opacity-20"></div>
      <div class="absolute bottom-0 right-0 w-48 h-48 bg-blue-200 rounded-full translate-x-24 translate-y-24 animate-pulse opacity-30"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12 animate-fade-in" data-scroll>{{ $t('home.international.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(service, index) in internationalServices" :key="service.key" 
               class="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 border border-white/50"
               :style="`animation-delay: ${index * 0.2}s`" data-scroll>
            <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center mb-6 mx-auto transform hover:rotate-12 transition-transform duration-300">
              <span class="text-white text-2xl">🌍</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">{{ $t(`home.international.${service.key}`) }}</h3>
            <p class="text-gray-600 text-center leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 全链路解决方案 -->
    <section class="py-20 bg-gradient-to-br from-white via-blue-50 to-primary-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-200/20 via-transparent to-transparent"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 animate-fade-in" data-scroll>{{ $t('home.solution.title') }}</h2>
          <p class="text-lg text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in" data-scroll style="animation-delay: 0.2s">{{ $t('home.solution.description') }}</p>
          <div class="bg-gradient-to-r from-primary-500 via-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-500 animate-pulse-slow"
               data-scroll style="animation-delay: 0.4s">
            <div class="flex items-center justify-center mb-4">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <span class="text-2xl">🚀</span>
              </div>
              <h3 class="text-2xl font-bold">一体化餐饮管理平台</h3>
            </div>
            <p class="text-white/90 text-lg leading-relaxed">从前台收银到后台管理，从供应链到数据分析，一站式解决餐饮管理难题</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = ref(locale.value)
const scrolled = ref(false)
const particleCanvas = ref<HTMLCanvasElement>()

const industries = [
  { 
    key: 'dining', 
    icon: '🍽️',
    features: ['智能桌台管理', '会员精准营销', '后厨流程优化', '多支付方式'],
    description: '为高端正餐提供全方位的数字化解决方案'
  },
  { 
    key: 'fastfood', 
    icon: '🍔',
    features: ['快速收银系统', '外卖平台对接', '库存实时监控', '员工绩效管理'],
    description: '提升快餐连锁店的运营效率和顾客体验'
  },
  { 
    key: 'hotpot', 
    icon: '🍲',
    features: ['智能排队叫号', '锅底配方管理', '食材溯源追踪', '会员储值系统'],
    description: '专为火锅业态打造的智能化管理系统'
  },
  { 
    key: 'tea', 
    icon: '🧋',
    features: ['小程序点单', '配方标准化', '会员积分体系', '营销活动管理'],
    description: '助力茶饮品牌实现数字化转型和增长'
  },
  { 
    key: 'bakery', 
    icon: '🥐',
    features: ['保质期预警', '会员储值卡', '线上商城', '生产计划管理'],
    description: '为烘焙行业提供专业的门店管理方案'
  },
  { 
    key: 'coffee', 
    icon: '☕',
    features: ['移动支付集成', '会员等级体系', '供应链管理', '数据分析报表'],
    description: '咖啡连锁品牌的智能化运营伙伴'
  },
  { 
    key: 'buffet', 
    icon: '🍴',
    features: ['计时收费系统', '人流统计分析', '食材成本控制', '会员权益管理'],
    description: '自助餐业态的智能化管理专家'
  }
]

const internationalServices = [
  { 
    key: 'multiCurrency',
    description: '支持全球主流货币结算，自动汇率转换，满足跨国经营需求'
  },
  { 
    key: 'multiTax',
    description: '适配各国税务政策，自动计算税费，确保合规经营'
  },
  { 
    key: 'serviceFee',
    description: '灵活配置服务费规则，支持多种收费模式，提升运营效率'
  }
]

// 粒子系统
class ParticleSystem {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private animationId: number = 0

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.resize()
    this.initParticles()
    this.animate()
  }

  private resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  private initParticles() {
    const count = Math.min(50, Math.floor(window.innerWidth / 20))
    this.particles = Array.from({ length: count }, () => new Particle(this.canvas.width, this.canvas.height))
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    // 绘制渐变背景
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      0,
      this.canvas.width / 2,
      this.canvas.height / 2,
      Math.max(this.canvas.width, this.canvas.height) / 2
    )
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.02)')
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.01)')
    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // 更新和绘制粒子
    this.particles.forEach(particle => {
      particle.update()
      particle.draw(this.ctx)
    })

    this.animationId = requestAnimationFrame(() => this.animate())
  }

  public destroy() {
    cancelAnimationFrame(this.animationId)
  }
}

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.radius = Math.random() * 2 + 0.5
    this.color = `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`
    this.opacity = Math.random() * 0.5 + 0.1
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1
    if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

let particleSystem: ParticleSystem | null = null

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

const initParticles = () => {
  if (particleCanvas.value) {
    particleSystem = new ParticleSystem(particleCanvas.value)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  initParticles()
  
  // 初始化滚动动画观察器
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('[data-scroll]').forEach(el => {
    observer.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (particleSystem) {
    particleSystem.destroy()
  }
})

const changeLanguage = (lang: string) => {
  locale.value = lang
}
</script>