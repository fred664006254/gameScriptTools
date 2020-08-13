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
 * date 2020.4.1
 * @class AcKiteDetailPopupViewTab1
 */
var AcKiteDetailPopupViewTab1 = (function (_super) {
    __extends(AcKiteDetailPopupViewTab1, _super);
    function AcKiteDetailPopupViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcKiteDetailPopupViewTab1.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_CHARGE, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 583;
        rewardBg.setPosition(46, 50);
        this.addChild(rewardBg);
        var baseView = ViewController.getInstance().getView("AcKiteDetailPopupView");
        var rankData = baseView.getMyRankData();
        var dataList = this.cfg.rankItemList;
        var rect = new egret.Rectangle(0, 0, 530, 570);
        var firstInfo = rankData.acrank.rankList[0];
        var scrollList = ComponentManager.getScrollList(AcKiteDetailPopupViewTab1ScrollItem, dataList, rect, { aid: this.aid, code: this.code, firstInfo: firstInfo });
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
        if (rankData && rankData.acrank && rankData.acrank.myrank) {
            if (rankData.acrank.myrank.myrank) {
                myRank = rankData.acrank.myrank.myrank;
                if (myRank > 10000) {
                    myRank = "10000+";
                }
            }
            else {
                myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankNotInRank", this.getTypeCode()));
            }
            if (rankData.acrank.myrank.value) {
                score = rankData.acrank.myrank.value * this.cfg.unitLength;
            }
            else {
                score = this.vo.maxhight * this.cfg.unitLength;
            }
        }
        else {
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankNotInRank", this.getTypeCode()));
        }
        var myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankMyRank", this.getTypeCode()), [String(myRank)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChild(myRankTF);
        //积分
        var myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankMyScore", this.getTypeCode()), [String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(myRankTF.x, myRankTF.y + myRankTF.height + 15);
        this.addChild(myScoreTF);
        //rank btn
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acKiteRankTitle", this.getTypeCode()), function () {
            if (!_this.vo.isStart) {
                _this.vo.showAcEndTip();
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACKITERANKDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        rankBtn.setPosition(bottomBg.x + bottomBg.width - rankBtn.width - 20, bottomBg.y + bottomBg.height / 2 - rankBtn.height / 2);
        this.addChild(rankBtn);
    };
    AcKiteDetailPopupViewTab1.prototype.refreshView = function () {
    };
    Object.defineProperty(AcKiteDetailPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcKiteDetailPopupViewTab1.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcKiteDetailPopupViewTab1.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        view._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcKiteDetailPopupViewTab1;
}(CommonViewTab));
__reflect(AcKiteDetailPopupViewTab1.prototype, "AcKiteDetailPopupViewTab1");
//# sourceMappingURL=AcKiteDetailPopupViewTab1.js.map