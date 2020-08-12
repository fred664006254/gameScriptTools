class Bullet102 extends Bullet
{
    public constructor()
    {
        super();
    }

    protected extraDamage():void
    {
        let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        // DiceHelper.sortByDis(this.mVoList);
        // if(this.mVoList[0]&&this.mVoList[0].lost()==false)
        // {
            let findmonsterDataList = this.mVoList;//DiceHelper.bulletFindMonster(this.diceData,this.mVoList[0].getCenterDis(),this.diceData.property3,this.diceData.isMe);
            // let l=findmonsterDataList.length;
            let idx=-1;
            let property3:number[]=this.diceData.property3;
            let l = Math.min(property3.length,findmonsterDataList.length);

            let posAllCfg=BattleStatus.getLimitPos();
            let posCfg = this.diceData.isMe ? posAllCfg.me : posAllCfg.target;

            for (let i = 0; i < l; i++)
            {
                const mData = findmonsterDataList[i];
                if(!mData.lost(this.diceData.isMe))
                {
                    const monster=monstersList[mData.getName()];
                    monster.beAtk({hp:this.diceData.property1*property3[i],isMe:this.diceData.isMe,crit:false,addStatus:String(this.diceData.id)});
                    if(idx >= 0)
                    {
                        if(BattleStatus.stopActEffect)
                        {
                            return ;
                        }
                        let lastData=findmonsterDataList[idx];
                        let lastMonster=monstersList[lastData.getName()];
                        if(lastData.getRange().min-mData.getRange().max>10&&lastData.lost(this.diceData.isMe)==false && !lastMonster.getChildByName(`atkeffect102`))
                        {
                            let w=33;
                            let mv = this.createLine({x : lastMonster.x, y : lastMonster.y}, {x : monster.x, y : monster.y});
                            mv[`mvData`] = mData.getName();
                            lastMonster.addChildAt(mv,0);
                            // if(lastData.moveStatus !== mData.moveStatus){
                            //     let startMonster = lastData.moveStatus > mData.moveStatus ? monster : lastMonster;
                            //     let startData = lastData.moveStatus > mData.moveStatus ? mData : lastData;
                            //     let endMonster = lastData.moveStatus < mData.moveStatus ? monster : lastMonster;
                            //     let endData = lastData.moveStatus < mData.moveStatus ? mData : lastData;

                            //     if(Math.abs(lastData.moveStatus - mData.moveStatus) == 1){
                            //         let end = posCfg[`pos${endData.moveStatus}`];
                            //         let mv = this.createLine({x : startMonster.x, y : startMonster.y}, {x : end.x, y : end.y});
                            //         startMonster.addChildAt(mv,0);
                            //         egret.Tween.get(mv,{onChange : ()=>{
                            //             if(mv){
                            //                 let diffX = end.x-startMonster.x;
                            //                 let diffY = end.y-startMonster.y;
                            //                 let dis = Math.sqrt(diffX*diffX+diffY*diffY);
                            //                 mv.width = dis;
                            //             }
                            //         }, onChangeObj : this});

                            //         let mv2 = this.createLine({x : endMonster.x, y : endMonster.y}, {x : end.x, y : end.y});
                            //         endMonster.addChildAt(mv2,0);
                            //         egret.Tween.get(mv2,{onChange : ()=>{
                            //             if(mv2){
                            //                 let diffX = endMonster.x-end.x;
                            //                 let diffY = endMonster.y-end.y;
                            //                 let dis = Math.sqrt(diffX*diffX+diffY*diffY);
                            //                 mv2.width = dis;
                            //             }
                            //         }, onChangeObj : this});
                            //     }
                            //     else if(Math.abs(lastData.moveStatus - mData.moveStatus) == 2){
                            //         let end1 = posCfg[`pos${startData.moveStatus + 1}`];
                            //         let mv = this.createLine({x : startMonster.x, y : startMonster.y}, {x : end1.x, y : end1.y});
                            //         startMonster.addChildAt(mv,0);

                            //         let end2 = posCfg[`pos${endData.moveStatus}`];
                            //         let mv2 = this.createLine({x : end1.x, y : end1.y}, {x : end2.x, y : end2.y});
                            //         startMonster.addChildAt(mv2,0);

                            //         let mv3 = this.createLine({x : endMonster.x, y : endMonster.y}, {x : end2.x, y : end2.y});
                            //         endMonster.addChildAt(mv3,0);
                            //     }
                            // }
                            // else{
                            //     let mv = this.createLine({x : lastMonster.x, y : lastMonster.y}, {x : monster.x, y : monster.y});
                            //     lastMonster.addChildAt(mv,0);
                            //     mv[`mvDara`] = mData.getName();
                            // }
                        }
                    }
                    idx=i;
                }
            }
        // }
        // else
        // {
        //     App.LogUtil.log("第一目标普通攻击打死了，额外攻击停止");
        // }
    }

    private createLine(startPoint:{x : number, y : number}, endPoint:{x : number, y : number}, playnum : number=1):CustomMovieClip{
        let w=33;
        let mv=ComponentMgr.getCustomMovieClip("atkeffect102",NaN,70,BattleBaseEffect);
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
        mv.name = `atkeffect102`;
        return mv;
    }

}