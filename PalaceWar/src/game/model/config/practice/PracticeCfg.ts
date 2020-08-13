namespace Config {

    export namespace PracticeCfg
	{	
        let list: {[key:string]:PracticeItemCfg} = {};

        export function formatData(data: any): void {
			for (var key in data) {
				let itemCfg: PracticeItemCfg;
				if (!list.hasOwnProperty(String(key))) {
					list[String(key)] = new PracticeItemCfg();
				}
				itemCfg = list[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id = String(key);
			}
		}
		/**
		 * 通过职位获取单个权限配置
		 * @param id 权限id
		 */
		export function getPracticeListByType(type: number)
		 {
			 let result = [];
			 for (var key in list) {
				 if (list[key].type == type) {
					 result.push(list[key]);
				 }
			 }
			 result.sort((itemA:PracticeItemCfg,itemB:PracticeItemCfg)=>{
				return itemA.sortId - itemB.sortId;
			 });
			return result;
		}
		
		export function getPracticeShowListByType(type: number)
		 {
			let result1 = [];
			let result2 = [];
			let result3 = [];
			 for (var key in list) {
				 let tmpData:PracticeItemCfg = list[key]
				 if (tmpData.type == type)
				 {
					 //是否被屏蔽
					 if(tmpData.wifeId && Config.WifeCfg.checkIsLockedByGM(tmpData.wifeId)){
						 continue;
					 }
					 if(tmpData.servantId && Config.ServantCfg.checkIsLockedByGM(tmpData.servantId)){
						 continue;
					 }
					let taskVo = Api.practiceVoApi.getPracticeTaskInfo(key);
					if(taskVo && taskVo.f == 0)
					{
						result1.push(tmpData)
					}else
					{
						result2.push(tmpData)
					}
				 }
			 }
			 result1.sort((itemA:PracticeItemCfg,itemB:PracticeItemCfg)=>{
				return itemA.sortId - itemB.sortId;
			 });
			 result2.sort((itemA:PracticeItemCfg,itemB:PracticeItemCfg)=>{
				return itemA.sortId - itemB.sortId;
			 });
			return result1.concat(result2).concat(result3);
		}

		export function getPracticeListById(id: string)
		{
			return list[id]
		}
    }

    export class PracticeItemCfg extends BaseItemCfg {
        public id: string;
        /**
		 * 声望id
		 */
		public type: number;
		/**
		 * 达到这个进度所需要的名望
		 */
		public sortId: number;

        public wifeId: string;
        public servantId: string;
		
		/**
		 * 是否具备称帝资格竞拍的资格  1：可参与竞拍  0：不可参与
		 */
		private conditionList:{string:{conditionType:number,needNum:number,effect:number}};

		public getConditionList():any
		{	
			if (this.conditionList["1"] && this.conditionList["1"].conditionType == 1 && !Api.switchVoApi.checkOpenServantLevel450())
			{
				let conditionList2 = {};
				let keys = Object.keys(this.conditionList);
				for (let index = 0; index < keys.length; index++) {
					let key = keys[index];
					let tmpCon = this.conditionList[key];

					if (tmpCon.needNum <= Config.ServantBaseCfg.commonMaxLv())
					{
						conditionList2[key] = tmpCon;
					}
				}
				return conditionList2;
			}
			return this.conditionList;
		}
    }
}


