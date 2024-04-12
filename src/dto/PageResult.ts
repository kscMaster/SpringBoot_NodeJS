
export class PageResult<T> {
    pageNo: number = 1; // 页码
    pageSize: number = 10; // 每页总共多少行
    totalPage: number = 0; // 总数页
    totalRows: number = 0; // 总行数
    data: Array<T> = [];

    constructor(pageNo, pageSize) {
        if (pageNo == null) {
            this.pageNo = 1;
        }
        if (pageSize == null) {
            this.pageSize = 10;
        }
        this.pageNo = pageNo - 0;
        this.pageSize = pageSize - 0;
        // if (this.pageNo == 0) {
        //     this.pageNo = 0
        // } else {
        //     this.pageNo -= 1
        // }
    }


    setPageResult(totalRows: number, data: Array<any>) {
        this.setTotalRows(totalRows);
        this.setData(data);
    }

    setTotalRows(totalRows: number) {
        this.totalRows = totalRows;
        if (totalRows % this.pageSize > 0) {
             // @ts-ignore
            this.totalPage = parseInt(totalRows / this.pageSize + 1);
        } else {
            this.totalPage = totalRows / this.pageSize;
        }
    }

    setData(data: Array<T>): void {
        this.data = data;
    }


    getData(): Array<T> {
        return this.data;
    }

    getTotalPage() {
        if (this.totalPage == null) {
            return 0;
        }
        return this.totalPage;
    }

    getPageNo(): number {
        return this.pageNo;
    }

    setPageNo(pageNo: number) {
        this.pageNo = pageNo;
    }

    getPageSize(): number {
        return this.pageSize;
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    getTotalRows(): number {
        if (this.totalRows == null)
            return 0;
        return this.totalRows;
    }

    rows(): number {
        return this.pageSize;
    }

    skip():number{
        return this.pageNo * this.pageSize
    }

    offset() : number{
        if (this.pageNo == 0){
            return 0;
        } else {
            return this.pageNo -1
        }
    }
}