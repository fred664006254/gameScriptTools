class Obstacle413 extends Obstacle{
    public constructor(){
        super();
    }

    public init(diceData:DiceData,pos:{x:number,y:number},monsterdisline?:number):void{
        this.diceData=diceData;
        this.initData(diceData);

        this._lineDis=0;

        let res=`obstacle_413`;
        // this.initLoadRes(res);
        this.texture=ResMgr.getRes(res);
        this.width = 40;
        this.height = 40;
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
        this.setPosition(pos.x,pos.y);
        this.status = 2;
        this.birthTime = BattleStatus.battleLogicHasTickTime;
        this.setScale(0.5);
    }

    protected initData(diceData:DiceData):void{
        this._diceId = diceData.id;
        this._keep = 0;
        this._dmg = diceData.damage;
        this._radius = 0;
        this._cd = 0.5 * 1000;
    }

    public checkEnd():boolean{
        return false;
    }

    private judegeIsInOutLine():boolean{
        let arr = BattleStatus.battleType == 1 ? [`0_0`, `0_1`, `0_2`, `1_0`,`2_0`,`3_0`,`4_0`,`4_1`,`4_2`] : [`0_0`, `0_1`, `0_2`, `1_0`,`2_0`,`3_0`,`4_0`];
        return arr.indexOf(`${this.diceData.x}_${this.diceData.y}`) > -1;
    }

    protected checkDamage():void{
        let flag = false;
        let lineDis = 0;
        if(this.judegeIsInOutLine()){
            if(BattleStatus.checkCdDoTime(this._cd,this.birthTime)){
                if(this.parent){
                    let parent = this.parent.parent;
                    let posx = this.diceData.getShowPos(this.diceData.isMe).x;
                    let posy = this.diceData.getShowPos(this.diceData.isMe).y;
                    if(parent && parent.x == posx && parent.y == posy){
                        let posAllCfg=BattleStatus.getLimitPos();
                        let posCfg=this.diceData.isMe?posAllCfg.me:posAllCfg.target;
                        let idx = -1;
                        //Pvp
                        let tmpx = this.x + parent.x;
                        let tmpy = this.y + parent.y;
                        let diffX=0;
                        let diffY=0;
                        if(BattleStatus.battleType == 1){
                            if(this.diceData.isMe){
                                if(this.diceData.x == 0 && tmpy <= posCfg.pos0.y && tmpy > posCfg.pos1.y && tmpx <= posCfg.pos0.x){
                                    idx = 0;
                                    diffY = posCfg.pos0.y - tmpy;
                                }
                                else if(tmpx >= posCfg.pos1.x && tmpx <= posCfg.pos2.x && this.diceData.y == 0 && tmpy <= posCfg.pos1.y){
                                    idx = 1;
                                    diffY = 
                                    diffX = tmpx - posCfg.pos1.x;
                                }
                                else if(this.diceData.x == 4 && tmpy <= posCfg.pos3.y && tmpy > posCfg.pos2.y && tmpx >= posCfg.pos2.x){
                                    idx = 2;
                                    diffY = tmpy - posCfg.pos2.y;
                                }
                            }
                            else{
                                if(this.diceData.x == 0 && tmpy >= posCfg.pos0.y && tmpy < posCfg.pos1.y && tmpx >= posCfg.pos0.x){
                                    idx = 0;
                                    diffY = tmpy - posCfg.pos0.y;
                                }
                                else if(tmpx <= posCfg.pos1.x && tmpx >= posCfg.pos2.x && this.diceData.y == 0 && tmpy >= posCfg.pos1.y){
                                    idx = 1;
                                    diffX = posCfg.pos1.x - tmpx;
                                }
                                else if(this.diceData.x == 4 && tmpy>= posCfg.pos3.y && tmpy < posCfg.pos2.y && tmpx <= posCfg.pos2.x){
                                    diffY = posCfg.pos2.y - tmpy;
                                }
                            }
                        }
                        else{
                            //pve
                            if(this.diceData.isMe){
                                if(this.diceData.x == 0 && tmpy <= posCfg.pos0.y && tmpy > posCfg.pos1.y && tmpx <= posCfg.pos0.x){
                                    idx = 0;
                                    diffY = posCfg.pos0.y - tmpy;
                                }
                                else if(tmpx >= posCfg.pos1.x && tmpx <= posCfg.pos2.x && this.diceData.y == 0 && tmpy <= posCfg.pos1.y){
                                    idx = 1;
                                    diffX = tmpx - posCfg.pos1.x;
                                }
                            }
                            else{
                                if(this.diceData.x == 0 && tmpy >= posCfg.pos0.y && tmpy < posCfg.pos1.y && tmpx <= posCfg.pos0.x){
                                    idx = 0;
                                    diffY = tmpy - posCfg.pos0.y;
                                }
                                else if(tmpx >= posCfg.pos1.x && tmpx <= posCfg.pos2.x && this.diceData.y == 0 && tmpy >= posCfg.pos1.y){
                                    idx = 1;
                                    diffX = tmpx - posCfg.pos1.x;
                                }
                            }
                        }
                        for(let i=1;i<=idx;i++)
                        {
                            let pos=posCfg["pos"+i];
                            let lstPos=posCfg["pos"+(i-1)];
                            lineDis+=Math.abs(pos.x-lstPos.x)+Math.abs(pos.y-lstPos.y);
                        }
                        if(idx > -1){
                            flag = true;
                            lineDis+=(Math.abs(diffX)+Math.abs(diffY));
                        }
                    }
                }
            }
        }
        if(flag){
            let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
            let findmonsterDataList = DiceHelper.findRangMonster(lineDis,0,this.diceData.isMe);
            let point = this.localToGlobal();
            for (let i = 0; i < findmonsterDataList.length; i++) {
                let mdata = findmonsterDataList[i];
                if(mdata && !mdata.lost(this.diceData.isMe)){
                    const monster=monstersList[mdata.getName()];
                    // let dis = App.MathUtil.getDistance(point, monster.localToGlobal()) <= (monster.width/2*monster.scaleX+this.width/2*this.scaleX);
                    if(flag){
                        let damage = monster.getMaxHp() * 0.04;
                        monster.beAtk({hp:damage,isMe:this.diceData.isMe,crit:false});
                        //this.playAtkSound();
                    }
                }
            }
        }
    }

    public dispose():void{
        super.dispose();
    }
}