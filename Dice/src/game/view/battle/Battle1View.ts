/**
 * 对战模式
 * author 陈可
 * date 2020/4/23
 * @class Battle1View
 */
class Battle1View extends BattleView
{
    private _timeTxt:BaseTextField;
    private _isPlaying:boolean;
    private _curBgSound="";
    private _timeIcon : BaseBitmap = null;
    private _enermyHpGroup:BaseDisplayObjectContainer = null;

    public constructor()
    {
        super();
    }

    protected initView():void
    {
        this.name = `Battle1View`;

        let limitPosCfg=BattleStatus.getLimitPos();
        let centerY=BattleStatus.battleCenterY[1];
        let spaceY=BattleStatus.lineSize.pve.space;
        let lineName="battle_line1";
        // let bg=BaseBitmap.create(lineName);
        // bg.width=278;
        // bg.height=362;
        // bg.x=GameConfig.stageWidth*0.5-bg.width;
        // bg.y=centerY-spaceY;
        // bg.scaleY=-1;
        // this.addChild(bg);

        // bg=BaseBitmap.create(lineName);
        // bg.width=278;
        // bg.height=362;
        // bg.scaleY=-1;
        // bg.scaleX=-1;
        // bg.x=bg.width+GameConfig.stageWidth*0.5;//-bg.width;
        // bg.y=centerY-spaceY;
        // this.addChild(bg);

        // let bg2=BaseBitmap.create(lineName);
        // bg2.width=bg.width;
        // bg2.height=bg.height;
        // bg2.x=GameConfig.stageWidth*0.5-bg2.width;
        // bg2.y=centerY+spaceY;
        // this.addChild(bg2);

        // bg2=BaseBitmap.create(lineName);
        // bg2.width=bg.width;
        // bg2.height=bg.height;
        // bg2.scaleX=-1;
        // bg2.x=GameConfig.stageWidth*0.5+bg2.width;
        // bg2.y=centerY+spaceY;
        // this.addChild(bg2);

        let timeBg=BaseBitmap.create("battle_time_bg");
        // timeBg.anchorOffsetX = timeBg.width;
        // timeBg.anchorOffsetY = timeBg.height / 2;
        // // timeBg.width = 640;
        // timeBg.height = 45;
        timeBg.setPosition(0, centerY - timeBg.height / 2);
        this.addChild(timeBg);

        // let timeBg2=BaseBitmap.create("battle_time_bg");
        // timeBg2.anchorOffsetX = timeBg2.width;
        // timeBg2.anchorOffsetY = timeBg2.height / 2;
        // timeBg2.rotation = 180;
        // timeBg2.setPosition(GameConfig.stageWidth / 2, centerY);
        // this.addChild(timeBg2);

        //battle_pvp_boss_icon_1
        let timeIcon=BaseBitmap.create("battle_time_icon");
        timeIcon.setPosition(GameConfig.stageWidth*0.5-180,centerY - timeIcon.height*0.5);
        this.addChild(timeIcon);
        this._timeIcon = timeIcon;

        let timeTxt:BaseTextField=ComponentMgr.getTextField(LangMger.getlocal("leftTimeDesc")+App.DateUtil.getFormatBySecond(Config.BattleCfg.getbtTimeByRound(BattleStatus.round)),TextFieldConst.SIZE_28,ColorEnums.white,false);
        this._timeTxt=timeTxt;
        timeTxt.setPosition(timeIcon.x+timeIcon.width+10,timeIcon.y+(timeIcon.height-timeTxt.height)*0.5);
        this.addChild(timeTxt);

        // let topDiceBg:BaseBitmap=BaseBitmap.create("battle_dice_bg");
        // topDiceBg.setPosition((GameConfig.stageWidth-topDiceBg.width)*0.5,centerY-topDiceBg.height-spaceY-50);
        // this.addChild(topDiceBg);
        // this.topDiceBg=topDiceBg;

        // let buttomDiceBg=BaseBitmap.create("battle_dice_bg");
        // buttomDiceBg.setPosition((GameConfig.stageWidth-buttomDiceBg.width)*0.5,centerY+spaceY+50);
        // this.addChild(buttomDiceBg);
        this.topDiceBgX=107;
        this.topDiceBgY=80;

        let endDeep=BattleStatus.endDeep;
        let btEnd=BaseBitmap.create("battle_targetend1");
        let pos=limitPosCfg.target.pos3;
        btEnd.setPosition(pos.x-btEnd.width*0.5,pos.y-endDeep);//-diceSize.height*0.5);
        this.addChild(btEnd);

        //敌方生命值
        let enermyGroup = this.createHpGroup();
        this.addChild(enermyGroup);
        enermyGroup.name = `enermyHpGroup`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, enermyGroup, btEnd, [10,-25]);
        enermyGroup.y = centerY - 35;
        this._enermyHpGroup = enermyGroup;

        btEnd=BaseBitmap.create("battle_end");
        pos=limitPosCfg.me.pos3;
        btEnd.setPosition(pos.x-btEnd.width*0.5,pos.y-btEnd.height+endDeep);//+diceSize.height*0.5);
        this.addChild(btEnd);
        //我方生命值
        let myGroup = this.createHpGroup();
        this.addChild(myGroup);
        myGroup.name = `myHpGroup`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, myGroup, btEnd, [-10,-5]);
        myGroup.y = centerY;

        let confessBtn=ComponentMgr.getButton("btn_battle_confess","",this.confessHandler,this);
        confessBtn.setPosition(timeTxt.x+timeTxt.textWidth + 20,timeIcon.y+(timeIcon.height-confessBtn.height)*0.5);
        this.addChild(confessBtn);
        confessBtn.visible = !Api.GameinfoVoApi.getIsGuiding();
        this._curBgSound = ``;

        SoundMgr.stopBgByName(`music_ready`);
        super.initView();
    }

    protected getResourceList():string[]
    {
        let resArr:string[]=["selectrandomboss"];
        return super.getResourceList().concat(resArr);
    }

    private createHpGroup():BaseDisplayObjectContainer{
        let view = this;

        let hpGroup = new BaseDisplayObjectContainer();
        let bg=BaseBitmap.create("battle_hpbg");
        hpGroup.addChild(bg);
        for(let i = 1; i <= 3; ++ i){
            let hp = BaseBitmap.create(`battle_hp`);
            hp.name = `hp${i}`
            hpGroup.addChild(hp);
            hp.setPosition(6+(i-1)*(hp.width+6),(bg.height-hp.height)*0.5);
        }
        return hpGroup;
    }

    protected showHpMovie(isme : boolean, isboss : boolean):void{
        let view = this;
        if(isme){
            SoundMgr.playEffect(SoundConst.EFFECT_LIFE);
        }
        let group = <BaseDisplayObjectContainer>view.getChildByName(isme ? `myHpGroup` : `enermyHpGroup`);
        let now = BattleStatus.getBattleValue(isme).l;
        if(App.CommonUtil.check_dragon()){
            let db = <BaseLoadDragonBones>view.getChildByName(`smsd${isme?1:2}`);
            if(!db){
                db = App.DragonBonesUtil.getLoadDragonBones(`royalpass_smsd`, 1);
                view.addChild(db);
                db.name = `smsd${isme?1:2}`;
                db.setPosition(group.x + group.width / 2, group.y + 10);
                db.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, (evt)=>{
                    db.dispose();
                    db = null;
                }, view);
            }
        }

        let min = now - 1;
        if(isboss){//isboss
            min = Math.max(now - 2, 0);
        }
        for(let i = now; i > min; -- i){
            let hp = <BaseBitmap>group.getChildByName(`hp${i}`);
            let line = BaseBitmap.create(`battle_fx_xt`);
            line.anchorOffsetX = line.width / 2;
            line.anchorOffsetY = line.height / 2;
            line.rotation = 30;
            if(isme){
                if(hp){
                    group.addChild(line);
                    line.setPosition(hp.x + hp.width + line.anchorOffsetX, hp.y - line.anchorOffsetY);
                    egret.Tween.get(line).to({x : hp.x + hp.width / 2, y : hp.y + hp.height / 2}, 150).call(()=>{
                        App.DisplayUtil.changeToGray(hp);
                        egret.Tween.removeTweens(line);
                    }, view);
                }

                if(view._isPlaying){
    
                }
                else{
                    view._isPlaying = true;
                    let kuang = BaseBitmap.create(`battle_fx_bk`);
                    kuang.anchorOffsetX = kuang.width / 2;
                    kuang.anchorOffsetY = kuang.height / 2;
                    kuang.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
                    kuang.setScale(2);
                    kuang.alpha = 0;
                    this.addChild(kuang);
                    let time = BattleStatus.timeparam;
                    egret.Tween.get(kuang).to({alpha : 1}, 5 * time).to({alpha : 0}, 20 * time).call(()=>{
                        kuang.dispose();
                        kuang = null;
                    }, view);
                }
            }
            else{
                if(hp){
                    group.addChild(line);
                    App.DisplayUtil.changeToGray(hp);
                    // line.setPosition(hp.x + hp.width / 2, hp.y + hp.height / 2);
                    line.setPosition(hp.x + hp.width + line.anchorOffsetX, hp.y - line.anchorOffsetY);
                    egret.Tween.get(line).to({x : hp.x + hp.width / 2, y : hp.y + hp.height / 2}, 150).call(()=>{
                        App.DisplayUtil.changeToGray(hp);
                        egret.Tween.removeTweens(line);
                    }, view);
                }
            }
        }


    }

    
    private confessHandler(e:egret.Event):void
    {
        if(BattleStatus.startBattleTime>0){
            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                title:LangMger.getlocal("confess_btn"),
                msg:LangMger.getlocal(`confess_desc`),
                handler:this,
                needCancel:true,
                callback:()=>{
                    NetManager.request(NetConst.BATTLE_OPT,{opt:4});
                }
            })
        }
    }

    protected monsterMoveHandler(monsterData:MonsterVo):void
    {
        let isMe=monsterData.isMe;
        switch(monsterData.moveStatus)
        {
            case MonsterMoveStatus.END:
                BattleStatus.battleCheckCount(isMe,"l");
                if(monsterData.getIsBoss())
                {//boss多掉一滴血
                    BattleStatus.battleCheckCount(isMe,"l");
                }
                break;
            default:
                break;
        }
    }

    protected logicCustomTick():void
    {
        super.logicCustomTick();
        let roundTotalTime=Config.BattleCfg.getbtTimeByRound(BattleStatus.round)*1000;
        let btTime=(roundTotalTime+BattleStatus.getRoundStartT());
        let leftTime=btTime-BattleStatus.battleLogicHasTickTime;
        if(leftTime%1000==0&&leftTime>=0&&leftTime<=roundTotalTime)
        {
            this._timeTxt&&(this._timeTxt.setString(LangMger.getlocal("leftTimeDesc")+App.DateUtil.getFormatBySecond(leftTime/1000)));
        }
    }

    protected chatHandler () {
        SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
        if(!this.chatList){
            let view = this;
            this.chatList = new ChatView();
            this.chatList.init();
            this.chatList.setExpBg("chatview_exp_bg3");
            this.chatList.setExpListXY(30, 173);
            this.chatList.itemCB = ()=>{
                view._chatIcon.touchEnabled = false;
            }
        }
        this.addChild(this.chatList);
    }
    protected displayChatDB(opt, isMe){
        let view = this;
		if(isMe){
            if(this.chatDB == null){
                this.chatDB = new ChatDBDisplay();
                this.chatDB.init(1, ()=>{
                    view._chatIcon.touchEnabled = true;
                });
                this.addChild(this.chatDB);
                this.chatDB.width = 98;
                this.chatDB.height = 108;
                this.chatDB.x = 89;
                this.chatDB.y = GameConfig.stageHeigth - 300;
            }
            this.addChild(this.chatDB);
            // this.chatDB.visible = true;
            this.chatDB.displayDB(opt["upId"]);
        } else if (!this.forbidChat) {
            if(this.chatDBother == null){
                this.chatDBother = new ChatDBDisplay();
                this.chatDBother.init(2);
                this.addChild(this.chatDBother);
                this.chatDBother.width = 98;
                this.chatDBother.height = 108;
                this.chatDBother.x = GameConfig.stageWidth - 168;
                this.chatDBother.y = 33;
            }
            this.addChild(this.chatDBother);
            // this.chatDBother.visible = true;
            this.chatDBother.displayDB(opt["upId"]);
        }
    }

    protected playRoundEffect(showStr:string,callback?:()=>void,thisObj?:any):void{
        let keys = Config.MonsterCfg.getBossKeys();
        let seed = Api.BattleVoApi.getBattleData(true).uid + Api.BattleVoApi.getBattleData(false).uid + BattleStatus.randSeed;
        let rid = Math.floor(App.MathUtil.seededRandom(0, keys.length, BattleStatus.battleLogicHasTickTime + seed));
        let bossid = keys[rid];
        if(egret.getOption("boss"))
        {
            bossid=String(egret.getOption("boss"));
        }
        this.curRoundBossId = bossid;

        if(Api.GameinfoVoApi.getIsGuiding()){
            this._curBgSound = `music_battle`;
            super.playRoundEffect(showStr,callback,thisObj);
        }
        else{
            if(showStr == LangMger.getlocal(`battlestart`)){
                if(!this._startGameBg){
                    let startGameBg = BaseBitmap.create(`battle_time_prepare`);
                    startGameBg.height = 404;
                    startGameBg.anchorOffsetX = startGameBg.width / 2;
                    startGameBg.anchorOffsetY = startGameBg.height / 2;

                    this.addChild(startGameBg);
                    this._startGameBg = startGameBg;
                    startGameBg.x = GameConfig.stageWidth / 2;
                    startGameBg.y = BattleStatus.battleCenterY[BattleStatus.battleType] - 5;
            
                    let startGameTxt = ComponentMgr.getTextField(showStr, 50, ColorEnums.white, false);
                    startGameTxt.anchorOffsetX = startGameTxt.width / 2;
                    startGameTxt.anchorOffsetY = startGameTxt.height / 2;
                    this.addChild(startGameTxt);
                    this._startGameTxt = startGameTxt;
                    startGameTxt.x = startGameBg.x;
                    startGameTxt.y = startGameBg.y;

                    startGameTxt.mask = new egret.Rectangle(0,-15,startGameTxt.width,0);
            
                    // startGameBg.alpha = 0;
                }
                //播放动画
                let timeparam = BattleStatus.timeparam;
                egret.Tween.get(this._startGameTxt.mask, {onChangeObj : this, onChange : ()=>{
                    if(this._startGameTxt && this._startGameTxt.mask){
                        let rect=this._startGameTxt.mask;
                        rect.y = (this._startGameTxt.height - this._startGameTxt.mask.height) / 2;
                        this._startGameTxt.mask=rect;//兼容原生遮罩用法
                    }
                }}).to({height : this._startGameTxt.height+10}, 5 * timeparam).wait(35 * timeparam).to({height : 0}, 6 * timeparam).call(()=>{
                    egret.Tween.removeTweens(this._startGameTxt.mask);
                    this.removeChild(this._startGameTxt);
                },this);
                
                this._startGameBg.scaleY = 0;
                this._startGameBg.alpha = 0.7;
                egret.Tween.get(this._startGameBg).to({scaleY : 0.8}, 10 * timeparam).to({scaleY : 1}, 5 * timeparam).wait(15 * timeparam).call(()=>{
                    ViewController.getInstance().openView(ViewConst.SELECTBOSSPOPUPVIEW, {
                        isFrist:1,
                        id : bossid,
                        callback : ()=>{
                            if(callback)
                            {
                                callback.apply(thisObj);
                            }
                            BattleStatus.isInRound = false;
                            this._curBgSound = `music_battle${BattleStatus.round % 2 == 0 ? `` : `_2`}`;
                            this.playBg();
                            this._timeIcon.setRes(`battle_pvp_boss_icon_${rid + 1}`);
                            this._timeIcon.setPosition(GameConfig.stageWidth*0.5-190,BattleStatus.battleCenterY[1] - this._timeIcon.height*0.5);
                        },
                        handler : this
                    });
                }, this).to({scaleY : 0}, 20 * timeparam).call(()=>{
                    egret.Tween.removeTweens(this._startGameBg);
                    this.removeChild(this._startGameBg);
                },this);
            }
            else{
                ViewController.getInstance().openView(ViewConst.SELECTBOSSPOPUPVIEW, {
                    id : bossid,
                    callback : ()=>{
                        if(callback)
                        {
                            callback.apply(thisObj);
                        }
                        BattleStatus.isInRound = false;
                        this._curBgSound = `music_battle${BattleStatus.round % 2 == 0 ? `` : `_2`}`;
                        this.playBg();
                        this._timeIcon.setRes(`battle_pvp_boss_icon_${rid + 1}`);
                        this._timeIcon.setPosition(GameConfig.stageWidth*0.5-190,BattleStatus.battleCenterY[1] - this._timeIcon.height*0.5);
                    },
                    handler : this
                });
            }
        }
    }
    

    // protected checkBattleResult():boolean
    // {
    //     let result=false;
    //     if(BattleStatus.checkBattleResult())
    //     {
    //         this.battleSync(1);
    //         this.sendBattleEnd();
    //         result=true;
    //     }
    //     return result;
    // }
    //选择boss
    // protected checkBattleResult():boolean
    // {
    //     let result=false;
    //     if(this._isRound){
    //         return result;
    //     }
    //     if(BattleStatus.checkEnd()){
    //         return super.checkBattleResult(); 
    //     }
    //     else{
    //         if(BattleStatus.checkNextRound()){
    //             //要出boss了
    //             this._isRound = true;
    //             if(!BattleStatus.isBoss){
    //                 //有一段特效 boss_icon_1001
    //                 // this.showBossTween(true);
    //                 // this.showBossTween(false);
    //                 // return false;
    //                 return super.checkBattleResult();
    //             }
    //             else{
    //                 // this.battlePause();
    //                 SoundMgr.stopBg();
    //                 this._isRound = true;
    //                 this.playRoundEffect(``, ()=>{
    //                     // this.battleResume();
    //                     return super.checkBattleResult();
    //                 }, this);   
    //             }
    //         }
    //         else{
    //             return super.checkBattleResult(); 
    //         }
    //     }
    // }

    public playBossRoundEffect():void
    {
        SoundMgr.stopBg();
        this.playRoundEffect(``, ()=>{
        }, this);   
    }

    public showBossTween(isMe : boolean, hp : number):void{
        let MonsterList = isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        let MossterData = isMe ? BattleStatus.meMonsterDataList : BattleStatus.targetMonsterDataList;
        let keys = Object.keys(MonsterList);


        let posAllCfg=BattleStatus.getLimitPos();
        let posCfg = isMe ? posAllCfg.me : posAllCfg.target;
        let {w,h} = GameConfig.monsterSize[4];
        let offPos=Math.min(w,h)*0.5*0.8 * (isMe ? 1 : -1);
        let dis = isMe ? 0 : -100;
        let endY = posCfg.pos1.y;

        if(keys.length){
            for (let i = 0; i < keys.length; ++ i) 
            {
                let key = keys[i];
                if (MonsterList.hasOwnProperty(key)) 
                {
                    const monster = MonsterList[key];
                    egret.Tween.get(monster).to({x : GameConfig.stageWidth / 2, y : endY}, 1100).call(()=>{
                        if(i == keys.length - 1){
                            for (let j = 0; j < keys.length; ++ j) 
                            {
                                const tmp = MonsterList[keys[j]];
                                egret.Tween.get(tmp).to({alpha : 0}, 300);
                            }
                            let voclassObj=egret.getDefinitionByName(`Boss${this.curRoundBossId}Vo`);
                            let bossvo = new voclassObj();
                            bossvo.birthTime=0;
   
                            bossvo.hp=Config.BattleCfg.getBossHp(BattleStatus.round,hp);//todo;//todo
                            bossvo.initData(Config.MonsterCfg.getBossCfgById(String(this.curRoundBossId)));

                            let classObj=egret.getDefinitionByName(`Boss${this.curRoundBossId}`);
                            //  let boss = BaseLoadBitmap.create(`boss_icon_${this.curRoundBossId}`);
                            //  boss.anchorOffsetX = 204 / 2;
                            //  boss.anchorOffsetY = 168 / 2;
                            let boss = new classObj(bossvo, isMe, true);
                            this.addChild(boss);
                            
                            boss.setPosition(GameConfig.stageWidth / 2, endY);
                            boss.setScale(0);
                            boss.alpha = 0;

                            let stPos:{x:number,y:number}=posCfg["pos0"];
                            egret.Tween.get(boss).wait(500).call(()=>{
                                boss.setHp();
                            },this).to({scaleX : 1, scaleY : 1, alpha : 1}, 500).call(()=>{
                                boss.hpTxtTween();
                                for (let j = 0; j < keys.length; ++ j) 
                                {
                                    const tmp = MonsterList[keys[j]];
                                    tmp.dispose();
                                    delete MonsterList[keys[j]];
                                }
                                MossterData.length = 0;
                            },this).wait(500).to({x : stPos.x, y : stPos.y + offPos}, 1100).call(()=>{
                                boss.alpha = 0;
                                boss.dispose();
                                boss = null;
                                if(isMe){
                                    BattleStatus.isInRound = false;
                                    super.checkBattleResult();
                                }
                            }, this);
                            // let bossicon = BaseLoadBitmap.create(`boss_icon_${this.curRoundBossId}`);
                            // bossicon.anchorOffsetX = 204 / 2;
                            // bossicon.anchorOffsetY = 168 / 2;
                        }
                    },this);
                }
            }
        }
        else{
            if(1)
            {
                // let bossicon = BaseLoadBitmap.create(`boss_icon_${this.curRoundBossId}`);
                // bossicon.anchorOffsetX = 204 / 2;
                // bossicon.anchorOffsetY = 168 / 2;
                // this.addChild(bossicon);

                // bossicon.setPosition(GameConfig.stageWidth / 2, endY);
                // bossicon.setScale(0);
                // bossicon.alpha = 0;
                
                let voclassObj=egret.getDefinitionByName(`Boss${this.curRoundBossId}Vo`);
                let bossvo = new voclassObj();
                bossvo.birthTime=0;
                bossvo.hp=Config.BattleCfg.getBossHp(BattleStatus.round,hp);//todo
                bossvo.initData(Config.MonsterCfg.getBossCfgById(String(this.curRoundBossId)));

                let classObj=egret.getDefinitionByName(`Boss${this.curRoundBossId}`);
                let boss = new classObj(bossvo, isMe, true);
                // let boss = BaseLoadBitmap.create(`boss_icon_${this.curRoundBossId}`);
                // boss.anchorOffsetX = 204 / 2;
                // boss.anchorOffsetY = 168 / 2;
               //let boss = new classObj(bossvo, true);

                this.addChild(boss);
                boss.setPosition(GameConfig.stageWidth / 2, endY);
                boss.setScale(0);
                boss.alpha = 0;

                let stPos:{x:number,y:number}=posCfg["pos0"];
                egret.Tween.get(boss).wait(1600).call(()=>{
                    boss.setHp();
                },this).to({scaleX : 1, scaleY :1, alpha : 1}, 500).call(()=>{
                    boss.hpTxtTween();
                },this).wait(500).to({x : stPos.x, y : stPos.y + offPos}, 1100).call(()=>{
                    boss.alpha = 0;
                    boss.dispose();
                    boss = null;
                    if(isMe){
                        BattleStatus.isInRound = false;
                        super.checkBattleResult();
                    }
                }, this);
            }


                // let keys = Object.keys(newRoundData);
                // for (let i = 0; i < keys.length; i++)
                // {
                //     const vo = newRoundData[keys[i]][0];
                //     if(vo.getIsBoss()){
                //         let boss=this.createMonster(vo,isMe);
                //         monsterList[boss.name]=boss;
                //         // monsterDataList.push(vo);

                //         boss.setPosition(GameConfig.stageWidth / 2, endY);
                //         boss.setScale(0);
                //         boss.alpha = 0;
            
                //         let stPos:{x:number,y:number}=posCfg["pos0"];
                //         egret.Tween.get(boss).wait(1600).to({scaleX : 1, scaleY : 1, alpha : 1}, 500).wait(500).to({x : stPos.x, y : stPos.y + offPos}, 1100).call(()=>{
                //             if(isMe){
                //                 super.checkBattleResult();
                //                 this._isRound = false;
                //             }
                //         }, this);
                //     }
                // }
            //}
            // let bossicon = BaseLoadBitmap.create(`boss_icon_${this.curRoundBossId}`);
            // bossicon.anchorOffsetX = 204 / 2;
            // bossicon.anchorOffsetY = 168 / 2;
        }
    }

    // protected checkAndCreateMonster(isMe:boolean):void
    // {
    //     // let hasCreateNum=isMe?BattleStatus.hasCreateMonsterNum.me:BattleStatus.hasCreateMonsterNum.target;
    //     // if(hasCreateNum<BattleStatus.monsterNum)
    //     // {
    //         let newRoundData=isMe?BattleStatus.meBatteRoundDataList:BattleStatus.targetBatteRoundDataList;
    //         let newMonsterList = newRoundData[String(BattleStatus.battleLogicHasTickTime-BattleStatus.getRoundStartT())];
    //         let monsterList:{[key:string]:BaseMonster}=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
    //         let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
    //         if(newMonsterList)
    //         {
    //             let l=newMonsterList.length;
    //             for (let i = 0; i < l; i++)
    //             {
    //                 const vo:MonsterVo = newMonsterList[i];
    //                 let monster=this.createMonster(vo,isMe);
    //                 monsterList[monster.name]=monster;
    //                 monsterDataList.push(vo);
    //             }
    //         }
    //     // }
    // }
    //为对手生成hp很高的怪物
    protected transferEnermy(isMe : boolean, star : number):void{
        let averageLv:number=Api.BattleVoApi.getLvValue();
        let cfg:Config.ChallengeItemCfg=BattleStatus.getLastType1MsCfg(isMe);
        if(cfg)
        {
            let enemyVo:MonsterVo=new MonsterVo();
            let bt=BattleStatus.battleLogicHasTickTime-BattleStatus.getRoundStartT()+Api.BattleVoApi.getAddMonsterDelay();
            enemyVo.birthTime=bt;
            enemyVo.hp=cfg.getHpByLv(averageLv) * (1 + 3) * star;
            enemyVo.isMe=!isMe;
            enemyVo.isEnemy=true;
            enemyVo.initData(cfg);
            let roundList = isMe?BattleStatus.targetBatteRoundDataList:BattleStatus.meBatteRoundDataList;
            let voArr:MonsterVo[]=roundList[bt];
            if(voArr)
            {
                voArr.push(enemyVo);
            }
            else
            {
                roundList[bt]=[enemyVo];
            }
            if(isMe)
            {
                BattleStatus.totalMonsterNum.target++;
            }
            else
            {
                BattleStatus.totalMonsterNum.me++;
            }
        }
    }

    public isInRound():boolean{
        return BattleStatus.isInRound;
    }

    private showBossMovie():void{
        let view = this;

    }

    protected getSoundBgName():string
	{
        return this._curBgSound;
    }
    

    public dispose():void
    {
        this._timeTxt = null;
        this._isPlaying = false;
        this._curBgSound = ``;
        let confirmview = ViewController.getInstance().getView(ViewConst.CONFIRMPOPUPVIEW);
        if(confirmview){
            confirmview.hide();
        }
        this._timeIcon = null;
        this._enermyHpGroup = null;
        super.dispose();
    }

}