/**
 * 特殊奖励base类
 * @author 张朝阳
 * date 2019/3/27
 * @class SpecialBaseView
 */
class SpecialBaseView extends BaseView {
    /** */
    protected _topArtbg: BaseBitmap = null;

    protected _topArtTxt: BaseBitmap = null;

    protected _topArtTxtEffect: BaseBitmap = null;

    protected _container: BaseDisplayObjectContainer = null;

    protected _nextCallBack: Function = null;

    protected _nextSpecialReward: { id: string; type: string; } = null;

    protected _isplay: boolean = false;

    protected _beltDragonBones: BaseLoadDragonBones = null;

    protected _moveClip: CustomMovieClip = null;

    protected _constlight: BaseBitmap = null;

    protected _boomlight: BaseBitmap = null;

    protected _golookInfoBtn: BaseButton = null;
    public constructor() {
        super();
    }
    protected initView() {
        this._container = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._container);


        if (App.CommonUtil.check_dragon()) {
            // this._beltDragonBones = App.DragonBonesUtil.getLoadDragonBones("specialgetreward_belt", 1, "open");
            // this._beltDragonBones.setPosition(GameConfig.stageWidth / 2 - 20, 130);
            // this.addChildToContainer(this._beltDragonBones);
        }
        else {
            this._topArtbg = BaseBitmap.create("specialview_artbg");
            this._topArtbg.setPosition(GameConfig.stageWidth / 2 - this._topArtbg.width / 2 - 10, this.titleY() - this._topArtbg.height / 2 - 10);
            this.addChildToContainer(this._topArtbg);
        }

        this._moveClip = ComponentManager.getCustomMovieClip("specialvieweffect", 10, 70);
        let moveClipBM = BaseBitmap.create("specialvieweffect1");
        this._moveClip.scaleX = 1.15;
        this._moveClip.scaleY = 1.2;
        this._moveClip.setPosition(GameConfig.stageWidth / 2 - moveClipBM.width * 1.15 / 2, this.titleY() - moveClipBM.height * 1.2 / 2 - 10);
        this.addChildToContainer(this._moveClip);
        this._moveClip.playWithTime(-1);
        this._moveClip.setVisible(false);

        this._constlight = BaseBitmap.create("specialview_effect_constlight");
        this._constlight.anchorOffsetX = this._constlight.width / 2;
        this._constlight.anchorOffsetY = this._constlight.height / 2;
        this._constlight.setPosition(GameConfig.stageWidth / 2, this.titleY());
        this.addChildToContainer(this._constlight);
        this._constlight.blendMode = egret.BlendMode.ADD;
        this._constlight.scaleX = 1.4;
        egret.Tween.get(this._constlight, { loop: true }).to({ scaleX: 1.6 }, 1000).to({ scaleX: 1.4 }, 1000);
        this._constlight.setVisible(false);


        this._topArtTxt = BaseBitmap.create(this.getArtRes());
        this._topArtTxt.anchorOffsetX = this._topArtTxt.width / 2;
        this._topArtTxt.anchorOffsetY = this._topArtTxt.height / 2;
        this._topArtTxt.setPosition(GameConfig.stageWidth / 2, this.titleY());
        this.addChildToContainer(this._topArtTxt);

        this._topArtTxtEffect = BaseBitmap.create(this.getArtRes());
        this._topArtTxtEffect.anchorOffsetX = this._topArtTxtEffect.width / 2;
        this._topArtTxtEffect.anchorOffsetY = this._topArtTxtEffect.height / 2;
        this._topArtTxtEffect.setPosition(this._topArtTxt.x, this._topArtTxt.y);
        this.addChildToContainer(this._topArtTxtEffect);
        this._topArtTxtEffect.blendMode = egret.BlendMode.ADD;
        this._topArtTxtEffect.setVisible(false);

        this._boomlight = BaseBitmap.create("specialview_effect_boomlight");
        this._boomlight.anchorOffsetX = this._boomlight.width / 2;
        this._boomlight.anchorOffsetY = this._boomlight.height / 2;
        this._boomlight.setPosition(GameConfig.stageWidth / 2, this.titleY());
        this.addChildToContainer(this._boomlight);
        this._boomlight.blendMode = egret.BlendMode.ADD;
        this._boomlight.setVisible(false);

        if (this.isShowBtn()) {
            this._golookInfoBtn = ComponentManager.getButton(this.btnSkin(), "acNewYearCrackerCkanBtn-1", this.golookInfoBtnClick, this);
            this._golookInfoBtn.setPosition(GameConfig.stageWidth - this._golookInfoBtn.width - 15, GameConfig.stageWidth / 2);
            this.addChildToContainer(this._golookInfoBtn);
        }

        this._nextCallBack = this.refreashView;
        let specialReward = this.param.data;
        this._maskBmp.addTouchTap(this.callBack, this);
        this.createView(specialReward.id);

        let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        // closeText.width = 560;
        // closeText.lineSpacing =5;
        // closeText.textAlign = egret.HorizontalAlign.CENTER;
        closeText.setPosition((GameConfig.stageWidth-closeText.width)  -20, GameConfig.stageHeigth-closeText.height-30);
        this.addChild(closeText);

    }
    /**创建view */
    protected createView(id: number | string) {

    }
    /**同类型刷新view */
    protected refreashView(id: number | string) {

    }
    /**播放动画 */
    protected playAni() {
        this._isplay = true;
        this._constlight.setVisible(false);
        this._topArtTxt.setVisible(false);
        this._topArtTxtEffect.setVisible(false);
        this._topArtTxtEffect.alpha = 1;
        this._moveClip.setVisible(false);
        this._boomlight.setScale(1.3);
        this._topArtTxt.setScale(5);

        egret.Tween.get(this._topArtTxt).wait(330).call(() => {
            this._topArtTxt.setVisible(true);
        }, this).to({ scaleX: 0.7, scaleY: 0.7 }, 160).call(() => {
            this._moveClip.setVisible(true);
            this._constlight.setVisible(true);
            this._topArtTxtEffect.setScale(0.7);
            this._topArtTxtEffect.setVisible(true);
            this._boomlight.setVisible(true);
            egret.Tween.get(this._topArtTxtEffect).to({ scaleX: 1.1, scaleY: 1.1 }, 70).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 200).call(() => {
                egret.Tween.removeTweens(this._topArtTxtEffect);

            }, this);
            egret.Tween.get(this._boomlight).to({ scaleX: 0.3, scaleY: 0.3 }, 170).to({ scaleX: 0.15, scaleY: 0 }, 330).call(() => {
                egret.Tween.removeTweens(this._boomlight);
                this._isplay = false;
            }, this);
        }, this).to({ scaleX: 1.1, scaleY: 1.1 }, 70).to({ scaleX: 1, scaleY: 1 }, 70).call(() => {
            egret.Tween.removeTweens(this._topArtTxt);
        }, this)
        let beltDepth: number = this.container.getChildIndex(this._moveClip) - 1;
        if (App.CommonUtil.check_dragon()) {
            if (this._beltDragonBones) {
                this.container.removeChild(this._beltDragonBones);
                this._beltDragonBones.dispose();
                this._beltDragonBones = null;
            }
            this._beltDragonBones = App.DragonBonesUtil.getLoadDragonBones("specialgetreward_belt", 1, "open");
            this._beltDragonBones.setPosition(GameConfig.stageWidth / 2 - 20, 130);
            this.container.addChildAt(this._beltDragonBones, beltDepth);
            this._beltDragonBones.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, (event) => {
                if (event.animationName == "open" && this._beltDragonBones) {
                    this._beltDragonBones.playDragonMovie('idle', 0);
                }
            }, this);


        }
        else {
            if (this._topArtbg) {
                this._topArtbg.setVisible(false);
                egret.Tween.get(this._topArtbg).wait(300).call(() => {
                    this._topArtbg.setVisible(true);
                    egret.Tween.removeTweens(this._topArtbg);
                }, this);
            }
        }

    }
    /**触摸回调 */
    protected callBack() {
        if (this._isplay) {
            return;
        }
        Api.specialRewardList.shift();
        let specialReward = Api.specialRewardList[0];
        if (specialReward) {
            if (specialReward.type != "11" || Api.lastSpecialRewardType != "11") {
                if (specialReward.type == Api.lastSpecialRewardType) {
                    this._nextCallBack.apply(this, [specialReward.id]);
                }
                else if (specialReward.type != Api.lastSpecialRewardType) {
                    this._nextSpecialReward = specialReward;
                    this.nextNewPanelCallBack();
                }
            }
            else {
                let titlecfg1 = Config.TitleCfg.getTitleCfgById(specialReward.id);
                let titlecfg2 = Config.TitleCfg.getTitleCfgById(Api.lastSpecialRewardId);
                if (titlecfg1.isTitle == titlecfg2.isTitle) {
                    this._nextCallBack.apply(this, [specialReward.id]);
                }
                else {
                    this._nextSpecialReward = specialReward;
                    this.nextNewPanelCallBack();
                }
            }

        }
        else {
            this.closePaneliew();
        }

    }
    /**打开下一个界面 */
    protected nextNewPanelCallBack() {
        Api.lastSpecialRewardType = this._nextSpecialReward.type;
        Api.lastSpecialRewardId = this._nextSpecialReward.id;
        let viewName: string = GameData.getViewNameForType(this._nextSpecialReward);
        if (this._beltDragonBones) {
            this.container.removeChild(this._beltDragonBones);
            this._beltDragonBones.dispose();
            this._beltDragonBones = null;
        }
        ViewController.getInstance().openView(viewName, this._nextSpecialReward);
        this.closePaneliew();
    }
    /**设置按钮的位置 */
    protected setgolookPos(posX: number, posY: number) {
        if (this._golookInfoBtn) {
            this._golookInfoBtn.setPosition(posX, posY);
        }
    }
    /**回调 */
    protected golookInfoBtnClick() {

    }
    /**是否显示前往查看按钮 */
    protected isShowBtn() {
        return false;
    }

    /**是否显示前往查看按钮 */
    protected btnSkin() {
        return ButtonConst.BTN_BIG_YELLOW;
    }

    protected closePaneliew() {

        this.hide();
    }
    /**标题的位置 */
    protected titleY() {
        return 130;
    }

    protected getArtRes(): string {
        let res = this.getClassName().toLowerCase() + "_title";
        if(Api.switchVoApi.checkIsInBlueWife()){
            res += `_blueType`;
        }
        if (ResourceManager.hasRes(res)) {
            return res;
        }
        return "specialgetview_common_title";
    }
    protected getResourceList() {
        return super.getResourceList().concat([
            "specialview_artbg", this.getArtRes(), "specialvieweffect", "specialview_effect_boomlight", "specialview_effect_constlight"
        ])
    }

    protected getTitleStr(): string {
        return null;
    }
    public dispose(): void {
        egret.Tween.removeTweens(this._topArtTxt);
        egret.Tween.removeTweens(this._topArtTxtEffect);
        egret.Tween.removeTweens(this._boomlight);
        egret.Tween.removeTweens(this._constlight);
        this._topArtbg = null;
        this._topArtTxt = null;
        this._container = null;
        this._nextCallBack = null;
        this._nextSpecialReward = null;
        this._isplay = false;
        this._topArtTxtEffect = null;
        this._beltDragonBones = null;
        this._moveClip = null;
        this._constlight = null;
        this._boomlight = null;
        this._golookInfoBtn = null;
        super.dispose();
    }
}