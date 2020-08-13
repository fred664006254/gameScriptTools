namespace Config
{
    // 邀请有礼配置
	export namespace Invitefriend2Cfg {
        // 被邀请的人，绑定后获得奖励
        export let bindReward:string='';
        // 邀请任务。
        export let inviteTask:any[]=[];
        // 势力任务
        export let powerTask:any[]=[];
		export function formatData(data:any):void{
			this.bindReward = data.bindReward;

			for(let key in data.inviteTask){
				let itemCfg:InviteTaskCfg;
				let id = Number(key) + 1;
				if(!this.inviteTask.hasOwnProperty(String(key))){
					this.inviteTask[String(key)]=new InviteTaskCfg();
				}
				itemCfg=this.inviteTask[String(key)];
				itemCfg.initData(data.inviteTask[key]);
				itemCfg.id=id;
			}

			for(let key in data.powerTask){
				let itemCfg:InvitePowerTaskCfg;
				let id = Number(key) + 1;
				if(!this.powerTask.hasOwnProperty(String(key))){
					this.powerTask[String(key)]=new InvitePowerTaskCfg();
				}
				itemCfg=this.powerTask[String(key)];
				itemCfg.initData(data.powerTask[key]);
				itemCfg.id=id;
			}

		}
	}
	
	export class InviteTaskCfg extends BaseItemCfg{
        public id:number;
        /**
         * --value:进度：人数
         */
        public value:number;
        /**
         *     --getReward:奖励
         */
        public getReward:string;
	}
	
	export class InvitePowerTaskCfg extends BaseItemCfg{
        public id:number;
        /**
         * needPower:所需权势值
         */
		public needPower:number;
		  /**
         * --value:进度：人数
         */
        public value:number;
        /**
         *     --getReward:奖励
         */
        public getReward:string;
    }
}