var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var celeBrateList = [];
        var SpringCelebrateCfg = (function () {
            function SpringCelebrateCfg() {
                this.itemListCfg = {};
                this.itemListCfg2 = [];
            }
            SpringCelebrateCfg.prototype.formatData = function (data) {
                celeBrateList = [];
                for (var key in data) {
                    data[key].key = String(key);
                    celeBrateList.push(data[key]);
                    this.itemListCfg2.push(data[key]);
                }
            };
            SpringCelebrateCfg.prototype.getItemListCfg2 = function () {
                return this.itemListCfg2;
            };
            return SpringCelebrateCfg;
        }());
        AcCfg.SpringCelebrateCfg = SpringCelebrateCfg;
        __reflect(SpringCelebrateCfg.prototype, "Config.AcCfg.SpringCelebrateCfg");
        //    1recharge  2exchange   3 task    4 shop
        // export function getShopItemCfgById(key:string): Array<any> 
        // {
        // 	let arr:Array<any> =[];
        // 	for(var i:number=0;i< celeBrateList.length;i++)
        // 	{
        // 		if(celeBrateList[i].key == key)
        // 		{	
        // 			for(var key2 in celeBrateList[i])
        // 			{	
        // 				if(celeBrateList[i][key2])
        // 				{
        // 					var currObj =  celeBrateList[i][key2]
        // 					if(currObj.needGem||currObj.questType||currObj.discount||currObj.limit)
        // 					{
        // 						celeBrateList[i][key2].key = Number(key2)+1;
        // 						if(celeBrateList[i][key2].key)
        // 						{
        // 							arr.push(celeBrateList[i][key2]); 
        // 						}
        // 					} 
        // 				} 
        // 			} 
        // 		}
        // 	}
        // 	return arr;  
        // }  
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
