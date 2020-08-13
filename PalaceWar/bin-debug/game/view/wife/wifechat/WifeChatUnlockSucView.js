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
 * author:qianjun
 * desc:解锁新物品界面
*/
var WifeChatUnlockSucView = (function (_super) {
    __extends(WifeChatUnlockSucView, _super);
    function WifeChatUnlockSucView() {
        return _super.call(this) || this;
    }
    WifeChatUnlockSucView.prototype.getResourceList = function () {
        var arr1 = ["wifechatend"];
        var arr2 = ["wifeskingetline", "wifeskinunlockavg", "wifeskinunlockscene", "wifeskinunlocksound", "wifeskinlevelsceneicon", "wifeskinlevelsoundicon", "wifeskinlevelavgicon", "specialview_effect_boomlight", "specialvieweffect1"];
        return _super.prototype.getResourceList.call(this).concat(this.param.data.end ? arr1 : arr2);
    };
    WifeChatUnlockSucView.prototype.getBgName = function () {
        return null;
    };
    WifeChatUnlockSucView.prototype.getCloseBtnName = function () {
        return null;
    };
    WifeChatUnlockSucView.prototype.isTouchMaskClose = function () {
        return true;
    };
    WifeChatUnlockSucView.prototype.initView = function () {
        var _this = this;
        var view = this;
        if (view.param.data.end) {
            var icon = BaseBitmap.create("wifechatend");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, view);
            view.addChild(icon);
        }
        else {
            var skinId = view.param.data.skinId;
            var level = view.param.data.level;
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            var unit = skinCfg.levelUp[level - 1];
            if (unit && unit.levelUpUnlock) {
                var tmp = String(unit.levelUpUnlock).split("_");
                //剧情、配音、背景
                var type = "";
                if (tmp.length == 1) {
                    //背景
                    type = "scene";
                }
                else {
                    var id = Number(tmp[1]);
                    if (id < 200) {
                        //剧情
                        type = "avg";
                    }
                    else if (id < 300) {
                        //有开关
                        if (Api.switchVoApi.checkWifeSkinSoundOpen(skinId)) {
                            //配音
                            type = "sound";
                        }
                    }
                }
                var icon_1 = BaseBitmap.create("wifeskinlevel" + type + "icon");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon_1, view);
                var txt_1 = BaseBitmap.create("wifeskinunlock" + type);
                txt_1.anchorOffsetX = txt_1.width / 2;
                txt_1.anchorOffsetY = txt_1.height / 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt_1, icon_1, [0, -10]);
                var line = BaseBitmap.create("wifeskingetline");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, icon_1);
                view.addChild(line);
                view.addChild(icon_1);
                view.addChild(txt_1);
                if (App.CommonUtil.check_dragon()) {
                    line.alpha = icon_1.alpha = txt_1.alpha = 0;
                    view._maskBmp.alpha = 0;
                    /**
                     * 压暗背景，0~0.7纯黑，用时0.3秒
                        开始播放获得标头龙骨动画，0.4秒后图标alpha值0~1用时0.24秒，标头砸下600%~80%~100%用时0~0.12~0.15秒
                    */
                    var beltDragonBones_1 = App.DragonBonesUtil.getLoadDragonBones("specialgetreward_belt");
                    view.addChildAt(beltDragonBones_1, 1);
                    beltDragonBones_1.alpha = 0;
                    beltDragonBones_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function (event) {
                        if (event.animationName == "open" && beltDragonBones_1) {
                            beltDragonBones_1.playDragonMovie('idle', 0);
                        }
                    }, this);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, beltDragonBones_1, line, [-20, 80]);
                    var moveClip_1 = ComponentManager.getCustomMovieClip("specialvieweffect", 10, 70);
                    var moveClipBM = BaseBitmap.create("specialvieweffect1");
                    moveClip_1.width = moveClipBM.width;
                    moveClip_1.height = moveClipBM.height;
                    moveClip_1.scaleX = 1.15;
                    moveClip_1.scaleY = 1.2;
                    this.addChildAt(moveClip_1, 2);
                    moveClip_1.playWithTime(-1);
                    moveClip_1.setVisible(false);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, moveClip_1, line);
                    var boomlight_1 = BaseBitmap.create("specialview_effect_boomlight");
                    boomlight_1.anchorOffsetX = boomlight_1.width / 2;
                    boomlight_1.anchorOffsetY = boomlight_1.height / 2;
                    view.addChild(boomlight_1);
                    boomlight_1.blendMode = egret.BlendMode.ADD;
                    boomlight_1.alpha = 0;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boomlight_1, icon_1);
                    egret.Tween.get(view._maskBmp).to({ alpha: 0.7 }, 300).call(function () {
                        egret.Tween.removeTweens(view._maskBmp);
                        beltDragonBones_1.alpha = 1;
                        beltDragonBones_1.playDragonMovie("open", 1);
                        egret.Tween.get(icon_1).wait(400).call(function () {
                            moveClip_1.setVisible(true);
                        }, view).to({ alpha: 1 }, 240).call(function () {
                            egret.Tween.removeTweens(icon_1);
                        }, view);
                        boomlight_1.setScale(1.3);
                        egret.Tween.get(boomlight_1).wait(400).set({ alpha: 1 }).to({ scaleX: 0.3, scaleY: 0.3 }, 170).to({ scaleX: 0.15, scaleY: 0 }, 330).call(function () {
                            egret.Tween.removeTweens(boomlight_1);
                            txt_1.setScale(6);
                            txt_1.alpha = 1;
                            egret.Tween.get(txt_1).to({ scaleX: 0.8, scaleY: 0.8 }, 120).to({ scaleX: 1, scaleY: 1 }, 150).call(function () {
                                egret.Tween.removeTweens(txt_1);
                            }, _this);
                        }, _this);
                    }, view);
                }
                else {
                }
            }
        }
    };
    WifeChatUnlockSucView.prototype.getShowWidth = function () {
        return 627;
    };
    WifeChatUnlockSucView.prototype.getShowHeight = function () {
        return 577;
    };
    WifeChatUnlockSucView.prototype.getTitleStr = function () {
        return null;
    };
    WifeChatUnlockSucView.prototype.dispose = function () {
        var view = this;
        var param = this.param;
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler);
        }
        _super.prototype.dispose.call(this);
    };
    return WifeChatUnlockSucView;
}(PopupView));
__reflect(WifeChatUnlockSucView.prototype, "WifeChatUnlockSucView");
//# sourceMappingURL=WifeChatUnlockSucView.js.map