import api from '@/api/axios' 

export const authApi = {
  /**
   * สมัครสมาชิกใหม่ (รองรับทั้ง Password และ Pattern)
   */
  register(data) {
    return api.post('/auth/register', data)
  },

  /**
   * เข้าสู่ระบบ
   */
  login(data) {
    return api.post('/auth/login', data)
  },

  /**
   * ดึงข้อมูล Profile ของ User ปัจจุบัน (ต้องใช้ Token)
   */
  getProfile() {
    return api.get('/auth/me')
  }
}