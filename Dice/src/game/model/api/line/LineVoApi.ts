namespace Api
{
    export namespace LineVoApi
    {
        let lineVo:LineVo;
        export function formatData(data:any):void
		{
            if(!lineVo)
            {
                lineVo=new LineVo();
            }
            lineVo.initData(data);
        }

        export function getCurLine():number
        {
            return lineVo?lineVo.cur:1;
        }
        
        export function getCurLineInfo():{id:string}[]
        {
            return lineVo?lineVo["info"+lineVo.cur]:null;
        }

        export function getLineInfoById(lineid : number):{id:string}[]
        {
            return lineVo?lineVo["info"+lineid]:null;
        }

        export function getDiceIsInLineById(dice : string, lineid : number):boolean
        {
            let flag = false;
            if(lineVo && lineVo["info"+lineid]){
                for(let i in lineVo["info"+lineid]){
                    if(String(dice) === String(lineVo["info"+lineid][i].id)){
                        flag = true;
                        break;
                    }
                }
            }
            return flag;
        }

        export function getHadSkins(){
            return lineVo ? lineVo.scene : null;
        }

        export function getUseSkinID(){
            return lineVo ? lineVo.sid: null;
        }

        export function getNotHadSkins(){
            let tem:Array<string> = [];
            let allSkins = Config.BattleskinCfg.getSkinIDs();
            let hads = lineVo.scene;
            for (let index = 0; index < allSkins.length; index++) {
                const item = allSkins[index];
                if(index == 0 || hads.indexOf(item) >=0 ) continue;

                tem.push(item);
            }

            return tem;
        }

        export function getCurSkin(){
            return lineVo ? lineVo.sid : null;
        }

		export function dispose():void
		{
            if(lineVo)
            {
                lineVo.dispose();
                lineVo=null;
            }
        }
    }
}