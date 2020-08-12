/**
 * 商店voapi
 * author:qianjun
 */
namespace Api{
    export namespace InviteFriendVoApi{
        let invitefriendVo:InviteFriendVo;

		export function formatData(data:any):void{
			if(!invitefriendVo){
				invitefriendVo = new InviteFriendVo();
			}
			invitefriendVo.initData(data);
        }
        
		export function dispose():void{
			if(invitefriendVo){
				invitefriendVo.dispose();
				invitefriendVo=null;
            }
        }

        export function getMyCode():string{
            return invitefriendVo ? invitefriendVo.code : ``;
        }

        export function getMyScore():number{
            return invitefriendVo ? invitefriendVo.score : 0;
        }

        export function getIsFinishBind():boolean{
            let flag = false;
            if(invitefriendVo && invitefriendVo.iuid){
                flag = invitefriendVo.iuid > 0;
            }
            return flag;
        }

        export function checkRedPoint():boolean{
			let flag = false;
			if(canGetInviteReward()){
				flag = true;
			}
			return flag;
        }
        
        export function canGetInviteReward(id : number = 0):boolean{
            let flag = false;
            let score = getMyScore();
            if(id){
                let unit = Config.InvitefriendCfg.getInviteRewardItemById(id);
                if(unit && unit.needPoint <= score && !isGetReward(id)){
                    flag = true;
                }
            }
            else{
                let len = Config.InvitefriendCfg.getRewardMaxNum();
                for(let i = 1; i <= len; ++ i){
                    let unit = Config.InvitefriendCfg.getInviteRewardItemById(i);
                    if(unit && unit.needPoint <= score && !isGetReward(i)){
                        flag = true;
                        break;
                    }
                }
            }
            
            return flag;
        }

        export function getCurJinduId():number{
            let len = Config.InvitefriendCfg.getRewardMaxNum();
            let score = getMyScore();
            let id = 0;
            for(let i = 1; i <= len; ++ i){
                let unit = Config.InvitefriendCfg.getInviteRewardItemById(i);
                if(unit && unit.needPoint <= score){
                    id = i;
                }
            }
            return id;
        }

        export function isGetReward(id:number):boolean{
			let flag = false;
			if(invitefriendVo && invitefriendVo.rinfo[id]){
				flag = invitefriendVo.rinfo[id] == 1;
			}
			return flag;
        }
    }
}