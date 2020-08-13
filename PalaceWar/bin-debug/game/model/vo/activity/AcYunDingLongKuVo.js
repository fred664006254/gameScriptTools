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
 * 云顶龙窟VO
 */
var AcYunDingLongKuVo = (function (_super) {
    __extends(AcYunDingLongKuVo, _super);
    function AcYunDingLongKuVo() {
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.flag = 0;
        return _this;
    }
    AcYunDingLongKuVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**活动npc的ID */
    AcYunDingLongKuVo.prototype.getNpcId = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var box = cfg.battleItemCfgList;
        for (var i = 0; i < box.length; i++) {
            if (this.score < box[i].killPoint) {
                return box[i].id;
            }
        }
        return null;
    };
    /**分数 */
    AcYunDingLongKuVo.prototype.getScore = function () {
        return this.score;
    };
    /** 是否第一次进游戏 */
    AcYunDingLongKuVo.prototype.isFriestLogin = function () {
        if (this.flag.init) {
            return false;
        }
        return true;
    };
    /**宝箱领取状态 */
    AcYunDingLongKuVo.prototype.getBoxFlag = function (boxId) {
        if (this.flag[boxId]) {
            return true;
        }
        return false;
    };
    /**NpcBM */
    AcYunDingLongKuVo.prototype.getNpcBM = function (id) {
        switch (id) {
            case "1":
                return "searchnpc_full32";
            case "2":
                return "searchnpc_full82";
            case "3":
                return "searchnpc_full92";
            case "4":
                return "story_npc_9";
            case "5":
                return "wife_full_220";
        }
    };
    /**npcName */
    AcYunDingLongKuVo.prototype.getNpcName = function (id) {
        switch (id) {
            case "1":
                if (this.code == 1) {
                    return LanguageManager.getlocal("acMarryViewNpcName1");
                }
                return LanguageManager.getlocal("acMarryViewNpcName1-" + this.code);
            case "2":
                if (this.code == 1) {
                    return LanguageManager.getlocal("acMarryViewNpcName2");
                }
                return LanguageManager.getlocal("acMarryViewNpcName2-" + this.code);
            case "3":
                if (this.code == 1) {
                    return LanguageManager.getlocal("acMarryViewNpcName3");
                }
                return LanguageManager.getlocal("acMarryViewNpcName3-" + this.code);
            case "4":
                if (this.code == 1) {
                    return LanguageManager.getlocal("acMarryViewNpcName4");
                }
                return LanguageManager.getlocal("acMarryViewNpcName4-" + this.code);
            case "5":
                return LanguageManager.getlocal("wifeName_220");
        }
    };
    Object.defineProperty(AcYunDingLongKuVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            if (this.isStart == false) {
                return false;
            }
            return this.isHaveBoxDot();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 宝箱的红点
     */
    AcYunDingLongKuVo.prototype.isHaveBoxDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.battleItemCfgList.length; i++) {
            if (this.getScore() >= cfg.battleItemCfgList[i].killPoint) {
                if (!this.getBoxFlag(cfg.battleItemCfgList[i].id)) {
                    return true;
                }
            }
        }
        return false;
    };
    AcYunDingLongKuVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcYunDingLongKuVo;
}(AcBaseVo));
__reflect(AcYunDingLongKuVo.prototype, "AcYunDingLongKuVo");
//# sourceMappingURL=AcYunDingLongKuVo.js.map