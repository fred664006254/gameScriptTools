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
        return _this;
    }
    TitleLevelDetailPopupView.prototype.initView = function () {
        var titleInfo = this.param.data.info;
        this._lv = titleInfo.lv;
        this._titleInfo = titleInfo;
        var headBg = BaseLoadBitmap.create("skin_head_bg");
        headBg.x = this.viewBg.width / 2 - 69;
        headBg.y = 10;
        this.addChildToContainer(headBg);
        var playerHead;
        var nameBg = BaseBitmap.create("public_9_downbg");
        if (titleInfo.type == 4 && titleInfo.isTitle == 4) {
            playerHead = BaseLoadBitmap.create(titleInfo.icon);
            playerHead.x = this.viewBg.width / 2 - 50;
            playerHead.y = 30;
            this.addChildToContainer(playerHead);
            nameBg.y = playerHead.y + 112;
        }
        else if (titleInfo.isTitle == 5) {
            playerHead = Api.playerVoApi.getPlayerCircleHead(titleInfo.id);
            playerHead.x = this.viewBg.width / 2 - playerHead.width / 2;
            playerHead.y = 30;
            this.addChildToContainer(playerHead);
            nameBg.y = playerHead.y + playerHead.height + 12;
        }
        else if (titleInfo.isTitle == 6) {
            playerHead = BaseLoadBitmap.create(titleInfo.icon);
            playerHead.x = this.viewBg.width / 2 - 50;
            playerHead.y = 30;
            this.addChildToContainer(playerHead);
            nameBg.y = playerHead.y + 112;
        }
        else {
            var lv = this._lv;
            if (Api.switchVoApi.checkOpenChangeTitle()) {
                var cfg = Config.TitleCfg.getTitleCfgById(titleInfo.id);
                if (cfg.isTitle == 2) {
                    var pTitle = Api.playerVoApi.getPlayerPtitle();
                    if (pTitle.ptitle && pTitle.ptitle == String(titleInfo.id)) {
                        lv = pTitle.plv;
                    }
                }
                else if (cfg.isTitle == 1 || cfg.isTitle == 4) {
                    var titleData = Api.playerVoApi.getTitleInfo();
                    if (titleData.title && titleData.title == String(titleInfo.id)) {
                        lv = titleData.tlv;
                    }
                }
            }
            playerHead = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), { ptitle: titleInfo.id, plv: lv });
            playerHead.x = this.viewBg.width / 2 - playerHead.width / 2;
            playerHead.y = 30;
            this.addChildToContainer(playerHead);
            nameBg.y = playerHead.y + playerHead.height + 12;
        }
        this.addChildToContainer(nameBg);
        var nameText = ComponentManager.getTextField(titleInfo.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_GRAY);
        nameText.setPosition(this.viewBg.width / 2 - nameText.width / 2, nameBg.y + 12);
        this.addChildToContainer(nameText);
        nameBg.x = nameText.x - 20;
        nameBg.width = nameText.width + 40;
        nameBg.height = nameText.height + 24;
        var typeBg = BaseBitmap.create("public_9_probiginnerbg");
        typeBg.width = 528;
        typeBg.height = 370;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, nameBg.y + nameBg.height + 12);
        this.addChildToContainer(typeBg);
        var itemTopBg = BaseBitmap.create("public_9_bg37");
        itemTopBg.width = typeBg.width;
        itemTopBg.height = 35;
        itemTopBg.setPosition(typeBg.x, typeBg.y);
        this.addChildToContainer(itemTopBg);
        var curLvText = ComponentManager.getTextField(LanguageManager.getlocal("skincurLv"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        curLvText.setPosition(40 + typeBg.x, typeBg.y + 8);
        this.addChildToContainer(curLvText);
        var nextLvText = ComponentManager.getTextField(LanguageManager.getlocal("skinnextLv"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nextLvText.setPosition(typeBg.x + typeBg.width - nextLvText.width - 34, curLvText.y);
        this.addChildToContainer(nextLvText);
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("skinLvupTiptxt2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        descText.width = 480;
        descText.lineSpacing = 6;
        descText.setPosition(this.viewBg.width / 2 - descText.width / 2, typeBg.y + typeBg.height + 20);
        this.addChildToContainer(descText);
        var gotItBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "skinLvupOkBtn", this.hide, this);
        gotItBtn.setPosition(this.viewBg.width / 2 - gotItBtn.width / 2, descText.y + 20 + descText.height);
        this.addChildToContainer(gotItBtn);
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 528, 330);
        this._myContiner = new BaseDisplayObjectContainer();
        var scrollView = ComponentManager.getScrollView(this._myContiner, rect2);
        scrollView.setPosition(typeBg.x, typeBg.y + 40);
        this.addChildToContainer(scrollView);
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
        //头像框等级切换
        if (Api.switchVoApi.checkOpenChangeTitle() && titleInfo.type == 4 && (titleInfo.isTitle == 2 || titleInfo.isTitle == 1 || titleInfo.isTitle == 4)) {
            var titleCfg = Config.TitleCfg.getTitleCfgById(titleInfo.id);
            if (titleCfg && titleCfg.isChangePic()) {
                var changeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE, "titleChangeBtnName", this.changeTitleBtnClick, this, [{ id: titleInfo.id }]);
                this.addChildToContainer(changeBtn);
                changeBtn.setPosition(this.viewBg.width / 4 - changeBtn.width / 2, gotItBtn.y);
                gotItBtn.x = this.viewBg.width * 3 / 4 - gotItBtn.width / 2;
            }
        }
    };
    TitleLevelDetailPopupView.prototype.setScrollItem = function (index, type, value, valueO) {
        var scrollContiner = new BaseDisplayObjectContainer();
        scrollContiner.y = this._myContiner.height;
        this._myContiner.addChild(scrollContiner);
        var containerBg = BaseBitmap.create("public_alphabg");
        containerBg.width = 528;
        containerBg.height = 50;
        scrollContiner.addChild(containerBg);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("skinLvuptxt" + index), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GRAY);
        nameText.setPosition(40, 18);
        scrollContiner.addChild(nameText);
        var value1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        value1.setPosition(188, nameText.y);
        scrollContiner.addChild(value1);
        var value2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        value2.setPosition(415, nameText.y);
        scrollContiner.addChild(value2);
        var arrow = BaseLoadBitmap.create("servant_arrow");
        arrow.setPosition(322, 18);
        scrollContiner.addChild(arrow);
        if (index == 1) {
            value1.text = String(this._lv);
            value2.text = String(this._lv + 1);
            value1.x = 220;
            value2.x = 445;
            if (this._titleInfo.lvLimit) {
                if (this._lv >= this._titleInfo.lvLimit) {
                    value2.text = LanguageManager.getlocal('skinnextMax');
                    value2.x = 390;
                }
            }
        }
        else {
            var line = BaseBitmap.create("public_line1");
            line.setPosition(containerBg.width / 2 - line.width / 2, 0);
            scrollContiner.addChild(line);
            if (type == 1) {
                value1.text = "+" + (value * (this._lv - 1) + valueO);
                value2.text = "+" + (value * this._lv + valueO);
                if (this._titleInfo.lvLimit) {
                    if (this._lv >= this._titleInfo.lvLimit) {
                        value2.text = LanguageManager.getlocal('skinnextMax');
                        value2.x = 390;
                    }
                }
            }
            else {
                value1.text = "+" + Math.round((value * (this._lv - 1) + valueO) * 100) + "%";
                value2.text = "+" + Math.round((value * this._lv + valueO) * 100) + "%";
                if (this._titleInfo.lvLimit) {
                    if (this._lv >= this._titleInfo.lvLimit) {
                        value2.text = LanguageManager.getlocal('skinnextMax');
                        value2.x = 390;
                    }
                }
            }
        }
    };
    //头像切换
    TitleLevelDetailPopupView.prototype.changeTitleBtnClick = function (data) {
        App.LogUtil.log("changeTitleBtnClick data.id: " + data.id);
        ViewController.getInstance().openView(ViewConst.POPUP.TITLECHANGEPOPUPVIEW, { id: data.id });
    };
    TitleLevelDetailPopupView.prototype.getBgExtraHeight = function () {
        return 25;
    };
    TitleLevelDetailPopupView.prototype.getTitleStr = function () {
        return "detail";
    };
    TitleLevelDetailPopupView.prototype.dispose = function () {
        this._myContiner = null;
        _super.prototype.dispose.call(this);
    };
    return TitleLevelDetailPopupView;
}(PopupView));
__reflect(TitleLevelDetailPopupView.prototype, "TitleLevelDetailPopupView");
//# sourceMappingURL=TitleLevelDetailPopupView.js.map