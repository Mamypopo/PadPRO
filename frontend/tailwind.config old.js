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
          // --- 🏎️ Mercedes-AMG Petronas 2026 Full Series ---
          
          // สีหลัก: Petronas Teal (สีเขียวมินต์อันทรงพลัง)
          primary: {
            lighter: '#B2E2E0',
            light: '#4DBDB9',
            DEFAULT: '#00A19B',
            hover: '#00C2BA',
            dark: '#007A75',
          },
  
          // สีรอง: Liquid Silver (สีเงิน Metallic)
          secondary: {
            lighter: '#FFFFFF',
            light: '#F9FAFB',
            DEFAULT: '#E5E7EB',
            hover: '#F3F4F6',
            dark: '#9CA3AF',
          },
  
          // Accent 1: Electric Lime (สีสะท้อนแสงตัดสายตา)
          accent: {
            lighter: '#F0FFB2',
            light: '#E0FF66',
            DEFAULT: '#CCFF00',
            hover: '#D9FF33',
            dark: '#99BF00',
          },
  
          
          // Accent 2: Ineos Red (สีแดงแห่งการตัดสินใจ/ความเร็ว)
          accent2: {
            lighter: '#FFB2C4',
            light: '#FF668A',
            DEFAULT: '#FF003C',
            hover: '#FF3363',
            dark: '#CC0030',
          },

          // --- ✅ Status Colors (Added) ---
        success: {
            lighter: '#DCFCE7',
            light: '#4ADE80',
            DEFAULT: '#22C55E', // เขียวสดแบบสัญญาณไฟ Safety Car
            hover: '#16A34A',
            dark: '#14532D',
          },
          warning: {
            lighter: '#FEF9C3',
            light: '#FBBF24',
            DEFAULT: '#F59E0B', // ส้มเหลืองแบบธงเหลืองในสนามแข่ง
            hover: '#D97706',
            dark: '#78350F',
          },
          error: {
            lighter: '#FEE2E2',
            light: '#F87171',
            DEFAULT: '#EF4444', // แดงเข้มแบบธงแดงสั่งหยุดการแข่ง
            hover: '#DC2626',
            dark: '#7F1D1D',
          },
          info: {
            lighter: '#E0F2FE',
            light: '#38BDF8',
            DEFAULT: '#0EA5E9',
            hover: '#0284C7',
            dark: '#0C4A6E',
          },

          // พื้นหลัง: Deep Asphalt 
          background: '#1A1A1A', 
          
        //   background: '#F9FAFB',

          // พื้นผิว Card / Sidebar: Dark Obsidian
          surface: {
            lighter: '#404040',
            light: '#262626',
            DEFAULT: '#121212',
            hover: '#171717',
            dark: '#0A0A0A',
          },
  
          // ตัวอักษร: High Contrast
          text: {
            primary: '#FFFFFF',
            secondary: '#A1A1AA',
            tertiary: '#71717A',
            disabled: '#4B5563',
          },
  
          // เส้นขอบ: Silver Trace
          border: {
            lighter: '#525252',
            light: '#404040',
            DEFAULT: '#262626',
            dark: '#171717',
          }
        },
     
      },
    },
    plugins: [],
  }