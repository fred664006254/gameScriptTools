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
    function PalaceRoleInfoItem() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    PalaceRoleInfoItem.prototype.init = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_REFRESHSIGN_AFTER_EDIT, this.showSignAfterEdit, this);
        this.width = GameConfig.stageWidth;
        var nameBg = BaseLoadBitmap.create("servant_attributemap");
        nameBg.width = 265;
        nameBg.height = 52;
        nameBg.name = "nameBg";
        nameBg.scaleX = 0.8;
        // nameBg.x = this.width/2 -nameBg.width/2*0.8 ;
        nameBg.x = GameConfig.stageWidth / 2;
        nameBg.anchorOffsetX = nameBg.width / 2;
        nameBg.y = 0;
        this.addChild(nameBg);
        this._nameBg = nameBg;
        var nameTxt = ComponentManager.getTextField("1", 24, TextFieldConst.COLOR_WARN_YELLOW);
        this._nameTxt = nameTxt;
        this._nameTxt.anchorOffsetX = this._nameTxt.width / 2;
        nameTxt.x = GameConfig.stageWidth / 2;
        nameTxt.y = nameBg.y + nameBg.height / 2 - nameTxt.height / 2 + 2;
        this.addChild(nameTxt);
        var roleImg = BaseLoadBitmap.create("palace_role_empty");
        roleImg.width = 517;
        roleImg.height = 775;
        roleImg.x = this.width / 2;
        roleImg.y = 30;
        roleImg.visible = false;
        roleImg.addTouchTap(this.roleImgClickHandler, this);
        this.addChild(roleImg);
        this._roleImg = roleImg;
        var topTxtBg = BaseBitmap.create("public_9_bg25");
        topTxtBg.x = this.width / 2 + 110;
        topTxtBg.height = 100;
        topTxtBg.width = 200;
        // topTxtBg.height = 70;
        // topTxtBg.x = this.width/2 + 60;
        // topTxtBg.y = roleImg.y -10;
        this._topTxtBg = topTxtBg;
        this._topTxtBg.alpha = 0;
        this.addChild(topTxtBg);
        var tailImg = BaseBitmap.create("public_9_bg42_tail");
        tailImg.x = topTxtBg.x + 20;
        tailImg.y = topTxtBg.y + topTxtBg.height - 4;
        this.addChild(tailImg);
        this._tailImg = tailImg;
        this._tailImg.alpha = 0;
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        txt.multiline = true;
        txt.lineSpacing = 5;
        txt.width = topTxtBg.width - 40;
        txt.x = topTxtBg.x + 20;
        txt.y = topTxtBg.y + 20;
        this._signTxt = txt;
        this._signTxt.alpha = 0;
        this.addChild(txt);
        var shadowImg = BaseBitmap.create("palace_role_shadow");
        shadowImg.anchorOffsetX = shadowImg.width / 2;
        shadowImg.x = this.width / 2;
        // shadowImg.x = roleImg.x + roleImg.width/2 - shadowImg.width/2;
        this.addChildAt(shadowImg, 0);
        this._shadowImg = shadowImg;
        this._shadowImg.y = this._roleImg.y + this._roleImg.height - this._shadowImg.height / 2 - 20;
        //横版名字变竖版名字
        var titleImg = App.CommonUtil.getTitlePic("user_title_3000_3");
        titleImg.width = 155;
        titleImg.height = 59;
        titleImg.x = this.width / 2 - nameBg.width / 2;
        titleImg.y = nameBg.y - titleImg.height;
        this.addChild(titleImg);
        this._titleImg = titleImg;
    };
    /**
     * 刷新展示
     */
    PalaceRoleInfoItem.prototype.refreshUIWithData = function (data) {
        // let titleinfo = null;
        // if(Config.TitleCfg.isTheKingTitleId(data.titleId)){
        // 	
        // 	titleinfo = data;
        // }
        // else{
        // 	titleinfo = App.CommonUtil.getTitleData(data.titleId);
        // 	this._roleTitleId = titleinfo.title;
        // }
        var titleinfo = App.CommonUtil.getTitleData(data.titleId);
        this._roleTitleId = titleinfo.title;
        var oldroleNode = this.getChildByName("roleNode");
        var nameBg = this.getChildByName("nameBg");
        nameBg.width = 265;
        if (oldroleNode)
            this.removeChild(oldroleNode);
        var pic = data.pic;
        var level = data.tlv;
        if ((Config.TitleCfg.isTheKingTitleId(this._roleTitleId) && data.uid != "") || (data instanceof PalaceRoleInfoVo && data.uid > 0)) {
            var titlecfg = Config.TitleCfg.getTitleCfgById(this._roleTitleId);
            var isCross = titlecfg.isCross;
            this.showRoleSign(data.sign);
            this._roleUid = data.uid;
            var roleNode = undefined;
            var tcfg = Config.TitleCfg.getTitleCfgById(this._roleTitleId);
            var resPath = "palace_db_" + this._roleTitleId + (tcfg.titleType == 7 ? "_" + Api.playerVoApi.getUserSex(pic) : "");
            var flag = true;
            // if((PlatformManager.checkIsKRSp())){
            // 	flag = Config.TitleCfg.isTheKingTitleId(this._roleTitleId);
            // }
            if (App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske") && flag) {
                roleNode = App.CommonUtil.getPlayerDragonRole(this._roleTitleId, pic, level);
                roleNode.x = 320;
                roleNode.y = 100;
                // this.setLayoutPosition(LayoutConst.horizontalCentertop, myHead, this, [0, roleNode.y - 87]);
                // this.setLayoutPosition(LayoutConst.horizontalCentertop, myHair, this, [0, roleNode.y - 87]);
                this._shadowImg.y = roleNode.y + 670 - this._shadowImg.height / 2 - 15;
                this._shadowImg.visible = false;
            }
            else {
                // let arr:string[] = data.titleId.split("_");
                roleNode = Api.playerVoApi.getPlayerPortrait(Number(this._roleTitleId), pic, 0, false, null, null, level);
                if (Config.TitleCfg.isTheKingTitleId(this._roleTitleId)) {
                    var rect12 = egret.Rectangle.create();
                    rect12.setTo(0, 0, 712, 668);
                    var myBody = roleNode.getChildByName("myBody");
                    myBody.setload("user_body_full_3201_2", rect12);
                    myBody.width = 712;
                    myBody.height = 668;
                    myBody.visible = true;
                    var myHead = roleNode.getChildByName("myHead");
                    myHead.x = 356 - 70;
                    myHead.visible = true;
                }
                roleNode.y = 60;
                this._shadowImg.y = roleNode.y + roleNode.height - this._shadowImg.height / 2 - 20;
                this._shadowImg.visible = true;
                roleNode.x = this.width / 2 - roleNode.width / 2;
            }
            roleNode.name = "roleNode";
            var idx = this.getChildIndex(this._nameBg);
            this.addChildAt(roleNode, idx);
            roleNode.addTouchTap(this.roleImgClickHandler, this);
            this._nameTxt.visible = true;
            this._roleImg.visible = false;
            this._nameTxt.text = data.name;
            if (isCross == 1) {
                nameBg.width = 300;
            }
            this._nameTxt.anchorOffsetX = this._nameTxt.width / 2;
            //根据名字宽度调整背景宽度
            if (this._nameTxt.width + 60 > this._nameBg.width * this._nameBg.scaleX) {
                this._nameBg.width = (this._nameTxt.width + 60) / this._nameBg.scaleX;
                this._nameBg.scaleX = 1.0;
            }
            this._nameBg.anchorOffsetX = this._nameBg.width / 2;
            if (this._titleImg) {
                this._titleImg.dispose();
                this._titleImg = null;
            }
            var titleImg = App.CommonUtil.getTitlePic(data.titleId, data.tlv);
            titleImg.width = 155;
            titleImg.height = 59;
            titleImg.x = this.width / 2 - nameBg.width / 2;
            titleImg.y = nameBg.y - titleImg.height;
            this.addChild(titleImg);
            this.setChildIndex(this._nameBg, this.getChildIndex(titleImg) + 1);
            this.setChildIndex(this._nameTxt, this.getChildIndex(titleImg) + 2);
            this._titleImg = titleImg;
            this._nameTxt.y = this._nameBg.y + this._nameBg.height / 2 - this._nameTxt.height / 2;
            this._titleImg.x = this._nameBg.x + this._nameBg.width / 2 - this._titleImg.width / 2 - this._nameBg.anchorOffsetX;
        }
        else {
            this._roleUid = 0;
            this._shadowImg.visible = false;
            this._roleImg.y = 30;
            this._roleImg.width = 517;
            this._roleImg.height = 775;
            if (Config.TitleCfg.isTheKingTitleId(this._roleTitleId)) {
                this._roleImg.setload('palace_king_empty');
                this._roleImg.width = 517;
                this._roleImg.height = 775;
            }
            else {
                if (this._roleTitleId && ResourceManager.hasRes("palace_role_empty_" + this._roleTitleId)) {
                    this._roleImg.setload("palace_role_empty_" + this._roleTitleId);
                    this._roleImg.width = 517;
                    this._roleImg.height = 775;
                }
            }
            this._roleImg.anchorOffsetX = this._roleImg.width / 2;
            // this._roleImg.x = this.width/2 -this._roleImg.width/2 ;
            this._roleImg.visible = true;
            this._nameTxt.text = LanguageManager.getlocal("palace_titleTip_" + data.titleId);
            this._nameTxt.anchorOffsetX = this._nameTxt.width / 2;
            this._titleImg.visible = false;
            var image = BaseLoadBitmap.create("user_title_" + data.titleId + "_2");
            if (PlatformManager.checkIsTextHorizontal()) {
                image.width = 213;
                image.height = 47;
                image.x = this.width / 2 - image.width / 2;
                image.y = 2 * this.height / 3;
                this.addChild(image);
                if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
                    image.y = 2 * this.height / 3 - 8;
                }
            }
            else {
                image.width = 47;
                image.height = 103;
                image.x = this.width / 2 - 235;
                // titleImg.y = 30;
                this.addChild(image);
            }
        }
        // let config = Config.TitleCfg.getTitleCfgById(this._roleTitleId);
        // if(config && config.isTitle == 1&& config.titleType == 1 && Api.switchVoApi.checkTitleUpgrade()){
        // 	let clip = ComponentManager.getCustomMovieClip(`palaceroletitle1eff`, 3);
        // 	clip.width = 156;
        // 	clip.height = 92;
        // 	clip.playWithTime(-1);
        // 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, clip, this._titleImg, [0,-20]);
        // 	this.addChild(clip);
        // }
    };
    PalaceRoleInfoItem.prototype.showRoleSign = function (signStr) {
        if (signStr && signStr != "") {
            egret.Tween.removeTweens(this._topTxtBg);
            egret.Tween.removeTweens(this._signTxt);
            egret.Tween.removeTweens(this._tailImg);
            this._topTxtBg.alpha = 1;
            this._signTxt.alpha = 1;
            this._tailImg.alpha = 1;
            this._signTxt.text = signStr;
            this._topTxtBg.height = this._signTxt.height + 40;
            this._tailImg.y = this._topTxtBg.y + this._topTxtBg.height - 4;
            egret.Tween.get(this._topTxtBg, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
            egret.Tween.get(this._signTxt, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
            egret.Tween.get(this._tailImg, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
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
        if (event && event.data && event.data.ret) {
            var data = event.data.data.data;
            if (data.ruid == this._roleUid) {
                ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
            }
        }
    };
    PalaceRoleInfoItem.prototype.getHeight = function () {
        return 832;
    };
    PalaceRoleInfoItem.prototype.setHeadHeight = function () {
        var head = this.getChildByName('myHead');
        if (head) {
            //this.setLayoutPosition(LayoutConst.horizontalCentertop, head, this, [2, 40]);
            head.x = (640 * 0.8 - head.width) / 2 + 136 / 2 - 2;
            // head.y = 45;
        }
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
        _super.prototype.dispose.call(this);
    };
    return PalaceRoleInfoItem;
}(BaseDisplayObjectContainer));
__reflect(PalaceRoleInfoItem.prototype, "PalaceRoleInfoItem");
//# sourceMappingURL=PalaceRoleInfoItem.js.map