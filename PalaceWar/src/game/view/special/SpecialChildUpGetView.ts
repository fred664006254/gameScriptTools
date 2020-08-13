/**
 * 特殊奖励--金榜题名
 * @author 张朝阳
 * date 2019/3/27
 * @class SpecialChildUpGetView
 */
class SpecialChildUpGetView extends SpecialBaseView {
    private _buttombg: BaseLoadBitmap = null;
    private _titleTF: BaseTextField = null;
    private _titleTFLine: BaseBitmap = null;

    private _buttomContainer: BaseDisplayObjectContainer = null;


    /**淡光 */
    private _shimmer: BaseLoadBitmap = null;
    /**光刺1 */
    private _thorn1: BaseLoadBitmap = null;
    /**光刺2 */
    private _thorn2: BaseLoadBitmap = null;

    private _childPic: BaseLoadBitmap = null;
    public constructor() {
        super();
    }
    /**创建view */
    protected createView(id: number | string) {
        let adultInfoVo: AdultInfoVo = Api.adultVoApi.getAdultInfoVoById(String(id));

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


        let sexPicStr = Api.adultVoApi.getAdultPic(id);
        this._childPic = BaseLoadBitmap.create(sexPicStr);
        this._childPic.width = 332;
        this._childPic.height = 375;
        this._childPic.setPosition(GameConfig.stageWidth / 2 - this._childPic.width / 2, GameConfig.stageHeigth - 720);
        this._container.addChild(this._childPic);



        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);

        this._buttombg = BaseLoadBitmap.create("specialview_buttombg1");
        this._buttombg.width = 640;
        this._buttombg.height = 230;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - 350);
        this._buttomContainer.addChild(this._buttombg);



        let wifeInfoVo: WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(adultInfoVo.motherId);
        let wStr = LanguageManager.getlocal("childMother", [wifeInfoVo.name]);
        let matherTF: BaseTextField = ComponentManager.getTextField(wStr, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        matherTF.setPosition(this._buttombg.x + 75, this._buttombg.y + 75);
        this._buttomContainer.addChild(matherTF);

        let att1TF: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("attributeName") + ":" + adultInfoVo.attrVo.attTotal, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        att1TF.setPosition(this._buttombg.x + 360, this._buttombg.y + 75);
        this._buttomContainer.addChild(att1TF);

        let att2TF: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality1") + ":" + adultInfoVo.attrVo.forceTotal, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        att2TF.setPosition(this._buttombg.x + 75, this._buttombg.y + 115);
        this._buttomContainer.addChild(att2TF);

        let att3TF: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality2") + ":" + adultInfoVo.attrVo.brainsTotal, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        att3TF.setPosition(this._buttombg.x + 360, this._buttombg.y + 115);
        this._buttomContainer.addChild(att3TF);

        let att4TF: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality3") + ":" + adultInfoVo.attrVo.politicsTotal, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        att4TF.setPosition(this._buttombg.x + 75, this._buttombg.y + 155);
        this._buttomContainer.addChild(att4TF);

        let att5TF: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality4") + ":" + adultInfoVo.attrVo.charmTotal, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        att5TF.setPosition(this._buttombg.x + 360, this._buttombg.y + 155);
        this._buttomContainer.addChild(att5TF);

        let namebg = BaseLoadBitmap.create("specialview_commoni_namebg");
        namebg.height = 38;
        namebg.y = this._buttombg.y-40;
        this._buttomContainer.addChild(namebg);

        let nameText = ComponentManager.getTextField( LanguageManager.getlocal("adult_quality" + adultInfoVo.aquality),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        nameText.setPosition(GameConfig.stageWidth/2 - nameText.width/2,namebg.y+namebg.height/2-nameText.height/2);
        this._buttomContainer.addChild(nameText);
        namebg.width = nameText.width+50;
        namebg.x = GameConfig.stageWidth/2 - namebg.width/2;


        this._titleTF = ComponentManager.getTextField(adultInfoVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2)
        this._buttomContainer.addChild(this._titleTF);

        this._titleTFLine = BaseBitmap.create("public_line3");
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        this._buttomContainer.addChild(this._titleTFLine);

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

        this._childPic.alpha = 0;
        egret.Tween.get(this._childPic).wait(500).to({ alpha: 1 }, 100).call(() => {
            egret.Tween.removeTweens(this._childPic);
        }, this);
    }
    public dispose(): void {
        this._buttombg = null;
        this._titleTF = null;
        this._titleTFLine = null;
        super.dispose();
    }
}