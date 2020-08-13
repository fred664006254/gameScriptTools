/**
 * 门客出海回归弹框
 * @author 张朝阳
 * date 2019/2/19
 * @class ServantExileServantBackPopupView
 */
class ServantExileServantBackPopupView extends PopupView {
    public constructor() {
        super();
    }
    protected initView(): void {
        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 174;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);

        let messageTF = ComponentManager.getTextField(this.param.data.message, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        messageTF.width = 460;
        messageTF.textAlign = egret.HorizontalAlign.CENTER;
        messageTF.setPosition(bg.x + bg.width / 2 - messageTF.width / 2, bg.y + bg.height / 2 - messageTF.height / 2);
        this.addChildToContainer(messageTF);

        let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        btn.setPosition(this.viewBg.x + this.viewBg.width / 2 - btn.width / 2, bg.y + bg.height + 25);
        this.addChildToContainer(btn);

    }

    protected getBgExtraHeight():number
	{
		return 25;
	}

    protected getTitleStr(): string {
        return 'servantExileServantBackPopupViewTitle';
    }

    public dispose(): void {
        super.dispose();
    }
}