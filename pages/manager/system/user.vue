<script lang="tsx">
import { type IUser } from '@/types/instance.resolver'
import { type DataTableBaseColumn } from 'naive-ui'
import { useResolver } from '@/hooks/hook-resolver'
import * as http from '@/interface/instance.service'

export default defineNuxtComponent({
    name: 'MUser',
    setup(props, { slots }) {
        const { state, setState, fetchUpdate } = useResolver<IUser>({
            immediate: true,
            dataColumn: [
                { key: 'avatar', title: '用户头像', width: 100 },
                { key: 'uid', title: 'UID', width: 160 },
                { key: 'nickname', title: '用户昵称', minWidth: 140 },
                { key: 'mobile', title: '手机号', width: 180 },
                { key: 'email', title: '邮箱', width: 180 },
                { key: 'roles', title: '关联角色', minWidth: 220 },
                { key: 'status', title: '角色状态', width: 120 },
                { key: 'createTime', title: '创建时间', width: 180 }
            ],
            request: async data => {
                return await http.fetchUserColumnr()
            }
        })

        function CellElementRender(value: unknown, row: IUser, column: DataTableBaseColumn) {
            if (column.key === 'avatar') {
                return <n-avatar size="medium" src={value} />
            } else if (column.key === 'roles') {
                return (
                    <n-space wrap-item={false} align="center">
                        {row.roles.map(item => (
                            <n-tag bordered={false} type="success">
                                {item.name}
                            </n-tag>
                        ))}
                    </n-space>
                )
            }
            return <n-text>{value ?? '--'}</n-text>
        }

        return () => (
            <common-element mode="absolute" style={{ padding: '20px' }}>
                <n-data-table
                    loading={state.value.loading}
                    columns={state.value.dataColumn}
                    data={state.value.dataSource}
                    flex-height={true}
                    scroll-x={1280}
                    style={{ height: '100%' }}
                    render-cell={CellElementRender}
                />
            </common-element>
        )
    }
})
</script>
