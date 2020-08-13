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
  * 赵云排行榜Tab1
  * author 张朝阳
  * date 2018/7/10
  * @class AcMazeViewTab3
  */
var AcMazeRankPopupViewTab1 = (function (_super) {
    __extends(AcMazeRankPopupViewTab1, _super);
    function AcMazeRankPopupViewTab1() {
        var _this = _super.call(this) || this;
        _this._rankScrollList = null;
        _this._rankMyTF = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMazeRankPopupViewTab1.prototype, "cfg", {
        /**
         * 配置文件数据
         */
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMazeRankPopupViewTab1.prototype, "vo", {
        /**
         * 服务器返回数据
         */
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMazeRankPopupViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK, this.rankClickHandler, this);
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 516;
        rankBg.height = 520;
        rankBg.setPosition(30, 55);
        this.addChild(rankBg);
        var rankTopBg = BaseBitmap.create("public_9_bg37");
        rankTopBg.width = rankBg.width;
        rankTopBg.height = 35;
        rankTopBg.setPosition(rankBg.x, rankBg.y);
        this.addChild(rankTopBg);
        // 排名 
        var rankTF = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTF.setPosition(rankTopBg.x + 35, rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2);
        this.addChild(rankTF);
        // 玩家昵称 
        var rankPlayNameTF = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankPlayNameTF.setPosition(rankTopBg.x + rankTopBg.width / 2 - rankPlayNameTF.width / 2 - 30, rankTF.y);
        this.addChild(rankPlayNameTF);
        // 杀敌数 
        var rankKillNumTF = ComponentManager.getTextField(LanguageManager.getlocal("acMazeRankKillNum"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankKillNumTF.setPosition(rankTopBg.x + rankTopBg.width - rankKillNumTF.width - 75, rankTF.y);
        this.addChild(rankKillNumTF);
        //排行榜的ScrollList
        var rect = new egret.Rectangle(0, 0, rankBg.width, rankBg.height - rankTopBg.height - 10);
        this._rankScrollList = ComponentManager.getScrollList(AcMazeRankScrollItem, null, rect);
        this._rankScrollList.setPosition(rankTopBg.x, rankTopBg.y + rankTopBg.height);
        this.addChild(this._rankScrollList);
        // 底部的bg 
        var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 516;
        buttomBg.height = 112;
        buttomBg.setPosition(rankBg.x, rankBg.y + rankBg.height + 10);
        this.addChild(buttomBg);
        // 我的昵称 
        var niceName = Api.playerVoApi.getPlayerName();
        var rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick") + niceName, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankNiceNameTF.setPosition(buttomBg.x + 40, buttomBg.y + 20);
        this.addChild(rankNiceNameTF);
        // 上榜条件 
        var rankUpTF = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeRankPopupViewTip", [String(this.cfg.rankNeedNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankUpTF.setPosition(buttomBg.x + buttomBg.width - rankUpTF.width - 40, rankNiceNameTF.y);
        this.addChild(rankUpTF);
        if (PlatformManager.checkIsTextHorizontal()) {
            rankNiceNameTF.setPosition(buttomBg.x + 10, buttomBg.y + 20);
            rankUpTF.width = 250;
            rankUpTF.setPosition(buttomBg.x + buttomBg.width - rankUpTF.width - 10, rankNiceNameTF.y);
        }
        // 我的排名 rankorder2
        this._rankMyTF = ComponentManager.getTextField(LanguageManager.getlocal("rankorder2", [LanguageManager.getlocal("atkracedes4")]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rankMyTF.setPosition(rankNiceNameTF.x, buttomBg.y + buttomBg.height - this._rankMyTF.height - 20);
        this.addChild(this._rankMyTF);
        // 转的次数
        var mazeNum = ComponentManager.getTextField(LanguageManager.getlocal("acMazeRankNum", [String(this.vo.getMazeNum())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        mazeNum.setPosition(rankUpTF.x, this._rankMyTF.y);
        this.addChild(mazeNum);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK, { "activeId": AcMazeView.ACTIVEID });
    };
    AcMazeRankPopupViewTab1.prototype.rankClickHandler = function (event) {
        var data = event.data.data.data;
        if (data.rankArr.length == null) {
            this._rankScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        }
        else {
            this._rankScrollList.refreshData(data.rankArr);
        }
        var myRank = data.myrankArr.myrank;
        var str;
        if (myRank == null) {
            str = LanguageManager.getlocal("atkracedes4");
        }
        else if (myRank > 10000) {
            str = "10000+";
        }
        else {
            str = myRank;
        }
        this._rankMyTF.text = LanguageManager.getlocal("rankorder2", [str]);
    };
    AcMazeRankPopupViewTab1.prototype.dispose = function () {
        this._rankScrollList = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK, this.rankClickHandler, this);
        _super.prototype.dispose.call(this);
    };
    return AcMazeRankPopupViewTab1;
}(AcCommonViewTab));
__reflect(AcMazeRankPopupViewTab1.prototype, "AcMazeRankPopupViewTab1");
//# sourceMappingURL=AcMazeRankPopupViewTab1.js.map