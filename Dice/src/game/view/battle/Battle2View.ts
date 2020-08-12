/**
 * 协同模式
 * author 陈可
 * date 2020/4/23
 * @class Battle2View
 */
class Battle2View extends BattleView
{
    private _arrowGroup = null;
    private _centerarrowGroup = null;
    private _totalGroup = null;

    public constructor()
    {
        super();
    }

    protected initView():void
    {
        this.name = `Battle2View`
        let group = new BaseDisplayObjectContainer();
        this.addChild(group);
        this._totalGroup = group;

        let limitPosCfg=BattleStatus.getLimitPos();
        let centerY=BattleStatus.battleCenterY[2];
        
        this.topDiceBgX=107;
        this.topDiceBgY=80;

        let btEnd=BaseBitmap.create("battle_end");
        btEnd.anchorOffsetX=btEnd.width;
        btEnd.anchorOffsetY=btEnd.height*0.5;
        let pos=limitPosCfg.target.pos2;
        btEnd.setPosition(GameConfig.stageWidth,pos.y-10);
        this.addChild(btEnd);

        let bossIconBg = BaseBitmap.create("pvp_rounds_bg");
        group.addChild(bossIconBg);
        // bossIconBg.x = GameConfig.stageWidth - bossIconBg.width;
        // bossIconBg.y = 5;

        let rounNUm = ComponentMgr.getTextField('11', TextFieldConst.SIZE_28, ColorEnums.white);
        group.addChild(rounNUm);  
        rounNUm.text = LangMger.getlocal("battle_pvp_rank", [String(1)]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rounNUm, bossIconBg, [10,0]);

        let powerBg = BaseBitmap.create("battle_power_bg2");
        group.addChild(powerBg);
        powerBg.x = bossIconBg.x - powerBg.width - 10;
        powerBg.y = bossIconBg.y;
        let totalNum = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
        group.addChild(totalNum);
        totalNum.text ='+' + String(1);
        totalNum.x = powerBg.x + 50;
        totalNum.y = powerBg.y + 12; 

        let powerIcon = BaseBitmap.create("task_power");
        group.addChild(powerIcon);
        powerIcon.x = powerBg.x + 15;
        App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, powerIcon, powerBg, [0,0]);

        let total:number = 1;
        App.MsgHelper.addEvt(MsgConst.BT_NEXT_ROUND, ()=>{
            rounNUm.text = LangMger.getlocal("battle_pvp_rank", [String(BattleStatus.round + 1)]);
            //addNum.text = `+${Config.TogetherCfg.getCard(BattleStatus.round + 1)}`;
            total += Config.TogetherCfg.getCard(BattleStatus.round + 1);
            totalNum.text =`+` + `${total}`
        }, this);

        group.x = GameConfig.stageWidth - bossIconBg.width;
        group.y = 5;

        if(Api.GameinfoVoApi.getIsFinishNewGuide() && !Api.GameinfoVoApi.getIsFinishStepGuide(32)){
            let hgroup = new BaseDisplayObjectContainer();
            hgroup.height = this.height;
            hgroup.width = 78;
            this.addChild(hgroup);

            for(let i = 1; i <= 3; ++ i){
                let arrow = BaseBitmap.create(`guidelinearrow`);
                arrow.anchorOffsetX = arrow.width / 2;
                arrow.anchorOffsetY = arrow.height / 2;
                arrow.scaleY = 1;
                hgroup.addChild(arrow);
                arrow.x = arrow.anchorOffsetX;
                arrow.y = 66 + arrow.anchorOffsetX + (i - 1) * (82 + 23);
            }

            for(let i = 1; i <= 3; ++ i){
                let arrow = BaseBitmap.create(`guidelinearrow`);
                arrow.anchorOffsetX = arrow.width / 2;
                arrow.anchorOffsetY = arrow.height / 2;
                arrow.scaleY = -1;
                hgroup.addChild(arrow);
                arrow.x = arrow.anchorOffsetX;
                arrow.y = hgroup.height - arrow.height - arrow.anchorOffsetY - 147 - (i - 1) * (82 + 23);
            }
            this._arrowGroup = hgroup;
            hgroup.visible = false;

            let cgroup = new BaseDisplayObjectContainer();
            cgroup.width = this.width;
            this.addChild(cgroup);
            cgroup.visible = false;

            for(let i = 1; i <= 5; ++ i){
                let arrow = BaseBitmap.create(`guidelinearrow`);
                arrow.anchorOffsetX = arrow.width / 2;
                arrow.anchorOffsetY = arrow.height / 2;
                arrow.rotation = -90;
                cgroup.addChild(arrow);
                arrow.x = cgroup.width / 6 * i;
            }
            cgroup.y = BattleStatus.battleCenterY[BattleStatus.battleType] - 5;
            this._centerarrowGroup = cgroup;
        }
        super.initView();

        this._chatIcon.setPosition(GameConfig.stageWidth - 66, GameConfig.stageHeigth - 147);
        this._topLayer.y = 53;
     
    }

    protected initEvt():void
    {
        super.initEvt();
        App.MsgHelper.addEvt(MsgConst.BT_NEXT_ROUND,this.nextRoundHandler,this);
    }

    protected removeEvt():void
    {
        super.removeEvt();
        App.MsgHelper.removeEvt(MsgConst.BT_NEXT_ROUND,this.nextRoundHandler,this);
    }

    private nextRoundHandler(e:egret.Event):void
    {
        let tout = egret.setTimeout(()=>{
            this.playRoundEffect(LangMger.getlocal("battle_pvp_rank",[(BattleStatus.round+1)+""]));
        },this,1000);
    }

    protected playRoundEffect(showStr:string,callback?:()=>void,thisObj?:any):void
    {
        if(!this._startGameBg)
        {
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
        else
        {
            let startGameBg = this._startGameBg;
            let startGameTxt = this._startGameTxt;
            if(!this.contains(startGameBg))
            {
                this.addChild(startGameBg);
            }
            if(!this.contains(startGameTxt))
            {
                this.addChild(startGameTxt);
            }
            if(showStr!=startGameTxt.text)
            {
                startGameTxt.setString(showStr);
                startGameTxt.anchorOffsetX = startGameTxt.width / 2;
                let rect:egret.Rectangle = <egret.Rectangle>startGameTxt.mask;
                rect.width=startGameTxt.width;
                startGameTxt.mask=rect;
            }
            egret.Tween.removeTweens(this._startGameTxt.mask);
            egret.Tween.removeTweens(this._startGameTxt);
            egret.Tween.removeTweens(this._startGameBg);
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
        egret.Tween.get(this._startGameBg).to({scaleY : 0.8}, 10 * timeparam).to({scaleY : 1}, 5 * timeparam).wait(15 * timeparam).to({scaleY : 0}, 20 * timeparam).call(()=>{
            egret.Tween.removeTweens(this._startGameBg);
            this.removeChild(this._startGameBg);
            if(showStr == LangMger.getlocal(`battlestart`)){
                this.playRoundEffect(LangMger.getlocal("battle_pvp_rank",[(BattleStatus.round+1)+""]), callback, thisObj);
            }
            else{
                if(Api.GameinfoVoApi.getIsFinishNewGuide() && Api.GameinfoVoApi.checlIsInStepId(33) && BattleStatus.round == 1){
                    if(BattleStatus.scene){
                        BattleStatus.scene.battlePause();
                        Api.GameinfoVoApi.setCurGudingId(34);
                        App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                    }
                }
                if(callback)
                {
                    callback.apply(thisObj);
                }
            }
        },this);
    }

    protected monsterMoveHandler(monsterData: MonsterVo):void
    {
        let isMe=monsterData.isMe;
        // if(monster.isMoveEnd())
        // {
        //     super.monsterMoveHandler(monster);
        // }
        // else
        // {
            let monsterList=isMe?BattleStatus.targetMonsterList:BattleStatus.meMonsterList;
            let monsterDataList=isMe?BattleStatus.targetMonsterDataList:BattleStatus.meMonsterDataList;
            let name = monsterData.getName();
            switch(monsterData.moveStatus)
            {
                case MonsterMoveStatus.PUBLIC:
                    monsterList[name]=this.getMonsterByName(monsterData);
                    monsterDataList.push(monsterData);
                    BattleStatus.checkPublicGroup(monsterData);
                    monsterData.clearBack();
                    BattleStatus.checkMaxHp(monsterData,monsterData.isMe,0);
                    BattleStatus.checkMaxHp(monsterData,!monsterData.isMe,0);
                    break;
                case MonsterMoveStatus.BACK:
                    // let monsterOwnDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
                    // delete monsterList[name];
                    // let idx=monsterDataList.indexOf(monsterData);
                    // if(idx>-1)
                    // {
                    //     monsterDataList.splice(idx,1);
                    // }
                    // let idx2=monsterOwnDataList.indexOf(monsterData);
                    // if(idx2>-1)
                    // {
                    //     monsterOwnDataList.splice(idx2,1);
                    // }
                    BattleStatus.battleCheckCount(isMe,"l");
                    if(monsterData.getIsBoss())
                    {//boss多掉一滴血
                        BattleStatus.battleCheckCount(isMe,"l");
                    }
                    break;
                default:
                    break;
            }
        // }
    }

    //为双方生成产生sp的怪物
    protected transferEnermy(isMe : boolean, star : number):void{
        let averageLv:number=Api.BattleVoApi.getLvValue();
        let round=BattleStatus.round;
        let roundCfg = Config.TogetherCfg.getChallangeCfg((round + 1) % 10 == 0 ? (round - 1) : round);
        let keys = Object.keys(roundCfg);
        let cfg:Config.ChallengeItemCfg=roundCfg[keys[0]][0];
        if(cfg)
        {
            let enemyVo:MonsterVo=new MonsterVo();
            let bt=BattleStatus.battleLogicHasTickTime-BattleStatus.getRoundStartT()+Api.BattleVoApi.getAddMonsterDelay();
            enemyVo.birthTime=bt;
            enemyVo.hp=cfg.getHpByLv(averageLv) * (1 + 2) * star;
            enemyVo.isEnemy=true;
            enemyVo.isMe=isMe;
            enemyVo.initData(cfg);
            enemyVo.monsterSp = enemyVo.monsterSp + (Math.floor(Math.max(0, BattleStatus.round - 40) / 5) * 10) * 4 * star;
            let roundList = isMe?BattleStatus.meBatteRoundDataList:BattleStatus.targetBatteRoundDataList;
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
        return false;
    }

    protected chatHandler () {
        SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
        if(!this.chatList){
            let view = this;
            this.chatList = new ChatView();
            this.chatList.init();
            this.chatList.setExpBg("chatview_exp_bg4");
            this.chatList.setExpListXY(298, 143);
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
                this.chatDB.x = GameConfig.stageWidth - 107;
                this.chatDB.y = GameConfig.stageHeigth - 234;
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
                this.chatDBother.y = 83;
            }
            this.addChild(this.chatDBother);
            // this.chatDBother.visible = true;
            this.chatDBother.displayDB(opt["upId"]);
        }
    }
    protected getSoundBgName(){
        return "music_battle_3"
    }

    public dispose():void{
        this._arrowGroup = null;
        this._centerarrowGroup = null;
        this._totalGroup = null;
        super.dispose();
    }
}