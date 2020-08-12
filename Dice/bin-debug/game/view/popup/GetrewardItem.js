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
var GetrewardItem = (function (_super) {
    __extends(GetrewardItem, _super);
    function GetrewardItem() {
        return _super.call(this) || this;
    }
    GetrewardItem.prototype.initItem = function (index, data) {
        var view = this;
        var islock = data.lock;
        view.width = 157;
        view.height = 178 + 10;
        var rewardVo = data;
        var bgid = 1;
        var scale = 0.75;
        var dy = 10;
        var x = 0;
        if (rewardVo.type == 100) {
            var cfg = Config.DiceCfg.getCfgById(rewardVo.id);
            if (cfg.quality == 4) {
                bgid = "4_1";
                scale = 1;
                dy = 0;
                x = -10;
            }
            else {
                bgid = cfg.quality;
            }
            // bgid = cfg.quality == 4 ? `4_1` : cfg.quality;
        }
        var bg = BaseBitmap.create("bird_item_bg_" + bgid);
        view.addChild(bg);
        bg.setScale(scale);
        bg.x = x;
        bg.y = dy;
        if (rewardVo.type == 1 || rewardVo.type == 2) {
            var rewardData = GameData.formatRewardItem(rewardVo.type == 1 ? "1_1_1" : "2_1_1")[0];
            var icon = GameData.getItemIcon(rewardData);
            view.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg, [0, dy]);
        }
        else {
            if (bgid === "4_1") {
                // 传奇鸟特效
                var clip_1 = ComponentMgr.getCustomMovieClip("guangxiao", 10);
                view.addChild(clip_1);
                clip_1.blendMode = egret.BlendMode.ADD;
                clip_1.setEndCallBack(function () {
                    clip_1.dispose();
                    clip_1 = null;
                }, view);
                clip_1.playWithTime(0);
                clip_1.setPosition(10, 0);
            }
            var diceicon = App.CommonUtil.getDiceIconById(rewardVo.id.toString(), 1);
            var shadow = diceicon.getChildByName("shadow");
            if (shadow) {
                shadow.visible = false;
            }
            // itemGroup.width = diceicon.width * diceicon.scaleX;
            // itemGroup.height =diceicon.height * diceicon.scaleY;
            if (bgid === "4_1") {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, diceicon, bg, [0, 30 - dy]);
            }
            else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, diceicon, bg, [0, 20 - dy]);
            }
            view.addChild(diceicon);
            if (Api.DiceVoApi.notOld(rewardVo.id.toString())) {
                var newState = BaseBitmap.create("dicenewget");
                newState.width = 55;
                newState.height = 56;
                newState.setPosition(-9, 4);
                this.addChild(newState);
            }
        }
        var numTxt = ComponentMgr.getTextField("x" + rewardVo.num, TextFieldConst.SIZE_CONTENT_COMMON);
        view.addChild(numTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, numTxt, bg, [10, 6]);
    };
    GetrewardItem.prototype.checkBounds = function () {
        return false;
    };
    GetrewardItem.prototype.getSpaceY = function () {
        return 0;
    };
    GetrewardItem.prototype.getSpaceX = function () {
        return 0;
    };
    GetrewardItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return GetrewardItem;
}(ScrollListItem));
__reflect(GetrewardItem.prototype, "GetrewardItem");
//# sourceMappingURL=GetrewardItem.js.map