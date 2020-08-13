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
// TypeScript file
var DropToggleGroup = (function (_super) {
    __extends(DropToggleGroup, _super);
    function DropToggleGroup(btnNameArray, btnCallback, handler) {
        var _this = _super.call(this) || this;
        _this._lastDropIdx = 1;
        _this._btnNameArray = btnNameArray;
        _this._btnCallback = btnCallback;
        _this._callbackHandler = handler;
        _this.initBtnList();
        return _this;
    }
    DropToggleGroup.prototype.initBtnList = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        this._dropBtnList = [];
        this._dropDownBtn = ComponentManager.getButton("servant_dropBtn", "", this.dropDownBtnClickHandler, this, [0]);
        this._dropDownBtn.x = 0;
        this._dropDownBtn.y = 0;
        this._dropDownBtn.setColor(DropToggleGroup.DROPBTN_COLOR1);
        this._nodeContainer.addChild(this._dropDownBtn);
        this._dropDownBtn.setText(this._btnNameArray[0]);
        this._dropBtnList.push(this._dropDownBtn);
        this._dropDownFlag = BaseBitmap.create("servant_dropIcon");
        this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height / 2;
        this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width - this._dropDownFlag.width - 3;
        this._dropDownFlag.y = this._dropDownBtn.y + this._dropDownBtn.height - this._dropDownFlag.height / 2 - 10;
        this._nodeContainer.addChild(this._dropDownFlag);
        this._dropDownContainer = new BaseDisplayObjectContainer();
        this._dropDownContainer.visible = false;
        this._dropDownContainer.x = this._dropDownBtn.x;
        this._dropDownContainer.y = this._dropDownBtn.y + this._dropDownBtn.height;
        this._nodeContainer.addChild(this._dropDownContainer);
        for (var index = 1; index <= 4; index++) {
            var tmpBtn = ComponentManager.getButton("servant_dropBtn", "", this.dropDownBtnClickHandler, this, [index]);
            this._dropBtnList.push(tmpBtn);
            if (index == 1) {
                tmpBtn.setColor(DropToggleGroup.DROPBTN_COLOR1);
            }
            else {
                tmpBtn.setColor(DropToggleGroup.DROPBTN_COLOR2);
            }
            tmpBtn.y = tmpBtn.height * (index - 1);
            this._dropDownContainer.addChild(tmpBtn);
            tmpBtn.setText(this._btnNameArray[index - 1]);
        }
    };
    DropToggleGroup.prototype.dropDownBtnClickHandler = function (btnIdx) {
        var tmpIdx = this._lastDropIdx;
        this._dropBtnList[1].setColor(DropToggleGroup.DROPBTN_COLOR2);
        this._dropBtnList[2].setColor(DropToggleGroup.DROPBTN_COLOR2);
        this._dropBtnList[3].setColor(DropToggleGroup.DROPBTN_COLOR2);
        this._dropBtnList[4].setColor(DropToggleGroup.DROPBTN_COLOR2);
        this._dropBtnList[this._lastDropIdx].setColor(DropToggleGroup.DROPBTN_COLOR1);
        if (this._dropDownContainer.visible) {
            this._dropDownFlag.scaleY = 1;
            this._dropDownContainer.visible = false;
        }
        else {
            this._dropDownFlag.scaleY = -1;
            this._dropDownContainer.visible = true;
        }
        if (btnIdx > 0) {
            this._dropDownBtn.setText(this._btnNameArray[btnIdx - 1]);
            this._lastDropIdx = btnIdx;
        }
        if (tmpIdx == this._lastDropIdx) {
            return;
        }
        if (this._btnCallback) {
            this._btnCallback.apply(this._callbackHandler, [btnIdx]);
        }
    };
    DropToggleGroup.prototype.dispose = function () {
        this._nodeContainer = null;
        this._dropDownContainer = null;
        this._dropDownBtn = null;
        this._dropDownFlag = null;
        this._dropBtnList = null;
        this._lastDropIdx = 1;
        _super.prototype.dispose.call(this);
    };
    DropToggleGroup.DROPBTN_COLOR1 = 0xfffcd8;
    DropToggleGroup.DROPBTN_COLOR2 = 0x99a3b4;
    return DropToggleGroup;
}(BaseDisplayObjectContainer));
__reflect(DropToggleGroup.prototype, "DropToggleGroup");
