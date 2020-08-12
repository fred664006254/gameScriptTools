// TypeScript file
enum NoticeItemType {
    Arean = 'arean',
    Shop = 'shop'
}

class NoticeViewItem extends ScrollListItem {
    public constructor () {
        super();
    }

    private _body: NoticeItemShop | NoticeItemArean

    protected initItem(index: number, data: {type: any, params?: any}, param?: any) {
        this.width = 510;
        this.height = 204;
        switch (data.type) {
            case NoticeItemType.Arean:
                this._body = new NoticeItemArean();
                this._body.initView();
                this.addChild(this._body);
                break;
            case NoticeItemType.Shop:
                this._body = new NoticeItemShop();
                this._body.initView(data.params);
                this.addChild(this._body);
                break;
            default:
                break;
        }
    }

    public getSpaceX(): number {
        return 0;
    }

    public getSpaceY(): number {
        return 6;
    }

    public get index(): number {
        return this._index;
    }

    public dispose(): void {
        super.dispose();
    }
}