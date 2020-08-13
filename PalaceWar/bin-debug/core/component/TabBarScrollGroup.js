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
var TabBarScrollGroup = (function (_super) {
    __extends(TabBarScrollGroup, _super);
    function TabBarScrollGroup() {
        var _this = _super.call(this) || this;
        //view的宽度
        _this._viewWidth = 0;
        // 一行几个
        _this._lineNum = 0;
        // 当前第几行
        _this._curLine = 1;
        _this._scrollWidth = 0;
        _this._leftBtn = null;
        _this._rightBtn = null;
        _this._maxnum = 0;
        return _this;
    }
    TabBarScrollGroup.prototype.initScroll = function (textArr, callback, handler, linenum, maxnum) {
        if (linenum) {
            this._lineNum = linenum;
        }
        if (maxnum) {
            this._maxnum = maxnum;
        }
        _super.prototype.init.call(this, "btn_tab_small", textArr, callback, handler);
    };
    /**构建TabBar */
    TabBarScrollGroup.prototype.buildTabTar = function () {
        if (this._lineNum) {
            this._viewWidth = 500;
            this._lineNum = 3;
            this._scrollWidth = 129;
        }
        else {
            if (egret.is(this, "PopupView")) {
                this._viewWidth = 570;
                this._lineNum = 3;
            }
            else {
                this._viewWidth = GameConfig.stageWidth;
                this._lineNum = 4;
            }
            this._scrollWidth = this._viewWidth - 104;
        }
        var swidth = this._viewWidth - 104;
        this.scrollView.width = swidth;
        this.scrollView.x = 52;
        var posX = (swidth - this._lineNum * 129 - (this._lineNum - 1) * 4) / 2;
        var lineCount = Math.ceil(this._tbArr.length / this._lineNum);
        if (lineCount > 1) {
            var arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["left"]);
            arrow_leftBtn.anchorOffsetX = arrow_leftBtn.width / 2;
            arrow_leftBtn.scaleX = arrow_leftBtn.scaleY = 0.7;
            arrow_leftBtn.x = 28;
            arrow_leftBtn.y = 4;
            this.addChild(arrow_leftBtn);
            this._leftBtn = arrow_leftBtn;
            var arrow_rightBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["right"]);
            arrow_rightBtn.anchorOffsetX = arrow_rightBtn.width / 2;
            arrow_rightBtn.scaleX = -1 * 0.7;
            arrow_rightBtn.scaleY = 0.7;
            arrow_rightBtn.x = this._viewWidth - arrow_leftBtn.width * 0.7 + 14;
            arrow_rightBtn.y = arrow_leftBtn.y;
            this.addChild(arrow_rightBtn);
            this._rightBtn = arrow_rightBtn;
        }
        if (this._leftBtn) {
            this._leftBtn.visible = this._curLine > 1;
        }
        if (this._rightBtn) {
            this._rightBtn.visible = this._curLine < this._maxnum;
        }
        for (var l = 0; l <= lineCount; l++) {
            var fillBg = BaseBitmap.create("public_alphabg");
            fillBg.width = swidth;
            fillBg.height = 45;
            fillBg.setPosition(l * swidth, 0);
            this.scrollContiner.addChild(fillBg);
        }
        for (var i = 0; i < this._tbArr.length; i++) {
            var tb = this._tbArr[i];
            if (tb) {
                var curPage = Math.floor(i / this._lineNum);
                var curIdx = i % this._lineNum;
                tb.x = posX + curIdx * 129 + curIdx * 4 + curPage * this.scrollView.width;
            }
        }
        this.width = this._viewWidth;
        this.height = 47;
    };
    TabBarScrollGroup.prototype.switchHandler = function (param) {
        if (param == "right") {
            var lineCount = Math.ceil(this._tbArr.length / this._lineNum);
            if (this._curLine < lineCount) {
                this._curLine++;
                this.scrollView.setScrollLeft(this._scrollWidth, 100);
                this.clickButtonHandler(this._tbArr[(this._curLine - 1) * this._lineNum]);
                if (this.getChildByName("reddot")) {
                    this.getChildByName("reddot").visible = false;
                }
            }
        }
        else if (param == "left") {
            if (this._curLine > 1) {
                this._curLine--;
                this.scrollView.setScrollLeft(-this._scrollWidth, 100);
                this.clickButtonHandler(this._tbArr[(this._curLine - 1) * this._lineNum]);
            }
        }
    };
    TabBarScrollGroup.prototype.dispose = function () {
        this._viewWidth = null;
        this._lineNum = null;
        this._curLine = 1;
        this._scrollWidth = 0;
        this._leftBtn = null;
        this._rightBtn = null;
        _super.prototype.dispose.call(this);
    };
    return TabBarScrollGroup;
}(TabBarGroup));
__reflect(TabBarScrollGroup.prototype, "TabBarScrollGroup");
//# sourceMappingURL=TabBarScrollGroup.js.map