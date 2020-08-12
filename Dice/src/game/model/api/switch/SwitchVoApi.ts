namespace Api
{
    export namespace SwitchVoApi
    {
        let allSwitch:{[key:string]:number} = null;
        export function formatData(data:any):void
        {
           if(data){
                allSwitch = data;
           } 
        }

        export function getSwitchStatus(id:string){
            let status = allSwitch[id];
            return status && status == 1;
        }

        export function getADSwitchStatus(){
            let status = allSwitch["openAdvertise"];
            return status && status == 1;
        }

        export function getFairarenStatus(){
            let status = allSwitch["openFairArena"];
            return status && status == 1;
        }

        /**
         * 检查是否开启每日签到
         */
        export function checkOpenSign() {
            let status = allSwitch["openSign"];
            return status && status == 1;
        }

        /**
         * 检查是否开启首冲
         */
        export function checkOpenFirstRecharge():boolean {
            let status = allSwitch["openFirstRecharge"];
            return GameData.isWxShenhe?false:status && status == 1;
        }

        /**
         * 检查是否开启邀请好友
         */
        export function checkOpenInviteFriend() {
            let status = allSwitch["openInviteFriend"];
            return status && status == 1;
        }

        /**
         * 是否开成就
         */
        export function checkAchievement(){
            let status = allSwitch["openAchievement"];
            return status && status == 1;
        }

        export function checkWxShenhe():boolean
        {
            return GameData.isWxShenhe;
        }
        
        export function dispose():void
        {
            allSwitch = null;
        }
        
    }
}