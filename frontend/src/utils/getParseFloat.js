const getParseFloat = (num) => {

    return parseFloat(num).toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
    })
}

export default getParseFloat;