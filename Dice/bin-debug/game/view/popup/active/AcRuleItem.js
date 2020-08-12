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
var AcRuleItem = (function (_super) {
    __extends(AcRuleItem, _super);
    // need dispose var start
    // need dispose end
    function AcRuleItem() {
        return _super.call(this) || this;
    }
    AcRuleItem.prototype.initItem = function (index, data, itemParam) {
        var idx = data.index;
        var key = data.acKey;
        var bg = BaseBitmap.create("public_info_item_bg");
        this.addChild(bg);
        var icon = BaseLoadBitmap.create(key + "_icon" + idx);
        this.addChild(icon);
        icon.setPosition(24, 47);
        var title = ComponentMgr.getTextField('11', TextFieldConst.SIZE_24, ColorEnums.white);
        this.addChild(title);
        title.strokeColor = 0x7B2A0E;
        title.text = LangMger.getlocal(key + "tip_title" + idx);
        title.setPosition(153, 25);
        var desstr = "";
        if (idx == 2) {
            var tem = Config.FairarenaCfg.getDiceCrip() + "00%";
            desstr = LangMger.getlocal(key + "tip_des" + idx, [tem]);
        }
        else {
            desstr = LangMger.getlocal(key + "tip_des" + idx);
        }
        var des = ComponentMgr.getTextField('11', TextFieldConst.SIZE_20, ColorEnums.white);
        this.addChild(des);
        des.strokeColor = 0;
        des.lineSpacing = 3;
        des.text = desstr;
        des.width = 335;
        des.x = title.x;
        des.y = title.y + title.height + 28;
    };
    /**
     * 不同格子X间距
     */
    AcRuleItem.prototype.getSpaceX = function () {
        return _super.prototype.getSpaceX.call(this);
    };
    /**
     * 不同格子Y间距
     */
    AcRuleItem.prototype.getSpaceY = function () {
        return _super.prototype.getSpaceY.call(this);
    };
    AcRuleItem.prototype.dispose = function () {
        // dispose start
        // dispose end
        _super.prototype.dispose.call(this);
    };
    return AcRuleItem;
}(ScrollListItem));
__reflect(AcRuleItem.prototype, "AcRuleItem");
//# sourceMappingURL=AcRuleItem.js.map