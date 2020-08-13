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
 * date 2018/03/27
 * @class PalaceRoleInfoItem2
 */
var PalaceRoleInfoItem2 = (function (_super) {
    __extends(PalaceRoleInfoItem2, _super);
    // static buildingId:string = "";
    function PalaceRoleInfoItem2() {
        return _super.call(this) || this;
    }
    PalaceRoleInfoItem2.prototype.initItem = function (index, data) {
        this._curTitleId = data;
        var bg = BaseLoadBitmap.create("palace_perbg");
        bg.width = 210;
        bg.height = 322;
        this.width = bg.width + this.getSpaceX();
        this.height = bg.height + this.getSpaceY();
        // bg.addTouchTap(this.detailHandler,this);
        this.addChild(bg);
        var roleInfo = Api.palaceVoApi.getRoleInfoByTitleId(this._curTitleId);
        var nameTxt = ComponentManager.getTextField("", 20);
        if (roleInfo.name) {
            nameTxt.text = roleInfo.name;
            nameTxt.size = 20;
            nameTxt.y = 12;
        }
        else {
            nameTxt.text = LanguageManager.getlocal("palace_titleTip_" + this._curTitleId);
            nameTxt.size = 14;
            nameTxt.y = 15;
            // LanguageManager.getlocal("playerview_Nopo");
        }
        nameTxt.x = bg.width / 2 - nameTxt.width / 2;
        this.addChild(nameTxt);
        var roleImg = undefined;
        if (roleInfo.name) {
            roleImg = Api.playerVoApi.getPlayerPortrait(Number(this._curTitleId), roleInfo.pic);
            roleImg.anchorOffsetX = roleImg.width / 2;
            roleImg.setScale(0.35);
            roleImg.addTouchTap(function () {
                NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                    ruid: roleInfo.uid,
                    rzid: Api.mergeServerVoApi.getTrueZid(roleInfo.uid)
                });
            }, this);
        }
        else {
            roleImg = BaseLoadBitmap.create("palace_role_empty");
            roleImg.width = 382;
            roleImg.height = 712;
            roleImg.anchorOffsetX = roleImg.width / 2;
            roleImg.setScale(0.35);
        }
        roleImg.x = bg.width / 2;
        roleImg.y = 45;
        this.addChild(roleImg);
        var titleImg = BaseLoadBitmap.create("user_title_" + this._curTitleId + "_2");
        //横版名字变竖版名字
        if (PlatformManager.checkIsTextHorizontal()) {
            titleImg.width = 213;
            titleImg.height = 47;
            titleImg.anchorOffsetX = titleImg.width / 2;
            titleImg.anchorOffsetY = titleImg.height / 2;
            titleImg.setScale(0.65);
            titleImg.x = this.width / 2;
            titleImg.y = this.height - 85;
        }
        else {
            titleImg.width = 47;
            titleImg.height = 103;
            titleImg.x = 15;
            titleImg.y = roleImg.y;
        }
        this.addChild(titleImg);
        var hisBtn = ComponentManager.getButton("palace_hisBtn3", "", this.hisBtnHandler, this);
        hisBtn.x = bg.width - hisBtn.width - 10;
        hisBtn.y = bg.height - hisBtn.height - 10;
        this.addChild(hisBtn);
    };
    PalaceRoleInfoItem2.prototype.detailHandler = function () {
        // ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEVIEW,{titleId:this._curTitleId,buildingId:PalaceRoleInfoItem2.buildingId});
    };
    PalaceRoleInfoItem2.prototype.hisBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PALACEHISTORYPOPUPVIEW, { titleId: this._curTitleId });
    };
    PalaceRoleInfoItem2.prototype.getSpaceX = function () {
        return 3;
    };
    PalaceRoleInfoItem2.prototype.getSpaceY = function () {
        return 3;
    };
    PalaceRoleInfoItem2.prototype.dispose = function () {
        this._curTitleId = null;
        _super.prototype.dispose.call(this);
    };
    return PalaceRoleInfoItem2;
}(ScrollListItem));
__reflect(PalaceRoleInfoItem2.prototype, "PalaceRoleInfoItem2");
//# sourceMappingURL=PalaceRoleInfoItem2.js.map