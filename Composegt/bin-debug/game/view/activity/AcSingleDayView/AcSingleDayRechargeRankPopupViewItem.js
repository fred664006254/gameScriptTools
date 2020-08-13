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
 * 双11排行榜 Item
 * @author 张朝阳
 * date 2018/10/25
 * @class AcSingleDayRechargeRankPopupViewItem
 */
var AcSingleDayRechargeRankPopupViewItem = (function (_super) {
    __extends(AcSingleDayRechargeRankPopupViewItem, _super);
    function AcSingleDayRechargeRankPopupViewItem() {
        return _super.call(this) || this;
    }
    AcSingleDayRechargeRankPopupViewItem.prototype.initItem = function (index, data) {
        this.height = 50;
        this.width = 502;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = this.width;
            bg.height = this.height;
            this.addChild(bg);
        }
        if (index > 2) {
            var titleTxt1 = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            titleTxt1.setPosition(this.x + 60 - titleTxt1.width / 2, this.y + this.height / 2 - titleTxt1.height / 2);
            this.addChild(titleTxt1);
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                titleTxt1.setColor(TextFieldConst.COLOR_WARN_GREEN);
                titleTxt1.setColor(TextFieldConst.COLOR_WARN_GREEN);
            }
        }
        else {
            var rankImg = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankImg.width = 49;
            rankImg.height = 39;
            rankImg.setPosition(this.x + 60 - rankImg.width / 2, this.y + this.height / 2 - rankImg.height / 2);
            this.addChild(rankImg);
        }
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameTxt.setPosition(this.x + 235 - nameTxt.width / 2, this.y + this.height / 2 - nameTxt.height / 2);
        this.addChild(nameTxt);
        var rechargeTxt = ComponentManager.getTextField(data.value, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        rechargeTxt.setPosition(this.x + 410 - rechargeTxt.width / 2, this.y + this.height / 2 - rechargeTxt.height / 2);
        this.addChild(rechargeTxt);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            nameTxt.setColor(TextFieldConst.COLOR_WARN_GREEN);
            rechargeTxt.setColor(TextFieldConst.COLOR_WARN_GREEN);
        }
    };
    AcSingleDayRechargeRankPopupViewItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcSingleDayRechargeRankPopupViewItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayRechargeRankPopupViewItem;
}(ScrollListItem));
__reflect(AcSingleDayRechargeRankPopupViewItem.prototype, "AcSingleDayRechargeRankPopupViewItem");
