/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'sans-serif'],
      },
      colors: {
        // --- Ultra Minimalist / Monochrome (PadPRO) ---
        // พื้นหลังหน้าทั้งหมด
        background: '#F8F9FA',

        // พื้นผิว การ์ด แท็บ
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#F3F4F6',
          glass: 'rgba(255, 255, 255, 0.7)',
        },

        // ตัวอักษร
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
          disabled: '#D1D5DB',
        },

        // เส้นขอบ
        border: {
          lighter: '#F3F4F6',
          light: '#E5E7EB',
          DEFAULT: '#E5E7EB',
          dark: '#D1D5DB',
        },

        // ปุ่ม / สถานะ active / XP bar
        primary: {
          DEFAULT: '#111827',
          hover: '#374151',
          light: '#4B5563',
        },
        secondary: {
          DEFAULT: '#374151',
          hover: '#4B5563',
          light: '#6B7280',
        },
        accent: '#111827',
        'accent-hover': '#374151',
        'accent-glow': 'rgba(17, 24, 39, 0.15)',

        // สถานะ (โทนกราไฟต์)
        info: '#6B7280',
        success: '#374151',
        warning: '#4B5563',
        error: '#111827',

        // อ้างอิงเพิ่ม (ใช้แทน gray-xxx)
        pearl: '#F8F9FA',
      },
      boxShadow: {
        'accent-glow': '0 0 24px rgba(17, 24, 39, 0.15)',
      },
    },
  },
  plugins: [],
}
