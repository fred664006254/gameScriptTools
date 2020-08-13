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
 * desc:区服排行榜单item
*/
var AcConquerMainLandRoundItem = (function (_super) {
    __extends(AcConquerMainLandRoundItem, _super);
    function AcConquerMainLandRoundItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandRoundItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandRoundItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandRoundItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandRoundItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandRoundItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandRoundItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerMainLandRoundItem.prototype.initItem = function (index, data, itemparam) {
        // --时间与分数倍率。倍率为0的时间段为休战期
        // --startTime:开始时间
        // --endTime:结束时间
        // --buff:分数倍率：获得分数 = 位置分数 * 分数倍率
        var view = this;
        view._code = itemparam;
        view.width = 580;
        view.height = 24;
        var code = view.getUiCode();
        var status = '';
        var color = null;
        var nowday = view.vo.getNowDay();
        var startTime = view.vo.st + 2 * 3600 + Number(data.day - 1) * 86400 + data.startTime;
        var endTime = view.vo.st + 2 * 3600 + Number(data.day - 1) * 86400 + data.endTime;
        if (nowday == data.day) {
            var time = 1;
            if (GameData.serverTime < startTime) {
                time = 2;
                color = TextFieldConst.COLOR_BLACK;
            }
            else if (GameData.serverTime >= endTime) {
                time = 1;
                color = 0x606060;
            }
            else {
                time = 3;
                color = 0xff5a5a;
                //交战动画
                var effectClip = ComponentManager.getCustomMovieClip("mainlandinfight" + code + "-", 10, 70);
                effectClip.width = 125;
                effectClip.height = 154;
                view.addChild(effectClip);
                effectClip.playWithTime(-1);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, effectClip, view, [-30, -68]);
            }
            status = LanguageManager.getlocal("acConquerMainLandtimetip" + time + "-" + code);
        }
        else {
            color = nowday < data.day ? TextFieldConst.COLOR_BLACK : 0x606060;
            status = LanguageManager.getlocal("acConquerMainLandtimetip" + (nowday > data.day ? 1 : 2) + "-" + code);
        }
        var pos = data.pos[0];
        var rankTxt = ComponentManager.getTextField("", 18, color);
        rankTxt.text = String(index + 1);
        rankTxt.x = pos.x + (pos.width - rankTxt.textWidth) / 2 - 12.5;
        rankTxt.y = 0;
        view.addChild(rankTxt);
        pos = data.pos[1];
        var str = App.DateUtil.getFormatBySecond(startTime, 15) + "-" + App.DateUtil.getFormatBySecond(endTime, 15) + "\uFF08" + status + "\uFF09";
        if (PlatformManager.checkIsEnLang()) {
            var stStr = App.DateUtil.getFormatBySecond(startTime, 15);
            var etStr = App.DateUtil.getFormatBySecond(endTime, 15);
            str = stStr.replace("-", "/") + "-" + etStr.replace("-", "/") + " (" + status + ") ";
        }
        var serverTxt = ComponentManager.getTextField(str, 18, color);
        serverTxt.x = 90; //pos.x + (pos.width - serverTxt.textWidth) / 2 - 12.5;//GameConfig.stageWidth/2 - serverTxt.textWidth/2;
        serverTxt.y = 0;
        view.addChild(serverTxt);
        pos = data.pos[2];
        var scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandrationum-" + code, [data.buff.toFixed(1)]), 18, color);
        scoreTxt.x = pos.x + (pos.width - scoreTxt.textWidth) / 2 - 12.5;
        ; //GameConfig.stageWidth/2 + 155 - scoreTxt.textWidth/2;
        scoreTxt.y = 0;
        view.addChild(scoreTxt);
        // this.addTouchTap(this.rankClick, this);
    };
    AcConquerMainLandRoundItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandRoundItem;
}(ScrollListItem));
__reflect(AcConquerMainLandRoundItem.prototype, "AcConquerMainLandRoundItem");
//# sourceMappingURL=AcConquerMainLandRoundItem.js.map