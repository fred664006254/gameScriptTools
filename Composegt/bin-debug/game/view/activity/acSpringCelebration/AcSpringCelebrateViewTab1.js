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
var AcSpringCelebrateViewTab1 = (function (_super) {
    __extends(AcSpringCelebrateViewTab1, _super);
    function AcSpringCelebrateViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._rechargeArr = null;
        _this.initView();
        return _this;
    }
    AcSpringCelebrateViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB, this.update, this);
        // let bottomBg = BaseBitmap.create("public_9v_bg04");
        // bottomBg.width=625;
        // bottomBg.height=GameConfig.stageHeigth-410;
        // bottomBg.x=5;
        // bottomBg.y=-220; 
        // this.addChild(bottomBg); 
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        var rechargeArr = tmpVo.getArr("recharge");
        var rechargeArr2 = this.updataArr(rechargeArr);
        this._rechargeArr = rechargeArr2;
        var tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 480);
        var scrollList = ComponentManager.getScrollList(Celebration1ScrollItem, rechargeArr2, tmpRect);
        scrollList.setPosition(18, -290);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcSpringCelebrateViewTab1.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        var newrechargeArr = arr;
        var newarr = [];
        var arr1 = [];
        var arr2 = [];
        for (var i = 0; i < newrechargeArr.length; i++) {
            var num = Number(newrechargeArr[i].key);
            if (tmpVo.getReceiveType(num) == false) {
                arr1.push(newrechargeArr[i]);
            }
            else {
                arr2.push(newrechargeArr[i]);
            }
        }
        newrechargeArr = [];
        newrechargeArr = arr2.concat(arr1);
        return newrechargeArr;
    };
    AcSpringCelebrateViewTab1.prototype.update = function () {
        if (this._scrollList) {
            var rechargeArr = this.updataArr(this._rechargeArr);
            this._scrollList.refreshData(rechargeArr);
            this._scrollList.setPosition(20, -290);
        }
    };
    // 页签类型
    AcSpringCelebrateViewTab1.prototype.getSheepType = function () {
        return 1;
    };
    AcSpringCelebrateViewTab1.prototype.dispose = function () {
        this._scrollList = null;
        this._rechargeArr = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcSpringCelebrateViewTab1;
}(CommonViewTab));
__reflect(AcSpringCelebrateViewTab1.prototype, "AcSpringCelebrateViewTab1");
