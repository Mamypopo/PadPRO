<template>
    <div class="flex flex-col items-center justify-center space-y-4">
      <canvas 
        ref="canvas" 
        class="touch-none cursor-crosshair bg-background rounded-3xl border border-border-light shadow-inner"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @touchstart="startDrawing"
        @touchmove="draw"
        @touchend="stopDrawing"
      ></canvas>
      <button @click="resetPattern" class="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline">
        Clear Pattern
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['modelValue'],
    data() {
      return {
        size: 300,
        dots: [],
        path: [],
        isDrawing: false,
        ctx: null
      }
    },
    mounted() {
      this.initCanvas();
    },
    methods: {
      initCanvas() {
        const canvas = this.$refs.canvas;
        canvas.width = this.size;
        canvas.height = this.size;
        this.ctx = canvas.getContext('2d');
        
        // สร้างจุด 9 จุด (3x3)
        const spacing = this.size / 4;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            this.dots.push({
              id: i * 3 + j,
              x: (j + 1) * spacing,
              y: (i + 1) * spacing
            });
          }
        }
        this.render();
      },
      getPos(e) {
        const rect = this.$refs.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
      },
      startDrawing(e) {
        this.isDrawing = true;
        this.path = [];
        this.draw(e);
      },
      draw(e) {
        if (!this.isDrawing) return;
        const pos = this.getPos(e);
        
        // เช็คว่าลากผ่านจุดไหนไหม
        this.dots.forEach(dot => {
          const dist = Math.hypot(dot.x - pos.x, dot.y - pos.y);
          if (dist < 25 && !this.path.includes(dot.id)) {
            this.path.push(dot.id);
            // เสียงสั้นๆ หรือ Haptic Feedback (ถ้ามี)
          }
        });
        this.render(pos);
      },
      stopDrawing() {
        this.isDrawing = false;
        this.$emit('update:modelValue', this.path.join(''));
        this.render();
      },
      resetPattern() {
        this.path = [];
        this.$emit('update:modelValue', '');
        this.render();
      },
      render(currentPos = null) {
        const { ctx, size, dots, path } = this;
        ctx.clearRect(0, 0, size, size);
  
        // วาดเส้นที่ลากแล้ว
        if (path.length > 0) {
          ctx.beginPath();
          ctx.strokeStyle = '#FF8000'; // McLaren Orange
          ctx.lineWidth = 4;
          ctx.lineJoin = 'round';
          path.forEach((id, index) => {
            const dot = dots[id];
            if (index === 0) ctx.moveTo(dot.x, dot.y);
            else ctx.lineTo(dot.x, dot.y);
          });
          if (currentPos && this.isDrawing) ctx.lineTo(currentPos.x, currentPos.y);
          ctx.stroke();
        }
  
        // วาดจุด
        dots.forEach(dot => {
          const isActive = path.includes(dot.id);
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? '#FF8000' : '#2C2C2E';
          ctx.fill();
          if (isActive) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 15, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 128, 0, 0.3)';
            ctx.stroke();
          }
        });
      }
    }
  }
  </script>