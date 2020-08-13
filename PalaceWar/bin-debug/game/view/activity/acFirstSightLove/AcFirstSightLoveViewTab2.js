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
 * 真情好礼
 * author ycg
 * date 2019.10.17
 * @class AcFirstSightLoveViewTab2
 */
var AcFirstSightLoveViewTab2 = (function (_super) {
    __extends(AcFirstSightLoveViewTab2, _super);
    function AcFirstSightLoveViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._progress = null;
        _this._proNum = null;
        _this._slider = null;
        _this._boxLeftNum = null;
        _this._boxRightNum = null;
        _this._proLight = null;
        _this._heartNum = null;
        _this._heartIcon = null;
        _this._infoBg = null;
        _this._isGetReward = false;
        _this._proNumBg = null;
        egret.callLater(_this.initView, _this);
        return _this;
    }
    AcFirstSightLoveViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETREWARD, this.requestCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, this.getInfoCallback, this);
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.requestGetInfo, this);
        var parentView = ViewController.getInstance().getView("AcFirstSightLoveView");
        App.LogUtil.log("parent tab1: " + parentView.getChildShowHeight());
        this.width = GameConfig.stageWidth;
        this.height = parentView.getChildShowHeight();
        var infoBgStr = ResourceManager.hasRes("ac_firstsightlove_truth_infobg-" + this.getTypeCode()) ? "ac_firstsightlove_truth_infobg-" + this.getTypeCode() : "ac_firstsightlove_truth_infobg-1";
        var infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.width / 2 - infoBg.width / 2, 15);
        this.addChild(infoBg);
        this._infoBg = infoBg;
        var proContainer = new BaseDisplayObjectContainer();
        proContainer.setPosition(infoBg.x + 32, infoBg.y + 10);
        this.addChild(proContainer);
        var proBlockNum = this.vo.getTotalLoveNumBlock();
        var percent = (this.vo.getTotalLove() - proBlockNum.min) / (proBlockNum.max - proBlockNum.min);
        if (percent > 1) {
            percent = 1;
        }
        else if (percent < 0) {
            percent = 0;
        }
        var progress = ComponentManager.getProgressBar("progress12", "progress12_bg", 400);
        proContainer.addChild(progress);
        progress.setPercentage(percent);
        this._progress = progress;
        //进度亮光
        var proLight = BaseBitmap.create("acwealthcomingview_progresslight");
        proContainer.addChild(proLight);
        this._proLight = proLight;
        //box left
        var boxLeft = BaseBitmap.create("acwealthcomingview_box_1");
        boxLeft.setPosition(0, 0);
        proContainer.addChild(boxLeft);
        //左边宝箱数量
        var boxLeftNumBg = BaseBitmap.create("ac_firstsightlove_numbg");
        boxLeftNumBg.setPosition(boxLeft.x + boxLeft.width / 2 - boxLeftNumBg.width / 2, boxLeft.y + boxLeft.height - 15);
        proContainer.addChild(boxLeftNumBg);
        var boxLeftNum = ComponentManager.getTextField("" + proBlockNum.min, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        boxLeftNum.anchorOffsetX = boxLeftNum.width / 2;
        boxLeftNum.setPosition(boxLeftNumBg.x + boxLeftNumBg.width / 2, boxLeftNumBg.y + boxLeftNumBg.height / 2 - boxLeftNum.height / 2);
        proContainer.addChild(boxLeftNum);
        this._boxLeftNum = boxLeftNum;
        progress.setPosition(boxLeft.x + boxLeft.width - 7, boxLeft.y + boxLeft.height / 2 - progress.height / 2 + 15);
        proLight.setPosition(progress.x + progress.width * progress.getPercent() - proLight.width, progress.y + progress.height / 2 - proLight.height / 2);
        //右边宝箱
        var boxRight = BaseBitmap.create("acwealthcomingview_box_1");
        boxRight.setPosition(progress.x + progress.width - 7, boxLeft.y);
        proContainer.addChild(boxRight);
        //右边宝箱数量
        var boxRightNumBg = BaseBitmap.create("ac_firstsightlove_numbg");
        boxRightNumBg.setPosition(boxRight.x + boxRight.width / 2 - boxRightNumBg.width / 2, boxRight.y + boxRight.height - 15);
        proContainer.addChild(boxRightNumBg);
        var boxRightNum = ComponentManager.getTextField("" + proBlockNum.max, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        boxRightNum.anchorOffsetX = boxRightNum.width / 2;
        boxRightNum.setPosition(boxRightNumBg.x + boxRightNumBg.width / 2, boxRightNumBg.y + boxRightNumBg.height / 2 - boxLeftNum.height / 2);
        proContainer.addChild(boxRightNum);
        this._boxRightNum = boxRightNum;
        //进度指标
        var slider = BaseBitmap.create("ac_firstsightlove_slider");
        proContainer.addChild(slider);
        this._slider = slider;
        slider.setPosition(progress.x + progress.width * progress.getPercent() - slider.width / 2, progress.y - slider.height + 3);
        //当前进度
        var proNumBg = BaseBitmap.create("ac_firstsightlove_numbg");
        proNumBg.setPosition(slider.x + slider.width / 2 - proNumBg.width / 2, slider.y - proNumBg.height + 12);
        proContainer.addChild(proNumBg);
        this._proNumBg = proNumBg;
        var proNum = ComponentManager.getTextField("" + this.vo.getTotalLove(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        proContainer.addChild(proNum);
        this._proNum = proNum;
        proNum.setPosition(slider.x + slider.width / 2 - proNum.width / 2, proNumBg.y + proNumBg.height / 2 - proNumBg.height / 2);
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveTruthDesc-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        acDesc.width = infoBg.width - 40;
        acDesc.lineSpacing = 5;
        acDesc.setPosition(infoBg.x + infoBg.width / 2 - acDesc.width / 2, infoBg.y + 120);
        this.addChild(acDesc);
        //倾心值
        var heartIconStr = ResourceManager.hasRes("ac_firstsightlove_loveitem-" + this.getTypeCode()) ? "ac_firstsightlove_loveitem-" + this.getTypeCode() : "ac_firstsightlove_loveitem-1";
        var heartIcon = BaseBitmap.create(heartIconStr);
        this.addChild(heartIcon);
        this._heartIcon = heartIcon;
        var heartNum = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveHeartNum-" + this.getTypeCode(), [String(this.vo.getCurrLove())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this.addChild(heartNum);
        heartIcon.setPosition(infoBg.x + infoBg.width / 2 - heartIcon.width / 2 - heartNum.width / 2, infoBg.y + infoBg.height - heartIcon.height - 18);
        heartNum.setPosition(heartIcon.x + heartIcon.width, heartIcon.y + heartIcon.height / 2 - heartNum.height / 2);
        this._heartNum = heartNum;
        this.refreshWhenSwitchBack();
        var listBg = BaseBitmap.create("public_9_probiginnerbg");
        listBg.width = this.width - 30;
        listBg.height = this.height - infoBg.y - infoBg.height - 30;
        listBg.setPosition(infoBg.x + infoBg.width / 2 - listBg.width / 2, infoBg.y + infoBg.height + 5);
        this.addChild(listBg);
        var dataList = this.cfg.festivalList2;
        var rect = new egret.Rectangle(0, 0, listBg.width - 20, listBg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcFirstSightLoveViewScrollItem2, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(listBg.x + 10, listBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        var rewardId = this.vo.getCurrRewardId();
        scrollList.setScrollTopByIndex(rewardId, 400);
    };
    AcFirstSightLoveViewTab2.prototype.requestCallback = function (evt) {
        var rData = evt.data.data.data;
        if (rData) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
            this._isGetReward = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, { activeId: this.vo.aidAndCode });
            var rewObj = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    };
    AcFirstSightLoveViewTab2.prototype.getInfoCallback = function (evt) {
        var rData = evt.data.data.data;
        if (rData) {
            App.LogUtil.log("tab2 getInfoCallback");
            this.vo.totalLove = rData.totalv;
            this.refreshView();
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    };
    AcFirstSightLoveViewTab2.prototype.refreshView = function () {
        App.LogUtil.log("tab2 getInfo refreshView");
        var totalLove = this.vo.getTotalLove();
        var loveBlock = this.vo.getTotalLoveNumBlock();
        this._boxLeftNum.text = "" + loveBlock.min;
        this._boxRightNum.text = "" + loveBlock.max;
        this._proNum.text = "" + totalLove;
        var per = (totalLove - loveBlock.min) / (loveBlock.max - loveBlock.min);
        if (per > 1) {
            per = 1;
        }
        else if (per < 0) {
            per = 0;
        }
        this._progress.setPercentage(per);
        this._heartNum.text = "" + this.vo.getCurrLove();
        this._slider.setPosition(this._progress.x + this._progress.width * this._progress.getPercent() - this._slider.width / 2, this._progress.y - this._slider.height + 3);
        this._proLight.setPosition(this._progress.x + this._progress.width * this._progress.getPercent() - this._proLight.width, this._progress.y + this._progress.height / 2 - this._proLight.height / 2);
        this._proNumBg.x = this._slider.x + this._slider.width / 2 - this._proNumBg.width / 2;
        this._proNum.x = this._slider.x + this._slider.width / 2 - this._proNum.width / 2;
        this._heartNum.text = LanguageManager.getlocal("acFirstSightLoveHeartNum-" + this.getTypeCode(), [String(this.vo.getCurrLove())]);
        this._heartIcon.setPosition(this._infoBg.x + this._infoBg.width / 2 - this._heartIcon.width / 2 - this._heartNum.width / 2, this._infoBg.y + this._infoBg.height - this._heartIcon.height - 18);
        this._heartNum.setPosition(this._heartIcon.x + this._heartIcon.width, this._heartIcon.y + this._heartIcon.height / 2 - this._heartNum.height / 2);
        var dataList = this.cfg.festivalList2;
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
        if (!this._isGetReward) {
            var rewardId = this.vo.getCurrRewardId();
            App.LogUtil.log("tab2 rewardid scorll; " + rewardId);
            this._scrollList.setScrollTopByIndex(rewardId, 400);
            this._isGetReward = false;
        }
    };
    AcFirstSightLoveViewTab2.prototype.refreshWhenSwitchBack = function () {
        App.LogUtil.log("tab2  refreshWhenSwitchBack");
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, { activeId: this.vo.aidAndCode });
    };
    AcFirstSightLoveViewTab2.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcFirstSightLoveViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFirstSightLoveViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFirstSightLoveViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETREWARD, this.requestCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, this.getInfoCallback, this);
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.requestGetInfo, this);
        this._scrollList = null;
        this._slider = null;
        this._proLight = null;
        this._proNum = null;
        this._progress = null;
        this._boxLeftNum = null;
        this._boxRightNum = null;
        this._heartIcon = null;
        this._heartNum = null;
        this._infoBg = null;
        this._isGetReward = false;
        this._proNumBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcFirstSightLoveViewTab2;
}(AcCommonViewTab));
__reflect(AcFirstSightLoveViewTab2.prototype, "AcFirstSightLoveViewTab2");
//# sourceMappingURL=AcFirstSightLoveViewTab2.js.map