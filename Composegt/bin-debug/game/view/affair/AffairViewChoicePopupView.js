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
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 530;
        bg.height = 320;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        this._bg = bg;
        var bg2 = BaseBitmap.create("public_tc_bg03");
        bg2.width = 510;
        bg2.height = 134;
        bg2.x = this.viewBg.x + this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = 180;
        this.addChildToContainer(bg2);
        var temX = 35;
        var temY = 50;
        var temW = 100;
        var temH = 120;
        //优先选择奖励文字
        var firstTF = ComponentManager.getTextField(LanguageManager.getlocal("affairfirst"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        // this.setLayoutPosition(LayoutConst.horizontalCentertop,firstTF,bg,[0,11]);
        firstTF.x = bg2.x + 30;
        firstTF.y = bg2.y + 10;
        this.addChildToContainer(firstTF);
        // let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
        // bg1.width = 510;
        // bg1.height = temH;
        // bg1.x = 30;
        // bg1.y = temY;
        // this._bg1 =bg1;
        // this.addChildToContainer(bg1);
        this.showType();
        var dragProgressBar = ComponentManager.getDragProgressBar("progress4tc_01", "progress4tc_02", this._maxNum, this.dragCallback, this, null, null, 240);
        dragProgressBar.x = bg.x + 95;
        dragProgressBar.y = bg.y + 30;
        this.addChildToContainer(dragProgressBar);
        this._dragProgressBar = dragProgressBar;
        var selectBox = ComponentManager.getCheckBox();
        selectBox.setPosition(100, dragProgressBar.y + 45);
        this.addChildToContainer(selectBox);
        this._goldCheckBox = selectBox;
        this._goldCheckBox.addTouch(this.onClick, this);
        //type描述
        var typeDes = ComponentManager.getTextField(LanguageManager.getlocal("affairTypeDes1", [0 + "", itemNum + ""]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        typeDes.x = selectBox.x + selectBox.width + 5;
        typeDes.y = dragProgressBar.y + 50;
        this._typeDes = typeDes;
        this.addChildToContainer(typeDes);
        //type描述
        var typeDes2 = ComponentManager.getTextField(LanguageManager.getlocal("affairTypeDes2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        typeDes2.x = typeDes.x;
        typeDes2.y = typeDes.y + typeDes.height + 9;
        this.addChildToContainer(typeDes2);
        if (this._selectionTxt.y + this._selectionTxt.height >= bg.y + bg.height - 20) {
            bg.height = this._selectionTxt.y + this._selectionTxt.height + 15;
            bg2.height = bg.height - 180;
        }
        this._numBg = BaseBitmap.create("public_9_bg5");
        this._numBg.width = 100;
        this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
        this._numBg.y = bg.y + 20;
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
        useBtn.y = bg.y + bg.height + 15;
        useBtn.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(useBtn);
        this._dragProgressBar.setDragPercent(this._maxNum, this._maxNum);
    };
    AffairViewChoicePopupView.prototype.showType = function () {
        var posXArr = [97, 248, 399];
        this._checkFlagArray = [];
        for (var i = 1; i < 4; i++) {
            //勾选底
            // let probg = BaseBitmap.create("public_dot3");
            // probg.x =posXArr[i-1];
            // probg.y = 68;
            // this.addChildToContainer(probg);
            // //勾选状态
            // this._checkFlag = BaseBitmap.create("public_dot4");
            // this._checkFlag.x = probg.x;
            // this._checkFlag.y = probg.y;
            // this.addChildToContainer(this._checkFlag); 
            var selectBox = ComponentManager.getCheckBox(null, true);
            selectBox.setPosition(posXArr[i - 1], 215);
            this.addChildToContainer(selectBox);
            if (i == 1) {
                selectBox.setSelected(true);
            }
            this._checkTypeNum = 1;
            // this._checkFlag.addTouchTap(this.changeCheckFlagStatus,this);
            selectBox.addTouch(this.changeCheckFlagStatus, this);
            this._checkFlagArray.push(selectBox);
            //类型名字
            var typeName = ComponentManager.getTextField(LanguageManager.getlocal("affairReward" + i), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            typeName.x = posXArr[i - 1] + selectBox.width + 5;
            typeName.y = selectBox.y + 8;
            this.addChildToContainer(typeName);
        }
        //选择描述
        this._selectionTxt = ComponentManager.getTextField(LanguageManager.getlocal("selectionDes"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._selectionTxt.width = 460;
        this._selectionTxt.x = 80;
        this._selectionTxt.y = 260;
        this.addChildToContainer(this._selectionTxt);
    };
    AffairViewChoicePopupView.prototype.changeCheckFlagStatus = function (e) {
        var currIndex = this._checkFlagArray.indexOf(e.currentTarget);
        if (this._checkTypeNum == currIndex + 1 || !this._checkFlagArray[currIndex]) {
            return;
        }
        // for(let i:number =0;i<this._checkFlagArray.length; i++)
        // {
        this._checkFlagArray[this._checkTypeNum - 1].setSelected(false);
        // }
        this._checkFlagArray[currIndex].setSelected(true);
        this._checkTypeNum = currIndex + 1;
        // egret.log(this._checkTypeNum+"this._checkTypeNum"+currIndex);
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
                num = this._itemNum - (this._maxNum - this._useNum);
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
            "progress2_bg", "progress2",
            "progress4tc_01", "progress4tc_02"
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
