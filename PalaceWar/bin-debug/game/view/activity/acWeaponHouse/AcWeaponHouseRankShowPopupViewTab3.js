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
 * 排行
 * date 2020.6.15
 * @class AcWeaponHouseRankShowPopupViewTab3
 */
var AcWeaponHouseRankShowPopupViewTab3 = (function (_super) {
    __extends(AcWeaponHouseRankShowPopupViewTab3, _super);
    function AcWeaponHouseRankShowPopupViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcWeaponHouseRankShowPopupViewTab3.prototype.initView = function () {
        var rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 583;
        rewardBg.setPosition(26, 53);
        this.addChild(rewardBg);
        var baseView = ViewController.getInstance().getView("AcWeaponHouseRankPopupView");
        var rankDatalist = baseView.getAllirank();
        var rankData = baseView.getAllMask();
        var bg2 = BaseBitmap.create("public_9_bg33");
        bg2.width = rewardBg.width;
        bg2.height = 40;
        bg2.x = rewardBg.x;
        bg2.y = rewardBg.y;
        this.addChild(bg2);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankList_title", this.getTypeCode())), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 40;
        titleTxt1.y = bg2.y + 8;
        this.addChild(titleTxt1);
        var _titleTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankPlayName_title", this.getTypeCode())), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        _titleTF.x = bg2.x + 210;
        _titleTF.y = titleTxt1.y;
        this.addChild(_titleTF);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankPlayUp_title", this.getTypeCode())), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = bg2.x + 430 - titleTxt3.width / 2 + GameData.popupviewOffsetX;
        titleTxt3.y = titleTxt1.y;
        this.addChild(titleTxt3);
        var rect = new egret.Rectangle(0, 0, 530, 520);
        var scrollList = ComponentManager.getScrollList(AcWeaponHouseRankShowPopupItem3, rankDatalist, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(rewardBg.x, bg2.y + bg2.height + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        if (!rankDatalist[0]) {
            //暂无排名
            var noRankList = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_noRank", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this.addChild(noRankList);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, noRankList, rewardBg);
        }
        // 底部bg 
        var bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 530;
        bottomBg.height = 112;
        bottomBg.setPosition(rewardBg.x + rewardBg.width / 2 - bottomBg.width / 2, rewardBg.y + rewardBg.height + 2);
        this.addChild(bottomBg);
        // 我的排名 
        var nickName = Api.playerVoApi.getPlayerName();
        var myRank = null;
        var score = 0;
        if ((Api.playerVoApi.getPlayerAllianceId() != 0) && rankData && rankData.myrank) {
            score = rankData.value;
            myRank = rankData.myrank;
        }
        else {
            score = 0;
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeRankNotInRank", this.getTypeCode()));
            ;
        }
        var myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_name_title", this.getTypeCode()), [String(nickName)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChild(myRankTF);
        //排名
        var myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankShow_title", this.getTypeCode()), [String(myRank)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(myRankTF.x, myRankTF.y + myRankTF.height + 15);
        this.addChild(myScoreTF);
        //分数
        var myScore = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankPlayUpDes_title", this.getTypeCode()), [String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myScore.setPosition(bottomBg.x + bottomBg.width - myScore.width - 20, myRankTF.y + myRankTF.height + 15);
        this.addChild(myScore);
        //介绍
        var destext = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rank_upDes", this.getTypeCode()), [50 + ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, destext, bottomBg, [3, -45]);
        this.addChild(destext);
    };
    AcWeaponHouseRankShowPopupViewTab3.prototype.refreshView = function () {
    };
    Object.defineProperty(AcWeaponHouseRankShowPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankShowPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankShowPopupViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankShowPopupViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponHouseRankShowPopupViewTab3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcWeaponHouseRankShowPopupViewTab3.prototype.dispose = function () {
        var view = this;
        view._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHouseRankShowPopupViewTab3;
}(CommonViewTab));
__reflect(AcWeaponHouseRankShowPopupViewTab3.prototype, "AcWeaponHouseRankShowPopupViewTab3");
//# sourceMappingURL=AcWeaponHouseRankShowPopupViewTab3.js.map