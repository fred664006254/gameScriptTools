/**
 *  --原名称：能量骰子  --新名称：聚能
 * 造成持有SP百分比的伤害
*/
class Bullet206 extends Bullet{
    public constructor(){
        super();
    }

    //附加持有SP百分比的伤害
    protected calDamageNum(monster:BaseMonster):number{
        let nmDmgData = this.nmDmgData;
        let selfSpnum = Api.BattleVoApi.getSpNum(this.diceData.isMe);
        let num = nmDmgData.dmg + selfSpnum * this.diceData.property1;
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