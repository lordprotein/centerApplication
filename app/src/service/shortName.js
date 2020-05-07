export const shortenName = (name, count = 20) => {
    return `${name.slice(0, count)} ...`;
}