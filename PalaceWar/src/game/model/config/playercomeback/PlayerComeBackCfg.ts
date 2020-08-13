namespace Config
{
    // 召回好友配置
	export namespace PlayercomebackCfg {
		//--超过15天未登录，才可接受召回
		export let needDay : number = 0;
		//--且 权势 大于等于 X ，才可接受召回
		export let needPower : number = 0;
        // 召回后获得奖励
        export let backReward:string='';
        //邀请好友回归的玩家，根据召回人数不同，获得不同奖励
		export let comeReward:any[]=[];
		//--3天内才可以填写
		export let limitDay : number = 7;
		export function formatData(data:any):void{
			this.backReward = data.backReward;
			this.needDay = data.needDay;
			this.needPower = data.needPower;

			for(let key in data.comeReward){
				let itemCfg:ComebackTaskCfg;
				let id = Number(key) + 1;
				if(!this.comeReward.hasOwnProperty(String(key))){
					this.comeReward[String(key)]=new ComebackTaskCfg();
				}
				itemCfg=this.comeReward[String(key)];
				itemCfg.initData(data.comeReward[key]);
				itemCfg.id=id;
			}
		}
	}
	
	export class ComebackTaskCfg extends BaseItemCfg{
        public id:number;
        /**
         * --value:进度：人数
         */
        public needGem:number;
        /**
         *     --getReward:奖励
         */
        public getReward:string;
	}
}