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
var SearchBuildInfoItemVo = (function (_super) {
    __extends(SearchBuildInfoItemVo, _super);
    function SearchBuildInfoItemVo() {
        var _this = _super.call(this) || this;
        /**
         * 解锁条件  条件会有VIP等级，势力值，关注官微等特殊条件  解锁寻访
         */
        _this.unlock = {};
        return _this;
    }
    SearchBuildInfoItemVo.prototype.initData = function (personId) {
        var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(personId);
        this.build = itemCfg.build;
        this.type = itemCfg.type;
        this.wifeId = itemCfg.wifeId;
        if (itemCfg.unlock) {
            if (!isNaN(itemCfg.unlock.needVip)) {
                this.unlock.needVip = itemCfg.unlock.needVip;
            }
            if (!isNaN(itemCfg.unlock.needPower)) {
                this.unlock.needPower = itemCfg.unlock.needPower;
            }
            if (!isNaN(itemCfg.unlock.needPower)) {
                this.unlock.needPower = itemCfg.unlock.needPower;
            }
            if (!isNaN(itemCfg.unlock.needQQ)) {
                this.unlock.needQQ = itemCfg.unlock.needQQ;
            }
            if (!isNaN(itemCfg.unlock.needActive)) {
                this.unlock.needActive = itemCfg.unlock.needActive;
            }
            if (!isNaN(itemCfg.unlock.needSignUp)) {
                this.unlock.signUp = itemCfg.unlock.needSignUp;
            }
        }
        this.maxValue = itemCfg.value;
        this.personId = itemCfg.personId;
    };
    Object.defineProperty(SearchBuildInfoItemVo.prototype, "value", {
        get: function () {
            return Api.searchVoApi.getWifeValueById(this.personId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBuildInfoItemVo.prototype, "eventDesc", {
        get: function () {
            var localStr = "";
            if (this.type == 1) {
                return localStr;
            }
            if (this.isUnlock) {
                var isOwned = false;
                if (this.wifeId) {
                    if (Api.wifeVoApi.getWifeInfoVoById(Number(this.wifeId))) {
                        isOwned = true;
                    }
                }
                if (this.unlock.needVip && Api.playerVoApi.getPlayerVipLevel() >= this.unlock.needVip && isOwned == false) {
                    localStr = LanguageManager.getlocal("searchLockVipDesc", [String(this.unlock.needVip)]);
                }
                else if (isOwned == false) {
                    if (this.unlock.needQQ == 1) {
                        localStr = LanguageManager.getlocal("searchLockQQ");
                    }
                    else {
                        localStr = LanguageManager.getlocal("searchEventDesc");
                    }
                }
                else {
                    localStr = LanguageManager.getlocal("searchAlreadyMarried"); //已经迎娶
                }
            }
            else {
                if (this.unlock.needVip) {
                    if (Api.playerVoApi.getPlayerVipLevel() < this.unlock.needVip) {
                        localStr = LanguageManager.getlocal("searchLockVipDesc", [String(this.unlock.needVip)]);
                    }
                }
                else if (this.unlock.needPower) {
                    if (Api.playerVoApi.getPlayerPower() < this.unlock.needPower) {
                        localStr = LanguageManager.getlocal("searchLockPowerDesc", [String(this.unlock.needPower)]);
                    }
                }
                else if (this.unlock.needActive) {
                    if (!Api.acVoApi.checkActiveIsUnlock(this.unlock.needActive)) {
                        localStr = LanguageManager.getlocal("searchLockActiveDesc");
                    }
                }
                else if (this.unlock.signUp) {
                    if (!Api.arrivalVoApi.isShowed500Rewards()) {
                        localStr = LanguageManager.getlocal("searchLockSignUpDesc", [String(this.unlock.signUp)]);
                    }
                }
            }
            return localStr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBuildInfoItemVo.prototype, "isUnlock", {
        get: function () {
            var unlock = false;
            if (this.unlock) {
                var isHasValue = false;
                if (this.unlock.needVip) {
                    isHasValue = true;
                    unlock = Api.playerVoApi.getPlayerVipLevel() >= this.unlock.needVip;
                }
                if (this.unlock.needPower) {
                    isHasValue = true;
                    unlock = Api.playerVoApi.getPlayerPower() >= this.unlock.needPower;
                }
                if (this.unlock.needActive) {
                    isHasValue = true;
                    if (Api.wifeVoApi.getWifeInfoVoById(Number(this.wifeId))) {
                        unlock = true;
                    }
                    else {
                        unlock = Api.acVoApi.checkActiveIsUnlock(this.unlock.needActive);
                    }
                }
                if (this.unlock.signUp) {
                    isHasValue = true;
                    unlock = Api.arrivalVoApi.isShowed500Rewards();
                }
                if (!isHasValue) {
                    unlock = true;
                }
            }
            else {
                unlock = true;
            }
            return unlock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBuildInfoItemVo.prototype, "isShowProgress", {
        get: function () {
            return isNaN(this.value) == false && this.value > 0;
        },
        enumerable: true,
        configurable: true
    });
    SearchBuildInfoItemVo.prototype.dispose = function () {
    };
    return SearchBuildInfoItemVo;
}(BaseVo));
__reflect(SearchBuildInfoItemVo.prototype, "SearchBuildInfoItemVo");
//# sourceMappingURL=SearchBuildInfoItemVo.js.map