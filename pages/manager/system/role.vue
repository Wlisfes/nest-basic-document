<script lang="tsx">
import { type IRole } from '@/types/instance.resolver'
import { useResolver } from '@/hooks/hook-resolver'
import * as http from '@/interface/instance.service'

export default defineNuxtComponent({
    name: 'MRole',
    setup(props, { slots }) {
        const { state, setState, fetchUpdate } = useResolver<IRole>({
            immediate: true,
            dataColumn: [
                { key: 'name', title: '角色名称', minWidth: 160 },
                { key: 'key', title: '角色标识', minWidth: 160 },
                { key: 'comment', title: '角色描述', minWidth: 220 },
                { key: 'status', title: '角色状态', minWidth: 120 },
                { key: 'createTime', title: '创建时间', minWidth: 180 }
            ],
            request: async data => {
                return await http.fetchRoleColumnr()
            }
        })

        return () => (
            <common-element mode="absolute">
                <n-data-table
                    loading={state.value.loading}
                    columns={state.value.dataColumn}
                    data={state.value.dataSource}
                    flex-height={true}
                    scroll-x={840}
                    style={{ height: '100%' }}
                />
            </common-element>
        )
    }
})
</script>
