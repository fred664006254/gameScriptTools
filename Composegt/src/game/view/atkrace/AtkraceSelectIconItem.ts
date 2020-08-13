class AtkraceSelectIconItem extends BaseDisplayObjectContainer {
    public constructor() {
        super();
        this.initView();
    }

    private data: AtkraceSelectIconInfo;

    private _bg: BaseLoadBitmap;
    private _icon: BaseLoadBitmap;

    private initView() {
        
    }

    public refreshView(data: AtkraceSelectIconInfo) {
        this.data = data;

        this.x = this.data.index * 89;
        this.y = 0;

        this._bg && this._bg.dispose();
        this._icon && this._icon.dispose();

        if (this.data.servant) {
            this._bg = BaseLoadBitmap.create(this.data.servant.qualityBoxImgPath);
            this._bg.width = this._bg.height = 82;
            this.addChild(this._bg);

            this._icon = BaseLoadBitmap.create(this.data.servant.halfImgPath);
            this._icon.width = this._icon.height = 74;
            this.addChild(this._icon);
            this._icon.setPosition(4, 4);
        }
    }

    public get isEmpty(): boolean {
        return this.data.servant ? false : true;
    }

    public get servantId(): string {
        return this.data.servant ? this.data.servant.servantId : null;
    }

    public get Index(): number {
        return this.data.index;
    }

    public moveToPos(dx: number, dy: number) {
        let [_tx, _ty] = [this.data.index * 89, 0];
        this.x = _tx + dx;
        this.y = _ty + dy;
    }

    public dispose() {
        this.data = null;
        this._bg = null;
        this._icon = null;

        super.dispose();
    }
}

interface AtkraceSelectIconInfo {
    index: number,
    servant: ServantInfoVo
}
