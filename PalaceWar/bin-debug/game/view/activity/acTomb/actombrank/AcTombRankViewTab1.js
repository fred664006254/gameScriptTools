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
//
var AcTombRankViewTab1 = (function (_super) {
    __extends(AcTombRankViewTab1, _super);
    function AcTombRankViewTab1(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcTombRankViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRankViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRankViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRankViewTab1.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRankViewTab1.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombRankViewTab1.prototype.getListType = function () {
        return 1;
    };
    AcTombRankViewTab1.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        // let rankList = [{
        // 	uid : 1,
        // 	name : "aad",
        // 	value : 12
        // }];
        // if(this._acData.rankArr)
        // {
        //     for(let i in this._acData.rankArr){
        //         rankList.push(this._acData.rankArr[i]);
        //     }
        // }
        var rankList = [];
        var rankInfo = view.vo.getRankInfo();
        if (rankInfo.rankList && rankInfo.rankList.length) {
            rankList = rankInfo.rankList;
            // for(let i in view.vo.getRankInfo().rankList){
            // 	let unit = view.vo.getRankInfo().rankList[i];
            // 	rankList.push({
            // 		uid : unit.uid,
            // 		name : unit.name,
            // 		score : unit.score
            // 	});
            // }
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, 500);
        var scrollList = ComponentManager.getScrollList(AcTombRankScrollItem, rankList, rect2);
        scrollList.x = 21;
        scrollList.y = 90;
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcTombRankViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcTombRankViewTab1;
}(CommonViewTab));
__reflect(AcTombRankViewTab1.prototype, "AcTombRankViewTab1");
//# sourceMappingURL=AcTombRankViewTab1.js.map