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
var RewardItemScrollItem = (function (_super) {
    __extends(RewardItemScrollItem, _super);
    function RewardItemScrollItem() {
        return _super.call(this) || this;
    }
    RewardItemScrollItem.prototype.initItem = function (index, itemInfoVo, scale) {
        if (!scale) {
            scale = 1;
        }
        this.width = 108 * scale + 8;
        this.height = 108 * scale;
        if (itemInfoVo.type == 1) {
            var itemCfg = Config.ItemCfg.getItemCfgById(itemInfoVo.id);
            var iconItem = GameData.getItemIcon(itemCfg, true);
            iconItem.x = 4;
            iconItem.y = 4;
            iconItem.setScale(scale);
            this.addChild(iconItem);
        }
        else {
            var iconItem = GameData.getItemIcon(itemInfoVo, true);
            iconItem.setScale(scale);
            iconItem.x = iconItem.y = 5;
            this.addChild(iconItem);
        }
        if (itemInfoVo.id == Config.ZhenqifangCfg.needItem) {
            var clip = ComponentManager.getCustomMovieClip("zqfsaoguang", 7);
            clip.setEndFrameAndPlay(20);
            this.addChild(clip);
            clip.playWithTime(-1);
            clip.setScale(0.8);
            clip.x = -8;
            clip.y = -2;
        }
    };
    RewardItemScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    RewardItemScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    RewardItemScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return RewardItemScrollItem;
}(ScrollListItem));
__reflect(RewardItemScrollItem.prototype, "RewardItemScrollItem");
//# sourceMappingURL=RewardItemScrollItem.js.map