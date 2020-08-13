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
* 奖池展示
* date 2020.6.1
* author ycg
* @name AcMouseComeDetailPopupViewTab3
*/
var AcMouseComeDetailPopupViewTab3 = (function (_super) {
    __extends(AcMouseComeDetailPopupViewTab3, _super);
    function AcMouseComeDetailPopupViewTab3(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMouseComeDetailPopupViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailPopupViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMouseComeDetailPopupViewTab3.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 695;
        bg.setPosition(26, 53);
        this.addChild(bg);
        var dataList = this.getDataList();
        var rect = new egret.Rectangle(0, 0, 530, 680);
        var scrollList = ComponentManager.getScrollList(AcMouseComeDetailScrollItem3, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
    };
    AcMouseComeDetailPopupViewTab3.prototype.getDataList = function () {
        var data = this.cfg.bigReward;
        var list = [];
        for (var i = 0; i < data.length; i++) {
            var tmpData = { id: i + 1, getReward: data[i].getReward, type: 1 };
            list.push(tmpData);
        }
        list.push({ id: list.length + 1, getReward: this.cfg.getPoolRewards(), type: 0 });
        return list;
    };
    AcMouseComeDetailPopupViewTab3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMouseComeDetailPopupViewTab3;
}(CommonViewTab));
__reflect(AcMouseComeDetailPopupViewTab3.prototype, "AcMouseComeDetailPopupViewTab3");
//# sourceMappingURL=AcMouseComeDetailPopupViewTab3.js.map