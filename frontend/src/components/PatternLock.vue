<template>
  <div class="flex flex-col items-center justify-center space-y-4">
    <canvas ref="canvas"
      class="touch-none cursor-crosshair bg-background rounded-3xl border border-border-light shadow-inner"
      @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" @touchstart="startDrawing" @touchmove="draw"
      @touchend="stopDrawing"></canvas>
    <button @click="resetPattern" class="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline">
      Clear Pattern
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const canvas = ref(null)
const ctx = ref(null)
const isDrawing = ref(false)
const points = reactive([]) // เก็บพิกัดจุด 9 จุด
const selectedPoints = ref([]) // เก็บ index ของจุดที่ลากผ่าน

// --- ตั้งค่าสีตามระบบ ---
const colors = {
  dotDefault: '#404040',    // border-light
  dotActive: '#CCFF00',     // accent (Electric Lime)
  line: '#00A19B',          // primary (Petronas Teal)
  glow: 'rgba(0, 161, 155, 0.5)' 
}

const initCanvas = () => {
  const c = canvas.value
  c.width = 280
  c.height = 280
  ctx.value = c.getContext('2d')
  
  // คำนวณตำแหน่งจุด 9 จุด
  const spacing = c.width / 4
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      points.push({
        x: spacing * (col + 1),
        y: spacing * (row + 1),
        id: row * 3 + col
      })
    }
  }
  drawCanvas()
}

const drawCanvas = (currentX = null, currentY = null) => {
  const v = ctx.value
  v.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // 1. วาดเส้นเชื่อม (Petronas Teal)
  if (selectedPoints.value.length > 0) {
    v.beginPath()
    v.lineWidth = 4
    v.strokeStyle = colors.line
    v.lineCap = 'round'
    v.lineJoin = 'round'
    
    // เพิ่ม Glow ให้เส้น
    v.shadowBlur = 10
    v.shadowColor = colors.glow

    selectedPoints.value.forEach((id, index) => {
      const p = points[id]
      if (index === 0) v.moveTo(p.x, p.y)
      else v.lineTo(p.x, p.y)
    })

    if (currentX && currentY) {
      const lastPoint = points[selectedPoints.value[selectedPoints.value.length - 1]]
      v.lineTo(currentX, currentY)
    }
    v.stroke()
    v.shadowBlur = 0 // ล้างค่าเงา
  }

  // 2. วาดจุด (Dot)
  points.forEach((p) => {
    const isActive = selectedPoints.value.includes(p.id)
    
    // วาดวงแหวนรอบนอก
    v.beginPath()
    v.arc(p.x, p.y, 8, 0, Math.PI * 2)
    v.fillStyle = isActive ? colors.dotActive : colors.dotDefault
    v.fill()

    if (isActive) {
      // เพิ่ม Glow ให้จุดที่ถูกเลือก (Electric Lime)
      v.shadowBlur = 15
      v.shadowColor = 'rgba(204, 255, 0, 0.6)'
      v.beginPath()
      v.arc(p.x, p.y, 4, 0, Math.PI * 2)
      v.fillStyle = '#FFFFFF'
      v.fill()
      v.shadowBlur = 0
    }
  })
}

const startDrawing = (e) => {
  isDrawing.value = true
  handleMove(e)
}

const draw = (e) => {
  if (!isDrawing.value) return
  handleMove(e)
}

const handleMove = (e) => {
  const rect = canvas.value.getBoundingClientRect()
  const x = (e.clientX || e.touches[0].clientX) - rect.left
  const y = (e.clientY || e.touches[0].clientY) - rect.top

  // เช็คว่าลากผ่านจุดไหนไหม
  points.forEach((p) => {
    const dist = Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2)
    if (dist < 20 && !selectedPoints.value.includes(p.id)) {
      selectedPoints.value.push(p.id)
      emit('update:modelValue', [...selectedPoints.value])
    }
  })
  drawCanvas(x, y)
}

const stopDrawing = () => {
  isDrawing.value = false
  drawCanvas()
}

const resetPattern = () => {
  selectedPoints.value = []
  emit('update:modelValue', [])
  drawCanvas()
}

onMounted(initCanvas)
</script>