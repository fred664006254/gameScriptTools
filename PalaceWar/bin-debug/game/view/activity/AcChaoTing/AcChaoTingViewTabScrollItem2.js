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
 * 充值奖励item
 * author ycg
 * date 2020.3.24
 */
var AcChaoTingViewTabScrollItem2 = (function (_super) {
    __extends(AcChaoTingViewTabScrollItem2, _super);
    function AcChaoTingViewTabScrollItem2() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    AcChaoTingViewTabScrollItem2.prototype.initItem = function (index, data, param) {
        this._itemData = data;
        this._aid = param.aid;
        this._code = param.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this.width = 640;
        var bgImg = ResourceManager.hasRes("acchaoting_itembg-" + this.getTypeCode()) ? "acchaoting_itembg-" + this.getTypeCode() : "acchaoting_itembg-1";
        var bg = BaseBitmap.create(bgImg);
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var topBgImg = ResourceManager.hasRes("acchaoting_itemtitlebg-" + this.getTypeCode()) ? "acchaoting_itemtitlebg-" + this.getTypeCode() : "acchaoting_itemtitlebg-1";
        var topBg = BaseBitmap.create(topBgImg);
        topBg.y = 0;
        topBg.x = this.width / 2 - topBg.width / 2;
        bg.y = topBg.y + 13;
        this.addChild(topBg);
        var topName = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRechargeGiftName" + data.id + "-" + this.getTypeCode()), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        topName.setPosition(topBg.x + topBg.width / 2 - topName.width / 2, topBg.y + 17);
        this.addChild(topName);
        var titleBg = BaseBitmap.create("public_textbrownbg");
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 45);
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRechargeInfo", [String(data.needGem)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var rewardVoList = GameData.formatRewardItem(data.getReward);
        var scale = 0.95;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 14;
        var spaceY = 12;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(scale);
            rewardDB.setPosition(bg.x + 21 + ((rewardDB.width * scale + spaceX) * (i % 5)), titleBg.y + titleBg.height + 15 + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
        var rHeight = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.ceil(rewardVoList.length / 5)) * (itemHeight * scale + spaceY) - spaceY;
        var bgH = titleBg.y + titleBg.height + 15 + rHeight + 70;
        if (bgH > bg.height) {
            bg.height = bgH;
        }
        //进度条
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 420);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        var currChargeGem = vo.getRechargeNum();
        var progressStr = LanguageManager.getlocal("acChaotingRechargeProNum", [String(currChargeGem), String(data.needGem)]);
        progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);
        if (vo.isGetRechargeById(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else {
            if (vo.getRechargeNum() >= data.needGem) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                    if ((!vo.isStart)) {
                        vo.showAcEndTip();
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACCHAOTING_GETRECHARGE, { activeId: vo.aidAndCode, rkey: data.id });
                }, this);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
                reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", function () {
                    if (!vo.isInActivity()) {
                        vo.showAcEndTip();
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                }, this);
                chargeBtn.setPosition(bg.x + bg.width - chargeBtn.width - 15, bg.y + bg.height - chargeBtn.height - 15);
                this.addChild(chargeBtn);
                chargeBtn.setColor(TextFieldConst.COLOR_BLACK);
                if (!vo.isInActivity()) {
                    chargeBtn.setGray(true);
                }
            }
        }
    };
    AcChaoTingViewTabScrollItem2.prototype.getTypeCode = function () {
        return this._code;
    };
    AcChaoTingViewTabScrollItem2.prototype.getSpaceY = function () {
        return 5;
    };
    AcChaoTingViewTabScrollItem2.prototype.dispose = function () {
        this._itemData = null;
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcChaoTingViewTabScrollItem2;
}(ScrollListItem));
__reflect(AcChaoTingViewTabScrollItem2.prototype, "AcChaoTingViewTabScrollItem2");
//# sourceMappingURL=AcChaoTingViewTabScrollItem2.js.map