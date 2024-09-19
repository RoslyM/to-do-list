import dayjs from 'dayjs';
export const formatedDate = (date: string)=>{
    return dayjs(date).format('DD/MM/YYYY')
}
export const formatedDateIso = (date: string)=>{
    return dayjs(date).format('YYYY-MM-DD')
}