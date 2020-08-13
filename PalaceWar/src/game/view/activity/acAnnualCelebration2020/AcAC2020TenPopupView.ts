// TypeScript file

class AcAC2020TenPopupView extends PopupView 
{
    private _callbackF: Function = null;
	private _obj: any = null;
    private _myConfirmBtn: BaseButton = null;

    public constructor() {
		super();
	}

    private get aid(): string {
		return this.param.data.aid;
	}

	private get code(): string {
		return this.param.data.code;
	}

	private get uicode(): string {
		return this.param.data.uicode;
	}

    protected getTitleStr(): string {
		return `acEnjoyNightResultPopupViewTitle-${this.uicode}`;
	}

    protected initView(): void 
    {
        let cfg = <Config.AcCfg.AnnualCelebration2020Cfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (this.param.data && this.param.data.f && this.param.data.o) {
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
        
        let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 650;
		bg.setPosition(this.viewBg.width / 2 - bg.width / 2, 20);
		this.addChildToContainer(bg);

		let oldArr:any[] = this.param.data.info;
		let rect = new egret.Rectangle(0, 0, 510, 640);

		let newArr:any[] = [];
		for (let i=oldArr.length-1; i>=0 ; i--)
		{
			newArr.push(oldArr[i]);
		}

        let scrollList = ComponentManager.getScrollList(AcAC2020TenItem,newArr,rect,{code: this.code, aid: this.aid });
		scrollList.x =5+bg.x; 
		scrollList.y =5+bg.y; 
        this.addChildToContainer(scrollList); 


        this._myConfirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
		this._myConfirmBtn.setPosition(this.viewBg.width / 2 - this._myConfirmBtn.width / 2, bg.y + 12 + bg.height);
		this.addChildToContainer(this._myConfirmBtn);
		// this._myConfirmBtn.setEnable(false);
    }

    public hide(): void 
    {
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		super.hide();
	}


    protected getBgExtraHeight(): number {

		return 10;
	}

    public dispose(): void {

		this._myConfirmBtn = null;
        this._callbackF = null;
        this._obj= null;

		super.dispose();
	}
}