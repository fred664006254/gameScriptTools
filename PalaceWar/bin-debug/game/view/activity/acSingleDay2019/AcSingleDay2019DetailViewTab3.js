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
/*
author : qinajun
*/
var AcSingleDay2019DetailViewTab3 = (function (_super) {
    __extends(AcSingleDay2019DetailViewTab3, _super);
    function AcSingleDay2019DetailViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._timeTxt = null;
        _this._rankTxt = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcSingleDay2019DetailViewTab3.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcSingleDay2019DetailViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019DetailViewTab3.prototype.refreshWhenSwitchBack = function () {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK, {
            activeId: this.acTivityId,
        });
    };
    AcSingleDay2019DetailViewTab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK), this.update, this);
        var baseview = ViewController.getInstance().getView('AcSingleDay2019DetailView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var topdescbg = BaseBitmap.create("newsingledaytab3bg-" + code);
        view.addChild(topdescbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg, view, [0, 5], true);
        var line = BaseBitmap.create("newsingledaytab1line-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0, -10]);
        view.addChild(line);
        //body
        var userBody = BaseLoadBitmap.create("user_body_full_" + this.cfg.getTitle());
        userBody.width = 382;
        userBody.height = 618;
        userBody.mask = new egret.Rectangle(0, 0, 382, 300);
        userBody.setPosition(topdescbg.x + 10, topdescbg.y + 70);
        this.addChild(userBody);
        userBody.setScale(0.8);
        //userHead
        var head = Api.playerVoApi.getUserHeadContainer();
        head.setScale(0.8);
        head.setPosition(106, 0);
        this.addChild(head);
        /**衣装预览 start */
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(65, 180);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        skinTxtEffect.addTouchTap(function () {
            var rewardId = view.cfg.getTitle();
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, { titleIds: [rewardId], bgType: 3, topMsg: LanguageManager.getlocal("acSingleDay2019Tip4-" + code) });
        }, this);
        var skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(165, 257);
        this.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
        this.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        /**衣装预览 end */
        var activity_rank_rightBg = BaseBitmap.create("activity_rank_rightBg");
        activity_rank_rightBg.height = 250;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, activity_rank_rightBg, topdescbg, [5, 20]);
        view.addChild(activity_rank_rightBg);
        var activity_rank_rightBg2 = BaseBitmap.create("public_9_managebg");
        activity_rank_rightBg2.width = activity_rank_rightBg.width - 30;
        activity_rank_rightBg2.height = 170;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, activity_rank_rightBg2, activity_rank_rightBg, [0, 15]);
        view.addChild(activity_rank_rightBg2);
        var acTimeTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        var stTxt = App.DateUtil.getFormatBySecond(view.vo.st, 7);
        var etTxt = App.DateUtil.getFormatBySecond(view.vo.et - view.cfg.extraTime * 86400, 7);
        var timeStr = App.DateUtil.getOpenLocalTime(view.vo.st, view.vo.et, true);
        acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        acTimeTxt.width = activity_rank_rightBg2.width - 10;
        acTimeTxt.text = view.vo.getAcLocalTime(true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acTimeTxt, activity_rank_rightBg2, [10, 5]);
        view.addChild(acTimeTxt);
        var deltaT = "<font color=" + (view.vo.isInActivity() ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2) + ">" + view.vo.acCountDown + "</font>";
        var acCDTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewAcTime-1", [deltaT]), 18, TextFieldConst.COLOR_BROWN);
        view._timeTxt = acCDTxt;
        view.addChild(acCDTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acCDTxt, acTimeTxt, [0, acTimeTxt.textHeight + 5]);
        var rankDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay2019AcRankDesc-" + code, [view.cfg.needGemCost.toString(), view.cfg.getMaxRank().toString()]), 18, TextFieldConst.COLOR_BROWN);
        rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 6;
        rankDescTxt.width = acTimeTxt.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankDescTxt, acCDTxt, [0, acCDTxt.textHeight + 5]);
        view.addChild(rankDescTxt);
        var rankV = view.vo.getMyPrank();
        var str = '';
        if (rankV == 0) {
            str = LanguageManager.getlocal('atkracedes4');
        }
        else {
            str = rankV.toString();
        }
        var myRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRank_myrank1", [str]), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, myRankTxt, activity_rank_rightBg2, [0, 5]);
        view.addChild(myRankTxt);
        view._rankTxt = myRankTxt;
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRankBtnTxt", function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAY2019RANKPOPUPVIEW, { "aid": view.aid, "code": view.code });
            }, view);
            rankListBtn.x = activity_rank_rightBg2.x + activity_rank_rightBg2.width / 2 - rankListBtn.width / 2;
            rankListBtn.y = activity_rank_rightBg2.y + activity_rank_rightBg2.height + 5;
            this.addChild(rankListBtn);
        }
        var tablebg = BaseBitmap.create("newsingledaytab2bg-" + code);
        tablebg.height = view.height - topdescbg.height;
        view.addChild(tablebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tablebg, topdescbg, [0, topdescbg.height + 5]);
        var vo = this.vo;
        var objList = vo.getArr("gemRank"); //
        var tmpRect = new egret.Rectangle(0, 0, 627, view.height - topdescbg.height - 30);
        var scrollList = ComponentManager.getScrollList(AcSingleDay2019RankItem, objList, tmpRect, view.code);
        view._list = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, tablebg, [0, 5]);
        view.addChild(scrollList);
        scrollList.bounces = false;
        TickManager.addTick(this.tick, this);
    };
    AcSingleDay2019DetailViewTab3.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var rankV = view.vo.getMyPrank();
        var str = '';
        if (rankV == 0) {
            str = LanguageManager.getlocal('atkracedes4');
        }
        else {
            str = rankV.toString();
        }
        view._rankTxt.text = LanguageManager.getlocal("acRank_myrank1", [str]);
    };
    AcSingleDay2019DetailViewTab3.prototype.tick = function () {
        var view = this;
        var deltaT = "<font color=" + (view.vo.isInActivity() ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2) + ">" + view.vo.acCountDown + "</font>";
        view._timeTxt.text = LanguageManager.getlocal("acBeautyVoteViewAcTime-1", [deltaT]);
    };
    AcSingleDay2019DetailViewTab3.prototype.dispose = function () {
        var view = this;
        TickManager.removeTick(this.tick, this);
        view._list = null;
        view._timeTxt = null;
        view._rankTxt = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK), this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019DetailViewTab3;
}(CommonViewTab));
__reflect(AcSingleDay2019DetailViewTab3.prototype, "AcSingleDay2019DetailViewTab3");
//# sourceMappingURL=AcSingleDay2019DetailViewTab3.js.map