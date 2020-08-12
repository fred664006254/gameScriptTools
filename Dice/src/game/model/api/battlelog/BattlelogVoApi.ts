namespace Api{
    export namespace BattlelogVoApi{
        let battleloVo:BattlelogVo;
        let lastidx:number=-1;
        export function formatData(data:any):void{
            if(!battleloVo){
                battleloVo=new BattlelogVo();
            }
            battleloVo.initData(data);
        }

        export function getbattleLog():IBattleLogInfo[]{
            let arr = [];
            if(battleloVo && battleloVo.info && battleloVo.info.length){
                arr = battleloVo.info;
            }
            return arr;
        }

        export function setlastindex(id:number):void{
            lastidx = id;
        }

        export function getlastidx():number{
            return lastidx;
        }
        
		export function dispose():void{
            if(battleloVo){
                battleloVo.dispose();
                battleloVo=null;
            }
            lastidx=-1;
        }
    }
}