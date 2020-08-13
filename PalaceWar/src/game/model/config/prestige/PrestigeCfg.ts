
namespace Config {

    export namespace PrestigeCfg
	{	
        let itemList = [];

        export function formatData(data: any): void {
			// for (var key in data) {
			for (var index = 0; index <  data.length; index++) {
				let itemCfg: PrestigeItemCfg;
				if (!itemList[index]) {
					itemCfg = new PrestigeItemCfg();
					itemList.push(itemCfg );
				}
				itemCfg = itemList[index];
				itemCfg.initData(data[index]);
				itemCfg.id = String(index+1);
			}
		}
		/**
		 * 通过职位获取单个权限配置
		 * @param id 权限id
		 */
		export function getPrestigeCfgById(id: number|string): PrestigeItemCfg {
			return itemList[Number(id)];
		}

		export function getPrestigeCfg(){
			return itemList;
		}
		export function getMax()
		{
			return itemList.length;
		}
    }

    export class PrestigeItemCfg extends BaseItemCfg {
        /**
		 * 声望id
		 */
		public id: string;
		/**
		 * 达到这个进度所需要的名望
		 */
		public prestige: number;
		/**
		 * 是否具备称帝资格竞拍的资格  1：可参与竞拍  0：不可参与
		 */
		public canEmperor: number=0;
        /**
		 * 达到进度的奖励
		 */
		public getReward: string;
		public position:number[];
		//  {x:number,y:number};
		public addType:number[];
		public effect: number = 0;
		public isSpecial:number = 0;
    }
}


