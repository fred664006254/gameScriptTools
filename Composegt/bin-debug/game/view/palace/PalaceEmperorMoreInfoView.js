/**
 * author yanyuling
 * @class PalaceEmperorMoreInfoView
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
var PalaceEmperorMoreInfoView = (function (_super) {
    __extends(PalaceEmperorMoreInfoView, _super);
    function PalaceEmperorMoreInfoView() {
        var _this = _super.call(this) || this;
        _this.arrow_rightBtn = undefined;
        _this.arrow_leftBtn = undefined;
        _this._curLv = 0;
        _this._titleinfo = undefined;
        _this._expProgress = undefined;
        _this._roleNode = undefined;
        return _this;
    }
    // 标题背景名称
    PalaceEmperorMoreInfoView.prototype.getTitleStr = function () {
        return "palace_titleName" + this.param.data.titleId;
    };
    PalaceEmperorMoreInfoView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._curTitleId = this.param.data.titleId;
        var palace_bg = BaseLoadBitmap.create("palace_bg");
        palace_bg.y = GameConfig.stageHeigth - this.container.y - 1096;
        this._nodeContainer.addChild(palace_bg);
        var titlecfg = Config.TitleCfg.getTitleCfgById(this._curTitleId);
        var titleinfo = Api.itemVoApi.getTitleInfoVoById(Number(this._curTitleId));
        this._titleinfo = titleinfo;
        var tnum = titleinfo.tnum || 0;
        this._curLv = titleinfo.lv;
        var nameBg = BaseBitmap.create("palace_titlebg4");
        nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
        nameBg.y = 27; // GameConfig.stageHeigth -  110;
        this._nodeContainer.addChild(nameBg);
        var titlelv = this._titleinfo.lv ? Number(this._titleinfo.lv) : 1;
        var titlepath = Config.TitleCfg.getTitleIcon3WithLv(this._curTitleId, titlelv);
        this._officerImg = BaseLoadBitmap.create(titlepath);
        var deltaV = 0.8;
        this._officerImg.width = 186 * deltaV;
        this._officerImg.height = 42 * deltaV;
        this._officerImg.x = nameBg.x + 80;
        this._officerImg.y = nameBg.y + nameBg.height / 2 - this._officerImg.height / 2;
        this._nodeContainer.addChild(this._officerImg);
        if (this._curLv < titleinfo.lvLimit) {
            var palace_title_arrow = BaseBitmap.create("palace_title_arrow");
            palace_title_arrow.x = nameBg.x + nameBg.width / 2 - palace_title_arrow.width / 2;
            palace_title_arrow.y = nameBg.y + nameBg.height / 2 - palace_title_arrow.height / 2;
            this._nodeContainer.addChild(palace_title_arrow);
            var titlepath2 = Config.TitleCfg.getTitleIcon3WithLv(this._curTitleId, titlelv + 1);
            this._officerImg2 = BaseLoadBitmap.create(titlepath2);
            this._officerImg2.width = 186 * deltaV;
            this._officerImg2.height = 42 * deltaV;
            this._officerImg2.x = nameBg.x + nameBg.width - this._officerImg2.width - this._officerImg.x;
            this._officerImg2.y = nameBg.y + nameBg.height / 2 - this._officerImg2.height / 2;
            this._nodeContainer.addChild(this._officerImg2);
        }
        else {
            nameBg.texture = ResourceManager.getRes("palace_titlebg3");
            nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
            this._officerImg.x = GameConfig.stageWidth / 2 - this._officerImg.width / 2;
        }
        this._dbNode1 = new BaseDisplayObjectContainer(); //下层可变特效
        this._nodeContainer.addChild(this._dbNode1);
        this._dbNode2 = new BaseDisplayObjectContainer(); //上层可变
        this._dbNode3 = new BaseDisplayObjectContainer(); //上层不可变
        var roleNode = undefined;
        var pic = Api.playerVoApi.getPlayePicId();
        var resPath = "palace_db_" + this._curTitleId;
        var _loadNum = 0;
        var _maxLoadNum = 2;
        if (App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske")) {
            var myHead_1 = undefined;
            var loadComplete = function (container) {
                _loadNum++;
                if (_loadNum == _maxLoadNum) {
                    if (roleNode) {
                        roleNode.visible = true;
                    }
                    if (myHead_1) {
                        myHead_1.visible = true;
                    }
                }
            };
            roleNode = App.DragonBonesUtil.getLoadDragonBones(resPath, 0, "idle", loadComplete, this);
            roleNode.setScale(1.4);
            roleNode.y = nameBg.y + 122;
            this._nodeContainer.addChild(roleNode);
            var rect1 = egret.Rectangle.create();
            rect1.setTo(0, 0, 136, 143);
            myHead_1 = BaseLoadBitmap.create("user_head" + pic, rect1, { callback: loadComplete, callbackThisObj: this });
            myHead_1.visible = false;
            myHead_1.width = 136 * 0.92;
            myHead_1.height = 143 * 0.92;
            myHead_1.name = "myHead";
            myHead_1.visible = false;
            myHead_1.x = GameConfig.stageWidth / 2 - myHead_1.width / 2;
            myHead_1.y = roleNode.y - 37 + 6;
            this._nodeContainer.addChild(myHead_1);
            roleNode.x = GameConfig.stageWidth / 2;
            this._dbNode1.y = this._dbNode2.y = this._dbNode3.y = roleNode.y;
        }
        else {
            roleNode = Api.playerVoApi.getPlayerPortrait(Number(this._curTitleId), pic);
            this._nodeContainer.addChild(roleNode);
            if (Config.TitleCfg.isTheKingTitleId(this._curTitleId)) {
                var rect12 = egret.Rectangle.create();
                rect12.setTo(0, 0, 712, 668);
                var myBody = roleNode.getChildByName("myBody");
                myBody.setload("user_body_full_3201_2", rect12);
                myBody.width = 712;
                myBody.height = 668;
                myBody.visible = true;
                var myHead = roleNode.getChildByName("myHead");
                myHead.setScale(0.92);
                myHead.x = 356 - 70 + 4;
                myHead.y = 10;
                myHead.visible = true;
            }
            roleNode.y = nameBg.y + 83;
            if (Api.palaceVoApi.isKingWithBigTexture(this._curTitleId)) {
                roleNode.x = GameConfig.stageWidth / 2 - roleNode.width / 2 + 165;
            }
            else {
                roleNode.x = GameConfig.stageWidth / 2 - roleNode.width / 2;
            }
            this._dbNode1.y = this._dbNode2.y = this._dbNode3.y = roleNode.y + 40;
        }
        roleNode.name = "roleNode";
        this._roleNode = roleNode;
        // this._dbNode1.x = this._dbNode2.x = this._dbNode3.x = GameConfig.stageWidth/2;
        this._nodeContainer.addChild(this._dbNode2);
        this._nodeContainer.addChild(this._dbNode3);
        var palace_titlebg7 = BaseBitmap.create("palace_titlebg7");
        palace_titlebg7.x = GameConfig.stageWidth / 2 - palace_titlebg7.width / 2;
        palace_titlebg7.y = GameConfig.stageHeigth - this.container.y - palace_titlebg7.height - 20;
        //  dragon.y + dragon.height + 5;
        this._nodeContainer.addChild(palace_titlebg7);
        var palace_title_txt2 = BaseBitmap.create("palace_title_txt2");
        palace_title_txt2.x = GameConfig.stageWidth / 2 - palace_title_txt2.width / 2;
        palace_title_txt2.y = palace_titlebg7.y + palace_titlebg7.height / 2 - palace_title_txt2.height / 2 + 10;
        this._nodeContainer.addChild(palace_title_txt2);
        var _expProgress = ComponentManager.getProgressBar("palace_progress", "palace_progressbg", 600);
        _expProgress.x = 15; //GameConfig.stageWidth/2 - _expProgress.width/2;
        _expProgress.y = palace_titlebg7.y - 40; // roleNode.y + 670;
        _expProgress.setTextSize(TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._nodeContainer.addChild(_expProgress);
        this._expProgress = _expProgress;
        var dragon = BaseBitmap.create("palace_progress_dragon");
        dragon.x = _expProgress.x;
        dragon.y = _expProgress.y - 60; // GameConfig.stageHeigth -  110;
        this._nodeContainer.addChild(dragon);
        var tipbg = BaseBitmap.create("palace_titlebg6");
        tipbg.width = 550;
        tipbg.x = GameConfig.stageWidth / 2 - tipbg.width / 2;
        tipbg.y = dragon.y + 0;
        this._nodeContainer.addChild(tipbg);
        // if(tnum == 0){
        // 	this._curLv = 0;
        // }
        var emperorLvUpNeed = titlecfg.emperorLvUpNeed;
        var nextnum = emperorLvUpNeed[this._curLv];
        this._tiptxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        var str1 = LanguageManager.getlocal("palace_titleName" + this.param.data.titleId);
        if (nextnum) {
            var diffnum = nextnum - tnum;
            this._tiptxt.text = LanguageManager.getlocal("palace_emprior_uptip1", ["" + (this._curLv + 1), str1, "" + diffnum]);
            _expProgress.setPercentage(tnum / nextnum);
            _expProgress.setText(tnum + "/" + nextnum);
        }
        else {
            this._tiptxt.text = LanguageManager.getlocal("palace_emprior_uptip2");
            _expProgress.setPercentage(1.0);
            this._expProgress.setText(LanguageManager.getlocal("wifeSkillMaxShow"));
        }
        this._tiptxt.x = GameConfig.stageWidth / 2 - this._tiptxt.width / 2;
        this._tiptxt.y = tipbg.y + tipbg.height / 2 - this._tiptxt.height / 2;
        this._nodeContainer.addChild(this._tiptxt);
        var topTxtBg = BaseBitmap.create("public_9v_bg11");
        topTxtBg.x = this.width / 2 + 150 + topTxtBg.width;
        topTxtBg.y = nameBg.y;
        topTxtBg.height = 120;
        topTxtBg.width = 240;
        this._topTxtBg = topTxtBg;
        this._topTxtBg.alpha = 0;
        this._topTxtBg.scaleX = -1;
        this._nodeContainer.addChild(topTxtBg);
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        txt.multiline = true;
        txt.lineSpacing = 5;
        txt.width = topTxtBg.width - 40;
        txt.x = topTxtBg.x - topTxtBg.width + 20;
        txt.y = topTxtBg.y + 20;
        this._signTxt = txt;
        this._signTxt.alpha = 0;
        this._nodeContainer.addChild(txt);
        var str = Api.palaceVoApi.getRoleInfoByTitleId(this._curTitleId).sign;
        this.showRoleSign(str);
        if (this._curLv < this._titleinfo.lvLimit - 1) {
            var arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["left"]);
            arrow_leftBtn.x = 5;
            arrow_leftBtn.y = GameConfig.stageHeigth / 2 - 100;
            arrow_leftBtn.visible = false;
            this._nodeContainer.addChild(arrow_leftBtn);
            var arrow_rightBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["right"]);
            arrow_rightBtn.scaleX = -1;
            var tarRightPosX = GameConfig.stageWidth - arrow_leftBtn.x;
            arrow_rightBtn.x = tarRightPosX;
            arrow_rightBtn.y = arrow_leftBtn.y;
            this._nodeContainer.addChild(arrow_rightBtn);
            this.arrow_rightBtn = arrow_rightBtn;
            this.arrow_leftBtn = arrow_leftBtn;
        }
        // ViewController.getInstance().openView(ViewConst.COMMON.PALACEEMPERORLVUPVIEW,{titleId:this._titleinfo.id});
        this.refreshDBDragons();
    };
    PalaceEmperorMoreInfoView.prototype.refreshDBDragons = function () {
        var roleNode1 = this._dbNode1.getChildByName("roleNode1");
        var roleNode2 = this._dbNode2.getChildByName("roleNode2");
        if (roleNode1 && roleNode1 instanceof BaseLoadDragonBones) {
            roleNode1.stop();
            roleNode1.dispose();
        }
        if (roleNode2 && roleNode2 instanceof BaseLoadDragonBones) {
            roleNode2.stop();
            roleNode2.dispose();
        }
        this._dbNode1.removeChildren(); //下层可变特效
        this._dbNode2.removeChildren(); //上层可变
        this._dbNode3.removeChildren(); //上层不可变
        if (this._curLv >= 1) {
            var xiapath = "huangdi_" + this._curLv + "xia";
            if (this._curLv == this._titleinfo.lvLimit) {
                xiapath = "huangdi_4xia";
            }
            var roleNode1_1 = App.DragonBonesUtil.getLoadDragonBones(xiapath);
            if (this._curLv == 2) {
                roleNode1_1.y = 160;
            }
            else if (this._curLv == 3) {
                roleNode1_1.y = 160;
            }
            else if (this._curLv >= 4) {
                roleNode1_1.y = 180;
            }
            this._dbNode1.addChild(roleNode1_1);
            var shangpath = "huangdi_" + (this._curLv >= 3 ? 3 : this._curLv) + "shang";
            if (this._curLv == 1) {
                shangpath = "huangdi_1";
            }
            var roleNode2_1 = App.DragonBonesUtil.getLoadDragonBones(shangpath);
            roleNode2_1.y = 200;
            this._dbNode2.addChild(roleNode2_1);
            // let roleNode3 = App.DragonBonesUtil.getLoadDragonBones("huangdi_1");
            // roleNode3.y = 200;
            // this._dbNode3.addChild(roleNode3);
            roleNode1_1.name = "roleNode1";
            roleNode2_1.name = "roleNode2";
            roleNode1_1.x = roleNode2_1.x = GameConfig.stageWidth / 2;
        }
    };
    PalaceEmperorMoreInfoView.prototype.switchHandler = function (param) {
        var max = this._titleinfo.lvLimit;
        var realLv = this._titleinfo.lv;
        if (param == "right") {
            this._curLv++;
        }
        else {
            this._curLv--;
        }
        this.arrow_rightBtn.visible = this.arrow_leftBtn.visible = true;
        if (this._curLv + 1 >= max && param == "right") {
            this.arrow_rightBtn.visible = false;
            this.arrow_leftBtn.visible = true;
            this._curLv = max - 1;
        }
        if (this._curLv <= realLv && param == "left") {
            this.arrow_rightBtn.visible = true;
            this.arrow_leftBtn.visible = false;
            this._curLv = realLv;
        }
        var cfg = this._titleinfo.itemCfg;
        var tnum = this._titleinfo.tnum || 0;
        var emperorLvUpNeed = cfg.emperorLvUpNeed;
        var nextnum = emperorLvUpNeed[this._curLv];
        var str1 = LanguageManager.getlocal("palace_titleName" + this.param.data.titleId);
        if (nextnum) {
            var diffnum = nextnum - tnum;
            this._expProgress.setPercentage(tnum / nextnum);
            this._expProgress.setText(tnum + "/" + nextnum);
            if (realLv < max) {
                this._tiptxt.text = LanguageManager.getlocal("palace_emprior_uptip1", ["" + (this._curLv + 1), str1, "" + diffnum]);
            }
        }
        else {
            this._expProgress.setPercentage(1.0);
            this._expProgress.setText(LanguageManager.getlocal("wifeSkillMaxShow"));
            // if(realLv < max){
            // 	this._tiptxt.text = LanguageManager.getlocal("palace_emprior_uptip2");
            // }
        }
        this._tiptxt.x = GameConfig.stageWidth / 2 - this._tiptxt.width / 2;
        var titlepath = Config.TitleCfg.getTitleIcon3WithLv(this._curTitleId, this._curLv);
        var titlepath2 = Config.TitleCfg.getTitleIcon3WithLv(this._curTitleId, this._curLv + 1);
        this._officerImg2.setload(titlepath2);
        this._officerImg.setload(titlepath);
        this.refreshDBDragons();
    };
    PalaceEmperorMoreInfoView.prototype.showRoleSign = function (signStr) {
        // if (signStr != "")
        // {
        // 	egret.Tween.removeTweens(this._topTxtBg);
        // 	egret.Tween.removeTweens(this._signTxt);
        // 	this._topTxtBg.alpha = 1;
        // 	this._signTxt.alpha = 1;
        // 	this._signTxt.text = signStr;
        // 	egret.Tween.get(this._topTxtBg,{loop:false}).wait(3000).to({alpha:0},1000);
        // 	egret.Tween.get(this._signTxt,{loop:false}).wait(3000).to({alpha:0},1000);
        // }
    };
    PalaceEmperorMoreInfoView.prototype.getRequestData = function () {
        if (!Api.palaceVoApi.isDataInit() || !Api.palaceVoApi.getRoleInfoByTitleId(this.param.data.titleId)) {
            return { requestType: NetRequestConst.REQUEST_PALACE_GETCROSSPALACE, requestData: {} };
        }
    };
    PalaceEmperorMoreInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "palace_role_shadow",
            "palace_role_empty",
            "palace_progress_dragon",
            "palace_progress_light",
            "palace_progress",
            "palace_progressbg",
            "palace_role_shadow",
            "palace_title_arrow",
            "palace_title_txt2",
            "palace_titlebg4",
            "palace_titlebg6",
            "palace_titlebg7",
        ]);
    };
    PalaceEmperorMoreInfoView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._curTitleId = null;
        this._topTxtBg = null;
        this._signTxt = null;
        this.arrow_rightBtn = null;
        this.arrow_leftBtn = null;
        this._curLv = 0;
        this._titleinfo = null;
        this._expProgress = null;
        this._officerImg2 = null;
        this._officerImg = null;
        this._tiptxt = null;
        this._dbNode1 = null;
        this._dbNode2 = null;
        this._dbNode3 = null;
        if (this._roleNode instanceof BaseLoadDragonBones) {
            this._roleNode.stop();
            this._roleNode.dispose();
        }
        this._roleNode = null;
        _super.prototype.dispose.call(this);
    };
    return PalaceEmperorMoreInfoView;
}(CommonView));
__reflect(PalaceEmperorMoreInfoView.prototype, "PalaceEmperorMoreInfoView");
