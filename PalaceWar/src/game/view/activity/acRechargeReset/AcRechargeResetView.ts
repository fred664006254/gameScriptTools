/**
  * 首冲重置 活动
  * @author 张朝阳
  * date 2019/6/24
  * @class AcRechargeResetView
  */
class AcRechargeResetView extends AcCommonView {

    private _countDownTime: BaseTextField = null;

    public constructor() {
        super();
    }

    public initView() {

        let cfg = <Config.AcCfg.RechargeResetCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcRechargeResetVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        vo.setOpenTime();

        let bg = BaseLoadBitmap.create("acrechargeresetview_bg");
        bg.width = 640;
        bg.height = 534;
        bg.setPosition(0, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);

        let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeResetViewTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        titleTF.setPosition(bg.x + bg.width / 2 - titleTF.width / 2, bg.y + 42 - titleTF.height / 2);
        this.addChildToContainer(titleTF);

        let midBg = BaseLoadBitmap.create("acrechargeresetview_midbg")
        midBg.width = 574 ;
        midBg.height = 202;
        midBg.setPosition(bg.x + bg.width / 2 - midBg.width / 2, bg.y + 77);
        this.addChildToContainer(midBg);


        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeResetView_acCountTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTime.setPosition(GameConfig.stageWidth / 2 - this._countDownTime.width / 2, midBg.y + 175 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);

        let acTime = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeResetView_acTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        acTime.setPosition(bg.x + 60, midBg.y + midBg.height + 10);
        this.addChildToContainer(acTime);

        let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeResetViewDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        descTF.width = 520;
        descTF.lineSpacing = 5;
        descTF.setPosition(midBg.x + midBg.width / 2 - descTF.width / 2, acTime.y + acTime.height + 5);
        this.addChildToContainer(descTF);

        let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "gotocharge", () => {
            let v = <AcRechargeResetVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            if ((!v.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }, this);
        chargeBtn.setPosition(bg.x + bg.width / 2 - chargeBtn.width / 2, bg.y + 450 - chargeBtn.height / 2);
        this.addChildToContainer(chargeBtn);

        this.closeBtn.setPosition(bg.x + bg.width - this.closeBtn.width, bg.y);

        this.tick();
    }

    protected tick(): void {

        let cfg = <Config.AcCfg.RechargeResetCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcRechargeResetVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._countDownTime.text = LanguageManager.getlocal("acRechargeResetView_acCountTime-" + this.code, [vo.acCountDown]);
        }
        this._countDownTime.x = GameConfig.stageWidth / 2 - this._countDownTime.width / 2;
    }

    // protected getRuleInfo(): string {
    //     return "acGiftReturnRuleInfo-" + this.code;
    // }
    protected getBgName(): string {
        return null;
    }

    protected getTitleBgName(): string {
        return null;
    }
    protected getTitleStr(): string {
        return null;
    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "sharepopupview_closebtn"
        ]);
    }
    protected getUiCode(): string {
        return super.getUiCode();
    }

    protected getProbablyInfo(): string {
        return "";
    }
    /**
	 * 重新一下关闭按钮 
	 */
    protected getCloseBtnName(): string {
        return "sharepopupview_closebtn";
    }

    public dispose(): void {
        this._countDownTime = null;
        // this._countDownTimeBg = null;

        super.dispose();
    }
}
