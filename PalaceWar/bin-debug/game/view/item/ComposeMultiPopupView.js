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
var ComposeMultiPopupView = (function (_super) {
    __extends(ComposeMultiPopupView, _super);
    function ComposeMultiPopupView() {
        var _this = _super.call(this) || this;
        _this._numTxtArr = [];
        _this._dragProgressBar = null;
        _this._numTxt = null;
        _this._numBg = null;
        _this._curNum = 0;
        return _this;
    }
    ComposeMultiPopupView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    ComposeMultiPopupView.prototype.initView = function () {
        this._itemCfg = Config.ComposeCfg.getItemCfgById(this.getId(), Api.itemVoApi.getComposeVersion());
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        //bg.height=292;
        bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
        this.addChildToContainer(bg);
        var txtBg = BaseBitmap.create("public_9_bg94");
        txtBg.width = 510;
        // txtBg.height = 142;
        txtBg.setPosition(bg.x + (bg.width - txtBg.width) / 2, bg.y + 10);
        this.addChildToContainer(txtBg);
        var icon = this._itemCfg.getIconContainer();
        icon.setPosition(txtBg.x + 10, txtBg.y + 10);
        this.addChildToContainer(icon);
        txtBg.height = icon.y + icon.height + 15 - txtBg.y;
        //public_titlebg
        var namebg = BaseBitmap.create("public_titlebg");
        namebg.setPosition(icon.x + icon.width + 10, icon.y);
        this.addChildToContainer(namebg);
        var nameTxt = ComponentManager.getTextField(this._itemCfg.name, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, namebg, [10, 0]);
        this.addChildToContainer(nameTxt);
        var offY = nameTxt.y + nameTxt.height;
        var descTxt = ComponentManager.getTextField((LanguageManager.getlocal("effectTitle") + this._itemCfg.desc), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
        descTxt.lineSpacing = 2; //this._itemCfg.getDescTxt(true);
        descTxt.width = txtBg.width - icon.x + txtBg.x - icon.width - 10 - 10;
        descTxt.setPosition(nameTxt.x, offY + 10);
        this.addChildToContainer(descTxt);
        txtBg.height = Math.max(descTxt.y + descTxt.textHeight + 15 - txtBg.y, txtBg.height);
        var composeUseTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeCostDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
        composeUseTxt.setPosition(icon.x, txtBg.y + txtBg.height + 15);
        this.addChildToContainer(composeUseTxt);
        var line = BaseBitmap.create("public_cut_line");
        this.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, bg, [0, 65]);
        var needItemCfgList = this._itemCfg.needItemCfgList;
        var l = needItemCfgList.length;
        for (var i = 0; i < l; i++) {
            var icon_1 = needItemCfgList[i].getIconContainer(true);
            icon_1.setPosition(composeUseTxt.x + 15 + (icon_1.width + 5) * i, composeUseTxt.y + composeUseTxt.height + 10);
            this.addChildToContainer(icon_1);
            icon_1.name = "icon" + i;
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
            if (i == l - 1) {
                line.y = numTxt.y + numTxt.textHeight + 5;
            }
        }
        // if(i == l - 1){
        // 	bg.height = numTxt.y + numTxt.textHeight + 10 - bg.y;
        // }
        var needId = this._itemCfg.needItemCfgList[0].id;
        var ownNum = Api.itemVoApi.getItemNumInfoVoById(needId);
        var needNum = this._itemCfg.getNeedItemNumById(needId);
        var maxNum = Math.min(Math.floor(ownNum / needNum), 100);
        var minNum = maxNum == 0 ? 0 : 1;
        this._curNum = minNum;
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", maxNum, this.dragCallback, this, null, 1, 285);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dragProgressBar, line, [-5, line.height + 10]);
        dragProgressBar.anchorOffsetX = -41;
        dragProgressBar.setDragPercent(1, maxNum, minNum);
        this.addChildToContainer(dragProgressBar);
        if (maxNum == 0) {
            dragProgressBar.touchEnabled = false;
            dragProgressBar.touchChildren = false;
        }
        var numBg = BaseBitmap.create("public_9_bg5");
        this.addChildToContainer(numBg);
        this._numBg = numBg;
        var numStr = minNum + "/<font color=0xffffff>" + maxNum + "</font>";
        var selectedNumTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        this.addChildToContainer(selectedNumTF);
        this._numTxt = selectedNumTF;
        numBg.width = selectedNumTF.textWidth + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numBg, dragProgressBar, [350, -5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectedNumTF, numBg);
        this.addChildToContainer(dragProgressBar);
        this._dragProgressBar = dragProgressBar;
        bg.height = dragProgressBar.y + dragProgressBar.height + 20 - bg.y;
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "composeBtn", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width) / 2, bg.y + bg.height + 5);
        this.addChildToContainer(composeBtn);
    };
    ComposeMultiPopupView.prototype.dragCallback = function (curNum) {
        var view = this;
        view._curNum = curNum;
        view.refresh(true);
        // let needId = this._itemCfg.needItemCfgList[0].id;
        // let ownNum:number=Api.itemVoApi.getItemNumInfoVoById(needId);
        // let needNum:number=this._itemCfg.getNeedItemNumById(needId);
        // let maxNum = Math.floor(ownNum/needNum);
        // let minNum = maxNum == 0 ? 0 : 1;
        // view._dragProgressBar.setDragPercent(curNum,maxNum,minNum);
        // // view._gemNumBitMapTxt.text = (curNum * param).toString();
        // let numStr = `${curNum}/<font color=0xffffff>${maxNum}</font>`;
        // view._numTxt.text = numStr;
        // view._numBg.width = view._numTxt.textWidth + 30;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._numBg, view._dragProgressBar, [350,-5]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._numTxt, view._numBg);
    };
    ComposeMultiPopupView.prototype.composeHandler = function () {
        var needItemNameStr = this.checkNeedItemName();
        if (needItemNameStr || this._curNum == 0) {
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
            this.request(NetRequestConst.REQUEST_ITEM_DOCOMPOSE, { version: version, composeid: this._itemCfg.id, num: this._curNum });
        }
    };
    ComposeMultiPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data.rewards) {
                App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
            }
            App.MessageHelper.dispatchNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE + this._itemCfg.id);
            this.refresh();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND, {});
        }
    };
    ComposeMultiPopupView.prototype.refresh = function (bool) {
        if (bool === void 0) { bool = false; }
        if (this._numTxtArr) {
            var l = this._numTxtArr.length;
            for (var i = 0; i < l; i++) {
                var numTxt = this._numTxtArr[i];
                var icon = this.container.getChildByName("icon" + i);
                numTxt.text = this.getComposeItemNumLocalStr(this._numTxtArr[i].bindData);
                if (numTxt.width > icon.width + 10) {
                    numTxt.scaleX = (icon.width + 10) / numTxt.width;
                }
                numTxt.setPosition(icon.x + (icon.width - numTxt.width * numTxt.scaleX) / 2, icon.y + icon.height + 2);
            }
        }
        var needId = this._itemCfg.needItemCfgList[0].id;
        var ownNum = Api.itemVoApi.getItemNumInfoVoById(needId);
        var needNum = this._itemCfg.getNeedItemNumById(needId);
        var maxNum = Math.min(Math.floor(ownNum / needNum), 100);
        var minNum = maxNum == 0 ? 0 : 1;
        if (!bool) {
            this._curNum = minNum;
            this._dragProgressBar.setDragPercent(this._curNum, maxNum, minNum);
        }
        if (maxNum == 0) {
            this._dragProgressBar.touchEnabled = false;
            this._dragProgressBar.touchChildren = false;
        }
        // view._gemNumBitMapTxt.text = (curNum * param).toString();
        var numStr = this._curNum + "/<font color=0xffffff>" + maxNum + "</font>";
        this._numTxt.text = numStr;
        this._numBg.width = this._numTxt.textWidth + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._numBg, this._dragProgressBar, [350, -5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._numTxt, this._numBg);
    };
    ComposeMultiPopupView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    ComposeMultiPopupView.prototype.checkNeedItemName = function () {
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
    ComposeMultiPopupView.prototype.getComposeItemNumLocalStr = function (itemId) {
        var str = "";
        var ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
        var needNum = this._itemCfg.getNeedItemNumById(itemId) * Math.max(this._curNum, 1);
        str = ownNum + "/" + needNum;
        if (ownNum >= needNum) {
            str = App.StringUtil.formatStringColor(str, 0x167b2e);
        }
        else {
            str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
        }
        return str;
    };
    ComposeMultiPopupView.prototype.getId = function () {
        return this.param.data;
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    ComposeMultiPopupView.prototype.getBgExtraHeight = function () {
        return 15;
    };
    ComposeMultiPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_namebg", "progress2", "progress2_bg"
        ]);
    };
    ComposeMultiPopupView.prototype.dispose = function () {
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
        this._dragProgressBar = null;
        this._numTxt = null;
        this._numBg = null;
        this._curNum = 0;
        _super.prototype.dispose.call(this);
    };
    return ComposeMultiPopupView;
}(PopupView));
__reflect(ComposeMultiPopupView.prototype, "ComposeMultiPopupView");
//# sourceMappingURL=ComposeMultiPopupView.js.map