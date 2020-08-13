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
 * 玩吧vip特权礼包cell
 * @author 赵占涛
 */
var WanbaviptequanCell = (function (_super) {
    __extends(WanbaviptequanCell, _super);
    function WanbaviptequanCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vipLevel = 0;
        return _this;
    }
    WanbaviptequanCell.prototype.initItem = function (index, data) {
        this.vipLevel = data;
        var temW = 515;
        var temH = 138;
        this.width = temW;
        this.height = temH;
        var bg = BaseBitmap.create("activity_db_01");
        bg.width = temW;
        bg.height = 133;
        this.addChild(bg);
        var bgRed = BaseBitmap.create("activity_charge_red");
        bgRed.width = 277;
        bgRed.y = 2;
        this.addChild(bgRed);
        var vipIcon = BaseBitmap.create("wanbaviptequanicon" + this.vipLevel);
        vipIcon.x = 6;
        vipIcon.y = 6;
        this.addChild(vipIcon);
        var giftTxt = ComponentManager.getTextField(LanguageManager.getlocal("acHuLaoGiftListPopupViewTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        giftTxt.x = vipIcon.x + vipIcon.width + 10;
        giftTxt.y = vipIcon.y + vipIcon.height / 2 - giftTxt.height / 2;
        this.addChild(giftTxt);
        // 道具
        var contentList = GameData.formatRewardItem(Config.WanbagamegiftCfg.getVipReward(this.vipLevel).reward);
        for (var i = 0; i < contentList.length; i++) {
            var tmpData = contentList[i];
            var iconItem = GameData.getItemIcon(tmpData, true);
            iconItem.setScale(0.7);
            iconItem.x = 20 + 80 * i;
            iconItem.y = 45;
            this.addChild(iconItem);
        }
        // 按钮
        var btnTxt = "";
        var btnPic = ButtonConst.BTN_SMALL_YELLOW;
        var grey = false;
        if (Api.otherInfoVoApi.getWanbaviptequanInfo(this.vipLevel) == 1) {
            btnTxt = "candyGetAlready";
            grey = true;
        }
        else if (this.vipLevel == WanbaviptequanView.currentVip) {
            btnTxt = "taskCollect";
        }
        else if (this.vipLevel < WanbaviptequanView.currentVip) {
            btnTxt = "wanbaviptequanCannotGet";
            grey = true;
        }
        else {
            btnTxt = "gotocharge";
            btnPic = ButtonConst.BTN_SMALL_BLUE;
        }
        var okBtn = ComponentManager.getButton(btnPic, btnTxt, this.okBtnClick, this);
        okBtn.x = 443 - okBtn.width / 2;
        okBtn.y = 65 - okBtn.height / 2;
        if (grey) {
            App.DisplayUtil.changeToGray(okBtn);
        }
        this.addChild(okBtn);
    };
    WanbaviptequanCell.prototype.okBtnClick = function (param) {
        if (Api.otherInfoVoApi.getWanbaviptequanInfo(this.vipLevel) == 1) {
            // 已领取
        }
        else if (this.vipLevel == WanbaviptequanView.currentVip) {
            // 领取
            NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD, { vip: this.vipLevel });
        }
        else if (this.vipLevel < WanbaviptequanView.currentVip) {
            // 不可领取
        }
        else {
            // 去充值
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    WanbaviptequanCell.prototype.getSpaceY = function () {
        return 5;
    };
    WanbaviptequanCell.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WanbaviptequanCell;
}(ScrollListItem));
__reflect(WanbaviptequanCell.prototype, "WanbaviptequanCell");
