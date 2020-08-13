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
 * 定军中原出战门客item
 * author qianjun
 * date 2017/10/12
 */
var AcConquerMainLandServantVsItem = (function (_super) {
    __extends(AcConquerMainLandServantVsItem, _super);
    function AcConquerMainLandServantVsItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._numTxt = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandServantVsItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandServantVsItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandServantVsItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandServantVsItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandServantVsItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandServantVsItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerMainLandServantVsItem.prototype.initItem = function (index, data, itemparam) {
        // --时间与分数倍率。倍率为0的时间段为休战期
        // --startTime:开始时间
        // --endTime:结束时间
        // --buff:分数倍率：获得分数 = 位置分数 * 分数倍率
        var view = this;
        view._data = data;
        var servantinfo = Config.ServantCfg.getServantItemById(data.servantId);
        view._code = itemparam;
        view.width = 86;
        view.height = 86 + 5;
        var temW = 86;
        var iconBgBt = BaseLoadBitmap.create("servant_cardbg_" + data.clv);
        iconBgBt.x = 0;
        iconBgBt.y = 0;
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var iconBt = BaseLoadBitmap.create(data.skin && data.skin != "" ? "skin_half_" + data.skin : servantinfo.halfIcon);
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChild(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
    };
    AcConquerMainLandServantVsItem.prototype.refresh = function (func, object) {
        var view = this;
        //播放闪光
        var loopClip = ComponentManager.getCustomMovieClip("mainlandflash1-", 14, 70);
        loopClip.width = 175;
        loopClip.height = 173;
        loopClip.anchorOffsetX = loopClip.width / 2;
        loopClip.anchorOffsetY = loopClip.height / 2;
        loopClip.setScale(1.1);
        loopClip.x = 42;
        loopClip.y = 40;
        loopClip.setEndCallBack(function () {
            loopClip.dispose();
            loopClip = null;
            func.apply(object);
        }, view);
        loopClip.playWithTime(1);
        view.addChild(loopClip);
    };
    AcConquerMainLandServantVsItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcConquerMainLandServantVsItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcConquerMainLandServantVsItem.prototype.dispose = function () {
        var view = this;
        view.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandServantVsItem;
}(ScrollListItem));
__reflect(AcConquerMainLandServantVsItem.prototype, "AcConquerMainLandServantVsItem");
//# sourceMappingURL=AcConquerMainLandServantVsItem.js.map