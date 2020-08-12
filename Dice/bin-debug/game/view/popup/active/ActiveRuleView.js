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
var ActiveRuleView = (function (_super) {
    __extends(ActiveRuleView, _super);
    function ActiveRuleView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActiveRuleView.prototype.initView = function () {
        var arr = this.param.data.acInfoArr;
        if (arr) {
            var rulelist = ComponentMgr.getScrollList(AcRuleItem, arr, new egret.Rectangle(0, 0, 506, 500));
            this.addChildToContainer(rulelist);
            rulelist.x = 10;
        }
    };
    // 初始化标题
    ActiveRuleView.prototype.initTitle = function () {
        _super.prototype.initTitle.call(this);
    };
    ActiveRuleView.prototype.show = function (data) {
        _super.prototype.show.call(this, data);
    };
    // 需要加载的资源
    ActiveRuleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this);
    };
    // 弹框面板宽度，高度动态计算
    ActiveRuleView.prototype.getShowWidth = function () {
        return _super.prototype.getShowWidth.call(this);
    };
    // 弹框面板高度，重新该方法后，不会动态计算高度
    ActiveRuleView.prototype.getShowHeight = function () {
        return _super.prototype.getShowHeight.call(this);
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    ActiveRuleView.prototype.getBgExtraHeight = function () {
        return 110;
    };
    // 背景图名称
    ActiveRuleView.prototype.getBgName = function () {
        return _super.prototype.getBgName.call(this);
    };
    // 弹窗标题
    ActiveRuleView.prototype.getTitleStr = function () {
        return this.param.data.title ? this.param.data.title : LangMger.getlocal("fairArena");
    };
    // 关闭按钮图标名称
    ActiveRuleView.prototype.getCloseBtnName = function () {
        return _super.prototype.getCloseBtnName.call(this);
    };
    // 确认按钮名称
    ActiveRuleView.prototype.getConfirmBtnName = function () {
        return _super.prototype.getConfirmBtnName.call(this);
    };
    ActiveRuleView.prototype.getConfirmBtnStr = function () {
        return LangMger.getlocal("sysconfirm");
    };
    ActiveRuleView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ActiveRuleView;
}(PopupView));
__reflect(ActiveRuleView.prototype, "ActiveRuleView");
//# sourceMappingURL=ActiveRuleView.js.map