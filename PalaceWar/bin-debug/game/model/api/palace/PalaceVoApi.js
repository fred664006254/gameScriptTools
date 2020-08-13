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
 * 皇宫api
 * author yanyuling
 * date 2017/11/01
 * @class PalaceVoApi
 */
var PalaceVoApi = (function (_super) {
    __extends(PalaceVoApi, _super);
    function PalaceVoApi() {
        return _super.call(this) || this;
    }
    PalaceVoApi.prototype.getRoleInfoByTitleId = function (id) {
        if (Number(id) == 3201) {
            return this.palaceVo.palace[id];
        }
        else {
            return this.palaceVo.palace[id];
        }
    };
    PalaceVoApi.prototype.getRoleInfoList = function () {
        return this.palaceVo.palace;
    };
    PalaceVoApi.prototype.updateRoleSign = function (titleId, sign) {
        this.palaceVo.palace[titleId].sign = sign;
    };
    /**
     * 判断自己是否在宫殿之中
     */
    PalaceVoApi.prototype.isInThePalace = function () {
        for (var key in this.palaceVo.palace) {
            var element = this.palaceVo.palace[key];
            if (element.uid == Api.playerVoApi.getPlayerID()) {
                return key;
            }
        }
        return false;
    };
    PalaceVoApi.prototype.isInThePalaceByPalaceId = function (id) {
        if (this.palaceVo && this.palaceVo.palace && this.palaceVo.palace[id]) {
            var vo = this.palaceVo.palace[id];
            if (vo.uid && vo.uid == Api.playerVoApi.getPlayerID()) {
                return true;
            }
        }
        return false;
    };
    PalaceVoApi.prototype.checkNpcMessage = function () {
        var boo = false;
        if (Api.titleupgradeVoApi.checkPalaceMessage()) {
            boo = true;
        }
        else {
            boo = false;
        }
        //帝王成就
        if (!boo && Api.switchVoApi.checkTitleUpgrade() && Api.switchVoApi.checkOpenEmperorsAchievement() && Api.emperorAchieveVoApi.isShowKingAchieveRedDot()) {
            boo = true;
        }
        //帝王霸业
        if (!boo && Api.switchVoApi.checkTitleUpgrade() && Api.titleupgradeVoApi.checkNpcMessage()) {
            boo = true;
        }
        return Api.otherInfoVoApi.getOtherInfo().palace_flag == 0 || boo;
    };
    PalaceVoApi.prototype.isDataInit = function () {
        return (this.palaceVo && this.palaceVo.isInit);
    };
    /**宫殿是否有人 */
    PalaceVoApi.prototype.isHasMan = function (titleid) {
        var has = false;
        if (titleid) {
            for (var i = 0; i < titleid.length; i++) {
                if (Number(titleid[i]) == 3201) {
                    if (Api.promoteVoApi._ishaveking == 1) {
                        has = true;
                        break;
                    }
                }
                else {
                    if (this.palaceVo.palace[titleid[i]] && this.palaceVo.palace[titleid[i]].uid && this.palaceVo.palace[titleid[i]].uid != 0) {
                        has = true;
                        break;
                    }
                }
            }
        }
        return has;
    };
    /**
     * 是否开启跨服职称
     */
    PalaceVoApi.prototype.isCrossOpen = function () {
        return Api.switchVoApi.isCrossOpen();
    };
    PalaceVoApi.prototype.openMainView = function () {
        if (Api.switchVoApi.checkNewPalace()) {
            ViewController.getInstance().openView(ViewConst.COMMON.PALACENEWVIEW);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("palace_buildingNotOpen"));
        }
    };
    /**
     *  是否显示特殊标示
     */
    PalaceVoApi.prototype.isShowBuildingFlag = function (buildingId) {
        if (buildingId == "31") {
            return Api.promoteVoApi._ishaveking == 1;
        }
        var buicfg = GameConfig.config.buildingCfg[buildingId];
        var title = buicfg.title;
        for (var key in title) {
            var rinfo = this.palaceVo.palace[title[key]];
            if (rinfo && rinfo.uid) {
                return true;
            }
        }
        return false;
    };
    //自己是否在金銮殿中
    PalaceVoApi.prototype.isInKingsHouse = function () {
        // let titleId = "3201"
        // let rinfo = this.palaceVo?this.palaceVo.palace[titleId]:null;
        // if (rinfo && rinfo.uid == Api.playerVoApi.getPlayerID()) {
        // 	return true;
        // }
        // return false;
        return Api.promoteVoApi.isKing();
    };
    PalaceVoApi.prototype.enterKingsHouse = function (tid, buildingId) {
        if (tid === void 0) { tid = "3201"; }
        if (buildingId === void 0) { buildingId = "31"; }
        if (Api.promoteVoApi.isKing()) {
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEKINGSHOUSEGROUPVIEW, { titleId: tid, buildingId: buildingId });
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEVIEW, { titleId: tid, buildingId: buildingId });
        }
    };
    return PalaceVoApi;
}(BaseVoApi));
__reflect(PalaceVoApi.prototype, "PalaceVoApi");
//# sourceMappingURL=PalaceVoApi.js.map