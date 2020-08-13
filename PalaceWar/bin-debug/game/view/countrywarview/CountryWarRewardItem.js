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
 * 	国战奖励item相关
 * author 张朝阳
 * date 2018/11/16
 * @class CountryWarRewardItem
 */
var CountryWarRewardItem = (function (_super) {
    __extends(CountryWarRewardItem, _super);
    function CountryWarRewardItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    CountryWarRewardItem.prototype.initItem = function (index, data, itemParam) {
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 528;
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 508;
        titleBg.height = 33;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);
        var titleTxtStr = null;
        switch (itemParam.type) {
            case 1:
                if (index == 0) {
                    titleTxtStr = LanguageManager.getlocal("countryWarRewardItemWin");
                }
                else if (index == 1) {
                    titleTxtStr = LanguageManager.getlocal("countryWarRewardItemLose");
                }
                else {
                    titleTxtStr = LanguageManager.getlocal("countryWarRewardItemLast");
                }
                this._data = data;
                break;
            case 2:
                titleTxtStr = LanguageManager.getlocal("countryWarRewardItemHaveCity", [data.cityNum]);
                this._data = data.cityReward;
                break;
            case 3:
                var rankstr = "";
                if (data.maxRank == data.minRank) {
                    rankstr = String(data.maxRank);
                }
                else {
                    rankstr = String(data.minRank) + "-" + String(data.maxRank);
                }
                titleTxtStr = LanguageManager.getlocal("countryWarRewardItemRank", [rankstr]);
                this._data = data.powerReward;
                break;
        }
        var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.setPosition(titleBg.x + titleBg.width / 2 - titleTxt.width / 2, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
        this.addChild(titleTxt);
        var leftLine = BaseBitmap.create("public_line3");
        leftLine.width += titleTxt.width;
        leftLine.setPosition(titleTxt.x + titleTxt.width / 2 - leftLine.width / 2, titleTxt.y + titleTxt.height / 2 - leftLine.height / 2);
        this.addChild(leftLine);
        var rewardVoList = GameData.formatRewardItem(this._data);
        var scaleValue = 0.85;
        var offestHeight = 0;
        var startWidth = 11.5;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true);
            rewardDB.setScale(scaleValue);
            var rewardDBWidth = rewardDB.width * scaleValue;
            var posX = bg.x + startWidth + (((i) % 5) * (rewardDBWidth + startWidth));
            var posY = titleBg.y + titleBg.height + 10 + (Math.floor((i) / 5) * (rewardDB.height * scaleValue + 5));
            rewardDB.setPosition(posX, posY);
            this.addChild(rewardDB);
            offestHeight = rewardDB.height * scaleValue;
        }
        bg.height += offestHeight * (Math.floor(rewardVoList.length / 6) + 1) - 25;
        this.width = bg.width;
        this.height = bg.height;
    };
    CountryWarRewardItem.prototype.dispose = function () {
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return CountryWarRewardItem;
}(ScrollListItem));
__reflect(CountryWarRewardItem.prototype, "CountryWarRewardItem");
//# sourceMappingURL=CountryWarRewardItem.js.map