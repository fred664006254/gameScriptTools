/**
 * 新手引导api
 * author shaoliang
 * date 2017/9/26
 * @class RookieVoApi
 */
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
var RookieVoApi = (function (_super) {
    __extends(RookieVoApi, _super);
    function RookieVoApi() {
        var _this = _super.call(this) || this;
        _this.isGuiding = false;
        _this.isInGuiding = false;
        _this._waitingGuide = [];
        //下一次引导框的Y
        _this.waitingPosY = null;
        //当前引导
        _this.curGuideKey = null;
        _this.curIndex = 1;
        _this.guideId = 1;
        return _this;
    }
    RookieVoApi.prototype.getIsGuiding = function () {
        return this.isGuiding;
    };
    // public set isGuiding(v:boolean)
    // {
    // 	this._isGuiding = v;
    // }
    /**
     * @param t 等待引导信息 {"idx":引导ID  , "f": 回调方法 , "o": 回调对象}
     */
    RookieVoApi.prototype.insertWaitingGuide = function (t, isRemove) {
        this._waitingGuide.push(t);
        if (isRemove) {
            this._waitingGuide = [t];
        }
        if (t.idx == "zhenqifang_1") {
            var posx = GameConfig.stageWidth - 152 + 3;
            if (Api.switchVoApi.checkOpenChangeBg() && Config.SceneCfg.isSceneMulti()) {
                posx -= 76;
            }
            if (Api.switchVoApi.checkOpenHousekeeper()) {
                posx -= 76;
            }
            RookieCfg.rookieCfg["zhenqifang_3"].clickRect.x = posx;
            RookieCfg.rookieCfg["zhenqifang_3"].clickRect.y = GameConfig.stageHeigth - 117 - 38 - 80;
            RookieCfg.rookieCfg["zhenqifang_3"].handPos.x = RookieCfg.rookieCfg["zhenqifang_3"].clickRect.x + 50;
            RookieCfg.rookieCfg["zhenqifang_3"].handPos.y = GameConfig.stageHeigth - 117 - 38 - 50;
            if (Api.switchVoApi.checkOpenHouseBtnUp()) {
                RookieCfg.rookieCfg["zhenqifang_3"].clickRect.x = GameConfig.stageWidth - 275;
                RookieCfg.rookieCfg["zhenqifang_3"].clickRect.y = GameConfig.stageHeigth - 117 - 38 - 80 - 140;
                RookieCfg.rookieCfg["zhenqifang_3"].handPos.x = RookieCfg.rookieCfg["zhenqifang_3"].clickRect.x + 50;
                RookieCfg.rookieCfg["zhenqifang_3"].handPos.y = GameConfig.stageHeigth - 117 - 38 - 50 - 140;
            }
        }
    };
    RookieVoApi.prototype.removeWaitingGuide = function () {
        this._waitingGuide.length = 0;
    };
    RookieVoApi.prototype.checkWaitingGuide = function () {
        if (this._waitingGuide.length > 0) {
            var a = this._waitingGuide.shift();
            if (a.idx == "atkrace_1" || a.idx == "search_1") {
                ViewController.getInstance().hideAllView();
            }
            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, a);
        }
    };
    /**
     *  检测是否需要走下一步
     */
    RookieVoApi.prototype.checkNextStep = function () {
        if (this.isGuiding) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP);
        }
    };
    RookieVoApi.prototype.showRookieView = function () {
        if (this.isGuiding) {
            ViewController.getInstance().getView(ViewConst.BASE.ROOKIEVIEW).visible = true;
        }
    };
    RookieVoApi.prototype.hiddenRookieView = function () {
        if (this.isGuiding) {
            ViewController.getInstance().getView(ViewConst.BASE.ROOKIEVIEW).visible = false;
        }
    };
    RookieVoApi.prototype.isEnRookie = function () {
        if (PlatformManager.checkIsEnLang() && this.isInGuiding == true) {
            return true;
        }
        return false;
        // return true;
    };
    RookieVoApi.prototype.isEnLang = function () {
        // return true;
        return PlatformManager.checkIsEnLang();
    };
    RookieVoApi.prototype.dispose = function () {
        this.isGuiding = false;
        this.isInGuiding = false;
        this._waitingGuide.length = 0;
        this.curStep = null;
        this.curIndex = 1;
        this.guideId = 1;
        this.waitingPosY = null;
        this.curGuideKey = null;
        _super.prototype.dispose.call(this);
    };
    return RookieVoApi;
}(BaseVoApi));
__reflect(RookieVoApi.prototype, "RookieVoApi");
//# sourceMappingURL=RookieVoApi.js.map