export const encode = body => {
    let formBody = []
    for (let item in body) {
        const encodeKey = encodeURIComponent(item)
        const encodeValue = encodeURIComponent(body[item])
        formBody.push(encodeKey + '=' + encodeValue)
    }
    formBody = formBody.join('&')
    return formBody
}