/**
 * 特殊奖励--门客
 * @author 张朝阳
 * date 2019/3/27
 * @class Special8GetView
 */
class Special8GetView extends SpecialBaseView {
    private _servantDragonBones: BaseLoadDragonBones = null;
    private _servantImg: BaseLoadBitmap = null;
    private _buttombg: BaseLoadBitmap = null;
    private _titleTF: BaseTextField = null;
    private _titleTFLine: BaseBitmap = null;
    private _nameTF: BaseTextField = null;
    private _namebg: BaseBitmap = null;
    private _servantInfoList: { attrName: BaseTextField, star: BaseBitmap, numTF: BaseTextField }[] = [];

    private _scrollView: ScrollView = null;

    private _sVContainer: BaseDisplayObjectContainer = null;

    private _buttomContainer: BaseDisplayObjectContainer = null;

    private _nameContainer: BaseDisplayObjectContainer = null;

    /**淡光 */
    private _shimmer: BaseLoadBitmap = null;
    /**光刺1 */
    private _thorn1: BaseLoadBitmap = null;
    /**光刺2 */
    private _thorn2: BaseLoadBitmap = null;

    private _servantId: number | string = null;
    public constructor() {
        super();
    }

    protected getBgName():string
	{
		return "public_9_bg11";
	}

    /**创建view */
    protected createView(id: number | string) {
        let servantCfg = Config.ServantCfg.getServantItemById(id);
        let servantInfo = Api.servantVoApi.getServantObj(String(id));
        let dagonBonesName = Api.servantVoApi.getServantBoneId(id);
        this._servantId = id;

        if(Api.servantVoApi.getServantCount() == 30)
        {
            PlatformManager.analyticsByHyKey("achieved_30retainers");
        }

        this._shimmer = BaseLoadBitmap.create("specialview_effect_blue");
        this._shimmer.width = 320;
        this._shimmer.height = 413;
        this._shimmer.anchorOffsetX = this._shimmer.width / 2;
        this._shimmer.anchorOffsetY = this._shimmer.height / 2;
        this._shimmer.setScale(2);
        this._shimmer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 482);
        this._container.addChild(this._shimmer);
        this._shimmer.alpha = 0;

        this._thorn1 = BaseLoadBitmap.create("specialview_effect_bluethorn");
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

        this._thorn2 = BaseLoadBitmap.create("specialview_effect_bluethorn");
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
        if (dagonBonesName) {
            boneName = dagonBonesName + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            this._servantDragonBones = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._servantDragonBones.setScale(1.03);
            this._servantDragonBones.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 280);
            this._container.addChild(this._servantDragonBones);
        }
        else {
            this._servantImg = BaseLoadBitmap.create(servantCfg.fullIcon);
            this._servantImg.width = 405;
            this._servantImg.height = 467;
            this._servantImg.anchorOffsetY = this._servantImg.height;
            this._servantImg.anchorOffsetX = this._servantImg.width / 2;
            this._servantImg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 280);
            this._container.addChild(this._servantImg);
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


        this._buttombg = BaseLoadBitmap.create("specialview_buttombg3");
        this._buttombg.width = 640;
        this._buttombg.height = 256;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - 310 - 20);
        this._buttomContainer.addChild(this._buttombg);

        this._sVContainer = new BaseDisplayObjectContainer();
        // this._container.addChild(this._sVContainer);

        let rect = new egret.Rectangle(0, 0, 640, 148);
        this._scrollView = ComponentManager.getScrollView(this._sVContainer, rect);
        this._scrollView.setPosition(0, this._buttombg.y + 75);
        this._buttomContainer.addChild(this._scrollView)



        let ability: string[] = servantCfg.ability;
        this._servantInfoList = [];
        for (let i = 0; i < ability.length; i++) {
            let tmpAcfg = GameConfig.config.abilityCfg[ability[i]];
            let attrName = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + ability[i]) + ":", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (i % 2 == 0) {
                attrName.x = 65;
            }
            else {
                attrName.x = 350;
            }
            attrName.y = 5 + Math.floor(i / 2) * 40;
            this._sVContainer.addChild(attrName);

            let star = BaseBitmap.create("servant_star");
            star.setPosition(attrName.x + attrName.width + 5, attrName.y + attrName.height / 2 - star.height / 2);
            this._sVContainer.addChild(star);

            let numTF = ComponentManager.getTextField(tmpAcfg.num, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
            numTF.setPosition(star.x + star.width + 5, attrName.y);
            this._sVContainer.addChild(numTF);

            this._servantInfoList.push({ attrName: attrName, star: star, numTF: numTF })

        }

        this._namebg = BaseBitmap.create("specialview_commoni_namebg");
        this._nameTF = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameContainer.addChild(this._namebg);

        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        this._nameContainer.addChild(this._nameTF);

        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_title", [servantInfo.getTotalBookValue()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2)
        this._nameContainer.addChild(this._titleTF);

        this._titleTFLine = BaseBitmap.create("public_line3");
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        this._buttomContainer.addChild(this._titleTFLine);
        // 分享按钮
        App.ShareGuideUtil.addShareNode(this._container, App.ShareGuideUtil.TYPE_SERVANTGET);
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    }
    /**同类型刷新view */
    protected refreashView(id: number | string) {
        let servantCfg = Config.ServantCfg.getServantItemById(id);
        let servantInfo = Api.servantVoApi.getServantObj(String(id));
        let dagonBonesName = Api.servantVoApi.getServantBoneId(id);
        this._servantId = id;
        let boneName = "";
        if (dagonBonesName) {
            boneName = dagonBonesName + "_ske";
        }
        let depth: number = 0;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            if (this._servantDragonBones) {
                depth = this._container.getChildIndex(this._servantDragonBones);
                this._container.removeChild(this._servantDragonBones);
                this._servantDragonBones.dispose();
                this._servantDragonBones = null;
            }
            if (this._servantImg) {
                depth = this._container.getChildIndex(this._servantImg);
                this._container.removeChild(this._servantImg);
                this._servantImg.dispose();
                this._servantImg = null;
            }
            this._servantDragonBones = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._servantDragonBones.setScale(1.03);
            this._servantDragonBones.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 280);
            this._container.addChildAt(this._servantDragonBones, depth);
        }
        else {
            if (this._servantDragonBones) {
                depth = this._container.getChildIndex(this._servantDragonBones);
                this._container.removeChild(this._servantDragonBones);
                this._servantDragonBones.dispose();
                this._servantDragonBones = null;
            }
            if (this._servantImg) {
                this._servantImg.setload(servantCfg.fullIcon);
            }
            else {
                this._servantImg = BaseLoadBitmap.create(servantCfg.fullIcon);
                this._servantImg.width = 405;
                this._servantImg.height = 467;
                this._servantImg.anchorOffsetY = this._servantImg.height;
                this._servantImg.anchorOffsetX = this._servantImg.width / 2;
                this._servantImg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 280);
                this._container.addChildAt(this._servantImg, depth);
            }

        }

        for (let i = 0; i < this._servantInfoList.length; i++) {
            this._sVContainer.removeChild(this._servantInfoList[i].attrName);
            this._sVContainer.removeChild(this._servantInfoList[i].star);
            this._sVContainer.removeChild(this._servantInfoList[i].numTF);
            this._servantInfoList[i].attrName.dispose();
            this._servantInfoList[i].star.dispose();
            this._servantInfoList[i].numTF.dispose();
        }
        this._sVContainer.dispose();
        this._sVContainer = null;
        this._buttomContainer.removeChild(this._scrollView);
        this._scrollView.dispose();
        this._scrollView = null;
        this._sVContainer = new BaseDisplayObjectContainer();

        let rect = new egret.Rectangle(0, 0, 640, 148);
        this._scrollView = ComponentManager.getScrollView(this._sVContainer, rect);
        this._scrollView.setPosition(0, this._buttombg.y + 75);
        this._buttomContainer.addChild(this._scrollView)

        let ability: string[] = servantCfg.ability;
        this._servantInfoList = [];
        for (let i = 0; i < ability.length; i++) {
            let tmpAcfg = GameConfig.config.abilityCfg[ability[i]];
            let attrName = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + ability[i]) + ":", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (i % 2 == 0) {
                attrName.x = 65;
            }
            else {
                attrName.x = 350;
            }
            attrName.y = 5 + Math.floor(i / 2) * 40;
            this._sVContainer.addChild(attrName);

            let star = BaseBitmap.create("servant_star");
            star.setPosition(attrName.x + attrName.width + 5, attrName.y + attrName.height / 2 - star.height / 2);
            this._sVContainer.addChild(star);

            let numTF = ComponentManager.getTextField(tmpAcfg.num, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
            numTF.setPosition(star.x + star.width + 5, attrName.y);
            this._sVContainer.addChild(numTF);

            this._servantInfoList.push({ attrName: attrName, star: star, numTF: numTF })

        }
        // this._scrollView.scrollTop(0);
        // if (this._servantInfoList.length > 0) {
        //     this._buttombg.height = 108 + this._servantInfoList[this._servantInfoList.length - 1].star.y + this._servantInfoList[this._servantInfoList.length - 1].star.height - this._servantInfoList[0].star.y;
        // }

        this._nameTF.text = servantCfg.name;
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);

        this._titleTF.text = LanguageManager.getlocal("servantInfo_title", [servantInfo.getTotalBookValue()]);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2)
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
        if (this._servantImg) {
            this._servantImg.alpha = 0;
            egret.Tween.get(this._servantImg).wait(500).to({ alpha: 1 }, 100).call(() => {
                egret.Tween.removeTweens(this._servantImg);
            }, this);
        }
        else {
            this._servantDragonBones.alpha = 0;
            egret.Tween.get(this._servantDragonBones).wait(500).to({ alpha: 1 }, 100).call(() => {
                egret.Tween.removeTweens(this._servantDragonBones);
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
        if (this._isplay) {
            return;
        }
        if(Api.rookieVoApi.curGuideKey == "zhenqifang"){
            this.callBack();
            return;
        }
        let servantId = String(this._servantId);
        this.callBack();
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, servantId);
    }
    protected isShowBtn() {
        return true;
    }
    protected getResourceList() {
        return super.getResourceList().concat([
            "specialview_commoni_namebg", "servant_star", "shareBtn",
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
        this._servantDragonBones = null;
        this._servantImg = null;
        this._buttombg = null;
        this._titleTF = null;
        this._titleTFLine = null;
        this._nameTF = null;
        this._namebg = null;
        this._servantInfoList = [];
        this._scrollView = null;
        this._sVContainer = null;
        this._servantId = null;
        if(Api.rookieVoApi.curGuideKey == "zhenqifang"){
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_NEEDGUIDE);
        }
        super.dispose();
    }
}