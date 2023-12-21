import dayjs from 'dayjs'

export function moment(date?: dayjs.ConfigType) {
    return dayjs(date)
}
