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
var BetheKingTaskPopupView = (function (_super) {
    __extends(BetheKingTaskPopupView, _super);
    function BetheKingTaskPopupView() {
        return _super.call(this) || this;
    }
    BetheKingTaskPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_TASK, this.voteCallBackHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_BEKING_TASK, this.refreshListFromVo, this);
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var rankBg = BaseBitmap.create("public_tc_bg01");
        rankBg.width = 540;
        rankBg.height = 626;
        rankBg.setPosition(39, 10);
        this.addChildToContainer(rankBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, rankBg.width - 20, rankBg.height - 20);
        BetheKingTaskScrollItem._ACVO = this._acVo;
        var _scrollList = ComponentManager.getScrollList(BetheKingTaskScrollItem, [], rect);
        _scrollList.setPosition(rankBg.x + 10, rankBg.y + 10);
        this.addChildToContainer(_scrollList);
        this.__scrollList = _scrollList;
        this.refreshList();
    };
    BetheKingTaskPopupView.prototype.refreshList = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var tmpList = cfg.getTaskItemLists(this._acVo.getMaxTaskId());
        // tmpList 需要排序
        var list1 = []; //默认
        var list2 = []; //未解锁
        var list3 = []; //已完成
        for (var index = 0; index < tmpList.length; index++) {
            var element = tmpList[index];
            if (this._acVo.isgetTaskReward(element.stage)) {
                list3.push(element);
            }
            else {
                if (element.unlock && !this._acVo.isgetTaskReward(element.unlock)) {
                    list2.push(element);
                }
                else {
                    list1.push(element);
                }
            }
        }
        if (list2.length > 0) {
            list2[0]["isFirst"] = 1;
        }
        var tarList = list1.concat(list2).concat(list3);
        this.__scrollList.refreshData(tarList);
    };
    BetheKingTaskPopupView.prototype.refreshListFromVo = function () {
        egret.Tween.get(this, { loop: false }).wait(300).call(this.refreshList, this);
    };
    BetheKingTaskPopupView.prototype.voteCallBackHandler = function (event) {
        var data = event.data;
        var ret = data.data.ret;
        if (ret == 0) {
            this.refreshListFromVo(); //主要是走统一的延时处理
        }
    };
    BetheKingTaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "collectflag", "betheking_horn",
        ]);
    };
    BetheKingTaskPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_TASK, this.voteCallBackHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_BEKING_TASK, this.refreshListFromVo, this);
        this._aid = null;
        this._code = null;
        this._acVo = null;
        _super.prototype.dispose.call(this);
    };
    return BetheKingTaskPopupView;
}(PopupView));
__reflect(BetheKingTaskPopupView.prototype, "BetheKingTaskPopupView");
