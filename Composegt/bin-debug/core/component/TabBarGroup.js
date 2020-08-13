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
 * 页签按钮组
 * author dmj
 * date 2017/9/12
 * @class TabBarGroup
 */
var TabBarGroup = (function (_super) {
    __extends(TabBarGroup, _super);
    function TabBarGroup() {
        var _this = _super.call(this) || this;
        /**按钮之间间距 */
        _this._space = 12;
        /**当前选中按钮的索引 */
        _this._selectedIndex = 0;
        return _this;
    }
    /**
     * 初始化TabBar
     * @param buttonName     按钮图片名称
     * @param textArr        所有按钮显示文字
     * @param callback       按钮回调函数
     * @param handler        按钮所属对象
     * @param param          参数
     */
    TabBarGroup.prototype.init = function (buttonName, textArr, callback, handler, param, showPic) {
        this._callback = callback;
        this._handler = handler;
        this._param = param;
        this._align = TabBarGroup.ALIGN_HORIZONTAL;
        if (textArr.length > 0) {
            this._tbArr = new Array();
            for (var i = 0; i < textArr.length; i++) {
                var btnName = "";
                if (typeof (buttonName) == "string") {
                    btnName = buttonName;
                }
                else {
                    btnName = buttonName[i];
                }
                var tb = new TabBar();
                var fontSize = TextFieldConst.FONTSIZE_TITLE_COMMON;
                if (PlatformManager.checkIsKRSp() || PlatformManager.checkIsKRNewSp()) {
                    fontSize = TextFieldConst.FONTSIZE_TITLE_SMALL;
                }
                if (PlatformManager.checkIsViSp()) {
                    fontSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
                }
                if (showPic) {
                    tb.init(btnName, '', this.clickButtonHandler, this, null, fontSize);
                }
                else {
                    tb.init(btnName, textArr[i], this.clickButtonHandler, this, null, fontSize);
                }
                //tb.init(btnName,textArr[i],this.clickButtonHandler,this,null,fontSize);
                this.addChild(tb);
                this._tbArr.push(tb);
            }
            this.buildTabTar();
            this.updateState(this._selectedIndex);
        }
    };
    Object.defineProperty(TabBarGroup.prototype, "selectedIndex", {
        /**
         * 设置默认选中的按钮
         */
        set: function (index) {
            this._selectedIndex = index;
            this.updateState(this._selectedIndex);
        },
        enumerable: true,
        configurable: true
    });
    TabBarGroup.prototype.setColor = function (color, selectedColor) {
        this._color = color;
        this._selectedColor = selectedColor;
        this.updateState(this._selectedIndex);
    };
    /**设置按钮排布方式 */
    TabBarGroup.prototype.setAligh = function (align) {
        this._align = align;
        this.buildTabTar();
    };
    /**设置按钮间距 */
    TabBarGroup.prototype.setSpace = function (space) {
        this._space = space;
        this.buildTabTar();
    };
    /**
     * 按钮间添加分割线
     * @param lineImage
     */
    TabBarGroup.prototype.addLine = function (lineImage) {
        for (var i = 0; i < this._tbArr.length; i++) {
            var tb = this._tbArr[i];
            if (tb) {
                var lineSp = BaseBitmap.create(lineImage);
                if (this._align == TabBarGroup.ALIGN_HORIZONTAL) {
                    lineSp.x = tb.x + tb.width + this._space / 2 - lineSp.width / 2;
                    lineSp.y = tb.y + tb.height / 2 - lineSp.height / 2;
                }
                else {
                    lineSp.x = tb.x + tb.width / 2 - lineSp.width / 2;
                    lineSp.y = tb.y + tb.height + this._space / 2 - lineSp.height / 2;
                }
                this.addChild(lineSp);
            }
        }
        switch (this._align) {
            case TabBarGroup.ALIGN_HORIZONTAL:
                break;
            case TabBarGroup.ALIGN_VERTICAL:
                break;
        }
    };
    TabBarGroup.prototype.addRedPoint = function (index, icon, isLeft, offX, offY) {
        var l = this._tbArr.length;
        for (var i = 0; i < l; i++) {
            if (i == index) {
                App.CommonUtil.addIconToBDOC(this._tbArr[i], icon, isLeft, offX, offY);
            }
        }
    };
    TabBarGroup.prototype.removeRedPoint = function (index) {
        var l = this._tbArr.length;
        for (var i = 0; i < l; i++) {
            if (i == index) {
                App.CommonUtil.removeIconFromBDOC(this._tbArr[i]);
            }
        }
    };
    TabBarGroup.prototype.setLocked = function (index, isLocked) {
        for (var i = 0; i < this._tbArr.length; i++) {
            if (i == index) {
                this._tbArr[i].setLocked(isLocked);
            }
        }
    };
    /**
     * 添加状态图标，如：红点
     * @param index 索引
     * @param icon
     */
    TabBarGroup.prototype.showStatusIcon = function (index, icon, isLeft) {
        if (icon === void 0) { icon = ""; }
        for (var i = 0; i < this._tbArr.length; i++) {
            if (i == index) {
                // this._tbArr[i].showStatusIcon(icon);
                App.CommonUtil.addIconToBDOC(this._tbArr[i], icon, isLeft);
            }
        }
    };
    /**
     * 移除状态图标
     * @param index
     */
    TabBarGroup.prototype.removeStatusIcon = function (index) {
        for (var i = 0; i < this._tbArr.length; i++) {
            if (i == index) {
                // this._tbArr[i].removeStatusIcon();
                App.CommonUtil.removeIconFromBDOC(this._tbArr[i]);
            }
        }
    };
    /**构建TabBar */
    TabBarGroup.prototype.buildTabTar = function () {
        var temWidth = 0;
        var temHeight = 0;
        switch (this._align) {
            case TabBarGroup.ALIGN_HORIZONTAL:
                for (var i = 0; i < this._tbArr.length; i++) {
                    var tb = this._tbArr[i];
                    if (tb) {
                        temHeight = tb.height;
                        tb.x = (tb.width + this._space) * i;
                        tb.y = 0;
                        if (i == 0) {
                            temWidth += tb.width;
                        }
                        else {
                            temWidth += tb.width + this._space;
                        }
                    }
                }
                this.width = temWidth;
                this.height = temHeight;
                break;
            case TabBarGroup.ALIGN_VERTICAL:
                for (var i = 0; i < this._tbArr.length; i++) {
                    var tb = this._tbArr[i];
                    if (tb) {
                        temWidth = tb.width;
                        tb.x = 0;
                        tb.y = (tb.height + this._space) * i;
                        if (i == 0) {
                            temHeight += tb.height;
                        }
                        else {
                            temHeight += tb.height + this._space;
                        }
                    }
                }
                this.width = temWidth;
                this.height = temHeight;
                break;
        }
    };
    /**点击TabBar处理 */
    TabBarGroup.prototype.clickButtonHandler = function (param) {
        var target;
        if (param) {
            target = param;
        }
        else {
            return;
        }
        var index = this._tbArr.indexOf(target);
        if (index == this._selectedIndex) {
            App.LogUtil.log("selected");
            return;
        }
        if (target.isLocked() == true) {
            target.setSelected(false);
        }
        else {
            this._selectedIndex = index;
            this.updateState(index);
        }
        this._callback.call(this._handler, { param: this._param, index: index });
    };
    /**更改TabBar状态 */
    TabBarGroup.prototype.updateState = function (selectedIndex) {
        for (var i = 0; i < this._tbArr.length; i++) {
            var tb = this._tbArr[i];
            if (tb) {
                if (i == selectedIndex) {
                    tb.setSelected(true);
                    tb.setColor(this._selectedColor);
                }
                else {
                    tb.setSelected(false);
                    tb.setColor(this._color);
                }
            }
        }
    };
    /** 获取一个按钮 */
    TabBarGroup.prototype.getTabBar = function (index) {
        return this._tbArr[index];
    };
    TabBarGroup.prototype.dispose = function () {
        if (this._tbArr) {
            for (var i = 0; i < this._tbArr.length; i++) {
                var tb = this._tbArr[i];
                tb.dispose();
                tb = null;
            }
            this._tbArr = null;
        }
        this._param = null;
        this._callback = null;
        this._handler = null;
        this._align = null;
        this._space = null;
        this._selectedIndex = null;
    };
    /**表示菜单横向排列 */
    TabBarGroup.ALIGN_HORIZONTAL = "horizontal";
    /**表示菜单竖向排列 */
    TabBarGroup.ALIGN_VERTICAL = "vertical";
    return TabBarGroup;
}(BaseDisplayObjectContainer));
__reflect(TabBarGroup.prototype, "TabBarGroup");
