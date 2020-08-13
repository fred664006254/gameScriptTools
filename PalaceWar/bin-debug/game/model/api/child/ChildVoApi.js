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
 * 子嗣系统api
 * author dmj
 * date 2017/9/23
 * @class ChildVoApi
 */
var ChildVoApi = (function (_super) {
    __extends(ChildVoApi, _super);
    function ChildVoApi() {
        var _this = _super.call(this) || this;
        // 子嗣扩展槽
        _this.posnum = 0;
        return _this;
    }
    ChildVoApi.prototype.checkNpcMessage = function () {
        var childList = this.getChildrenVoList();
        for (var index = 0; index < childList.length; index++) {
            var childVo = childList[index];
            var childCfg = GameConfig.config.childCfg[childVo.quality.toString()];
            if (this.getChildrenVigourById(childVo.id) > 0) {
                if (childVo.level < childCfg.lv) {
                    // return LanguageManager.getlocal("child_words2_3");
                    return true;
                }
            }
            if (!childVo.name) {
                return true;
            }
            else if (childVo.level >= childCfg.lv) {
                return true;
            }
        }
        return false;
    };
    ChildVoApi.prototype.getWaitAduleNum = function () {
        var num = 0;
        var childList = this.getChildrenVoList();
        for (var index = 0; index < childList.length; index++) {
            var childVo = childList[index];
            var childCfg = GameConfig.config.childCfg[childVo.quality.toString()];
            if (this.getChildrenVigourById(childVo.id) > 0) {
                if (childVo.level >= childCfg.lv) {
                    num++;
                }
            }
        }
        return num;
    };
    // 获取子嗣扩展槽
    ChildVoApi.prototype.getChildPosNum = function () {
        var num = this.childVo.posnum;
        return num;
    };
    // 获取子嗣数量
    ChildVoApi.prototype.getChildNum = function () {
        var num = this.getChildrenVoList().length;
        return num;
    };
    // 获取子嗣数组
    ChildVoApi.prototype.getChildrenVoList = function () {
        var childInfoVoObj = this.childVo.childInfoVoObj;
        var arr = new Array();
        for (var key in childInfoVoObj) {
            arr.push(childInfoVoObj[key]);
        }
        // todo对数组进行排序
        arr.sort(function (a, b) {
            var aCfg = GameConfig.config.childCfg[a.quality.toString()];
            var bCfg = GameConfig.config.childCfg[b.quality.toString()];
            if (!a.name && !b.name) {
                if (a.quality == b.quality) {
                    return Number(a.bts) - Number(b.bts);
                }
                else {
                    return Number(b.quality) - Number(a.quality);
                }
            }
            else if (!a.name && b.name) {
                return -1;
            }
            else if (a.name && (!b.name)) {
                return 1;
            }
            else if (a.name && b.name) {
                if (a.level >= aCfg.lv && b.level >= bCfg.lv) {
                    if (a.quality == b.quality) {
                        return Number(a.bts) - Number(b.bts);
                    }
                    else {
                        return Number(b.quality) - Number(a.quality);
                    }
                }
                else if (a.level >= aCfg.lv && b.level < bCfg.lv) {
                    return -1;
                }
                else if (a.level < aCfg.lv && b.level >= bCfg.lv) {
                    return 1;
                }
                else {
                    if (a.quality == b.quality) {
                        return Number(a.bts) - Number(b.bts);
                    }
                    else {
                        return Number(b.quality) - Number(a.quality);
                    }
                }
            }
            // if (a.quality == b.quality)
            // {
            // 	return Number(a.bts) - Number(b.bts)  ;
            // }else
            // {
            // 	return Number(b.quality) -  Number(a.quality) ;
            // }
        });
        return arr;
    };
    /**
     * 更新列表数据
     */
    ChildVoApi.prototype.updateChildreInfoVo = function (data) {
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            var info = this.getChildrenInfoVoById(id);
            if (info) {
                data[i] = info;
            }
        }
        return data;
    };
    /**
     * 根据子嗣id获取子嗣vo
     * @param id 子嗣id
     */
    ChildVoApi.prototype.getChildrenInfoVoById = function (id) {
        var childInfoVoObj = this.childVo.childInfoVoObj;
        if (childInfoVoObj && childInfoVoObj[id]) {
            return childInfoVoObj[id];
        }
        return null;
    };
    /**
     * 根据子嗣id获取子嗣列表位置
     * @param id 子嗣id
     */
    ChildVoApi.prototype.getChildIndexVoById = function (id, data) {
        var childVolist = this.getChildrenVoList();
        if (data && data.length > 0) {
            childVolist = data;
        }
        for (var i = 0; i < childVolist.length; i++) {
            if (id == childVolist[i].id) {
                return i;
            }
        }
        return 0;
    };
    /**
     * 根据子嗣id获取子嗣活力
     * @param id 子嗣id
     */
    ChildVoApi.prototype.getChildrenVigourById = function (id) {
        var childInfoVoObj = this.childVo.childInfoVoObj;
        var vNum = 0;
        var maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
        var childrenInfoVo = childInfoVoObj[id];
        vNum = Math.floor((GameData.serverTime - childrenInfoVo.vigour.st) / GameConfig.config.childbaseCfg.needTime);
        if (vNum + childrenInfoVo.vigour.num > maxV) {
            vNum = maxV;
        }
        else {
            vNum = vNum + childrenInfoVo.vigour.num;
        }
        return vNum;
    };
    /**
     * 根据子嗣id获取子嗣活力恢复时间
     * @param id 子嗣id
     */
    ChildVoApi.prototype.getChildrenVigourTimeById = function (id) {
        var time = 0;
        var needTime = Config.ChildbaseCfg.needTime;
        var childInfoVoObj = this.childVo.childInfoVoObj;
        var childrenInfoVo = childInfoVoObj[id];
        var st = childrenInfoVo.vigour.st;
        if ((st + needTime) > GameData.serverTime) {
            time = st + needTime - GameData.serverTime;
        }
        return time;
    };
    /**
     * 获取恢复所有子嗣体力需要的道具数量
     */
    ChildVoApi.prototype.getChildrenVigourItemCount = function () {
        var num = 0;
        var childVolist = this.getChildrenVoList();
        for (var i = 0; i < childVolist.length; i++) {
            if (this.getChildrenVigourById(childVolist[i].id) < 2) {
                var childCfg = GameConfig.config.childCfg[childVolist[i].quality.toString()];
                if (childVolist[i].level < childCfg.lv) {
                    num++;
                }
            }
        }
        return num;
    };
    /**
     * 获取可以培养的子嗣数量
     */
    ChildVoApi.prototype.getChildrenCanUpdCount = function () {
        var num = 0;
        var childVolist = this.getChildrenVoList();
        for (var i = 0; i < childVolist.length; i++) {
            if (this.getChildrenVigourById(childVolist[i].id) > 0) {
                var childCfg = GameConfig.config.childCfg[childVolist[i].quality.toString()];
                if (childVolist[i].level < childCfg.lv && childVolist[i].name != "") {
                    num++;
                }
            }
        }
        return num;
    };
    ChildVoApi.prototype.getChildrenCanUpdTiliCount = function () {
        var num = 0;
        var childVolist = this.getChildrenVoList();
        for (var i = 0; i < childVolist.length; i++) {
            var childvo = childVolist[i];
            var tili = this.getChildrenVigourById(childvo.id);
            if (tili > 0) {
                var childCfg = GameConfig.config.childCfg[childvo.quality.toString()];
                if (childvo.level < childCfg.lv && childvo.name != "") {
                    var huoli = this.getMaxLevelNeedTili(childvo);
                    num += Math.min(tili, huoli);
                }
            }
        }
        return num;
    };
    ChildVoApi.prototype.getMaxLevelNeedTili = function (childvo) {
        var exp = 0;
        var huoli = 0;
        var childCfg = GameConfig.config.childCfg[childvo.quality.toString()];
        for (var i = childvo.level; i <= childCfg.needExp.length; i++) {
            exp += childCfg.needExp[i - 1];
        }
        exp -= childvo.lastExp;
        huoli = exp / 10;
        return huoli;
    };
    /*

    /**
     * 子嗣位置扩展所需元宝  超过最大值取最大值
     *
     */
    ChildVoApi.prototype.getAddPosNeedGem = function () {
        var needGem = 0;
        var childNum = Api.childVoApi.getChildPosNum();
        var posInex = childNum - Config.ChildbaseCfg.iniPos;
        if (posInex >= Config.ChildbaseCfg.needGem.length - 1) {
            posInex = Config.ChildbaseCfg.needGem.length - 1;
        }
        needGem = Config.ChildbaseCfg.needGem[posInex];
        return needGem;
    };
    // 获取子嗣图片
    ChildVoApi.prototype.getChildPic = function (id) {
        function abcdd() {
        }
        var childInfoVo = this.getChildrenInfoVoById(id);
        var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        //刷新等级
        var childState = childInfoVo.level / childCfg.lv;
        var childPic = "child_state_1";
        if (childState < 0.4) {
            childPic = "child_state_1";
        }
        else if (childState >= 0.4 && childState < 1) {
            childPic = "child_state_2_" + childInfoVo.sex + "_" + (childInfoVo.character ? childInfoVo.character : 1);
        }
        else {
            childPic = "child_state_3_" + childInfoVo.sex;
            var childQuality = 1;
            for (var i = 1; i < 8; ++i) {
                var item = Config.AdultCfg.getItemCfgById(i);
                if (item.upper) {
                    if (childInfoVo.attrVo.attTotal >= item.lower && childInfoVo.attrVo.attTotal <= item.upper) {
                        childQuality = i;
                        break;
                    }
                }
                else {
                    childQuality = 7;
                }
            }
            if (Api.switchVoApi.checkOpenAdultImage() && childQuality != 7) {
                childPic += "_" + childQuality;
            }
        }
        return childPic;
    };
    // 获取子嗣说的话
    ChildVoApi.prototype.getChildWord = function (id) {
        var childInfoVo = this.getChildrenInfoVoById(id);
        var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        //刷新等级
        var childState = childInfoVo.level / childCfg.lv;
        var childWords = "";
        var wordIndex = 1;
        if (childState < 0.4) {
            wordIndex = App.MathUtil.getRandom(1, 3);
            childWords = LanguageManager.getlocal("child_words1_" + wordIndex);
        }
        else if (childState >= 0.4 || childState < 1) {
            wordIndex = App.MathUtil.getRandom(1, 5);
            childWords = LanguageManager.getlocal("child_words2_" + wordIndex);
        }
        else {
        }
        return childWords;
    };
    /**
     * 检测是否显示子嗣Npc
     */
    ChildVoApi.prototype.isShowNpc = function () {
        return this.childVo ? this.childVo.cnum > 0 : (this.getChildNum() > 0 ? true : false);
    };
    //当前子嗣的数量
    ChildVoApi.prototype.getCnum = function () {
        return this.childVo.cnum;
    };
    ChildVoApi.prototype.getChildRandomName = function () {
        var oneName = this.getRandomName();
        while (!this.checkChildName(oneName)) {
            oneName = this.getRandomName();
        }
        return oneName;
    };
    ChildVoApi.prototype.checkChildName = function (n) {
        var childList = this.getChildrenVoList();
        for (var index = 0; index < childList.length; index++) {
            var childVo = childList[index];
            if (childVo.name == n) {
                return false;
            }
        }
        return true;
    };
    ChildVoApi.prototype.getRandomName = function () {
        var randomName = "";
        if (!(PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang())) {
            randomName = Api.playerVoApi.getPlayerName().substring(0, 1);
        }
        randomName += Config.NamesCfg.getRandomSecondName();
        return randomName;
    };
    ChildVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ChildVoApi;
}(BaseVoApi));
__reflect(ChildVoApi.prototype, "ChildVoApi");
//# sourceMappingURL=ChildVoApi.js.map