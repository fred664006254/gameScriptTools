/**
 * 骰子基类，实现骰子通用逻辑
 * author 陈可
 * date 2020/4/23
 * @class BaseDice
 */
class BaseDice extends BaseDisplayObjectContainer
{
    private _data:DiceData;
    private _targetList:BaseMonster[]=[];
    // protected _starList:BaseLoadBitmap[]=[];
    // private _starTxt:BaseTextField=null;
    protected _bg:BattleDiceEffect;
    // protected _mask:BaseBitmap;
    protected _extraGroup:BaseDisplayObjectContainer=null;
    private _buffList:{[diceId:string]:DiceBuff}={};
    private _isSilence:boolean=false;
    private _starBmp:BaseBitmap=null;
    protected _obs : Obstacle[] = [];

    public constructor(data:DiceData, appearEff?:string)
    {
        super();
        this.init(data,appearEff);
        this.initEventListener();
    }

    protected init(data:DiceData, appearEff?:string):void
    {
        this._data=data;
        let iconUrl=Config.DiceCfg.getIconById(String(this._data.id));
        let idleKey=Config.DiceCfg.getIdceEffect(String(this._data.id));
        let dice:BattleDiceEffect=<BattleDiceEffect>ComponentMgr.getCustomMovieClip(idleKey,NaN,150,BattleDiceEffect);
        // if(data.isMe && !Api.GameinfoVoApi.getIsFinishNewGuide() && Api.GameinfoVoApi.getCurGudingId() <= 5 && (this._data.posStr == `1_1` || this._data.posStr == `3_1`)){
        //     dice.width = 94;
        //     dice.height = 109;
        // }
        // dice.width = 126;
        // dice.height = 99;
        dice.playIdle();
        this._bg=dice;
        this.addChild(dice);

        let star=BaseBitmap.create("dicestarlv"+this._data.star);
        star.anchorOffsetX=star.width*0.5;
        star.anchorOffsetY=star.height*0.5;
        this.addChild(star);
        this._starBmp=star;

        //圆形遮罩
        if(data.isMe){
            App.MsgHelper.addEvt(MsgConst.DICE_MOVE_FORCOMPOSE, this.movein, this);
        }

        let group = new BaseDisplayObjectContainer();
        this._extraGroup = group;
        group.width = dice.width;
        group.height = dice.height;
        group.anchorOffsetX = group.width / 2;
        group.anchorOffsetY = group.height / 2;
        group.setPosition(dice.x + dice.width/2, dice.y+ dice.height/2);
        this.addChild(group);

        this.resetStar();
        // this.width=diceSize.width;
        // this.height=diceSize.height;
        this.resetPos();

        this.appearEff(data.checkIsMirror(), appearEff == `pre` ? false : true, appearEff);

        let timebuff = BattleStatus.scene.getTimeBuff(this.checkIsMe(),this.getDiceStars());
        if(timebuff){
            let buffData:IDiceBuffData={diceId:`418`, keep:0, timespeed:timebuff.timespeed, cd:0, isMe:this.checkIsMe()};
            DiceBuff.addBuff(buffData, this);
        }

        if(!this.checkIsMe() && Api.GameinfoVoApi.getIsFinishNewGuide()){
            this.addTouchTap(()=>{
                ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW,{
                    dice : this.getDiceId(),
                    check : true,
                    inbattle : true,
                    info : {
                        lv : this._data.lv,
                        pwlv : this._data.pwlv
                    },
                    star : this.getDiceStars()
                });
            }, this);
        }
    }

    public refresh(data:DiceData,appeareff?:string):void
    {
        this._data=data;
        // let iconUrl=Config.DiceCfg.getIconById(String(this._data.id));
        // this._bg.setload(iconUrl);
        this.playAtkAction();
        this.resetStar();
        this._data.setCdTimeArr();
        this._data.setspecial1CdTimeArr();
        this._data.setspecial2CdTimeArr();
        this.checkAroundAndSelf();
        this.appearEff(data.checkIsMirror(), true, appeareff);
    }

    public checkAroundAndSelf():void{
        this.checkAroundDice();
        this.checkBuff();
    }

    public checkLine():void{
        this.checkAroundAndSelf();
    }

    private movein(evt : egret.Event):void{
        let flag = false;
        if(evt.data && evt.data.id && evt.data.pos != `${this._data.x}_${this._data.y}`){
            if(evt.data.stars == this._data.star){
                if(Number(this._data.id) == Number(evt.data.id)){
                    flag = !this._data.checkMaxStar();
                }
                else{
                    if(this._data.checkCanComposeAny(evt.data.id)){
                        if(Number(evt.data.id) == 404 || Number(evt.data.id) == 305){
                            flag = true;
                        }
                        else{
                            flag = !this._data.checkMaxStar();
                        }
                    }
                }
            }
        }
        else{
            flag = true;
        }
        this.alpha = flag ? 1 : 0.4;
    }

    protected playAtkSound():void{
        if(this.checkIsMe()){
            let name = `effect_dice_${this.getDiceId()}`;
            if(RES.hasRes(name)){
                SoundMgr.playEffect(name);
            }
        }
    }


    protected appearEff(ismirror:boolean, smoke:boolean=true, appeareff?:string):void
    {
        if(appeareff && appeareff == `grow`){//
            // this.setScale(DiceScaleEnum.scale_41);
            // this._bg.alpha = 0;
            // for(let i = 0; i < this._starList.length; ++ i){
            //     this._starList[i].alpha = 0;
            // } 
            let clipname =`adddice409`;
            let clip = ComponentMgr.getCustomMovieClip(clipname, null, 100,BattleBaseEffect);  
            clip.setEndCallBack(()=>{
                clip.dispose();
                this._bg.alpha = 1;
                // for(let i = 0; i < this._starList.length; ++ i){
                //     this._starList[i].alpha = 1;
                // } 
                this.checkAroundAndSelf();
                egret.Tween.get(this).to({scaleX : 1.1, scaleY : 1.1}, 300).to({scaleX : 1, scaleY : 1}, 200);
            },this);
            clip.playWithTime(1);
            clip.anchorOffsetX = 200 / 2;
            clip.anchorOffsetY = 200 / 2;
            clip.y = -70;
            this.addChild(clip); 
        }
        else if(appeareff && appeareff == `summon`){
            // this.setScale(DiceScaleEnum.scale_41);
            //召唤骰子音效
            this._bg.alpha = 0;
            if(this.checkIsMe()){
                let name = `effect_dice_410`;
                if(RES.hasRes(name)){
                    SoundMgr.playEffect(name);
                }
            }
            // for(let i = 0; i < this._starList.length; ++ i){
            //     this._starList[i].alpha = 0;
            // } 
            let img = BaseBitmap.create(`adddice410`);
            img.anchorOffsetX = 44;
            img.anchorOffsetY = 44;
            img.setScale(0);
            img.alpha = 0;
            this.addChild(img); 
            egret.Tween.get(img).to({rotation : -230}, 1300).call(()=>{
                egret.Tween.removeTweens(img);
                img.dispose();
                img = null;
                this._bg.alpha = 1;
                // for(let i = 0; i < this._starList.length; ++ i){
                //     this._starList[i].alpha = 1;
                // } 
                egret.Tween.get(this).to({scaleX : 1.1 , scaleY : 1.1 }, 300).to({scaleX : 1, scaleY : 1}, 200).call(()=>{
                    this.checkAroundAndSelf();
                },this);
            },this);
            egret.Tween.get(img).to({scaleX : 0.8 * 4, scaleY : 0.8 * 4}, 550).to({scaleX : 4, scaleY : 4}, 750);
            egret.Tween.get(img).to({alpha : 1}, 300).wait(500).to({alpha : 0}, 500);
        }
        else{
            if(smoke){
                let clipname = ismirror ? `diceappear2` : `diceappear1`;
                let clip = ComponentMgr.getCustomMovieClip(clipname, null, ismirror ? 70 : 35,BattleBaseEffect);  
                clip.setEndCallBack(()=>{
                    clip.dispose();
                },this);
                clip.playWithTime(1);
                clip.anchorOffsetX = ismirror ? 50 : 25;
                clip.anchorOffsetY = ismirror ? 50 : 25;
                clip.setScale(ismirror ? 1 : 4);
                this.addChild(clip); 
                clip.y = ismirror ? -30 : 0;
            } 
            this.setScale(1 * 0.7);
            egret.Tween.get(this).to({scaleX : 1.1 * 1, scaleY : 1.1 * 1}, 300).to({scaleX : 1, scaleY : 1}, 200).call(()=>{
                this.checkAroundAndSelf();
            },this);
        }
    }

    public powerup(pwlv:number):void
    {
        //播放特效
        let clip = ComponentMgr.getCustomMovieClip(`dicepowerup`, null, 70);
        clip.anchorOffsetX = 150 / 2;
        clip.anchorOffsetY = 150 / 2;
        clip.y = -35;
        clip.playWithTime(1);
        clip.setEndCallBack(()=>{
            clip.dispose();
            clip = null;
        },this);
        this._extraGroup.addChild(clip)

        let txtImg = BaseLoadBitmap.create(`powerupzengfu`);
        txtImg.anchorOffsetX = 61 / 2;
        txtImg.anchorOffsetY = 38 / 2;
        txtImg.alpha = 0;
        this._extraGroup.addChild(txtImg);

        let time = BattleStatus.timeparam;
        let tmpY = 0;
        egret.Tween.get(txtImg).to({alpha : 1, y : -40}, 15 * time).to({y : -55}, 10 * time).to({alpha : 0, y : -65}, 5 * time).call(()=>{
            txtImg.dispose();
            txtImg = null;
        },this);

        this._data.powerup(pwlv);
        if(this.checkIsEffectAround()){
            this.checkAroundAndSelf();
        }
    }

    private checkAroundDice():void{
        let x = this.getPos().x;
        let y = this.getPos().y;


        let list = BattleStatus.scene.getDiceList(this.checkIsMe());
        let isCrit = false;
        for(let i = 1 ; i < 5; ++ i){
            let posx = x;
            let posy = y;
            if(i == 1){
                posy -= 1;
            }
            else if(i == 2){
                posy += 1;
            }
            else if(i == 3){
                posx -= 1;
            }
            else if(i == 4){
                posx += 1;
            }
            let dice  = list[`${posx}_${posy}`];
            if(dice){
                dice.checkBuff();
            }
        }
    }

    public beComposed():void
    {
        //祭品骰子被合成、被暗杀、被boss打、变化等等都加sp
        let data = this._data;
        this.alpha = 0;
        if(this.checkIsEffectAround()){
            this.checkAroundDice();
        }
        this.dispose();
    }

    public checkIsMe():boolean
    {
        return this._data.isMe;
    }

    public getDiceId():string
    {
        return this._data.id;
    }

    public getDiceStars():number
    {
        return this._data.star;
    }

    public getDiceData():DiceData{
        return this._data;
    }

    protected resetStar():void
    {
        // if(this._data.star)
        // {
        //     let iconUrl=Config.DiceCfg.getStarByLv(String(this._data.id),this._data.star);
        //     let l=this._starList.length;
        //     let starNum=this._data.star;
        //     let posCfg=BattleStatus.starCfg[starNum-1];
        //     if(this._data.checkMaxStar())
        //     {
        //         starNum=1;
        //     }
        //     let i=0;
        //     // let scale=DiceScaleEnum.scale_41;
        //     for(i=0;i<starNum;i++)
        //     {
        //         let star:BaseLoadBitmap=this._starList[i];
        //         if(!star)
        //         {
        //             star=BaseLoadBitmap.create(iconUrl);
        //             star.anchorOffsetX=star.width*0.5;
        //             star.anchorOffsetY=star.height*0.5;
        //             this.addChild(star);
        //             this._starList.push(star);
        //         }
        //         else
        //         {
        //             star.setload(iconUrl);
        //         }
        //         star.name="star"+starNum;
        //         star.setPosition(posCfg[i].x,posCfg[i].y);
        //     }
        //     for(i=l-1;i>=starNum;i--)
        //     {
        //         let star:BaseLoadBitmap=this._starList[i];
        //         this._starList.splice(i,1);
        //         star.dispose();
        //     }
        // }
        // this._starTxt.setString(this._data.star+"");
        this._starBmp.texture = ResMgr.getRes("dicestarlv"+this._data.star);
        // this.setChildIndex(this._mask, 999);
        if(this.checkIsMe())
        {
            BattleStatus.hasMaxStar=Math.max(BattleStatus.hasMaxStar,this._data.star);
        }
    }

    /** 快速tick，逻辑上间隔10毫秒 */
    public fastTick():void
    {
        if(this._isSilence){
            return;
        }
        let battleview : any = BattleStatus.scene;
        if(battleview && battleview.isInRound()){
            return;
        }
        this.checkDoAction();
        this.buffExec()
    }

    public getIsSilence():boolean{
        return this._isSilence;
    }

    protected checkBuffEnd():void{
        let keys = Object.keys(this._buffList);
        for(let i = 0; i < keys.length; ++ i){
            if(this._buffList[keys[i]]){
                let unit = this._buffList[keys[i]];
                if(unit.checkEnd()){
                    this.removeBuff(keys[i]);
                }
            }
        }
    }

    /**一些增益buff检测*/
    public checkBuff():boolean
    {
        //攻击类别 ： 暴击、一击毙命率
        if(Config.DiceCfg.checkHasNmAtk(String(this._data.id))){
            this.checkAtkBuff();
        }
        return false;
    }

    private checkIsAroundDice(pos1 : string, pos2 : string):boolean{
        let x = Number(pos1.split(`_`)[0]);
        let y = Number(pos1.split(`_`)[1]);

        let tx = Number(pos2.split(`_`)[0]);
        let ty = Number(pos2.split(`_`)[1]);
        for(let i = 1 ; i < 5; ++ i){
            let posx = x;
            let posy = y;
            if(i == 1){
                posy -= 1;
            }
            else if(i == 2){
                posy += 1;
            }
            else if(i == 3){
                posx -= 1;
            }
            else if(i == 4){
                posx += 1;
            }
            if(posx == tx && posy == ty){
                return true;
            }

        }
        return false;
    }

    private checkAtkBuff():void{
        //检测四周的是否有加成变化
        let x = this.getPos().x;
        let y = this.getPos().y;

        let list = BattleStatus.scene.getDiceList(this.checkIsMe());
        let keys = Object.keys(this._buffList);
        for(let i = 0; i < keys.length; ++ i){
            let buff = this._buffList[keys[i]];
            if(buff && buff.keep == 0){
                let pos = buff.getFromPos();
                if(pos){
                    let posarr = pos.split(`|`);
                    for(let k in posarr){
                        let tpos = posarr[k];
                        if(!list[tpos] || (list[tpos] && (list[tpos].getDiceId() !== buff.diceId || !this.checkIsAroundDice(tpos, `${x}_${y}`)))){
                            this.removeBuff(keys[i], tpos);
                        }
                    }
                }
            }
        }

        for(let i = 1 ; i < 5; ++ i){
            let posx = x;
            let posy = y;
            if(i == 1){
                posy -= 1;
            }
            else if(i == 2){
                posy += 1;
            }
            else if(i == 3){
                posx -= 1;
            }
            else if(i == 4){
                posx += 1;
            }
            let dice  = list[`${posx}_${posy}`];
            let pos = `${posx}_${posy}`;
            //暴击率 不叠加
            if(dice && dice.checkCanAddCrit() > 0 && Config.DiceCfg.checkHasNmAtk(this._data.id)){
                let dicedata = dice.getDiceData();
                let buff = this.checkHasBuff(dicedata.id);
                if(buff){
                    buff.from = `${posx}_${posy}`;
                    buff.crit = Math.max(dice.checkCanAddCrit(),buff.crit);
                    this.updateBuff(buff);
                }
                else{
                    let buffData:IDiceBuffData={diceId:dicedata.id, keep:0, crit:dice.checkCanAddCrit(), cd:0, isMe:dicedata.isMe, from:`${posx}_${posy}`};//this._keep
                    DiceBuff.addBuff(buffData,this);
                }
                // if(!buff || (buff && !buff.judgeFromPos(pos))){
                //     let buffData:IDiceBuffData={diceId:dicedata.id, keep:0, crit:dice.checkCanAddCrit(), cd:0, isMe:dicedata.isMe, from:`${posx}_${posy}`};//this._keep
                //     DiceBuff.addBuff(buffData,this);
                // }
            }
            //一击必杀概率 不叠加
            if(dice && dice.checkCanAddKill() > 0 && Config.DiceCfg.checkHasNmAtk(this._data.id)){
                let dicedata = dice.getDiceData();
                let buff = this.checkHasBuff(dicedata.id);
                if(buff){
                    buff.from = `${posx}_${posy}`;
                    buff.kill = Math.max(dice.checkCanAddKill(),buff.kill);
                    this.updateBuff(buff);
                }
                else{
                    let buffData:IDiceBuffData={diceId:dicedata.id, keep:0, kill:dice.checkCanAddKill(), cd:0, isMe:dicedata.isMe, from:`${posx}_${posy}`};//this._keep
                    DiceBuff.addBuff(buffData,this);
                }
            }
            //攻击速率 不叠加
            if(dice && dice.checkCanAddAtkspeed() > 0 && Config.DiceCfg.checkHasNmAtk(this._data.id)){
                let dicedata = dice.getDiceData();
                let buff = this.checkHasBuff(dicedata.id);
                if(buff){
                    buff.from = `${posx}_${posy}`;
                    buff.atkspeed = Math.max(dice.checkCanAddAtkspeed(),buff.atkspeed);
                    this.updateBuff(buff);
                }
                else{
                    let buffData:IDiceBuffData={diceId:dicedata.id, keep:0, atkspeed:dice.checkCanAddAtkspeed(), cd:0, isMe:dicedata.isMe, from:`${posx}_${posy}`};//this._keep
                    DiceBuff.addBuff(buffData,this);
                }
            }
        }
    }

    public setTarget(monsterList:BaseMonster[]):void
    {
        this._targetList.length=0;
        this._targetList=monsterList||[];
    }

    public checkDoAction():void
    {
        if(this._data)
        {
            let arr=this._data.cdTimeArr;
            let l=arr.length;
            for (let i = 0; i < l; i++) 
            {
                let t=arr[i];
                // if(this.checkIsMe())
                // {
                //     console.log(BattleStatus.checkCdDoTime(this._data.cd,10,t),t,this._data.cd,BattleStatus.battleLogicHasTickTime);
                // }
                if(!!BattleStatus.checkCdDoTime(this._data.cd,t,this._data))
                {
                    this.checkAtk(i);
                }
            }
        }
    }

    protected checkAtk(starIdx:number):void
    {
        let isMe=this._data.isMe;
        let initInfo=Api.BattleVoApi.getInitInfo(isMe);
        // let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
        // let monstersList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let findmonsterDataList = DiceHelper.diceFindMonster(this._data,isMe);
        let l=findmonsterDataList?findmonsterDataList.length:0;
        if(l>0)
        {
            
            // let monster=monstersList[vo.getName()];
            const vo = findmonsterDataList[0];
            if(vo && !vo.lost(isMe))
            {
                this.createBullet(starIdx,findmonsterDataList);
            }
            else
            {
                App.LogUtil.error("mst is died",this._data.id,vo.hashCode);
            }
            // this.normalAtk(monster,initInfo);
            // this.propertyAtk(findmonsterDataList);
        }
    }

    protected checkSpecial1Atk(starIdx:number):void
    {
        // if(this._data.type==5)
        // {
        //     this.createObstacle(starIdx);
        // }
    }

    protected checkSpecial2Atk(starIdx:number):void
    {
        // if(this._data.type==5)
        // {
        //     this.createObstacle(starIdx);
        // }
    }

    /**
     * 放置类陷阱或者障碍物
     * @param starIdx 哪个炮口
     */
    protected createObstacle(starIdx:number):void
    {
        this.playAtkAction();
        let fpos={x:this.x,y:this.y};
        let obstacle=Obstacle.createObstacle(this._data,fpos);
    }

    protected createBullet(starIdx:number,findmonsterDataList:MonsterVo[]):void
    {
        this.playAtkAction();
        let fpos={x:this.x,y:this.y};
        let bullet=Bullet.createBullet(this._data,fpos);
        bullet.atk(findmonsterDataList);
    }

    protected playAtkAction():void
    {
        if(this._bg instanceof BattleDiceEffect)
        {
            this._bg.playAtk(Config.DiceCfg.getAtkEffect(this._data.id, this.getDiceStars()));
        }
    }

    public setPos(x:number,y:number):void
    {
        this._data.setPos(x,y);
    }

    public getPos():{x:number,y:number}
    {
        return {x:this._data.x,y:this._data.y};
    }

    public dragMove(addX:number,addY:number):void
    {
        this.resetPos(addX,addY);
    }

    public resetPos(addX:number=0,addY:number=0,show:boolean=false):void
    {
        if(this._data)
        {
            let {x,y} = this._data.getShowPos(this._data.isMe);
            this.setPosition(x+addX,y+addY);
            if(show){
                this.appearEff(false,false);
            }
        }
    }

    // protected setDamage():void
    // {
    //     let cfg=Config.DiceCfg.getCfgById(this.id);
    //     let pwadd=cfg.getPowerAtkByLv(this.pwlv);
    //     this.damage=this.initdamage+pwadd;

    //     this.property1=cfg.getProperty1ByLv(this.lv)+cfg.getPowerProperty1ByLv(this.pwlv);
    //     this.property2=cfg.getProperty2ByLv(this.lv)+cfg.getPowerProperty2ByLv(this.pwlv);
    // }

    //是否是可以提供一击必杀率加成
    public checkCanAddKill():number{
        let kill = 0;
        let cfg=Config.DiceCfg.getCfgById(this._data.id);
        if(Number(this._data.id) == 406){
            //星数 * 自身几率 + （战斗内power up等级 -1）*0.5%（这个0.5是power up的那个字段
            kill = this._data.star * (cfg.getProperty1ByLv(this._data.lv) + cfg.getPowerProperty1ByLv(this._data.pwlv));
        }
        return kill;//kill
    }

    //是否是可以提供暴击加成
    public checkCanAddCrit():number{
        let crit = 0;
        let cfg=Config.DiceCfg.getCfgById(this._data.id);
        if(Number(this._data.id) == 205){
            crit = this._data.star * (cfg.getProperty1ByLv(this._data.lv) + cfg.getPowerProperty1ByLv(this._data.pwlv));
        }
        return crit;
    }

    //是否是可以提供攻击速率
    public checkCanAddAtkspeed():number{
        let atkspeed = 0;
        let cfg=Config.DiceCfg.getCfgById(this._data.id);
        if(Number(this._data.id) == 202){
            atkspeed = this._data.star * (cfg.getProperty1ByLv(this._data.lv) + cfg.getPowerProperty1ByLv(this._data.pwlv));
        }
        return atkspeed;//kill
    }

    public checkIsEffectAround():boolean{
        return this._data.checkIsDevilDice() || this._data.checkIsCritDice() || this._data.checkIsAtkSpeedDice();
    }

    protected addBuffStatus(addStatus:string):void
    {
        if(BattleStatus.stopActEffect)
        {
            return;
        }
        if(addStatus)
        {
            let key = `${addStatus}`;
            let cfg = Config.DiceCfg.getAddDiceEffById(key);
            let name = `adddice${key}`;
            if(cfg){
                if(RES.hasRes(`${name}1`)){
                    let mv = ComponentMgr.getCustomMovieClip(name,null,cfg.timeparam,BattleCustomEffect);
                    mv.anchorOffsetX = cfg.width / 2;
                    mv.anchorOffsetY = cfg.height / 2;
                    let scale = 4;
                    if(cfg.scale){
                        scale = cfg.scale;
                    }
                    mv.setScale(scale);

                    if(cfg.playnum > 0){
                        mv.setEndCallBack(()=>{
                            mv.dispose();
                            mv = null;
                        }, this);
                    }
                    if(cfg.add){
                        mv.blendMode = egret.BlendMode.ADD;
                    }
                    mv.name = `${addStatus}_dicebuff`;
                    mv.playWithTime(cfg.playnum);
                    this._extraGroup.addChild(mv);
                    if(cfg.tmpy){
                        mv.y = cfg.tmpy;
                    }
                    
                    // mv.setPosition(this._bg.x+this._bg.width/2,this._bg.y+this._bg.height/2);
                }
                else{
                    if(cfg.type == `randomFly`){
                        for(let i = 0; i < 4; ++ i){
                            let bmp = BaseBitmap.create(`adddice${addStatus}`);
                            bmp.name = `${addStatus}${i}_dicebuff`;
      
                            bmp.anchorOffsetX = bmp.width / 2;
                            bmp.anchorOffsetY = bmp.height / 2;
                            bmp.alpha = 0;
                            bmp.setScale(Math.random()>0.5?1:0.5);

                            let startX = App.MathUtil.getRandom(-bmp.width,bmp.width);//(0.5 * i - 1) * bmp.width;
                            let startY = 0;
                            bmp.setPosition(startX,startY);
                           

                            let time = BattleStatus.timeparam;
                            egret.Tween.get(bmp).wait(i * 10 * time). 
                            to({y:-38, alpha : 1}, 10 * time).
                            to({y:-65, alpha : 0}, 10 * time).call(()=>{
                                bmp.alpha = 0;
                                bmp.setScale(Math.random()>0.5?1:0.5);
                                bmp.x = App.MathUtil.getRandom(-bmp.width,bmp.width);;
                                bmp.y = 0;
                                egret.Tween.get(bmp, {loop : true}).wait(20 * time).   
                                to({y:-38, alpha : 1}, 10 * time).
                                to({y:-65, alpha : 0}, 10 * time).call(()=>{
                                    bmp.alpha = 0;
                                    bmp.setScale(Math.random()>0.5?1:0.5);
                                    bmp.x = App.MathUtil.getRandom(-bmp.width,bmp.width);;
                                    bmp.y = 0;
                                });
                                this._extraGroup.addChild(bmp);

                            });
                            this._extraGroup.addChild(bmp);
                        }
                    }
                }
            }
            else{
                if(key == `418_1` || key == `418_2`){
                    let timebg = BaseBitmap.create(name);
                    timebg.anchorOffsetX = 29;
                    timebg.anchorOffsetY = 29;
                    timebg.setScale(4);
                    timebg.setPosition(4,4);
                    timebg.name = `${key}_dicebuff`;
                    this._extraGroup.addChild(timebg);

                    let point = BaseBitmap.create(`adddicepoint${key}`);
                    point.anchorOffsetX = 4;
                    point.anchorOffsetY = 8;
                    point.setScale(4);
                    this._extraGroup.addChild(point);
                    point.name = `point${key}_dicebuff`;

                    egret.Tween.get(point, {loop : true}).to({rotation : key == `418_1` ? 360 : -360}, 2000);
                }
            }
        }
    }

    protected removeBuffAddStatus(stringid:string):void{
       
        if(stringid == `418_1` || stringid == `418_2`){
            let timebg = <BaseLoadBitmap>this._extraGroup.getChildByName(`${stringid}_dicebuff`);
            if(timebg){
                timebg.dispose();
                timebg = null;
            }
            let point = <BaseLoadBitmap>this._extraGroup.getChildByName(`point${stringid}_dicebuff`);
            if(point){
                egret.Tween.removeTweens(point);
                point.dispose();
                point = null;
            }
        }
        else{
            let clipname = `${stringid}_dicebuff`;
            let name = `adddice${stringid}`;
            let cfg = Config.DiceCfg.getAddDiceEffById(stringid);
            if(cfg){
                if(RES.hasRes(`${name}1`)){
                    let clip = <CustomMovieClip>this._extraGroup.getChildByName(clipname);
                    if(clip){
                        clip.dispose();
                        clip = null;
                    }
                }
                else{
                    if(cfg.type == `randomFly`){
                        for(let i = 0; i < 4; ++ i){
                            let bmp = <BaseBitmap>this._extraGroup.getChildByName(`${stringid}${i}_dicebuff`);
                            if(bmp){
                                egret.Tween.removeTweens(bmp);
                                bmp.dispose();
                                bmp = null;
                            }
                        }
                    }
                }
            }
            else{

            }
        }
    }

    public checkHasBuff(diceId:string):DiceBuff
    {
        return this._buffList[diceId];
    }

    public addBuff(buff:DiceBuff):void
    {
        if(!this._buffList[buff.diceId])
        {
            this._buffList[buff.diceId]=buff;
            if(buff.atkspeed)
            {
                // this._data.changeAtkSpeed(buff.atkspeed,true);
                this.addBuffStatus(buff.diceId);
            }
            if(buff.crit)
            {
                this._data.changeCrit(buff.crit,true);
                this.addBuffStatus(buff.diceId);
            }
            if(buff.kill)
            {
                this._data.changeKill(buff.kill,true);
                this.addBuffStatus(buff.diceId);
            }
            if(buff.timespeed)
            {
                this._data.changeTimeSpeed(Math.abs(buff.timespeed),buff.timespeed>0);
                this.addBuffStatus(`418_${buff.timespeed>0?1:2}`);
            }
        }
    }

    public removeBuff(diceId:string, pos?:string):boolean
    {
        let flag = false;
        if(this._buffList[diceId])
        {
            let buff = this._buffList[diceId];
            if(pos){
                if(buff.judgeFromPos(pos)){
                    if(buff.crit)
                    {
                        buff.crit -= (buff.crit / buff.overlap);
                        this._data.changeCrit(buff.crit,true);
                    }
                    if(buff.kill)
                    {
                        buff.kill -= (buff.kill / buff.overlap);
                        this._data.changeKill(buff.kill,true);
                    }
                    buff.removeFromPos(pos);
                    if(buff.overlap == 1){
                        flag = true;
                        this.removeBuffAddStatus(buff.diceId);
                        delete this._buffList[buff.diceId];
                    }
                    else{
                        buff.overlap -= 1;
                    }
                    
                }
            }
            else{
                if(buff.atkspeed)
                {
                    buff.atkspeed -= (buff.atkspeed / buff.overlap);
                    // this._data.changeAtkSpeed(buff.atkspeed,false);
                }
                if(buff.crit)
                {
                    buff.crit -= (buff.crit / buff.overlap);
                    this._data.changeCrit(buff.crit,true);
                }
                if(buff.kill)
                {
                    buff.kill -= (buff.kill / buff.overlap);
                    this._data.changeKill(buff.kill,true);
                }
                if(buff.timespeed)
                {
                    if(buff.overlap == 1){
                        this.removeBuffAddStatus(`${buff.diceId}_${buff.timespeed > 0 ? 1 : 2}`);
                    }
                    this._data.changeTimeSpeed(Math.abs(buff.timespeed),buff.timespeed<0);
                }
                if(buff.overlap == 1){
                    flag = true;
                    this.removeBuffAddStatus(buff.diceId);
                    delete this._buffList[buff.diceId];
                }
                else{
                    buff.overlap -= 1;
                }
            }
        }
        return flag;
    }

    public updateBuff(buff:DiceBuff):void
    {
        if(buff.atkspeed)
        {
            // this._data.changeAtkSpeed(buff.atkspeed,true);
        }
        if(buff.crit){
            this._data.changeCrit(buff.crit,true);
        }
        if(buff.kill)
        {
            this._data.changeKill(buff.kill,true);
        }
        if(buff.timespeed)
        {
            this._data.changeTimeSpeed(Math.abs(buff.timespeed),buff.timespeed>0);
        }
    }

    protected buffExec():void
    {
        let keys=Object.keys(this._buffList);
        let l=keys.length;
        let atkspeed = 0;
        if(l>0)
        {
            keys.sort((a,b)=>{
                return Number(a)-Number(b);
            });
            for(let i = 0; i < l; i++) {
                let buff=this._buffList[keys[i]];
                if(buff){
                    if(buff.checkEnd()){
                        this.removeBuff(buff.diceId);
                    }
                    else{
                        if(buff.atkspeed)
                        {
                            atkspeed += buff.atkspeed;
                        }
                        if(buff.timespeed)
                        {
                            this._data.changeTimeSpeed(Math.abs(buff.timespeed),buff.timespeed>0);
                        }
                    }
                }
            }
        }
        if(this._data){
            this._data.changeAtkSpeed(atkspeed,true);
        }
    }

    //被沉默 什么都做不了的
    public setSilence():void{
        this._isSilence = true;
        if(!this._extraGroup.getChildByName(`silence`)){
            let clip = ComponentMgr.getCustomMovieClip(`dicesilence`, null, 70);
            clip.anchorOffsetX = 240 / 2;
            clip.anchorOffsetY = 240 / 2;
            clip.y = -30;
            this._extraGroup.addChild(clip);
            clip.name = `silence`;
            clip.playWithTime(-1);

            if(this.checkIsEffectAround()){
                let x = this.getPos().x;
                let y = this.getPos().y;
                if(BattleStatus.scene){
                    let list = BattleStatus.scene.getDiceList(this.checkIsMe());
                    for(let i = 1 ; i < 5; ++ i){
                        let posx = x;
                        let posy = y;
                        if(i == 1){
                            posy -= 1;
                        }
                        else if(i == 2){
                            posy += 1;
                        }
                        else if(i == 3){
                            posx -= 1;
                        }
                        else if(i == 4){
                            posx += 1;
                        }
                        let dice  = list[`${posx}_${posy}`];
                        if(dice && Config.DiceCfg.checkHasNmAtk(dice.getDiceId())){
                            dice.removeBuff(this.getDiceId(), `${x}_${y}`);
                        }
                    }
                }
            }
        }
        //加动画效果
        //this._mask.visible = true;
        // App.DisplayUtil.changeToGray(this);
    }

    public removeSilence():void{
        this._isSilence = false;
        let clip = <CustomMovieClip>this._extraGroup.getChildByName(`silence`);
        if(clip){
            clip.alpha = 0;
            clip.dispose();
            clip = null;
        }

        if(this.checkIsEffectAround()){
            let x = this.getPos().x;
            let y = this.getPos().y;
            if(BattleStatus.scene){
                let list = BattleStatus.scene.getDiceList(this.checkIsMe());
                for(let i = 1 ; i < 5; ++ i){
                    let posx = x;
                    let posy = y;
                    if(i == 1){
                        posy -= 1;
                    }
                    else if(i == 2){
                        posy += 1;
                    }
                    else if(i == 3){
                        posx -= 1;
                    }
                    else if(i == 4){
                        posx += 1;
                    }
                    let dice  = list[`${posx}_${posy}`];
                    if(dice && Config.DiceCfg.checkHasNmAtk(dice.getDiceId())){
                        dice.checkAtkBuff();
                    }
                }
            }
        }
        // this._mask.visible = false;
        // App.DisplayUtil.changeToNormal(this);

    }

    //骑士变化
    public changeSelf():void{
        if(BattleStatus.scene){
            BattleStatus.scene.changeDice(this._data.isMe, BattleStatus.battleLogicHasTickTime/this.getDiceData().index+Api.BattleVoApi.getBattleData(this._data.isMe).uid, BattleStatus.frame, this._data.posStr, this._data.star);
        }
    }

    public dispose():void
    {
        this._extraGroup.removeChildren();
        this._data=null;
        this._targetList.length=0;
        App.MsgHelper.removeEvt(MsgConst.DICE_MOVE_FORCOMPOSE, this.movein, this);
        // this._mask = null;
        this._extraGroup.dispose();
        App.ObjectUtil.clear(this._buffList);
        this._isSilence = false;
        this._starBmp=null;
        this._obs.length = 0;
        this.removeTouchTap();
        super.dispose();
    }
}

/**
 * 骰子绑定数据类
 * author 陈可
 * date 2020/4/23
 * @class DiceData
 */
class DiceData extends egret.HashObject
{
    public cost:number=0;
    public posStr:string;
    public x:number
    public y:number;
    private _star:number=0;
    public type:number;
    public birthTime:number;
    public cd:number;
    public initcd:number=0;
    public initdamage:number;
    public damage:number;
    public id:string;
    public cdTimeArr:number[]=[];
    public isMe:boolean=false;
    public crit:number=0;
    public initcrit:number=0;
    /**一击必杀概率 */
    public kill:number=0;
    public initkill:number=0;
    /**特殊技能发动的cd时间*/
    public special1cd=0;
    public special2cd=0;
    public special1cdTimeArr:number[]=[];
    public special2cdTimeArr:number[]=[];

    /**能量升级等级 */
    public pwlv:number=1;
    /**骰子等级 */
    public lv:number=1;
    /**攻击目标类型  1:前边  2：强敌  3：随机（纯随机）  4：随机（优先顺序）   */
    public target:number=1;
    /**特性1 */
    public property1:number=0;
    /**特性2 */
    public property2:number=0;
    /**特性3 */
    public property3:number[]=[];

    public isSun:boolean=false;
    public index:number=0;

    public constructor()
    {
        super();
    }

    public initData(upinfo:dice.sc_battle_init.IUpInfo,pos:string,star?:number):void
    {
        let cfg=Config.DiceCfg.getCfgById(upinfo.id);
        this.id=upinfo.id;
        this.lv=upinfo.lv;
        this.pwlv=upinfo.pwlv;
        this.target=cfg.target;
        this.property3=cfg.property3;
        this.isSun=false;
        if(!upinfo.pwlv)
        {
            upinfo.pwlv=1;
        }
        if(pos)
        {
            this.posStr=pos;
            let posArr=pos.split("_");
            this.x=Number(posArr[0]);
            this.y=Number(posArr[1]);
        }
        let startStar=Number(egret.getOption("star"))||1;
        this.star=(star||this.star||startStar);
        this.type=cfg.type;
        this.cd=cfg.getAtkSpeedByLv(this.lv)*1000;
        this.initcd = this.cd;
        this.initdamage=cfg.getAtkByLv(this.lv);
        this.setDamage();
        this.crit=cfg.getTotalCritByLv(this.lv);
        this.initcrit = this.crit;
        this.kill =0;
        this.initkill=0;
        this.setCdTimeArr();
        this.setspecial1CdTimeArr();
        this.setspecial2CdTimeArr();
    }

    public set star(_star:number)
    {
        if(this.isMe&&_star>this._star&&_star>=3&&(!BattleStatus.changeDiceing))
        {
            if(!BattleStatus.maxStarList[String(_star)])
            {
                BattleStatus.maxStarList[String(_star)]=1;
            }
            else
            {
                BattleStatus.maxStarList[String(_star)]++;
            }
        }
        this._star=_star;
    }
    public get star():number
    {
        return this._star;
    }

    public setBirthTime(time:number):void
    {
        this.birthTime=time;
        this.isMe?++BattleStatus.meDiceIndex:++BattleStatus.targetDiceIndex;
        this.index = this.isMe?BattleStatus.meDiceIndex:BattleStatus.targetDiceIndex;
        this.setCdTimeArr();
        this.setspecial1CdTimeArr();
        this.setspecial2CdTimeArr();
    }

    public checkExtDamage():boolean
    {
        return Config.DiceCfg.checkHasExtAtk(String(this.id));
    }

    public getShowPos(isMe:boolean):{x:number,y:number}
    {
        let startX:number=BattleStatus.getStartX(isMe);
        let startY:number=BattleStatus.getStartY(isMe);
        let vle=(BattleStatus.battleType==1&&isMe)?1:-1;
        if(BattleStatus.battleType==1)
        {
            vle=isMe?1:-1;
        }
        else if(BattleStatus.battleType==2)
        {
            vle=1;
        }
        let yle=isMe?1:-1;
        let size=BattleStatus.getCeilSize();
        let x = startX+vle*this.x*size.w;
        let y = startY+yle*size.h*this.y;
        return {x:x,y:y};
    }

    public getDmgData():{dmg:number,isCrit:boolean}
    {
        let dmgData:{dmg:number,isCrit:boolean}=null;
        if(Config.DiceCfg.checkHasNmAtk(String(this.id)))
        {
            let initInfo=Api.BattleVoApi.getInitInfo(this.isMe);
            let addCritScale=0;
            let isCrit:boolean=false;
            if(this.checkCrit(initInfo.uid))
            {
                isCrit=true;
                addCritScale=Math.max(0,(initInfo.crivalue-100)/100);
            }
            if(isCrit)
            {
                App.LogUtil.log(this.isMe,"使用暴击",addCritScale,this.damage*(1+addCritScale));

            }
            dmgData={dmg:this.damage*(1+addCritScale),isCrit:isCrit};
        }
        return dmgData;
    }

    protected setDamage():void
    {
        let cfg=Config.DiceCfg.getCfgById(this.id);
        let pwadd=cfg.getPowerAtkByLv(this.pwlv);
        this.damage=this.initdamage+pwadd;

        this.property1=cfg.getProperty1ByLv(this.lv)+cfg.getPowerProperty1ByLv(this.pwlv);
        this.property2=cfg.getProperty2ByLv(this.lv)+cfg.getPowerProperty2ByLv(this.pwlv);
    }

    public powerup(pwlv:number):void
    {
        this.pwlv=pwlv;
        this.setDamage();
    }

    public checkCrit(uid:number):boolean
    {
        let crit = this.crit;
        let randomvalue = App.MathUtil.seededRandom(0,1,BattleStatus.battleLogicHasTickTime/(this.index));
        return randomvalue > 0 && randomvalue<=crit;
    }

    //一击必杀概率
    public checkIsKill(uid:number):boolean
    {
        let kill = this.kill;
        let randomvalue = App.MathUtil.seededRandom(0,1,BattleStatus.battleLogicHasTickTime/(this.index));
        return randomvalue > 0 && randomvalue<=kill;
    }

    //被暗杀 降低星星
    public bekilled(pvp : boolean):void{
        if(pvp){
            if(this.star > 1){
                this.star -= 1;
            }
        }
        else{
            if(!this.checkMaxStar()){
                this.star += 1;
            }
        }
        this.birthTime=BattleStatus.battleLogicHasTickTime;
        this.setCdTimeArr();
    }

    public setCdTimeArr(time?:number):void
    {
        if(!time){
            time = this.birthTime;
        }
        let star = this.star;
        if(this.id == `414`){
            star = 1;
        }
        this.cdTimeArr=BattleStatus.formatCdPartTime(this.cd,time,star);
    }

    public setspecial1CdTimeArr(time?:number):void
    {
        if(!time){
            time = this.birthTime;
        }
        if(this.special1cd){
            this.special1cdTimeArr=BattleStatus.formatCdPartTime(this.special1cd,time);
        }
    }

    public setspecial2CdTimeArr(time?:number):void
    {
        if(!time){
            time = this.birthTime;
        }
        if(this.special2cd){
            this.special2cdTimeArr=BattleStatus.formatCdPartTime(this.special2cd,time);
        }
    }

    public setPos(x:number,y:number):void
    {
        this.x=x;
        this.y=y;
        this.posStr=this.x+"_"+this.y;
        // this.cdTimeArr=[];
        // this.special1cdTimeArr=[];
        // this.special2cdTimeArr=[];
    }
    /**
     * 改变攻击速度
     * @param speedScale 倍数
     * @param isAdd 是否是加速
     */
    public changeAtkSpeed(speedScale:number,isAdd:boolean):void
    {
        let tmpSpeed = 0;
        if(isAdd){
            tmpSpeed = this.initcd / (speedScale + 1); //this.cd - this.initcd / speedScale * (speedScale - 1);
        }
        else{
            tmpSpeed = this.cd * (speedScale + 1);
        }
        let cd = Math.min(this.initcd, Math.max(Math.ceil(tmpSpeed/BattleStatus.minLogicFrame)*BattleStatus.minLogicFrame,Config.GamebaseCfg.maxAtkSpeed * 1000));
        if(cd !== this.cd){
            this.cd = cd;
            this.setCdTimeArr();
        }
        // this._speedScale=Math.min(Config.GamebaseCfg.maxDeSpeed,speedScale);
        //     // this.speed=this._initSpeed*(1-this._speedScale)**BattleStatus.logicScale;
        //     this.speed=(this._initSpeed+Math.floor(this.moveDis/this._initSpeed)*this._addSpeed)*(1-this._speedScale)*BattleStatus.logicScale;
    }
     /**
     * 改变暴击
     * @param speedScale 百分比
     * @param isAdd 是否是加速
     */
    public changeCrit(speedScale:number,isAdd:boolean):void
    {
        let crit = 0;
        let cfg = Config.DiceCfg.getCfgById(this.id);
        if(isAdd){
            crit = this.initcrit + speedScale;
        }
        else{
            crit = this.initcrit - speedScale;
        }
        this.crit = crit;
    }
    /**
     * 改变一击必杀
     * @param speedScale 百分比
     * @param isAdd 是否是加速
     */
    public changeKill(kill:number,isAdd:boolean):void
    {
        let tmpkill = 0;
        if(isAdd){
            tmpkill = this.initkill + kill;
        }
        else{
            tmpkill = this.initkill - kill;
        }
        this.kill = tmpkill;
    }

    public rebackSpeed(speed:number,isAdd:boolean):void{
        let tmpSpeed = 0;
        if(isAdd){
            tmpSpeed = this.cd - this.initcd * Math.abs(speed);
            //tmpSpeed = this.initcd / (1 + speed);
        }
        else{
            tmpSpeed = this.cd + this.initcd * Math.abs(speed);
        }
        this.cd = Math.max(Math.ceil(tmpSpeed/BattleStatus.minLogicFrame)*BattleStatus.minLogicFrame,BattleStatus.minLogicFrame);
    }

    /**
     * 改变特殊cd
     * @param speedScale 百分比
     * @param isAdd 是否是加速
     */
    public changeTimeSpeed(speed:number,isadd:boolean,isinit:boolean=false):void{
        let tmpSpeed = 0;
        if(isadd){
            tmpSpeed =  isinit?this.initcd:this.cd - this.initcd * speed;
            //tmpSpeed = this.initcd / (1 + speed);
        }
        else{
            tmpSpeed = isinit?this.initcd:this.cd + this.initcd * speed;
        }
        this.cd = Math.max(Math.ceil(tmpSpeed/BattleStatus.minLogicFrame)*BattleStatus.minLogicFrame,BattleStatus.minLogicFrame);
        this.setCdTimeArr();
    }
    //是否是适应骰子
    public checkIsAdapt():boolean{
        return Number(this.id) == 307;
    }

    //是否是小丑镜像骰子
    public checkIsMirror():boolean{
        return Number(this.id) == 404;
    }

    //是否是祭品骰子
    public checkIsAddSp():boolean{
        return Number(this.id) == 207;
    }

    //是否是刺杀骰子
    public checkIsKillDice():boolean{
        return Number(this.id) == 412;
    }

    //是否是核爆骰子
    public checkIsNuclearDice():boolean{
        return Number(this.id) == 401;
    }

    //是否是可以组合搭配的骰子
    public checkCanComposeAny(id:string):boolean{
        let arr = [307, 404, 416, 305]
        return arr.indexOf(Number(id)) > -1;
    }

    //是否是齿轮拼接
    public checkIsGearDice():boolean{
        return Number(this.id) == 306;
    }

    //是否是会心骰子
    public checkIsCritDice():boolean{
        return Number(this.id) == 205;
    }

    //是否是地狱骰子
    public checkIsDevilDice():boolean{
        return Number(this.id) == 406;
    }

    //是否是祷告骰子
    public checkIsAtkSpeedDice():boolean{
        return Number(this.id) == 202;
    }


    //是否是枪械
    public checkIsGunDice():boolean{
        return Number(this.id) == 414;
    }

    //是否是换位
    public checkIsChangePosDice():boolean{
        return Number(this.id) == 305;
    }

    //是否是召唤
    public checkIsSummonDice():boolean{
        return Number(this.id) == 410;
    }

    //是否是营养
    public checkIsNutritionDice():boolean{
        return Number(this.id) == 416;
    }

    //是否是太阳
    public checkIsSunDice():boolean{
        return Number(this.id) == 411;
    }

    //是否是转移骰子
    public checkIsTransferDice():boolean{
        return Number(this.id) == 417;
    }

    public checkMaxStar():boolean
    {
        return this.star>=Config.DiceCfg.maxStar;
    }

    public getDiceIsChangeSun():boolean
    {
        return this.isSun;
    }

    public setDiceIsChangeSun(bool):void
    {
        this.isSun = bool;
    }


    public dispose():void
    {
    }
}