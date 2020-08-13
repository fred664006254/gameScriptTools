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
 * 帮会争霸的logItem
 * author 张朝阳
 * date 2018/10/13
 * @class AllianceWarLogScrollItem
 */
var AllianceWarLogScrollItem = (function (_super) {
    __extends(AllianceWarLogScrollItem, _super);
    function AllianceWarLogScrollItem() {
        return _super.call(this) || this;
    }
    AllianceWarLogScrollItem.prototype.initItem = function (index, data) {
        this._data = data;
        this.width = 640;
        var rankImg = BaseBitmap.create("rankinglist_rankbg");
        rankImg.setPosition(10, 15);
        this.addChild(rankImg);
        rankImg.visible = false;
        var rankTxt = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        rankTxt.setPosition(rankImg.x + rankImg.width / 2 - rankTxt.width / 2, rankImg.y + rankImg.height / 2 - rankTxt.height / 2);
        this.addChild(rankTxt);
        var descTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewFirestLog1", [data.zid, data.name]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        descTxt1.setPosition(rankImg.x + rankImg.width + 20, rankImg.y + rankImg.height / 2 - descTxt1.height / 2);
        this.addChild(descTxt1);
        var descTxt2Str = "";
        if (data.tinfo && data.tinfo.zid) {
            descTxt2Str = LanguageManager.getlocal("allianceWarViewFirestLog2_" + data.win, [App.StringUtil.changeIntToText(data.totaldps), data.tinfo.zid, data.tinfo.name]);
        }
        else {
            descTxt2Str = LanguageManager.getlocal("allianceWarViewFirestLog2_3", [App.StringUtil.changeIntToText(data.totaldps)]);
        }
        var descTxt2 = ComponentManager.getTextField(descTxt2Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        if (PlatformManager.checkIsViSp() || PlatformManager.checkIsKRSp() || PlatformManager.checkIsJPSp() || PlatformManager.checkIsKRNewSp()) {
            // descTxt2.size = 18;
            descTxt2.width = 480;
            descTxt2.multiline = true;
            descTxt2.lineSpacing = 4;
        }
        descTxt2.setPosition(descTxt1.x, descTxt1.y + descTxt1.height + 8);
        this.addChild(descTxt2);
        // lastday
        var timeStr = App.DateUtil.getFormatBySecond(data.lastday, 2);
        var timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewLogTime", [timeStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        timeTxt.setPosition(descTxt2.x, descTxt2.y + descTxt2.height + 20);
        this.addChild(timeTxt);
        var playBackBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceWarPlayBack", this.playBackClick, this);
        playBackBtn.setPosition(this.width - playBackBtn.width - 20, timeTxt.y + timeTxt.height / 2 - playBackBtn.height / 2);
        this.addChild(playBackBtn);
        var line = BaseBitmap.create("rankinglist_line");
        line.setPosition(this.width / 2 - line.width / 2, playBackBtn.y + playBackBtn.height + 15);
        this.addChild(line);
    };
    AllianceWarLogScrollItem.prototype.playBackClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEWARSHOWANTIVIEW, view._data);
    };
    AllianceWarLogScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AllianceWarLogScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AllianceWarLogScrollItem;
}(ScrollListItem));
__reflect(AllianceWarLogScrollItem.prototype, "AllianceWarLogScrollItem");
