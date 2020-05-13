export const priorityNormalize = (num, reverse) => {
    const valueList = ['Срочно', 'Предпочтительно', 'Не срочно'];

    if (!num) return valueList;

    if (!reverse) {
        switch (+num) {
            case 1: return valueList[0];
            case 2: return valueList[1];
            case 3: return valueList[2];
            default: return;
        }
    }

    switch (num) {
        case valueList[0]: return 1;
        case valueList[1]: return 2;
        case valueList[2]: return 3;
        default: return;
    }
}