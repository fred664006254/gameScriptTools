var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 排行奖励
 * author wxz
 * date 2020.6.29
 * @class AcMouseGoldRewardPopViewTab1
 */
var AcMouseGoldRewardPopViewTab1 = /** @class */ (function (_super) {
    __extends(AcMouseGoldRewardPopViewTab1, _super);
    function AcMouseGoldRewardPopViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcMouseGoldRewardPopViewTab1.prototype.initView = function () {
        var _this = this;
        var rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 575;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);
        var baseView = ViewController.getInstance().getView("AcMouseGoldRewardPopView");
        var rankData = baseView.getMyRankData();
        var dataList = this.cfg.getRankItemCfg();
        var rect = new egret.Rectangle(0, 0, 530, 560);
        var scrollList = ComponentManager.getScrollList(AcMouseGoldRewardTab1ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(rewardBg.x, rewardBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        // 底部bg 
        var bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 530;
        bottomBg.height = 113;
        bottomBg.setPosition(rewardBg.x + rewardBg.width / 2 - bottomBg.width / 2, rewardBg.y + rewardBg.height + 10);
        this.addChild(bottomBg);
        // 我的排名 
        var myRank = null;
        var score = 0;
        if (rankData && rankData.myrankArr && rankData.myrankArr.myrank) {
            myRank = rankData.myrankArr.myrank;
            if (myRank > 10000) {
                myRank = "10000+";
            }
            if (rankData.myrankArr.value) {
                score = rankData.myrankArr.value;
            }
            else {
                score = this.vo.getProcessNum();
            }
        }
        else {
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankNotInRank", this.getTypeCode()));
            score = this.vo.getProcessNum();
        }
        var myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankMyRank", this.getTypeCode()), [String(myRank)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChild(myRankTF);
        //积分
        var myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankMyScore", this.getTypeCode()), [String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(myRankTF.x, myRankTF.y + myRankTF.height + 15);
        this.addChild(myScoreTF);
        //rank btn
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acMouseGoldDetailRankBtn", this.getTypeCode()), function () {
            if (!_this.vo.isStart) {
                _this.vo.showAcEndTip();
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSEGOLDRANKDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        rankBtn.setPosition(bottomBg.x + bottomBg.width - rankBtn.width - 20, bottomBg.y + bottomBg.height / 2 - rankBtn.height / 2);
        this.addChild(rankBtn);
    };
    AcMouseGoldRewardPopViewTab1.prototype.refreshView = function () {
    };
    Object.defineProperty(AcMouseGoldRewardPopViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseGoldRewardPopViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseGoldRewardPopViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseGoldRewardPopViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcMouseGoldRewardPopViewTab1.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcMouseGoldRewardPopViewTab1.prototype.dispose = function () {
        var view = this;
        view._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcMouseGoldRewardPopViewTab1;
}(CommonViewTab));
//# sourceMappingURL=AcMouseGoldRewardPopViewTab1.js.map