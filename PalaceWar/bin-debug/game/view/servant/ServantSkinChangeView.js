/**
 * 门客皮肤
 * author yanyuling
 * date 2018/08/13
 * @class ServantSkinChangeView
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
var ServantSkinChangeView = (function (_super) {
    __extends(ServantSkinChangeView, _super);
    function ServantSkinChangeView() {
        var _this = _super.call(this) || this;
        _this._inflagImg = undefined;
        _this._skinItemScrollview = undefined;
        _this._bookNode = undefined;
        _this._droWifeIcon = undefined;
        _this._skinImg = undefined;
        _this._preSkinId = undefined;
        _this._skinauraGroup = null;
        return _this;
    }
    ServantSkinChangeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP), this.skinkCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH, this.bgSwitchHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA, this.freshProtTxt, this);
        this._servantId = this.param.data.servantId;
        var skinList = Config.ServantskinCfg.getIdListBySerVantId(this._servantId);
        // Api.servantVoApi.getServantObj(this._servantId).getOwnSkinIdList();
        skinList.unshift("");
        var serCfg = Config.ServantCfg.getServantItemById(this._servantId);
        var skinImgPath = serCfg.fullIcon;
        var data = this.param.data;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this.addChildToContainer(this._nodeContainer);
        var infobg = BaseLoadBitmap.create(Api.switchVoApi.checkOpenServantSkinAura() ? "servantskinauramanbg" : "skin_detailbg1");
        infobg.width = 640;
        infobg.height = Api.switchVoApi.checkOpenServantSkinAura() ? 498 : 720;
        infobg.y = Api.switchVoApi.checkOpenServantSkinAura() ? 0 : -this.container.y;
        this._infobg = infobg;
        this._nodeContainer.addChild(infobg);
        var probg = BaseBitmap.create("wifeskin_barbg");
        probg.width = 640;
        probg.x = GameConfig.stageWidth / 2 - probg.width / 2;
        probg.y = -this.container.y + 720 - 40;
        probg.name = "probg";
        this._inflagImg = BaseBitmap.create("wifeview_in");
        this._inflagImg.x = 490;
        this._inflagImg.y = probg.y - 80;
        this._nodeContainer.addChild(this._inflagImg);
        //notGetImage
        this._notGetTipImg = BaseBitmap.create("wifeview_skingetbg");
        this._notGetTipImg.setPosition(GameConfig.stageWidth - this._notGetTipImg.width, this._inflagImg.y + 48);
        this._nodeContainer.addChild(this._notGetTipImg);
        this._notGetTipTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_QUALITY_ORANGE);
        this._notGetTipTxt.x = GameConfig.stageWidth - 10;
        this._notGetTipTxt.y = this._inflagImg.y + 48;
        this._nodeContainer.addChild(this._notGetTipTxt);
        this._skinBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wifeskinViewTitle", this.skinHander, this, null, 0);
        this._skinBtn.x = 470;
        this._skinBtn.y = probg.y - 60;
        this._nodeContainer.addChild(this._skinBtn);
        this._skinBtn.visible = false;
        var wifeOrSerNameStr = LanguageManager.getlocal("servant_name" + this._servantId);
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.y = -10;
        skinnamebg.x = -15;
        this._nodeContainer.addChild(skinnamebg);
        this._nodeContainer.addChild(probg);
        var probg2 = BaseBitmap.create("public_9_bg22");
        probg2.width = 640;
        probg2.name = "probg2";
        probg2.x = GameConfig.stageWidth / 2 - probg.width / 2;
        probg2.y = probg.y + probg.height;
        probg2.height = GameConfig.stageHeigth - this.container.y - probg2.y + 15;
        this._nodeContainer.addChild(probg2);
        var skinNameTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.x = skinnamebg.x + skinnamebg.width / 2;
        skinNameTxt.y = skinnamebg.y + 33;
        this._skinNameTxt = skinNameTxt;
        this._nodeContainer.addChild(skinNameTxt);
        var wifeOrSerNameTxt = ComponentManager.getTextField(wifeOrSerNameStr, 24);
        wifeOrSerNameTxt.x = skinnamebg.x + skinnamebg.width / 2 - wifeOrSerNameTxt.width / 2;
        wifeOrSerNameTxt.y = skinNameTxt.y + 28;
        this._nodeContainer.addChild(wifeOrSerNameTxt);
        var tmpNode = new BaseDisplayObjectContainer();
        for (var index = 0; index < skinList.length; index++) {
            var element = new ServantSkinScrollItem();
            element.init(skinList[index], index, this._servantId, this.param.data.servantSkinId);
            element.x = 10 + (element.width + 10) * index;
            element.y = 10;
            tmpNode.addChild(element);
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, probg.height);
        this._skinItemScrollview = ComponentManager.getScrollView(tmpNode, rect);
        this._skinItemScrollview.x = 0;
        this._skinItemScrollview.y = probg.y;
        this._nodeContainer.addChild(this._skinItemScrollview);
        this._bookNode = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this._bookNode);
        this._servantSkinId = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "";
        this._preSkinId = this._servantSkinId;
        if (this.param.data.servantSkinId) {
            this._servantSkinId = this.param.data.servantSkinId;
        }
        this.refreshInFlag();
        this.refreshServantDragon();
        // let btmTip = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"),18,TextFieldConst.COLOR_BLACK);
        // btmTip.x = GameConfig.stageWidth/2 - btmTip.width/2;
        // btmTip.y = probg2.y + probg2.height - 40;
        // this._nodeContainer.addChild(btmTip);
    };
    ServantSkinChangeView.prototype.freshProtTxt = function () {
        var view = this;
        var cfg = Config.ServantskinCfg.getServantSkinItemById(this._servantSkinId);
        var servant = Api.servantVoApi.getServantObj(this._servantId);
        for (var i in cfg.aura) {
            var unit = cfg.aura[i];
            var skinvo = servant.getSkinInfobyId(this._servantSkinId);
            var curLevel = skinvo ? skinvo.getSkinAuraLv(Number(i) - 1) : 0;
            var index = Number(i);
            var auratxt = this._skinauraGroup.getChildByName("aura" + index);
            if (auratxt) {
                var value = '0';
                if (cfg.aura[i].growAtt >= 1) {
                    var tmp = cfg.aura[i].growAtt * curLevel;
                    value = App.MathUtil.strip(tmp) + '';
                }
                else {
                    var tmp = cfg.aura[i].growAtt * 100 * curLevel;
                    value = App.MathUtil.strip(tmp) + '%';
                }
                auratxt.text = LanguageManager.getlocal("servantSkinAuraAdd" + index, [String(TextFieldConst.COLOR_BLACK), value]);
            }
        }
        var levelupBtn = this._nodeContainer.getChildByName("levelupBtn");
        if (levelupBtn) {
            if (Api.servantVoApi.isShowAuralevelUpRedForEnter(this._servantId)) {
                App.CommonUtil.addIconToBDOC(levelupBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(levelupBtn);
            }
        }
    };
    ServantSkinChangeView.prototype.refreshServantDragon = function () {
        var probg = this._nodeContainer.getChildByName("probg");
        var serSkincfg = Config.ServantskinCfg.getServantSkinItemById(this._servantSkinId);
        var boneName = undefined;
        if (serSkincfg && serSkincfg.bone) {
            boneName = serSkincfg.bone + "_ske";
        }
        if (!Api.switchVoApi.checkCloseBone() && boneName && this._servantId && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            if (this._skinImg) {
                this._skinImg.visible = false;
            }
            if (this._droWifeIcon) {
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(serSkincfg.bone);
            this._droWifeIcon.visible = true;
            this._droWifeIcon.setScale(1.1);
            this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
            this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width / 2;
            this._droWifeIcon.x = GameConfig.stageWidth / 2;
            this._droWifeIcon.y = probg.y;
            this._nodeContainer.addChildAt(this._droWifeIcon, 1);
        }
        else {
            if (this._droWifeIcon) {
                this._droWifeIcon.visible = false;
            }
            var serCfg = Config.ServantCfg.getServantItemById(this._servantId);
            var skinImgPath = serCfg.fullIcon;
            if (serSkincfg) {
                skinImgPath = serSkincfg.body;
            }
            if (this._skinImg) {
                this._skinImg.setload(skinImgPath);
                this._skinImg.visible = true;
                return;
            }
            var skinW = 405;
            var skinH = 467;
            var tarScale = 1.0;
            this._skinImg = BaseLoadBitmap.create(skinImgPath);
            this._skinImg.width = skinW;
            this._skinImg.height = skinH;
            this._skinImg.setScale(tarScale);
            this._skinImg.anchorOffsetY = this._skinImg.height;
            this._skinImg.anchorOffsetX = this._skinImg.width / 2;
            this._skinImg.x = GameConfig.stageWidth / 2;
            this._skinImg.y = probg.y;
            this._nodeContainer.addChildAt(this._skinImg, 1);
        }
    };
    ServantSkinChangeView.prototype.refreshSkinAbulity = function () {
        var skinNameStr = LanguageManager.getlocal("servantSkinName" + this._servantSkinId);
        if (!this._servantSkinId) {
            skinNameStr = LanguageManager.getlocal("skin_default");
        }
        this._skinNameTxt.text = skinNameStr;
        this._skinNameTxt.anchorOffsetX = this._skinNameTxt.width / 2;
        var serSkincfg = Config.ServantskinCfg.getServantSkinItemById(this._servantSkinId);
        var probg2 = this._nodeContainer.getChildByName("probg2");
        //书籍信息
        if (serSkincfg) {
            this._bookNode.visible = true;
            this._bookNode.removeChildren();
            var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + this._servantSkinId), 18, TextFieldConst.COLOR_BLACK);
            skinTipTxt.width = 580;
            skinTipTxt.textAlign = egret.HorizontalAlign.LEFT;
            skinTipTxt.multiline = true;
            skinTipTxt.lineSpacing = 5;
            skinTipTxt.x = GameConfig.stageWidth / 2 - skinTipTxt.textWidth / 2;
            var tmpy = 0;
            if (Api.switchVoApi.checkOpenServantSkinAura()) {
                tmpy = 108;
            }
            skinTipTxt.y = probg2.y + 25 + tmpy + (55 - skinTipTxt.textHeight) / 2;
            this._bookNode.addChild(skinTipTxt);
            var ability = serSkincfg.ability;
            var bookPosY = probg2.y + 85 + tmpy;
            var rect2 = new egret.Rectangle(0, 0, GameConfig.stageWidth - 30, GameConfig.stageHeigth - bookPosY - 118);
            var scrollView = ComponentManager.getScrollList(ServantChangeSkinBookItem, ability, rect2, [this._servantSkinId, true]);
            scrollView.x = 30;
            scrollView.y = bookPosY;
            this._bookNode.addChild(scrollView);
            // for (let index = 0; index < ability.length; index++) {
            //     let bnode = new ServantSkinBookScrollItem();
            //     bnode.init(this._servantSkinId,index,this._servantId);
            //     bnode.x = probg2.x + probg2.width/2 - bnode.width/2 +10;
            //     bnode.y = probg2.y + 85 + (bnode.height +7)* index + tmpy;
            //     this._bookNode.addChild(bnode);
            // }
            var noSkinTipTxt = this._nodeContainer.getChildByName("noSkinTipTxt");
            if (noSkinTipTxt) {
                noSkinTipTxt.visible = false;
            }
        }
        else {
            this._bookNode.visible = false;
            var noSkinTipTxt = this._nodeContainer.getChildByName("noSkinTipTxt");
            if (!noSkinTipTxt) {
                noSkinTipTxt = ComponentManager.getTextField("", 40, TextFieldConst.COLOR_BLACK);
                noSkinTipTxt.text = LanguageManager.getlocal("wifeskinNoAdd");
                noSkinTipTxt.x = probg2.x + probg2.width / 2 - noSkinTipTxt.width / 2;
                noSkinTipTxt.y = probg2.y + probg2.height / 2 - noSkinTipTxt.height / 2 - 10;
                this._nodeContainer.addChild(noSkinTipTxt);
                noSkinTipTxt.name = "noSkinTipTxt";
            }
            noSkinTipTxt.visible = true;
        }
    };
    ServantSkinChangeView.prototype.bookTouchHandler = function (obj, param) {
        var bid = param;
        var uidata = {
            aid: bid,
            bookId: bid,
            servantId: this._servantId,
            index: 0,
            skinId: this._servantSkinId,
            isSkin: true,
        };
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTBOOKLEVELUPPOPUPVIEW, uidata);
    };
    ServantSkinChangeView.prototype.skinkCallback = function (event) {
        var ret = event.data.data.ret;
        if (ret == 0) {
            //  this._servantSkinId = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "";
            //  this.refreshInFlag();
            this.hide();
        }
    };
    ServantSkinChangeView.prototype.skinHander = function () {
        this.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP, { servantId: this._servantId, servantSkinId: this._servantSkinId });
    };
    ServantSkinChangeView.prototype.bgSwitchHandler = function (params) {
        var sid = params.data.skinId;
        this._servantSkinId = sid;
        this.refreshInFlag();
        this.refreshServantDragon();
    };
    //切换皮肤时刷新
    ServantSkinChangeView.prototype.refreshInFlag = function () {
        var _this = this;
        var wearId = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "";
        if (wearId == this._servantSkinId) {
            this._inflagImg.texture = ResourceManager.getRes("wifeview_in");
            this._skinBtn.visible = false;
            this._inflagImg.visible = true;
            this._notGetTipTxt.text = "";
            this._notGetTipImg.visible = false;
        }
        else {
            if (this._servantSkinId == "" || Api.servantVoApi.isOwnSkinOfSkinId(this._servantSkinId)) {
                this._skinBtn.visible = true;
                this._inflagImg.visible = false;
                this._notGetTipTxt.text = "";
                this._notGetTipImg.visible = false;
            }
            else {
                this._inflagImg.texture = ResourceManager.getRes("wifeview_noget");
                this._notGetTipTxt.text = LanguageManager.getlocal("skinDropDesc_" + this._servantSkinId);
                this._notGetTipTxt.anchorOffsetX = this._notGetTipTxt.width;
                this._notGetTipImg.width = this._notGetTipTxt.width + 40;
                this._notGetTipImg.x = GameConfig.stageWidth - this._notGetTipImg.width;
                this._skinBtn.visible = false;
                this._inflagImg.visible = true;
                this._notGetTipImg.visible = true;
            }
        }
        var probg = this._nodeContainer.getChildByName("probg");
        var probg2 = this._nodeContainer.getChildByName("probg2");
        //皮肤光环
        if (Api.switchVoApi.checkOpenServantSkinAura()) {
            if (!this._skinauraGroup) {
                var group = new BaseDisplayObjectContainer();
                group.height = 100;
                group.width = 600;
                this._nodeContainer.addChild(group);
                this._skinauraGroup = group;
            }
            if (this._servantSkinId != '') {
                var cfg = Config.ServantskinCfg.getServantSkinItemById(this._servantSkinId);
                if (cfg && cfg.aura) {
                    var tiptext = this._skinauraGroup.getChildByName("tiptext");
                    if (tiptext) {
                        this._skinauraGroup.removeChild(tiptext);
                    }
                    var servant = Api.servantVoApi.getServantObj(this._servantId);
                    var child = this._skinauraGroup.getChildByName('skinauraTxt');
                    if (!child) {
                        var group = this._skinauraGroup;
                        var line1 = BaseBitmap.create('public_line3');
                        line1.width = 380;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line1, this._skinauraGroup, [0, 10], true);
                        group.addChild(line1);
                        var skinauraTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantskinaura"), 24, TextFieldConst.COLOR_BLACK);
                        skinauraTxt.name = 'skinauraTxt';
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinauraTxt, line1);
                        group.addChild(skinauraTxt);
                        var bg = BaseBitmap.create('public_9_managebg');
                        bg.width = 600;
                        bg.height = 70;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, skinauraTxt, [0, skinauraTxt.textHeight + 10]);
                        group.addChild(bg);
                        var levelupBtn = ComponentManager.getButton("servant_aura", "", function () {
                            //打开升级弹窗
                            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSKINAURAPOPUPVIEW, {
                                servantId: _this._servantId,
                                skinId: _this._servantSkinId
                            });
                        }, this);
                        levelupBtn.setScale(0.9);
                        levelupBtn.name = 'levelupBtn';
                        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, levelupBtn, bg, [30, 0]);
                        group.addChild(levelupBtn);
                        if (Api.servantVoApi.isShowAuralevelUpRedForEnter(this._servantId)) {
                            App.CommonUtil.addIconToBDOC(levelupBtn);
                        }
                        else {
                            App.CommonUtil.removeIconFromBDOC(levelupBtn);
                        }
                        /*["att"]={1,0,0,0},
                        ["growAtt"]=0.01,
                        ["maxLv"]=50,
                        ["growNeed"]="1555",
                        ["growNumNeed"]*/
                        //加成文字
                        for (var i in cfg.aura) {
                            var unit = cfg.aura[i];
                            var index = Number(i);
                            var value = '0';
                            var skinvo = servant.getSkinInfobyId(this._servantSkinId);
                            var curLevel = skinvo ? skinvo.getSkinAuraLv(Number(i) - 1) : 0;
                            if (cfg.aura[i].growAtt >= 1) {
                                var tmp = cfg.aura[i].growAtt * curLevel;
                                value = App.MathUtil.strip(tmp) + '';
                            }
                            else {
                                var tmp = cfg.aura[i].growAtt * 100 * curLevel;
                                value = App.MathUtil.strip(tmp) + '%';
                            }
                            var text = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinAuraAdd" + index, [String(TextFieldConst.COLOR_BLACK), value]), 22, TextFieldConst.COLOR_WARN_RED3);
                            text.name = "aura" + index;
                            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, text, bg, [index % 2 == 0 ? 235 : 20, (index < 3 ? 10 : 42)]);
                            this._skinauraGroup.addChild(text);
                        }
                        // let line2 = BaseBitmap.create('public_line1');
                        // line2.width = 500;
                        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line2, this._skinauraGroup, [0,0], true);
                        // group.addChild(line2);
                    }
                    else {
                        for (var i in cfg.aura) {
                            var unit = cfg.aura[i];
                            var skinvo = servant.getSkinInfobyId(this._servantSkinId);
                            var curLevel = skinvo ? skinvo.getSkinAuraLv(Number(i) - 1) : 0;
                            var index = Number(i);
                            var auratxt = this._skinauraGroup.getChildByName("aura" + index);
                            if (auratxt) {
                                var value = '0';
                                if (cfg.aura[i].growAtt >= 1) {
                                    var tmp = cfg.aura[i].growAtt * curLevel;
                                    value = App.MathUtil.strip(tmp) + '';
                                }
                                else {
                                    var tmp = cfg.aura[i].growAtt * 100 * curLevel;
                                    value = App.MathUtil.strip(tmp) + '%';
                                }
                                auratxt.text = LanguageManager.getlocal("servantSkinAuraAdd" + index, [String(TextFieldConst.COLOR_BLACK), value]);
                            }
                        }
                        this._skinauraGroup.visible = true;
                    }
                }
            }
            else {
                this._skinauraGroup.removeChildren();
                var serSkincfg = Config.ServantskinCfg.getServantSkinItemById(this._servantSkinId);
                if (serSkincfg) {
                    var tiptext = ComponentManager.getTextField(LanguageManager.getlocal("skin_notOwnTip"), 24, TextFieldConst.COLOR_BLACK);
                    tiptext.name = 'tiptext';
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tiptext, this._skinauraGroup, [0, 0], true);
                    this._skinauraGroup.addChild(tiptext);
                }
            }
            probg.y = -this.container.y + 720 - 40 - 106;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._skinauraGroup, probg, [0, probg.height + 15]);
        }
        else {
            if (this._skinauraGroup) {
                this._skinauraGroup.visible = false;
                this._skinauraGroup.removeChildren();
                this._skinauraGroup = null;
            }
            probg.y = -this.container.y + 720 - 40;
        }
        probg2.y = probg.y + probg.height;
        probg2.height = GameConfig.stageHeigth - this.container.y - probg2.y + 15;
        this._skinItemScrollview.y = probg.y;
        this._inflagImg.y = probg.y - 80;
        this._notGetTipTxt.y = this._inflagImg.y + 48;
        this._notGetTipImg.y = this._notGetTipTxt.y - (this._notGetTipImg.height / 2 - this._notGetTipTxt.height / 2);
        this._skinBtn.y = probg.y - 60;
        this.refreshSkinAbulity();
    };
    ServantSkinChangeView.prototype.getServantBookStars = function (num) {
        var objContainer = new BaseDisplayObjectContainer;
        for (var index = 1; index <= num; index++) {
            var starImg = BaseBitmap.create("servant_star");
            starImg.setScale(0.5);
            starImg.x = (index - 1) * starImg.width * 0.5;
            starImg.y = 0;
            objContainer.addChild(starImg);
        }
        return objContainer;
    };
    ServantSkinChangeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeskin_barbg", "wifeview_in", "tailor_iconBtn", "tailor_iconBtn_down",
            "skin_detail_namebg",
            "skin_detail_topbg",
            "skin_rankbtn_down", "skin_rankbtn", "wifeview_noget", "servant_aura", "servant_star", "wifeview_skingetbg",
        ]);
    };
    ServantSkinChangeView.prototype.hide = function () {
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        var newSid = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "";
        var _showAni = false;
        if (this._preSkinId != newSid) {
            _showAni = true;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, { isShowAni: _showAni, preSkinId: this._preSkinId, servantId: this._servantId });
        _super.prototype.hide.call(this);
    };
    ServantSkinChangeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP), this.skinkCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH, this.bgSwitchHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA, this.freshProtTxt, this);
        this._nodeContainer = null;
        this._servantSkinId = null;
        this._servantId = null;
        this._inflagImg = null;
        this._skinItemScrollview = null;
        this._skinBtn = null;
        this._bookNode = null;
        this._skinImg = null;
        this._skinNameTxt = null;
        this._infobg = null;
        this._notGetTipTxt = null;
        this._preSkinId = null;
        if (this._droWifeIcon) {
            this._droWifeIcon.stop();
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        this._skinauraGroup = null;
        this._notGetTipImg = null;
        _super.prototype.dispose.call(this);
    };
    return ServantSkinChangeView;
}(CommonView));
__reflect(ServantSkinChangeView.prototype, "ServantSkinChangeView");
//# sourceMappingURL=ServantSkinChangeView.js.map