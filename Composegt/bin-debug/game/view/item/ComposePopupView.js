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
var ComposePopupView = (function (_super) {
    __extends(ComposePopupView, _super);
    function ComposePopupView() {
        var _this = _super.call(this) || this;
        _this._numTxtArr = [];
        _this._useNum = 1;
        _this._maxNum = 0;
        _this._isBatchCompose = false;
        return _this;
    }
    ComposePopupView.prototype.initView = function () {
        this._itemCfg = Config.ComposeCfg.getItemCfgById(this.getId(), Api.itemVoApi.getComposeVersion());
        var needItemCfgList = this._itemCfg.needItemCfgList;
        var itemId = needItemCfgList[0].id;
        var ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
        var needNum = this._itemCfg.getNeedItemNumById(itemId);
        //批量合成官服
        var can = ownNum / needNum;
        if (Number(this._itemCfg.itemId) >= 1701 && Number(this._itemCfg.itemId) <= 1721 && can >= 5) {
            this._isBatchCompose = true;
        }
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 528;
        if (this._isBatchCompose) {
            bg.height = 292 + 25 + 60;
        }
        else {
            bg.height = 292 + 25;
        }
        bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
        this.addChildToContainer(bg);
        var txtBg = BaseBitmap.create("public_tc_bg03");
        txtBg.width = 502;
        txtBg.height = 145;
        txtBg.setPosition(bg.x + (bg.width - txtBg.width) / 2, bg.y + 13);
        this.addChildToContainer(txtBg);
        var leftF = BaseBitmap.create("public_tcdw_bg01");
        leftF.x = txtBg.x + 5;
        leftF.y = 26;
        this.addChildToContainer(leftF);
        var rightF = BaseBitmap.create("public_tcdw_bg02");
        rightF.x = txtBg.x + txtBg.width - rightF.width - 5;
        rightF.y = 26;
        this.addChildToContainer(rightF);
        var icon = this._itemCfg.getIconContainer();
        icon.setPosition(txtBg.x + 10, txtBg.y + (txtBg.height - icon.height) / 2);
        this.addChildToContainer(icon);
        var nameTxt = this._itemCfg.nameTxt;
        nameTxt.setPosition(icon.x + icon.width + 10, icon.y);
        nameTxt.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(nameTxt);
        if (this._itemCfg.timeLimit) {
            var leftTime = Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
            this._leftTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("endTimeDesc", [App.DateUtil.getFormatBySecond(leftTime, 1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
            this._leftTimeTxt.setPosition(txtBg.x + txtBg.width - 200, nameTxt.y + (nameTxt.height - this._leftTimeTxt.height) / 2);
            this.addChildToContainer(this._leftTimeTxt);
            if (leftTime <= 0) {
                this._leftTimeTxt.text = LanguageManager.getlocal("composeLimitTimeEndDesc");
            }
        }
        var offY = nameTxt.y + nameTxt.height;
        if (this._itemCfg.composeLimit) {
            this._composeLimitTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeItemMaxNumDesc", [Api.itemVoApi.getComposeNumById(this._itemCfg.id) + "/" + this._itemCfg.composeLimit]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            this._composeLimitTxt.setPosition(nameTxt.x, nameTxt.y + nameTxt.height + 10);
            this.addChildToContainer(this._composeLimitTxt);
            offY = this._composeLimitTxt.y + this._composeLimitTxt.height;
        }
        var descTxt = this._itemCfg.getDescTxt(true);
        descTxt.width = txtBg.width - icon.x + txtBg.x - icon.width - 10 - 10;
        descTxt.setPosition(nameTxt.x, offY + 10);
        this.addChildToContainer(descTxt);
        if (this._isBatchCompose) {
            this._maxNum = Math.floor(can);
            if (this._maxNum > 100) {
                this._maxNum = 100;
            }
            var hh = 30;
            var dragProgressBar = ComponentManager.getDragProgressBar("progress4tc_01", "progress4tc_02", this._maxNum, this.dragCallback, this, null, null, 220);
            // dragProgressBar.width = 300;
            dragProgressBar.x = 35 + 110;
            dragProgressBar.y = txtBg.y + txtBg.height + 60 - hh;
            this.addChildToContainer(dragProgressBar);
            this._numBg = BaseBitmap.create("public_9_bg5");
            this._numBg.width = 90;
            this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
            this._numBg.y = txtBg.y + txtBg.height + 45 - hh;
            this.addChildToContainer(this._numBg);
            this._selectedNumTF = ComponentManager.getTextField(this._useNum + "", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
            this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            this._selectedNumTF.y = this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2;
            this.addChildToContainer(this._selectedNumTF);
            this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
            // this._maxNumTF.x = this._numBg.x + this._numBg.width/2;
            this._maxNumTF.y = this._numBg.y + this._numBg.height / 2 - this._maxNumTF.height / 2;
            this.addChildToContainer(this._maxNumTF);
            var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
            this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
            this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        }
        var composeUseTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeCostDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        if (this._isBatchCompose) {
            composeUseTxt.setPosition(icon.x, txtBg.y + txtBg.height + 22 + 55);
        }
        else {
            composeUseTxt.setPosition(icon.x, txtBg.y + txtBg.height + 22);
        }
        this.addChildToContainer(composeUseTxt);
        var l = needItemCfgList.length;
        for (var i = 0; i < l; i++) {
            var icon_1 = needItemCfgList[i].getIconContainer(true);
            icon_1.setPosition(composeUseTxt.x + composeUseTxt.width + 10 + (icon_1.width + 5) * i, composeUseTxt.y);
            this.addChildToContainer(icon_1);
            // let iconBg:BaseBitmap=<BaseBitmap>icon.getChildByName("iconBg");
            // if(iconBg)
            // {
            // 	iconBg.addTouchTap((event:egret.TouchEvent,itemId:number|string)=>{
            // 		ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,itemId);
            // 	},GameData,[needItemCfgList[i].id]);
            // }
            var num = Api.itemVoApi.getItemNumInfoVoById(needItemCfgList[i].id);
            var numTxt = ComponentManager.getTextField(this.getComposeItemNumLocalStr(needItemCfgList[i].id), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            // numTxt.width=icon.width+10;
            if (numTxt.width > icon_1.width + 10) {
                numTxt.scaleX = (icon_1.width + 10) / numTxt.width;
            }
            numTxt.textAlign = egret.HorizontalAlign.CENTER;
            numTxt.setPosition(icon_1.x + (icon_1.width - numTxt.width * numTxt.scaleX) / 2, icon_1.y + icon_1.height + 2);
            numTxt.bindData = needItemCfgList[i].id;
            this.addChildToContainer(numTxt);
            this._numTxtArr.push(numTxt);
        }
        if (this._itemCfg.needGem) {
            var icon_2 = GameData.getRewardItemIconByIdAndType(ItemEnums.gem, null, true);
            icon_2.setPosition(composeUseTxt.x + composeUseTxt.width + 10 + (icon_2.width + 5) * (needItemCfgList.length), composeUseTxt.y); //txtBg.y+txtBg.height+5);
            this.addChildToContainer(icon_2);
            var num = Api.playerVoApi.getPlayerGem();
            var str = "";
            var ownNum_1 = num;
            var needNum_1 = this._itemCfg.needGem;
            str = "(" + ownNum_1 + "/" + needNum_1 + ")";
            if (ownNum_1 >= needNum_1) {
                str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN2);
            }
            else {
                str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
            }
            var numTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            // numTxt.width=icon.width+10;
            if (numTxt.width > icon_2.width + 10) {
                numTxt.scaleX = (icon_2.width + 10) / numTxt.width;
            }
            numTxt.textAlign = egret.HorizontalAlign.CENTER;
            numTxt.setPosition(icon_2.x + (icon_2.width - numTxt.width * numTxt.scaleX) / 2, icon_2.y + icon_2.height + 2);
            numTxt.bindData = ItemEnums.gem;
            this.addChildToContainer(numTxt);
            this._numTxtArr.push(numTxt);
        }
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "composeBtn", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width * composeBtn.scaleX) / 2, bg.y + bg.height + 15);
        this.addChildToContainer(composeBtn);
    };
    ComposePopupView.prototype.dragCallback = function (curNum) {
        this._useNum = curNum;
        this._selectedNumTF.text = this._useNum + "";
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        this.refresh();
    };
    ComposePopupView.prototype.tick = function () {
        var leftTime = Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
        if (leftTime > 0) {
            if (this._leftTimeTxt) {
                this._leftTimeTxt.text = LanguageManager.getlocal("endTimeDesc", [App.DateUtil.getFormatBySecond(leftTime, 1)]);
            }
        }
        else {
            if (this._leftTimeTxt) {
                this._leftTimeTxt.dispose();
                this._leftTimeTxt.text = LanguageManager.getlocal("composeLimitTimeEndDesc");
            }
        }
    };
    ComposePopupView.prototype.composeHandler = function () {
        var needItemNameStr = this.checkNeedItemName();
        if (needItemNameStr) {
            App.CommonUtil.showTip(LanguageManager.getlocal("resNotEnoughDesc", [needItemNameStr]));
            return;
        }
        else {
            if (this._itemCfg.composeLimit) {
                if (Api.itemVoApi.getComposeNumById(this._itemCfg.id) >= this._itemCfg.composeLimit) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("composeMaxNumDesc"));
                    return;
                }
            }
            if (this._itemCfg.timeLimit) {
                var leftTime = Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
                if (leftTime <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("composeLimitTimeEndDesc"));
                    return;
                }
            }
            var version = Api.itemVoApi.getComposeVersion();
            if (this._isBatchCompose) {
                this.request(NetRequestConst.REQUEST_ITEM_DOCOMPOSE, { version: version, composeid: this._itemCfg.id, targetnum: this._useNum });
            }
            else {
                this.request(NetRequestConst.REQUEST_ITEM_DOCOMPOSE, { version: version, composeid: this._itemCfg.id });
            }
        }
    };
    ComposePopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data.rewards) {
                App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
            }
            App.MessageHelper.dispatchNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE + this._itemCfg.id);
            this.refresh();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND, {});
            if (this._isBatchCompose) {
                this.hide();
            }
        }
    };
    ComposePopupView.prototype.refresh = function () {
        if (this._numTxtArr) {
            var l = this._numTxtArr.length;
            for (var i = 0; i < l; i++) {
                if (Number(this._numTxtArr[i].bindData) == 1) {
                    var num = Api.playerVoApi.getPlayerGem();
                    var str = "";
                    var ownNum = num;
                    var needNum = this._itemCfg.needGem;
                    str = "(" + ownNum + "/" + needNum + ")";
                    if (ownNum >= needNum) {
                        str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN2);
                    }
                    else {
                        str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
                    }
                    this._numTxtArr[i].text = str;
                }
                else {
                    this._numTxtArr[i].text = this.getComposeItemNumLocalStr(this._numTxtArr[i].bindData);
                }
            }
        }
        if (this._composeLimitTxt) {
            this._composeLimitTxt.text = LanguageManager.getlocal("composeItemMaxNumDesc", [Api.itemVoApi.getComposeNumById(this._itemCfg.id) + "/" + this._itemCfg.composeLimit]);
        }
    };
    ComposePopupView.prototype.checkNeedItemName = function () {
        var needItemCfgList = this._itemCfg.needItemCfgList;
        var l = needItemCfgList.length;
        var isEnough = true;
        var needItemNameStr = "";
        for (var i = 0; i < l; i++) {
            var itemId = needItemCfgList[i].id;
            var ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
            var needNum = this._itemCfg.getNeedItemNumById(itemId);
            if (ownNum < needNum) {
                if (needItemNameStr == "") {
                    needItemNameStr += needItemCfgList[i].name;
                }
                else {
                    needItemNameStr += "," + needItemCfgList[i].name;
                }
            }
        }
        if (this._itemCfg.needGem) {
            var ownNum = Api.playerVoApi.getPlayerGem();
            var needNum = this._itemCfg.needGem;
            if (ownNum < needNum) {
                if (needItemNameStr == "") {
                    needItemNameStr += Config.RewardCfg.getNameByTypeAndId(ItemEnums.gem);
                }
                else {
                    needItemNameStr += "," + Config.RewardCfg.getNameByTypeAndId(ItemEnums.gem);
                }
            }
        }
        return needItemNameStr;
    };
    ComposePopupView.prototype.getComposeItemNumLocalStr = function (itemId) {
        var str = "";
        var ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
        var needNum = this._itemCfg.getNeedItemNumById(itemId);
        if (this._isBatchCompose) {
            needNum = needNum * this._useNum;
        }
        str = "(" + ownNum + "/" + needNum + ")";
        if (ownNum >= needNum) {
            str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN2);
        }
        else {
            str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
        }
        return str;
    };
    ComposePopupView.prototype.getId = function () {
        return this.param.data;
    };
    ComposePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "progress2_bg","progress2"
            "progress4tc_01", "progress4tc_02"
        ]);
    };
    ComposePopupView.prototype.dispose = function () {
        if (this._itemCfg.timeLimit) {
            var leftTime = Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
            if (leftTime <= 0) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2);
            }
        }
        this._itemCfg = null;
        this._numTxtArr.length = 0;
        this._leftTimeTxt = null;
        this._composeLimitTxt = null;
        this._useNum = 1;
        this._selectedNumTF = null;
        this._maxNumTF = null;
        this._maxNum = 0;
        this._numBg = null;
        this._isBatchCompose = false;
        _super.prototype.dispose.call(this);
    };
    return ComposePopupView;
}(PopupView));
__reflect(ComposePopupView.prototype, "ComposePopupView");
