<template>
    <n-config-provider abstract inline-theme-disabled>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </n-config-provider>
</template>

<script lang="ts" setup>
useSeoMeta({
    title: 'Hello word'
})
</script>
