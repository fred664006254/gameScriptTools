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
var AcEnjoyNightTenItem = (function (_super) {
    __extends(AcEnjoyNightTenItem, _super);
    function AcEnjoyNightTenItem() {
        var _this = _super.call(this) || this;
        _this.itemData = null;
        return _this;
    }
    Object.defineProperty(AcEnjoyNightTenItem.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid, this.itemData.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightTenItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.itemData.aid, this.itemData.code);
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightTenItem.prototype.initItem = function (index, data, itemParam) {
        this.itemData = itemParam;
        var aid = itemParam.aid;
        var code = itemParam.code;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 502;
        bg.height = 203;
        this.addChild(bg);
        var unit = this.cfg.map[data.pos];
        var value1 = data.randNumber;
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightThrowTimes", [App.StringUtil.changeIntToCharText(index + 1), String(value1)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        desc1.setPosition(24, 12);
        this.addChild(desc1);
        var picName = "common";
        if (unit.buildingType) {
            picName = unit.buildingType;
        }
        var value2 = LanguageManager.getlocal("acEnjoyNightAward_" + picName + "-1");
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightArrive", [value2]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        desc2.setPosition(desc1.x, desc1.y + desc1.height + 4);
        this.addChild(desc2);
        var value3 = data.addValue;
        var desc3 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightGetValue", [String(value3)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        desc3.setPosition(desc1.x, desc2.y + desc2.height + 4);
        this.addChild(desc3);
        var line = BaseBitmap.create("public_line1");
        line.setPosition(bg.width / 2 - line.width / 2, desc3.y + desc3.height + 8);
        this.addChild(line);
        var posy = line.y + 10;
        var rewardVoList = GameData.formatRewardItem(data.rewards);
        var scale = 0.8;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true);
            rewardDB.setScale(scale);
            rewardDB.setPosition(18 + ((rewardDB.width - 13) * (i % 5)), posy + ((rewardDB.height - 8) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
    };
    return AcEnjoyNightTenItem;
}(ScrollListItem));
__reflect(AcEnjoyNightTenItem.prototype, "AcEnjoyNightTenItem");
//# sourceMappingURL=AcEnjoyNightTenItem.js.map