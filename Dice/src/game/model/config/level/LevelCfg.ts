namespace Config
{
    export namespace LevelCfg
    {
        let levelCfg:{[key:string]:LevelItemCfg}={};
        export function formatData(data:any):void
		{
            let levels=data.level;
            for (const lv in levels)
            {
                if (levels.hasOwnProperty(lv))
                {
                    let lvItem=new LevelItemCfg();
                    lvItem.level=Number(lv);
                    lvItem.initData(levels[lv]);
                    levelCfg[lv]=lvItem;
                }
            }
        }

        export function getLevelNeedScore(lv:number){
            if(lv <= 1){
                return 0;
            }
            if(lv > 20){
                return 99999;
            }
            return levelCfg[lv]["needScore"];
        }

        export function getUpgradeNS(lv:number):number{
            if(lv < 1){
                return 0;
            }
            if(lv >= 20){
                return 99999;
            }

            return levelCfg[lv+1]["needScore"] - levelCfg[lv]["needScore"];
        }
    }
    class LevelItemCfg extends BaseItemCfg
    {
        public needScore:number;//所需奖杯数
        public baseWinGold:number;//不同等级获胜后，获得的金币基础值
        public loseScore:number;//失败后，扣分倍率，向上取整  每次失败后，扣分 = 胜方加分 * loseScore
        public robot:number;//是否可匹配到机器人  1:number;//可以  0：不行
        public canRandom:number;//连败场数，大于等于 X 场后，必匹配到 random ，打机器人输了也算
        public minScore:number;//匹配的分差最小值
        public maxScore:number;//匹配的分差最大值
        public winAddScore:number[];//连胜隐藏分增加值  分别对应连胜场数，超过最大值，取最大值
        public loseDecreaseScore:number[];//连败隐藏分减少值  分别对应连败场数，超过最大值，取最大值
        public level:number;

        /**
         * 获取连胜隐藏分增加值
         * @param clv 
         */
        public getWinAddScoreByLv(clv:number):number
        {
            let l=this.winAddScore.length;
            let tlv=Math.max(1,Math.min(clv,l));
            tlv=tlv-1;
            return this.winAddScore[tlv];
        }

        public getLoseDecreaseScore(clv:number):number
        {
            let l=this.loseDecreaseScore.length;
            let tlv=Math.max(1,Math.min(clv,l));
            tlv=tlv-1;
            return this.loseDecreaseScore[tlv];
        }
    }
}