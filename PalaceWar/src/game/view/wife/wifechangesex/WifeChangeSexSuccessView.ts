/**
 * 转换成功
 * @author qianjun
 */
class WifeChangeSexSuccessView extends SpecialBaseView {

    private _wifeImg: BaseLoadBitmap = null;
    private _wifeDragonBones: BaseLoadDragonBones = null;
    private _buttombg: BaseLoadBitmap = null;
    private _titleTF: BaseTextField = null;
    private _titleTFLine: BaseBitmap = null;
    private _nameTF: BaseTextField = null;
    private _namebg: BaseBitmap = null;

    private _meiliTF: BaseTextField = null;
    private _meiliDescTF: BaseTextField = null;
    private _memoirTF: BaseTextField = null;
    private _memoirDescTF: BaseTextField = null;

    private _buttomContainer: BaseDisplayObjectContainer = null;

    private _nameContainer: BaseDisplayObjectContainer = null;

    /**淡光 */
    private _shimmer: BaseLoadBitmap = null;
    /**光刺1 */
    private _thorn1: BaseLoadBitmap = null;
    /**光刺2 */
    private _thorn2: BaseLoadBitmap = null;

    private _wifeId: number | string = null;

    public constructor() {
        super();
    }
    /**创建view */
    protected createView(id: number | string) {
        let param = this.param.data;
        let isfemale = this.param.data.sex == 0;

        let wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(id);
        //let wifeCfg = Config.WifeCfg.getWifeCfgById(id);
        let searchPersonCfg = Config.SearchCfg.getPersonItemCfgByWifeId(wifeinfovo.cfg.id);
        this._wifeId = id;

        this._shimmer = BaseLoadBitmap.create(isfemale?"specialview_effect_purple":"specialview_effect_blue");
        this._shimmer.width = 320;
        this._shimmer.height = 413;
        this._shimmer.anchorOffsetX = this._shimmer.width / 2;
        this._shimmer.anchorOffsetY = this._shimmer.height / 2;
        this._shimmer.setScale(2);
        this._shimmer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 492);
        this._container.addChild(this._shimmer);
        this._shimmer.alpha = 0;

        this._thorn1 = BaseLoadBitmap.create(isfemale ? "specialview_effect_purplethorn" : `specialview_effect_bluethorn`);
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

        this._thorn2 = BaseLoadBitmap.create(isfemale?"specialview_effect_purplethorn":`specialview_effect_bluethorn`);
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

        if (1) {
			let soundRes = wifeinfovo.sound;
			if (wifeinfovo.sexflag == 1) {
				soundRes = wifeinfovo.getBlueSound();
			}
			this.playEffect(soundRes, true);

		}

        let boneName = "";
        if (wifeinfovo.cfg && wifeinfovo.cfg.bone) {
            boneName = wifeinfovo.cfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(boneName)) {
            this._wifeDragonBones = App.DragonBonesUtil.getLoadDragonBones(wifeinfovo.cfg.bone);
            this._wifeDragonBones.setScale(0.93);
            this._wifeDragonBones.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250)
            this._container.addChild(this._wifeDragonBones);
        }
        else {
            this._wifeImg = BaseLoadBitmap.create(wifeinfovo.cfg.body);
            this._wifeImg.width = 640;
            this._wifeImg.height = 840;
            this._wifeImg.anchorOffsetY = this._wifeImg.height;
            this._wifeImg.anchorOffsetX = this._wifeImg.width / 2;
            this._wifeImg.setScale(0.6);
            this._wifeImg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250)
            this._container.addChild(this._wifeImg);
        }

        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);

        this._nameContainer = new BaseDisplayObjectContainer();
        this._nameContainer.width = 640;
        this._nameContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._nameContainer.x = 320;
        this._container.addChild(this._nameContainer);

        this._buttombg = BaseLoadBitmap.create(`specialview_buttombg${isfemale ? 2 : 3}`);
        this._buttombg.width = 640;

        // this._buttombg.setPosition(0, GameConfig.stageHeigth - 310);
        this._buttomContainer.addChild(this._buttombg);

        this._meiliTF = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewGameTitle_6_1_2") + LanguageManager.getlocal("syscolonDesc"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW)
        this._buttomContainer.addChild(this._meiliTF);
        this._meiliDescTF = ComponentManager.getTextField(wifeinfovo.desc, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE)
        this._meiliDescTF.width = 470;
        this._meiliDescTF.lineSpacing = 5;
        this._buttomContainer.addChild(this._meiliDescTF);
        this._buttombg.height = 108 + this._meiliDescTF.height + 20;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - 90 - this._buttombg.height);
        this._meiliTF.setPosition(this._buttombg.x + 40, this._buttombg.y + 70);
        this._meiliDescTF.setPosition(this._meiliTF.x + this._meiliTF.width, this._meiliTF.y);
     
        this._titleTF = ComponentManager.getTextField(wifeinfovo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2)
        this._buttomContainer.addChild(this._titleTF);

        this._titleTFLine = BaseBitmap.create("public_line3");
        this._titleTFLine.width = 300 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        this._buttomContainer.addChild(this._titleTFLine);

        let btn = ComponentManager.getButton(this.btnSkin(), "sysConfirm", this.hide, this);
        btn.setPosition(this._buttombg.x + this._buttombg.width / 2 - btn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        this._buttomContainer.addChild(btn);
        
        this.playAni();
    }

    protected playAni() {
        super.playAni();
        this._shimmer.alpha = 0;
        this._thorn1.setVisible(false);
        this._thorn2.setVisible(false);
        this._buttomContainer.scaleX = 0;
        this._nameContainer.alpha = 0;
        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(() => {
            egret.Tween.removeTweens(this._buttomContainer);
        }, this);
        if (this._wifeImg) {
            this._wifeImg.alpha = 0;
            egret.Tween.get(this._wifeImg).wait(500).to({ alpha: 1 }, 100).call(() => {
                egret.Tween.removeTweens(this._wifeImg);
            }, this);
        }
        else {
            this._wifeDragonBones.alpha = 0;
            egret.Tween.get(this._wifeDragonBones).wait(500).to({ alpha: 1 }, 100).call(() => {
                egret.Tween.removeTweens(this._wifeDragonBones);
            }, this);
        }

        egret.Tween.get(this._nameContainer).wait(600).to({ alpha: 1 }, 100).call(() => {
            egret.Tween.removeTweens(this._nameContainer);
        }, this);
        egret.Tween.get(this._shimmer).to({ alpha: 1 }, 500).call(() => {
            egret.Tween.removeTweens(this._shimmer);
            this._thorn1.setVisible(true);
            this._thorn2.setVisible(true);
        }, this);
    }

    protected getArtRes(): string {
        let isfemale = this.param.data.sex == 0;
        return isfemale ? "femalechangetitle" : "malechangetitle";
    }

    protected golookInfoBtnClick() {
        let id = this._wifeId;
        this.callBack()
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: id, handler: null });
    }
    protected isShowBtn() {
        return false;
    }
    protected getResourceList() {
        return super.getResourceList().concat([
            "specialview_commoni_namebg",
        ]);
    }

    public dispose(): void {
        egret.Tween.removeTweens(this._shimmer);
        egret.Tween.removeTweens(this._thorn1);
        egret.Tween.removeTweens(this._thorn2);
        egret.Tween.removeTweens(this._nameContainer);
        egret.Tween.removeTweens(this._buttomContainer);
        this._buttomContainer = null;
        this._nameContainer = null;
        this._buttombg = null;
        this._titleTF = null;
        this._titleTFLine = null;
        this._wifeImg = null;
        this._nameTF = null;
        this._namebg = null;
        this._meiliTF = null;
        this._meiliDescTF = null;
        this._memoirTF = null;
        this._memoirDescTF = null;
        this._wifeId = null;
        super.dispose();
    }
}