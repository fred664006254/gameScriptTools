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
 * 赌坊下注弹窗
 * author qianjun
 */
var AcGambleGemPopupView = (function (_super) {
    __extends(AcGambleGemPopupView, _super);
    // 滑动列表
    function AcGambleGemPopupView() {
        var _this = _super.call(this) || this;
        _this._gemNumBitMapTxt = null;
        _this._dragProgressBar = null;
        _this._curNum = 1;
        _this._numBg = null;
        _this._numTxt = null;
        return _this;
    }
    Object.defineProperty(AcGambleGemPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGambleGemPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGambleGemPopupView.prototype.initView = function () {
        var view = this;
        var code = view.param.data.code;
        var contentBg = BaseBitmap.create("public_9_bg4");
        contentBg.width = 545;
        contentBg.height = 440;
        contentBg.x = view.viewBg.x + view.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 20;
        view.addChildToContainer(contentBg);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("crossServerServantRule"), 24, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titleTxt, contentBg, [15, 20]);
        view.addChildToContainer(titleTxt);
        var descBg = BaseBitmap.create("public_9_probiginnerbg");
        descBg.width = 530;
        descBg.height = 230;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, contentBg, [0, 55]);
        view.addChildToContainer(descBg);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGambleRoundGemTip-" + view.param.data.code, [view.cfg.gambDeposit[0].toString(), view.cfg.gambDeposit[view.cfg.gambDeposit.length - 1].toString()]), 20);
        descTxt.lineSpacing = 15;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, descBg, [15, 20]);
        view.addChildToContainer(descTxt);
        //当前轮数
        for (var i = 1; i < 4; ++i) {
            //文本说明
            var color = '';
            switch (i) {
                case 1:
                    color = String(0xffffff);
                    break;
                case 2:
                    color = String(TextFieldConst.COLOR_WARN_GREEN);
                    break;
                case 3:
                    color = String(TextFieldConst.COLOR_QUALITY_ORANGE);
                    break;
            }
            var rounddescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGambleRoundRoundDesc-" + view.param.data.code, [i.toString(), color, (App.MathUtil.strip(view.cfg.gambPrize[i].stop.prize - 1)).toFixed(1), String(App.MathUtil.strip(view.cfg.gambPrize[i].wrong.prize * 100))]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rounddescTxt, descTxt, [0, descTxt.textHeight + 15 + (i - 1) * (32)]);
            view.addChildToContainer(rounddescTxt);
        }
        var myGemImg = BaseBitmap.create("gamblemygem1_" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myGemImg, descBg, [5, descBg.height + 20]);
        view.addChildToContainer(myGemImg);
        var param = view.cfg.gambDeposit[1] - view.cfg.gambDeposit[0];
        var minNum = view.cfg.gambDeposit[0] / param;
        var maxNum = view.cfg.gambDeposit[view.cfg.gambDeposit.length - 1] / param;
        var gemNumBitMap = ComponentManager.getBitmapText(String(view.cfg.gambDeposit[0]), "socre_fnt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemNumBitMap, myGemImg, [myGemImg.width + 10, 0]);
        view._gemNumBitMapTxt = gemNumBitMap;
        view.addChildToContainer(gemNumBitMap);
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", maxNum, view.dragCallback, view, null, 1, 285);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dragProgressBar, myGemImg, [55, myGemImg.height + 25]);
        dragProgressBar.setDragPercent(1, maxNum, minNum);
        view.addChildToContainer(dragProgressBar);
        view._dragProgressBar = dragProgressBar;
        var numBg = BaseBitmap.create("public_9_bg5");
        view.addChildToContainer(numBg);
        view._numBg = numBg;
        var numStr = view.cfg.gambDeposit[0] + "/<font color=0xffffff>" + maxNum * param + "</font>";
        var selectedNumTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChildToContainer(selectedNumTF);
        view._numTxt = selectedNumTF;
        numBg.width = selectedNumTF.textWidth + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numBg, dragProgressBar, [350, -5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectedNumTF, numBg);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'confirmBtn', function () {
            if (!view.vo.isInActy()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            //押注消息
            var gem = Api.playerVoApi.getPlayerGem();
            var param = view.cfg.gambDeposit[1] - view.cfg.gambDeposit[0];
            var num = view._curNum * param;
            if (gem < num) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acGambleNoGemTip-" + view.param.data.code));
            }
            else {
                view.vo._prevTime = view.vo.getCurTime();
                view.vo._prevRound = view.vo.getCurRound();
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_GAMBLEREWARD, {
                    "activeId": view.acTivityId,
                    "gemNum": num,
                    "bet": view.param.data.type
                });
                //App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ANNIVERS_REFRESH);
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, confirmBtn, contentBg, [0, contentBg.height + 10]);
        view.addChildToContainer(confirmBtn);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGambleRoundTip3-" + view.param.data.code), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, confirmBtn, [15, confirmBtn.height + 30]);
        view.addChildToContainer(tipTxt);
    };
    AcGambleGemPopupView.prototype.dragCallback = function (curNum) {
        var view = this;
        view._curNum = curNum;
        var param = view.cfg.gambDeposit[1] - view.cfg.gambDeposit[0];
        var maxNum = view.cfg.gambDeposit[view.cfg.gambDeposit.length - 1] / param;
        if (curNum == 0) {
            curNum = 1;
        }
        view._dragProgressBar.setDragPercent(curNum, maxNum, 1);
        view._gemNumBitMapTxt.text = (curNum * param).toString();
        var numStr = curNum * param + "/<font color=0xffffff>" + maxNum * param + "</font>";
        view._numTxt.text = numStr;
        view._numBg.width = view._numTxt.textWidth + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._numBg, view._dragProgressBar, [350, -5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._numTxt, view._numBg);
    };
    AcGambleGemPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'progress2', 'progress2_bg'
        ]);
    };
    AcGambleGemPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    AcGambleGemPopupView.prototype.getShowHeight = function () {
        return 598;
    };
    AcGambleGemPopupView.prototype.getShowWidth = function () {
        return 590;
    };
    Object.defineProperty(AcGambleGemPopupView.prototype, "acTivityId", {
        /**
         * 获取活动配置
         */
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGambleGemPopupView.prototype.closeHandler = function () {
        if (this.param.data.callback) {
            this.param.data.callback.apply(this.param.data.obj);
        }
        _super.prototype.hide.call(this);
    };
    AcGambleGemPopupView.prototype.dispose = function () {
        var view = this;
        view._gemNumBitMapTxt = null;
        view._dragProgressBar = null;
        view._curNum = 1;
        view._numBg = null;
        view._numTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcGambleGemPopupView;
}(PopupView));
__reflect(AcGambleGemPopupView.prototype, "AcGambleGemPopupView");
//# sourceMappingURL=AcGambleGemPopupView.js.map