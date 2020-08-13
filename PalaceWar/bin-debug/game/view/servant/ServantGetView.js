/**
 * 门客招募UI
 * author yanyuling
 * date 2017/10/19
 * @class ServantGetView
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ServantGetView = (function (_super) {
    __extends(ServantGetView, _super);
    function ServantGetView() {
        return _super.call(this) || this;
    }
    ServantGetView.prototype.initView = function () {
        //设置本次人物id
        this._personId = this.param.data.shift();
        //设置类型
        this.targetType = "1";
        //设置回调函数
        this.initCallbackFunc(this.createView);
        //开始创建窗口
        _super.prototype.startView.call(this);
    };
    ServantGetView.prototype.createView = function () {
        console.log("create view-----");
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        if (typeof (this.param.data) == "string") {
            this.param.data = [this.param.data];
        }
        var servantId = this._personId; //this.param.data.shift();
        // let servantId = this.param.data
        var servantCfg = GameConfig.config.servantCfg[servantId];
        var ability = servantCfg.ability;
        var servantInfoObj = Api.servantVoApi.getServantObj(servantId);
        SoundManager.playEffect(servantInfoObj.sound);
        this.addTouchTap(this.clickHandler, this);
        var servant_get_word = BaseBitmap.create("servant_get_word");
        servant_get_word.x = GameConfig.stageWidth / 2 - servant_get_word.width / 2;
        servant_get_word.y = 20;
        this._nodeContainer.addChild(servant_get_word);
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.touchEnabled = true;
        bottomBg.height = 325;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 15;
        this._nodeContainer.addChild(bottomBg);
        var nameBg = BaseBitmap.create("public_get_namebg");
        // if(PlatformManager.checkIsTextHorizontal())
        // {
        // 	nameBg.setPosition(servant_get_word.x + servant_get_word.width / 2 - nameBg.width / 2,
        // 	servant_get_word.y + 2 * servant_get_word.height);
        // }
        // else
        // {
        nameBg.x = 50;
        nameBg.y = 180;
        // }
        this._nodeContainer.addChild(nameBg);
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON);
        nameTxt.textColor = ServantScrollItem.QUALITYCFG[servantCfg.quality];
        nameTxt.text = LanguageManager.getlocal("servant_name" + servantId);
        if (PlatformManager.checkIsTextHorizontal()) {
            nameTxt.setPosition(GameConfig.stageWidth / 2 - nameTxt.width / 2, bottomBg.y - 2 * nameTxt.height);
            nameBg.width = nameTxt.width + 30;
            nameBg.setPosition(nameTxt.x + nameTxt.width / 2 - nameBg.width / 2, nameTxt.y + nameTxt.height / 2 - nameBg.height / 2);
        }
        else {
            nameTxt.multiline = true;
            nameTxt.width = 26;
            nameTxt.x = nameBg.x + nameBg.width / 2 - nameTxt.width / 2;
            nameTxt.y = nameBg.y + 80 - nameTxt.height / 2;
        }
        this._nodeContainer.addChild(nameTxt);
        var servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(servantId));
        servantFullImg.width = 405;
        servantFullImg.height = 467;
        servantFullImg.x = GameConfig.stageWidth / 2 - servantFullImg.width / 2;
        servantFullImg.y = bottomBg.y - servantFullImg.height;
        this._nodeContainer.addChildAt(servantFullImg, 0);
        var lightImg = BaseBitmap.create("public_rotatelight");
        lightImg.anchorOffsetX = lightImg.width / 2;
        lightImg.anchorOffsetY = lightImg.height / 2;
        lightImg.x = GameConfig.stageWidth / 2;
        lightImg.y = servantFullImg.y + servantFullImg.height / 2 - 20;
        lightImg.setScale(2);
        this._nodeContainer.addChildAt(lightImg, 0);
        egret.Tween.get(lightImg, { loop: true }).to({ rotation: 360 }, 15000);
        var starNumTxt = 0;
        var totalStar = 0;
        var posX = 50;
        var posY = bottomBg.y + 30;
        posY = 0;
        var tmpScrNode = new BaseDisplayObjectContainer();
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            if (index2 % 2 == 1) {
                posX = GameConfig.stageWidth / 2 + 4;
            }
            else {
                posX = 50;
            }
            var attrIcon = BaseBitmap.create("servant_infoPro" + tmpAcfg.type);
            attrIcon.x = posX + 15;
            attrIcon.y = posY;
            tmpScrNode.addChild(attrIcon);
            var starImg = this.getStars(tmpAcfg.num);
            starImg.x = attrIcon.x + attrIcon.width / 2 - starImg.width / 2;
            starImg.y = attrIcon.y + 65;
            tmpScrNode.addChild(starImg);
            var attrNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 20, TextFieldConst.COLOR_WHITE);
            attrNameTxt.x = attrIcon.x + 77;
            attrNameTxt.y = posY + 20;
            tmpScrNode.addChild(attrNameTxt);
            var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + tmpAcfg.type), 18, TextFieldConst.COLOR_WHITE);
            attrTxt.x = attrNameTxt.x + 13;
            attrTxt.y = attrNameTxt.y + 35;
            tmpScrNode.addChild(attrTxt);
            var attrValueTxt = ComponentManager.getTextField(tmpAcfg.num.toString(), 18, TextFieldConst.COLOR_WHITE);
            attrValueTxt.x = attrTxt.x + attrTxt.width + 5;
            attrValueTxt.y = attrTxt.y;
            tmpScrNode.addChild(attrValueTxt);
            totalStar += tmpAcfg.num;
            if (index2 % 2 == 1) {
                posY += 95;
            }
        }
        var rect = new egret.Rectangle(0, 0, bottomBg.width, bottomBg.height - 40);
        var tmpScrollList = ComponentManager.getScrollView(tmpScrNode, rect);
        tmpScrollList.y = bottomBg.y + 30;
        this._nodeContainer.addChild(tmpScrollList);
        // let str = LanguageManager.getlocal("servantInfo_title"+ String(totalStar),[servantInfoObj.getTotalBookValue()]);
        var str = LanguageManager.getlocal("servantInfo_title", [servantInfoObj.getTotalBookValue()]);
        var totalTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        totalTxt.x = GameConfig.stageWidth - totalTxt.width - 20;
        totalTxt.y = bottomBg.y - 30;
        this._nodeContainer.addChild(totalTxt);
        //添加出现action
        this._nodeContainer.alpha = 0;
        egret.Tween.get(this._nodeContainer, { loop: false }).to({ alpha: 1 }, 800);
        // 分享按钮
        App.ShareGuideUtil.addShareNode(this._nodeContainer, App.ShareGuideUtil.TYPE_SERVANTGET);
    };
    ServantGetView.prototype.clickHandler = function () {
        console.log("servant get view---click handler");
        _super.prototype.hide.call(this);
        var servantId = this.param.data;
        // super.hide();
        if (servantId && servantId[0]) {
            ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, servantId);
        }
    };
    ServantGetView.prototype.getStars = function (num) {
        var objContainer = new BaseDisplayObjectContainer;
        for (var index = 1; index <= num; index++) {
            var starImg = BaseBitmap.create("servant_star");
            starImg.setScale(0.5);
            starImg.x = (index - 1) * starImg.width * 0.5;
            starImg.y = 0;
            objContainer.addChild(starImg);
        }
        return objContainer;
    };
    ServantGetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_get_word",
            "servant_star",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
            "shareBtn", "shareRewardPop"
        ]);
    };
    ServantGetView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return ServantGetView;
}(DialogueGetBaseView));
__reflect(ServantGetView.prototype, "ServantGetView");
//# sourceMappingURL=ServantGetView.js.map