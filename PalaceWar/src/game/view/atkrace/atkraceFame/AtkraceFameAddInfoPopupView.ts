/**
 * 门客名望加成详情
 * author hyd
 * date 2019/8/29
 * @class AtkraceFameAddInfoPopupView
 */
class AtkraceFameAddInfoPopupView extends PopupView {
    private _nodeContainer: BaseDisplayObjectContainer;


    public constructor() {
        super();
    }

    protected initView(): void {

        let bg: BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 520;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2 ;
        bg.y = 30;
        this.addChildToContainer(bg);


        const allAtkNum = Api.atkraceVoApi.getFameTotalAddAtkByType(1);
        let allAtkNumText = ComponentManager.getTextField(`${LanguageManager.getlocal('atkraceFameUpTip1')}${App.StringUtil.formatStringColor(`+${allAtkNum}`,TextFieldConst.COLOR_WARN_GREEN)}`, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(allAtkNumText);
        allAtkNumText.setPosition(bg.x + bg.width / 2 - allAtkNumText.width / 2, bg.y + 20);


        // const allAtkPer = Api.atkraceVoApi.getFameTotalAddAtkByType(2).toFixed(1);
        // let allAtkPerText = ComponentManager.getTextField(`${LanguageManager.getlocal('atkraceFameUpTip1')}${App.StringUtil.formatStringColor(`+${allAtkPer}%`,TextFieldConst.COLOR_WARN_GREEN)}`, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // this.addChildToContainer(allAtkPerText);
        // allAtkPerText.setPosition(bg.x + bg.width / 2 - allAtkPerText.width / 2, allAtkNumText.y + allAtkNumText.height + 20);

        const allCrtNum = Api.atkraceVoApi.getFameTotalAddCrt().toFixed(1);
        let allCrtNumText = ComponentManager.getTextField(`${LanguageManager.getlocal('atkraceFameUpTip2')}${App.StringUtil.formatStringColor(`+${allCrtNum}%`,TextFieldConst.COLOR_WARN_GREEN)}`, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(allCrtNumText);
        allCrtNumText.setPosition(bg.x + bg.width / 2 - allCrtNumText.width / 2, allAtkNumText.y + allAtkNumText.height + 20);

        bg.height = allCrtNumText.y + allCrtNumText.height + 20 - bg.y;

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "confirmBtn", this.clickConfirmHandler, this);
		this.addChildToContainer(confirmBtn);
		confirmBtn.setPosition(bg.x + bg.width / 2 - confirmBtn.width / 2, bg.y + bg.height + 40);

    }

    protected getBgExtraHeight():number
	{
		return 30;
	}

    public dispose(): void {
        super.dispose();
    }
}