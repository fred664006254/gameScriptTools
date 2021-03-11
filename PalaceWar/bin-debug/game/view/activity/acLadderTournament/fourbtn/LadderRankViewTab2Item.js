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
var LadderRankViewTab2Item = (function (_super) {
    __extends(LadderRankViewTab2Item, _super);
    function LadderRankViewTab2Item() {
        return _super.call(this) || this;
    }
    LadderRankViewTab2Item.prototype.initItem = function (index, cfg, itemparam) {
        var icons = cfg.rewardIcons;
        //
        var itemBg = BaseBitmap.create("public_9_bg23");
        itemBg.width = 624;
        itemBg.height = 90 + 120 * Math.ceil(icons.length / 5);
        this.addChild(itemBg);
        var titleBg = BaseBitmap.create("ladder_ranktitle_bg");
        titleBg.width = itemBg.width;
        titleBg.height = 60;
        this.addChild(titleBg);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        line1.x = itemBg.width / 2 - line1.width / 2;
        line1.y = titleBg.y + titleBg.height / 2 - line1.height / 2;
        this.addChild(line1);
        var txt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        var rank = cfg.rank[0];
        // if (rank < 4)
        // {
        //     txt.text = LanguageManager.getlocal("acRank_rank6",[App.StringUtil.changeIntToCharText(rank)]);
        // }else
        // {
        if (cfg.rank[0] < cfg.rank[1]) {
            txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(cfg.rank[0]), String(cfg.rank[1])]);
        }
        else {
            txt.text = LanguageManager.getlocal("acRank_rank6", [cfg.rank[0].toString()]);
        }
        // }
        txt.x = itemBg.width / 2 - txt.width / 2;
        txt.y = titleBg.y + titleBg.height / 2 - txt.height / 2;
        this.addChild(txt);
        for (var i = 0; i < icons.length; i++) {
            var oneIcon = icons[i];
            oneIcon.setPosition(18 + i % 5 * 120, 80 + Math.floor(i / 5) * 120);
            this.addChild(oneIcon);
        }
    };
    return LadderRankViewTab2Item;
}(ScrollListItem));
__reflect(LadderRankViewTab2Item.prototype, "LadderRankViewTab2Item");
//# sourceMappingURL=LadderRankViewTab2Item.js.map