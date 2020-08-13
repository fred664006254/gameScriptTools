class BureauceratGuideItem extends ScrollListItem {
    private _maskImg: BaseBitmap;
    private _rowIdx = 0;
    private _uiData = undefined;
    //
    private item_bg: BaseBitmap;
    private step_bg: BaseTextField;
    private lb_step: BaseTextField;
    private lb_des: BaseTextField;
    private lb_url: BaseTextField;
    private copy_btn: BaseButton;
    private bg: BaseBitmap;
    private url = "";

    public constructor() {
        super();
    }

    protected initItem(index: number, data: any) {
        this._uiData = data;
        this.width = 600;
        //大背景，待补充
        this.item_bg = BaseBitmap.create("public_9_bg14");
        this.item_bg.width = 600;
        this.item_bg.x = this.item_bg.y = 0;
        this.addChild(this.item_bg);
        //步骤数及其背景,背景待补充
        let limitbg = BaseBitmap.create("common_titlebg");
        limitbg.x = 3;
        limitbg.y = 5;
        this.addChild(limitbg);

        this.lb_step = ComponentManager.getTextField(LanguageManager.getlocal(data.index), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this.lb_step.x = 22;
        this.lb_step.y = 16;
        this.addChild(this.lb_step);

        //介绍文本
        this.lb_des = ComponentManager.getTextField(LanguageManager.getlocal(data.des), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this.lb_des.x = 30;
        this.lb_des.y = 62;
        this.addChild(this.lb_des);

        if (index == 0) {//第一条
            this.item_bg.height = this.height = 157
            //网址、网址背景，网址背景待补充
            this.bg = BaseBitmap.create("public_9_bg20");
            this.bg.x = 18, this.bg.y = 103, this.bg.width = 430, this.bg.height = 36;
            this.addChild(this.bg);
            this.lb_url = ComponentManager.getTextField(data.url, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this.lb_url.x = 37;
            this.lb_url.y = 110;
            this.addChild(this.lb_url);
            this.url = data.url;
            //按键
            this.copy_btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "bureaucratGuide_copy", this.BtnClick, this);
            this.copy_btn.x = 460, this.copy_btn.y = 97;
            this.addChild(this.copy_btn);
        } else {
            this.item_bg.height = this.height = 445;
            this.bg = BaseBitmap.create(data.bg);
            this.bg.x = 14, this.bg.y = 96;
            this.addChild(this.bg);
        }
    }
    private BtnClick() {
        //复制文本
        if (App.DeviceUtil.IsHtml5()) {
            var input = document.createElement("input");
            input.value = this.url;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);
            App.CommonUtil.showTip(LanguageManager.getlocal("welfareViewQQGroup5"));
        }
    }

    public getSpaceX(): number {
        return 10;
    }
	/**
	 * 不同格子Y间距
	 */
    public getSpaceY(): number {
        return 10;
    }
    public dispose(): void {
        super.dispose();
        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap = false;
        this.item_bg = null;
        this.lb_step = null;
        this.lb_des = null
        this.lb_url = null
        this.copy_btn = null
        this.bg = null;
        this.step_bg = null;
    }
}
