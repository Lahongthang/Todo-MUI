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

export const capitalize = text => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}