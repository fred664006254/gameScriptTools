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
 * 一键公务面板
 */
var AffairViewChoicePopupView = (function (_super) {
    __extends(AffairViewChoicePopupView, _super);
    function AffairViewChoicePopupView() {
        var _this = _super.call(this) || this;
        _this._useNum = 1;
        _this._maxNum = 0;
        _this._dragProgressBar = null;
        _this._checkFlagArray = [];
        _this._bg = null;
        _this._checkTypeNum = 1;
        _this._typeDes = null;
        _this._itemNum = 0;
        _this._selectionTxt = null;
        _this._bg1 = null;
        return _this;
    }
    AffairViewChoicePopupView.prototype.initView = function () {
        var itemId = this.param.data.itemId;
        var itemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
        this._useCallback = this.param.data.callback;
        this._handler = this.param.data.handler;
        var itemNum = 0;
        if (itemInfoVo && itemInfoVo.num) {
            itemNum = itemInfoVo.num;
            this._itemNum = itemNum;
        }
        this._maxNum = Api.manageVoApi.getCurAffairNums(); //+ itemNum;
        if (this._maxNum > 100) {
            this._maxNum = 100;
        }
        var effectTitle = LanguageManager.getlocal("effectTitle");
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 528;
        bg.height = 303;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this._bg = bg;
        this.addChildToContainer(bg);
        var temX = 35 + GameData.popupviewOffsetX;
        var temY = 50;
        var temW = 100;
        var temH = 120;
        //优先选择奖励文字
        var firstTF = ComponentManager.getTextField(LanguageManager.getlocal("affairfirst"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this.setLayoutPosition(LayoutConst.horizontalCentertop, firstTF, bg, [0, 11]);
        this.addChildToContainer(firstTF);
        var bg1 = BaseBitmap.create("public_9_bg1");
        bg1.width = 510;
        bg1.height = temH;
        bg1.x = 30 + GameData.popupviewOffsetX;
        bg1.y = temY;
        this._bg1 = bg1;
        this.addChildToContainer(bg1);
        this.showType();
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", this._maxNum, this.dragCallback, this);
        dragProgressBar.x = temX + 55;
        dragProgressBar.y = bg1.y + bg1.height + 27;
        this.addChildToContainer(dragProgressBar);
        this._dragProgressBar = dragProgressBar;
        var selectBox = ComponentManager.getCheckBox();
        selectBox.setPosition(100 + GameData.popupviewOffsetX, dragProgressBar.y + 45);
        this.addChildToContainer(selectBox);
        this._goldCheckBox = selectBox;
        this._goldCheckBox.addTouch(this.onClick, this);
        //type描述
        var typeDes = ComponentManager.getTextField(LanguageManager.getlocal("affairTypeDes1", [0 + "", itemNum + ""]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        typeDes.x = this._goldCheckBox.x + this._goldCheckBox.width + 5;
        typeDes.y = this._goldCheckBox.y + 9;
        this._typeDes = typeDes;
        this.addChildToContainer(typeDes);
        //type描述
        var typeDes2 = ComponentManager.getTextField(LanguageManager.getlocal("affairTypeDes2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, typeDes2, bg, [0, 10]);
        this.addChildToContainer(typeDes2);
        this._numBg = BaseBitmap.create("public_9_bg5");
        this._numBg.width = 100;
        this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
        this._numBg.y = bg1.y + bg1.height + 20;
        this.addChildToContainer(this._numBg);
        this._selectedNumTF = ComponentManager.getTextField(this._useNum + "", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
        this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        this._selectedNumTF.y = this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2;
        this.addChildToContainer(this._selectedNumTF);
        this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
        this._maxNumTF.y = this._numBg.y + this._numBg.height / 2 - this._maxNumTF.height / 2;
        this.addChildToContainer(this._maxNumTF);
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "affairViewTitle", this.useHandler, this);
        useBtn.x = bg.x + bg.width / 2 - useBtn.width / 2;
        useBtn.y = bg.y + bg.height + 25;
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(useBtn);
        this._dragProgressBar.setDragPercent(this._maxNum, this._maxNum);
    };
    AffairViewChoicePopupView.prototype.showType = function () {
        var posXArr = [97, 248, 399];
        if (PlatformManager.checkIsEnLang()) {
            posXArr = [97, 208, 369];
        }
        this._checkFlagArray = [];
        for (var i = 1; i < 4; i++) {
            //勾选底
            var probg = BaseBitmap.create("public_dot3");
            probg.x = posXArr[i - 1] + GameData.popupviewOffsetX;
            probg.y = 68;
            this.addChildToContainer(probg);
            //勾选状态
            this._checkFlag = BaseBitmap.create("public_dot4");
            this._checkFlag.x = probg.x;
            this._checkFlag.y = probg.y;
            this.addChildToContainer(this._checkFlag);
            if (i > 1) {
                this._checkFlag.alpha = 0;
            }
            this._checkTypeNum = 1;
            this._checkFlag.addTouchTap(this.changeCheckFlagStatus, this);
            this._checkFlagArray.push(this._checkFlag);
            //类型名字
            var typeName = ComponentManager.getTextField(LanguageManager.getlocal("affairReward" + i), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            typeName.x = posXArr[i - 1] + 33 + GameData.popupviewOffsetX;
            typeName.y = this._checkFlag.y + 2;
            this.addChildToContainer(typeName);
        }
        //选择描述
        this._selectionTxt = ComponentManager.getTextField(LanguageManager.getlocal("selectionDes"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._selectionTxt.width = 460;
        this._selectionTxt.x = 60 + GameData.popupviewOffsetX;
        this._selectionTxt.y = 110;
        this.addChildToContainer(this._selectionTxt);
        if (PlatformManager.checkIsEnLang()) {
            this._selectionTxt.y = 100;
        }
    };
    AffairViewChoicePopupView.prototype.changeCheckFlagStatus = function (e) {
        var currIndex = this._checkFlagArray.indexOf(e.currentTarget);
        for (var i = 0; i < this._checkFlagArray.length; i++) {
            this._checkFlagArray[i].alpha = 0;
        }
        this._checkFlagArray[currIndex].alpha = 1;
        this._checkTypeNum = currIndex + 1;
        // egret.log(this._checkTypeNum+"this._checkTypeNum");
    };
    AffairViewChoicePopupView.prototype.dragCallback = function (curNum) {
        if (curNum <= 1) {
            curNum = 1;
        }
        this._useNum = curNum;
        this._selectedNumTF.text = this._useNum + "/";
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        this._maxNumTF.text = this._maxNum + "";
        if (this._goldCheckBox.checkSelected() == true) {
            var num = 0;
            if (this._itemNum >= 100) {
                num = 100 - (this._maxNum - this._useNum);
            }
            else {
                num = this._useNum; //this._itemNum -(this._maxNum - this._useNum);
            }
            var newNum = num - Api.manageVoApi.getCurAffairNums();
            if (newNum > 0) {
                this._typeDes.text = LanguageManager.getlocal("affairTypeDes1", [(newNum) + "", this._itemNum + ""]);
            }
            else {
                this._typeDes.text = LanguageManager.getlocal("affairTypeDes1", [(0) + "", this._itemNum + ""]);
            }
        }
    };
    AffairViewChoicePopupView.prototype.onClick = function () {
        //未勾选状态下
        if (this._goldCheckBox.checkSelected() == true) {
            var currNum = Api.manageVoApi.getCurAffairNums();
            this._maxNum = currNum;
            this._dragProgressBar.setDragPercent(currNum, this._maxNum);
            this._typeDes.text = LanguageManager.getlocal("affairTypeDes1", [(0) + "", this._itemNum + ""]);
        }
        else {
            var num = Api.manageVoApi.getCurAffairNums();
            this._maxNum = num + this._itemNum;
            if (this._maxNum > 100) {
                var newNum = (100 - num);
                this._typeDes.text = LanguageManager.getlocal("affairTypeDes1", [newNum + "", this._itemNum + ""]);
            }
            else {
                this._typeDes.text = LanguageManager.getlocal("affairTypeDes1", [this._itemNum + "", this._itemNum + ""]);
            }
            if (this._maxNum > 100) {
                this._maxNum = 100;
            }
            this._dragProgressBar.setDragPercent(this._maxNum, this._maxNum);
        }
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
    };
    AffairViewChoicePopupView.prototype.useHandler = function (param) {
        var data = {};
        if (this._useNum - Api.manageVoApi.getCurAffairNums() >= 0) {
            data.useitemnum = this._useNum - Api.manageVoApi.getCurAffairNums();
        }
        else {
            data.useitemnum = 0;
        }
        data.totalnum = this._useNum;
        data.opt = this._checkTypeNum;
        this._useCallback.apply(this._handler, [data, this.param.data.itemId]);
        this.hide();
    };
    AffairViewChoicePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2_bg", "progress2"
        ]);
    };
    AffairViewChoicePopupView.prototype.clearcheckFlagArray = function () {
        if (this._checkFlagArray && this._checkFlagArray.length > 0) {
            for (var i = 0; i < this._checkFlagArray.length; i++) {
                var currBitmap = this._checkFlagArray[i];
                if (currBitmap && currBitmap.parent) {
                    currBitmap.parent.removeChild(currBitmap);
                    currBitmap.dispose();
                }
            }
        }
    };
    AffairViewChoicePopupView.prototype.dispose = function () {
        this.clearcheckFlagArray();
        this._bg = null;
        this._checkTypeNum = 1;
        this._handler = null;
        this._useCallback = null;
        this._useNum = 1;
        this._selectedNumTF = null;
        this._maxNumTF = null;
        this._maxNum = 0;
        this._numBg = null;
        this._goldCheckBox = null;
        this._dragProgressBar = null;
        this._checkFlag = null;
        this._checkFlagArray = [];
        this._typeDes = null;
        this._itemNum = 0;
        this._bg1 = null;
        _super.prototype.dispose.call(this);
    };
    return AffairViewChoicePopupView;
}(PopupView));
__reflect(AffairViewChoicePopupView.prototype, "AffairViewChoicePopupView");
//# sourceMappingURL=AffairViewChoicePopupView.js.map