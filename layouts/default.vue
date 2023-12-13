<template>
    <n-layout class="nuxt-layout">
        <n-layout-header class="nuxt-layout__header" bordered>颐和园路</n-layout-header>
        <n-layout-content :native-scrollbar="false">
            <slot />
        </n-layout-content>
        <n-layout-footer class="nuxt-layout__footer" bordered>成府路</n-layout-footer>
    </n-layout>
</template>
