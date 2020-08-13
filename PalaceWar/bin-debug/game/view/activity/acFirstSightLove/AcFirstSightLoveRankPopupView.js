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
 * 排行榜
 * author ycg
 * date 2019.10.18
 * @class AcFirstSightLoveRankPopupView
 */
var AcFirstSightLoveRankPopupView = (function (_super) {
    __extends(AcFirstSightLoveRankPopupView, _super);
    function AcFirstSightLoveRankPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._pageId = 1;
        return _this;
    }
    AcFirstSightLoveRankPopupView.prototype.initView = function () {
        /**需判断两种情况，报名列表，抽奖结果 */
        var rankBg = BaseBitmap.create("public_9_bg32");
        rankBg.width = 530;
        rankBg.height = 700;
        rankBg.x = 20 + GameData.popupviewOffsetX;
        this.addChildToContainer(rankBg);
        App.LogUtil.log("aid: " + this.param.data.isResult);
        var resultStr = "acFirstSightLoveJoinListBmInfo-" + this.getTypeCode();
        if (this.param.data.isResult) {
            resultStr = "acFirstSightLoveJoinListInfo-" + this.getTypeCode();
        }
        var resultInfo = ComponentManager.getTextField(LanguageManager.getlocal(resultStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        resultInfo.textAlign = TextFieldConst.ALIGH_CENTER;
        resultInfo.x = rankBg.x + rankBg.width / 2 - resultInfo.width / 2;
        resultInfo.y = 10;
        this.addChildToContainer(resultInfo);
        rankBg.y = resultInfo.y + resultInfo.height + 10;
        var rankTopBg = BaseBitmap.create("public_9_bg37");
        rankTopBg.width = rankBg.width;
        rankTopBg.height = 35;
        rankTopBg.setPosition(rankBg.x, rankBg.y);
        this.addChildToContainer(rankTopBg);
        //序号
        var numTitle = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveJoinListNum"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        numTitle.anchorOffsetX = numTitle.width / 2;
        numTitle.setPosition(rankTopBg.x + 60, rankTopBg.y + rankTopBg.height / 2 - numTitle.height / 2);
        this.addChildToContainer(numTitle);
        //昵称
        var nameTitle = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveJoinListName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTitle.anchorOffsetX = nameTitle.width / 2;
        nameTitle.setPosition(rankTopBg.x + rankTopBg.width / 2 - 70, rankTopBg.y + rankTopBg.height / 2 - nameTitle.height / 2);
        this.addChildToContainer(nameTitle);
        //官品
        var levelTitle = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveJoinListLevel"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        levelTitle.anchorOffsetX = levelTitle.width / 2;
        levelTitle.setPosition(rankTopBg.x + rankTopBg.width / 2 + 80, rankTopBg.y + rankTopBg.height / 2 - levelTitle.height / 2);
        this.addChildToContainer(levelTitle);
        //区服
        var serverTitle = ComponentManager.getTextField(LanguageManager.getlocal("acFristSightLoveJoinListServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        serverTitle.anchorOffsetX = serverTitle.width / 2;
        serverTitle.setPosition(rankTopBg.x + rankTopBg.width - 65, rankTopBg.y + rankTopBg.height / 2 - serverTitle.height / 2);
        this.addChildToContainer(serverTitle);
        var dataList = [];
        if (this.param.data && this.param.data.data) {
            dataList = this.param.data.data;
        }
        var listIndex = (this._pageId - 1) * 100;
        var rect = new egret.Rectangle(0, 0, rankBg.width, rankBg.height - rankTopBg.height - 6);
        var scrollList = ComponentManager.getScrollList(AcFirstSightLoveRankScrollItem, dataList, rect, { aid: this.aid, code: this.code, stIndex: listIndex });
        scrollList.setPosition(rankBg.x, rankBg.y + rankTopBg.height);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        if (!this.param.data.isResult) {
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, this.getBmDataListCallback, this);
            this._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll, this);
        }
        App.LogUtil.log("datalist: " + dataList.length);
        if (dataList && dataList.length > 0) {
        }
        else {
            scrollList.setEmptyTip(LanguageManager.getlocal("acFirstSightLoveNoData"));
        }
    };
    AcFirstSightLoveRankPopupView.prototype.refreshChatByScroll = function () {
        // let isBottom:boolean = this._scrollList.checkIsAtButtom();
        // if(isBottom)
        // {
        //     //调接口
        //     App.LogUtil.log("refreshChatByScroll: aaaaaa");
        //     this._pageId += 1;
        //     NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, { activeId: this.vo.aidAndCode, page: this._pageId});
        // }
        var pageId = this._pageId;
        if (this._scrollList.checkIsAtButtom()) {
            this._pageId += 1;
        }
        else if (this._scrollList.scrollTop <= 0) {
            this._pageId = Math.max(1, this._pageId - 1);
        }
        if (this._pageId != pageId) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, { activeId: this.vo.aidAndCode, page: this._pageId });
        }
    };
    AcFirstSightLoveRankPopupView.prototype.getBmDataListCallback = function (evt) {
        var rData = evt.data.data.data;
        if (rData) {
            var rankList = rData.list;
            if (rankList && rankList.length > 0) {
                // this._rankData.concat(rankList);
                var listIndex = (this._pageId - 1) * 100;
                this._scrollList.refreshData(rankList, { aid: this.aid, code: this.code, stIndex: listIndex });
                this._scrollList.scrollTop = 0;
            }
            else {
                this._pageId -= 1;
                if (this._pageId < 1) {
                    this._pageId = 1;
                }
            }
        }
        else {
            this._pageId -= 1;
        }
    };
    AcFirstSightLoveRankPopupView.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcFirstSightLoveRankPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFirstSightLoveRankPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFirstSightLoveRankPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFirstSightLoveRankPopupView.prototype.getTitleStr = function () {
        var str = "acFirstSightLoveJoinListTitle-" + this.getTypeCode();
        if (!this.param.data.isResult) {
            str = "acFirstSightLoveJoinListBmTitle-" + this.getTypeCode();
        }
        App.LogUtil.log("gettitle: " + str + "  " + this.param.data.isResult);
        return str;
    };
    AcFirstSightLoveRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_line",
        ]);
    };
    AcFirstSightLoveRankPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, this.getBmDataListCallback, this);
        this._scrollList = null;
        this._pageId = 1;
        _super.prototype.dispose.call(this);
    };
    return AcFirstSightLoveRankPopupView;
}(PopupView));
__reflect(AcFirstSightLoveRankPopupView.prototype, "AcFirstSightLoveRankPopupView");
//# sourceMappingURL=AcFirstSightLoveRankPopupView.js.map