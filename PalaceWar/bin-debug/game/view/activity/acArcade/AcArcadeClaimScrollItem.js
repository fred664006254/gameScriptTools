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
  * 电玩的任务item
  * author 张朝阳
  * date 2019/6/12
  * @class AcArcadeClaimScrollItem
  */
var AcArcadeClaimScrollItem = (function (_super) {
    __extends(AcArcadeClaimScrollItem, _super);
    function AcArcadeClaimScrollItem() {
        var _this = _super.call(this) || this;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcArcadeClaimScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._aidAndCode = itemParam;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        this.width = 608;
        this.height = 140;
        var rewardsArr = GameData.formatRewardItem(data.item);
        var rewardInfo = rewardsArr[0];
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = 610;
        wordsBg.height = 140;
        this.addChild(wordsBg);
        var icon = GameData.getItemIcon(rewardInfo, true, true);
        icon.setPosition(wordsBg.x + 22, wordsBg.y + wordsBg.height / 2 - icon.height / 2);
        this.addChild(icon);
        var itemNameBg = BaseBitmap.create("public_9_bg15");
        itemNameBg.width = 180;
        itemNameBg.setPosition(icon.x + icon.width + 10, icon.y + 5);
        this.addChild(itemNameBg);
        var itemNameTF = ComponentManager.getTextField(rewardInfo.name, TextFieldConst.FONTSIZE_TITLE_SMALL, rewardInfo.nameColor);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemNameTF, itemNameBg);
        this.addChild(itemNameTF);
        var itemDescTF = ComponentManager.getTextField(rewardInfo.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemDescTF.textAlign = egret.HorizontalAlign.LEFT;
        itemDescTF.width = 200;
        this.setLayoutPosition(LayoutConst.lefttop, itemDescTF, itemNameBg, [0, itemNameBg.height + 2]);
        this.addChild(itemDescTF);
        var buyNum = vo.getShopBuyNumById(data.id);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "nothing", function () {
            if (data.limit && (data.limit - buyNum <= 0)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acArcadeClaimViewNotFullNumTip-" + _this._aidAndCode.code));
                return;
            }
            if (data.costScore > vo.getScore()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acArcadeClaimViewNotFullScoreTip-" + _this._aidAndCode.code));
                return;
            }
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADESHOPBUY, { activeId: vo.aidAndCode, rkey: data.id, num: 1 });
        }, this);
        var str = String(data.costScore);
        btn.setText(str, false);
        btn.addTextIcon("acarcadeview_mooncoin-" + this._aidAndCode.code);
        this.setLayoutPosition(LayoutConst.rightverticalCenter, btn, this, [22, 0]);
        this.addChild(btn);
        if (data.costScore > vo.getScore() || (data.limit && (data.limit - buyNum) <= 0)) {
            btn.setGray(true);
        }
        else {
            btn.setGray(false);
        }
        //限购
        if (data.limit) {
            var curNum = data.limit - vo.getShopBuyNumById(data.id);
            var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeClaimViewLimit-" + this._aidAndCode.code, [String(curNum)]), 20, TextFieldConst.COLOR_BLACK);
            this.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [0, btn.height + 5]);
            this.addChild(limitTxt);
            // if (curNum <= 0) {
            // 	btn.setEnable(false);
            // }
        }
    };
    AcArcadeClaimScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcArcadeClaimScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcArcadeClaimScrollItem;
}(ScrollListItem));
__reflect(AcArcadeClaimScrollItem.prototype, "AcArcadeClaimScrollItem");
//# sourceMappingURL=AcArcadeClaimScrollItem.js.map