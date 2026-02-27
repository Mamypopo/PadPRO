/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Prompt', 'sans-serif'],
        },
        colors: {
          // --- 🧬 Cyber-Midnight Palette ---
          primary: {
            DEFAULT: '#8B5CF6', // Vivid Violet
            hover: '#A78BFA',
            light: '#C4B5FD',
            dark: '#6D28D9',
          },
          secondary: {
            DEFAULT: '#EC4899', // Neon Pink
            hover: '#F472B6',
            light: '#FBCFE8',
            dark: '#BE185D',
          },
          accent: {
            DEFAULT: '#10B981', // Cyber Green
            hover: '#34D399',
            light: '#6EE7B7',
            dark: '#059669',
          },
          // พื้นหลังน้ำเงินเข้มลึก (Deep Space)
          background: '#020617', 
          
          surface: {
            DEFAULT: '#0F172A', // Slate 900
            light: '#1E293B',   // Slate 800
            lighter: '#334155',
          },
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            tertiary: '#64748B',
          },
          border: {
            DEFAULT: '#1E293B',
            light: '#334155',
          }
        },
        backgroundImage: {
          // Gradient ที่ดูเหมือนแสงนีออน
          'grad-cyber': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          'grad-surface': 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
        },
        boxShadow: {
          'violet-glow': '0 0 20px rgba(139, 92, 246, 0.3)',
          'pink-glow': '0 0 20px rgba(236, 72, 153, 0.3)',
        }
      },
    },
    plugins: [],
  }