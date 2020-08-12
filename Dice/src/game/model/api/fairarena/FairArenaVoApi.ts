/**
 * 商店voapi
 * author:qianjun
 */
namespace Api{
    export namespace FairArenaVoApi{
        let fairarenaVo:FairArenaVo;
        let freshFairarena: boolean = true;
        export let tweenPro:boolean = false;
        /**记录上一次打开的活动界面 */
        export let sceneName:string = "active";

		export function formatData(data:any):void{
			if(!fairarenaVo){
				fairarenaVo = new FairArenaVo();
			}
			fairarenaVo.initData(data);
        }
        
		export function dispose():void{
			if(fairarenaVo){
				fairarenaVo.dispose();
				fairarenaVo=null;
            }
            freshFairarena = true;
            sceneName = "active";
        }
        // 设置刷新开关
        export function setFreshFair(value:boolean){
            if(value == freshFairarena){
                return
            } 
            freshFairarena = value;
            if(freshFairarena){
                App.MsgHelper.dispEvt(MsgConst.MODEL_FAIRARENA);
            }
        }

        export function getFreshFair(){
            return freshFairarena;
        }

        //是否开启了jjc
        export function isJoinJJC():boolean{
            let flag = false;
            if(fairarenaVo && fairarenaVo.status == 2){
				flag = true;
            }
            return flag;//flag;
        }

        //获取胜利场次
        export function getWinNum():number{
            let num = 0;
            if(fairarenaVo && fairarenaVo.winNum){
                num = fairarenaVo.winNum;
            }
            return num;
        }

        //获取失败场次
        export function getLoseNum():number{
            let num = 0;
            if(fairarenaVo && fairarenaVo.loseNum){
				num = fairarenaVo.loseNum;
            }
            return num;
        }
        /**
         * 返回选择队列
         */
        export function getLine() {
            let line = [];
            if(fairarenaVo && fairarenaVo.line){
                line = fairarenaVo.line;
                for(let idx = 0; idx < line.length; idx++){
                    line[idx]["showLevel"] = 2;
                }
            }

            return line;
        }

        export function getFairModle() {
            return fairarenaVo;
        }

        /**
         * index 从 1 开始
         * @param index 
         */
        export function getDicePoolInfo(index:number) {
            let poolinfo = {};
            if(fairarenaVo && fairarenaVo.pool){
                poolinfo = fairarenaVo.pool[index];
            }
            return poolinfo
        }

        export function getCurDicePool() {
            if(!fairarenaVo) return null;

            let num =Math.min(fairarenaVo.line.length, 4);
            return getDicePoolInfo(num+1)["list"];
        }

        /**
         * 判断是否有还未领取的奖励
         */
        export function getHasReward():boolean{
            let flag = false;
            if(fairarenaVo){
                let winnum = fairarenaVo.winNum;
                let reward = fairarenaVo.rewards;
                let keys = Object.keys(reward);
                if(winnum > 0 && winnum > keys.length){
                    flag = true;
                }
            }
            return flag;
        }

        /**
         * 返回 item 的状态
         * 1 已经领取
         * 2 未领取
         * 3 不可领取
         */
        export function getRewardStatusByID(id:number) {
            if(!fairarenaVo){
                return 3;
            }
            if(!fairarenaVo.rewards){
                return 3;
            }
            if(id > fairarenaVo.winNum){
                return 3;
            }
            if (!fairarenaVo.rewards[id]){
                return 2;
            }
            if (fairarenaVo.rewards[id] == 1){
                return 1;
            }
        }

        export function getFirstReward():number{
            let idx = 0;
            let winnum = fairarenaVo.winNum;
            if(winnum > 0){
                let rewards = fairarenaVo.rewards;
                for(let index = 1; index <= winnum; index++){
                    if(!(rewards[index] && rewards[index] == 1)){
                        idx = index;
                        break;
                    }
                }
            }
            return idx;
        }
    }
}