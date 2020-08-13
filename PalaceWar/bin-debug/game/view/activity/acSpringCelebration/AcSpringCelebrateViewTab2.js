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
var AcSpringCelebrateViewTab2 = (function (_super) {
    __extends(AcSpringCelebrateViewTab2, _super);
    function AcSpringCelebrateViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._rechargeArr = null;
        _this.initView();
        return _this;
    }
    AcSpringCelebrateViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB, this.update, this);
        var bottomBg = BaseBitmap.create("public_9_bg43");
        bottomBg.width = 625;
        bottomBg.height = GameConfig.stageHeigth - 410;
        bottomBg.x = 5;
        bottomBg.y = -220;
        this.addChild(bottomBg);
        var springVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        var rechargeArr = springVo.getArr("exchange");
        rechargeArr = this.updataArr(rechargeArr);
        this._rechargeArr = rechargeArr;
        var tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 430);
        var scrollList = ComponentManager.getScrollList(Celebration2ScrollItem, rechargeArr, tmpRect);
        scrollList.setPosition(20, -210);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcSpringCelebrateViewTab2.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (!springCelebrateVo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        for (var i = 0; i < arr.length; i++) {
            var exchangeNum = springCelebrateVo.getExchangeNum(arr[i].key);
            if (exchangeNum == arr[i].limit) {
                arr1.push(arr[i]);
            }
            else {
                arr2.push(arr[i]);
            }
        }
        return arr2.concat(arr1);
    };
    AcSpringCelebrateViewTab2.prototype.update = function () {
        if (this._scrollList) {
            var rechargeArr = this.updataArr(this._rechargeArr);
            this._scrollList.refreshData(rechargeArr);
            this._scrollList.setPosition(20, -210);
        }
    };
    AcSpringCelebrateViewTab2.prototype.getSheepType = function () {
        return 2;
    };
    AcSpringCelebrateViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB, this.update, this);
        this._scrollList = null;
        this._rechargeArr = null;
        _super.prototype.dispose.call(this);
    };
    return AcSpringCelebrateViewTab2;
}(AcCommonViewTab));
__reflect(AcSpringCelebrateViewTab2.prototype, "AcSpringCelebrateViewTab2");
//# sourceMappingURL=AcSpringCelebrateViewTab2.js.map