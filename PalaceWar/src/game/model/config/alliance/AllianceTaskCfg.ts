namespace Config {
    export namespace AlliancetaskCfg {
        let needLv:number = 0;
		let itemList = {};
        let buffList = {};

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

		}

        export function getAllianceTaskNeedLv()
        {
            return needLv;
        }
		export function getAllianceTaskIdList() {
			return Object.keys(itemList);
		}

        export function getAllianceTaskById(id:string):AllianceTaskItemCfg {
			return itemList[id];
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
        public value:number;
        public totalNum:number;
        public completeAsset:number;
		public completeReward:string;
		public infinite:number;

    }
    
}