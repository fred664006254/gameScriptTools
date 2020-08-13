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
 * 门客选择
 * author qianjun
 * date 2017/9/28
 */
var ZhenqifangBuildLevelItem = (function (_super) {
    __extends(ZhenqifangBuildLevelItem, _super);
    // 属性文本
    function ZhenqifangBuildLevelItem() {
        return _super.call(this) || this;
    }
    ZhenqifangBuildLevelItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = 500;
        view.height = 125 + 5;
        var cfg = Config.ZhenqifangCfg.getTaskHouseCfgByLevel(index + 1);
        // --needExp:需要经验值升级至下一级
        // --taskSlotIndiv:任务槽最大数量-个人
        // --taskSlotFid:好友任务，每日刷新数量
        // --ratio:个人任务刷新任务概率，品质由低到高（DCBAS）。
        var bg = BaseBitmap.create("public_9_bg44");
        bg.width = view.width;
        bg.height = view.height - 5;
        view.addChild(bg);
        var bg1 = BaseBitmap.create("rankactivenamebg");
        bg1.rotation = -90;
        bg1.setScale(0.65);
        bg1.x = 0;
        bg1.y = 40;
        view.addChild(bg1);
        var levelTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_lv", [(index + 1).toString()]), 20);
        levelTxt.x = bg.x + (100 - levelTxt.width) / 2;
        levelTxt.y = bg.y + 10;
        view.addChild(levelTxt);
        //英 泰 俄 葡
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
            bg1.visible = false;
            levelTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            levelTxt.x = 30;
            levelTxt.y = 10;
        }
        var param = [];
        var levelarr = ['D', 'C', 'B', 'A', 'S'];
        var colorarr = [
            TextFieldConst.COLOR_QUALITY_WHITE,
            TextFieldConst.COLOR_QUALITY_GREEN,
            TextFieldConst.COLOR_QUALITY_BLUE,
            TextFieldConst.COLOR_QUALITY_PURPLE,
            TextFieldConst.COLOR_QUALITY_ORANGE
        ];
        var str = "";
        for (var i in cfg.ratio) {
            if (cfg.ratio[i]) {
                str += LanguageManager.getlocal("servant_lv", ["<font color=" + colorarr[i] + ">" + levelarr[i] + "</font>"]) + ("" + ((Number(i) == cfg.ratio.length - 1 || (cfg.ratio[Number(i) + 1] == 0)) ? "" : "\uFF0C"));
            }
        }
        var tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangbuildtip1", [str]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt1, bg, [15, 40]);
        view.addChild(tipTxt1);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangbuildtip2", [cfg.taskSlotIndiv]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt2, tipTxt1, [0, tipTxt1.textHeight + 5]);
        view.addChild(tipTxt2);
        var tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangbuildtip5", [cfg.taskSlotFid]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt3, tipTxt2, [0, tipTxt2.textHeight + 5]);
        view.addChild(tipTxt3);
        // let tipTxt4= ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangbuildtip5`, [cfg.taskSlotFid]), 20);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt4, tipTxt3, [0,tipTxt3.textHeight+5]);
        // view.addChild(tipTxt4);
        var curlevel = Api.zhenqifangVoApi.ZhenqifangLevel;
        if (index + 1 <= curlevel) {
            var flag = BaseBitmap.create(index + 1 == curlevel ? "zqffinished2" : "zqffinished");
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, flag, bg, [-2, -3]);
            view.addChild(flag);
            if (index + 1 == curlevel) {
                var selectbg = BaseBitmap.create("zqfselected");
                selectbg.width = bg.width + 20;
                selectbg.height = bg.height + 20;
                view.addChild(selectbg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, bg);
            }
        }
        if (curlevel == index + 1) {
            view.height = 185;
            var line = BaseBitmap.create("battlepassline-1");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0, bg.height + 10]);
            view.addChild(line);
        }
    };
    Object.defineProperty(ZhenqifangBuildLevelItem.prototype, "api", {
        get: function () {
            return Api.zhenqifangVoApi;
        },
        enumerable: true,
        configurable: true
    });
    ZhenqifangBuildLevelItem.prototype.getSpaceX = function () {
        return 0;
    };
    ZhenqifangBuildLevelItem.prototype.getSpaceY = function () {
        return 0;
    };
    ZhenqifangBuildLevelItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangBuildLevelItem;
}(ScrollListItem));
__reflect(ZhenqifangBuildLevelItem.prototype, "ZhenqifangBuildLevelItem");
//# sourceMappingURL=ZhenqifangBuildLevelItem.js.map