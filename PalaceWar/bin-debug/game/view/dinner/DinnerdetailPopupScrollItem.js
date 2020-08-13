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
var DinnerdetailPopupScollItem = (function (_super) {
    __extends(DinnerdetailPopupScollItem, _super);
    function DinnerdetailPopupScollItem() {
        return _super.call(this) || this;
    }
    DinnerdetailPopupScollItem.prototype.initItem = function (index, data) {
        this.width = 509;
        this.height = 132;
        var bgBg = BaseBitmap.create("public_9_bg14");
        bgBg.width = this.width;
        bgBg.height = 131;
        this.addChild(bgBg);
        var line = BaseBitmap.create("public_line1");
        line.width = 400;
        line.setPosition(100, 43);
        this.addChild(line);
        var posX = 120;
        if (data && data.name) {
            var titleId = data.ptitle;
            var head = Api.playerVoApi.getPlayerCircleHead(data.pic, titleId);
            head.setPosition(16, bgBg.height / 2 - head.height / 2);
            this.addChild(head);
            head.addTouchTap(this.roleHeadClickHandler, this, [data.uid]);
            var guestName = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            guestName.setPosition(posX, 15);
            this.addChild(guestName);
            var itemCfg = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype);
            var point = itemCfg.getPoint;
            var itemName = void 0;
            var scoreStr = void 0;
            if (itemCfg.needGem) {
                itemName = itemCfg.needGem + LanguageManager.getlocal("gemName");
            }
            else {
                itemName = LanguageManager.getlocal("itemName_" + itemCfg.needItem);
            }
            if (point > 0) {
                scoreStr = LanguageManager.getlocal("dinnerCashGift1", [itemName, String(point)]);
            }
            else {
                scoreStr = LanguageManager.getlocal("dinnerCashGift2", [itemName, String(point)]);
            }
            var alliance = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            alliance.setPosition(posX, 60);
            this.addChild(alliance);
            if (data.allianceId == Api.playerVoApi.getPlayerAllianceId()) {
                alliance.textColor = TextFieldConst.COLOR_WARN_GREEN2;
            }
            if (data.allianceName) {
                alliance.text = LanguageManager.getlocal("emperorWarCheerBhui", [data.allianceName]);
            }
            else {
                alliance.text = LanguageManager.getlocal("emperorWarCheerBhui", [LanguageManager.getlocal("nothing")]);
            }
            var guestScre = ComponentManager.getTextField(scoreStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            guestScre.setPosition(posX, alliance.y + alliance.height + 10);
            this.addChild(guestScre);
        }
        else if (data.special) {
            //花钱
            var emptySeat = BaseBitmap.create("dinner_seat_special" + data.dtype);
            emptySeat.setPosition(16, bgBg.height / 2 - emptySeat.height / 2);
            this.addChild(emptySeat);
            var guestName = ComponentManager.getTextField(LanguageManager.getlocal("dinnerFinishName" + data.dtype), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            guestName.setPosition(posX, 15);
            this.addChild(guestName);
            var itemCfg = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype);
            var point = itemCfg.getPoint;
            var itemName = void 0;
            var scoreStr = void 0;
            if (itemCfg.needGem) {
                itemName = itemCfg.needGem + LanguageManager.getlocal("gemName");
            }
            else {
                itemName = LanguageManager.getlocal("itemName_" + itemCfg.needItem);
            }
            if (point > 0) {
                scoreStr = LanguageManager.getlocal("dinnerCashGift1", [itemName, String(point)]);
            }
            else {
                scoreStr = LanguageManager.getlocal("dinnerCashGift2", [itemName, String(point)]);
            }
            var alliance = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            alliance.setPosition(posX, 60);
            this.addChild(alliance);
            if (data.allianceId == Api.playerVoApi.getPlayerAllianceId()) {
                alliance.textColor = TextFieldConst.COLOR_WARN_GREEN2;
            }
            if (data.allianceName) {
                alliance.text = LanguageManager.getlocal("emperorWarCheerBhui", [data.allianceName]);
            }
            else {
                alliance.text = LanguageManager.getlocal("emperorWarCheerBhui", [LanguageManager.getlocal("nothing")]);
            }
            var guestScre = ComponentManager.getTextField(scoreStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            guestScre.setPosition(posX, alliance.y + alliance.height + 10);
            this.addChild(guestScre);
        }
        else {
            //空位
            var emptySeat = BaseBitmap.create("dinner_seat_empty");
            emptySeat.setPosition(16, bgBg.height / 2 - emptySeat.height / 2);
            this.addChild(emptySeat);
            var guestName = ComponentManager.getTextField(LanguageManager.getlocal("dinnerGuest"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            guestName.setPosition(posX, 15);
            this.addChild(guestName);
            var guestScre = ComponentManager.getTextField(LanguageManager.getlocal("dinnerGuestScore", [String(Config.DinnerCfg.getAddScore())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            guestScre.setPosition(posX, 60);
            this.addChild(guestScre);
        }
    };
    DinnerdetailPopupScollItem.prototype.roleHeadClickHandler = function (evc, uid) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: uid });
    };
    DinnerdetailPopupScollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        if (event.data.ret) {
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    return DinnerdetailPopupScollItem;
}(ScrollListItem));
__reflect(DinnerdetailPopupScollItem.prototype, "DinnerdetailPopupScollItem");
//# sourceMappingURL=DinnerdetailPopupScrollItem.js.map