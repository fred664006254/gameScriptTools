namespace Config
{
    export namespace PersoninfoCfg
    {
        /** 家丁雇佣银两 */
        export let goldCost:number;

        /**
         * 家丁信息原始配置
         */
        export let person:{[lv:string]:{levyID: number, exp: number, weight: number[], goldCost: number, gold: number, firstReward: string, rewards: string, unlockServent: number, unlockWife: number}}={};
        
        
        /**
         * 解析后家丁信息配置
         */
        export let personList:{[lv:string]:PersoninfoItemCfg}={};

        /**
         * 最大等级
         */
        let maxLv:number=0;

        /** 
         * 解锁征收的家丁id列表
         */
       export let levyUnlockPersonList:{[levyID:string]:string} = {};

        export function formatData(data:Object):void
        {
            for(let key in data)
            {
                if(data.hasOwnProperty(key))
                {
                    PersoninfoCfg[key]=data[key];
                }
            }
            for(let lv in person)
            {
                let item=new PersoninfoItemCfg();
                item.lv=Number(lv);
                item.initData(person[lv]);
                personList[lv]=item;
                if(Number(lv)>maxLv)
                {
                    maxLv=Number(lv);
                }

                if(person[lv].levyID){
                    levyUnlockPersonList[person[lv].levyID] = lv;
                }
            }
        }

        /**
         * 根据等级获取奖励，如果等级不存则取不到值
         * @param lv 等级
         */
        export function getPersonCfgByLv(lv:number):PersoninfoItemCfg
        {
            return personList[lv];
        }

        /**
         * 根据等级获取名字
         * @param lv 等级
         */
        export function getPersonLocalNameByLv(lv:number):string
        {
            return personList[lv]?personList[lv].getLocalName():"";
        }

        /**
         * 根据等级获取等级显示
         * @param lv 等级
         */
        export function getPersonLocalLvByLv(lv:number):string
        {
            return personList[lv]?personList[lv].getLocalLv():""+lv;
        }

        /**
         * 根据等级获取价格
         * @param lv 等级
         */
        // export function getGoldCostByLv(lv:number):number
        // {
        //     let cfg=getPersonCfgByLv(lv)||getPersonCfgByLv(getMaxLv());
        //     return cfg.goldCost;
        // }

        /**
         * 根据等级获取次数恢复时间
         * @param lv 等级
         */
        export function getBuyTimeByLv(lv:number):number
        {
            let cfg=getPersonCfgByLv(Math.min(lv,getMaxLv()));
            return cfg.buyTime;
        }

        /**
         * 获取最大等级
         */
        export function getMaxLv():number
        {
            return maxLv;
        }

        export function getCostStr():string
        {
            return Config.RewardCfg.getRewardStr(String(ItemEnums.gold),0,goldCost);
        }

        export function getRewardsByLv(lv:number):string
        {
            let cfg=getPersonCfgByLv(lv);
            return cfg?cfg.rewards:"";
        }
    }
    class PersoninfoItemCfg extends BaseItemCfg
    {
        /**解锁征收ID */
        public levyID:number;
        /**银两收益 */
        public gold:number;
        /**士兵收益 */
        public soldier:number;
        /**粮食收益 */
        public food:number;
        /**初次奖励政绩 */
        public exp:number=0;
        /**购买家丁等级权重（家丁等级范围是[当前合成最高等级-4，当前合成最高等级] */
        public weight:number[]=[];
        /**初次获得奖励 */
        public firstReward:string;
        /**合成奖励 */
        public rewards:string;

        /** 雇佣银两 */
        public goldCost:number=0;

        /**门客 */
        public unlockServent: string;

        /**老婆 */
        public unlockWife: string;

        public lv:number=0;
        /**buyTime:招募回复时间 */
        public buyTime:number=0;

        public getLocalName():string
        {
            return LanguageManager.getlocal("composePersonLv"+this.lv);
        }

        public getLocalLv():string
        {
            return "Lv."+this.lv;
        }
    }
}