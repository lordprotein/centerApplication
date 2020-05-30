class MyCookie {
    constructor(name, isObj = false) {
        this.name = name;
        this.isObj = isObj;
    }

    get = () => {
        let matches = document.cookie.match(new RegExp(
            `(?:^|; )${this.name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`
        ));

        if (!matches) return;

        let result = decodeURIComponent(matches[1]);
        if (this.isObj && result !== undefined) result = JSON.parse(result);

        return matches ? result : undefined;
    }

    set = (value, options = {}) => {
        if (this.isObj) value = JSON.stringify(value);

        options = {
            path: '/',
            'max-age': 1000 * 60 * 60 * 23,
            ...options
        };


        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(this.name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    remove = () => {
        this.set("", {
            'max-age': -1
        })
    }
}

export const myCookie = new MyCookie();
export const myCookieUser = new MyCookie('user', true);
export const myCookieIsLogin = new MyCookie('user');
