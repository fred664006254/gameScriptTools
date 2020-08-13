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
 * 新版升级皮肤item
 * author qianjun
 * @class WifeskinNewScrollItem
 */
var WifeSkinLevelItem = (function (_super) {
    __extends(WifeSkinLevelItem, _super);
    function WifeSkinLevelItem() {
        var _this = _super.call(this) || this;
        _this._bg = null;
        return _this;
    }
    WifeSkinLevelItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view.width = 614;
        view.height = 110;
        var unit = data;
        var skinId = data.skinId;
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var wifeid = skinCfg.wifeId;
        var skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
        var bg = BaseBitmap.create("wifeskinlevelitembg");
        view.addChild(bg);
        view._bg = bg;
        var stateflag = BaseBitmap.create("wifeskinlevelstate" + (skinLevel >= data.level ? 2 : 1));
        view.addChild(stateflag);
        var levelTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussServantLevel", [data.level]), 22, TextFieldConst.COLOR_BROWN);
        view.addChild(levelTxt);
        var str = "";
        // if(data.type == ``){
        //     let arr = view.dealAttrChangeInfo(skinId,data.level)[0];
        //     str = arr ? arr.text : ``;
        // }
        if (data.type != "") {
            var param = [];
            if (data.type == "scene") {
                param.push(LanguageManager.getlocal("wifeskinbgname" + skinId + "_" + unit.data.levelUpUnlock));
            }
            if (data.type == "avg") {
                param.push(LanguageManager.getlocal("wifeskin" + skinId + "_" + unit.data.levelUpUnlock));
            }
            if (data.type == "sound") {
                param.push(LanguageManager.getlocal("wifeskin" + skinId + "_" + unit.data.levelUpUnlock));
            }
            str = LanguageManager.getlocal("wifeskinget" + data.type, param);
        }
        var arr = view.dealAttrChangeInfo(skinId, data.level)[0];
        str += ("" + (str.length ? "\n" : "") + (arr ? arr.text : ""));
        var descTxt = ComponentManager.getTextField(str, 22, TextFieldConst.COLOR_BROWN);
        descTxt.lineSpacing = 7;
        view.addChild(descTxt);
        bg.height = descTxt.textHeight + 84;
        view.height = bg.height - 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, stateflag, bg, [15, -6]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelTxt, stateflag, [stateflag.width + 10, 45]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, levelTxt, [levelTxt.width + 35, 0]);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "wifeBattleMoreBtn", function () {
            var skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
            ViewController.getInstance().openView(ViewConst.POPUP.WIFESKINLEVELUPDETAILPOPUPVIEW, {
                icon: "wifeskinlevel" + unit.type + "icon",
                text: LanguageManager.getlocal("wifeskin" + skinId + "_" + unit.data.levelUpUnlock),
                data: unit,
                skinId: skinId,
                isnew: (skinLevel > itemparam) && (skinLevel >= unit.level) && (unit.level > skinLevel)
            });
            if (skinLevel > itemparam && (unit.level > itemparam)) {
                itemparam = unit.level;
            }
            isnew.visible = false;
        }, view); //.create(`wifeskinlevel${unit.type}icon`);
        view.addChild(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [40, 0]);
        // let iconTxt = ComponentManager.getTextField(LanguageManager.getlocal(`wifeskin${skinId}_${unit.data.levelUpUnlock}`), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconTxt, iconnamebg);
        // view.addChild(iconTxt);
        if (unit.level > (skinLevel + 1)) {
            var mask = BaseBitmap.create("public_9_viewmask");
            mask.width = view.width;
            mask.height = bg.height - 5;
            view.addChild(mask);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, mask, bg);
            var unlock = BaseBitmap.create("wifeskinlevelunlock");
            view.addChild(unlock);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, unlock, bg, [50, 0]);
            btn.visible = false;
        }
        else {
            btn.visible = unit.type != "";
            // view.showLevelEff();
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, levelbg,[Number(i) % 2 == 0?5:-5,0]);
        }
        if (skinLevel == (unit.level - 1)) {
            var light = BaseBitmap.create("public_9_bg57");
            light.width = bg.width + 10;
            light.height = bg.height + 14;
            light.setPosition(bg.x - 6, bg.y - 6);
            this.addChild(light);
            light.name = "light";
            // egret.Tween.get(light,{loop:true}).to({alpha:0},500).to({alpha:1},500);
        }
        if (9 == (unit.level - 1)) {
            view.height = bg.height + 13;
        }
        var isnew = BaseBitmap.create("wifeskinleveltip");
        isnew.setScale(0.5);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, isnew, bg);
        view.addChild(isnew);
        isnew.visible = false;
        if (isnew) {
            isnew.visible = (skinLevel > itemparam) && (skinLevel >= unit.level) && (unit.level > itemparam);
        }
    };
    WifeSkinLevelItem.prototype.showLevelEff = function (callback, callobj) {
        var view = this;
        var light = view.getChildByName("light");
        if (light) {
            light.visible = false;
        }
        var eff = ComponentManager.getCustomMovieClip("wifeskinlevelsuc", 15);
        eff.width = 640;
        eff.blendMode = egret.BlendMode.ADD;
        if (view.height) {
        }
        eff.height = 180 * (view._bg.height / 105); // Math.max(1, (Math.min(135,view.height - 13)/105));
        eff.playWithTime(1);
        view.addChild(eff);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff, view._bg, [0, 5], true);
        eff.setEndCallBack(function () {
            eff.dispose();
            eff = null;
            callback.apply(callobj);
        }, view);
    };
    //升级后新增属性
    WifeSkinLevelItem.prototype.dealAttrChangeInfo = function (skinId, lv) {
        if (lv === void 0) { lv = 0; }
        /**
         *  --levelUpCost  升级消耗
        --levelUpUnlock  升级解锁  解锁语音ID，解锁剧情ID，解锁背景ID  解锁剧情
        --levelUpAim  升级加成目标：   1：加成门客   2：加成红颜
        --levelUpAimId  门客ID  红颜ID
        --levelUpType  1:武力固定值 2：智力固定值 3：政治固定值 4：魅力固定值  5:武力百分比 6：智力百分比 7：政治百分比 8：魅力百分比  9：红颜亲密度  10：红颜魅力值  11:全属性固定值  12.全属性百分比
        --levelUpEffect  加成效果具体值
         *  */
        var resultStr = [];
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var levelup = skinCfg.levelUp;
        var unit = levelup[lv - 1];
        if (unit) {
            var sid = unit.levelUpAimId;
            var cfg = unit.levelUpAim == 1 ? Config.ServantCfg.getServantItemById(sid) : Config.WifeCfg.getWifeCfgById(sid);
            if (unit.levelUpEffect > 1) {
                resultStr.push({
                    text: LanguageManager.getlocal("wifeskinlevelupAdd" + unit.levelUpType, [cfg.name, String(TextFieldConst.COLOR_WARN_GREEN2), unit.levelUpEffect]),
                    type: unit.levelUpType
                });
            }
            else {
                resultStr.push({
                    text: LanguageManager.getlocal("wifeskinlevelupAdd" + unit.levelUpType, [cfg.name, String(TextFieldConst.COLOR_WARN_GREEN2), (unit.levelUpEffect * 100).toFixed(0) + "%"]),
                    type: unit.levelUpType
                });
            }
        }
        // let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
        resultStr = resultStr.reverse();
        return resultStr;
    };
    WifeSkinLevelItem.prototype.getSpaceX = function () {
        return 0;
    };
    WifeSkinLevelItem.prototype.getSpaceY = function () {
        return -5;
    };
    WifeSkinLevelItem.prototype.dispose = function () {
        this._bg = null;
        _super.prototype.dispose.call(this);
    };
    return WifeSkinLevelItem;
}(ScrollListItem));
__reflect(WifeSkinLevelItem.prototype, "WifeSkinLevelItem");
//# sourceMappingURL=WifeSkinLevelItem.js.map