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
 * 排名
 * author dky
 * date 2017/11/23
 * @class ConquestRankPopupView
 */
var ConquestRankPopupView = (function (_super) {
    __extends(ConquestRankPopupView, _super);
    // private _punishRewardList: any = {};
    function ConquestRankPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        return _this;
    }
    ConquestRankPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    ConquestRankPopupView.prototype.initView = function () {
        // this._acData = this.param.data.acData;
        // this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("punish","1");
        var coVo = Api.conquestVoApi.getConquestVo();
        var bg1 = BaseBitmap.create("public_9_bg32");
        bg1.width = 520;
        bg1.height = 600;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 20;
        this.addChildToContainer(bg1);
        var bg2 = BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this.addChildToContainer(bg2);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 40;
        titleTxt1.y = bg2.y + 8;
        this.addChildToContainer(titleTxt1);
        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.x = bg2.x + 175;
        this._titleTF.y = titleTxt1.y;
        this.addChildToContainer(this._titleTF);
        // let titleStr3:string;
        // if(acRankInfoVo.getProgressTitle()=="")
        // {
        //     titleStr3 = LanguageManager.getlocal("pointNumber");
        // }
        // else
        // {
        //     titleStr3 = acRankInfoVo.getProgressTitle();
        // }
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("conquestScore"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = bg2.x + 430 - titleTxt3.width / 2;
        titleTxt3.y = titleTxt1.y;
        this.addChildToContainer(titleTxt3);
        var bg3 = BaseBitmap.create("public_9_bg1");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this.addChildToContainer(bg3);
        this._nickNameTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._nickNameTF.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName();
        this._nickNameTF.x = bg3.x + 20;
        this._nickNameTF.y = bg3.y + 20;
        this.addChildToContainer(this._nickNameTF);
        var rankV = "10000+";
        var addV = 0;
        if (this._acData.merank) {
            rankV = String(this._acData.merank);
            addV = this._acData.merank;
        }
        this._myRankTF = ComponentManager.getTextField("", this._nickNameTF.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._myRankTF.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
        this._myRankTF.x = this._nickNameTF.x;
        this._myRankTF.y = this._nickNameTF.y + 40;
        this.addChildToContainer(this._myRankTF);
        // let addStr = ""
        // if(this._acData.getProgressDesc() == "")
        // {
        //     addStr  = LanguageManager.getlocal("acRankPop_title3_"+this._code);
        // }
        // else
        // {
        //     addStr  = this._acData.getProgressDesc();
        // }
        this._scoreTF = ComponentManager.getTextField("", this._nickNameTF.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._scoreTF.text = LanguageManager.getlocal("conquestScore") + ":" + this._acData.mepoint;
        this._scoreTF.x = this._myRankTF.x + 240;
        this._scoreTF.y = this._myRankTF.y;
        this.addChildToContainer(this._scoreTF);
        var dataList = [];
        if (this._acData && this._acData.conrank) {
            dataList = this._acData.conrank;
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, this.viewBg.width, bg1.height - 70);
        this._scrollList = ComponentManager.getScrollList(ConquestRankScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        // this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
        this._scrollList.y = bg2.y + 50;
        this._scrollList.x = GameData.popupviewOffsetX;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        // this.refreshRankList();
        // this.tabBtnClickHandler(null);;
    };
    /**
     * 获取配置
     */
    ConquestRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_CONQUEST_RANK, requestData: {} };
    };
    //请求回调
    ConquestRankPopupView.prototype.receiveData = function (data) {
        if (data && data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_CONQUEST_RANK) {
                this._acData = data.data.data;
                // this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("punish","1");
            }
        }
        else {
            this._acData = null;
        }
    };
    ConquestRankPopupView.prototype.rankBtnClick = function () {
    };
    ConquestRankPopupView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        this.refreshRankList();
    };
    ConquestRankPopupView.prototype.refreshRankList = function () {
        var dataList = this._acData.rankList;
        if (this._curTabIdx == 0) {
            var rankV = "10000+";
            var addV = 0;
            this._nickNameTF.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName();
            this._titleTF.text = LanguageManager.getlocal("acRankPop_title2");
            if (this._acData.myrank.myrank) {
                rankV = String(this._acData.myrank.myrank);
                addV = this._acData.myrank.value;
            }
            this._myRankTF.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
            // this._scoreTF.text = LanguageManager.getlocal("acPunishScore",[this._acVo.v.toString()]);
        }
        else {
            dataList = this._acData.arankList;
            this._titleTF.text = LanguageManager.getlocal("acRankPop_titleAlliance");
            var aName = LanguageManager.getlocal("allianceRankNoAlliance");
            var rankV = LanguageManager.getlocal("nothing");
            var score = LanguageManager.getlocal("nothing");
            var addV = 0;
            this._nickNameTF.text = LanguageManager.getlocal("acRank_myAlliancenick") + rankV;
            this._titleTF.text = LanguageManager.getlocal("acRankPop_titleAlliance");
            if (this._acData.amyrank.myrank) {
                rankV = String(this._acData.amyrank.myrank);
                score = String(this._acData.amyrank.value);
                // addV = this._acData.myrank.value;
            }
            if (Api.playerVoApi.getPlayerAllianceId() != 0) {
                aName = Api.playerVoApi.getPlayerAllianceName();
            }
            this._nickNameTF.text = LanguageManager.getlocal("acRank_myAlliancenick") + aName;
            this._scoreTF.text = LanguageManager.getlocal("acPunishScore", [score]);
            this._myRankTF.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
        }
        this._scrollList.refreshData(dataList);
    };
    ConquestRankPopupView.prototype.getTitleStr = function () {
        return "conquestRank";
    };
    ConquestRankPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    ConquestRankPopupView.prototype.dispose = function () {
        // 未婚滑动列表
        this._scrollList = null;
        this._timeTF = null;
        this._selectChildData = null;
        // this._acVo = null;
        this._titleTF = null;
        this._nickNameTF = null;
        this._myRankTF = null;
        this._scoreTF = null;
        _super.prototype.dispose.call(this);
    };
    return ConquestRankPopupView;
}(PopupView));
__reflect(ConquestRankPopupView.prototype, "ConquestRankPopupView");
//# sourceMappingURL=ConquestRankPopupView.js.map