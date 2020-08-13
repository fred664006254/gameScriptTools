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
 * author jiangliuyang
 */
var AcStargazerSingleVo = (function (_super) {
    __extends(AcStargazerSingleVo, _super);
    function AcStargazerSingleVo() {
        return _super.call(this) || this;
    }
    AcStargazerSingleVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.v = data.v;
        this.tennum = data.tennum;
        this.attacknum = data.attacknum;
        this.singlenum = data.singlenum;
        this.singlechipnum = data.singlechipnum;
        this.chipnum = data.chipnum;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STARGAZERSINGLEVO_REFRESH);
    };
    AcStargazerSingleVo.prototype.isFineAll = function () {
        var allNum = this.config.RansackItemNum;
        var itemNum = this.getItemNumByIndex(this.config.RansackItemID);
        return this.chipnum >= allNum;
    };
    Object.defineProperty(AcStargazerSingleVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.isExchangeEnable()) {
                return true;
            }
            if (this.attacknum > 0 && !this.isFineAll()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    // public checkSearchAll(){
    // 	let shopCfgList:any[] = this.config.exchangeShop;
    // 	//默认
    // 	// let isSearch = false;
    // 	for(let i = 0;i < shopCfgList.length; i++){
    // 		let itemNum:number = this.getItemNumByIndex(shopCfgList[i]["itemID"]);
    // 		let proofNum:number = shopCfgList[i]["proofNum"];
    // 		let skinID:number = shopCfgList[i]["skinID"];
    // 		if(!Api.servantVoApi.isOwnSkinOfSkinId(String(skinID))){
    // 			if(itemNum < proofNum ){
    // 				return false;
    // 			} 
    // 		}
    // 	}
    // 	return true;
    // }
    AcStargazerSingleVo.prototype.getItemNumByIndex = function (itemId) {
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
        return itemNum;
    };
    AcStargazerSingleVo.prototype.isExchangeEnable = function () {
        return this.isFineAll() && !Api.servantVoApi.isOwnSkinOfSkinId(this.config.getRewardSkinId());
    };
    AcStargazerSingleVo.prototype.dispose = function () {
        this.v = 0;
        this.tennum = 0;
        this.attacknum = 0;
        this.singlenum = 0;
        this.singlechipnum = 0;
        this.chipnum = 0;
        _super.prototype.dispose.call(this);
    };
    return AcStargazerSingleVo;
}(AcBaseVo));
__reflect(AcStargazerSingleVo.prototype, "AcStargazerSingleVo");
