/**
 * 特殊奖励--获得子嗣
 * @author 张朝阳
 * date 2019/3/27
 * @class SpecialChildGetView
 */
class SpecialChildGetView extends SpecialBaseView {
    private _buttombg: BaseLoadBitmap = null;
    private _titleTF: BaseTextField = null;
    private _titleTFLine: BaseBitmap = null;
    private _childId: any = null;

    private _buttomContainer: BaseDisplayObjectContainer = null;

    private _topContainer: BaseDisplayObjectContainer = null;

    /**淡光 */
    private _shimmer: BaseLoadBitmap = null;
    /**光刺1 */
    private _thorn1: BaseLoadBitmap = null;
    /**光刺2 */
    private _thorn2: BaseLoadBitmap = null;

    private _childPic: BaseBitmap = null;
    public constructor() {
        super();
    }

    /**创建view */
    protected createView(id: number | string) {
        let childrenInfoVo: ChildInfoVo = Api.childVoApi.getChildrenInfoVoById(String(id));

        //分阶段引导
        if (Api.childVoApi.getChildNum() == 1 && Api.adultVoApi.getAdultNum() == 0 && Api.adultVoApi.getAdultMarryNum() == 0) {
            Api.rookieVoApi.curGuideKey = "child";
            Api.rookieVoApi.insertWaitingGuide({ "idx": "child_1" }, true);
            //功能解锁
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
        }

        if(Api.childVoApi.getCnum() == 3)
        {
            PlatformManager.analyticsByHyKey("achieved_3kids");
        }
        else if(Api.childVoApi.getCnum() == 10)
        {
            PlatformManager.analyticsByHyKey("achieved_10kids");
        }

        this._shimmer = BaseLoadBitmap.create("specialview_effect_yellow");
        this._shimmer.width = 320;
        this._shimmer.height = 413;
        this._shimmer.anchorOffsetX = this._shimmer.width / 2;
        this._shimmer.anchorOffsetY = this._shimmer.height / 2;
        this._shimmer.setScale(2);
        this._shimmer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 492);
        this._container.addChild(this._shimmer);
        this._shimmer.alpha = 0;

        this._thorn1 = BaseLoadBitmap.create("specialview_effect_yellowthorn");
        this._thorn1.width = 320;
        this._thorn1.height = 413;
        this._thorn1.anchorOffsetX = this._thorn1.width / 2;
        this._thorn1.anchorOffsetY = this._thorn1.height / 2;
        this._thorn1.setScale(1.25);
        this._thorn1.alpha = 1;
        this._thorn1.rotation = 0;
        this._thorn1.blendMode = egret.BlendMode.ADD;
        this._thorn1.setPosition(this._shimmer.x, this._shimmer.y);
        this._container.addChild(this._thorn1);
        egret.Tween.get(this._thorn1, { loop: true }).call(() => {
            this._thorn1.rotation = 0;
        }, this).to({ alpha: 0.2, rotation: 180 }, 10000).to({ alpha: 1, rotation: 360 }, 10000);
        this._thorn1.setVisible(false);

        this._thorn2 = BaseLoadBitmap.create("specialview_effect_yellowthorn");
        this._thorn2.width = 320;
        this._thorn2.height = 413;
        this._thorn2.anchorOffsetX = this._thorn2.width / 2;
        this._thorn2.anchorOffsetY = this._thorn2.height / 2;
        this._thorn2.setScale(1.25);
        this._thorn2.alpha = 0.2;
        this._thorn2.rotation = 180;
        this._thorn2.blendMode = egret.BlendMode.ADD;
        this._thorn2.setPosition(this._shimmer.x, this._shimmer.y);
        this._container.addChild(this._thorn2);
        egret.Tween.get(this._thorn2, { loop: true }).call(() => {
            this._thorn2.rotation = 180;
        }, this).to({ alpha: 1, rotation: 0 }, 10000).to({ alpha: 0.2, rotation: -180 }, 10000);
        this._thorn2.setVisible(false);

        this._childPic = BaseBitmap.create("childview_baby");
        this._childPic.setPosition(GameConfig.stageWidth / 2 - this._childPic.width / 2, GameConfig.stageHeigth - 670);
        this._container.addChild(this._childPic);


        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);


        this._buttombg = BaseLoadBitmap.create("specialview_buttombg1");
        this._buttombg.width = 640;
        this._buttombg.height = 230;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - 310);
        this._buttomContainer.addChild(this._buttombg);

        if (Api.switchVoApi.checkCloseText2()) {

            this._topContainer = new BaseDisplayObjectContainer();
            this._topContainer.width = 640;
            this._topContainer.anchorOffsetX = this._buttomContainer.width / 2;
            this._topContainer.x = 320;
            this._container.addChild(this._topContainer);

            let wifeInfoVo: WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(childrenInfoVo.motherId);
            let sexstr = childrenInfoVo.sex == 1 ? LanguageManager.getlocal("childBoyName") : LanguageManager.getlocal("childGirlName");
            let txtbg = BaseLoadBitmap.create("childview_getchildtextbg");
            txtbg.width = 567;
            txtbg.height = 127;
            txtbg.setPosition(GameConfig.stageWidth / 2 - txtbg.width / 2, this._childPic.y - txtbg.height - 10);
            this._topContainer.addChild(txtbg);
            let descType: string = String(Math.floor((Math.random() * 10)) + 1);
            let txtTF = ComponentManager.getTextField(LanguageManager.getlocal("getcChildDes" + descType, [wifeInfoVo.name, sexstr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            txtTF.width = 480;
            txtTF.setPosition(txtbg.x + txtbg.width / 2 - txtTF.width / 2, txtbg.y + txtbg.height / 2 - txtTF.height / 2);
            this._topContainer.addChild(txtTF);

        }

        let lookTip: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeLookChild"), TextFieldConst.FONTSIZE_TITLE_SMALL);
        lookTip.setPosition(GameConfig.stageWidth / 2 - lookTip.width / 2, this._buttombg.y + 70);
        this._buttomContainer.addChild(lookTip);

        let sureBtn: BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wifeLookChildYes", this.sureBtnClick, this);
        sureBtn.setPosition(lookTip.x + lookTip.width / 2 + 40, lookTip.y + lookTip.height + 30);
        this._buttomContainer.addChild(sureBtn);

        let noBtn: BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "wifeLookChildNo", this.noBtnClick, this);
        noBtn.setColor(TextFieldConst.COLOR_BLACK);
        noBtn.setPosition(lookTip.x + lookTip.width / 2 - noBtn.width - 40, sureBtn.y);
        this._buttomContainer.addChild(noBtn);

        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("child_quality") + LanguageManager.getlocal("child_quality" + childrenInfoVo.quality), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2)
        this._buttomContainer.addChild(this._titleTF);

        this._titleTFLine = BaseBitmap.create("public_line3");
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        this._buttomContainer.addChild(this._titleTFLine);

        //如果不是第一个孩子  第一个孩子会强弹分享(此处会判断平台和开关和第一个孩子的条件)
        if (!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_CHILD, null)) {
            // 分享按钮
            App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_CHILDGET);
        }
        this.playAni();
    }
    protected playAni() {
        super.playAni();
        this._shimmer.alpha = 0;
        this._thorn1.setVisible(false);
        this._thorn2.setVisible(false);
        this._buttomContainer.scaleX = 0;
        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(() => {
            egret.Tween.removeTweens(this._buttomContainer);
        }, this);
        egret.Tween.get(this._shimmer).to({ alpha: 1 }, 500).call(() => {
            egret.Tween.removeTweens(this._shimmer);
            this._thorn1.setVisible(true);
            this._thorn2.setVisible(true);
        }, this);

        if (this._topContainer) {
            this._topContainer.scaleX = 0;
            egret.Tween.get(this._topContainer).to({ scaleX: 1 }, 350).call(() => {
                egret.Tween.removeTweens(this._topContainer);
            }, this);
        }
        this._childPic.alpha = 0;
        egret.Tween.get(this._childPic).wait(500).to({ alpha: 1 }, 100).call(() => {
            egret.Tween.removeTweens(this._childPic);
        }, this);
    }
    private sureBtnClick(): void {
        //添加强制分享逻辑
        Api.shareVoApi.showShare(ShareVoApi.TYPE_CHILD, null, this.sureBtnClickEvent, this);
    }
    private sureBtnClickEvent(): void {
        //分阶段引导
        if (Api.childVoApi.getChildNum() == 1 && Api.adultVoApi.getAdultNum() == 0 && Api.adultVoApi.getAdultMarryNum() == 0) {
            this.hide();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHILD_GUIDE);
            return;
        }

        ViewController.getInstance().hideAllView();
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
        this._childId = this.param.data;
        ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW, { childId: this._childId });
    }
    private noBtnClick(): void {
        //添加强制分享逻辑
        Api.shareVoApi.showShare(ShareVoApi.TYPE_CHILD, null, this.noBtnClickEvent, this);
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
    }
    private noBtnClickEvent(): void {
        this.hide();
    }
    protected getResourceList() {
        return super.getResourceList().concat([
            "childview_baby", "shareBtn",
        ]);
    }
    public dispose(): void {
        egret.Tween.removeTweens(this._childPic);
        egret.Tween.removeTweens(this._shimmer);
        egret.Tween.removeTweens(this._thorn1);
        egret.Tween.removeTweens(this._thorn2);
        if (this._topContainer) {
            egret.Tween.removeTweens(this._topContainer);
        }
        egret.Tween.removeTweens(this._buttomContainer);
        this._buttomContainer = null;
        this._topContainer = null;
        this._childPic = null;
        this._buttombg = null;
        this._titleTF = null;
        this._titleTFLine = null;
        this._childId = null;
        super.dispose();
    }
}