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
 * 问卷调查
 */
var AcQuestionnaireView = (function (_super) {
    __extends(AcQuestionnaireView, _super);
    function AcQuestionnaireView() {
        var _this = _super.call(this) || this;
        _this._timeCountTxt = null;
        _this._topbg = null;
        _this._curPage = 0;
        _this._progress = null;
        _this._progressTxt = null;
        _this._maxPage = 0;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AcQuestionnaireView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionnaireView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionnaireView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcQuestionnaireView.prototype.getUiCode = function () {
        var currCode = "";
        switch (Number(this.code)) {
            default:
                currCode = "1";
                break;
        }
        return currCode;
    };
    /**
    * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
    */
    AcQuestionnaireView.prototype.getReportTipData = function () {
        return { title: { key: "acQuestionAnnonceTitle" }, msg: { key: "acQuestionAnnonceText" } };
    };
    AcQuestionnaireView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_QA_ANSWER), view.qaCallBack, view);
        view._curPage = 1;
        view._maxPage = Math.ceil(view.cfg.questionNum / 3);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_QA_FRESH, view.freshView, view);
        //top背景图
        var topbg = BaseBitmap.create("qatop-" + view.getUiCode());
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0, view.titleBg.height]);
        var tip1Text = ComponentManager.getTextField(LanguageManager.getlocal("acMotherDayTopTip1-1", [view.vo.acTimeAndHour]), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topbg, [228, 59]);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acqatip-" + view.code), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 395;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, tip1Text, [0, tip1Text.textHeight + 4]);
        //倒计时位置 
        var timebg = BaseBitmap.create("public_9_bg61");
        timebg.y = (topbg.y + topbg.height - 14);
        view._topbg = timebg;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y + 6;
        timebg.width = tip2Text.width + 50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = view._topbg.x + (view._topbg.width - view._timeCountTxt.width) * 0.5;
        //中部bg
        var midtop = BaseBitmap.create("dragonboattarbg");
        midtop.scaleX = 0.99;
        midtop.height = 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midtop, topbg, [0, topbg.height - 10]);
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 68;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        var midBg = BaseBitmap.create("public_9_bg22");
        midBg.width = 650;
        midBg.height = bottomBg.y - midtop.y - midtop.height + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midBg, midtop, [0, midtop.height - 10]);
        view.addChild(midBg);
        var rect = new egret.Rectangle(0, 0, 585, midBg.height - 40);
        var list = ComponentManager.getScrollList(AcQuestionItem, view.cfg.questionList, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, midBg, [0, 20]);
        view.addChild(list);
        view._list = list;
        list.setContentPosY(6);
        var nextBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acqacommit-" + view.code, function () {
            //提交
            if (view.vo.isActyEnd()) {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: LanguageManager.getlocal("acPunishEnd"),
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: true,
                    callback: function () {
                        view.hide();
                    },
                    handle: view
                });
            }
            else {
                view.getAnswer();
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nextBtn, bottomBg);
        view.addChild(nextBtn);
        // let prevBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acqapage1-${view.code}`, ()=>{
        //     //翻页
        // }, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, prevBtn, bottomBg, [85,0]);
        // view.addChild(prevBtn);
        // prevBtn.visible = false;
        view.addChild(midtop);
        view.addChild(topbg);
        view.addChild(tip1Text);
        view.addChild(timebg);
        view.addChild(tip2Text);
        view.addChild(tipTxt);
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 490);
        progress.setPercentage(0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progress, midtop, [25, 12]);
        view.addChild(progress);
        view._progress = progress;
        var progressTxt = ComponentManager.getTextField(LanguageManager.getlocal("acqaquestionjindu-" + view.code, ['0', view.cfg.questionNum.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progressTxt, progress, [16, -progressTxt.textHeight]);
        view.addChild(progressTxt);
        view._progressTxt = progressTxt;
        var rewardbtn = ComponentManager.getButton("qabox-" + view.getUiCode(), "", function () {
            //打开奖励弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACQUESTIONNAIREREWARDVIEW, {
                aid: _this.aid,
                code: _this.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rewardbtn, progress, [progress.width + 5, 0]);
        view.addChild(rewardbtn);
        view.setChildIndex(view.closeBtn, 9999);
        view.tick();
    };
    AcQuestionnaireView.prototype.freshView = function () {
        var view = this;
    };
    AcQuestionnaireView.prototype.tick = function () {
        var view = this;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._topbg.x = GameConfig.stageWidth - view._topbg.width - 12;
        view._timeCountTxt.x = view._topbg.x + (view._topbg.width - view._timeCountTxt.width) * 0.5;
        var totalNum = 0;
        for (var i = 1; i <= view.cfg.questionNum; ++i) {
            var item = view._list.getItemByIndex(i - 1);
            if (item && item.getIsAnswer()) {
                ++totalNum;
            }
        }
        view._progressTxt.text = LanguageManager.getlocal("acqaquestionjindu" + (totalNum == view.cfg.questionNum ? '2' : '') + "-" + view.code, [totalNum.toString(), view.cfg.questionNum.toString()]);
        view._progress.setPercentage(totalNum / view.cfg.questionNum);
    };
    AcQuestionnaireView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "questionnaire" + code, "arena_bottom", "dragonboattarbg",
            "progress3", "progress3_bg", "shield_cn"
        ]);
    };
    AcQuestionnaireView.prototype.getAnswer = function (save) {
        if (save === void 0) { save = false; }
        var view = this;
        var all = true;
        var answer1 = '';
        var answer2 = {};
        for (var i = 1; i <= view.cfg.questionNum; ++i) {
            var cfg = view.cfg.getQuestiuonCfgById(i);
            var item = view._list.getItemByIndex(i - 1);
            if (item) {
                var str = item.checkAnwser(save);
                if (save) {
                    if (!str.answer) {
                        str.answer = '';
                    }
                    view.vo.setQuestionAnswer(i, str.answer);
                }
                else {
                    if (str.answer) {
                        if (cfg.type == 3) {
                            answer2[i] = str.answer;
                        }
                        else {
                            answer1 += str.answer + "|";
                        }
                    }
                    else {
                        all = false;
                        item.showEffect();
                        view._list.setScrollTopByIndex(str.index);
                        break;
                    }
                }
            }
        }
        if (all && !save) {
            answer1 = answer1.slice(0, -1);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: LanguageManager.getlocal("acQuestionTip1-" + view.code),
                title: "itemUseConstPopupViewTitle",
                touchMaskClose: true,
                needCancel: true,
                callback: function () {
                    //发送
                    NetManager.request(NetRequestConst.REQUEST_QA_ANSWER, {
                        activeId: view.acTivityId,
                        answer1: answer1,
                        answer2: answer2
                    });
                },
                handle: view
            });
        }
    };
    AcQuestionnaireView.prototype.qaCallBack = function (evt) {
        var _this = this;
        var view = this;
        if (evt.data.data.ret == 0) {
            egret.Tween.get(this).wait(500).call(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: LanguageManager.getlocal("acQuestionTip2-" + view.code),
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: true,
                    callback: function () {
                        if (view) {
                            view.hide();
                        }
                    },
                    handle: view
                });
                egret.Tween.removeTweens(_this);
            }, view);
        }
    };
    AcQuestionnaireView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_QA_ANSWER), view.qaCallBack, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_QA_FRESH, view.freshView, view);
        //储存答案
        view.getAnswer(true);
        view._curPage = 1;
        view._maxPage = 0;
        view._topbg = null;
        view._timeCountTxt = null;
        view._progressTxt = null;
        view._progress = null;
        view._list = null;
        _super.prototype.dispose.call(this);
    };
    return AcQuestionnaireView;
}(AcCommonView));
__reflect(AcQuestionnaireView.prototype, "AcQuestionnaireView");
//# sourceMappingURL=AcQuestionnaireView.js.map