export const dateNormalize = (date, separator = '/') => {
    date = new Date(date);

    return `${date.getDay() + separator + (date.getMonth() + 1) + separator + date.getFullYear()}`;
}

export const shortenName = (name, count = 20) => {
    return `${name.slice(0, count)} ...`;
}