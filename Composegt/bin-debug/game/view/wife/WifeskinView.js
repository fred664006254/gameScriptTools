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
 * 红颜换皮肤界面
 * author dky
 * date 2018/3/2
 * @class WifeskinView
 */
var WifeskinView = (function (_super) {
    __extends(WifeskinView, _super);
    function WifeskinView() {
        var _this = _super.call(this) || this;
        _this._txtList = [];
        _this._inBB = null;
        _this._noGetBB = null;
        _this._textBg = null;
        _this._titleBg = null;
        _this._skinBg = null;
        _this._detailBtn = null;
        _this._curSkinId = null;
        return _this;
    }
    WifeskinView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE, this.doGuide, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshInfoAfterLove, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshInfoAfterLove, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFE, this.checkRedPoint, this);
        var id = this.param.data.id;
        WifeskinView.wifeId = id;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        // this.playEffect(this._wifeInfoVo.sound,true);
        //大背景
        var bigBg = BaseBitmap.create("wifeview_optbg");
        bigBg.y = -15;
        this.addChildToContainer(bigBg);
        //描述背景
        this._titleBg = BaseBitmap.create("public_9v_bg10");
        this._titleBg.width = GameConfig.stageWidth;
        this._titleBg.height = 100;
        this._titleBg.y = -25;
        this.addChildToContainer(this._titleBg);
        //皮肤名字
        this._skinName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._skinName.setColor(TextFieldConst.COLOR_WHITE);
        this._skinName.x = GameConfig.stageWidth / 2 - this._skinName.width / 2;
        this._skinName.y = -11;
        this.addChildToContainer(this._skinName);
        var downTitleLine = BaseBitmap.create("public_huawen_bg");
        // downTitleLine.width = 400;
        downTitleLine.setPosition(GameConfig.stageWidth / 2 - downTitleLine.width / 2, 9);
        this.addChildToContainer(downTitleLine);
        //红颜描述文字
        this._skinDesc = ComponentManager.getTextField(this._wifeInfoVo.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._skinDesc.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        this._skinDesc.x = 10;
        this._skinDesc.y = 21;
        this._skinDesc.width = GameConfig.stageWidth - this._skinDesc.x * 2;
        this.addChildToContainer(this._skinDesc);
        var wifeScale = 0.65;
        //红颜图像
        this._skinPic = BaseLoadBitmap.create(this._wifeInfoVo.body);
        this._skinPic.x = 130;
        this._skinPic.setScale(wifeScale);
        this.addChildToContainer(this._skinPic);
        // let npc=App.DragonBonesUtil.getLoadDragonBones("wife_full2_306");
        // npc.setScale(0.7)
        // npc.x = 200;
        // npc.y = 800;
        // this.addChildToContainer(npc);
        //下面属性背景
        this._skinBg = BaseBitmap.create("wifeview_hongyantyouxiangbg");
        this._skinBg.width = GameConfig.stageWidth;
        this._skinBg.height = 100;
        this._skinBg.x = 0;
        this._skinBg.y = GameConfig.stageHeigth - this.container.y - this._skinBg.height;
        this.addChildToContainer(this._skinBg);
        // let bottomBg2:BaseBitmap = BaseBitmap.create("wifeskin_bottombg");
        // bottomBg2.width = GameConfig.stageWidth;
        // bottomBg2.height = 96;
        // bottomBg2.x = 0;
        // this.addChildToContainer(bottomBg2);
        //下面属性背景
        var bottomBg = BaseBitmap.create("public_9v_bg14");
        bottomBg.width = 610; //GameConfig.stageWidth;
        bottomBg.height = 330;
        bottomBg.x = this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        //拼接 tab下背景
        var bottomBorder = BaseBitmap.create("commonview_border1");
        bottomBorder.width = GameConfig.stageWidth;
        bottomBorder.height = bottomBg.height;
        bottomBorder.x = 0;
        bottomBorder.y = bottomBg.y;
        this.addChildToContainer(bottomBorder);
        var bottomTop = BaseBitmap.create("commonview_border2");
        bottomTop.width = GameConfig.stageWidth;
        bottomTop.scaleY = -1;
        bottomTop.x = 0;
        bottomTop.y = bottomBorder.y + 25;
        this.addChildToContainer(bottomTop);
        var bottomB = BaseBitmap.create("commonview_bottom");
        bottomB.width = GameConfig.stageWidth;
        bottomB.x = 0;
        bottomB.y = bottomBorder.y + bottomBorder.height - bottomB.height;
        this.addChildToContainer(bottomB);
        // let bottomBg3:BaseBitmap = BaseBitmap.create("public_9_managebg");
        // bottomBg3.width = 594;
        // bottomBg3.height = 138;
        // bottomBg3.x = GameConfig.stageWidth/2 - bottomBg3.width/2;
        // bottomBg3.y = bottomBg.y + 44;
        // this.addChildToContainer(bottomBg3);
        this._skinBg.y = bottomBg.y - this._skinBg.height + 15;
        //换装按钮
        this._skinBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "wifeskinViewTitle", this.skinHander, this, null, 0);
        this._skinBtn.x = 470;
        this._skinBtn.y = this._skinBg.y - 60;
        // this._skinBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._skinBtn);
        this._inBB = BaseBitmap.create("wifeview_in");
        this._inBB.x = GameConfig.stageWidth - this._inBB.width; //490;
        this._inBB.y = this._skinBg.y - 85;
        this.addChildToContainer(this._inBB);
        this._noGetBB = BaseBitmap.create("wifeview_noget");
        this._noGetBB.x = GameConfig.stageWidth - this._noGetBB.width; //490;
        this._noGetBB.y = this._skinBg.y - 85;
        this.addChildToContainer(this._noGetBB);
        this._textBg = BaseBitmap.create("wifeview_skingetbg");
        this._textBg.x = 470;
        this._textBg.y = this._skinBg.y - 32;
        this.addChildToContainer(this._textBg);
        this._getText = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinGetDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._getText.x = GameConfig.stageWidth - this._getText.width - 10;
        this._getText.y = this._skinBg.y - 27;
        this.addChildToContainer(this._getText);
        this._textBg.width = this._getText.width + 40;
        this._textBg.x = GameConfig.stageWidth - this._textBg.width;
        //下面属性背景
        // bottomBg2.y = bottomBg.y + bottomBg.height - 20;
        this._skinPic.y = 58 + 50;
        if (this._skinPic.y + 840 * wifeScale < bottomBg.y + 50) {
            this._skinPic.y = bottomBg.y - 50 - 840 * wifeScale + 50;
        }
        var skinList = Api.wifeSkinVoApi.getWifeSkinListById(id);
        skinList.unshift(null);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 14, 110);
        this._scrollList = ComponentManager.getScrollList(WifeskinScrollItem, skinList, rect);
        // scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(7, this._skinBg.y - 5);
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        // this.setData("1011");
        var innerbg = BaseBitmap.create("public_9v_bg12");
        innerbg.width = 585;
        // innerbg.height = 364+promoDeltaH;
        innerbg.height = bottomBg.height - 120;
        innerbg.x = bottomBg.x + bottomBg.width / 2 - innerbg.width / 2;
        innerbg.y = bottomBg.y + 60;
        this.addChildToContainer(innerbg);
        // let innerTopBg = BaseBitmap.create("public_up2");
        // innerTopBg.x = bottomBg.width/2 - innerTopBg.width/2;
        // innerTopBg.y = bottomBg.y + 29.5;
        // this.addChildToContainer(innerTopBg);
        if (Api.switchVoApi.checkOpenWifeskinLvup()) {
            //查看登记详情
            this._detailBtn = ComponentManager.getButton("btn_lookdetail", null, this.detailHandler, this);
            this._detailBtn.x = innerbg.x + innerbg.width - this._detailBtn.width - 10;
            this._detailBtn.y = innerbg.y - this._detailBtn.height - 5;
            this.addChildToContainer(this._detailBtn);
        }
        var officeBg = BaseBitmap.create("public_ts_bg01");
        // officeBg.x = GameConfig.stageWidth/2-officeBg.width/2 - 10;
        // officeBg.y = innerTopBg.y + innerTopBg.height/2 - officeBg.height/2 ;
        this.addChildToContainer(officeBg);
        var officeTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeskin_valuetitle"), 24, TextFieldConst.COLOR_BROWN_NEW);
        officeTxt.x = this.viewBg.width / 2 - officeTxt.width / 2;
        officeTxt.y = innerbg.y - 10 - officeTxt.height;
        this.addChildToContainer(officeTxt);
        officeBg.width = officeTxt.width + 120;
        officeBg.x = officeTxt.x + officeTxt.width / 2 - officeBg.width / 2;
        officeBg.y = officeTxt.y + officeTxt.height / 2 - officeBg.height / 2;
        //属性加成
        // let officeImg =  BaseBitmap.create("wifeview_shuxing");
        // officeImg.x =GameConfig.stageWidth/2 - officeImg.width/2  ;
        // officeImg.y = officeBg.y;
        // this.addChildToContainer(officeImg);
        // let downTitleLine2: BaseBitmap = BaseBitmap.create("public_line3");
        // downTitleLine2.width = 400;
        // downTitleLine2.setPosition(GameConfig.stageWidth/2 - downTitleLine2.width/2,bottomBg.y + 23); 
        // this.addChildToContainer(downTitleLine2);
        // //红颜描述文字
        // let attTitle = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinAdd") ,TextFieldConst.FONTSIZE_TITLE_SMALL);
        // attTitle.setColor(TextFieldConst.COLOR_BROWN_NEW);
        // attTitle.x = GameConfig.stageWidth/2 - attTitle.width/2;
        // attTitle.y = bottomBg.y + 19;
        // this.addChildToContainer(attTitle);
        this._lineCon = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._lineCon);
        this._lineCon.y = innerbg.y;
        for (var i = 0; i < 4; i++) {
            var line = BaseBitmap.create("public_line4");
            line.width = 565;
            line.x = innerbg.x + innerbg.width / 2 - line.width / 2;
            line.y = 5 + ((innerbg.height - 10) / 5) * (i + 1) - line.height / 2;
            this._lineCon.addChild(line);
        }
        // this._lineCon.y = innerTopBg.y + innerTopBg.height + 34;
        // let probg =  BaseBitmap.create("public_line4");
        // probg.width = 598;
        // probg.height = 34;
        // probg.x =GameConfig.stageWidth/2 - probg.width /2 ;
        // probg.y = 0;
        // this._lineCon.addChild(probg);
        // let probg2 =  BaseBitmap.create("public_ditu");
        // probg2.width = 598;
        // probg2.height = 34;
        // probg2.x =GameConfig.stageWidth/2 - probg2.width /2 ;
        // probg2.y = probg.y + probg.height + 34;
        // this._lineCon.addChild(probg2);
        // let probg3 = BaseBitmap.create("public_left2");	
        // probg3.width =598 ;
        // probg3.height = 35;
        // probg3.anchorOffsetX = 598/2;
        // // probg3.anchorOffsetY = 17;
        // probg3.x =GameConfig.stageWidth/2;// - probg3.width /2 ;
        // probg3.y = innerbg.y + innerbg.height - probg.height - 4;
        // this.addChildToContainer(probg3);
        var startY = innerbg.y + 17;
        for (var index = 0; index < 10; index++) {
            var addX = 0;
            if (index % 2 > 0) {
                addX = 270;
            }
            var attrNameTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
            attrNameTxt.x = bottomBg.x + 85 + addX;
            attrNameTxt.y = startY;
            if (index % 2 > 0) {
                // startY = startY + attrNameTxt.height+15;
                startY = startY + (innerbg.height - 10) / 5;
            }
            // attrNameTxt.y = 5 + (innerbg.height - 10)/ 5
            this.addChildToContainer(attrNameTxt);
            this._txtList.push(attrNameTxt);
        }
        this._noAddAtt = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinNoAdd"), TextFieldConst.FONTSIZE_TITLE_BIG);
        this._noAddAtt.setColor(TextFieldConst.COLOR_BROWN_NEW);
        this._noAddAtt.x = GameConfig.stageWidth / 2 - this._noAddAtt.width / 2;
        this._noAddAtt.y = bottomBg.y + 150;
        this.addChildToContainer(this._noAddAtt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        tipTxt.setColor(TextFieldConst.COLOR_BROWN_NEW);
        tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
        tipTxt.y = innerbg.y + innerbg.height + 5; //bottomBg.y + bottomBg.height - 63;
        this.addChildToContainer(tipTxt);
        //红颜名字背景 
        var nameBg = BaseBitmap.create("wifeview_namebg");
        this.addChildToContainer(nameBg);
        //红颜名字
        var nameTF = ComponentManager.getTextField(this._wifeInfoVo.name, TextFieldConst.FONTSIZE_TITLE_COMMON, 0x3e0d01);
        if (PlatformManager.checkIsTextHorizontal()) {
            nameBg.x = this.viewBg.width / 2 - nameBg.width / 2;
            // nameBg.y = 550
            nameBg.y = this._skinBg.y - 85;
            nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
            nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
        }
        else {
            nameBg.x = 25;
            nameBg.y = 200;
            nameTF.width = 27;
            nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2 - 17;
            nameTF.y = nameBg.y + 180 / 2 - nameTF.height / 2;
        }
        this.addChildToContainer(nameTF);
        this.checkRedPoint();
        this.initState();
        // }else{
        // }
    };
    WifeskinView.prototype.initState = function () {
        this._wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this.param.data.id);
        if (this._wifeSkinVo) {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(this._wifeSkinVo.equip);
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
    WifeskinView.prototype.clickItemHandler = function (event) {
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
    WifeskinView.prototype.setSelect = function (skinId) {
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
                bg_1.texture = ResourceManager.getRes("wifeview_hongyantyouxiang1");
            }
        }
        this._childScrollItem = this._scrollList.getItemByIndex(childIndex);
        // let bg2Index = this._childScrollItem.getChildIndex(this._childScrollItem.getChildByName("bg2"));
        var bg = this._childScrollItem.getChildByName("bg2");
        bg.texture = ResourceManager.getRes("wifeview_hongyantyouxiang3");
        if (this._childScrollItem.getChildByName("redsp")) {
            var bg_2 = this._childScrollItem.getChildByName("redsp");
            bg_2.visible = false;
        }
    };
    WifeskinView.prototype.setData = function (skinId) {
        // if(this._skinId == skinId)
        // {
        // 	return;
        // }
        if (skinId) {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            var lv = 1;
            if (this._wifeSkinVo) {
                lv = this._wifeSkinVo.getLvBySkinId(skinId);
            }
            // let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
            this._skinDesc.text = skinCfg.desc;
            if (Api.switchVoApi.checkOpenWifeskinLvup() && skinCfg.canLvup && lv > 0) {
                this._skinName.text = skinCfg.name + " Lv." + lv;
                if (this._detailBtn) {
                    this._detailBtn.visible = true;
                    if (this._wifeSkinVo) {
                        this._detailBtn.setEnable(true);
                    }
                    else {
                        this._detailBtn.setEnable(false);
                    }
                }
                this._curSkinId = skinId;
            }
            else {
                this._skinName.text = skinCfg.name;
                if (this._detailBtn) {
                    this._detailBtn.visible = false;
                }
                this._curSkinId = null;
            }
            this._skinName.x = GameConfig.stageWidth / 2 - this._skinName.width / 2;
            this._skinPic.setload(skinCfg.body);
            var resultStr = this.dealAttrChangeInfo(skinId);
            for (var index = 0; index < this._txtList.length; index++) {
                // this._txtList[index].text = resultStr[index];
                this._txtList[index].visible = true;
                var str = resultStr[index];
                if (str) {
                    this._txtList[index].text = resultStr[index];
                }
                else {
                    this._txtList[index].text = "";
                }
            }
            this._noAddAtt.visible = false;
            this._lineCon.visible = true;
            if (this._droWifeIcon) {
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            if (Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske")) {
                var bg2Index = this.container.getChildIndex(this._skinPic);
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                this._droWifeIcon.setScale(0.9);
                this._droWifeIcon.x = this._skinPic.x + 190;
                this._droWifeIcon.y = this._titleBg.y + this._titleBg.height + 800 * 0.6;
                this.container.addChildAt(this._droWifeIcon, bg2Index);
                this._skinPic.visible = false;
                if (this._droWifeIcon.y) {
                }
            }
            else {
                // this.
            }
        }
        else {
            if (this._detailBtn) {
                this._detailBtn.visible = false;
            }
            this._curSkinId = null;
            this._skinDesc.text = this._wifeInfoVo.desc;
            this._skinName.text = this._wifeInfoVo.name;
            this._skinName.x = GameConfig.stageWidth / 2 - this._skinName.width / 2;
            this._skinPic.setload(this._wifeInfoVo.body);
            for (var index = 0; index < this._txtList.length; index++) {
                this._txtList[index].visible = false;
            }
            this._noAddAtt.visible = true;
            this._lineCon.visible = false;
            if (this._droWifeIcon) {
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            if (Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske")) {
                var bg2Index = this.container.getChildIndex(this._skinPic);
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
                this._droWifeIcon.setScale(0.9);
                this._droWifeIcon.x = this._skinPic.x + 150;
                this._droWifeIcon.y = this._titleBg.y + this._titleBg.height + 800 * 0.6;
                this.container.addChildAt(this._droWifeIcon, bg2Index);
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
            this._textBg.visible = false;
            this._noGetBB.visible = false;
        }
        else {
            if (skId == "" || Api.wifeSkinVoApi.isOwnSkinOfSkinId(skId)) {
                //未穿戴
                this._skinBtn.visible = true;
                this._inBB.visible = false;
                this._getText.visible = false;
                this._textBg.visible = false;
                this._noGetBB.visible = false;
            }
            else {
                //未获得
                this._skinBtn.visible = false;
                this._inBB.visible = false;
                this._getText.visible = true;
                this._textBg.visible = true;
                this._noGetBB.visible = true;
                this._getText.text = LanguageManager.getlocal("skinDropDesc_" + skId);
                this._getText.x = GameConfig.stageWidth - this._getText.width - 10;
            }
        }
        // this.checkDro();
        if (this._droWifeIcon) {
            // this._droWifeIcon.x = this._skinPic.x + 230;
            // this._droWifeIcon.y = this._skinPic.y + 760*0.7 + 40;
            this._droWifeIcon.x = this._skinPic.x + 180;
            // this._droWifeIcon.y = this._titleBg.y + this._titleBg.height + 800*0.6;
            this._droWifeIcon.y = this._skinPic.y + 760 * 0.7;
        }
        else {
            this._skinPic.visible = true;
        }
    };
    WifeskinView.prototype.dealAttrChangeInfo = function (skinId) {
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        // let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
        var resultStr = [];
        var atkAdd = skinCfg.atkAdd;
        var inteAdd = skinCfg.inteAdd;
        var politicsAdd = skinCfg.politicsAdd;
        var charmAdd = skinCfg.charmAdd;
        var atkLvUpAdd = skinCfg.atkLvUpAdd;
        var inteLvUpAdd = skinCfg.inteLvUpAdd;
        var politicsLvUpAdd = skinCfg.politicsLvUpAdd;
        var charmLvUpAdd = skinCfg.charmLvUpAdd;
        var wifeIntimacy = skinCfg.wifeIntimacy;
        var wifeGlamour = skinCfg.wifeGlamour;
        var wifeLvUpIntimacy = skinCfg.wifeLvUpIntimacy;
        var wifeLvUpGlamour = skinCfg.wifeLvUpGlamour;
        var childReduce = skinCfg.childReduce;
        var searchReduce = skinCfg.searchReduce;
        var wifeReduce = skinCfg.wifeReduce;
        var lv = 1;
        if (this._wifeSkinVo) {
            lv = this._wifeSkinVo.getLvBySkinId(skinId);
        }
        if ((atkAdd && atkAdd[0] == 1) || (atkLvUpAdd && atkLvUpAdd[0] == 1)) {
            var baseV = atkAdd && atkAdd[0] == 1 ? atkAdd[1] : 0;
            var baseP = atkLvUpAdd && atkLvUpAdd[0] == 1 ? atkLvUpAdd[1] : 0;
            if (baseV + (lv - 1) * baseP > 0) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [baseV + (lv - 1) * baseP])); //15b504
            }
        }
        if ((inteAdd && inteAdd[0] == 1) || (inteLvUpAdd && inteLvUpAdd[0] == 1)) {
            var baseV = inteAdd && inteAdd[0] == 1 ? inteAdd[1] : 0;
            var baseP = inteLvUpAdd && inteLvUpAdd[0] == 1 ? inteLvUpAdd[1] : 0;
            if (baseV + (lv - 1) * baseP > 0) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [baseV + (lv - 1) * baseP]));
            }
        }
        if ((politicsAdd && politicsAdd[0] == 1) || (politicsLvUpAdd && politicsLvUpAdd[0] == 1)) {
            var baseV = politicsAdd && politicsAdd[0] == 1 ? politicsAdd[1] : 0;
            var baseP = politicsLvUpAdd && politicsLvUpAdd[0] == 1 ? politicsLvUpAdd[1] : 0;
            if (baseV + (lv - 1) * baseP > 0) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [baseV + (lv - 1) * baseP]));
            }
        }
        if ((charmAdd && charmAdd[0] == 1) || (charmLvUpAdd && charmLvUpAdd[0] == 1)) {
            var baseV = charmAdd && charmAdd[0] == 1 ? charmAdd[1] : 0;
            var baseP = charmLvUpAdd && charmLvUpAdd[0] == 1 ? charmLvUpAdd[1] : 0;
            if (baseV + (lv - 1) * baseP > 0) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [baseV + (lv - 1) * baseP]));
            }
        }
        if ((atkAdd && atkAdd[0] == 2) || (atkLvUpAdd && atkLvUpAdd[0] == 2)) {
            var baseV = atkAdd && atkAdd[0] == 2 ? atkAdd[1] : 0;
            var baseP = atkLvUpAdd && atkLvUpAdd[0] == 2 ? atkLvUpAdd[1] : 0;
            if (baseV + (lv - 1) * baseP > 0) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [(baseV + (lv - 1) * baseP) * 100 + "%"]));
            }
        }
        if ((inteAdd && inteAdd[0] == 2) || (inteLvUpAdd && inteLvUpAdd[0] == 2)) {
            var baseV = inteAdd && inteAdd[0] == 2 ? inteAdd[1] : 0;
            var baseP = inteLvUpAdd && inteLvUpAdd[0] == 2 ? inteLvUpAdd[1] : 0;
            if (baseV + (lv - 1) * baseP > 0) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [(baseV + (lv - 1) * baseP) * 100 + "%"]));
            }
        }
        if ((politicsAdd && politicsAdd[0] == 2) || (politicsLvUpAdd && politicsLvUpAdd[0] == 2)) {
            var baseV = politicsAdd && politicsAdd[0] == 2 ? politicsAdd[1] : 0;
            var baseP = politicsLvUpAdd && politicsLvUpAdd[0] == 2 ? politicsLvUpAdd[1] : 0;
            if (baseV + (lv - 1) * baseP > 0) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [(baseV + (lv - 1) * baseP) * 100 + "%"]));
            }
        }
        if ((charmAdd && charmAdd[0] == 2) || (charmLvUpAdd && charmLvUpAdd[0] == 2)) {
            var baseV = charmAdd && charmAdd[0] == 2 ? charmAdd[1] : 0;
            var baseP = charmLvUpAdd && charmLvUpAdd[0] == 2 ? charmLvUpAdd[1] : 0;
            if (baseV + (lv - 1) * baseP > 0) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [(baseV + (lv - 1) * baseP) * 100 + "%"]));
            }
        }
        if ((wifeIntimacy && wifeIntimacy > 0) || (wifeLvUpIntimacy && wifeLvUpIntimacy > 0)) {
            var baseV = wifeIntimacy ? wifeIntimacy : 0;
            var baseP = wifeLvUpIntimacy ? wifeLvUpIntimacy : 0;
            if (baseV + (lv - 1) * baseP > 0) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd5", [(baseV + (lv - 1) * baseP) + ""]));
            }
        }
        if ((wifeGlamour && wifeGlamour > 0) || (wifeLvUpGlamour && wifeLvUpGlamour > 0)) {
            var baseV = wifeGlamour ? wifeGlamour : 0;
            var baseP = wifeLvUpGlamour ? wifeLvUpGlamour : 0;
            if (baseV + (lv - 1) * baseP > 0) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd6", [(baseV + (lv - 1) * baseP) + ""]));
            }
        }
        /*
        if(atkAdd[0] == 1)
        {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd1",[atkAdd[1]]) );
        }else{
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd1",[ atkAdd[1] * 100 +"%"] ));
        }

        if(inteAdd[0] == 1)
        {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd2",[inteAdd[1]]) );
        }else{
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd2",[ inteAdd[1] * 100 +"%"] ));
        }

        if(politicsAdd[0] == 1)
        {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd3",[politicsAdd[1]]) );
        }else{
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd3",[ politicsAdd[1] * 100 +"%"] ));
        }

        if(charmAdd[0] == 1)
        {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd4",[charmAdd[1]]) );
        }else{
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd4",[ charmAdd[1] * 100 +"%"] ));
        }

        

        if(wifeIntimacy && wifeIntimacy > 0){
            resultStr.push( LanguageManager.getlocal("acTailAttrAdd5",[wifeIntimacy.toString()])  );
        }
        if(wifeGlamour && wifeGlamour > 0)  {
            resultStr.push( LanguageManager.getlocal("acTailAttrAdd6",[wifeGlamour.toString()])  );
        }

        */
        if (childReduce && childReduce > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd7", [childReduce.toString()]));
        }
        if (searchReduce && searchReduce > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd8", [searchReduce.toString()]));
        }
        if (wifeReduce && wifeReduce > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd9", [wifeReduce.toString()]));
        }
        return resultStr;
    };
    WifeskinView.prototype.checkRedPoint = function () {
        //赏赐红点
        // if(Api.wifeVoApi.getGiveRed())
        // {
        // 	if(this._giveDotSp == null)
        // 	{
        // 		this._giveDotSp = BaseBitmap.create("public_dot2");
        // 		this._giveDotSp.x = this._giveBtn.x + this._giveBtn.width - this._giveDotSp.width ;
        // 		this._giveDotSp.y = this._giveBtn.y;
        // 		this.addChildToContainer(this._giveDotSp);
        // 	}
        // 	else
        // 	{
        // 		if(this._giveDotSp)
        // 		{
        // 			this._giveDotSp.visible = true;
        // 		}
        // 	}
        // }
        // else
        // {
        // 	if(this._giveDotSp)
        // 	{
        // 		this._giveDotSp.visible = false;
        // 	}
        // }
    };
    WifeskinView.prototype.detailHandler = function () {
        //点击查看详情
        if (this._curSkinId) {
            ViewController.getInstance().openView(ViewConst.POPUP.SKINLEVELDETAILPOPUPVIEW, { wifeId: String(WifeskinView.wifeId), skinId: String(this._curSkinId) });
            // ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{wifeId:String(WifeskinView.wifeId),skinId:String(this._curSkinId),lv:40});
        }
    };
    WifeskinView.prototype.skinHander = function () {
        var skinId = this._skinId;
        if (!skinId) {
            skinId = "";
        }
        this.request(NetRequestConst.REQUEST_WIFE_EQUIP, { wifeId: String(this.param.data.id), wifeSkinId: skinId });
    };
    //宠幸之后刷新数据
    WifeskinView.prototype.receiveData = function (data) {
        if (data.data.ret < 0) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_WIFE_EQUIP) {
            this.initState();
            this.hide();
        }
    };
    WifeskinView.prototype.refreshInfoAfterLove = function () {
        var id = this.param.data.id;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        //亲密度
        var IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
        // this._intimateValueText.text = IntimacyValue;
    };
    WifeskinView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_namebg", "wifeview_optbg", "wifeview_bottombg2",
            "wifeview_skingetbg", "wifeview_hongyantyouxiangbg",
            "wifeview_xinxibanbg", "wifeview_shuxing",
            "wifeview_hongyantyouxiang1", "wifeview_hongyantyouxiang2", "wifeview_hongyantyouxiang3", "wifeview_in", "wifeview_noget",
            "wifeview_iconmask",
            "commonview_border1",
            "commonview_bottom",
            "commonview_border2"
        ]);
    };
    WifeskinView.prototype.getRuleInfo = function () {
        return "wifeskin_description";
    };
    WifeskinView.prototype.doGuide = function () {
        this.hide();
    };
    WifeskinView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFE_LOVECOM);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE, this.doGuide, this);
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
        this._textBg = null;
        this._noGetBB = null;
        this._droWifeIcon = null;
        this._titleBg = null;
        this._skinBg = null;
        this._lineCon = null;
        this._detailBtn = null;
        this._curSkinId = null;
    };
    return WifeskinView;
}(CommonView));
__reflect(WifeskinView.prototype, "WifeskinView");
