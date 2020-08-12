namespace BattleFrameHelper
{
    let lastFrameT:number=0;
    let timeOutFrame:number=0;
    let startTotalFrame:number=0;
    let checkValue:number=50;
    let isEnough:boolean=false;
    let hasEvt:boolean=false;

    export function startCheck():void
    {
        if((!isEnough)&&(!hasEvt))
        {
            hasEvt=true;
            GameConfig.stage.addEventListener(egret.Event.ENTER_FRAME,checkStopEffect,BattleFrameHelper);
        }
    }

    function removeEvt():void
    {
        hasEvt=false;
        GameConfig.stage.removeEventListener(egret.Event.ENTER_FRAME,checkStopEffect,BattleFrameHelper);
    }
    
    function checkStopEffect(e:egret.Event):boolean
    {
        if(isEnough)
        {
            return isEnough;
        }
        let t=egret.getTimer();
        if(!lastFrameT)
        {
            lastFrameT=t;
        }
        else
        {
            if(t-lastFrameT>checkValue)
            {
                timeOutFrame++;
            }
            startTotalFrame++;

            if(startTotalFrame==100)
            {
                if((timeOutFrame/startTotalFrame)>=0.5)
                {
                    removeEvt();
                    isEnough=true;
                    BattleStatus.stopActEffect=isEnough;
                }
                else
                {
                    startTotalFrame=0;
                    timeOutFrame=0;
                }
            }
            lastFrameT=t;
        }
        return isEnough;
    }
}