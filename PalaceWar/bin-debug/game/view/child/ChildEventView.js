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
//子嗣属性加成说明
var ChildEventView = (function (_super) {
    __extends(ChildEventView, _super);
    function ChildEventView() {
        var _this = _super.call(this) || this;
        _this._selIndex = -1;
        _this._wordbg = null;
        return _this;
    }
    ChildEventView.prototype.initView = function () {
        var _this = this;
        //1 选择事件  2 通知事件
        var type = this.param.data.type;
        if (type == 1) {
            var titlebg = BaseBitmap.create("childeventtitlebg");
            titlebg.setPosition(18, -35);
            this.addChildToContainer(titlebg);
            var namebg = BaseBitmap.create("childeventnamebg");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, namebg, titlebg);
            this.addChildToContainer(namebg);
            var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("childeventviewtitle"), 22, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
            this.addChildToContainer(nameTxt);
            var flower = BaseBitmap.create("childeventflower");
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, flower, titlebg);
            this.addChildToContainer(flower);
            var kuang = BaseBitmap.create("childeventkuang2");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, titlebg, [0, titlebg.height + 20]);
            this.addChildToContainer(kuang);
            var bg = BaseLoadBitmap.create("childeventbg1");
            bg.width = 546;
            bg.height = 154;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang, [0, -3]);
            this.addChildToContainer(bg);
            var wordbg = BaseBitmap.create("childeventwordbg");
            wordbg.width = 536;
            this.addChildToContainer(wordbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wordbg, kuang, [0, kuang.height + 10]);
            this._wordbg = wordbg;
            var wordTxt = ComponentManager.getTextField(LanguageManager.getlocal("childeventtip2", [this.param.data.childname, this.param.data.mname, LanguageManager.getlocal("childeventsex" + this.param.data.sex)]), 20, TextFieldConst.COLOR_BLACK);
            wordTxt.width = wordbg.width - 30;
            wordTxt.textAlign = egret.HorizontalAlign.LEFT;
            wordTxt.lineSpacing = 5;
            wordbg.scaleY = (wordTxt.textHeight + 30) / 121;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wordTxt, wordbg);
            this.addChildToContainer(wordTxt);
            var _loop_1 = function (i) {
                var namebg_1 = BaseBitmap.create("childeventtype" + i);
                namebg_1.x = wordbg.x + (i % 2 == 0 ? 270 : -7);
                namebg_1.y = wordbg.y + wordbg.height * wordbg.scaleY + 5 + (i / 2 > 1 ? 70 : 0);
                var selectbg = BaseBitmap.create("childeventselectbg");
                selectbg.x = namebg_1.x + namebg_1.width - 10;
                selectbg.y = namebg_1.y + (namebg_1.height - selectbg.height) / 2;
                this_1.addChildToContainer(selectbg);
                selectbg.addTouchTap(function () {
                    if (_this._selIndex == -1) {
                        _this._selIndex = i;
                        var collectFlag = BaseBitmap.create("childeventselected");
                        collectFlag.anchorOffsetX = collectFlag.width / 2;
                        collectFlag.anchorOffsetY = collectFlag.height / 2;
                        collectFlag.setScale(0.7);
                        collectFlag.x = selectbg.x + selectbg.width - collectFlag.width * collectFlag.scaleX / 2;
                        collectFlag.y = selectbg.y + selectbg.height / 2;
                        _this.addChildToContainer(collectFlag);
                        collectFlag.visible = false;
                        collectFlag.setScale(1.3);
                        collectFlag.visible = true;
                        egret.Tween.get(collectFlag).to({ scaleX: 0.7, scaleY: 0.7 }, 300).call(function () {
                            _this.freshView(i);
                        }, _this).wait(500).call(function () {
                            _this.hide();
                        }, _this);
                    }
                }, this_1);
                this_1.addChildToContainer(namebg_1);
                selectbg.name = "selectbg" + i;
                var nameTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("childevent" + i), 20, TextFieldConst.COLOR_BLACK);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt_1, selectbg, [17, 0]);
                this_1.addChildToContainer(nameTxt_1);
            };
            var this_1 = this;
            for (var i = 1; i < 5; ++i) {
                _loop_1(i);
            }
            var line = BaseBitmap.create("childeventline");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, wordbg, [0, wordbg.height * wordbg.scaleY + 130]);
            this.addChildToContainer(line);
            var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("childeventtip1"), 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, line, [0, line.height + 5]);
            this.addChildToContainer(tiptxt);
        }
        else {
            var flower = BaseBitmap.create("childeventflower");
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flower, this.viewBg, [0, -flower.height / 2]);
            this.addChildToContainer(flower);
            var kuang = BaseBitmap.create("childeventkuang1");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, this.viewBg, [4, 20]);
            this.addChildToContainer(kuang);
            var bgres = "";
            if (type == 4) {
                bgres = "childeventbg" + type;
            }
            else {
                bgres = "childeventbg" + type + "_" + this.param.data.eventtype;
            }
            var bg = BaseLoadBitmap.create(bgres);
            bg.width = 546;
            bg.height = 224;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang, [0, -3]);
            this.addChildToContainer(bg);
            var wordbg = BaseBitmap.create("childeventwordbg");
            wordbg.width = 480;
            this.addChildToContainer(wordbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wordbg, kuang, [65, kuang.height + 10]);
            var typebg = BaseBitmap.create("childeventtype" + this.param.data.eventtype);
            typebg.x = kuang.x;
            this.addChildToContainer(typebg);
            var wordTxt = ComponentManager.getTextField(LanguageManager.getlocal("childevent" + type + "_" + (type == 4 ? 1 : this.param.data.eventtype) + "_tip" + (type == 4 ? 1 : App.MathUtil.getRandom(1, 6)), [this.param.data.childname]), 20, TextFieldConst.COLOR_BLACK);
            wordTxt.width = wordbg.width - 30;
            wordTxt.textAlign = egret.HorizontalAlign.LEFT;
            wordTxt.lineSpacing = 5;
            wordbg.scaleY = (wordTxt.textHeight + 30) / 121;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wordTxt, wordbg);
            this.addChildToContainer(wordTxt);
            this._wordbg = wordbg;
            typebg.y = wordTxt.y + (wordTxt.height - typebg.height) / 2;
            if (type > 1) {
                var jzhou = BaseBitmap.create("public_9_bg87");
                jzhou.y = this._wordbg.y + this._wordbg.height * this._wordbg.scaleY + 15;
                this.addChildToContainer(jzhou);
                var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("childeventtip3", [this.param.data.childname, LanguageManager.getlocal("servantInfo_speciality" + this.param.data.eventtype), this.param.data.num]), 20, TextFieldConst.COLOR_BLACK);
                jzhou.width = tiptxt.width + 80;
                jzhou.x = this.viewBg.width / 2 - jzhou.width / 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, jzhou, [0, 7]);
                this.addChildToContainer(tiptxt);
                var closeText = ComponentManager.getTextField(LanguageManager.getlocal("childeventclosetip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                closeText.textAlign = egret.HorizontalAlign.CENTER;
                closeText.setPosition((GameConfig.stageWidth - closeText.width) / 2, GameConfig.stageHeigth / 2 + this.getShowHeight() / 2);
                this.addChild(closeText);
            }
        }
    };
    // protected resetBgSize():void{
    //     super.resetBgSize();
    //     let type = this.param.data.type;
    //     if(type > 1){
    //         // let jzhou = BaseBitmap.create(`childeventjzhou`);
    //         // jzhou.width = 600;
    //         // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, jzhou, this.viewBg, [0]);
    //         // jzhou.y = this.viewBg.y + this.viewBg.height + 15;
    //         // this.addChild(jzhou);
    //         // let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`childeventtip3`, [this.param.data.childname, LanguageManager.getlocal(`servantInfo_speciality${this.param.data.eventtype}`), this.param.data.num]), 20, TextFieldConst.COLOR_BLACK);
    //         // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, jzhou, [0,38]);
    //         // this.addChild(tiptxt);
    //         // let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("childeventclosetip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
    //         // closeText.textAlign = egret.HorizontalAlign.CENTER;
    //         // closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,jzhou.y+jzhou.height+25);
    //         // this.addChild(closeText);
    //         let jzhou = BaseBitmap.create(`public_9_bg87`);
    //         jzhou.y = this._wordbg.y+this._wordbg.height*this._wordbg.scaleY+ 25;
    //         this.addChildToContainer(jzhou);
    //         let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`childeventtip3`, [this.param.data.childname, LanguageManager.getlocal(`servantInfo_speciality${this.param.data.eventtype}`), this.param.data.num]), 20, TextFieldConst.COLOR_BLACK);
    //         jzhou.width = tiptxt.width+80;
    //         jzhou.x = this.viewBg.width/2 - jzhou.width/2;
    //         App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, jzhou, [0,7]);
    //         this.addChildToContainer(tiptxt);
    //         let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("childeventclosetip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
    //         closeText.textAlign = egret.HorizontalAlign.CENTER;
    //         closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,this.viewBg.y + this.viewBg.height);
    //         this.addChild(closeText);
    //     }
    // }
    ChildEventView.prototype.isTouchMaskClose = function () {
        var type = this.param.data.type;
        return type > 1;
    };
    ChildEventView.prototype.getCloseBtnName = function () {
        return null;
    };
    ChildEventView.prototype.freshView = function (index) {
        var view = this;
        for (var i = 1; i < 5; ++i) {
            var bg = view.container.getChildByName("selectbg" + i);
            if (bg && i != index) {
                bg.setRes("childeventselectbg2");
            }
        }
    };
    ChildEventView.prototype.getTitleStr = function () {
        return "";
    };
    ChildEventView.prototype.getBgName = function () {
        return "childeventdban";
    };
    ChildEventView.prototype.getTitleBgName = function () {
        return null;
    };
    ChildEventView.prototype.getShowHeight = function () {
        var type = this.param.data.type;
        return type == 1 ? 0 : 473;
    };
    // protected getShowHeight():number{
    //     let type = this.param.data.type;
    //     return type == 1 ? 540 : 425;
    // }
    ChildEventView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat("childeventview");
    };
    ChildEventView.prototype.hide = function () {
        if (this.param.data.callfunc) {
            this.param.data.callfunc.apply(this.param.data.callobj, [this._selIndex]);
        }
        _super.prototype.hide.call(this);
    };
    ChildEventView.prototype.dispose = function () {
        this._selIndex = -1;
        this._wordbg = null;
        _super.prototype.dispose.call(this);
    };
    return ChildEventView;
}(PopupView));
__reflect(ChildEventView.prototype, "ChildEventView");
//# sourceMappingURL=ChildEventView.js.map