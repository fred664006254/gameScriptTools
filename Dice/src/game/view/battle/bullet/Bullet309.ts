/**
 * --原名称：改造的电骰子  --新名称：雷霆
 * 2星骰子，可让除命中外的顺序第二位骰子受到电流伤害   3星，就是2和3，以此类推
*/
class Bullet309 extends Bullet
{
    public constructor()
    {
        super();
    }

    protected damage():void
    {
        let lost=false;
        if(!!this.nmDmgData)
        {
            if(!this.target.lost(this.diceData.isMe))
            {
                let damage=this.calDamageNum(this.target);
                this.target.beAtk({hp:damage,isMe:this.diceData.isMe,crit:this.nmDmgData.isCrit,addStatus:this.isKillByOne?`301`:null});
                //普通怪物受到伤害后
                this.playAtkSound();
            }
            else
            {
                lost=true;
            }
        }
        if((this.target&&!lost&&!this.target.isDie()) && this.diceData.checkExtDamage())
        {
            this.extraDamage();
        }
    }

    protected extraDamage():void
    {
        let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let findmonsterDataList = DiceHelper.diceFindMonster(this.diceData,this.diceData.isMe);
        let idx=0;
        let l = Math.min(this.diceData.star,findmonsterDataList.length);
        for (let i = 0; i < l; i++)
        {
            const mData = findmonsterDataList[i];
            if(!mData.lost(this.diceData.isMe))
            {
                const monster=monstersList[mData.getName()];
                monster.beAtk({hp:this.diceData.property1,isMe:this.diceData.isMe,crit:false,addStatus:String(this.diceData.id)});
              
                let lastData=findmonsterDataList[idx];
                let lastMonster=monstersList[lastData.getName()];
                if(lastData.getRange().min-mData.getRange().max>10&&lastData.lost(this.diceData.isMe)==false && !lastMonster.getChildByName(`atkeffect309`))
                {
                    let mv = this.createLine({x : lastMonster.x, y : lastMonster.y}, {x : monster.x, y : monster.y});
                    mv[`mvData`] = mData.getName();
                    lastMonster.addChildAt(mv,0);
                }
            }
        }
    }

    private createLine(startPoint:{x : number, y : number}, endPoint:{x : number, y : number}, playnum : number=1):CustomMovieClip{
        let w=33;
        let mv=ComponentMgr.getCustomMovieClip("atkeffect309",NaN,70,BattleBaseEffect);
        mv.fillMode=egret.BitmapFillMode.REPEAT;
        mv.setEndCallBack(()=>{
            mv.dispose();
            mv = null;
        }, this);
        mv.playWithTime(playnum);
        mv.anchorOffsetY=22/2;
        
        let diffX = endPoint.x-startPoint.x;
        let diffY = endPoint.y-startPoint.y;
        let angle = Math.atan2(diffY,diffX);
        mv.rotation=angle*180/Math.PI;
        let dis = Math.sqrt(diffX*diffX+diffY*diffY);
        if(dis<w)
        {
            mv.scaleX=dis/w;
        }
        else
        {
            mv.width=dis;
        }
        mv.name = `atkeffect309`;
        return mv;
    }

    public reset():void
    {
        super.reset();
    }
}