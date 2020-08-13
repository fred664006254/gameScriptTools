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
var LadderRankViewTab3 = (function (_super) {
    __extends(LadderRankViewTab3, _super);
    function LadderRankViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._numTxt = null;
        _this._length = 0;
        _this.initView();
        return _this;
    }
    Object.defineProperty(LadderRankViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode("ladderTournament", "1");
        },
        enumerable: true,
        configurable: true
    });
    LadderRankViewTab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_SHOPBUY), this.useCallback, this);
        var listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 150;
        listbg.setPosition(8, 0);
        this.addChild(listbg);
        var titleBg = BaseBitmap.create("ladder_ranktitle_bg");
        titleBg.width = listbg.width;
        titleBg.height = 60;
        titleBg.x = listbg.x;
        this.addChild(titleBg);
        var numbg = BaseBitmap.create("acchristmasview_smalldescbg");
        numbg.height = 34;
        numbg.width = 140;
        numbg.setPosition(GameConfig.stageWidth / 2 - numbg.width / 2, titleBg.y + titleBg.height / 2 - numbg.height / 2);
        this.addChild(numbg);
        var rectd = new egret.Rectangle(0, 0, 40, 40);
        var icon = BaseLoadBitmap.create("ladder_training_small", rectd);
        icon.setPosition(numbg.x + 5, numbg.y + numbg.height / 2 - icon.height / 2);
        view.addChild(icon);
        var hasNum = Api.laddertournamentVoApi.getShopscore();
        var numTxt = ComponentManager.getTextField(String(hasNum), 20);
        numTxt.setPosition(icon.x + icon.width + 5, numbg.y + numbg.height / 2 - numTxt.height / 2);
        view.addChild(numTxt);
        view._numTxt = numTxt;
        var tmpRect = new egret.Rectangle(0, 0, listbg.width, listbg.height - titleBg.height - 16);
        var tempArry = this.vo.getArr("shop");
        this._length = tempArry.length;
        var scrollList = ComponentManager.getScrollList(LadderRankViewTab3Item, tempArry, tmpRect, this.vo);
        view._scrollList = scrollList;
        scrollList.setPosition(6, titleBg.y + titleBg.height + 8);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    LadderRankViewTab3.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var numTxt = view._numTxt;
        var hasNum = Api.laddertournamentVoApi.getShopscore();
        numTxt.text = hasNum.toString();
    };
    LadderRankViewTab3.prototype.useCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var view = this;
        var data = event.data.data.data;
        if (data && data.rewards) {
            var rewards = data.rewards;
            var selIdx = view.vo.selIdx;
            var item = view._scrollList.getItemByIndex(selIdx);
            if (item) {
                item.refreshItem(rewards);
            }
            view.vo.selIdx = -1;
        }
        this.update();
    };
    LadderRankViewTab3.prototype.tick = function () {
        for (var i = 0; i < this._length; i++) {
            var item = this._scrollList.getItemByIndex(i);
            if (item) {
                item.tick();
            }
        }
    };
    LadderRankViewTab3.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_SHOPBUY), this.useCallback, this);
        this._numTxt = null;
        this._scrollList = null;
        this._length = 0;
        _super.prototype.dispose.call(this);
    };
    return LadderRankViewTab3;
}(CommonViewTab));
__reflect(LadderRankViewTab3.prototype, "LadderRankViewTab3");
//# sourceMappingURL=LadderRankViewTab3.js.map