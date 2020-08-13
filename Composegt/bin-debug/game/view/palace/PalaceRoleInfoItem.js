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
 * 皇宫
 * author yanyuling
 * date 2017/11/01
 * @class PalaceRoleInfoItem
 */
var PalaceRoleInfoItem = (function (_super) {
    __extends(PalaceRoleInfoItem, _super);
    // private _titlebg2:BaseBitmap;
    function PalaceRoleInfoItem() {
        var _this = _super.call(this) || this;
        _this._loadNum = 0;
        _this._maxLoadNum = 0;
        _this.init();
        return _this;
    }
    PalaceRoleInfoItem.prototype.init = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_REFRESHSIGN_AFTER_EDIT, this.showSignAfterEdit, this);
        this.width = GameConfig.stageWidth;
        // public_icontimebg
        var nameBg = BaseBitmap.create("commonview_tipbg");
        // nameBg.width = 283;
        // nameBg.height = 59;
        nameBg.height = 120;
        nameBg.name = "nameBg";
        // nameBg.scaleX = 0.8;
        nameBg.x = this.width / 2;
        nameBg.y = -10 - 61;
        this.addChild(nameBg);
        this._nameBg = nameBg;
        // this._titlebg2
        var nameTxt = ComponentManager.getTextField("1", 24, TextFieldConst.COLOR_WARN_YELLOW);
        this._nameTxt = nameTxt;
        this._nameTxt.anchorOffsetX = this._nameTxt.width / 2;
        nameTxt.x = GameConfig.stageWidth / 2;
        nameTxt.y = nameBg.y + nameBg.height / 2 - nameTxt.height / 2 + 4;
        this.addChild(nameTxt);
        var roleImg = BaseLoadBitmap.create("palace_role_empty");
        roleImg.width = 382;
        roleImg.height = 712;
        roleImg.x = this.width / 2 - roleImg.width / 2;
        roleImg.y = 60;
        roleImg.visible = false;
        roleImg.addTouchTap(this.roleImgClickHandler, this);
        this.addChild(roleImg);
        this._roleImg = roleImg;
        var topTxtBg = BaseBitmap.create("public_9v_bg11");
        topTxtBg.x = this.width / 2 + 150 + topTxtBg.width;
        topTxtBg.height = 120;
        topTxtBg.width = 240;
        this._topTxtBg = topTxtBg;
        this._topTxtBg.alpha = 0;
        this._topTxtBg.scaleX = -1;
        this.addChild(topTxtBg);
        /*
        let topTxtBg = BaseBitmap.create("public_9_bg25");
        topTxtBg.x = this.width/2 + 110;
        topTxtBg.height = 100;
        topTxtBg.width = 200;
        // topTxtBg.height = 70;
        // topTxtBg.x = this.width/2 + 60;
        // topTxtBg.y = roleImg.y -10;
        this._topTxtBg = topTxtBg;
        this._topTxtBg.alpha = 0;
        this.addChild(topTxtBg);
        
        let tailImg =  BaseBitmap.create("public_9_bg42_tail");
        tailImg.x = topTxtBg.x + 20;
        tailImg.y = topTxtBg.y +topTxtBg.height-4;
        this.addChild(tailImg);
        this._tailImg = tailImg;
        this._tailImg.alpha = 0;
        */
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        txt.multiline = true;
        txt.lineSpacing = 5;
        txt.width = topTxtBg.width - 40;
        txt.x = topTxtBg.x - topTxtBg.width + 20;
        txt.y = topTxtBg.y + 20;
        this._signTxt = txt;
        this._signTxt.alpha = 0;
        this.addChild(txt);
        var shadowImg = BaseBitmap.create("palace_role_shadow");
        shadowImg.x = roleImg.x + roleImg.width / 2 - shadowImg.width / 2;
        shadowImg.y = roleImg.y + roleImg.height - shadowImg.height / 2 - 40;
        this.addChildAt(shadowImg, 0);
        this._shadowImg = shadowImg;
        this._ruleBtn = ComponentManager.getButton("btn_rule", "", this.showEmpriorMoreInfo, this);
        this._ruleBtn.setScale(0.8);
        ;
        this.addChild(this._ruleBtn);
        this._ruleBtn.visible = false;
        //横版名字变竖版名字
        if (PlatformManager.checkIsTextHorizontal()) {
            var titleImg = BaseLoadBitmap.create("user_title_3000_2");
            titleImg.width = 129;
            titleImg.height = 53;
            titleImg.x = this.width / 2 - titleImg.width / 2;
            titleImg.y = this.height - 230 - 50;
            this.addChild(titleImg);
            this._titleImg = titleImg;
            this._ruleBtn.x = this._titleImg.x + this._titleImg.width + 3;
            this._ruleBtn.y = this._titleImg.y + this._titleImg.height / 2 - this._ruleBtn.height / 2;
        }
        else {
            var titleImg = BaseLoadBitmap.create("user_title_3000_2");
            titleImg.width = 47;
            titleImg.height = 103;
            titleImg.x = this.width / 2 - 235;
            // titleImg.y = 30;
            this.addChild(titleImg);
            this._titleImg = titleImg;
            this._ruleBtn.x = this._titleImg.x + this._titleImg.width / 2 - this._ruleBtn.width / 2 * 0.8;
            this._ruleBtn.y = this._titleImg.y + this._titleImg.height;
        }
    };
    PalaceRoleInfoItem.prototype.showEmpriorMoreInfo = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.PALACEEMPERORMOREVIEW, { titleId: this._roleTitleId });
    };
    /**
     * 刷新展示
     */
    PalaceRoleInfoItem.prototype.refreshUIWithData = function (data) {
        this._roleTitleId = data.titleId;
        var titlecfg = Config.TitleCfg.getTitleCfgById(this._roleTitleId);
        var isCross = titlecfg.isCross;
        var oldroleNode = this.getChildByName("roleNode");
        var nameBg = this.getChildByName("nameBg");
        // nameBg.width = 265;
        this._ruleBtn.visible = titlecfg.isLvUp == 1 && data.uid == Api.playerVoApi.getPlayerID() && titlecfg.emperorLvUpNeed && titlecfg.emperorLvUpNeed.length > 0;
        if (oldroleNode)
            this.removeChild(oldroleNode);
        if ((Config.TitleCfg.isTheKingTitleId(this._roleTitleId) && data.uid != "") || (data instanceof PalaceRoleInfoVo && data.uid > 0)) {
            var _titlebg2 = BaseLoadBitmap.create("palace_role_titlebg2");
            _titlebg2.width = 258;
            _titlebg2.height = 46;
            _titlebg2.x = GameConfig.stageWidth / 2 - _titlebg2.width / 2;
            _titlebg2.y = this._nameBg.y - _titlebg2.height / 2 - 10 + 61;
            _titlebg2.visible = false;
            this.addChild(_titlebg2);
            var titlelv = data.titlelv || 1;
            var titlepath = Config.TitleCfg.getTitleIcon3WithLv(this._roleTitleId, titlelv);
            var _officerImg = BaseLoadBitmap.create(titlepath);
            var deltaV = 0.8;
            _officerImg.width = 186 * deltaV;
            _officerImg.height = 42 * deltaV;
            _officerImg.x = _titlebg2.x + _titlebg2.width / 2 - _officerImg.width / 2;
            _officerImg.y = _titlebg2.y + _titlebg2.height / 2 - _officerImg.height / 2;
            this.addChild(_officerImg);
            var isCross_1 = titlecfg.isCross;
            this.showRoleSign(data.sign);
            this._roleUid = data.uid;
            // this._myBody = undefined;
            var roleNode = undefined;
            var resPath = "palace_db_" + data.titleId;
            if (App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske")) {
                this._maxLoadNum = 2;
                this._loadNum = 0;
                var loadComplete = function (container) {
                    this._loadNum++;
                    if (this._loadNum == this._maxLoadNum) {
                        if (this._myBody) {
                            this._myBody.visible = true;
                        }
                        if (this._myHead) {
                            this._myHead.visible = true;
                        }
                    }
                };
                roleNode = App.DragonBonesUtil.getLoadDragonBones(resPath, 0, "idle", loadComplete, this);
                roleNode.setScale(1.4);
                roleNode.y = 100;
                this._myBody = roleNode;
                this._myBody.visible = false;
                var rect1 = egret.Rectangle.create();
                rect1.setTo(0, 0, 136, 143);
                var myHead = BaseLoadBitmap.create("user_head" + data.pic, rect1, { callback: loadComplete, callbackThisObj: this });
                myHead.visible = false;
                myHead.width = 136;
                myHead.height = 143;
                myHead.name = "myHead";
                myHead.visible = false;
                this._myHead = myHead;
                myHead.setScale(0.92);
                this.setLayoutPosition(LayoutConst.horizontalCentertop, myHead, this, [0, roleNode.y - 82]);
                this.addChild(myHead);
                this._shadowImg.y = roleNode.y + 670 - this._shadowImg.height / 2 - 15;
                // this._shadowImg.visible = false;
                roleNode.x = this.width / 2 - roleNode.width / 2;
            }
            else {
                this.showRoleSign(data.sign);
                roleNode = Api.playerVoApi.getPlayerPortrait(Number(data.titleId), data.pic);
                if (Config.TitleCfg.isTheKingTitleId(this._roleTitleId)) {
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
                if (Api.palaceVoApi.isKingWithBigTexture(this._roleTitleId)) {
                    roleNode.x = this.width / 2 - roleNode.width / 2 + 165;
                }
                else {
                    roleNode.x = this.width / 2 - roleNode.width / 2;
                }
                roleNode.y = 60;
                this._shadowImg.y = roleNode.y + roleNode.height - this._shadowImg.height / 2 - 20;
                this._shadowImg.visible = true;
            }
            if (titlecfg.emperorLvUpNeed && titlecfg.emperorLvUpNeed.length > 0) {
                this.refreshDBDragons(data);
            }
            roleNode.name = "roleNode";
            var idx = this.getChildIndex(this._nameBg);
            this.addChildAt(roleNode, idx);
            roleNode.addTouchTap(this.roleImgClickHandler, this);
            this._nameTxt.visible = true;
            this._roleImg.visible = false;
            this._titleImg.setload("user_title_" + data.titleId + "_2");
            this._nameTxt.text = data.name;
            this._nameTxt.anchorOffsetX = this._nameTxt.width / 2;
            this._nameTxt.y = this._nameBg.y + this._nameBg.height / 2 - this._nameTxt.height / 2 + 4 + 23;
            if (isCross_1 == 1) {
                nameBg.width = 300;
            }
            //根据名字宽度调整背景宽度
            if (this._nameTxt.width + 60 > this._nameBg.width * this._nameBg.scaleX) {
                this._nameBg.width = (this._nameTxt.width + 60) / this._nameBg.scaleX;
                this._nameBg.scaleX = 1.0;
            }
        }
        else {
            this._ruleBtn.visible = false;
            this._roleUid = 0;
            this._shadowImg.visible = false;
            this._roleImg.y = 60;
            this._roleImg.visible = true;
            this._nameTxt.text = LanguageManager.getlocal("palace_titleTip_" + data.titleId);
            this._nameTxt.anchorOffsetX = this._nameTxt.width / 2;
            this._titleImg.setload("user_title_" + data.titleId + "_2");
            this._nameBg.width = this._nameTxt.width + 60;
            this._nameBg.height = this._nameTxt.height + 40;
            this._nameBg.x = this._nameTxt.x;
            this._nameBg.y = this._nameTxt.y + this._nameTxt.height / 2 - this._nameBg.height / 2;
        }
        this._nameBg.anchorOffsetX = this._nameBg.width / 2;
    };
    PalaceRoleInfoItem.prototype.refreshDBDragons = function (data) {
        var roleNode1 = this.getChildByName("roleNode1");
        var roleNode2 = this.getChildByName("roleNode2");
        if (roleNode1) {
            this.removeChild(roleNode1);
        }
        if (roleNode2) {
            this.removeChild(roleNode2);
        }
        var titleinfo = Api.itemVoApi.getTitleInfoVoById(Number(data.titleId));
        var tlv = data.titlelv - 1;
        if (tlv >= 1) {
            var deltaY = 100;
            var xiapath = "huangdi_" + tlv + "xia";
            if (data.titlelv == titleinfo.lvLimit) {
                xiapath = "huangdi_4xia";
            }
            roleNode1 = App.DragonBonesUtil.getLoadDragonBones(xiapath);
            if (tlv == 2) {
                roleNode1.y = 160 + deltaY;
            }
            else if (tlv == 3) {
                roleNode1.y = 160 + deltaY;
            }
            else if (tlv >= 4) {
                roleNode1.y = 180 + deltaY;
            }
            roleNode1.name = "roleNode1";
            this.addChildAt(roleNode1, 0);
            var shangpath = "huangdi_" + (tlv >= 3 ? 3 : tlv) + "shang";
            if (tlv == 1) {
                shangpath = "huangdi_1";
            }
            roleNode2 = App.DragonBonesUtil.getLoadDragonBones(shangpath);
            roleNode2.y = 200 + deltaY;
            roleNode2.name = "roleNode2";
            this.addChild(roleNode2);
            roleNode1.x = roleNode2.x = GameConfig.stageWidth / 2;
        }
    };
    PalaceRoleInfoItem.prototype.showRoleSign = function (signStr) {
        if (signStr != "") {
            egret.Tween.removeTweens(this._topTxtBg);
            egret.Tween.removeTweens(this._signTxt);
            // egret.Tween.removeTweens(this._tailImg);
            this._topTxtBg.alpha = 1;
            this._signTxt.alpha = 1;
            // this._tailImg.alpha = 1;
            this._signTxt.text = signStr;
            egret.Tween.get(this._topTxtBg, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
            egret.Tween.get(this._signTxt, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
            // egret.Tween.get(this._tailImg,{loop:false}).wait(3000).to({alpha:0},1000);
        }
    };
    PalaceRoleInfoItem.prototype.showSignAfterEdit = function (event) {
        var data = event.data;
        if (this._roleTitleId == data) {
            var str = Api.palaceVoApi.getRoleInfoByTitleId(this._roleTitleId).sign;
            this.showRoleSign(str);
        }
    };
    PalaceRoleInfoItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        if (data.ruid == this._roleUid) {
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW, data);
        }
    };
    PalaceRoleInfoItem.prototype.getHeight = function () {
        return 832;
    };
    PalaceRoleInfoItem.prototype.roleImgClickHandler = function () {
        if (this._roleUid == 0) {
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._roleUid });
    };
    PalaceRoleInfoItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_REFRESHSIGN_AFTER_EDIT, this.showSignAfterEdit, this);
        this._ruleBtn = null;
        this._roleImg = null;
        this._titleImg = null;
        this._nameBg = null;
        this._nameTxt = null;
        this._shadowImg = null;
        this._headImg = null;
        this._roleUid = null;
        this._topTxtBg = null;
        this._signTxt = null;
        this._roleTitleId = null;
        this._loadNum = 0;
        this._maxLoadNum = 0;
        if (this._myBody instanceof BaseLoadDragonBones) {
            this._myBody.stop();
            this._myBody.dispose();
        }
        this._myBody = null;
        this._myHead = null;
        this._myHair = null;
        _super.prototype.dispose.call(this);
    };
    return PalaceRoleInfoItem;
}(BaseDisplayObjectContainer));
__reflect(PalaceRoleInfoItem.prototype, "PalaceRoleInfoItem");
