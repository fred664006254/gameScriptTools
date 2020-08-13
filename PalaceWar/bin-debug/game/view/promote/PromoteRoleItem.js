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
 * 军机处role
 * author qianjun
 */
var PromoteRoleItem = (function (_super) {
    __extends(PromoteRoleItem, _super);
    function PromoteRoleItem(scale, type) {
        var _this = _super.call(this) || this;
        _this._promotetype = 1;
        _this._appointBtn = null;
        _this._roleNode = null;
        _this._scale = 1;
        _this._promoteType = 1;
        _this._scale = scale;
        _this._promoteType = type;
        _this.init();
        return _this;
    }
    Object.defineProperty(PromoteRoleItem.prototype, "api", {
        get: function () {
            return Api.promoteVoApi;
        },
        enumerable: true,
        configurable: true
    });
    PromoteRoleItem.prototype.init = function () {
        var view = this;
        //view.height = 405;
        view.width = 517 * view._scale;
        view.height = 775 * view._scale;
        var titlescale = 1;
        switch (view._promoteType) {
            case 2:
            case 5:
                titlescale = 0.85;
                break;
            case 1:
            case 7:
                titlescale = 0.78;
                break;
        }
        var shadowscale = 1;
        var desc = 10;
        var top = 20;
        switch (view._promoteType) {
            case 2:
            case 5:
                desc = 0;
                shadowscale = 0.7;
                break;
            case 1:
                desc = -5;
                shadowscale = 0.6;
                top = 10;
                break;
            case 7:
                desc = -15;
                shadowscale = 0.5;
                top = 3;
                break;
        }
        var nameBg = BaseBitmap.create("promotenamebg");
        nameBg.name = "nameBg";
        nameBg.width = 142;
        nameBg.height = 42;
        var namescale = 1;
        switch (view._promoteType) {
            case 2:
            case 5:
            case 1:
            case 7:
                namescale = 0.75;
                break;
        }
        nameBg.setScale(namescale);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, nameBg, view, [0, (top - nameBg.height) * nameBg.scaleY]);
        view.addChild(nameBg);
        view._nameBg = nameBg;
        var nameTxt = ComponentManager.getTextField("1", namescale == 1 ? 18 : 16, TextFieldConst.COLOR_WARN_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, nameBg);
        view.addChild(nameTxt);
        view._nameTxt = nameTxt;
        var roleImg = BaseLoadBitmap.create("palace_role_empty");
        roleImg.visible = false;
        roleImg.width = 517 * (view._scale); //382
        roleImg.height = 775 * view._scale; //712
        //roleImg.setScale(view._scale);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, roleImg, view);
        roleImg.addTouchTap(view.promoteRoleClick, view);
        view.addChild(roleImg);
        view._roleImg = roleImg;
        var shadowImg = BaseBitmap.create("palace_role_shadow");
        shadowImg.setScale(view._scale * shadowscale);
        view.addChildAt(shadowImg, 0);
        view._shadowImg = shadowImg;
        if (PlatformManager.checkIsEnSp() || PlatformManager.checkIsRuSp()) {
            titlescale = 0.6;
        }
        var titleImg = BaseLoadBitmap.create("user_title_3000_2");
        titleImg.setScale(titlescale);
        view.setLayoutPosition(LayoutConst.lefttop, titleImg, roleImg, [desc, 20 * titlescale]);
        view.addChild(titleImg);
        view._titleImg = titleImg;
        var button = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'promotePlayerPopViewTitle', view.promoteRoleClick, view);
        button.setScale(shadowscale);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, button, roleImg, [-3 * shadowscale, 20]);
        view.addChild(button);
        button.visible = false;
        view._appointBtn = button;
        if (PlatformManager.checkIsThSp()) {
            view._appointBtn.y += 50 * shadowscale;
            var scaleValue = titlescale * 0.7;
            view._titleImg.width = 213;
            view._titleImg.height = 47;
            view._titleImg.setScale(scaleValue);
            view._titleImg.setPosition(button.x + button.width * shadowscale / 2 - view._titleImg.width * scaleValue / 2, view._appointBtn.y + view._appointBtn.height * shadowscale + 5);
        }
        if (PlatformManager.checkIsEnSp() || PlatformManager.checkIsRuSp()) {
            view._titleImg.width = 213;
            view._titleImg.height = 47;
            view._titleImg.setPosition(button.x + button.width * shadowscale / 2 - view._titleImg.width * 0.6 / 2, view._appointBtn.y + view._appointBtn.height * shadowscale + 5);
        }
        // let topTxtBg = BaseBitmap.create("public_9_bg25");
        // topTxtBg.x = this.width/2 + 110;
        // topTxtBg.height = 100;
        // topTxtBg.width = 200;
        // // topTxtBg.height = 70;
        // // topTxtBg.x = this.width/2 + 60;
        // // topTxtBg.y = roleImg.y -10;
        // this._topTxtBg = topTxtBg;
        // this._topTxtBg.alpha = 0;
        // this.addChild(topTxtBg);
        // let tailImg =  BaseBitmap.create("public_9_bg42_tail");
        // tailImg.x = topTxtBg.x + 20;
        // tailImg.y = topTxtBg.y +topTxtBg.height-4;
        // this.addChild(tailImg);
        // this._tailImg = tailImg;
        // this._tailImg.alpha = 0;
        // let txt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
        // txt.multiline = true;
        // txt.lineSpacing = 5;
        // txt.width = topTxtBg.width - 40;
        // txt.x = topTxtBg.x + 20;
        // txt.y = topTxtBg.y + 20;
        // this._signTxt =txt;
        // this._signTxt.alpha = 0;
        // this.addChild(txt);
    };
    /**
     * 刷新展示
     */
    PromoteRoleItem.prototype.refreshUIWithData = function (data) {
        var view = this;
        view._promotetype = data.promotetype;
        var oldroleNode = this.getChildByName("roleNode");
        var nameBg = this.getChildByName("nameBg");
        if (oldroleNode) {
            this.removeChild(oldroleNode);
        }
        //let maskShape = BaseBitmap.create('promoteclothtype7_head2');
        if (data instanceof PalaceRoleInfoVo && data.uid > 0) {
            this._roleUid = data.uid;
            var titleinfo = App.CommonUtil.getTitleData(data.titleId);
            var roleNode = Api.playerVoApi.getPlayerPortrait(Number(titleinfo.title), data.pic, data.promotetype);
            //userContainer.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);
            roleNode.name = "roleNode";
            roleNode.scaleX = view._scale;
            roleNode.scaleY = view._scale;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, roleNode, view._roleImg);
            var body = roleNode.getChildByName('myBody');
            var head = roleNode.getChildByName('myHead');
            head.x = (body.width - head.width) / 2 - 4;
            var hair = roleNode.getChildByName('myHair');
            hair.x = (body.width - hair.width) / 2;
            roleNode.addTouchTap(view.promoteRoleClick, view);
            view._roleNode = roleNode;
            var idx = view.getChildIndex(view._nameBg);
            view.addChildAt(roleNode, idx);
            var shadowHeight = -40;
            switch (view._promoteType) {
                case 2:
                case 5:
                    shadowHeight = -20;
                    break;
                case 1:
                    shadowHeight = -15;
                    break;
                case 7:
                    shadowHeight = -9;
                    break;
            }
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._shadowImg, roleNode, [0, shadowHeight]);
            view._shadowImg.y = roleNode.height * view._scale + shadowHeight;
            view._nameTxt.visible = true;
            view._shadowImg.visible = true;
            view._roleImg.visible = false;
            view._appointBtn.visible = false;
            view._titleImg.setload("promotetitle" + data.promotetype);
            view._nameTxt.text = data.name;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._nameTxt, view._nameBg);
            // if(view._promotetype == 7){
            // 	this.showRoleSign(LanguageManager.getlocal('Promote7sign'));
            // }
        }
        else {
            view._roleUid = 0;
            view._shadowImg.visible = false;
            view._roleImg.visible = true;
            view._nameTxt.text = LanguageManager.getlocal("promoteType" + data.promotetype);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._nameTxt, view._nameBg);
            view._titleImg.setload("promotetitle" + data.promotetype);
            if (view.api.isKing()) {
                view._appointBtn.visible = true;
            }
        }
    };
    PromoteRoleItem.prototype.showUserInfo = function (uid) {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: uid });
    };
    PromoteRoleItem.prototype.showRoleSign = function (signStr) {
        if (signStr && signStr != "") {
            egret.Tween.removeTweens(this._topTxtBg);
            egret.Tween.removeTweens(this._signTxt);
            egret.Tween.removeTweens(this._tailImg);
            this._topTxtBg.alpha = 1;
            this._signTxt.alpha = 1;
            this._tailImg.alpha = 1;
            this._signTxt.text = signStr;
            egret.Tween.get(this._topTxtBg, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
            egret.Tween.get(this._signTxt, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
            egret.Tween.get(this._tailImg, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
        }
    };
    PromoteRoleItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        data.promoteType = this._promotetype;
        ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    PromoteRoleItem.prototype.promoteRoleClick = function (event) {
        var view = this;
        //有人
        if (view._roleUid) {
            view.showUserInfo(view._roleUid);
        }
        else {
            //打开分封弹窗
            if (view.api.isKing()) {
                ViewController.getInstance().openView(ViewConst.POPUP.PROMOTEPLAYERPOPVIEW, { type: view._promotetype });
            }
        }
    };
    PromoteRoleItem.prototype.getHeight = function () {
        return 832;
    };
    PromoteRoleItem.prototype.dispose = function () {
        BaseLoadBitmap.release(this._roleImg);
        this._roleImg = null;
        BaseLoadBitmap.release(this._headImg);
        this._headImg = null;
        BaseLoadBitmap.release(this._titleImg);
        this._titleImg = null;
        this._nameBg = null;
        this._nameTxt = null;
        this._shadowImg = null;
        this._appointBtn = null;
        this._roleNode = null;
        this._topTxtBg = null;
        this._signTxt = null;
        // this._roleImg.removeTouchTap();
        // this._roleNode.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return PromoteRoleItem;
}(BaseDisplayObjectContainer));
__reflect(PromoteRoleItem.prototype, "PromoteRoleItem");
//# sourceMappingURL=PromoteRoleItem.js.map