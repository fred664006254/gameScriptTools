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
var ScorePopupView = (function (_super) {
    __extends(ScorePopupView, _super);
    function ScorePopupView() {
        return _super.call(this) || this;
    }
    ScorePopupView.prototype.initView = function () {
        this.initMessage();
        var txtBg = BaseBitmap.create("public_tc_bg02");
        txtBg.x = this.viewBg.width / 2 - txtBg.width / 2;
        txtBg.y = 15;
        this.addChildToContainer(txtBg);
        this._leftScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossCanUseScoreNumDesc", [this.getOwnScoreNum().toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._leftScoreTxt.x = txtBg.x + txtBg.width / 2 - this._leftScoreTxt.width / 2;
        this._leftScoreTxt.y = txtBg.y + txtBg.height / 2 - this._leftScoreTxt.height / 2 + 2;
        this.addChildToContainer(this._leftScoreTxt);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        bg.height = 610 + 27;
        bg.x = this.viewBg.width / 2 - bg.width / 2;
        bg.y = this._leftScoreTxt.y + this._leftScoreTxt.height + 30;
        this.addChildToContainer(bg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 600 + 10);
        this._scrollList = ComponentManager.getScrollList(this.getListItemClass(), this.getScoreDataList(), rect);
        this._scrollList.setPosition(bg.x + 5, bg.y + 5 + 7);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this.addChildToContainer(this._scrollList);
    };
    ScorePopupView.prototype.initMessage = function () {
    };
    ScorePopupView.prototype.refresh = function (e) {
        var data = e ? e.data : null;
        if (data.data.data && data.data.data.rewards) {
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
        }
        if (this._leftScoreTxt) {
            this._leftScoreTxt.text = LanguageManager.getlocal("dailybossCanUseScoreNumDesc", [this.getOwnScoreNum().toString()]);
        }
    };
    ScorePopupView.prototype.getListItemClass = function () {
        return ScorePopupListItem;
    };
    ScorePopupView.prototype.getScoreDataList = function () {
        return [];
    };
    ScorePopupView.prototype.getTitleStr = function () {
        return "dinnerExchangePopupViewTitle";
    };
    ScorePopupView.prototype.getOwnScoreNum = function () {
        return 0;
    };
    ScorePopupView.prototype.getBgExtraHeight = function () {
        return 70;
    };
    ScorePopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ScorePopupView;
}(PopupView));
__reflect(ScorePopupView.prototype, "ScorePopupView");
var ScorePopupListItem = (function (_super) {
    __extends(ScorePopupListItem, _super);
    function ScorePopupListItem() {
        var _this = _super.call(this) || this;
        _this._needTxt = null;
        _this._canNumTxt = null;
        _this._idx = 0;
        return _this;
    }
    ScorePopupListItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addNetMessage(this.getRequestType(), this.refresh, this);
        this._data = data;
        this._idx = index;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 520;
        bg.height = 139;
        bg.x = 5;
        this.addChild(bg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 139;
        leftBg.height = 120.5;
        leftBg.x = 11.5;
        leftBg.y = 5.5;
        this.addChild(leftBg);
        var icon = data.iconContainer;
        icon.x = 30;
        icon.y = leftBg.y + (leftBg.height - icon.height) / 2;
        this.addChild(icon);
        var taskNameBg = BaseBitmap.create("public_biaoti2");
        taskNameBg.x = icon.x + icon.width + 20;
        taskNameBg.y = icon.y + 3;
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        taskNameBg.width = nameTxt.width + 50;
        // taskNameBg.width = nameTxt.width + 100;
        nameTxt.setPosition(taskNameBg.x + taskNameBg.width / 2 - nameTxt.width / 2, taskNameBg.y + taskNameBg.height / 2 - nameTxt.height / 2);
        this.addChild(nameTxt);
        this.addChild(taskNameBg);
        var score = this.needScore();
        if (!score) {
            score = 0;
        }
        this._needTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossScoreShopNeedDesc", [score.toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._needTxt.setPosition(taskNameBg.x + 8, nameTxt.y + nameTxt.height + 20);
        this.addChild(this._needTxt);
        var limitType = this.limitType();
        if (limitType == null) {
            this._canNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossScoreShopExchangeNumDesc", [this.canExchangeNum().toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            this._canNumTxt.setPosition(this._needTxt.x, this._needTxt.y + this._needTxt.height + 12);
            this.addChild(this._canNumTxt);
        }
        else {
            switch (limitType) {
                case 0:
                    break;
                case 1:
                    this._canNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifebattleShopLimitNum1", [this.canExchangeNum().toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                    this._canNumTxt.setPosition(this._needTxt.x, this._needTxt.y + this._needTxt.height + 12);
                    this.addChild(this._canNumTxt);
                    break;
                case 2:
                    this._canNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifebattleShopLimitNum2", [this.canExchangeNum().toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                    this._canNumTxt.setPosition(this._needTxt.x, this._needTxt.y + this._needTxt.height + 12);
                    this.addChild(this._canNumTxt);
                    break;
                case 3:
                    this._canNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifebattleShopLimitNum3", [this.canExchangeNum().toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                    this._canNumTxt.setPosition(this._needTxt.x, this._needTxt.y + this._needTxt.height + 12);
                    this.addChild(this._canNumTxt);
                    break;
            }
        }
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.exchangeHandler, this);
        btn.x = bg.x + bg.width - btn.width - 10;
        btn.y = leftBg.y + (leftBg.height - btn.height * btn.scaleY) / 2;
        // btn.setPosition(bg.x+bg.width-btn.width-20,bg.y+(bg.height-btn.height)/2);
        this.addChild(btn);
    };
    ScorePopupListItem.prototype.limitType = function () {
        return null;
    };
    ScorePopupListItem.prototype.needScore = function () {
        return 0;
    };
    ScorePopupListItem.prototype.canExchangeNum = function () {
        if (this._data.limit) {
            return this._data.limit;
        }
        return 1;
    };
    ScorePopupListItem.prototype.getOwnScoreNum = function () {
        return Api.dailybossVoApi.getScore();
    };
    ScorePopupListItem.prototype.exchangeHandler = function () {
        if (this.getOwnScoreNum() < this.needScore()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
            return;
        }
        if (this.canExchangeNum() <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
            return;
        }
        NetManager.request(this.getRequestType(), { itemKey: this._data.id });
    };
    ScorePopupListItem.prototype.refresh = function () {
        var score = this.needScore();
        if (!score) {
            score = 0;
        }
        this._needTxt.text = LanguageManager.getlocal("dailybossScoreShopNeedDesc", [score.toString()]);
        if (this._canNumTxt) {
            var limitType = this.limitType();
            if (limitType == null) {
                this._canNumTxt.text = LanguageManager.getlocal("dailybossScoreShopExchangeNumDesc", [this.canExchangeNum().toString()]);
            }
            else {
                switch (limitType) {
                    case 1:
                        this._canNumTxt.text = LanguageManager.getlocal("wifebattleShopLimitNum1", [this.canExchangeNum().toString()]);
                        break;
                    case 2:
                        this._canNumTxt.text = LanguageManager.getlocal("wifebattleShopLimitNum2", [this.canExchangeNum().toString()]);
                        break;
                    case 3:
                        this._canNumTxt.text = LanguageManager.getlocal("wifebattleShopLimitNum3", [this.canExchangeNum().toString()]);
                        break;
                }
            }
        }
    };
    ScorePopupListItem.prototype.getRequestType = function () {
        return "重写getRequestType方法，返回cmd";
    };
    ScorePopupListItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(this.getRequestType(), this.refresh, this);
        this._needTxt = null;
        this._canNumTxt = null;
        this._idx = 0;
        _super.prototype.dispose.call(this);
    };
    return ScorePopupListItem;
}(ScrollListItem));
__reflect(ScorePopupListItem.prototype, "ScorePopupListItem");
