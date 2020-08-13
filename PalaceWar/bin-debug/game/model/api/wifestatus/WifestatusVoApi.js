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
 * 册封系统api
 * author dky
 * date 2018/4/25
 * @class WifestatusVoApi
 */
var WifestatusVoApi = (function (_super) {
    __extends(WifestatusVoApi, _super);
    function WifestatusVoApi() {
        return _super.call(this) || this;
    }
    WifestatusVoApi.prototype.getWifestatusVo = function () {
        return this.wifestatusVo;
    };
    WifestatusVoApi.prototype.getIsConfer = function () {
        if (!Api.switchVoApi.checkOpenWifeStatus()) {
            return false;
        }
        var wifestatuVo = Api.wifestatusVoApi.getWifestatusVo();
        var wifestatuCfg = Config.WifestatusCfg.getWifestatusList();
        var wifeVolist = Api.wifeVoApi.getWifeInfoVoList();
        for (var index = 0; index < wifestatuCfg.length; index++) {
            var stateCfg = wifestatuCfg[index];
            if (Number(stateCfg.id) <= Number(wifestatuVo.level)) {
                if (!wifestatuVo.info[stateCfg.id] || !wifestatuVo.info[stateCfg.id].length || wifestatuVo.info[stateCfg.id].length < stateCfg.maxNum) {
                    for (var index2 = 0; index2 < wifeVolist.length; index2++) {
                        var wifeVo = wifeVolist[index2];
                        if (wifeVo.glamour >= stateCfg.needGlamour && wifeVo.intimacy >= stateCfg.needIntimacy) {
                            if (Number(this.getWifestatusLevelById(String(wifeVo.id))) < Number(stateCfg.id)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    /**获取一个红颜是否可以上封 */
    WifestatusVoApi.prototype.getIsConferById = function (wifeId) {
        var wifestatuVo = Api.wifestatusVoApi.getWifestatusVo();
        var wifestatuCfg = Config.WifestatusCfg.getWifestatusList();
        // let wifeVolist = Api.wifeVoApi.getWifeInfoVoList();
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        for (var index = 0; index < wifestatuCfg.length; index++) {
            var stateCfg = wifestatuCfg[index];
            if (Number(stateCfg.id) <= Number(wifestatuVo.level)) {
                if (!wifestatuVo.info[stateCfg.id] || !wifestatuVo.info[stateCfg.id].length || wifestatuVo.info[stateCfg.id].length < stateCfg.maxNum) {
                    if (wifeVo.glamour >= stateCfg.needGlamour && wifeVo.intimacy >= stateCfg.needIntimacy) {
                        if (Number(this.getWifestatusLevelById(String(wifeVo.id))) < Number(stateCfg.id)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    /**获取册封列表 */
    WifestatusVoApi.prototype.getWifestatusVoList = function () {
        var arr = new Array();
        var wifestatusVoObj = this.wifestatusVo.info;
        for (var key in wifestatusVoObj) {
            arr.push(wifestatusVoObj[key]);
        }
        return arr;
    };
    /**获取红颜册封等级 */
    WifestatusVoApi.prototype.getWifestatusLevelById = function (wifeId) {
        var wifestatusVoObj = this.wifestatusVo.info;
        for (var key in wifestatusVoObj) {
            for (var index = 0; index < wifestatusVoObj[key].length; index++) {
                var element = wifestatusVoObj[key][index];
                if (String(element) == String(wifeId)) {
                    return key;
                }
            }
        }
        return "1";
    };
    /**获取红颜册是否在某一等级 */
    WifestatusVoApi.prototype.getWifestatusInLevelById = function (level, wifeId) {
        var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        if (!wifestatusVo.info[level]) {
            return false;
        }
        for (var index = 0; index < wifestatusVo.info[level].length; index++) {
            var element = wifestatusVo.info[level][index];
            if (element == wifeId) {
                return true;
            }
        }
        return false;
    };
    /**获取一个等级有多少红颜 */
    WifestatusVoApi.prototype.getWifesNumByLevel = function (level) {
        var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        if (wifestatusVo.info[level] && wifestatusVo.info[level].length) {
            return wifestatusVo.info[level].length;
        }
        // let arr:Array<WifestatusVo> = new Array();
        // let wifestatusVoObj:Object = this.wifestatusVo.info;
        // for(let key in wifestatusVoObj)
        // {
        // 	arr.push(wifestatusVoObj[key]);
        // }
        return 0;
    };
    /**
     * 获取没有册封的红颜
     * @param
     */
    WifestatusVoApi.prototype.getNoStatusWife = function () {
        var wifestatusList = new Array();
        var wifes = Api.wifeVoApi.getWifes();
        for (var index = 0; index < wifes.length; index++) {
            var element = wifes[index];
            if (this.getWifestatusLevelById(element) == "1") {
                wifestatusList.push(element);
            }
        }
        // let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        // let haveList = new Array();
        // for (var key in wifestatusVo.info) {
        // 	if (wifestatusVo.info.hasOwnProperty(key)) {
        // 		var element = wifestatusVo.info[key];
        // 		// haveList.concat(element);
        // 		for (var index = 0; index < wifes.length; index++) {
        // 			for(var ii = 0; ii < element.length; ii++)
        // 			{
        // 				if(wifes[index] == element[ii]){
        // 					wifes.splice(index, 1);
        // 				}
        // 			}
        // 		}
        // 	}
        // }
        // for (var index = 0; index < wifes.length; index++) {
        // 	for(var ii = 0; ii < wifes.length; ii++)
        // 	{
        // 		if(wifes[index] == haveList[ii]){
        // 			wifes.splice(index, 1);
        // 		}
        // 	}
        // }
        return wifestatusList;
    };
    /**
     * 根据ID获取对应等级的红颜
     * @param
     */
    WifestatusVoApi.prototype.getStatusWifes = function (statusId) {
        var wifestatusList = new Array();
        var wifeList = Api.wifeVoApi.getWifeInfoVoList();
        for (var index = 0; index < wifeList.length; index++) {
            var element = wifeList[index];
            wifestatusList.push(element.id);
        }
        return wifestatusList;
    };
    /**
     * 根据红颜id获取红颜vo
     * @param id 红颜id
     */
    WifestatusVoApi.prototype.getWifestatusVoById = function (id) {
        var WifestatusVoObj = this.wifestatusVo.info;
        if (WifestatusVoObj && WifestatusVoObj[id.toString()]) {
            return WifestatusVoObj[id.toString()];
        }
        return null;
    };
    /**
     * 根据册封id获取册封列表位置
     * @param id 红颜id
     */
    WifestatusVoApi.prototype.getWifeIndexVoById = function (id) {
        var wifeVolist = Config.WifestatusCfg.getWifestatusList();
        for (var i = 0; i < wifeVolist.length; i++) {
            if (id == wifeVolist[i].id) {
                return i;
            }
        }
        return 0;
    };
    /**
     * 获取红颜赏赐红点

     */
    WifestatusVoApi.prototype.getGiveRed = function () {
        var cfg = Config.WifebaseCfg.wifeGift;
        for (var index = 1; index < 5; index++) {
            var key = index.toString();
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
            if (hasNum > 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取红颜技能红点

     */
    WifestatusVoApi.prototype.getSkillRed = function (wifeId) {
        // let wifeVo = Api.wifeVoApi.getWifestatusVoById(wifeId);
        // let list = wifeVo.cfg.wifeSkill;
        // for (var index = 0; index < list.length; index++) {
        // 	var element = list[index];
        // 	if(element.condition <= wifeVo.intimacy){
        // 		//解锁了
        // 		let needExp = Config.WifebaseCfg["wifeSkill" + (index + 1)][wifeVo.skill[index]-1];
        // 		let hasNum:number = wifeVo.exp;
        // 		if(needExp <= hasNum)
        // 		{
        // 			return true;
        // 		}
        // 	}
        // }
        return false;
    };
    WifestatusVoApi.prototype.getStatusEffect = function (star) {
        var contanier = new BaseDisplayObjectContainer();
        var upgradeClip = ComponentManager.getCustomMovieClip("wifestatus_frame", 5, 100);
        upgradeClip.setScale(2);
        upgradeClip.x = 0;
        upgradeClip.y = 0;
        contanier.addChild(upgradeClip);
        upgradeClip.playWithTime(1);
        var str = "";
        var isblue = Api.switchVoApi.checkIsInBlueWife();
        if (star > 0) {
            str = isblue ? "wifestatus_flytext_male" : "wifestatus_flytext";
        }
        else {
            str = isblue ? "wifestatustip1_male" : "wifestatustip1";
        }
        var text1 = BaseBitmap.create(str);
        text1.setScale(2);
        text1.x = 70;
        text1.y = 40;
        contanier.addChild(text1);
        egret.Tween.get(text1)
            .to({ y: 0 }, 800).to({ alpha: 0 }, 100)
            .call(function (tf) {
            egret.Tween.removeTweens(tf);
            // self._tfPool.push(tf);
            if (tf.parent) {
                tf.parent.removeChild(tf);
            }
        }, this, [contanier]);
        var scoreContainer = new BaseDisplayObjectContainer();
        contanier.addChild(scoreContainer);
        var bgPic = "public_9_powertipbg";
        var numBg = BaseBitmap.create(bgPic);
        if (PlatformManager.checkIsThSp()) {
            bgPic = "public_9_powertipbg2";
            numBg = BaseLoadBitmap.create(bgPic);
            numBg.height = 49;
        }
        // numBg.width = 300;
        // numBg.setScale(this._temScale);
        scoreContainer.addChild(numBg);
        scoreContainer.x = 120;
        scoreContainer.y = 170;
        var icon = BaseBitmap.create("wifestatus_icon");
        icon.x = 40;
        icon.y = numBg.height / 2 - icon.height / 2;
        scoreContainer.addChild(icon);
        var message = star + "";
        if (star > 0) {
            message = "+" + message;
        }
        else {
            // message = "-" + message; 
        }
        var msgTF = ComponentManager.getBitmapText(message, "crit_fnt");
        scoreContainer.addChild(msgTF);
        numBg.width = msgTF.width + 110;
        msgTF.x = 95;
        msgTF.y = numBg.height / 2 - msgTF.height / 2;
        egret.Tween.get(scoreContainer)
            .to({ y: 130 }, 800).to({ alpha: 0 }, 100);
        contanier.setPosition(GameConfig.stageWidth / 2 - 213, GameConfig.stageHeigth / 2 - 213);
        return contanier;
    };
    WifestatusVoApi.prototype.getStatusWifeNum = function () {
        var number = Api.wifeVoApi.getWifeInfoVoList().length - this.getNoStatusWife().length;
        return number;
    };
    return WifestatusVoApi;
}(BaseVoApi));
__reflect(WifestatusVoApi.prototype, "WifestatusVoApi");
//# sourceMappingURL=WifestatusVoApi.js.map