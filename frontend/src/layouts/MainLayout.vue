<template>
    <div class="flex h-screen bg-zinc-50 dark:bg-neutral-950">
      <aside class="m-4 w-64 rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur-md border border-white/20 dark:bg-zinc-900/80">
        <div class="mb-10 flex items-center gap-3 px-2">
          <div class="h-8 w-8 rounded-lg bg-black dark:bg-white"></div>
          <h1 class="text-xl font-bold tracking-tight">PadPRO</h1>
        </div>
        
        <nav class="space-y-1">
          <router-link to="/" class="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-600 hover:bg-zinc-100 transition-all">
            <i-lucide-layout-dashboard :size="20" />
            <span class="font-medium">Dashboard</span>
          </router-link>
          </nav>
      </aside>
  
      <main class="flex-1 overflow-y-auto p-8 pt-12">
        <router-view />
      </main>
    </div>
  </template>