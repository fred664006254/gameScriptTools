/**
 * --原名称：枪械 现在：乱舞
 * 1-6正常 7星直接变狙击 秒百分比血量
*/
class Bullet414 extends Bullet{
    public constructor(){
        super();
    }

    public init(diceData:DiceData,stPos:{x:number,y:number}):void
    {
        this.diceData=diceData;
        // diceData.property1

        this.setBulletRes();
        this.x=stPos.x;
        this.y=stPos.y;
        this.startPoint = new egret.Point(stPos.x, stPos.y-70);
    }

    public atk(mVoList:MonsterVo[]):void
    {
        // this.startTick();
        super.atk(mVoList);
        let diffX=this.target.x-this.startPoint.x;
        let diffY=this.target.y-this.startPoint.y;
        let angle = Math.atan2(diffY,diffX) * 180/Math.PI;
        this.rotation = angle + 90;

        // if(this.diceData.checkMaxStar()){
        //     let line = ComponentMgr.getCustomMovieClip(`atkeffect303`, null, 40,BattleBaseEffect); 
            
        //     line.anchorOffsetY = 90 / 2;
        //     line.scaleY = 0.4;
        //     if(this.parent){
        //         this.parent.addChild(line);
        //     }
        //     line.rotation = angle;
        //     line.width = App.MathUtil.getDistance(this.startPoint, new egret.Point(this.target.x, this.target.y));
        //     line.x = this.startPoint.x;
        //     line.y = this.startPoint.y;
        //     line.setEndCallBack(()=>{
        //         line.dispose();
        //         line = null;
        //         this.dispose();
        //     }, this);

        //     line.playWithTime(1);
        // }
    }

    protected setBulletRes(){
        let icon=Config.DiceCfg.getStarByLv(String(this.diceData.id),this.diceData.star);
        let scale=DiceScaleEnum.scale_41;
        if(this.diceData.checkMaxStar()){
            icon = `atkeffect414_3`;
            scale = 1;
        }
        this.texture=ResMgr.getRes(icon);
        // this.initLoadRes(icon);
        this.width=this.width*scale;
        this.height=this.height*scale;
        this.anchorOffsetX=this.width*0.5;
        this.anchorOffsetY=this.height*0.5;
    }

     /**
     * 命中效果或者怪物死了子弹爆炸
     * @param hit 是否攻击到了
     */
    protected playHitEffect(hit:boolean):void
    {
        if(this.status!=2)
        {
            hit&&this.damage();
            this.status=2;
            let useDid=this.diceData.id;
            let effectKey=this.diceData.checkMaxStar() ? `bthiteffect414_3` : ("bthiteffect"+useDid);
            if((!hit)||(!ResMgr.hasRes(effectKey+"1")))
            {
                effectKey="bthiteffect";
            }
            if(this.target){
                let diffX=this.target.x-this.startPoint.x;
                let diffY=this.target.y-this.startPoint.y;
                let angle = Math.atan2(diffY,diffX) * 180/Math.PI;
                this.rotation = angle + 90;
                let frameCount=this.frameCount(effectKey);
                let resArr:string[]=[];
                for(var i:number=1;i<=frameCount;i++)
                {
                    resArr.push(effectKey+i);
                }
                this.frameImages = resArr;
                this.playFrameRate=50;
                // this.playFrameRate
                this.setEndCallBack(this.dispose,this);
                this.texture=null;
                this.width=this.height=NaN;
                this.playWithTime(1);
            }
            else{
                this.dispose();
            } 
        }
    }

    //7星直接变狙击 小怪就秒，boss百分比血
    protected calDamageNum(monster:BaseMonster):number{
        let nmDmgData = this.nmDmgData;
        let num = nmDmgData.dmg;
        if(this.diceData.checkMaxStar() && monster){//
            let hp = monster.getMaxHp();
            num = monster.getMonsterType() >= 3 ? (hp * this.diceData.property1) : (hp)
        }
        let initInfo=Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        if(this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()){
            this.isKillByOne = true;
            num = monster.getCurHp();
        }
        return num;
    }

    protected playAtkSound():void{
        if(this.diceData.isMe){
            let id = 2;
            if(this.diceData.checkMaxStar()){
                id = 3;
            }
            else if(this.diceData.star == 1){
                id = 1;
            }
            let name = `effect_dice_414_${id}`;
            if(RES.hasRes(name)){
                SoundMgr.playEffect(name);
            }
        }
    }

    public dispose():void{
        super.dispose();
    }
}