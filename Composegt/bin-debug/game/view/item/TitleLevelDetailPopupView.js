/**
 * 称号 等级详情
 * author zsl
 * date 2018/08/24
 * @class SkinRankPopupView
 */
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
var TitleLevelDetailPopupView = (function (_super) {
    __extends(TitleLevelDetailPopupView, _super);
    function TitleLevelDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._myContiner = null;
        _this._lv = 1;
        _this._titleInfo = null;
        _this._trueLv = 0;
        return _this;
    }
    TitleLevelDetailPopupView.prototype.initView = function () {
        var titleInfo = this.param.data.info;
        this._lv = titleInfo.lv;
        this._titleInfo = titleInfo;
        this._trueLv = titleInfo.getTrueLv();
        var outBg = BaseBitmap.create("public_tc_bg01");
        outBg.width = 538;
        outBg.height = 650; //521 + 84 + 30;
        outBg.setPosition(this.viewBg.width / 2 - outBg.width / 2, this.viewBg.y + 10);
        this.addChildToContainer(outBg);
        var innerBg = BaseBitmap.create("public_tc_bg03");
        innerBg.width = outBg.width - 20;
        innerBg.height = outBg.height - 20;
        innerBg.x = outBg.x + outBg.width / 2 - innerBg.width / 2;
        innerBg.y = outBg.y + 10;
        this.addChildToContainer(innerBg);
        // let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),titleInfo.id);
        var playerHead = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), titleInfo.id);
        playerHead.x = this.viewBg.width / 2 - playerHead.width / 2;
        playerHead.y = 30;
        this.addChildToContainer(playerHead);
        var nameText = ComponentManager.getTextField(titleInfo.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameText.setPosition(this.viewBg.width / 2 - nameText.width / 2, playerHead.y + playerHead.height + 8);
        this.addChildToContainer(nameText);
        var titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = outBg.width - 50;
        titleBg.x = this.viewBg.width / 2 - titleBg.width / 2;
        titleBg.y = nameText.y + nameText.height + 8;
        this.addChildToContainer(titleBg);
        var curLvText = ComponentManager.getTextField(LanguageManager.getlocal("skincurLv"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        curLvText.setPosition(100 + titleBg.x, titleBg.y + 8);
        this.addChildToContainer(curLvText);
        var nextLvText = ComponentManager.getTextField(LanguageManager.getlocal("skinnextLv"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nextLvText.setPosition(titleBg.x + titleBg.width - nextLvText.width - 80, curLvText.y);
        this.addChildToContainer(nextLvText);
        if (this._trueLv == 0) {
            curLvText.visible = false;
            nextLvText.visible = false;
            var getLvText = ComponentManager.getTextField(LanguageManager.getlocal("skinget"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            getLvText.setPosition(titleBg.x + titleBg.width / 2 - getLvText.width / 2, titleBg.y + 8);
            this.addChildToContainer(getLvText);
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 528, 300);
        this._myContiner = new BaseDisplayObjectContainer();
        var scrollView = ComponentManager.getScrollView(this._myContiner, rect2);
        scrollView.setPosition(titleBg.x, titleBg.y + titleBg.height);
        this.addChildToContainer(scrollView);
        var bottom = BaseBitmap.create("public_left2");
        bottom.width = innerBg.width - 10;
        bottom.height = innerBg.y + innerBg.height - scrollView.y - scrollView.height - 5;
        bottom.x = innerBg.x + innerBg.width / 2 - bottom.width / 2;
        bottom.y = scrollView.y + scrollView.height;
        this.addChildToContainer(bottom);
        var descText1 = ComponentManager.getTextField(LanguageManager.getlocal("titleLvupTiptxt1"), 18, TextFieldConst.COLOR_BROWN);
        descText1.width = 480;
        descText1.lineSpacing = 5;
        descText1.x = this.viewBg.width / 2 - descText1.width / 2;
        descText1.y = bottom.y + 20;
        this.addChildToContainer(descText1);
        var descText2 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        descText2.width = 480;
        descText2.lineSpacing = 5;
        descText2.x = this.viewBg.width / 2 - descText2.width / 2;
        descText2.y = descText1.y + descText1.height + 5;
        this.addChildToContainer(descText2);
        if (this._lv >= this._titleInfo.lvLimit) {
            descText2.text = LanguageManager.getlocal("skinnextMax");
        }
        else {
            descText2.text = LanguageManager.getlocal("titleLvupTiptxt2", [titleInfo.name]);
        }
        var gotItBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "skinLvupOkBtn", this.hide, this);
        gotItBtn.x = this.viewBg.width / 2 - gotItBtn.width / 2;
        gotItBtn.y = descText2.y + 20 + descText2.height;
        this.addChildToContainer(gotItBtn);
        this.setScrollItem(1);
        if (titleInfo.effect1) {
            for (var i = 2; i <= 5; i++) {
                this.setScrollItem(i, 1, titleInfo.lvUpEffect1, titleInfo.effect1);
            }
        }
        if (titleInfo.effect2) {
            for (var i = 2; i <= 5; i++) {
                this.setScrollItem(i, 2, titleInfo.lvUpEffect2, titleInfo.effect2);
            }
        }
        if (titleInfo.atkEffect) {
            for (var i = 8; i <= 8; i++) {
                this.setScrollItem(i, 2, titleInfo.atkEffect, titleInfo.atkEffect);
            }
        }
    };
    TitleLevelDetailPopupView.prototype.setScrollItem = function (index, type, value, valueO) {
        var scrollContiner = new BaseDisplayObjectContainer();
        scrollContiner.y = this._myContiner.height;
        this._myContiner.addChild(scrollContiner);
        var containerBg = BaseBitmap.create("public_alphabg");
        containerBg.width = 528;
        containerBg.height = 40;
        scrollContiner.addChild(containerBg);
        if (index % 2 == 0) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            scrollContiner.addChild(bg);
        }
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("skinLvuptxt" + index), 18, TextFieldConst.COLOR_BROWN);
        nameText.setPosition(60, containerBg.height / 2 - nameText.height / 2);
        scrollContiner.addChild(nameText);
        var value1 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        value1.setPosition(180, nameText.y);
        scrollContiner.addChild(value1);
        var value2 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WARN_GREEN);
        value2.setPosition(350, nameText.y);
        scrollContiner.addChild(value2);
        if (this._trueLv == 0) {
            value2.visible = false;
            nameText.x = this.viewBg.width / 2 - 200;
        }
        if (index == 1) {
            nameText.visible = false;
            value1.text = LanguageManager.getlocal("skinLvuptxt" + index, [String(this._lv)]);
            value2.text = LanguageManager.getlocal("skinLvuptxt" + index, [String(this._lv + 1)]);
            value1.x = nameText.x;
            if (this._titleInfo.lvLimit) {
                if (this._lv >= this._titleInfo.lvLimit) {
                    value2.text = LanguageManager.getlocal('skinnextMax');
                    value2.setColor(0x7e7e7e);
                    value2.x = 350;
                }
            }
            if (this._trueLv == 0) {
                value1.x = this.viewBg.x + this.viewBg.width / 2 - value1.width / 2 - 60;
            }
        }
        else {
            if (type == 1) {
                value1.text = "+" + (value * (this._lv - 1) + valueO);
                value2.text = "+" + (value * this._lv + valueO);
                if (this._titleInfo.lvLimit) {
                    if (this._lv >= this._titleInfo.lvLimit) {
                        value2.text = LanguageManager.getlocal('skinnextMax');
                        value2.setColor(0x7e7e7e);
                        value2.x = 350;
                    }
                }
            }
            else {
                value1.text = "+" + Math.round((value * (this._lv - 1) + valueO) * 100) + "%";
                value2.text = "+" + Math.round((value * this._lv + valueO) * 100) + "%";
                if (this._titleInfo.lvLimit) {
                    if (this._lv >= this._titleInfo.lvLimit) {
                        value2.text = LanguageManager.getlocal('skinnextMax');
                        value2.setColor(0x7e7e7e);
                        value2.x = 350;
                    }
                }
            }
            if (this._trueLv == 0) {
                value1.x = this.viewBg.x + this.viewBg.width / 2;
            }
            if (value1.text == value2.text) {
                value2.textColor = TextFieldConst.COLOR_BROWN;
            }
        }
    };
    TitleLevelDetailPopupView.prototype.getBgExtraHeight = function () {
        return 25;
    };
    TitleLevelDetailPopupView.prototype.getTitleStr = function () {
        return "detail";
    };
    TitleLevelDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_biao",
        ]);
    };
    TitleLevelDetailPopupView.prototype.dispose = function () {
        this._myContiner = null;
        this._lv = 1;
        this._titleInfo = null;
        _super.prototype.dispose.call(this);
    };
    return TitleLevelDetailPopupView;
}(PopupView));
__reflect(TitleLevelDetailPopupView.prototype, "TitleLevelDetailPopupView");
