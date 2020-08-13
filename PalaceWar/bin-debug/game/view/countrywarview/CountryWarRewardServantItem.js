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
 * 	国战点将录item相关
 * author 张朝阳
 * date 2018/11/16
 * @class CountryWarRewardServantItem
 */
var CountryWarRewardServantItem = (function (_super) {
    __extends(CountryWarRewardServantItem, _super);
    function CountryWarRewardServantItem() {
        return _super.call(this) || this;
    }
    CountryWarRewardServantItem.prototype.initItem = function (index, data, itemParam) {
        this.width = 528;
        this.height = 170;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = this.width;
        bg.height = this.height;
        this.addChild(bg);
        var startDate = App.DateUtil.getFormatBySecond(data.startTime, 7);
        var endDate = App.DateUtil.getFormatBySecond((data.endTime - 86400), 7);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardServantDate", [startDate, endDate]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        dateTxt.setPosition(bg.x + 325 - dateTxt.width / 2, bg.y + 15);
        this.addChild(dateTxt);
        // let powerTxt  = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardServantAddPower",["20"]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN2);
        // powerTxt.setPosition(bg.x + 320 - powerTxt.width / 2,bg.y + 14);
        // this.addChild(powerTxt);
        var line = BaseBitmap.create("public_line1");
        line.setPosition(bg.x + bg.width / 2 - line.width / 2, dateTxt.y + dateTxt.height + 5);
        this.addChild(line);
        var dateBg = BaseBitmap.create("countrywarrewardview_date1");
        dateBg.setPosition(bg.x + 40, line.y + line.height + 5);
        this.addChild(dateBg);
        var dataList = Api.countryWarVoApi.getServantAddPower(data.cfg);
        var rectWidth = 121 * dataList.length;
        var rect = new egret.Rectangle(0, 0, rectWidth, 110);
        var scrollList = ComponentManager.getScrollList(CountryWayServantItem, dataList, rect, { width: 116, height: 108, temW: 108, numTxtScale: 0.7, nameSize: TextFieldConst.FONTSIZE_CONTENT_SMALL });
        scrollList.setPosition(dateTxt.x + dateTxt.width / 2 - scrollList.width / 2, line.y + line.height + 5);
        this.addChild(scrollList);
        if (data.startTime <= GameData.serverTime && GameData.serverTime < data.endTime) {
            dateBg.setRes("countrywarrewardview_date1");
            bg.setRes("public_9_bg55");
        }
        else if (data.startTime > GameData.serverTime) {
            bg.setRes("public_9_bg14");
            if (index == 1) {
                dateBg.setRes("countrywarrewardview_date3");
            }
            else {
                dateBg.setVisible(false);
            }
        }
        else if (GameData.serverTime >= data.endTime) {
            dateBg.setRes("countrywarrewardview_date2");
            var bgMask = BaseBitmap.create("public_9_bg54");
            bgMask.width = bg.width;
            bgMask.height = bg.height;
            bgMask.setPosition(bg.x, bg.y);
            this.addChild(bgMask);
        }
    };
    CountryWarRewardServantItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return CountryWarRewardServantItem;
}(ScrollListItem));
__reflect(CountryWarRewardServantItem.prototype, "CountryWarRewardServantItem");
//# sourceMappingURL=CountryWarRewardServantItem.js.map