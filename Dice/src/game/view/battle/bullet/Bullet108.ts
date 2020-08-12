/**
 * --原名称：赌博 现在：命运
 * 实际伤害额外增加0--最大暴击伤害的随机值   例：最大暴击伤害351% ， 则是 0--351 的随机值
*/
class Bullet108 extends Bullet{
    public constructor(){
        super();
    }

    //实际伤害额外增加0--最大暴击伤害的随机值   例：最大暴击伤害351% ， 则是 0--351 的随机值
    protected calDamageNum(monster:BaseMonster):number{
        let nmDmgData = this.nmDmgData;
        let num = nmDmgData.dmg;

        let initInfo=Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        let maxcrit = initInfo.crivalue;
        let randomvalue = App.MathUtil.seededRandom(0,maxcrit,BattleStatus.battleLogicHasTickTime/(this.diceData.index));

        if(this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()){
            this.isKillByOne = true;
            num = monster.getCurHp();
        }
        else{
            num += randomvalue
        }
        return num;
    }

    public dispose():void{
        super.dispose();
    }
}