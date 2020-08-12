/**
--原名称：感染骰子  --新名称：感染
*/
class Bullet308 extends Bullet{
    public constructor(){
        super();
    }

    protected damage():void{
        let self = this;
        let diceData = self.diceData;
        let mvo = self.mVoList[0];
        let nmDmgData = this.nmDmgData;
        let monstersList=mvo.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let target = monstersList[mvo.getName()];
        if(target && !target.lost(this.diceData.isMe)){
            let buffData:IBuffData={diceId:`${diceData.id}`,keep:0,cd:0,isMe:diceData.isMe,posion:true,dicedata:App.CommonUtil.object_clone(diceData)};
            MonsterBuff.addBuff(buffData,mvo);
            //普通怪物受到伤害后
            this.playAtkSound();
        }   
    }

    // protected setBulletRes(){
    //     // this.texture=ResMgr.getRes(icon);
    //     this.initLoadRes(`addmst308`);
    //     let scale=DiceScaleEnum.scale_41;
    //     this.width=this.width*scale;
    //     this.height=this.height*scale;
    //     this.anchorOffsetX=this.width*0.5;
    //     this.anchorOffsetY=this.height*0.5;
    // }

    public dispose():void{
        super.dispose();
    }
}