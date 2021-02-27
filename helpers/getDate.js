export const getDate = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const hoursFormated = hours < 10 ? `0${hours}` : `${hours}`
    const minutesFormated = minutes < 10 ? `0${minutes}` : `${minutes}`
    return `${hoursFormated}:${minutesFormated}`
}