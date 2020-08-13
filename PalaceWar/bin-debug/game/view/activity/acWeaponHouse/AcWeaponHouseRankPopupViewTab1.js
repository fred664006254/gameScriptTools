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
 * @class AcWeaponHouseRankPopupViewTab1
 */
var AcWeaponHouseRankPopupViewTab1 = (function (_super) {
    __extends(AcWeaponHouseRankPopupViewTab1, _super);
    function AcWeaponHouseRankPopupViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcWeaponHouseRankPopupViewTab1.prototype.initView = function () {
        var _this = this;
        var rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 583;
        rewardBg.setPosition(26, 53);
        this.addChild(rewardBg);
        var baseView = ViewController.getInstance().getView("AcWeaponHouseRankPopupView");
        var rankData = baseView.getMyrank();
        var dataList = this.cfg.getRankOneItemList();
        var rect = new egret.Rectangle(0, 0, 530, 570);
        var scrollList = ComponentManager.getScrollList(AcWeaponHouseRankScrollItem1, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(rewardBg.x, rewardBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        // 底部bg 
        var bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 530;
        bottomBg.height = 112;
        bottomBg.setPosition(rewardBg.x + rewardBg.width / 2 - bottomBg.width / 2, rewardBg.y + rewardBg.height + 2);
        this.addChild(bottomBg);
        // 我的排名 
        var myRank = null;
        var score = 0;
        if (rankData && rankData.myrank) {
            myRank = rankData.myrank;
            if (myRank > 10000) {
                myRank = "10000+";
            }
            if (rankData.myrank.value) {
                score = rankData.myrank.value;
            }
            else {
                score = this.vo.getScoreNum();
            }
        }
        else {
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeRankNotInRank", this.getTypeCode()));
            score = this.vo.getScoreNum();
        }
        var myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_ranking_title", this.getTypeCode()), [String(myRank)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChild(myRankTF);
        //积分
        var myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankGrade_title", this.getTypeCode()), [String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(myRankTF.x, myRankTF.y + myRankTF.height + 15);
        this.addChild(myScoreTF);
        //rank btn
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acWeaponHouse_rankOneList_title", this.getTypeCode()), function () {
            if (!_this.vo.isStart) {
                _this.vo.showAcEndTip();
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONHOUSERANKSHOWPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        rankBtn.setPosition(bottomBg.x + bottomBg.width - rankBtn.width - 20, bottomBg.y + bottomBg.height / 2 - rankBtn.height / 2);
        this.addChild(rankBtn);
    };
    AcWeaponHouseRankPopupViewTab1.prototype.refreshView = function () {
    };
    Object.defineProperty(AcWeaponHouseRankPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankPopupViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankPopupViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponHouseRankPopupViewTab1.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcWeaponHouseRankPopupViewTab1.prototype.dispose = function () {
        var view = this;
        view._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHouseRankPopupViewTab1;
}(CommonViewTab));
__reflect(AcWeaponHouseRankPopupViewTab1.prototype, "AcWeaponHouseRankPopupViewTab1");
//# sourceMappingURL=AcWeaponHouseRankPopupViewTab1.js.map