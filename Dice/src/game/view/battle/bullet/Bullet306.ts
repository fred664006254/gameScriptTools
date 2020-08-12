/**
 * 原名称：-原名称：齿轮骰子  --新名称：回音
*/
class Bullet306 extends Bullet{

    public constructor(){
        super();
    }

    //链接的攻击力
    // public getDmgData():{dmg:number,isCrit:boolean}{
    //     let dmgData:{dmg:number,isCrit:boolean}=null;
    //     if(Config.DiceCfg.checkHasNmAtk(String(this.id)))
    //     {
    //         let initInfo=Api.BattleVoApi.getInitInfo(this.isMe);
    //         let addCritScale=0;
    //         let isCrit:boolean=false;
    //         if(this.checkCrit(initInfo.uid))
    //         {
    //             isCrit=true;
    //             addCritScale=(initInfo.crivalue)/100;
    //             App.LogUtil.log(initInfo.uid,"暴击",addCritScale,BattleStatus.battleLogicHasTickTime);
    //         }
    //         dmgData={dmg:this._damage*(1+addCritScale),isCrit:isCrit};
    //     }
    //     return dmgData;
    // }

    public dispose():void{
        super.dispose();
    }
}