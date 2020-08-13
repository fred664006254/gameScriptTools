namespace Config {
    export namespace AlliancetaskCfg {
        let needLv:number = 0;
		let shortcutLv:number = 0;
		let itemList = {};
        let buffList = {};
		let monthRewardList={};

		export function formatData(data: any): void {
			for (var key in data.itemList) {
				let itemCfg: AllianceTaskItemCfg;
				if (!itemList.hasOwnProperty(String(key))) {
					itemList[String(key)] = new AllianceTaskItemCfg();
				}
				itemCfg = itemList[String(key)];
                itemCfg.id = String(key);
				itemCfg.initData(data.itemList[key]);
			}

			for (var key in data.monthRewardList) {
				let itemCfg: AllianceTaskItemCfg;
				if (!monthRewardList.hasOwnProperty(String(key))) {
					monthRewardList[String(key)] = new AllianceTaskItemCfg();
				}
				itemCfg = monthRewardList[String(key)];
                itemCfg.id = String(key);
				itemCfg.initData(data.monthRewardList[key]);
			}

            for (var key in data.buffList) {
				let itemCfg: AllianceTaskBuffItemCfg;
				if (!buffList.hasOwnProperty(String(key))) {
					buffList[String(key)] = new AllianceTaskBuffItemCfg();
				}
				itemCfg = buffList[String(key)];
                itemCfg.id = String(key);
				itemCfg.initData(data.buffList[key]);
			}
            needLv = data.needLv;
			shortcutLv = data.shortcutLv;
		}

        export function getAllianceTaskNeedLv()
        {
            return needLv;
        }

		export function getAllianceTaskshortcutLv()
        {
            return shortcutLv;
        }

		export function getAllianceTaskIdList() {
			return Object.keys(itemList);
		}

		export function getAllianceMonTaskIdList() {
			return Object.keys(monthRewardList);
		}
        export function getAllianceTaskById(id:string):AllianceTaskItemCfg {
			return itemList[id];
		}
        export function getAllianceMonTTaskById(id:string):AllianceTaskItemCfg {
			return monthRewardList[id];
		}

        export function getAllianceTaskBuffIdList() {
			return Object.keys(buffList) ;
		} 

		export function getAllianceTaskBuffById(id:string):AllianceTaskBuffItemCfg {
			return buffList[id];
		}

	}

	export class AllianceTaskBuffItemCfg extends BaseItemCfg {
        public id:string;
        public type:number[];
		public value:number;
        public maxNum:number;
        public costAsset:number[];
    }

    export class AllianceTaskItemCfg extends BaseItemCfg {
        public id:string;
        public type:number;
        public value_1:number;
        public value_2:number;
        public value_3:number;
        public value_4:number;
        public value_5:number;
        public value_6:number;
        public value_7:number;
        public value_8:number;
        public value_9:number;
        public value_10:number;
        public value_11:number;
        public value_12:number;
        public totalNum:number;
        public completeAsset:number;
        public completeReward:string;
		public costGem:number;  //开启条件_元宝
      	public costAsset:number;//  开启条件_帮会财富
		public get value() {
			return this["value_" + (App.DateUtil.getServerMonth() + 1)];
		}
    }
    
}