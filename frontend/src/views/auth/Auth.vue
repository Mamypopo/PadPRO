<template>
    <div class="min-h-screen bg-background flex items-center justify-center p-4 font-sans text-text-primary">

        <div class="w-full max-w-md bg-surface border border-border rounded-[2rem] p-8 shadow-2xl">

            <div class="text-center mb-8">
                <div class="inline-block p-3 bg-primary rounded-2xl mb-4 shadow-[0_0_20px_rgba(255,128,0,0.3)]">
                    <lucide-zap class="text-black" :size="32" />
                </div>
                <h1 class="text-3xl font-bold italic tracking-tighter uppercase">
                    Pad<span class="text-primary">PRO</span>
                </h1>
            </div>

            <div class="flex p-1 bg-surface-light rounded-2xl mb-8 border border-border-light">
                <button @click="isLogin = true" :class="[
                    'flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-300',
                    isLogin ? 'bg-primary text-black shadow-lg' : 'text-text-tertiary hover:text-text-secondary'
                ]">
                    Login
                </button>
                <button @click="isLogin = false" :class="[
                    'flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-300',
                    !isLogin ? 'bg-primary text-black shadow-lg' : 'text-text-tertiary hover:text-text-secondary'
                ]">
                    Register
                </button>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
                <div>
                    <label class="block text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em] mb-2 ml-1">
                        Username
                    </label>
                    <input v-model="form.username" type="text"
                        class="w-full bg-surface-light border border-border text-text-primary p-4 rounded-2xl focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-text-disabled"
                        placeholder="RACER_NAME" required />
                </div>

                <div class="pt-2">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em] ml-1">Secure
                            via</span>
                        <div class="flex gap-2">
                            <button type="button" @click="authMethod = 'password'" :class="[
                                'text-[10px] px-3 py-1 rounded-full border transition-all font-bold',
                                authMethod === 'password' ? 'border-secondary text-secondary bg-secondary/10' : 'border-border text-text-tertiary'
                            ]">
                                PASSWORD
                            </button>
                            <button type="button" @click="authMethod = 'pattern'" :class="[
                                'text-[10px] px-3 py-1 rounded-full border transition-all font-bold',
                                authMethod === 'pattern' ? 'border-secondary text-secondary bg-secondary/10' : 'border-border text-text-tertiary'
                            ]">
                                PATTERN
                            </button>
                        </div>
                    </div>

                    <div v-if="authMethod === 'password'"
                        class="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <input v-model="form.password" type="password"
                            class="w-full bg-surface-light border border-border text-text-primary p-4 rounded-2xl focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-text-disabled"
                            placeholder="••••••••" />
                    </div>

                    <div v-else class="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <PatternLock v-model="form.pattern" />
                    </div>
                </div>

                <button type="submit"
                    class="w-full py-4 bg-primary hover:bg-primary-hover text-black font-black rounded-2xl shadow-[0_8px_20px_rgba(255,128,0,0.2)] active:scale-95 transition-all mt-4 tracking-widest">
                    {{ isLogin ? 'IGNITION' : 'START ENGINE' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { Zap, Grid, ChevronRight } from 'lucide-vue-next';
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { authApi } from '@/api/auth'
import PatternLock from '@/components/PatternLock.vue';

export default {

    components: {
        LucideZap: Zap,
        LucideGrid: Grid,
        LucideChevronRight: ChevronRight,
        PatternLock
    },

    data() {
        return {
            isLogin: true,
            authMethod: 'password',
            form: {
                username: '',
                password: '',
                pattern: ''
            }
        }
    },
    methods: {
        ...mapActions(useAuthStore, ['login']),

        async handleSubmit() {
            const payload = {
                username: this.form.username,
                ...(this.authMethod === 'password' ? { password: this.form.password } : { pattern: this.form.pattern })
            };

            try {
                if (this.isLogin) {
                    await this.login(payload);
                    this.$router.push('/dashboard');
                } else {
                    await authApi.register(payload);
                    this.isLogin = true;
                    alert('Welcome to the Team! Please login.');
                }
            } catch (err) {
                alert(err.response?.data?.error || 'System Error: Access Denied');
            }
        }
    }
}
</script>