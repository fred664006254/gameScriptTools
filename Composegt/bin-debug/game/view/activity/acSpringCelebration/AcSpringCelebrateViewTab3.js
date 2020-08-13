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
var AcSpringCelebrateViewTab3 = (function (_super) {
    __extends(AcSpringCelebrateViewTab3, _super);
    function AcSpringCelebrateViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._rechargeArr = null;
        _this.initView();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB, _this.update, _this);
        return _this;
    }
    AcSpringCelebrateViewTab3.prototype.initView = function () {
        // let bottomBg = BaseBitmap.create("public_9v_bg04");
        // bottomBg.width=625;
        // bottomBg.height=GameConfig.stageHeigth-410;
        // bottomBg.x=5;
        // bottomBg.y=-220; 
        // this.addChild(bottomBg);
        var springVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        var rechargeArr = springVo.getArr("task");
        rechargeArr = this.updataArr(rechargeArr);
        this._rechargeArr = rechargeArr;
        var tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 480);
        var scrollList = ComponentManager.getScrollList(Celebration3ScrollItem, rechargeArr, tmpRect);
        this._scrollList = scrollList;
        scrollList.setPosition(18, -290);
        this.addChild(scrollList);
    };
    AcSpringCelebrateViewTab3.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (!springCelebrateVo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            if (springCelebrateVo.isGetRecharge(arr[i].key)) {
                arr1.push(arr[i]);
            }
            else {
                var taskNum = springCelebrateVo.getTask(arr[i].questType);
                if (taskNum >= arr[i].value) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcSpringCelebrateViewTab3.prototype.update = function () {
        if (this._scrollList) {
            var rechargeArr = this.updataArr(this._rechargeArr);
            this._scrollList.refreshData(rechargeArr);
        }
    };
    AcSpringCelebrateViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB, this.update, this);
        this._scrollList = null;
        this._rechargeArr = null;
        _super.prototype.dispose.call(this);
    };
    return AcSpringCelebrateViewTab3;
}(CommonViewTab));
__reflect(AcSpringCelebrateViewTab3.prototype, "AcSpringCelebrateViewTab3");
