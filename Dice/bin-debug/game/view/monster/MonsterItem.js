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
var MonsterItem = (function (_super) {
    __extends(MonsterItem, _super);
    // need dispose var start
    // need dispose end
    function MonsterItem() {
        return _super.call(this) || this;
    }
    MonsterItem.prototype.initItem = function (index, data, itemParam) {
        var bossKey = data;
        var bg = BaseBitmap.create("public_info_item_bg");
        this.addChild(bg);
        // bg.width = 504;
        // bg.height = 152;
        bg.x = 0;
        bg.y = 13;
        var bossIconBg = BaseBitmap.create("boss_info_icon_bg");
        // this.addChild(bossIconBg);
        bossIconBg.x = 7;
        bossIconBg.y = bg.y + 22;
        var bossIcon = BaseLoadBitmap.create("boss_icon_" + bossKey);
        bossIcon.setScale(0.50);
        this.addChild(bossIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bossIcon, bossIconBg, [0, 0]);
        var beizhen = BaseBitmap.create("boss_info_biezhen_icon");
        this.addChild(beizhen);
        beizhen.x = 12;
        beizhen.y = 0;
        var title = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.white);
        this.addChild(title);
        title.text = LangMger.getlocal("monster_boss_name_" + bossKey);
        title.x = bossIcon.x + bossIcon.width * bossIcon.scaleX + 20;
        title.y = bg.y + 32;
        var des = ComponentMgr.getTextField('11', TextFieldConst.SIZE_20, 0xCFDEFF);
        this.addChild(des);
        des.width = 300; // bg.width - bossIcon.width * bossIcon.scaleX - 20;
        des.stroke = 1.5;
        des.lineSpacing = 5;
        if (PlatMgr.checkIsEnLang()) {
            des.wordWrap = true;
        }
        else {
            des.wordWrap = false;
        }
        des.text = LangMger.getlocal("monster_boss_des_" + bossKey); //bossKey
        des.x = title.x;
        des.y = title.y + title.height + 26;
    };
    /**
     * 不同格子X间距
     */
    MonsterItem.prototype.getSpaceX = function () {
        return _super.prototype.getSpaceX.call(this);
    };
    /**
     * 不同格子Y间距
     */
    MonsterItem.prototype.getSpaceY = function () {
        return _super.prototype.getSpaceY.call(this);
    };
    MonsterItem.prototype.dispose = function () {
        // dispose start
        // dispose end
        _super.prototype.dispose.call(this);
    };
    return MonsterItem;
}(ScrollListItem));
__reflect(MonsterItem.prototype, "MonsterItem");
//# sourceMappingURL=MonsterItem.js.map