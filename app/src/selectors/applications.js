class SelectorsApp {
    list = ({ applications }) => {
        return applications.list;
    }

    title = ({ applications }) => {
        return applications.title;
    }

    count = ({ applications }) => {
        return applications.count;
    }
}

export const selectorApp = new SelectorsApp();