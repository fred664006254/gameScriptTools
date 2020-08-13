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
/**
 * 真情好礼item
 * author ycg
 * date 2019.10.17
 * @class AcFirstSightLoveViewScrollItem2
 */
var AcFirstSightLoveViewScrollItem2 = (function (_super) {
    __extends(AcFirstSightLoveViewScrollItem2, _super);
    function AcFirstSightLoveViewScrollItem2() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        _this._vo = null;
        return _this;
    }
    AcFirstSightLoveViewScrollItem2.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        var id = itemParam.id;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this._vo = vo;
        var itemBgStr = ResourceManager.hasRes("ac_firstsightlove_truth_itembg-" + this.getTypeCode()) ? "ac_firstsightlove_truth_itembg-" + this.getTypeCode() : "ac_firstsightlove_truth_itembg-1";
        var itemBg = BaseBitmap.create(itemBgStr);
        //奖励次数提示
        // if (data.needReward){
        //     let spTipBg = BaseBitmap.create("");
        //     spTipBg.width = itemBg.width;
        //     this.addChild(spTipBg);
        //     let spTip = ComponentManager.getTextField(LanguageManager.getlocal("acFristSightLoveTruthRewardNum_1-"+this.getTypeCode(), [String(1111)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        //     spTip.width = spTipBg.width - 20;
        //     spTip.setPosition(spTipBg.x + 10 ,spTipBg.y + 5);
        //     this.addChild(spTip);
        //     spTipBg.height = spTip.height + 10;
        //     spTipBg.setPosition(0, 0);            
        //     itemBg.y = spTipBg.y + spTipBg.height;    
        // }
        this.addChild(itemBg);
        this.width = itemBg.width;
        this.height = itemBg.height;
        var titleBg = BaseBitmap.create("common_titlebg");
        titleBg.setPosition(itemBg.x + 15, itemBg.y + 5);
        this.addChild(titleBg);
        //标题
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acFristSightLoveTruthItemTitle_1" + "-" + this.getTypeCode(), [String(data.needFavor)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 10, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        titleBg.width = titleTF.width + 40;
        var rewardVoList = GameData.formatRewardItem(data.getReward);
        var spBg = BaseBitmap.create("ac_firstsightlove_special_itembg");
        spBg.setPosition(itemBg.x + itemBg.width - spBg.width - 20, itemBg.y + itemBg.height / 2 - spBg.height / 2 - 20);
        this.addChild(spBg);
        var rewardDB = GameData.getItemIcon(rewardVoList[0], true, false);
        rewardDB.x = spBg.x + spBg.width / 2 - rewardDB.width / 2;
        rewardDB.y = spBg.y + spBg.height / 2 - rewardDB.height / 2;
        var b = rewardDB.getChildByName("iconBg");
        if (b) {
            b.alpha = 0;
        }
        var numLb = rewardDB.getChildByName("numLb");
        numLb.x = 80;
        numLb.y = 80;
        this.addChild(rewardDB);
        if (rewardDB.getChildByName("numbg")) {
            rewardDB.getChildByName("numbg").visible = false;
        }
        var anim = ComponentManager.getCustomMovieClip("acrechargeboxspview_rewardanim", 10, 70);
        anim.x = rewardDB.x + rewardDB.width / 2 - 190 / 2;
        anim.y = rewardDB.y + rewardDB.height / 2 - 190 / 2;
        anim.blendMode = egret.BlendMode.ADD;
        this.addChild(anim);
        anim.playWithTime(-1);
        if (rewardVoList[0].type == 11 && rewardVoList[0].id == 4033) {
            //衣装预览
            var btnContainer = this.getSkinBtnContainer(rewardVoList[0].id, rewardVoList[0].type);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, spBg.y + 50);
        }
        var rewardScale = 0.83;
        for (var i = 1; i < rewardVoList.length; i++) {
            var rewardDB_1 = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB_1.setScale(rewardScale);
            rewardDB_1.setPosition(itemBg.x + 30 + (i - 1) * (rewardDB_1.width * rewardScale + 15), titleBg.y + titleBg.height + 5);
            this.addChild(rewardDB_1);
        }
        //special tip
        if (data.isSpecial == 1) {
            var specialTip = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveTruthSpecialTip-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
            specialTip.textAlign = TextFieldConst.ALIGH_CENTER;
            specialTip.width = 400;
            specialTip.lineSpacing = 5;
            specialTip.setPosition(30, itemBg.y + itemBg.height - 105);
            this.addChild(specialTip);
        }
        //person tip
        var personTipBg = BaseBitmap.create("public_9_bg87");
        // personTipBg.y = itemBg.y + itemBg.height - 105;
        personTipBg.y = itemBg.y + itemBg.height - personTipBg.height - 20;
        if (data.isSpecial == 0) {
            personTipBg.y = itemBg.y + itemBg.height - personTipBg.height - 40;
        }
        this.addChild(personTipBg);
        var personTip = ComponentManager.getTextField(LanguageManager.getlocal("acFristSightLoveTruthItemTitle_2" + "-" + this.getTypeCode(), [String(data.needFavor1)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // personTip.setPosition(titleBg.x + 15, itemBg.y + itemBg.height - personTip.height - 30);
        this.addChild(personTip);
        personTipBg.width = personTip.width + 60;
        personTipBg.x = itemBg.x + (itemBg.width - 120) / 2 - personTipBg.width / 2;
        personTip.setPosition(personTipBg.x + personTipBg.width / 2 - personTip.width / 2, personTipBg.y + personTipBg.height / 2 - personTip.height / 2);
        if (vo.getCurrLove() >= data.needFavor1) {
            personTip.setColor(TextFieldConst.COLOR_WARN_GREEN);
        }
        //按钮
        if (vo.getAchieveRewardById(data.id)) {
            //已领取
            var collectflag = BaseBitmap.create("collectflag");
            collectflag.setScale(0.6);
            // collectflag.setPosition(itemBg.x + (itemBg.width -120)/2 - collectflag.width * 0.6/2, itemBg.y + itemBg.height - collectflag.height * 0.5 - 15);
            collectflag.setPosition(itemBg.x + itemBg.width - collectflag.width * 0.6 - 25, itemBg.y + itemBg.height - collectflag.height * 0.5 - 15);
            this.addChild(collectflag);
        }
        else {
            var totalLove_1 = vo.getTotalLove();
            var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', function () {
                if (!vo.isStart) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                if (totalLove_1 < data.needFavor) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acFristSightLoveTruthItemTitle_1" + "-" + _this.getTypeCode(), ["" + data.needFavor]));
                    return;
                }
                App.LogUtil.log("vo.getCurr: " + vo.getCurrLove() + " fav1: " + data.needFavor1);
                if (vo.getCurrLove() < data.needFavor1) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acFristSightLoveTruthItemTitle_3" + "-" + _this.getTypeCode(), ["" + data.needFavor1]));
                    return;
                }
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETREWARD, { activeId: vo.aidAndCode, rkey: data.id });
            }, this);
            // receiveBtn.setPosition(itemBg.x + (itemBg.width - 120)/2 - receiveBtn.width/2, itemBg.y + itemBg.height - receiveBtn.height - 20);
            receiveBtn.setPosition(itemBg.x + itemBg.width - receiveBtn.width - 25, itemBg.y + itemBg.height - receiveBtn.height - 20);
            this.addChild(receiveBtn);
            if (totalLove_1 >= data.needFavor && vo.getCurrLove() >= data.needFavor1) {
                receiveBtn.setGray(false);
            }
            else {
                receiveBtn.setGray(true);
            }
        }
    };
    //衣装预览按钮
    AcFirstSightLoveViewScrollItem2.prototype.getSkinBtnContainer = function (id, type, isOther) {
        var container = new BaseDisplayObjectContainer();
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(0, 0);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        container.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        // skinTxtEffect.touchEnabled = false;
        var skinTxtStr = "acgiftreturnview_common_skintxt";
        var skinTxt = BaseBitmap.create(skinTxtStr);
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        container.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        // skinTxt.touchEnabled = false;
        var skinTxteffect = BaseBitmap.create(skinTxtStr);
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
        container.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        // skinTxteffect.touchEnabled = false;
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
        touchPos.height = 40;
        touchPos.setPosition(25, 57);
        container.addChild(touchPos);
        touchPos.addTouchTap(function () {
            var titleId = Config.TitleCfg.formatRewardItemVoStr(id);
            var data = { data: [
                    { idType: titleId }
                ], showType: "" };
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
        }, this);
        return container;
    };
    AcFirstSightLoveViewScrollItem2.prototype.getTypeCode = function () {
        return this._code;
    };
    AcFirstSightLoveViewScrollItem2.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._vo = null;
        _super.prototype.dispose.call(this);
    };
    return AcFirstSightLoveViewScrollItem2;
}(ScrollListItem));
__reflect(AcFirstSightLoveViewScrollItem2.prototype, "AcFirstSightLoveViewScrollItem2");
//# sourceMappingURL=AcFirstSightLoveViewScrollItem2.js.map