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
 * author yanyuling
 */
var AcStargazerVo = (function (_super) {
    __extends(AcStargazerVo, _super);
    // public tennum:number;//" "搜查奸臣 玩家十连次数",
    // public attacknum:number;//""搜查奸臣 玩家剩余可搜索次数",
    // public singlenum:number;//""搜查奸臣 玩家单抽次数",
    // public singlechipnum:number;//""搜查奸臣 玩家单抽获得证物数",
    // public chipnum:number;//"搜查奸臣 得到证物数",
    function AcStargazerVo() {
        return _super.call(this) || this;
    }
    AcStargazerVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.v = data.v;
        this.ackinfo = data.ackinfo;
        this.anum = data.anum;
        this.cannum = data.cannum;
        this.showflag = data.showflag;
        // this.tennum = data.tennum;
        // this.attacknum = data.attacknum;
        // this.singlenum = data.singlenum;
        // this.singlechipnum = data.singlechipnum;
        // this.chipnum = data.chipnum;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STARGAZER_REFRESH);
    };
    AcStargazerVo.prototype.isFineAllByIndex = function (index) {
        var allNum = this.config.RansackItemNum;
        var itemList = this.config.RansackItemID;
        // for(let i = 0;i < itemList.length;i++){
        if (this.getItemNumByIndex(itemList[index]) < allNum) {
            return false;
        }
        return true;
        // }
        // return true;
        // return this.chipnum >= allNum ;
    };
    AcStargazerVo.prototype.isFineAll = function () {
        var allNum = this.config.RansackItemNum;
        var itemList = this.config.RansackItemID;
        for (var i = 0; i < itemList.length; i++) {
            if (this.getItemNumByIndex(itemList[i]) < allNum) {
                return false;
            }
        }
        return true;
        // return this.chipnum >= allNum ;
    };
    Object.defineProperty(AcStargazerVo.prototype, "isShowRedDot", {
        get: function () {
            // if(!this.checkSearchAll()){
            // 	return true;
            // } 
            if (this.isExchangeEnable()) {
                return true;
            }
            if (this.cannum > 0 && !this.checkSearchAll()) {
                return true;
            }
            // 		if(this.cannum > 0 && !this.isFineAll()){
            // 	return true;
            // }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcStargazerVo.prototype, "isShowIcon", {
        get: function () {
            return this.showflag > 0;
            // return true;
        },
        enumerable: true,
        configurable: true
    });
    AcStargazerVo.prototype.getItemNumByIndex = function (itemId) {
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
        return itemNum;
    };
    //检测是否可以兑换
    AcStargazerVo.prototype.checkCanExchangeByIndex = function (index) {
        var shopCfgList = this.config.exchangeShop;
        var itemNum = this.getItemNumByIndex(shopCfgList[index]["itemID"]);
        var proofNum = shopCfgList[index]["proofNum"];
        var skinID = shopCfgList[index]["skinID"];
        if (itemNum >= proofNum && !Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))) {
            return true;
        }
        return false;
    };
    //获得最近的可兑换Index 如果没有，按顺序
    AcStargazerVo.prototype.canExchangeIndex = function () {
        var shopCfgList = this.config.exchangeShop;
        //默认
        var normalIndex = -1;
        for (var i = 0; i < shopCfgList.length; i++) {
            var itemNum = this.getItemNumByIndex(shopCfgList[i]["itemID"]);
            var proofNum = shopCfgList[i]["proofNum"];
            var skinID = shopCfgList[i]["skinID"];
            if (itemNum >= proofNum && !Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))) {
                return i;
            }
            else if (itemNum < proofNum && !Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))) {
                if (normalIndex == -1) {
                    normalIndex = i;
                }
            }
        }
        if (normalIndex == -1) {
            return 0;
        }
        else {
            return normalIndex;
        }
    };
    //搜索出所有的 没有这个皮肤的道具 
    AcStargazerVo.prototype.checkSearchAll = function () {
        var shopCfgList = this.config.exchangeShop;
        //默认
        // let isSearch = false;
        for (var i = 0; i < shopCfgList.length; i++) {
            var itemNum = this.getItemNumByIndex(shopCfgList[i]["itemID"]);
            var proofNum = shopCfgList[i]["proofNum"];
            var skinID = shopCfgList[i]["skinID"];
            if (!Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))) {
                if (itemNum < proofNum) {
                    return false;
                }
            }
        }
        return true;
    };
    AcStargazerVo.prototype.isExchangeEnable = function () {
        var shopCfgList = this.config.exchangeShop;
        for (var i = 0; i < shopCfgList.length; i++) {
            var itemNum = this.getItemNumByIndex(shopCfgList[i]["itemID"]);
            var proofNum = shopCfgList[i]["proofNum"];
            var skinID = shopCfgList[i]["skinID"];
            if (itemNum >= proofNum && !Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))) {
                return true;
            }
        }
        return false;
    };
    AcStargazerVo.prototype.dispose = function () {
        this.v = 0;
        this.ackinfo = null;
        this.anum = 0;
        this.cannum = 0;
        this.showflag = 0;
        _super.prototype.dispose.call(this);
    };
    return AcStargazerVo;
}(AcBaseVo));
__reflect(AcStargazerVo.prototype, "AcStargazerVo");
