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
 * 帝位称号 tab2
 * date 2019.12.10
 * author ycg
 * @class EmperorAchieveViewTab1
 */
var EmperorAchieveViewTab2 = (function (_super) {
    __extends(EmperorAchieveViewTab2, _super);
    function EmperorAchieveViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    EmperorAchieveViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD, this.refreshView, this);
        this.height = 650;
        this.width = 532;
        var data = Config.EmperorachieveCfg.getKing1CfgList();
        var rect = new egret.Rectangle(0, 0, this.width, this.height - 15);
        var scrollList = ComponentManager.getScrollList(EmperorAchieveViewScrollItem, data, rect, { type: 1 });
        scrollList.setPosition(0, 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        // let scorIndex = Api.emperorAchieveVoApi.getCurrKingAchieveId(1);
        // App.LogUtil.log("scrollindex: "+scorIndex);
        // if (scorIndex > 0){
        //     scrollList.setScrollTopByIndex(scorIndex, 500);
        // }
    };
    EmperorAchieveViewTab2.prototype.refreshView = function (evt) {
        if (this._scrollList) {
            var data = Config.EmperorachieveCfg.getKing1CfgList();
            this._scrollList.refreshData(data, { type: 1 });
        }
    };
    EmperorAchieveViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD, this.refreshView, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorAchieveViewTab2;
}(AcCommonViewTab));
__reflect(EmperorAchieveViewTab2.prototype, "EmperorAchieveViewTab2");
//# sourceMappingURL=EmperorAchieveViewTab2.js.map