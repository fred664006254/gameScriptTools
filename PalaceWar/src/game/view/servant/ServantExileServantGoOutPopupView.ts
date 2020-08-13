/**
 * 门客出海弹框
 * @author 张朝阳
 * date 2019/2/19
 * @class ServantExileServantGoOutPopupView
 */
class ServantExileServantGoOutPopupView extends PopupView {

    private _confirmCallback: Function = null;
    public constructor() {
        super();
    }
    protected initView(): void {
        this._confirmCallback = this.param.data.confirmCallback;
        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 174;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);

        let topTF = ComponentManager.getTextField(this.param.data.topMessage, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        topTF.width = 460;
        topTF.textAlign = egret.HorizontalAlign.CENTER;
        topTF.lineSpacing = 3;
        topTF.setPosition(bg.x + bg.width / 2 - topTF.width / 2, bg.y + 50);
        this.addChildToContainer(topTF);

        let buttomTF = ComponentManager.getTextField(this.param.data.buttomMessage, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        buttomTF.width = 460;
        buttomTF.textAlign = egret.HorizontalAlign.CENTER;
        buttomTF.lineSpacing = 3;
        buttomTF.setPosition(bg.x + bg.width / 2 - buttomTF.width / 2, topTF.y + topTF.height + 15);
        this.addChildToContainer(buttomTF);

        if (this.param.data.buttomMessage2) {
            let buttomTF2 = ComponentManager.getTextField(this.param.data.buttomMessage2, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            buttomTF2.width = 460;
            buttomTF2.textAlign = egret.HorizontalAlign.CENTER;
            buttomTF2.lineSpacing = 3;
            buttomTF2.setPosition(bg.x + bg.width / 2 - buttomTF.width / 2, buttomTF.y + buttomTF.height + 15);
            this.addChildToContainer(buttomTF2);
            bg.height += buttomTF2.height;
        }

        let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
        cancelBtn.setPosition(bg.x + bg.width / 2 - cancelBtn.width - 45, bg.y + bg.height + 15);
        this.addChildToContainer(cancelBtn);


        let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.confirmBtnClick, this);
        confirmBtn.setPosition(bg.x + bg.width / 2 + 45, bg.y + bg.height + 15);
        this.addChildToContainer(confirmBtn);

    }
    private confirmBtnClick() {
        if (this._confirmCallback) {
            this._confirmCallback.apply(this.param.data.handle);
        }
        this.hide();
    }

    protected getTitleStr(): string {
        return this.param.data.titleKey;
    }

    protected getBgExtraHeight():number
	{
		return 20;
	}

    public dispose(): void {
        this._confirmCallback = null;
        super.dispose();
    }
}