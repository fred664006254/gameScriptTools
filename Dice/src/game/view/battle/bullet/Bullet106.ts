/**
 *新名称：斩首 对boss2倍伤害
*/
class Bullet106 extends Bullet{
    public constructor(){
        super();
    }

    protected calDamageNum(monster:BaseMonster):number{
        let nmDmgData = this.nmDmgData;
        let num = nmDmgData.dmg;
        if(monster.isBoss() || monster.getMonsterType() == 3){
            num *= 2;
        }
        let initInfo=Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        if(this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()){
            this.isKillByOne = true;
            num = monster.getCurHp();
        }
        return num;
    }

    public dispose():void{
        super.dispose();
    }
}