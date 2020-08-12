namespace Api
{
    export namespace AchievementVoApi
    {
        let achievements: AchievementVo = null;
        
        /**领取奖励的类型 */
        export let rewardType:number = 0;
        export function formatData(data:any):void
        {
            if(!achievements){
                achievements = new AchievementVo();
            }
            achievements.initData(data);
        }

        /**获取成就列表数组，经过排序 */
        export function getAchList(){
            let canrew = [];
            let cannot = [];
            let finish = [];
            
            let keys = Object.keys(achievements.info);
            for (let index = 0; index < keys.length; index++) {
                let item = keys[index];
                let achitem = achievements.info[item];
                if(achitem.f == 1){
                    canrew.push(item);
                } else if (achitem.f == 2){
                    finish.push(item);
                } else {
                    cannot.push(item);
                }
            }
            return [].concat(canrew,cannot,finish);
        }

        /**获取可以领取的数量 */
        export function getAchCanRewardNum(){
            let num = 0;
            if(!Api.SwitchVoApi.checkAchievement()){
                return 0;
            }
            for (const key in achievements.info) {
                if (achievements.info.hasOwnProperty(key)) {
                    const element = achievements.info[key];
                    if(element.f === 1){
                        num++;
                    }
                }
            }

            return num;
        }

        export function getAchinfoByID(id:number|string) {
            let achinfo = achievements.info[id];
            return achinfo;             
        }

        /**获取某个成就阶段 */
        export function getStageByID(id:number|string) {
            let achinfo = achievements.info[id];
            let stage = 0;
            if(achinfo && achinfo.stage){
                stage = achinfo.stage;
            }
            return stage;  
        }
        
        export function dispose():void
        {
            achievements = null;
            rewardType = 0;
        }
    }
}