class SelectorsLoad {
    status = ({ load }) => {
        return load.isLoading;
    }
}

export const selectorsLoad = new SelectorsLoad();