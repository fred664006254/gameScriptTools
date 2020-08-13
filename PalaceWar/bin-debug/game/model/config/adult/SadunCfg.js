var Config;
(function (Config) {
    /**
     * 亲家配置类
     * author qianjun
     * date 2017/10/30
     * @class SadunCfg
     */
    var SadunCfg;
    (function (SadunCfg) {
        var itemList = {};
        function formatData(data) {
            for (var k in data) {
                this[k] = data[k];
            }
            // for (var key in data.adultQuality) {
            // 	let itemCfg: AdultItemCfg;
            // 	if (!itemList.hasOwnProperty(String(key))) {
            // 		itemList[String(key)] = new AdultItemCfg();
            // 	}
            // 	itemCfg = itemList[String(key)];
            // 	itemCfg.initData(data.adultQuality[key]);
            // }
            // this.lastTime = data.lastTime;
            // this.freshGem = data.freshGem;
        }
        SadunCfg.formatData = formatData;
        // /**
        //  * 通过子嗣品质获取单个子嗣配置
        //  * @param id 道具id
        //  */
        // export function getItemCfgById(id: number): AdultItemCfg {
        // 	return itemList[String(id)];
        // }
    })(SadunCfg = Config.SadunCfg || (Config.SadunCfg = {}));
    // export class AdultItemCfg extends BaseItemCfg {
    // 	/**
    // 	 * 子嗣成年后身份   1:童生 2:秀才 3:举人 4：进士 5：探花 6：榜眼 7：状元
    // 	 */
    // 	public quality: number;
    // 	/**
    // 	 * needGem：联姻所需元宝
    // 	 */
    // 	public needGem: number;
    // 	/**
    // 	 * 联姻所需的道具   道具和元宝二选一
    // 	 */
    // 	public needItem: string;
    // 	/**
    // 	 * 自己取消提亲返还的元宝数  道具直接返还，元宝返还部分
    // 	 */
    // 	public returnGem: number;
    // }
})(Config || (Config = {}));
//# sourceMappingURL=SadunCfg.js.map