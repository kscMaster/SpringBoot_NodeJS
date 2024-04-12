
export enum ACTION {
    save = 'save',
    detail = 'detail',
    delete = 'delete',
    list = 'list'
}

export function container(type: string): boolean {
    if (type in ACTION) {
        return true
    }
    return false
}

export enum OPERATOR{
    Like = '包含',
    NotLike = '不包含',
    Eq = '等于',
    Neq = '不等于',
    Gte = '大于等于',
    Lte = '小于等于',
    Between = '区间',
}