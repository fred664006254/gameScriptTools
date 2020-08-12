class BaseMonster extends BaseDisplayObjectContainer
{
    protected _data:MonsterVo;
    // private _hpTxt:BaseTextField;
    private _isDie:boolean=false;
    private _isMe:boolean=false;
    // private _moveIdx:number=0;
    private _offPos:number=0;
    protected _monster:BaseLoadBitmap;
    private _buffList:{[diceId:string]:MonsterBuff}={};
    private _hpBg:BaseBitmap;
    private _hpBgArrow:BaseBitmap;
    protected _hpTxt:TextureText;


    public constructor(data:MonsterVo,isMe:boolean,notAdd?:boolean)
    {
        super();
        this._isMe=isMe;
        data.isMe=isMe;
        this.init(data,notAdd);
        this.initEventListener();
    }

    public isBoss():boolean{
        return this._data.getIsBoss();
    }

    protected init(data:MonsterVo, notAdd?:boolean):void
    {
        this._data=data;
        let img:string=null;
        let isMv:boolean=true;
        let monster:BaseLoadBitmap|CustomMovieClip=null;
        if(data.getIsBoss())
        {
            img=Config.BattleCfg.getBossIcon(data.getBossId());
        }
        else
        {
            img=this.getMonsterImg();
        }
        monster=ComponentMgr.getCustomMovieClip(img,NaN,150,BattleCustomEffect);
        this._monster = monster;
        monster.addEventListener(MsgConst.BT_EFFECT_FIRST_SHOW,this.showHpProgress,this);
        (<BattleCustomEffect>monster).playWithTime(0);
        if((!this._isMe)&&BattleStatus.battleType==1)
        {
            monster.scaleX=-1;
        }

        this.addChild(monster);
        // monster.setPosition(-monster.width*0.5,-monster.height*0.5);
        // this._hpTxt=ComponentMgr.getTextField(""+data.hp,20);
        // this._hpTxt.width=monster.width;
        // this._hpTxt.textAlign=egret.HorizontalAlign.CENTER;
        // this._hpTxt.setPosition(-this._hpTxt.width*0.5,-this._hpTxt.height*0.5);
        // this.addChild(this._hpTxt);

        this.name=this._data.getName();
        
        let limitData=BattleStatus.getLimitPos();
        let posData=this._isMe?limitData.me:limitData.target;
        let {w,h} = GameConfig.monsterSize[data.type||1];
        this._offPos=Math.min(w,h)*0.5*0.8;
        this._data.offPos=this._offPos;
        this.setPosition(posData.pos0.x,posData.pos0.y+(this._isMe?1:-1)*this._offPos);
        this._data.moveStatus=0;
        if(!notAdd){
            BattleStatus.createAddGroupList(data);
        }
    }

    protected showHpProgress(e:egret.Event):void
    {
        this._monster&&this._monster.removeEventListener(MsgConst.BT_EFFECT_FIRST_SHOW,this.showHpProgress,this);
        if(!this._hpBg)
        {
            this._hpBg=BaseBitmap.create("btmsthpbg");
            this.addChild(this._hpBg);
            this._hpBg.y=-this._monster.height*0.5-this._hpBg.height+this._monster.height*0.1;
            this._hpBgArrow=BaseBitmap.create("btmsthpbg_arrow");
            this._hpBgArrow.anchorOffsetX=this._hpBgArrow.width*0.5;
            this._hpBgArrow.y=this._hpBg.y+this._hpBg.height-1;
            this.addChild(this._hpBgArrow);
            
            // this._hpTxt=<BaseBitmapText>ComponentMgr.getBitmapText(""+this._data.hp,"msthp_fnt",NaN,NaN,true);
            this._hpTxt=ComponentMgr.getTextureText(""+this._data.hp,"btmsttnum");
            this._hpTxt.letterSpacing=-2;
            this._hpTxt.y=this._hpBg.y+(this._hpTxt.height-this._hpBg.height)*0.5+2;
            this.addChild(this._hpTxt);
            this.setHpTxt();
        }
    }

    protected getMonsterImg():string{
        return Config.BattleCfg.getMonsterIcon(this._data.type)
    }

    public move(moveCallback:(monsterData:MonsterVo)=>void,thisObj:any):void
    {
        let limitData=BattleStatus.getLimitPos();
        let posData=this._isMe?limitData.me:limitData.target;
        let nextPosIdx=this._data.moveStatus+1;
        let nextLimitPos:{x:number,y:number}=posData['pos'+nextPosIdx];
        let nextEndPos:{x:number,y:number}=posData['pos'+(nextPosIdx+1)];
        let speedScaleY=1;
        let moveDis:number=0;
        let isSurvive:boolean=false;
        if(nextLimitPos)
        {
            let diffY=0;
            let speed=this._data?this._data.getSpeed():0
            switch(this._data.moveStatus)
            {
                case MonsterMoveStatus.GO:
                    diffY=nextLimitPos.y-this.y;
                    speedScaleY=diffY>=0?1:-1;
                    if(Math.abs(diffY)>speed)
                    {
                        let tmpDis:number=speedScaleY*speed;
                        this.y+=tmpDis;
                        moveDis=Math.abs(tmpDis);
                    }
                    else
                    {
                        this.y+=diffY;
                        let speedScaleX = nextEndPos.x>=nextLimitPos.x?1:-1;
                        
                        let tmpDis:number=speedScaleX*(speed-Math.abs(diffY));
                        this.x+=tmpDis;
                        this._data.moveStatus++;
                        moveDis=Math.abs(diffY)+Math.abs(tmpDis);
                        if(moveCallback)
                        {
                            moveCallback.call(thisObj,this._data);
                        }
                    }
                    moveDis&&this.moveDis(moveDis);
                    this.buffExec();
                    break;
                case MonsterMoveStatus.PUBLIC:
                    let nextLimitX=nextLimitPos.x;
                    if(BattleStatus.battleType==2)
                    {
                        nextLimitX=nextLimitX-this._offPos;
                    }
                    let diffX=nextLimitX-this.x;
                    let speedScaleX=diffX>=0?1:-1;
                    if(Math.abs(diffX)>speed)
                    {
                        let tmpDis:number=speedScaleX*speed;
                        this.x+=tmpDis;
                        moveDis=Math.abs(tmpDis);
                        this.buffExec();
                    }
                    else
                    {
                        if(nextEndPos)
                        {
                            this.x+=diffX;
                            let speedScaleY = nextEndPos.y>=nextLimitPos.y?1:-1;

                            let tmpDis:number=speedScaleY*(speed-Math.abs(diffX));

                            this.y+=tmpDis;
                            moveDis=Math.abs(diffX)+Math.abs(tmpDis);
                            this.buffExec();
                        }
                        else
                        {
                            this._data&&(this._data.survive=true);
                            isSurvive=true;
                        }
                        this._data.moveStatus++;
                        if(isSurvive)
                        {
                            App.MsgHelper.dispEvt(MsgConst.MONSTER_SURVIVE,this._data);
                        }
                        if(moveCallback)
                        {
                            moveCallback.call(thisObj,this._data);
                            if(!nextEndPos)
                            {
                                this.dispose();
                            }
                        }
                    }
                    moveDis&&this.moveDis(moveDis);
                    break;
                case MonsterMoveStatus.BACK:
                    let nextLimitY=nextLimitPos.y;
                    if(BattleStatus.battleType==1)
                    {
                        let scale = this._isMe?-1:1;
                        nextLimitY=nextLimitY+scale*this._offPos;
                    }
                    diffY=nextLimitY-this.y;
                    speedScaleY=diffY>=0?1:-1;
                    if(Math.abs(diffY)>speed)
                    {
                        let tmpDis:number=speedScaleY*speed;
                        this.y+=tmpDis;
                        moveDis=Math.abs(tmpDis);
                        this.buffExec();
                    }
                    else
                    {
                        if(nextEndPos)
                        {
                            this.y+=diffY;
                            let speedScaleX = nextEndPos.x>=nextLimitPos.x?1:-1;
                            let tmpDis:number=speedScaleX*(speed-Math.abs(diffY));
                            this.x+=tmpDis;
                            moveDis=Math.abs(diffY)+Math.abs(tmpDis);
                            this.buffExec();
                        }
                        else
                        {
                            this._data&&(this._data.survive=true);
                            isSurvive=true;
                        }
                        this._data.moveStatus++;
                        if(isSurvive)
                        {
                            App.MsgHelper.dispEvt(MsgConst.MONSTER_SURVIVE,this._data);
                        }
                        if(moveCallback)
                        {
                            moveCallback.call(thisObj,this._data);
                            if(!nextEndPos)
                            {
                                this.dispose();
                            }
                        }
                    }
                    moveDis&&this.moveDis(moveDis);
                    break;
            }
        }

        let effarr = [`atkeffect102`,`atkeffect309`];
        for(let i = 0; i < effarr.length; ++ i){
            let eff = <CustomMovieClip>this.getChildByName(effarr[i]);
            if(eff){
                let monstername = eff[`mvData`];
                let monster = this.isMe ? BattleStatus.meMonsterList[monstername] : BattleStatus.targetMonsterList[monstername];
                if(monster){
                    let w = 33;
                    let diffX = monster.x-this.x;
                    let diffY = monster.y-this.y;
                    let angle = Math.atan2(diffY,diffX);
                    eff.rotation=angle*180/Math.PI;
                    let dis = Math.sqrt(diffX*diffX+diffY*diffY);
                    if(dis<w)
                    {
                        eff.scaleX=dis/w;
                    }
                    else
                    {
                        eff.width=dis;
                    }
                }
                else{
                    eff.dispose();
                    eff = null;
                }
            }
        }
    }

    public lost(isMe:boolean):boolean
    {
        return this._data?this._data.lost(isMe):true;
    }

    private moveDis(speed:number):void
    {
        if(this._data)
        {
            this._data.move(speed);
            BattleStatus.checkGroup(this._data);
        }
    }

    public isDie():boolean
    {
        return this._data?this._data.hp<=0:this._isDie;
    }

    public isMoveEnd():boolean
    {
        return this._data.isMoveEnd();
    }

    public isMe():boolean
    {
        return this._isMe;
    }

    public getMoveStatus():number
    {
        return this._data.moveStatus;
    }

    public resetToStart():void{
        let limitData=BattleStatus.getLimitPos();
        let posData=this._isMe?limitData.me:limitData.target;
        this.setPosition(posData.pos0.x,posData.pos0.y+(this._isMe?1:-1)*this._offPos);
        if(this._data.isPublic())
        {
            let mDataList = this._data.isMe?BattleStatus.targetMonsterDataList:BattleStatus.meMonsterDataList;
            let mList = this._data.isMe?BattleStatus.targetMonsterList:BattleStatus.meMonsterList;
            let idx=mDataList.indexOf(this._data);
            if(idx>-1)
            {
                mDataList.splice(idx,1);
            }
            delete mList[this._data.getName()];
            let maxHpList = BattleStatus.getMaxHpList(!this._data.isMe);
            let hpIdx=maxHpList.indexOf(this._data);
            if(hpIdx>-1)
            {
                maxHpList.splice(hpIdx,1);
            }
            
        }
        this._data.reset();
    }

    public addBeAtkStatus(addStatus:string, isbuff?:boolean):void
    {
        if(BattleStatus.stopActEffect)
        {
            return;
        }
        if(addStatus)
        {
            let clipName = `${addStatus}${isbuff?`_buff`:``}`;
            let flag = false;
            if(Config.DiceCfg.getCanAddEffById(addStatus)){
                flag = true;
            }
            else{
                flag = !this.getChildByName(clipName);
            }
            if(flag){
                let hpTxtIdx=this.getChildIndex(this._monster)+1;
                let key = this._data.getAddStatus(addStatus);
                let cfg = Config.DiceCfg.getAddMstEffById(key);
                if(!cfg){
                    key = `${addStatus}`;
                    cfg =  Config.DiceCfg.getAddMstEffById(key);
                }
                let name = `addmst${key}`;
                if(cfg){
                    if(RES.hasRes(`${name}1`)){
                        let mv = ComponentMgr.getCustomMovieClip(name,null,cfg.timeparam,BattleCustomEffect);
                        if(cfg.playnum > 0&&(!cfg.keep)){
                            mv.setEndCallBack(()=>{
                                mv.dispose();
                                mv = null;
                            }, this);
                        }
                        if(cfg.add){
                            mv.blendMode = egret.BlendMode.ADD;
                        }
                        mv.name = clipName;
                        
                        mv.playWithTime(cfg.playnum);
                        this.addChildAt(mv,hpTxtIdx);
                        mv.anchorOffsetX = cfg.width / 2;
                        mv.anchorOffsetY = cfg.height / 2;
    
                        let scale = 2;
                        if(this._data.getIsBoss() && cfg.bossscale){
                            scale = cfg.bossscale||4;
                        }
                        if(cfg[`type${this._data.type}scale`]){
                            scale = cfg[`type${this._data.type}scale`];
                        }
                        mv.setScale(scale);
                        let tmpx = cfg.tmpx ? cfg.tmpx : 0;
                        mv.setPosition(this._monster.x-10 + tmpx,this._monster.y);
                    }
                    else{
                        if(cfg.type == `around`){
                            let bmp:BaseBitmap=BaseBitmap.create(name);
                            bmp.name = clipName;
                            bmp.anchorOffsetX = cfg.width/2;
                            bmp.anchorOffsetY = cfg.height/2;
                            let scale = 2;
                            if(this._data.getIsBoss() && cfg.bossscale){
                                scale = cfg.bossscale;
                            }
                            if(cfg[`type${this._data.type}scale`]){
                                scale = cfg[`type${this._data.type}scale`];
                            }
                            bmp.setScale(scale);
                            this.addChildAt(bmp,hpTxtIdx);
                            egret.Tween.get(bmp, {loop : true}).to({rotation : cfg.rotation}, cfg.timeparam);
                        }
                        if(cfg.type == `fly`){
                            if(key == `301`){
                                name = `addmstdie`;
                            }
                            let bmp:BaseBitmap=BaseBitmap.create(name);
                            bmp.name = clipName;
                            bmp.setScale(0.8);
                            bmp.alpha = 1.5;
                            bmp.anchorOffsetX = bmp.width/2;
                            bmp.anchorOffsetY = bmp.height/2;
                            this.addChildAt(bmp,hpTxtIdx);
                            egret.Tween.get(bmp).to({scaleX : 2, scaleY : 2, alpha : 0, y : -30}, 300).call(()=>{
                                bmp.alpha = 0;
                                bmp.dispose();
                                bmp = null;
                            },this);
                        }
                        else{
                            let bmp:BaseBitmap=BaseBitmap.create(name);
                            bmp.anchorOffsetX = bmp.width/2;
                            bmp.anchorOffsetY = bmp.height/2;
                            bmp.name = clipName;
                            this.addChild(bmp);
                            if(cfg.add){
                                bmp.blendMode = egret.BlendMode.ADD;
                            }
                            if(cfg[`type${this.getMonsterType()}tmpy`]){
                                bmp.y = cfg[`type${this.getMonsterType()}tmpy`];
                            }
                            let scale = 1;
                            if(cfg[`type${this._data.type}scale`]){
                                scale = cfg[`type${this._data.type}scale`];
                            }
                            bmp.setScale(scale);
                        }
                    }
                }
                else
                {
                    let bmp:BaseBitmap=BaseBitmap.create(name);
                    bmp.anchorOffsetX = bmp.width/2;
                    bmp.anchorOffsetY = bmp.height/2;
                    bmp.name = clipName;
    
                    bmp.setScale(0.5);
                    this.addChildAt(bmp,hpTxtIdx);
                    bmp.alpha = 0.8;
                    egret.Tween.get(bmp, {loop : true}).to({scaleX : 0.6, scaleY : 0.6, alpha : 0.8}, 250).to({scaleX : 0.5, scaleY : 0.5, alpha : 0.4}, 250);
                }   
            }
        }
    }

    public removeBuffAddStatus(stringid:string):void{
        let clipname = `${stringid}_buff`;
        let key = this._data.getAddStatus(stringid);
        let cfg = Config.DiceCfg.getAddMstEffById(key);
        if(!cfg){
            key = `${stringid}`;
            cfg =  Config.DiceCfg.getAddMstEffById(key);
        }
        if(cfg){
            if(cfg.type == `around`){
                let clip = <BaseBitmap>this.getChildByName(clipname);
                if(clip){
                    clip.alpha = 0;
                    egret.Tween.removeTweens(clip);
                    clip.dispose();
                    clip = null;
                }
            }
            else{
                let clip = <CustomMovieClip>this.getChildByName(clipname);
                if(clip){
                    clip.dispose();
                    clip = null;
                }
            }
        }
        else{
            let clip = <BaseBitmap>this.getChildByName(clipname);
            if(clip){
                clip.alpha = 0;
                egret.Tween.removeTweens(clip);
                clip.dispose();
                clip = null;
            }
        }
    }

    public checkHasBuff(diceId:string):MonsterBuff
    {
        return this._buffList[diceId];
    }
    public addBuff(buff:MonsterBuff):void
    {
        if(!this._buffList[buff.diceId])
        {
            this._buffList[buff.diceId]=buff;
            if(buff.damage)
            {
                //this.buffDmg(buff);
                this.addBeAtkStatus(buff.diceId, true);
            }
            if(buff.speed || buff.adddmg ||buff.posion )
            {
                this.addBeAtkStatus(buff.diceId, true);
            }
        }
    }

    public removeBuff(diceId:string, all : boolean = false):boolean
    {
        let flag = false;
        if(this._buffList[diceId])
        {
            let buff = this._buffList[diceId];
            if(buff.speed)
            {
                // this._data.changeSpeed(buff.speed, true);
            }
            if(all){
                flag = true;
                delete this._buffList[buff.diceId];
                this.removeBuffAddStatus(buff.diceId);
            }
            else{
                if(buff.overlap == 1){
                    flag = true;
                    delete this._buffList[buff.diceId];
                    this.removeBuffAddStatus(buff.diceId);
                }
                else{
                    buff.overlap -= 1;
                }
            }
        }
        return flag;
    }

    public removeAllBuff():void
    {
        for(let i in this._buffList){
            let buff = this._buffList[i];
            for(let j = 1; j <= buff.overlap; ++ j){
                this.removeBuff(buff.diceId, true);
            }
        }
    }

    public updateBuff(buff:MonsterBuff):void
    {
        if(buff.speed)
        {
            // this._data.changeSpeed(buff.speed,false);
        }
    }

    private buffExec():void
    {
        let keys=Object.keys(this._buffList);
        let l=keys.length;
        let speedscale = 0;
        let stop = false;
        if(l>0)
        {
            keys.sort((a,b)=>{
                return Number(a)-Number(b);
            });

           
            for (let i = 0; i < l; i++) 
            {
                let buff=this._buffList[keys[i]];
                if(buff){
                    if(buff.checkEnd()){
                        this.removeBuff(buff.diceId);
                    }
                    else{
                        if(buff.speed == 1){
                            stop = true;
                        }
                        if(buff.speed){
                            speedscale += (buff.speed * buff.overlap);
                        }
                        this.buffDmg(buff);
                    }   
                }
            }
        }
        if(this._data){
            this._data.changeSpeed(speedscale, false, stop);
        }
    }

    private buffDmg(buff:MonsterBuff):void
    {
        if(buff.checkDoTime())
        {
            this.beAtk({hp:buff.damage,isMe:buff.isMe,crit:false});
        }
    }

    public beAtk(data:{hp:number,isMe:boolean,crit:boolean,addStatus?:string,isPercent?:boolean}):void
    {
        if(data)
        {
            if(this._data)
            {
                this.addBeAtkStatus(data.addStatus);
                let hp=Math.floor(data.hp);
                let buffdata = this.checkHasBuff(`204`);
                if(buffdata && buffdata.adddmg && !data.isPercent){
                    hp = Math.floor(hp * (1 + buffdata.adddmg));
                }
                hp=Math.min(this._data.hp,hp);

                this._data.setHp(hp);
                if(data.crit)
                {
                    App.LogUtil.log(data.isMe,"暴击伤害",data.hp,hp);
                }
                BattleStatus.showDamage(this,hp,data.crit,data.isMe);
                // this._hpTxt.setString(""+this._data.hp);
                // if(this._hpProgress)
                // {
                //     this._hpProgress.setPercentage(this._data.hp/this._data.inithp);
                // }
                this.setHpTxt();
                if(this._data.isDie())
                {
                    BattleStatus.battleCheckCount(data.isMe,"k");
                    App.MsgHelper.dispEvt(MsgConst.BT_KILL_MONSTER,{isMe:data.isMe,data:this._data});
                    if(this._data.add&&BattleStatus.battleType==BattleTypeEnums.bigType1)
                    {
                        BattleStatus.battleCheckCount(data.isMe,"tk",()=>{
                            Api.BattleVoApi.addEmeryMonster(!this._data.isMe);
                        },this);
                    }
                    Api.BattleVoApi.addSp(this._data.monsterSp,data.isMe);
                    if(BattleStatus.battleType==BattleTypeEnums.bigType2)
                    {
                        Api.BattleVoApi.addSp(this._data.monsterSp,!data.isMe);
                    }
                    this._isDie=true;
                    this.playDieEffect();
                    // let enemyVo = this._data.getEnemyCopy();
                    // if(enemyVo)
                    // {
                    //     let bt=BattleStatus.battleLogicHasTickTime+1000;
                    //     enemyVo.birthTime=bt;
                    //     let roundList = enemyVo.isMe?BattleStatus.meBatteRoundDataList:BattleStatus.targetBatteRoundDataList;
                    //     let voArr:MonsterVo[]=roundList[bt];
                    //     if(voArr)
                    //     {
                    //         voArr.push(enemyVo);
                    //     }
                    //     else
                    //     {
                    //         roundList[bt]=[enemyVo];
                    //     }
                    //     let isMe=enemyVo.isMe;
                    //     if(isMe)
                    //     {
                    //         BattleStatus.totalMonsterNum.me++;
                    //     }
                    //     else
                    //     {
                    //         BattleStatus.totalMonsterNum.target++;
                    //     }
                    // }
                    //有瘟疫骰子buff
                    let buff = this.checkHasBuff(`308`);
                    if(buff){
                        let obstacle=Obstacle.createObstacle(buff.dicedata,{x:this.x,y:this.y},null,this._data.getCenterDis());
                    }
                }
                else
                {
                    if(this._data.highHp)
                    {
                        BattleStatus.checkMaxHp(this._data,this._data.isMe,1);
                        if(this._data.isPublic())
                        {
                            BattleStatus.checkMaxHp(this._data,!this._data.isMe,1);
                        }
                    }
                }
            }
            else
            {
                this._isDie=true;
            }
        }
    }

    protected setHpTxt():void
    {
        if(this._hpTxt)
        {
            this._hpTxt.setString(""+this._data.hp);
            this._hpTxt.anchorOffsetX=this._hpTxt.width*0.5+0.5;
            
            this._hpBg.width=this._hpTxt.width+10;
            this._hpBg.anchorOffsetX=this._hpBg.width*0.5;
        }
    }

    public getCurHp():number
    {
        return this._data?this._data.hp:0;
    }

    public getMaxHp():number
    {
        return this._data?this._data.inithp:0;
    }


    private playDieEffect():void
    {
        egret.Tween.removeTweens(this);
        this.alpha = 0;
        egret.Tween.get(this).wait(300).call(()=>{
            this.dispose();
        },this);
    }

    public getMonsterType():number
    {
        return this._data?this._data.type:0;
    }

    public dispose():void
    {
        if(this._data)
        {
            this._data.dispose();
            this._data=null;
        }
        this._monster&&this._monster.removeEventListener(MsgConst.BT_EFFECT_FIRST_SHOW,this.showHpProgress,this);
        // this._hpTxt=null;
        // this._isDie=false;
        this._isMe=false;
        this._monster = null;
        // this._moveIdx=0;
        this._hpBg=null;
        this._hpTxt=null;
        this._hpBgArrow=null;
        App.ObjectUtil.clear(this._buffList);
        super.dispose();
    }
}

enum MonsterMoveStatus
{
    GO=0,
    PUBLIC=1,
    BACK=2,
    END=3,
}