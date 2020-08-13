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
 * 双11  累计消费 item
 * @author 张朝阳
 * date 2018/10/24
 * @class AcSingleDayBuild1ViewTab3ScrollItem
 */
var AcSingleDayBuild1ViewTab3ScrollItem = (function (_super) {
    __extends(AcSingleDayBuild1ViewTab3ScrollItem, _super);
    function AcSingleDayBuild1ViewTab3ScrollItem() {
        var _this = _super.call(this) || this;
        _this._progressBar = null;
        _this._receiveBtn = null;
        _this._receiveBM = null;
        _this._consumeBtn = null;
        _this.vo = null;
        _this._data = null;
        return _this;
    }
    AcSingleDayBuild1ViewTab3ScrollItem.prototype.initItem = function (index, data, itemParm) {
        this.vo = itemParm.vo;
        this._data = data;
        var bg = BaseBitmap.create("public_9v_bg04");
        bg.width = GameConfig.stageWidth - 20;
        this.addChild(bg);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab3ItemTitle", [data.needGem]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xa87e00);
        titleTxt.setPosition(bg.x + bg.width / 2 - titleTxt.width / 2, bg.y + 15);
        this.addChild(titleTxt);
        var leftLine = BaseBitmap.create("public_v_huawen01");
        leftLine.setPosition(titleTxt.x - leftLine.width - 10, titleTxt.y + titleTxt.height / 2 - leftLine.height / 2);
        this.addChild(leftLine);
        var rightLine = BaseBitmap.create("public_v_huawen01");
        rightLine.anchorOffsetX = rightLine.width / 2;
        rightLine.anchorOffsetY = rightLine.height / 2;
        rightLine.rotation = 180;
        rightLine.setPosition(titleTxt.x + titleTxt.width + rightLine.width / 2 + 10, titleTxt.y + titleTxt.height / 2);
        this.addChild(rightLine);
        var rewardVoList = GameData.formatRewardItem(data.getReward);
        var rewardBg = BaseBitmap.create("public_listshotbg");
        rewardBg.width = bg.width;
        rewardBg.height = 30 + 115 * (Math.floor(rewardVoList.length / 6) + 1);
        rewardBg.setPosition(bg.x, titleTxt.y + titleTxt.height + 10);
        this.addChild(rewardBg);
        bg.height = rewardBg.height + 125;
        for (var i = 0; i < rewardVoList.length; i++) {
            var itemDB = GameData.getItemIcon(rewardVoList[i], true, false);
            itemDB.setPosition(rewardBg.x + 15 + (itemDB.width + 15) * (i % 5), rewardBg.y + 15 + (itemDB.height + 15) * Math.floor(i / 5));
            this.addChild(itemDB);
        }
        this._progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 435);
        this._progressBar.setPosition(rewardBg.x + 15, rewardBg.y + rewardBg.height + 30);
        this.addChild(this._progressBar);
        this._progressBar.setPercentage(this.vo.getUseGemNum() / Number(data.needGem), LanguageManager.getlocal("acSingleDayBuild1ViewTab2ItemProgressText", [this.vo.getUseGemNum(), data.needGem]));
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.rechargeClick, this);
        this._receiveBtn.setPosition(rewardBg.x + rewardBg.width - this._receiveBtn.width - 20, rewardBg.y + rewardBg.height + 15);
        this.addChild(this._receiveBtn);
        this._consumeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acSingleDayBuild1ViewTab3ItemGoConsume", this.consumeClick, this);
        this._consumeBtn.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._consumeBtn.width / 2, this._receiveBtn.y + this._receiveBtn.height / 2 - this._consumeBtn.height / 2);
        this.addChild(this._consumeBtn);
        this._receiveBM = BaseBitmap.create("collectflag");
        this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width / 2, this._receiveBtn.y + this._receiveBtn.height / 2 - this._receiveBM.height / 2);
        this.addChild(this._receiveBM);
        if (this.vo.isGetConsume(data.key)) {
            this._receiveBM.setVisible(true);
            this._receiveBtn.setVisible(false);
            this._consumeBtn.setVisible(false);
        }
        else if (this.vo.getUseGemNum() >= Number(data.needGem)) {
            this._receiveBM.setVisible(false);
            this._receiveBtn.setVisible(true);
            this._consumeBtn.setVisible(false);
        }
        else {
            this._consumeBtn.setVisible(true);
            this._receiveBM.setVisible(false);
            this._receiveBtn.setVisible(false);
            if (!this.vo.isInActivity()) {
                this._consumeBtn.setEnable(false);
            }
        }
    };
    AcSingleDayBuild1ViewTab3ScrollItem.prototype.consumeClick = function () {
        if (this.vo.isActivityEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYSKINVIEW, { aid: this.vo.aid, code: this.vo.code });
    };
    AcSingleDayBuild1ViewTab3ScrollItem.prototype.rechargeClick = function () {
        if (this.vo.isActivityEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        NetManager.request(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_REWARD, { activeId: this.vo.aidAndCode, mType: 1, rkey: this._data.key });
    };
    AcSingleDayBuild1ViewTab3ScrollItem.prototype.refreashView = function () {
    };
    AcSingleDayBuild1ViewTab3ScrollItem.prototype.dispose = function () {
        this._progressBar = null;
        this._receiveBM = null;
        this._receiveBtn = null;
        this.vo = null;
        this._data = null;
        this._consumeBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayBuild1ViewTab3ScrollItem;
}(ScrollListItem));
__reflect(AcSingleDayBuild1ViewTab3ScrollItem.prototype, "AcSingleDayBuild1ViewTab3ScrollItem");
