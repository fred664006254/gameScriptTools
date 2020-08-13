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
 * 粮草奖励item
 * author 钱竣
 */
var AcThreeKingdomsRankFoodRewardItem = (function (_super) {
    __extends(AcThreeKingdomsRankFoodRewardItem, _super);
    function AcThreeKingdomsRankFoodRewardItem() {
        var _this = _super.call(this) || this;
        _this._arrow1 = null;
        _this._list1 = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankFoodRewardItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankFoodRewardItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankFoodRewardItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankFoodRewardItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_THREEKINGDOMS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankFoodRewardItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankFoodRewardItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankFoodRewardItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._data = data;
        view._code = itemparam;
        view.width = 520;
        var code = view.getUiCode();
        var separate1 = BaseBitmap.create('threekingdomscrossrewardtitle');
        separate1.width = 528;
        separate1.height = 46;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, separate1, view, [0, 7]);
        view.addChild(separate1);
        separate1.addTouchTap(view.arrow1click, view);
        var arrow1 = BaseBitmap.create('threekingdomscrossrewardarrow');
        arrow1.anchorOffsetX = arrow1.width / 2;
        arrow1.anchorOffsetY = arrow1.height / 2;
        arrow1.rotation = data.show ? 0 : 180;
        var qinjiaTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank3ActicityName" + data.aid, code)), 22, TextFieldConst.COLOR_BROWN);
        var param1 = (separate1.width - arrow1.width - qinjiaTxt.textWidth - 5) / 2;
        view._arrow1 = arrow1;
        this.setLayoutPosition(LayoutConst.leftverticalCenter, qinjiaTxt, separate1, [param1, 0]);
        this.addChild(qinjiaTxt);
        this.setLayoutPosition(LayoutConst.lefttop, arrow1, qinjiaTxt, [qinjiaTxt.textWidth + 5 + arrow1.width / 2, arrow1.height / 2 + 7]);
        this.addChild(arrow1);
        if (data.show) {
            var arr = view.cfg.getFood;
            var tmpRect = new egret.Rectangle(0, 0, 528, 705);
            var scrollList = ComponentManager.getScrollList(AcThreeKingdomsFoodItem, arr, tmpRect, view.code);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, separate1, [0, separate1.height + 5]);
            //scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
            view.addChild(scrollList);
            view._list1 = scrollList;
            var listbg = BaseBitmap.create("public_9_bg32");
            view.addChildAt(listbg, 0);
            listbg.width = 528;
            listbg.height = arr.length * 45 + 46;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, separate1);
        }
        this.height -= 5;
    };
    AcThreeKingdomsRankFoodRewardItem.prototype.arrow1click = function () {
        var view = this;
        var list = view.parent.parent;
        var arr = list._dataList;
        // for(let i = 0; i < 2; ++ i){
        //     // let unit = view.cfg.odds[i];
        //     arr.push({
        // 		index : Number(i),
        // 		param : i == 0 ? 'sadun' : 'notsadun',
        // 		type : view._data.type,
        // 		show : true
        //     });
        // }
        if (view._arrow1.rotation == 0) {
            view._arrow1.rotation = 180;
        }
        else {
            view._arrow1.rotation = 0;
        }
        for (var i in arr) {
            //let show = view._arrow1.rotation == 0;
            arr[i].show = false;
            if (Number(i) == view._index) {
                arr[i].show = true;
            }
        }
        // arr[view._data.index].show = view._arrow1.rotation == 0;
        list.refreshData(arr, view.code);
    };
    AcThreeKingdomsRankFoodRewardItem.prototype.dispose = function () {
        this._data = null;
        if (this._arrow1) {
            this._arrow1.removeTouchTap();
            this._arrow1 = null;
        }
        if (this._list1) {
            this._list1 = null;
        }
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankFoodRewardItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsRankFoodRewardItem.prototype, "AcThreeKingdomsRankFoodRewardItem");
//# sourceMappingURL=AcThreeKingdomsRankFoodRewardItem.js.map