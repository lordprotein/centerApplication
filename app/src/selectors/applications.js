class SelectorsApp {
    list = ({ applications }) => {
        return applications.data.appPart.list;
    }

    name = ({ applications }) => {
        return applications.data.appPart.name;
    }

    count = ({ applications }) => {
        return applications.data.appPart.count;
    }
}

export const selectorApp = new SelectorsApp();