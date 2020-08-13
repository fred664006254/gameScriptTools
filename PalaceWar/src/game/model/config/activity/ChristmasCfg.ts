namespace Config {
	export namespace AcCfg {
		export class ChristmasCfg {
			/**展示时间 */
			public extraTime: number;
			public ratio: number
			public cost: Object;
			public cost2: number;
			public discount: number;
			public firstFloor: Object;
			public secondFloor: Object;
			public thirdFloor: Object;
			public finalFloor: Object;
			public infinityFloor: Object;
			public taskItemListCfg: ChristmasTaskItemCfg[] = [];
			public skin:number;
            /**
             * 初始化数据
             */
			public formatData(data: any): void {
				this.taskItemListCfg.length = 0;
				for (var key in data) {
					this[key] = data[key];
					if (key == "allTask") {

						for (let index in data[key]) {
							let itemCfg: ChristmasTaskItemCfg = new ChristmasTaskItemCfg();
							itemCfg.initData(data[key][index]);
							itemCfg.id = String(Number(index) + 1);
							this.taskItemListCfg.push(itemCfg);
						}
					}
				}
			}
			/**消耗星星的数量 */
			public getFloorStarNum(type: string): number {
				switch (type) {
					case "1":
						return Object.keys(this.firstFloor).length;
					case "2":
						return Object.keys(this.secondFloor).length;
					case "3":
						return Object.keys(this.thirdFloor).length;
				}
				return 0;
			}
			/** 层数的cost */
			public getFloorCost(type: string): number {
				switch (type) {
					case "1":
						return this.cost[0];
					case "2":
						return this.cost[1];
					case "3":
						return this.cost[2];
					case "4":
						return this.cost2;
				}
				return 0;
			}
			/**
			 * 每层发光的奖励
			 */
			public getLightFloorRewardList(type: string): { id:string,reward: string, weight: number, isLight: boolean }[] {
				let floorRewardList = this.getFloorRewardList(type);
				let lightFloorRewardList: { id:string,reward: string, weight: number, isLight: boolean }[] = [];
				for (let key in floorRewardList) {
					if (floorRewardList[key].isLight) {
						lightFloorRewardList.push(floorRewardList[key]);
					}
				}
				return lightFloorRewardList;
			}
			/**
			 * 每层的奖励
			 */
			public getFloorRewardList(type: string): {  id:string,reward: string, weight: number, isLight: boolean }[] {
				switch (type) {
					case "1":
						return this.initFloorReward(this.firstFloor);
					case "2":
						return this.initFloorReward(this.secondFloor);
					case "3":
						return this.initFloorReward(this.thirdFloor);
					case "4":
						return this.initFloorReward(this.finalFloor);
				}
				return null;
			}
			/**
			 * 每层的奖励
			 */
			public getFloorRewardPoolList(type: string): {  id:string,reward: string, weight: number, isLight: boolean }[] {
				switch (type) {
					case "1":
						return this.initFloorReward(this.firstFloor);
					case "2":
						return this.initFloorReward(this.secondFloor);
					case "3":
						return this.initFloorReward(this.thirdFloor);
					case "4":
						return this.initFloorReward(this.infinityFloor);
				}
				return null;
			}
			/**
			 * 第一层奖励
			 */
			private initFloorReward(flool: Object): { id:string,reward: string, weight: number, isLight: boolean }[] {
				let floorRewardList: {id:string, reward: string, weight: number, isLight: boolean }[] = [];
				for (let key in flool) {
					let isLight = flool[key][2] == 1 ? true : false;
					let floorReward: {id:string, reward: string, weight: number, isLight: boolean } = {id:String(Number(key)+1), reward: flool[key][0], weight: flool[key][1], isLight: isLight };
					floorRewardList.push(floorReward);
				}
				return floorRewardList;
			}
			/**
			 * 任务的cfg
			 */
			public getTaskCfg(): ChristmasTaskItemCfg[] {
				return this.taskItemListCfg;
			}
			/**
			 * 任务的Id cfg
			 */
			public getTaksCfgId(taskId: string): ChristmasTaskItemCfg {
				for (let key in this.taskItemListCfg) {
					if (this.taskItemListCfg[key].id == taskId) {
						return this.taskItemListCfg[key];
					}
				}
				return null;
			}
		}
		export class ChristmasTaskItemCfg extends BaseItemCfg {
			/** id */
			public id: string = null;
			/** 跳转 */
			public openType: string = null;
			/** 任务类型 */
			public questType: string = null;
			/** 进度 */
			public value: number = 0;
			/** 奖励装饰物 X 个 */
			public specialReward: number = 0;
			/** 奖励 */
			public getReward5: string = null;
			/**排序id */
			public sortId: number = null;

		}

	}

}
