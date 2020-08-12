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
/*
 *@author: yangtao
 *@update date: 2020-06-04 11:08:18
 *@version 2.1.0
 */
var SingInItem = (function (_super) {
    __extends(SingInItem, _super);
    function SingInItem() {
        var _this = _super.call(this) || this;
        _this._selectedSp = null;
        return _this;
    }
    SingInItem.prototype.initItem = function (index, data) {
        this._selectedIndex = index;
        this._signID = data;
        var temW = 168;
        var temH = 196;
        this.width = temW;
        this.height = temH;
        this.width = temW + 6;
        this.height = temH + 10;
        var titleText = ComponentMgr.getTextField('11', TextFieldConst.SIZE_26, ColorEnums.white);
        titleText.stroke = 2;
        if (Api.SigninfoVoApi.getSignWeek()) {
            titleText.text = LangMger.getlocal("sign_day_" + (Number(data) - 7));
        }
        else {
            titleText.text = LangMger.getlocal("sign_day_" + Number(data));
        }
        var bgSkin;
        if (Api.SigninfoVoApi.getSignCom(data)) {
            bgSkin = "singin_geting_bg";
            titleText.textColor = ColorEnums.red;
        }
        else {
            bgSkin = "singin_get_bg";
            titleText.textColor = ColorEnums.white;
        }
        var bg = BaseBitmap.create(bgSkin);
        this._bg = bg;
        bg.width = temW;
        bg.height = temH;
        this.addChild(bg);
        bg.addTouchTap(this.tick, this, [data]);
        if (Api.SigninfoVoApi.getSignCom(data)) {
            this._signlight = BaseBitmap.create("singin_light");
            this._signlight.anchorOffsetX = this._signlight.width / 2;
            this._signlight.anchorOffsetY = this._signlight.height / 2;
            this.addChild(this._signlight);
            egret.Tween.get(this._signlight, { loop: true }).to({ rotation: 360 }, 3000);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._signlight, bg);
        }
        this.addChild(titleText);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleText, bg, [0, 8]);
        var freerewardvo = GameData.formatRewardItem(Config.SignCfg.getSignInfoByID(data))[0];
        var freeicon;
        if (Api.SigninfoVoApi.getSignTou(data)) {
            freeicon = GameData.getItemIcon(freerewardvo, 0, true);
        }
        else {
            freeicon = GameData.getItemIcon(freerewardvo, 0, false);
        }
        this.addChild(freeicon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, freeicon, bg);
        if (Api.SigninfoVoApi.getSign(data)) {
            var signMask = BaseBitmap.create("singin_mask_1");
            this.addChild(signMask);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, signMask, bg);
            App.DisplayUtil.changeToGray(signMask);
            var signGet = BaseBitmap.create("singin_get");
            this.addChild(signGet);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, signGet, bg, [0, 13]);
            freeicon.touchEnabled = false;
        }
        else {
            var numText = ComponentMgr.getTextField('11', TextFieldConst.SIZE_26, ColorEnums.white);
            numText.text = "x" + freerewardvo.num;
            numText.stroke = 2;
            this.addChild(numText);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numText, bg, [0, 19]);
        }
    };
    SingInItem.prototype.tick = function (event, data) {
        if (Api.SigninfoVoApi.getSignCom(data)) {
            Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
            NetManager.request(NetConst.SIGNINFO_SIGN, {});
        }
        // if(Api.SigninfoVoApi.getSignTou(data)&&Api.SigninfoVoApi.getSignHsa())
        // {
        // 	let freerewardvo = GameData.formatRewardItem(Config.SignCfg.getSignInfoByID(data))[0];
        // 	if(Api.SigninfoVoApi.getShowBool(freerewardvo.type)){
        // 		ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
        // 			title : freerewardvo.name,
        // 			handler : null,
        // 			needCancel : false,
        // 			needClose : 1,
        // 			param : freerewardvo,
        // 			costnum :LangMger.getlocal("sysconfirm"),
        // 			// costIcon : `ab_mainui_gem`
        // 		});
        // 	}
        // }
    };
    SingInItem.prototype.ticks = function () {
        this._signlight.rotation += 60;
    };
    SingInItem.prototype.getSpaceY = function () {
        return 10;
    };
    SingInItem.prototype.getSpaceX = function () {
        return 0;
    };
    SingInItem.prototype.dispose = function () {
        this._bg = null;
        this._signinfoVo = null;
        this._signlight = null;
        //this._mailTitleTF = null;
        _super.prototype.dispose.call(this);
    };
    return SingInItem;
}(ScrollListItem));
__reflect(SingInItem.prototype, "SingInItem");
//# sourceMappingURL=SingInItem.js.map