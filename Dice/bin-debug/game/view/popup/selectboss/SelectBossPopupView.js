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
 * 选择boss
 * author qianjun
 */
var SelectBossPopupView = (function (_super) {
    __extends(SelectBossPopupView, _super);
    function SelectBossPopupView() {
        return _super.call(this) || this;
    }
    // 打开该面板时，需要传参数msg
    SelectBossPopupView.prototype.initView = function () {
        var _this = this;
        App.MsgHelper.addEvt(MsgConst.BT_HIDE_SELECTBOSS, this.closeHandler, this);
        var view = this;
        SoundMgr.playEffect("effect_random_boss");
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var bottombg = BaseBitmap.create("selectbossbottombg");
        view.addChild(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bottombg, view);
        var top = BaseBitmap.create("selectbossbg");
        view.addChild(top);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, top, bottombg, [0, 280]);
        var randTxtImg = BaseBitmap.create("selectrandomboss");
        view.addChild(randTxtImg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, randTxtImg, top);
        var namebg = BaseBitmap.create("selectbossnamebg");
        view.addChild(namebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, bottombg, [0, bottombg.height - namebg.height / 2]);
        namebg.alpha = 0;
        var selectboss = view.param.data.id;
        var nametxt = ComponentMgr.getTextField(LangMger.getlocal("monster_boss_name_" + selectboss), TextFieldConst.SIZE_38);
        view.addChild(nametxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, namebg, [0, 4]);
        nametxt.alpha = 0;
        // let loopclip = ComponentMgr.getCustomMovieClip(`bossselectloop`, null, 70);
        // loopclip.anchorOffsetX = 400 / 2;
        // loopclip.anchorOffsetY = 400 / 2;
        // view.addChild(loopclip);
        // loopclip.alpha = 0;
        // clip.setScale(0);
        var bossKey = Config.MonsterCfg.getBossKeys();
        var arr = ["1001", "1002", "1003", "1004", "1001", "1002", "1003", "1004", "1001", "1002", "1003", "1004"];
        var scrollist = ComponentMgr.getScrollList(SelectBossItem, arr, new egret.Rectangle(0, 0, 213 * arr.length, 168), null, arr.length); //213*arr.length
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scrollist, bottombg, [0, -scrollist.height / 2 - 20]);
        view.addChild(scrollist);
        scrollist.verticalScrollPolicy = "off";
        scrollist.horizontalScrollPolicy = "on";
        scrollist.bounces = false;
        scrollist.touchChildren = false;
        scrollist.touchEnabled = false;
        scrollist.scrollLeft = 0;
        var clip = ComponentMgr.getCustomMovieClip("bossselectstart", null, 70);
        clip.anchorOffsetX = 400 / 2;
        clip.anchorOffsetY = 400 / 2;
        view.addChild(clip);
        clip.setEndCallBack(function () {
            if (_this.param.data.isFrist) {
                egret.Tween.get(clip).to({ alpha: 0 }, 500);
            }
            else {
                clip.dispose();
                clip = null;
                _this.closeHandler();
                // loopclip.alpha = 1;
                // loopclip.playWithTime(-1);
            }
        }, view);
        clip.x = 320;
        clip.y = scrollist.y + 20;
        // if(true){
        // }
        var selectid = 1 * bossKey.length + arr.indexOf(selectboss);
        // scrollist.setScrollLeftByIndex(selectid, 4000),
        egret.Tween.get(scrollist).wait(100).to({ scrollLeft: (selectid - 1) * 213 + 5 }, 1500, egret.Ease.circOut).call(function () {
            var item = scrollist.getItemByIndex(selectid);
            item.showSelect();
            // loopclip.setStopFrame(1);
            // loopclip.alpha = 0.5;
            egret.Tween.get(clip).wait(400).call(function () {
                clip.alpha = 1;
                clip.playWithTime(1);
                egret.Tween.removeTweens(clip);
            }, view);
            egret.Tween.get(namebg).to({ alpha: 1 }, 300).call(function () {
                egret.Tween.removeTweens(namebg);
            }, view);
            egret.Tween.get(nametxt).to({ alpha: 1 }, 300).call(function () {
                egret.Tween.removeTweens(nametxt);
            }, view);
        }, view);
        // scrollist.setScrollLeft((selectid - 1) * 213, 3000, egret.Ease.circOut);
        // egret.Tween.get()
        // let bossid = view.param.data.id;
    };
    SelectBossPopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    SelectBossPopupView.prototype.getBgName = function () {
        return null;
    };
    SelectBossPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    SelectBossPopupView.prototype.getTitleStr = function () {
        return null;
    };
    SelectBossPopupView.prototype.getCloseBtnName = function () {
        return null; //this.param.data.needClose === 1 ? 
    };
    SelectBossPopupView.prototype.closeHandler = function () {
        var param = this.param;
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    SelectBossPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    SelectBossPopupView.prototype.getResourceList = function () {
        return [];
    };
    SelectBossPopupView.prototype.dispose = function () {
        App.MsgHelper.removeEvt(MsgConst.BT_HIDE_SELECTBOSS, this.closeHandler, this);
        _super.prototype.dispose.call(this);
    };
    return SelectBossPopupView;
}(PopupView));
__reflect(SelectBossPopupView.prototype, "SelectBossPopupView");
//# sourceMappingURL=SelectBossPopupView.js.map