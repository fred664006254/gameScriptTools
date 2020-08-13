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
 * author qianjun
 * date 202207/10/9
 * @class WifeskinViewTab1
 */
var WifeskinNewViewTab1 = (function (_super) {
    __extends(WifeskinNewViewTab1, _super);
    function WifeskinNewViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this._dgbone = null;
        _this._bottomBg = null;
        _this._txtList = [];
        _this._inBB = null;
        _this._noGetBB = null;
        _this._titleBg = null;
        _this._wifebgParticlegroupName = null;
        _this._bgContainer = null;
        _this._leveltxt = null;
        _this._levelupBtn = null;
        _this._infoGroup = null;
        _this._scrollview = null;
        _this.bottomBg3 = null;
        _this._pos = {
            "scene_wifeskin_1": { y: 120, height: 970 },
            "scene_wifeskin_2": { y: 100, height: 1010 },
        };
        _this.param = data;
        _this.initView();
        return _this;
    }
    WifeskinNewViewTab1.prototype.refreshWhenSwitchBack = function () {
        var _this = this;
        var view = this;
        var info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
        egret.callLater(function () {
            if (_this._dgbone) {
                _this._dgbone.dispose();
                _this._dgbone = null;
            }
            if (App.CommonUtil.check_dragon() && info.bgRes != "wifeview_optbg" && info.bgRes != "malewifebg") {
                var info_1 = Api.wifeVoApi.getWifeInfoVoById(_this.param.data.id);
                var arr = info_1.bgRes.split("_");
                var dgbone = App.DragonBonesUtil.getLoadDragonBones("scene_wifeskin_" + arr[1]);
                dgbone.x = 0;
                dgbone.y = _this._pos["scene_wifeskin_" + arr[1]].y;
                dgbone.setAnchorOffset(0, 0 - _this._pos["scene_wifeskin_" + arr[1]].height);
                _this.addChildAt(dgbone, _this.getChildIndex(_this._bg) + 1);
                _this._dgbone = dgbone;
            }
        }, view);
    };
    WifeskinNewViewTab1.prototype.clearDB = function () {
        if (this._dgbone) {
            this._dgbone.dispose();
            this._dgbone = null;
        }
    };
    WifeskinNewViewTab1.prototype.initView = function () {
        var _this = this;
        this.height = GameConfig.stageHeigth - 89;
        this.width = GameConfig.stageWidth;
        this.mask = new egret.Rectangle(0, 0, GameConfig.stageWidth, this.height);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshInfoAfterLove, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshInfoAfterLove, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFE, this.checkRedPoint, this);
        var id = this.param.data.id;
        WifeskinView.wifeId = id;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        // this.playEffect(this._wifeInfoVo.sound,true);
        //大背景
        var info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
        var bigBg = BaseLoadBitmap.create(info.bgRes);
        bigBg.y = -100;
        this._bg = bigBg;
        this.addChild(bigBg);
        egret.callLater(function () {
            if (_this._dgbone) {
                _this._dgbone.dispose();
                _this._dgbone = null;
            }
            if (App.CommonUtil.check_dragon() && info.bgRes != "wifeview_optbg" && info.bgRes != "malewifebg") {
                var info_2 = Api.wifeVoApi.getWifeInfoVoById(_this.param.data.id);
                var arr = info_2.bgRes.split("_");
                var dgbone = App.DragonBonesUtil.getLoadDragonBones("scene_wifeskin_" + arr[1]);
                dgbone.x = 0;
                dgbone.y = _this._pos["scene_wifeskin_" + arr[1]].y;
                dgbone.setAnchorOffset(0, 0 - _this._pos["scene_wifeskin_" + arr[1]].height);
                _this.addChildAt(dgbone, _this.getChildIndex(_this._bg) + 1);
                _this._dgbone = dgbone;
            }
        }, this);
        //描述背景
        this._titleBg = BaseBitmap.create("acliangbiographyview_common_acbg");
        this._titleBg.width = GameConfig.stageWidth;
        this.addChild(this._titleBg);
        var downTitleLine = BaseBitmap.create("public_line3");
        downTitleLine.width = 400;
        downTitleLine.setPosition(GameConfig.stageWidth / 2 - downTitleLine.width / 2, 7);
        this.addChild(downTitleLine);
        if (PlatformManager.checkIsEnLang()) {
            downTitleLine.setVisible(false);
        }
        //红颜描述文字
        this._skinName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL);
        // this._skinName.setColor();、、0xaf0052
        this._skinName.x = GameConfig.stageWidth / 2 - this._skinName.width / 2;
        this._skinName.y = 5;
        this.addChild(this._skinName);
        //红颜描述文字
        this._skinDesc = ComponentManager.getTextField(this._wifeInfoVo.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._skinDesc.lineSpacing = 5;
        this._skinDesc.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        this._skinDesc.x = 10;
        this._skinDesc.y = 30;
        this._skinDesc.width = GameConfig.stageWidth - this._skinDesc.x * 2;
        this.addChild(this._skinDesc);
        this._titleBg.height = this._skinDesc.y + this._skinDesc.textHeight + 10;
        var wifeScale = 0.55;
        //红颜图像
        this._skinPic = BaseLoadBitmap.create(this._wifeInfoVo.body);
        this._skinPic.x = 130;
        this._skinPic.setScale(wifeScale);
        this.addChild(this._skinPic);
        //下面属性背景
        // this._skinBg = BaseBitmap.create("wifeskin_barbg");
        // this._skinBg.x = 0;
        // this._skinBg.y = GameConfig.stageHeigth - this.y - this._skinBg.height;
        // this.addChild(this._skinBg);
        //下面属性背景
        var bottomBg = BaseBitmap.create("public_9_bg22");
        this._bottomBg = bottomBg;
        bottomBg.height = 250;
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - 89 - bottomBg.height - 90;
        this.addChild(bottomBg);
        var bottomBg3 = BaseBitmap.create("skin_detail_probg");
        bottomBg3.width = 594;
        bottomBg3.height = 138;
        bottomBg3.x = GameConfig.stageWidth / 2 - bottomBg3.width / 2;
        this.addChild(bottomBg3);
        this.bottomBg3 = bottomBg3;
        var descbg = BaseBitmap.create("skin_box_namebg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, this, [0, 0], true);
        this.addChild(descbg);
        // this._skinBg.y = bottomBg.y - this._skinBg.height;
        //换装按钮
        this._skinBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wifeskinViewTitle", this.skinHander, this, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._skinBtn, descbg, [85, 0]);
        // this._skinBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChild(this._skinBtn);
        //升级按钮
        var levelupBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wifeskinlvup", function () {
            if (levelupBtn.getIsGray()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinleveluptip1"));
                return;
            }
            //升级界面
            ViewController.getInstance().openView(ViewConst.COMMON.WIFESKINLEVELUPVIEW, {
                skinId: _this._skinId,
            });
        }, this, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, levelupBtn, descbg, [85, 0]);
        this.addChild(levelupBtn);
        this._levelupBtn = levelupBtn;
        this._inBB = BaseBitmap.create("wifeview_in");
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this._inBB, bottomBg, [15, bottomBg.height + 10]);
        this.addChild(this._inBB);
        this._noGetBB = BaseBitmap.create("wifeview_noget");
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this._noGetBB, bottomBg, [15, bottomBg.height + 10]);
        this.addChild(this._noGetBB);
        this._getText = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinGetDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._getText, descbg);
        this.addChild(this._getText);
        //下面属性背景
        // bottomBg2.y = bottomBg.y + bottomBg.height - 20;
        this._skinPic.y = 58;
        if (this._skinPic.y + 840 * wifeScale < bottomBg.y + 50) {
            this._skinPic.y = bottomBg.y - 50 - 840 * wifeScale + 89;
        }
        var skinList = Api.wifeSkinVoApi.getWifeSkinListById(id);
        skinList.unshift(null);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 100, bottomBg.y - 100);
        this._scrollList = ComponentManager.getScrollList(WifeskinNewScrollItem, skinList, rect);
        // scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
        this.addChild(this._scrollList);
        this._scrollList.setPosition(12, this._titleBg.y + this._titleBg.height);
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        this._scrollList.bounces = false;
        // this.setData("1011");
        var downTitleLine2 = BaseBitmap.create("skin_detail_pronamebg");
        downTitleLine2.setPosition(GameConfig.stageWidth / 2 - downTitleLine2.width / 2, bottomBg.y + 13);
        this.addChild(downTitleLine2);
        //红颜描述文字
        var skinLv = Api.wifeSkinVoApi.getWifeSkinLV(this.param.data.wifeSkinId);
        var attTitle = ComponentManager.getTextField(LanguageManager.getlocal("discussServantLevel", [skinLv.toString()]), TextFieldConst.FONTSIZE_TITLE_SMALL);
        // attTitle.setColor(TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, attTitle, downTitleLine2, [0, 1]);
        this.addChild(attTitle);
        this._leveltxt = attTitle;
        bottomBg3.y = downTitleLine2.y + downTitleLine2.height + 10;
        // let infogroup = new BaseDisplayObjectContainer();
        // infogroup.width = bottomBg3.width;
        // this.addChild(infogroup);
        // this._infoGroup = infogroup;
        // let bgrect1 = new egret.Rectangle(0,0,bottomBg3.width,bottomBg3.height-8);
        // let scrollview1 : ScrollView = ComponentManager.getScrollView(infogroup,bgrect1);
        // scrollview1.bounces = false;
        // this.addChild(scrollview1);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview1, bottomBg3);
        // this._scrollview = scrollview1;
        this._noAddAtt = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinNoAdd"), TextFieldConst.FONTSIZE_TITLE_BIG);
        this._noAddAtt.setColor(TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._noAddAtt, bottomBg3);
        this.addChild(this._noAddAtt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinDesc"), 22, TextFieldConst.COLOR_BROWN);
        tipTxt.setColor(0xaf0052);
        tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg3.y + bottomBg3.height + 10;
        this.addChild(tipTxt);
        this.initState();
    };
    WifeskinNewViewTab1.prototype.initState = function () {
        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this.param.data.id);
        if (this.param.data.wifeSkinId) {
            this.setData(this.param.data.wifeSkinId);
            this.setSelect(this.param.data.wifeSkinId);
            return;
        }
        if (wifeSkinVo) {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
            if (skinCfg) {
                var id = skinCfg.id;
                this.setData(id);
                this.setSelect(id);
            }
            else {
                this.setData(null);
                this.setSelect(null);
            }
        }
        else {
            this.setData(null);
            this.setSelect(null);
        }
    };
    WifeskinNewViewTab1.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        // if (this._childInfoVoList) {
        var skinList = Api.wifeSkinVoApi.getWifeSkinListById(WifeskinView.wifeId);
        skinList.unshift(null);
        var skinCfg = skinList[index];
        if (skinCfg) {
            var id = skinCfg.id;
            if (Api.wifeSkinVoApi.getSkinOneRed(WifeskinView.wifeId, id)) {
                this.request(NetRequestConst.REQUEST_WIFE_READSKINRED, { wifeId: String(this.param.data.id), wifeSkinId: id });
            }
            if (this._skinId == id) {
                return;
            }
            this.setData(id);
            this.setSelect(id);
        }
        else {
            // let id = skinCfg.id;
            // this.setData(id)
            // this.setSelect(id);
            if (this._skinId == null) {
                return;
            }
            this.setData(null);
            this.setSelect(null);
        }
        // }
    };
    //刷新选中状态
    WifeskinNewViewTab1.prototype.setSelect = function (skinId) {
        this._skinId = skinId;
        var childIndex;
        if (skinId) {
            childIndex = Api.wifeSkinVoApi.getWifeSkinIndexVoById(skinId) + 1;
        }
        else {
            childIndex = 0;
        }
        if (this._childScrollItem) {
            if (this._childScrollItem.getChildByName("bg2")) {
                var bg_1 = this._childScrollItem.getChildByName("bg2");
                bg_1.texture = ResourceManager.getRes("tailor_iconBtn");
            }
        }
        this._childScrollItem = this._scrollList.getItemByIndex(childIndex);
        // let bg2Index = this._childScrollItem.getChildIndex(this._childScrollItem.getChildByName("bg2"));
        var bg = this._childScrollItem.getChildByName("bg2");
        bg.texture = ResourceManager.getRes("tailor_iconBtn_down");
        if (this._childScrollItem.getChildByName("redsp")) {
            var bg_2 = this._childScrollItem.getChildByName("redsp");
            bg_2.visible = Api.wifeSkinVoApi.getSkinOneRed(this.param.data.id, this._skinId);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFENEWSKIN_CHANGESKIN);
        }
    };
    WifeskinNewViewTab1.prototype.canLevelUp = function (id) {
        var view = this;
        var canlevelup = false;
        var wifeskincfg = Config.WifeskinCfg.getWifeCfgById(id);
        if (wifeskincfg && wifeskincfg.levelUp) {
            var lv = Api.wifeSkinVoApi.getWifeSkinLV(id);
            var levelup = wifeskincfg.levelUp[lv];
            if (levelup) {
                var levelUpCost = levelup.levelUpCost;
                if (levelUpCost && levelUpCost != "") {
                    var rewardvo = GameData.formatRewardItem(levelUpCost)[0];
                    var have = Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
                    var need = rewardvo.num;
                    if (have >= need) {
                        canlevelup = true;
                    }
                }
            }
        }
        return canlevelup;
    };
    WifeskinNewViewTab1.prototype.setData = function (skinId) {
        var _this = this;
        if (skinId) {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            this._skinDesc.text = skinCfg.desc;
            this._titleBg.height = this._skinDesc.y + this._skinDesc.textHeight + 10;
            this._scrollList.setPosition(12, this._titleBg.y + this._titleBg.height);
            this._skinName.text = skinCfg.name;
            this._skinName.x = GameConfig.stageWidth / 2 - this._skinName.width / 2;
            this._skinPic.setload(skinCfg.body);
            if (skinCfg.levelUp) {
                this._levelupBtn.visible = true;
                //this._levelupBtn.setGray(false);
            }
            else {
                this._levelupBtn.visible = false;
                //this._levelupBtn.setGray(true);
            }
            if (this.canLevelUp(skinId)) {
                App.CommonUtil.addIconToBDOC(this._levelupBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._levelupBtn);
            }
            if (this._infoGroup) {
                this._infoGroup.dispose();
                this._infoGroup = null;
            }
            if (this._scrollview) {
                this._scrollview.dispose();
                this._scrollview = null;
            }
            var infogroup = new BaseDisplayObjectContainer();
            infogroup.width = this.bottomBg3.width;
            this.addChild(infogroup);
            this._infoGroup = infogroup;
            var bgrect1 = new egret.Rectangle(0, 0, this.bottomBg3.width, this.bottomBg3.height - 8);
            var resultStr = this.dealAttrChangeInfo(skinId);
            var startY = 10;
            for (var i in resultStr) {
                var addX = 0;
                if (Number(i) % 2 > 0) {
                    addX = 300;
                }
                var attrNameTxt = ComponentManager.getTextField(resultStr[i], 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                attrNameTxt.x = 45 + addX;
                attrNameTxt.y = startY;
                if (Number(i) % 2 > 0) {
                    startY = startY + attrNameTxt.height + 5;
                }
                this._infoGroup.addChild(attrNameTxt);
            }
            if (resultStr.length == 0) {
                this._noAddAtt.visible = true;
            }
            else {
                // this._infoGroup.height = startY;
                this._noAddAtt.visible = false;
            }
            var mask = BaseBitmap.create("public_alphabg");
            mask.height = this._infoGroup.height;
            mask.width = this._infoGroup.width;
            this._infoGroup.addChild(mask);
            var scrollview1 = ComponentManager.getScrollView(this._infoGroup, bgrect1);
            scrollview1.bounces = false;
            this.addChild(scrollview1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview1, this.bottomBg3);
            this._scrollview = scrollview1;
            this._scrollview.setArrow();
            if (this._droWifeIcon) {
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            if (Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske")) {
                // let bg2Index = this.getChildIndex(this._skinPic);
                var bg2Index = this.getChildIndex(this._titleBg);
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone, 0, "idle", function () {
                    if (_this._droWifeIcon) {
                        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, _this._droWifeIcon, _this._bottomBg, [320, _this._bottomBg.height - _this._droWifeIcon.height * _this._droWifeIcon.scaleY - 60]);
                    }
                }, this);
                this._droWifeIcon.setScale(0.8);
                this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2, 0);
                // this._droWifeIcon.x = this._skinPic.x + 190;
                // this._droWifeIcon.y = this._titleBg.y + this._titleBg.height + 800*0.6;
                this.addChildAt(this._droWifeIcon, bg2Index);
                this._skinPic.visible = false;
                if (this._droWifeIcon.y) {
                }
            }
            else {
                // this.
            }
            var skinLv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
            this._leveltxt.text = LanguageManager.getlocal("discussServantLevel", [skinLv.toString()]);
            this._leveltxt.x = (GameConfig.stageWidth - this._leveltxt.width) / 2;
            this._leveltxt.visible = true;
        }
        else {
            if (this._infoGroup) {
                this._infoGroup.dispose();
                this._infoGroup = null;
            }
            if (this._scrollview) {
                this._scrollview.dispose();
                this._scrollview = null;
            }
            this._levelupBtn.visible = false;
            App.CommonUtil.removeIconFromBDOC(this._levelupBtn);
            this._skinDesc.text = this._wifeInfoVo.desc;
            this._titleBg.height = this._skinDesc.y + this._skinDesc.textHeight + 10;
            this._scrollList.setPosition(12, this._titleBg.y + this._titleBg.height);
            this._skinName.text = this._wifeInfoVo.name;
            this._skinName.x = GameConfig.stageWidth / 2 - this._skinName.width / 2;
            this._skinPic.setload(this._wifeInfoVo.body);
            for (var index = 0; index < this._txtList.length; index++) {
                this._txtList[index].visible = false;
            }
            this._leveltxt.visible = true;
            this._noAddAtt.visible = true;
            if (this._droWifeIcon) {
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            if (Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske")) {
                // let bg2Index = this.getChildIndex(this._skinPic);
                var bg2Index = this.getChildIndex(this._titleBg);
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone, 0, "idle", function () {
                    if (_this._droWifeIcon) {
                        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, _this._droWifeIcon, _this._bottomBg, [320, _this._bottomBg.height - _this._droWifeIcon.height * _this._droWifeIcon.scaleY - 60]);
                    }
                }, this);
                this._droWifeIcon.setScale(0.8);
                this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2, 0);
                // this._droWifeIcon.x = this._skinPic.x + 150;
                // this._droWifeIcon.y = this._titleBg.y + this._titleBg.height + 800*0.6;
                this.addChildAt(this._droWifeIcon, bg2Index);
                this._skinPic.visible = false;
                if (this._droWifeIcon.y) {
                }
            }
            else {
                // this.
            }
        }
        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this.param.data.id);
        //穿戴中
        var skId = skinId;
        if (!skId) {
            skId = "";
        }
        //穿戴中
        if (wifeSkinVo && wifeSkinVo.equip == skId || (!wifeSkinVo && skId == "")) {
            this._skinBtn.visible = false;
            this._inBB.visible = true;
            this._getText.visible = false;
            this._noGetBB.visible = false;
            // this._levelupBtn.visible = true;
            this._levelupBtn.x = (this.width - this._levelupBtn.width) / 2;
        }
        else {
            if (skId == "" || Api.wifeSkinVoApi.isOwnSkinOfSkinId(skId)) {
                //未穿戴
                this._skinBtn.visible = true;
                this._inBB.visible = false;
                this._getText.visible = false;
                this._noGetBB.visible = false;
                if (this._levelupBtn.visible) {
                    this._skinBtn.x = 85;
                    this._levelupBtn.x = this.width - this._levelupBtn.width - 85;
                }
                else {
                    this._skinBtn.x = (this.width - this._skinBtn.width) / 2;
                }
            }
            else {
                //未获得
                this._levelupBtn.visible = false;
                this._skinBtn.visible = false;
                this._inBB.visible = false;
                this._getText.visible = true;
                this._noGetBB.visible = true;
                this._getText.text = LanguageManager.getlocal("skinDropDesc_" + skId);
                this._getText.x = (GameConfig.stageWidth - this._getText.width) / 2;
            }
        }
        // this.checkDro();
        if (this._droWifeIcon) {
            // this._droWifeIcon.x = this._skinPic.x + 150;
            // this._droWifeIcon.y = this._skinPic.y + 760*0.7 - 90;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this._bottomBg, [320, this._bottomBg.height - this._droWifeIcon.height * this._droWifeIcon.scaleY]);
            this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2, 0);
        }
        else {
            this._skinPic.visible = true;
        }
        // this.refreshWifeBg(skinId);
    };
    WifeskinNewViewTab1.prototype.checkDro = function () {
        var _this = this;
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        // let bg2Index = this.getChildIndex(this._skinPic);
        var bg2Index = this.getChildIndex(this._titleBg);
        if (Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                if (RES.hasRes(skinCfg.bone + "_ske") && App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone()) {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone, 0, "idle", function () {
                        if (_this._droWifeIcon) {
                            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, _this._droWifeIcon, _this._bottomBg, [320, _this._bottomBg.height - _this._droWifeIcon.height * _this._droWifeIcon.scaleY]);
                        }
                    }, this);
                    this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2, 0);
                    // this._droWifeIcon.setScale(0.7) 
                    // this._droWifeIcon.x = 0;
                    // this._droWifeIcon.y = 0;
                    this.addChildAt(this._droWifeIcon, bg2Index);
                    this._skinPic.visible = false;
                }
            }
            else {
                if (Api.wifeVoApi.isHaveBone(this._wifeInfoVo + "_ske")) {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone, 0, "idle", function () {
                        if (_this._droWifeIcon) {
                            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, _this._droWifeIcon, _this._bottomBg, [320, _this._bottomBg.height - _this._droWifeIcon.height * _this._droWifeIcon.scaleY]);
                        }
                    }, this);
                    this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2, 0);
                    // this._droWifeIcon.setScale(0.7)
                    // this._droWifeIcon.x = this._skinPic.x;
                    // this._droWifeIcon.y = this._skinPic.y;
                    this.addChildAt(this._droWifeIcon, bg2Index);
                }
            }
        }
        else {
            if (Api.wifeVoApi.isHaveBone(this._wifeInfoVo + "_ske")) {
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone, 0, "idle", function () {
                    if (_this._droWifeIcon) {
                        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, _this._droWifeIcon, _this._bottomBg, [320, _this._bottomBg.height - _this._droWifeIcon.height * _this._droWifeIcon.scaleY]);
                    }
                }, this);
                this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2, 0);
                // this._droWifeIcon.setScale(0.7)
                // this._droWifeIcon.x = this._skinPic.x;
                // this._droWifeIcon.y = this._skinPic.y;
                this.addChildAt(this._droWifeIcon, bg2Index);
                this._skinPic.visible = false;
            }
        }
        if (this._droWifeIcon) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this._bottomBg, [320, this._bottomBg.height - this._droWifeIcon.height * this._droWifeIcon.scaleY]);
            this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2, 0);
        }
        else {
            this._skinPic.visible = true;
        }
    };
    WifeskinNewViewTab1.prototype.dealAttrChangeInfo = function (skinId) {
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
        var skinlv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
        var obj = {};
        // let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
        var resultStr = [];
        var atkAdd = skinCfg.atkAdd;
        var inteAdd = skinCfg.inteAdd;
        var politicsAdd = skinCfg.politicsAdd;
        var charmAdd = skinCfg.charmAdd;
        var wifeIntimacy = skinCfg.wifeIntimacy;
        var wifeGlamour = skinCfg.wifeGlamour;
        var childReduce = skinCfg.childReduce;
        var searchReduce = skinCfg.searchReduce;
        var wifeReduce = skinCfg.wifeReduce;
        var num = 0;
        var levelup = Config.WifeskinCfg.getWifeCfgById(skinId);
        if (skinCfg.levelUp) {
            for (var i = 0; i < skinlv; ++i) {
                var unit = skinCfg.levelUp[i];
                if (unit) {
                    var sid = unit.levelUpAimId;
                    var cfg = null;
                    if (sid) {
                        cfg = unit.levelUpAim == 1 ? Config.ServantCfg.getServantItemById(sid) : Config.WifeCfg.getWifeCfgById(sid);
                    }
                    if (!obj[unit.levelUpType]) {
                        obj[unit.levelUpType] = {};
                        obj[unit.levelUpType].name = cfg ? cfg.name : null;
                        obj[unit.levelUpType].value = 0;
                    }
                    obj[unit.levelUpType].value += unit.levelUpEffect;
                }
            }
            // if(wifeIntimacy && wifeIntimacy > 0){
            // 	if(!obj[5]){
            // 		obj[5] = {};
            // 		obj[5].name = wifecfg.name;
            // 		obj[5].value = 0;
            // 	}
            // 	obj[5].value += wifeIntimacy;
            // }
            // if(wifeGlamour && wifeGlamour > 0)  {
            // 	if(!obj[6]){
            // 		obj[6] = {};
            // 		obj[6].name = wifecfg.name;
            // 		obj[6].value = 0;
            // 	}
            // 	obj[6].value += wifeGlamour;
            // } 
        }
        if (atkAdd) {
            num = atkAdd[1];
            if (atkAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd1", [num.toString()]));
            }
            else if (atkAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd1", [num * 100 + "%"]));
            }
            else if (atkAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd10", [num.toString()]));
            }
            else if (atkAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd10", [num * 100 + "%"]));
            }
        }
        if (inteAdd) {
            num = inteAdd[1];
            if (inteAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd2", [num.toString()]));
            }
            else if (inteAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd2", [num * 100 + "%"]));
            }
            else if (inteAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd11", [num.toString()]));
            }
            else if (inteAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd11", [num * 100 + "%"]));
            }
        }
        if (politicsAdd) {
            num = politicsAdd[1];
            if (politicsAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd3", [num + '']));
            }
            else if (politicsAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd3", [num * 100 + "%"]));
            }
            else if (politicsAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd12", [num + ""]));
            }
            else if (politicsAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd12", [num * 100 + "%"]));
            }
        }
        if (charmAdd) {
            num = charmAdd[1];
            if (charmAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd4", [num + '']));
            }
            else if (charmAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd4", [num * 100 + "%"]));
            }
            else if (charmAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd13", [num + ""]));
            }
            else if (charmAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("wifeskinAttrAdd13", [num * 100 + "%"]));
            }
        }
        var atkAdd2 = skinCfg.atkAdd2;
        var inteAdd2 = skinCfg.inteAdd2;
        var politicsAdd2 = skinCfg.politicsAdd2;
        var charmAdd2 = skinCfg.charmAdd2;
        var wifeCfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
        var servantName = LanguageManager.getlocal("servant_name" + wifeCfg.servantId);
        if (atkAdd2) {
            if (atkAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("wifeskinlevelupAdd10", [servantName, String(0xffffff), atkAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("wifeskinlevelupAdd10", [servantName, String(0xffffff), atkAdd2[1] * 100 + "%"]));
            }
        }
        if (inteAdd2) {
            if (inteAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("wifeskinlevelupAdd11", [servantName, String(0xffffff), inteAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("wifeskinlevelupAdd11", [servantName, String(0xffffff), inteAdd2[1] * 100 + "%"]));
            }
        }
        if (politicsAdd2) {
            if (politicsAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("wifeskinlevelupAdd12", [servantName, String(0xffffff), politicsAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("wifeskinlevelupAdd12", [servantName, String(0xffffff), politicsAdd2[1] * 100 + "%"]));
            }
        }
        if (charmAdd2) {
            if (charmAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("wifeskinlevelupAdd13", [servantName, String(0xffffff), charmAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("wifeskinlevelupAdd13", [servantName, String(0xffffff), charmAdd2[1] * 100 + "%"]));
            }
        }
        if (wifeIntimacy && wifeIntimacy > 0) {
            if (!obj[5]) {
                obj[5] = {};
                obj[5].name = wifecfg.name;
                obj[5].value = 0;
            }
            obj[5].value += wifeIntimacy;
        }
        if (wifeGlamour && wifeGlamour > 0) {
            if (!obj[6]) {
                obj[6] = {};
                obj[6].name = wifecfg.name;
                obj[6].value = 0;
            }
            obj[6].value += wifeGlamour;
        }
        if (childReduce && childReduce > 0) {
            num = childReduce;
            if (!obj[7]) {
                obj[7] = {};
                obj[7].value = 0;
            }
            obj[7].value += num;
        }
        if (searchReduce && searchReduce > 0) {
            num = searchReduce;
            if (!obj[8]) {
                obj[8] = {};
                obj[8].value = 0;
            }
            obj[8].value += num;
        }
        if (wifeReduce && wifeReduce > 0) {
            num = wifeReduce;
            if (!obj[9]) {
                obj[9] = {};
                obj[9].value = 0;
            }
            obj[9].value += num;
        }
        for (var i in obj) {
            var type = i;
            var unit = obj[i];
            if (unit) {
                var name_1 = unit.name;
                var total = unit.value;
                var param = [];
                if (name_1) {
                    param.push(name_1);
                }
                else {
                    param.push("");
                }
                param.push(String(0xffffff));
                param.push(total > 1 ? total : ((total * 100).toFixed(0) + "%"));
                resultStr.push(LanguageManager.getlocal("wifeskinlevelupAdd" + type, param));
            }
        }
        return resultStr;
    };
    WifeskinNewViewTab1.prototype.checkRedPoint = function () {
        //背景切换
        var view = this;
        var info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
        this._bg.setload(info.bgRes);
        if (this._dgbone) {
            this._dgbone.dispose();
            this._dgbone = null;
        }
        if (App.CommonUtil.check_dragon() && info.bgRes != "wifeview_optbg" && info.bgRes != "malewifebg") {
            var info_3 = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
            var arr = info_3.bgRes.split("_");
            var dgbone = App.DragonBonesUtil.getLoadDragonBones("scene_wifeskin_" + arr[1]);
            dgbone.x = 0;
            dgbone.y = this._pos["scene_wifeskin_" + arr[1]].y;
            dgbone.setAnchorOffset(0, 0 - this._pos["scene_wifeskin_" + arr[1]].height);
            this.addChildAt(dgbone, this.getChildIndex(this._bg) + 1);
            this._dgbone = dgbone;
        }
        //等级变化
        var skinLv = Api.wifeSkinVoApi.getWifeSkinLV(this._skinId);
        this._leveltxt.text = LanguageManager.getlocal("discussServantLevel", [skinLv.toString()]);
        this._leveltxt.x = (GameConfig.stageWidth - this._leveltxt.width) / 2;
        this._leveltxt.visible = true;
        //属性变化
        if (this._skinId && this._skinId != "") {
            if (this._infoGroup) {
                this._infoGroup.dispose();
                this._infoGroup = null;
            }
            if (this._scrollview) {
                this._scrollview.dispose();
                this._scrollview = null;
            }
            var infogroup = new BaseDisplayObjectContainer();
            infogroup.width = this.bottomBg3.width;
            this.addChild(infogroup);
            this._infoGroup = infogroup;
            var bgrect1 = new egret.Rectangle(0, 0, this.bottomBg3.width, this.bottomBg3.height - 8);
            var resultStr = this.dealAttrChangeInfo(this._skinId);
            var startY = 10;
            for (var i in resultStr) {
                var addX = 0;
                if (Number(i) % 2 > 0) {
                    addX = 300;
                }
                var attrNameTxt = ComponentManager.getTextField(resultStr[i], 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                attrNameTxt.x = 45 + addX;
                attrNameTxt.y = startY;
                if (Number(i) % 2 > 0) {
                    startY = startY + attrNameTxt.height + 5;
                }
                this._infoGroup.addChild(attrNameTxt);
            }
            if (resultStr.length == 0) {
                this._noAddAtt.visible = true;
            }
            else {
                this._noAddAtt.visible = false;
                // this._infoGroup.height = startY;//resultStr.length % 2 == 1 ? (startY) : (startY);
            }
            var mask = BaseBitmap.create("public_alphabg");
            mask.height = view._infoGroup.height;
            mask.width = view._infoGroup.width;
            view._infoGroup.addChild(mask);
            var scrollview1 = ComponentManager.getScrollView(this._infoGroup, bgrect1);
            scrollview1.bounces = false;
            this.addChild(scrollview1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview1, this.bottomBg3);
            this._scrollview = scrollview1;
            this._scrollview.setArrow();
        }
        else {
            for (var index = 0; index < this._txtList.length; index++) {
                this._txtList[index].visible = false;
            }
            this._noAddAtt.visible = true;
        }
        if (this._childScrollItem.getChildByName("redsp")) {
            var bg = this._childScrollItem.getChildByName("redsp");
            bg.visible = Api.wifeSkinVoApi.getSkinOneRed(this.param.data.id, this._skinId);
        }
        var skinId = this._skinId;
        if (skinId && skinId != "") {
            if (this.canLevelUp(skinId)) {
                App.CommonUtil.addIconToBDOC(this._levelupBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._levelupBtn);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._levelupBtn);
        }
    };
    WifeskinNewViewTab1.prototype.skinHander = function () {
        var skinId = this._skinId;
        if (!skinId) {
            skinId = "";
        }
        this.request(NetRequestConst.REQUEST_WIFE_EQUIP, { wifeId: String(this.param.data.id), wifeSkinId: skinId });
    };
    //宠幸之后刷新数据
    WifeskinNewViewTab1.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.ret < 0) {
                return;
            }
            var baseview = ViewController.getInstance().getView("WifeskinNewView");
            if (data.data.cmd == NetRequestConst.REQUEST_WIFE_EQUIP) {
                //this.initState();
                baseview.hide();
            }
        }
    };
    WifeskinNewViewTab1.prototype.refreshInfoAfterLove = function (event) {
        if (!event.data.ret) {
            return;
        }
        var id = this.param.data.id;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        //亲密度
        var IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
        // this._intimateValueText.text = IntimacyValue
    };
    WifeskinNewViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFE_LOVECOM);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshInfoAfterLove, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshInfoAfterLove, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFE, this.checkRedPoint, this);
        this._skinDesc = null;
        this._wifeInfoVo = null;
        this._skinPic = null;
        WifeskinView.wifeId = null;
        this._childScrollItem = null;
        this._scrollList = null;
        this._txtList = [];
        this._skinId = null;
        this._inBB = null;
        this._getText = null;
        this._noGetBB = null;
        this._droWifeIcon = null;
        this._titleBg = null;
        if (this._wifebgParticlegroupName) {
            ResourceManager.destroyRes(this._wifebgParticlegroupName);
            this._wifebgParticlegroupName = null;
        }
        this._bgContainer = null;
        this._bottomBg = null;
        this._leveltxt = null;
        this._levelupBtn = null;
        this._infoGroup = null;
        this._scrollview = null;
        this._bg = null;
        this.bottomBg3 = null;
        if (this._dgbone) {
            this._dgbone.dispose();
            this._dgbone = null;
        }
    };
    return WifeskinNewViewTab1;
}(CommonViewTab));
__reflect(WifeskinNewViewTab1.prototype, "WifeskinNewViewTab1");
//# sourceMappingURL=WifeskinNewViewTab1.js.map