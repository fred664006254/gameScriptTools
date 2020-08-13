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
* 据点结算
* date 2020.5.13
* author ycg
* @name SixSection1HoldResultView
*/
var SixSection1HoldResultView = (function (_super) {
    __extends(SixSection1HoldResultView, _super);
    function SixSection1HoldResultView() {
        var _this = _super.call(this) || this;
        _this._baseContent = null;
        return _this;
    }
    SixSection1HoldResultView.prototype.getBgName = function () {
        return "";
    };
    SixSection1HoldResultView.prototype.getTitleStr = function () {
        return null;
    };
    SixSection1HoldResultView.prototype.getTitleBgName = function () {
        return "";
    };
    SixSection1HoldResultView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    SixSection1HoldResultView.prototype.getRuleInfo = function () {
        return "";
    };
    SixSection1HoldResultView.prototype.getProbablyInfo = function () {
        return "";
    };
    SixSection1HoldResultView.prototype.getCloseBtnName = function () {
        if (this.uiType == "2") {
            return ButtonConst.POPUP_CLOSE_BTN_2;
        }
        return ButtonConst.POPUP_CLOSE_BTN_1;
    };
    SixSection1HoldResultView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("public_scrollitembg", "specialview_artbg").concat(list);
    };
    SixSection1HoldResultView.prototype.initView = function () {
        var baseContent = new BaseDisplayObjectContainer();
        this.addChildToContainer(baseContent);
        this._baseContent = baseContent;
        var titleBg = BaseBitmap.create("specialview_artbg");
        titleBg.setPosition(GameConfig.stageWidth / 2 - titleBg.width / 2, 0);
        var title = BaseBitmap.create("sixsection1_spointresult_titletxt");
        title.setPosition(GameConfig.stageWidth / 2 - title.width / 2, titleBg.y + titleBg.height / 2 - title.height / 2);
        var bg = BaseBitmap.create("sixsection1_spointresult_topbg");
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, title.y + title.height / 2 + 12);
        var dataList = Api.sixsection1VoApi.getResultSeat();
        // console.log("SixSection1HoldResultView ", dataList);
        var scrollList = ComponentManager.getScrollList(SixSection1HoldResultScrollItem, dataList, new egret.Rectangle(0, 0, GameConfig.stageWidth, 500), {});
        scrollList.setPosition(0, bg.y + bg.height - 15);
        baseContent.addChild(scrollList);
        scrollList.horizontalScrollPolicy = "off";
        scrollList.bounces = false;
        baseContent.addChild(bg);
        baseContent.addChild(titleBg);
        baseContent.addChild(title);
        var totalGetCount = 0;
        var noGetCount = 0;
        var getResCount = 0;
        var loseResCount = 0;
        for (var i = 0; i < dataList.length; i++) {
            if (dataList[i].type == "build") {
                totalGetCount += 1;
                if (dataList[i].status == 1) {
                    noGetCount += 1;
                    loseResCount += dataList[i].data.fres;
                }
                getResCount += dataList[i].data.res;
            }
        }
        console.log("datalist ", dataList);
        App.LogUtil.log("totalGetCount " + totalGetCount + " notGetCount " + noGetCount + " resNum " + getResCount);
        //资源获取信息
        //已采集据点
        var getNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultSeatGet", ["" + (totalGetCount - noGetCount)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        getNum.setPosition(bg.x + 70, bg.y + 50);
        baseContent.addChild(getNum);
        //被抢夺据点
        var notGetNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultSeatNotGet", ["" + noGetCount]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        notGetNum.setPosition(bg.x + bg.width / 2 + 40, bg.y + 50);
        baseContent.addChild(notGetNum);
        //总计资源
        var totalTitle = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultSeatTotalInfo"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        totalTitle.setPosition(bg.x + 70, getNum.y + getNum.height + 15 + 5);
        baseContent.addChild(totalTitle);
        //总获得资源
        // let totalGetBg = BaseBitmap.create("sixsection1_resultinfobg");
        // baseContent.addChild(totalGetBg);
        var totalGet = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultSeatTotalGet"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        // totalGetBg.width = totalGet.width + 100;
        // totalGetBg.setPosition(totalTitle.x - 20, totalTitle.y + totalTitle.height + 10);
        totalGet.setPosition(totalTitle.x, totalTitle.y + totalTitle.height + 20);
        baseContent.addChild(totalGet);
        var totalGetInfoStr = LanguageManager.getlocal("sixSection1HoldSeatResName1") + "*" + getResCount;
        var totalGetInfo = ComponentManager.getTextField(totalGetInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        totalGetInfo.setPosition(totalGet.x + totalGet.width, totalGet.y);
        baseContent.addChild(totalGetInfo);
        // totalGetInfo.width = GameConfig.stageWidth - totalGet.x - totalGet.width - 10;
        // totalGetInfo.lineSpacing = 5;
        // totalGetBg.width = totalGet.width + totalGetInfo.width + 60;
        // totalGetBg.setPosition(totalTitle.x - 30, totalTitle.y + totalTitle.height + 10);
        //被抢夺资源资源
        // let notGetBg = BaseBitmap.create("sixsection1_resultinfobg");
        // baseContent.addChild(notGetBg);
        var notGet = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultSeatTotalNotGet"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED3);
        // notGetBg.width = notGet.width + 100;
        // notGetBg.setPosition(totalGetInfo.x - 20, totalGetInfo.y + totalGetInfo.height + 25);
        notGet.setPosition(totalTitle.x, totalGetInfo.y + totalGetInfo.height + 17 + 10 - 5);
        baseContent.addChild(notGet);
        var notGetInfoStr = LanguageManager.getlocal("sixSection1HoldSeatResName1") + "*" + loseResCount;
        var notGetInfo = ComponentManager.getTextField(notGetInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED3);
        notGetInfo.setPosition(notGet.x + notGet.width, notGet.y);
        baseContent.addChild(notGetInfo);
        // notGetInfo.width = GameConfig.stageWidth - notGet.x - notGet.width - 10;
        // notGetInfo.lineSpacing = 5;
        // notGetBg.width = notGet.width + notGetInfo.width + 60;
        // notGetBg.setPosition(notGet.x - 30, totalGetInfo.y + totalGetInfo.height + 17 - 5);
        var dataLen = dataList.length;
        if (dataLen < 4) {
            baseContent.y = (GameConfig.stageHeigth - bg.y - bg.height + 15 - dataLen * 127 + 5) / 2 - 20;
        }
        else {
            baseContent.y = (GameConfig.stageHeigth - scrollList.y - scrollList.height) / 2 - 20;
        }
        this.closeBtn.y = baseContent.y + 30;
    };
    SixSection1HoldResultView.prototype.hide = function () {
        //调接口
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_SHOW, { show: 1 });
        _super.prototype.hide.call(this);
    };
    SixSection1HoldResultView.prototype.dispose = function () {
        this._baseContent = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1HoldResultView;
}(CommonView));
__reflect(SixSection1HoldResultView.prototype, "SixSection1HoldResultView");
//# sourceMappingURL=SixSection1HoldResultView.js.map