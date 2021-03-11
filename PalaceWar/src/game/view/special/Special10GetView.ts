/**
 * 特殊奖励--红颜
 * @author 张朝阳
 * date 2019/3/27
 * @class Special10GetView
 */
class Special10GetView extends SpecialBaseView {

    private _wifeImg: BaseLoadBitmap = null;
    private _wifeDragonBones: BaseLoadDragonBones = null;
    private _doubleDragon: BaseDisplayObjectContainer = null;
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
        // id="236";
        let wifeCfg = Config.WifeCfg.getWifeCfgById(id);
        let searchPersonCfg = Config.SearchCfg.getPersonItemCfgByWifeId(wifeCfg.id);
        this._wifeId = id;

        if(String(id)=="310")
        {
            PlatformManager.analyticsByHyKey("shangguan7days");
        }

        if(Api.wifeVoApi.getWifeNum() == 10)
        {
            PlatformManager.analyticsByHyKey("achieved_10beauties");
        }

        this._shimmer = BaseLoadBitmap.create("specialview_effect_purple");
        this._shimmer.width = 320;
        this._shimmer.height = 413;
        this._shimmer.anchorOffsetX = this._shimmer.width / 2;
        this._shimmer.anchorOffsetY = this._shimmer.height / 2;
        this._shimmer.setScale(2);
        this._shimmer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 492);
        this._container.addChild(this._shimmer);
        this._shimmer.alpha = 0;

        this._thorn1 = BaseLoadBitmap.create("specialview_effect_purplethorn");
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

        this._thorn2 = BaseLoadBitmap.create("specialview_effect_purplethorn");
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

        let boneName = "";
        let doubleGragon = App.CommonUtil.getDoubleGragon(wifeCfg.id);
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
            if(doubleGragon){
                boneName = `wife_full_${wifeCfg.id}_1` + "_ske";
            }
        }
       
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(boneName)) {
            if(doubleGragon){
                this._doubleDragon = doubleGragon;
                this._doubleDragon.setScale(0.93);
                this._doubleDragon.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250)
                this._container.addChild(this._doubleDragon);
            }
            else{
                this._wifeDragonBones = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                this._wifeDragonBones.setScale(0.93);
                this._wifeDragonBones.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250)
                this._container.addChild(this._wifeDragonBones);
            }
        }
        else {
            this._wifeImg = BaseLoadBitmap.create(wifeCfg.body);
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

        this._buttombg = BaseLoadBitmap.create("specialview_buttombg2");
        this._buttombg.width = 640;

        // this._buttombg.setPosition(0, GameConfig.stageHeigth - 310);
        this._buttomContainer.addChild(this._buttombg);



        this._meiliTF = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality4") + LanguageManager.getlocal("syscolonDesc"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW)
        // this._meiliTF.setPosition(this._buttombg.x + 40, this._buttombg.y + 70);
        this._buttomContainer.addChild(this._meiliTF);

        this._meiliDescTF = ComponentManager.getTextField(Api.wifeVoApi.getWifeInfoVoById(Number(wifeCfg.id)).glamour.toString(), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE)
        // this._meiliDescTF.setPosition(this._meiliTF.x + this._meiliTF.width, this._meiliTF.y);
        this._buttomContainer.addChild(this._meiliDescTF);

        this._memoirTF = ComponentManager.getTextField(LanguageManager.getlocal("memoirDesc") + LanguageManager.getlocal("syscolonDesc"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW)
        // this._memoirTF.setPosition(this._buttombg.x + 40, this._meiliTF.y + this._meiliTF.height + 20);
        this._buttomContainer.addChild(this._memoirTF);

        this._memoirDescTF = ComponentManager.getTextField(searchPersonCfg.desc, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE)
        this._memoirDescTF.width = GameConfig.stageWidth - 80 - this._memoirTF.width;
        this._memoirDescTF.lineSpacing = 20;
        // this._memoirDescTF.setPosition(this._memoirTF.x + this._memoirTF.width, this._memoirTF.y);
        this._buttomContainer.addChild(this._memoirDescTF);


        // this._buttombg.height = 108 + this._memoirDescTF.y + this._memoirDescTF.height - this._meiliTF.y;//112 108
        this._buttombg.height = 108 + this._memoirDescTF.height + this._meiliDescTF.height + 20;

        this._buttombg.setPosition(0, GameConfig.stageHeigth - 90 - this._buttombg.height);

        if(doubleGragon){
            let ishorizon = false;
            if(PlatformManager.checkIsEnSp() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuSp()){
                ishorizon = true;
            }
            let nameres = ishorizon ? `wife_doublefly_namebg` : `public_infobg2`;
            let nameBg1:BaseBitmap = BaseBitmap.create(nameres);
            this._buttomContainer.addChild(nameBg1);

            let nameBg2:BaseBitmap = BaseBitmap.create(nameres);
            this._buttomContainer.addChild(nameBg2);

            let nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal(`wifeName_${wifeCfg.id}_1`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
            this._buttomContainer.addChild(nameTF1);

            let nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal(`wifeName_${wifeCfg.id}_2`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
            this._buttomContainer.addChild(nameTF2);
            if(ishorizon){
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameBg1, this._buttombg, [-nameBg1.width/2,this._buttombg.height-5]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameBg2, this._buttombg, [nameBg1.width/2,this._buttombg.height-5]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2);
            }
            else{
                nameBg1.setPosition(60,350);
                nameBg2.setPosition(500,350);
                nameTF1.width = 27;
                nameTF2.width = 27;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1, [5,-5]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2, [5,-5]);
            }   
        }

        this._meiliTF.setPosition(this._buttombg.x + 40, this._buttombg.y + 70);
        this._meiliDescTF.setPosition(this._meiliTF.x + this._meiliTF.width, this._meiliTF.y);
        this._memoirTF.setPosition(this._buttombg.x + 40, this._meiliTF.y + this._meiliTF.height + 20);
        this._memoirDescTF.setPosition(this._memoirTF.x + this._memoirTF.width, this._memoirTF.y);

        this._namebg = BaseBitmap.create("specialview_commoni_namebg");

        this._nameTF = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameContainer.addChild(this._namebg);

        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        this._nameContainer.addChild(this._nameTF);

        if (doubleGragon)
        {
            this._namebg.alpha = 0;
            this._nameTF.alpha = 0;
        }

        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("identityDesc") + LanguageManager.getlocal("syscolonDesc") + searchPersonCfg.shortDesc, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2)
        this._buttomContainer.addChild(this._titleTF);

        this._titleTFLine = BaseBitmap.create("public_line3");
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        this._buttomContainer.addChild(this._titleTFLine);

        //如果不是第二个红颜  第二个红颜会强弹分享(此处会判断平台和开关和第二个红颜的条件)
        if (!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_WIFE, null)) {
            // 分享按钮
            App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_WIFEGET);
        }
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    }
    /**同类型刷新view */
    protected refreashView(id: number | string) {

        if(String(id)=="310")
        {
            PlatformManager.analyticsByHyKey("shangguan7days");
        }

        let wifeCfg = Config.WifeCfg.getWifeCfgById(id);
        let searchPersonCfg = Config.SearchCfg.getPersonItemCfgByWifeId(wifeCfg.id);
        this._wifeId = id;
        let boneName = "";
        let doubleGragon = App.CommonUtil.getDoubleGragon(wifeCfg.id);
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
            if(doubleGragon){
                boneName = `wife_full_${wifeCfg.id}_1` + "_ske";
            }
        }
        let depth: number = 0;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && (doubleGragon) && App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(boneName)) {
            if (this._doubleDragon) {
                depth = this._container.getChildIndex(this._doubleDragon);
                this._container.removeChild(this._doubleDragon);
                this._doubleDragon.dispose();
                this._doubleDragon = null;
            }
            if (this._wifeDragonBones) {
                depth = this._container.getChildIndex(this._wifeDragonBones);
                this._container.removeChild(this._wifeDragonBones);
                this._wifeDragonBones.dispose();
                this._wifeDragonBones = null;
            }
            if (this._wifeImg) {
                depth = this._container.getChildIndex(this._wifeImg);
                this._container.removeChild(this._wifeImg);
                this._wifeImg.dispose();
                this._wifeImg = null;
            }
            if(doubleGragon){
                this._doubleDragon = doubleGragon;
                this._doubleDragon.setScale(0.93);
                this._doubleDragon.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250)
                this._container.addChildAt(this._doubleDragon, depth);
            }
            else{
                this._wifeDragonBones = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                this._wifeDragonBones.setScale(0.93);
                this._wifeDragonBones.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250)
                this._container.addChildAt(this._wifeDragonBones, depth);
            }

        }
        else {
            if (this._doubleDragon) {
                depth = this._container.getChildIndex(this._doubleDragon);
                this._container.removeChild(this._doubleDragon);
                this._doubleDragon.dispose();
                this._doubleDragon = null;
            }
            if (this._wifeDragonBones) {
                depth = this._container.getChildIndex(this._wifeDragonBones);
                this._container.removeChild(this._wifeDragonBones);
                this._wifeDragonBones.dispose();
                this._wifeDragonBones = null;
            }
            if (this._wifeImg) {
                this._wifeImg.setload(wifeCfg.body);
            }
            else {
                this._wifeImg = BaseLoadBitmap.create(wifeCfg.body);
                this._wifeImg.width = 640;
                this._wifeImg.height = 840;
                this._wifeImg.anchorOffsetY = this._wifeImg.height;
                this._wifeImg.anchorOffsetX = this._wifeImg.width / 2;
                this._wifeImg.setScale(0.6);
                this._wifeImg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250)
                this._container.addChildAt(this._wifeImg, depth);
            }
        }

        this._meiliDescTF.text = Api.wifeVoApi.getWifeInfoVoById(Number(wifeCfg.id)).glamour.toString();
        // this._meiliDescTF.setPosition(this._meiliTF.x + this._meiliTF.width, this._meiliTF.y);

        this._memoirDescTF.text = searchPersonCfg.desc;
        // this._memoirDescTF.setPosition(this._memoirTF.x + this._memoirTF.width, this._memoirTF.y);

        // this._buttombg.height = 108 + this._memoirDescTF.y + this._memoirDescTF.height - this._meiliTF.y;
        this._buttombg.height = 108 + this._memoirDescTF.height + this._meiliDescTF.height + 20;

        this._meiliTF.setPosition(this._buttombg.x + 40, this._buttombg.y + 70);
        this._meiliDescTF.setPosition(this._meiliTF.x + this._meiliTF.width, this._meiliTF.y);
        this._memoirTF.setPosition(this._buttombg.x + 40, this._meiliTF.y + this._meiliTF.height + 20);
        this._memoirDescTF.setPosition(this._memoirTF.x + this._memoirTF.width, this._memoirTF.y);


        this._nameTF.text = wifeCfg.name;
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);

        if (doubleGragon)
        {
            this._namebg.alpha = 0;
            this._nameTF.alpha = 0;
        }
        else
        {
            this._namebg.alpha = 1;
            this._nameTF.alpha = 1;
        }

        this._titleTF.text = LanguageManager.getlocal("identityDesc") + LanguageManager.getlocal("syscolonDesc") + searchPersonCfg.shortDesc
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2);
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
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
        else if(this._wifeDragonBones){
            this._wifeDragonBones.alpha = 0;
            egret.Tween.get(this._wifeDragonBones).wait(500).to({ alpha: 1 }, 100).call(() => {
                egret.Tween.removeTweens(this._wifeDragonBones);
            }, this);
        }
        else if(this._doubleDragon) {
            this._doubleDragon.alpha = 0;
            egret.Tween.get(this._doubleDragon).wait(500).to({ alpha: 1 }, 100).call(() => {
                egret.Tween.removeTweens(this._doubleDragon);
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

    protected golookInfoBtnClick() {
        let id = this._wifeId;
        this.callBack()
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: id, handler: null });
    }
    protected isShowBtn() {
        return true;
    }
    protected getResourceList() {
        return super.getResourceList().concat([
            "specialview_commoni_namebg", "shareBtn",`wife_doublefly_namebg`
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