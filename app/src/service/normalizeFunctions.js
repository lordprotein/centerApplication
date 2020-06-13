export const dateNormalize = (date, separator = '/') => {
    date = new Date(date);

    const res = `${date.getDate() + separator + (date.getMonth() + 1) + separator + date.getFullYear()}`;
    
    return String(date) !== 'Invalid Date' ? res : 'Неправильная дата';
}

export const shortenName = (name, count = 20) => {
    return `${name.slice(0, count)} ...`;
}