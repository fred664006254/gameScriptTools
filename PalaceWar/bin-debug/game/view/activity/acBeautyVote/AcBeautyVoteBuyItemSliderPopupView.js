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
  * 花魁活动-- 买道具
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVotePlayerInfoPopupView
  */
var AcBeautyVoteBuyItemSliderPopupView = (function (_super) {
    __extends(AcBeautyVoteBuyItemSliderPopupView, _super);
    function AcBeautyVoteBuyItemSliderPopupView() {
        var _this = _super.call(this) || this;
        /**	购买回调 */
        _this._confirmCallback = null;
        /** 当前指向的函数 */
        _this._handler = null;
        /** 买的数量 */
        _this._buyNum = 1;
        /** 显示TF */
        _this._selectedNumTF = null;
        /** 最大购买数量 */
        _this._maxNum = 0;
        /** 显示的bg */
        _this._numBg = null;
        /** 提示的TF */
        _this._messageTF = null;
        /** 取消购买的Btn */
        _this._cancelBtn = null;
        /** 大的BG */
        _this._bg = null;
        /**
         * 所持有的数量
         */
        _this._playerNum = 0;
        /**
         * 商品的数量
         */
        _this._shopItemCost = 0;
        /**
         * 商品的名字
         */
        _this._shopItemName = null;
        /**
         * data用于Shopnewcfg的配置数据
         */
        _this._data = null;
        /**
         * 适用于shopnewcfg
         */
        _this._costSum = 0;
        /**
         * 滑动条
         */
        _this._dragProgressBar = null;
        _this._tipTF = null;
        return _this;
    }
    /**
     * 入口函数
     */
    AcBeautyVoteBuyItemSliderPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        this._maxNum = cfg.limit - vo.getBuyTimes();
        this._buyNum = 1 * cfg.getNum;
        this._playerNum = Api.playerVoApi.getPlayerGem();
        this._shopItemCost = cfg.cost[vo.getBuyTimes()];
        this._costSum = cfg.cost[vo.getBuyTimes()];
        this._shopItemName = LanguageManager.getlocal("acBeautyVoteView_itemName-" + code);
        this._bg = BaseBitmap.create("public_9_bg4");
        this._bg.width = 520;
        this._bg.height = 224;
        this._bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._bg.width / 2, 9);
        this.addChildToContainer(this._bg);
        var message = LanguageManager.getlocal("acBeautyVoteBuyItemSliderPopupViewMsg-" + code, [String(this._shopItemCost), String(this._buyNum), this._shopItemName]);
        this._messageTF = ComponentManager.getTextField(message, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._messageTF.width = 450;
        this._messageTF.textAlign = egret.HorizontalAlign.CENTER;
        this._messageTF.setPosition(this._bg.x + this._bg.width / 2 - this._messageTF.width / 2, this._bg.y + this._bg.height / 2 - this._messageTF.height - 40);
        this.addChildToContainer(this._messageTF);
        this._messageTF.lineSpacing = 7;
        this._dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", this._maxNum, this.dragCallback, this);
        this._dragProgressBar.setPosition(this._bg.x + 70, this._bg.y + this._bg.height - this._dragProgressBar.height - 70);
        this.addChildToContainer(this._dragProgressBar);
        this._numBg = BaseBitmap.create("public_9_bg5");
        this._numBg.width = 90;
        this._numBg.setPosition(this._bg.x + this._bg.width - 10 - this._numBg.width, this._dragProgressBar.y + this._dragProgressBar.height / 2 - this._numBg.height / 2 - 5);
        this.addChildToContainer(this._numBg);
        var numStr = String(this._buyNum) + "/" + String(this._maxNum * cfg.getNum);
        this._selectedNumTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        this._selectedNumTF.setPosition(this._numBg.x + this._numBg.width / 2 - this._selectedNumTF.width / 2, this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2);
        this.addChildToContainer(this._selectedNumTF);
        var cur_have = LanguageManager.getlocal("acBeautyVoteBuyItemSliderPopupViewitemUseNewTip-" + code, [String(this._playerNum)]);
        var cur_haveTF = ComponentManager.getTextField(cur_have, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        cur_haveTF.setPosition(this._bg.x + this._bg.width / 2 - cur_haveTF.width / 2, this._bg.y + this._bg.height - cur_haveTF.height - 30);
        this.addChildToContainer(cur_haveTF);
        //取消按钮
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 4 - this._cancelBtn.width / 2;
        this._cancelBtn.y = this._bg.y + this._bg.height + 15;
        this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
    };
    /**
     * 滑动条的监听事件
     */
    AcBeautyVoteBuyItemSliderPopupView.prototype.dragCallback = function (curNum) {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        this._buyNum = curNum * cfg.getNum;
        if (this._buyNum == 0) {
            this._dragProgressBar.setDragPercent(1, this._maxNum);
            this._buyNum = 1 * cfg.getNum;
        }
        var numStr = String(this._buyNum) + "/" + String(this._maxNum * cfg.getNum);
        this._selectedNumTF.text = numStr;
        this._selectedNumTF.setPosition(this._numBg.x + this._numBg.width / 2 - this._selectedNumTF.width / 2, this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2);
        var message = this.shopItemCost(this._buyNum);
        this._messageTF.text = message;
        // this._messageTF.setPosition(this._bg.x + this._bg.width / 2 - this._messageTF.width / 2, this._bg.y + this._bg.height / 2 - this._messageTF.height - 40);
    };
    /**
     * 商品价格递增的处理
     */
    AcBeautyVoteBuyItemSliderPopupView.prototype.shopItemCost = function (curNum) {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        this._costSum = 0;
        for (var i = 0; i < curNum; i++) {
            var buyNum = i + vo.getBuyTimes();
            this._costSum += cfg.cost[buyNum];
        }
        return LanguageManager.getlocal("acBeautyVoteBuyItemSliderPopupViewMsg-" + code, [String(this._costSum), String(this._buyNum), this._shopItemName]);
    };
    /**
     * 购买的事件处理
     */
    AcBeautyVoteBuyItemSliderPopupView.prototype.clickConfirmHandler = function (data) {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        if (this._costSum > this._playerNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            this.hide();
            return;
        }
        this.request(NetRequestConst.REQUEST_BEAUTYVOTE_BUYFLOWERS, { activeId: vo.aidAndCode, num: Math.round(this._buyNum / cfg.getNum) });
        this.hide();
    };
    AcBeautyVoteBuyItemSliderPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2_bg", "progress2"
        ]);
    };
    /**
     * 取消购买ƒ
     */
    AcBeautyVoteBuyItemSliderPopupView.prototype.clickCancelHandler = function (param) {
        this.hide();
    };
    /**
     * 设置当前高度
     */
    AcBeautyVoteBuyItemSliderPopupView.prototype.getShowHeight = function () {
        return 400;
    };
    AcBeautyVoteBuyItemSliderPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 4 * 3 - this._cancelBtn.width / 2 - 35, this._cancelBtn.y);
    };
    /**
     * 标题
     */
    AcBeautyVoteBuyItemSliderPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    /**设置按钮上文本的内容 */
    AcBeautyVoteBuyItemSliderPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    /**设置按钮的需要的图片 */
    AcBeautyVoteBuyItemSliderPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    AcBeautyVoteBuyItemSliderPopupView.prototype.dispose = function () {
        this._confirmCallback = null;
        this._handler = null;
        this._buyNum = 1;
        this._selectedNumTF = null;
        this._maxNum = 0;
        this._numBg = null;
        this._messageTF = null;
        this._cancelBtn = null;
        this._bg = null;
        this._playerNum = 0;
        this._shopItemCost = 0;
        this._shopItemName = null;
        this._data = null;
        this._costSum = null;
        this._dragProgressBar = null;
        this._tipTF = null;
        _super.prototype.dispose.call(this);
    };
    return AcBeautyVoteBuyItemSliderPopupView;
}(PopupView));
__reflect(AcBeautyVoteBuyItemSliderPopupView.prototype, "AcBeautyVoteBuyItemSliderPopupView");
//# sourceMappingURL=AcBeautyVoteBuyItemSliderPopupView.js.map