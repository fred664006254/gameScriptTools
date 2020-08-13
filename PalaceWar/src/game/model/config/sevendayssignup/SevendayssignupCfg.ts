namespace Config {
	/**
	 * 七天好礼
	 */
    export namespace SevendayssignupCfg {

        export let firstDayNeedTime: number=3600;
        export let firstDay: string='8_1033_1|2_1_100000|4_1_1000000';
        export let signUpItemCfgList: SignUpItemCfg[] = [];
        export let signUp3ItemCfgList:Object = {};
        export let taskItemCfgList: { id: string, allTaskItemCfgList: AllTaskItemCfg[] }[] = [];;

        export let picItemCfgList: PicItemCfg[] = [];
        export function formatData(data: any): void {

            if(data.firstDay){
                firstDay = data.firstDay;
                firstDayNeedTime = data.firstDayNeedTime;
            }
            
            for (let i = 0; i < data.signUp.length; i++) {
                let itemcfg = new SignUpItemCfg();
                itemcfg.initData(data.signUp[i]);
                itemcfg.id = String(i + 1);
                signUpItemCfgList.push(itemcfg);
            }

            for (let key in data.allTask) {
                let id = String(Number(key) + 1);
                let allTaskItemCfgList = [];
                for (let i = 0; i < data.allTask[key].length; i++) {
                    let itemcfg = new AllTaskItemCfg();
                    itemcfg.initData(data.allTask[key][i]);
                    itemcfg.id = String(i + 1);
                    allTaskItemCfgList.push(itemcfg);
                }
                taskItemCfgList.push({ id: id, allTaskItemCfgList: allTaskItemCfgList });
            }

            for (let i = 0; i < data.pic.length; i++) {
                let itemcfg = new PicItemCfg();
                itemcfg.initData(data.pic[i]);
                itemcfg.id = String(i + 1);
                picItemCfgList.push(itemcfg);
            }

            for(var key in data.signUp3)
            {
                let itemCfg:SignUp3ItemCfg;
                let id = Number(key) + 1;
                if(!this.signUp3ItemCfgList[id])
                {
                    this.signUp3ItemCfgList[id]=new SignUp3ItemCfg();
                }
                itemCfg=this.signUp3ItemCfgList[id];
                itemCfg.initData(data.signUp3[key]);
                itemCfg.id=id;
            }
        }

        /** 第一个页签 的 某一天*/
        export function getSignUpCfgById(id: string): SignUpItemCfg {
            for (let key in signUpItemCfgList) {
                if (signUpItemCfgList[key].id == id) {
                    if(Number(id) == 1 && PlatformManager.checkIsRuSp()){
                        signUpItemCfgList[key].specialReward = Config.SevendayssignupCfg.firstDay;
                    }
                    if(Number(id) == 1 && Api.sevenDaysSignupLoginVoApi.isEnSp()){
                        signUpItemCfgList[key].specialReward = Config.SevendayssignupCfg.firstDay;
                    }
                    return signUpItemCfgList[key];
                }
            }

        }

        /** 第二个页签 的 某一天 的任务list*/
        export function getTaskCfgById(id: string): AllTaskItemCfg[] {
            for (let key in taskItemCfgList) {
                if (taskItemCfgList[key].id == id) {
                    return taskItemCfgList[key].allTaskItemCfgList;
                }
            }
            return null;

        }
        /** 第三个页签 的 某一天 展示图片以及描述*/
        export function getPicCfgById(id: string): PicItemCfg {
            for (let key in picItemCfgList) {
                if (picItemCfgList[key].id == id) {
                    return picItemCfgList[key];
                }
            }
            return null;

        }

         export function getSignup3CfgById(id: number): SignUp3ItemCfg 
         {
            
             return signUp3ItemCfgList[id];
        }
    }


    /**签到奖励Item */
    export class SignUpItemCfg extends BaseItemCfg {
        /**id */
        public id: string;
        /**奖励 */
        public getReward: string;
        /**奖励 */
        public needVip: string;
        /**奖励 */
        public vipReward: string;
        /**奖励 */
        public specialReward: string;
    }

    /*每日任务Item */
    export class AllTaskItemCfg extends BaseItemCfg {
        /**id */
        public id: string;
        /**跳转 */
        public openType: string;
        /**任务类型  */
        public questType: string;
        /**进度 */
        public value: string;
        /**需要need */
        public need: string;
        /**奖励 */
        public getReward: string;

        public sortId: number;
    }

    /**图片数量Item */
    export class PicItemCfg extends BaseItemCfg {
        /**id */
        public id: string;
        /**图片名字 */
        public pic: any;

    }
    /**每日领取奖励 */
    export class SignUp3ItemCfg extends BaseItemCfg {
        /**id */
        public id: number;
        /**奖励 */
        public getReward: string;

    }
}