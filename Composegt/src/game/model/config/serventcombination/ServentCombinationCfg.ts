namespace Config
{
	export namespace ServentcombinationCfg 
	{
        let relationship:{[key:string]:ServantCombinationItemCfg}={};
		export function formatData(data:any):void
		{
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) 
                {
                    const element = data[key];
                    let itemCfg=new ServantCombinationItemCfg();
                    itemCfg.initData(data[key]);
                    relationship[key]=itemCfg;
                }
            }
        }

        /**
         * --combinationDetail  组合元素
        --attributeType  加成属性类型  1.擂台中增加攻击 2擂台中增加血量
        --addValue  羁绊加成值
        --needAbility  所需等级
        
        ["10011"]={       ----元芳----
            ["combinationDetail"]={"1001","1002","1003","1004","1005"},
            ["attributeType"]=1,
            ["addValue"]={0.05,0.1,0.15},
            ["needAbility"]={100,200,300},
        },
        */
        export function isHaveCombine(sid : string):boolean{
            return relationship && typeof relationship[sid+`1`] !== `undefined`
        }

        export function getCombineNums(sid : string):number{
            let num = 0;
            if(isHaveCombine(sid)){
                let id = 1;
                while(relationship[sid+id]){
                    ++ id;
                    ++ num;
                }
            }
            return num;
        }

        export function getCombineInfoById(sid:string, id : number):ServantCombinationItemCfg{
            let info = undefined;
            if(relationship && relationship[sid+id]){
                info = relationship[sid+id];
            }
            return info;
        }
    }
    
    export class ServantCombinationItemCfg extends BaseItemCfg
    {
        public combinationDetail:string[];
        private addValue:number[];
        public needAbility:number[];
        public attributeType:number;
        public getAddValueByLv(lv:number):number
        {
            return this.addValue[Math.max(0,lv-1)];
        }
        public getAbilityByLv(lv:number):number
        {
            return this.needAbility[Math.max(0,lv-1)];
        }
        public getcombinationDetailByLv(lv:number):string
        {
            return this.combinationDetail[Math.max(0,lv-1)];
        }

        public getMaxLv():number
        {
            return this.needAbility.length;
        }
    }
}