class SelectorsApp {
    list = ({ applications }) => {
        return applications.list;
    }

    name = ({ applications }) => {
        return applications.name;
    }

    count = ({ applications }) => {
        return applications.count;
    }
}

export const selectorApp = new SelectorsApp();