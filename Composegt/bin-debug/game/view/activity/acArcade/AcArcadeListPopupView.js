/**
  * 电玩十连 中奖名单
  yanyuling
  * @class AcArcadeListPopupView
  */
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
var AcArcadeListPopupView = (function (_super) {
    __extends(AcArcadeListPopupView, _super);
    function AcArcadeListPopupView() {
        var _this = _super.call(this) || this;
        _this._infoList = [];
        return _this;
    }
    AcArcadeListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_biao",
        ]);
    };
    AcArcadeListPopupView.prototype.initView = function () {
        var rankBg = BaseBitmap.create("public_tc_bg01");
        rankBg.width = 540;
        rankBg.height = 600;
        rankBg.setPosition(40, 20);
        this.addChildToContainer(rankBg);
        var titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = 502;
        titleBg.height = 36;
        titleBg.setPosition(59, 30);
        this.addChildToContainer(titleBg);
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(titleBg.x + 40, titleBg.y + 10);
        this.addChildToContainer(nameText);
        //擂台分数
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeListPopup_Title2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(titleBg.x + titleBg.width / 2 - scoreText.width / 2 - 20, nameText.y);
        this.addChildToContainer(scoreText);
        //时间戳
        var timeText = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeListPopup_Title3"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeText.setPosition(titleBg.x + titleBg.width - 130, nameText.y);
        this.addChildToContainer(timeText);
        var innerBg = BaseBitmap.create("public_tc_bg03");
        innerBg.width = rankBg.width - 20;
        innerBg.height = 530;
        innerBg.x = rankBg.x + 10;
        innerBg.y = titleBg.y + titleBg.height + 5;
        this.addChildToContainer(innerBg);
        var _scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, innerBg.width - 20, innerBg.height - 20);
        var _scrollView = ComponentManager.getScrollView(_scrollContiner, rect);
        _scrollView.x = innerBg.x + 10;
        _scrollView.y = innerBg.y + 10;
        this.addChildToContainer(_scrollView);
        _scrollView.horizontalScrollPolicy = "off";
        var startY = 10;
        for (var i = 0; i < this._infoList.length; i++) {
            var data = this._infoList[i];
            var tarcolor = TextFieldConst.COLOR_BROWN;
            if (data[0] == Api.playerVoApi.getPlayerID()) {
                tarcolor = TextFieldConst.COLOR_WARN_GREEN;
            }
            //玩家昵称
            var txt1 = ComponentManager.getTextField(data[1], 20, tarcolor);
            txt1.setPosition(80 - txt1.width / 2, startY);
            _scrollContiner.addChild(txt1);
            //擂台分数
            var txt2 = ComponentManager.getTextField(data[2], 20, tarcolor);
            txt2.setPosition(230 - txt2.width / 2, txt1.y);
            _scrollContiner.addChild(txt2);
            //时间戳
            var time = App.DateUtil.getFormatBySecond(data[3], 2);
            var txt3 = ComponentManager.getTextField(time, 20, tarcolor);
            txt3.setPosition(400 - txt3.width / 2, txt1.y);
            _scrollContiner.addChild(txt3);
            startY += 30;
        }
        if (!this._infoList || !this._infoList.length || this._infoList.length == 0) {
            var emptyTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeListPopup_nodata"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            emptyTxt.x = innerBg.x + innerBg.width / 2 - emptyTxt.width / 2;
            emptyTxt.y = innerBg.y + innerBg.height / 2 - emptyTxt.height / 2;
            this.addChildToContainer(emptyTxt);
            emptyTxt.name = "emptyTxt";
        }
    };
    AcArcadeListPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUST_ACTIVITY_WININFO, requestData: { activeId: this.param.data.activeId } };
    };
    AcArcadeListPopupView.prototype.receiveData = function (data) {
        this._infoList = data.data.data.allwinfos;
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    AcArcadeListPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AcArcadeListPopupView.prototype.dispose = function () {
        this._infoList = [];
        _super.prototype.dispose.call(this);
    };
    return AcArcadeListPopupView;
}(PopupView));
__reflect(AcArcadeListPopupView.prototype, "AcArcadeListPopupView");
