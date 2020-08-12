namespace Config{
	/**
	 * 邀请好友配置类
	 * author qianjun
	 * @class ShopCfg
	 */
	export namespace InvitefriendCfg {
        //使用邀请码可获得
        let useCanGet = ``;
        //可获得的积分最大上限
        let pointMax = 0;
        //邀请达到对应积分可获得奖励
        let inviteReward : Object = {};
        //好友填写邀请码，邀请者可获得 X 积分
        let getPoint1 : number = 0;
        export let getPoint2 : Object = {};
        export let getPoint3 : Object = {};
        export let getPoint4 : Object = {};

		export function formatData(data: any): void {
            useCanGet = data.useCanGet;
            pointMax = data.pointMax;
            getPoint1 = data.getPoint1;
            getPoint2 = data.getPoint2;
            getPoint3 = data.getPoint3;
            getPoint4 = data.getPoint4;

            for(let key in data.inviteReward){
                let itemCfg : InviteRewardItemCfg;
                if(!inviteReward.hasOwnProperty(String(key))){
                    inviteReward[String(key)] = new InviteRewardItemCfg();
                }
                itemCfg = inviteReward[String(key)];
                itemCfg.initData(data.inviteReward[key]);
                itemCfg.id = Number(key);
            }
        }

        export function getUseCanGet():string{
            return useCanGet;
        }

        export function getRewardMaxNum():number{
            return Object.keys(inviteReward).length;
        }

        export function getMaxPoint():number{
            return pointMax;
        }

        export function getInviteRewardItemById(id : number):InviteRewardItemCfg{
            return inviteReward[id];
        }

        export function getInvitePoint1():number{
            return getPoint1;
        }

        export function getInvitePoint(type:number):string{
            let str = "";
            let needKey = ``;
            if(type == 2){
                needKey = `needScore`;
            }
            else if(type == 3){
                needKey = `needGem`;
            } 
            else if(type == 4){
                needKey = `needTimes`;
            } 
            let unit = Config.InvitefriendCfg[`getPoint${type}`];
            let keys = Object.keys(unit);
            for(let i = 0; i < keys.length; ++ i){
                str += `${unit[keys[i]][needKey]}/`;
            }
            str = str.substring(0,str.length-1);
            return str;
        }
	}

	export class InviteRewardItemCfg extends BaseItemCfg {
		/**
		 * id
		 */
		public id: number;
		/**
		 * 所需积分
		 */
		public needPoint: number;
		/**
		 * 奖励
		 */
		public getReward: string;
    }

}