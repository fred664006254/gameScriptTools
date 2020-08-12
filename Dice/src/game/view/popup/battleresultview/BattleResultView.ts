/**
 * 战斗结算
 * author qianjun
 * 参数 
 * type 1对战 2协助
 * info battle.init返回的player中下方玩家信息
 * finfo battle.init返回的player中上方玩家信息
 * turns 轮数
 * winFlag 下方为主视角 0负 1胜
 * value 获得/减少的奖杯数
 * rewardArr 获得的信息
 */
class BattleResultView extends PopupView{

    private _isclick = false;
    private _totalScore = 0;
    private _totalCoin = 0;
    private _totalGem = 0;
    private _rewaedBtn : BaseButton = null;
    private _conBtn : BaseButton = null;
	public constructor() {
		super();
    }

	protected getResourceList():string[]{	
		let array:string[] = [];
        array.concat(super.getResourceList());
		return array.concat([
            `battleresultview`,`win_fnt`,"joinwarinputbg",
		]);
    }

	protected isTouchMaskClose():boolean{
		return false;
    }

    protected getTitleStr(){
		return null;
    }
    
    protected getTitleBgName(){
		return null;
    }
    
    protected getCloseBtnName(){
		return null;
	}

    protected getBgName():string{
        return null;
    }

	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
        view.name = `BattleResultView`;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
    }

	protected resetBgSize():void{
        let view = this;
        view._maskBmp.alpha = 1.2;
        super.resetBgSize();
        //下方为主视角
     
        let param = view.param.data;
        let type = param.type;
        let winflag = param.winFlag;

        let basegroup = new BaseDisplayObjectContainer();
        basegroup.width = view.width;
        // basegroup.height = view.height;
        view.addChildToContainer(basegroup);
        //type 1 对战 2 协作
        if(type == 1 || type == 3){
            if(winflag == 0)
            {
                SoundMgr.playEffect(SoundConst.EFFECT_FAILURE);
            }   
            else
            {
                SoundMgr.playEffect(SoundConst.EFFECT_VICTORY);
                if(Api.AdvertiseVoApi.notfriend){
                    Api.AdvertiseVoApi.notfriend = false;
                    Api.AdvertiseVoApi.setPlayHuo(false);
                }
            }

            let light = view.createLight();

            let topresult = BaseBitmap.create(`result${winflag == 1 ? `lose` : `win`}`);
            basegroup.addChild(topresult);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topresult, basegroup);

            let topgroup = view.createInfoGroup(param.finfo);
            basegroup.addChild(topgroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topgroup, topresult, [0,topresult.height]);

            let waveIcon = BaseBitmap.create(`resultvs`);
            basegroup.addChild(waveIcon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, waveIcon, topgroup, [0,topgroup.height+80]);

            let downresult = winflag == 1 ? view.createWinGroup() : view.createLoseGroup();
            basegroup.addChild(downresult);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, downresult, waveIcon, [0,waveIcon.height+80]);

            let downgroup = view.createInfoGroup(param.info);
            basegroup.addChild(downgroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, downgroup, downresult, [0,downresult.height]);

            let btnstr = LangMger.getlocal(winflag == 0 || type == 3 ? `confirmBtn` : `reward`);
            let btn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM , btnstr, ()=>{
                if(type == 3){
                    if(param.callback){
                        param.callback.apply(param.handle,[this]);
                    }
                    view.hide();
                    return;
                }
                if(winflag == 1){
                    if(view._isclick){
                        return;
                    }
                    view._isclick = true;
                    if(Api.GameinfoVoApi.checlIsInGuideId(14)){
                        App.CommonUtil.sendNewGuideId(14);
                        App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                        Api.GameinfoVoApi.setCurGudingId(15);
                    }
                    waveIcon.dispose();
                    light.dispose();
                    btn.dispose();

                    rewardGroup.alpha = 1;
                    //创建详细奖励弹窗
                    egret.Tween.get(topgroup).to({y : -topgroup.height, alpha : 0}, 600).call(()=>{
                        egret.Tween.removeTweens(topgroup);
                        topgroup.dispose();
                    },view);

                    egret.Tween.get(topresult).to({y : -topresult.height-topgroup.height, alpha : 0}, 600).call(()=>{
                        egret.Tween.removeTweens(topresult);
                        topresult.dispose();
                    },view);

                    let closebtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal(`confirmBtn`), ()=>{
                        if(Api.GameinfoVoApi.checlIsInGuideId(15)){
                            App.CommonUtil.sendNewGuideId(15);
                            Api.GameinfoVoApi.setCurGudingId(16);
                        }
                        if(param.callback){
                            param.callback.apply(param.handle,[this]);
                        }	
                        if(param.type == 2 && Api.DailytaskVoApi.canGetOrpBox() && !Api.GameinfoVoApi.getIsFinishStepGuide(31)){
                            Api.GameinfoVoApi.setCurGudingId(31);
                            NetManager.request(NetConst.REQUEST_USER_STEPGUILD, {stepId:`31`});
                            PlatMgr.analyticsCompleteNewGuide();
                            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                        }
                        view.hide();
                        // let unitgroup = <BaseDisplayObjectContainer>rewardGroup.getChildByName(`unitgroup1`);
                        // if(unitgroup){
                        //     unitgroup.setScale(0.8);
                        //     egret.Tween.get(unitgroup).to({scaleX : 1.2, scaleY : 1.2}, 500).to({scaleX : 1, scaleY : 1}, 200).call(()=>{
                        //         egret.Tween.removeTweens(unitgroup); 
                        //     },view);
                        // }
                    }, view, null, 0, 0, ColorEnums.white, 182);
                    view._conBtn = closebtn;

                    let tmpY = 0;
                    let db1 = basegroup.getChildByName(`db1`);
                    let db2 = basegroup.getChildByName(`db2`);
                    tmpY = (basegroup.height - downgroup.height - downresult.height - rewardGroup.height - closebtn.height - 40 - 50) / 2;

                    egret.Tween.get(downgroup).to({y : tmpY + downresult.height}, 600).call(()=>{
                        egret.Tween.removeTweens(downgroup);
                    },view);

                    egret.Tween.get(downresult).to({y : tmpY}, 600).call(()=>{
                        egret.Tween.removeTweens(downresult);
                    },view);

                    let totalgroup = <BaseDisplayObjectContainer>rewardGroup.getChildByName(`unitgroup4`);
                    let scroeTxt = <BaseTextField>totalgroup.getChildByName(`scroeTxt`);
                    let coinTxt = <BaseTextField>totalgroup.getChildByName(`coinTxt`);
                    let gemTxt = <BaseTextField>totalgroup.getChildByName(`gemTxt`);

                    egret.Tween.get(rewardGroup).to({y : tmpY+downresult.height+downgroup.height+40}, 600).call(()=>{
                        egret.Tween.removeTweens(rewardGroup);

                        for(let i = 1; i <= 3; ++ i){
                            let unitgroup = <BaseDisplayObjectContainer>rewardGroup.getChildByName(`unitgroup${i}`);
                            unitgroup.anchorOffsetX = unitgroup.width / 2;
                            unitgroup.anchorOffsetY = unitgroup.height / 2;
                            unitgroup.x += unitgroup.anchorOffsetX;
                            unitgroup.y += unitgroup.anchorOffsetY;
                            if(unitgroup){
                                egret.Tween.get(unitgroup).wait(100 + (i - 1) * 200).to({alpha : 1, scaleX : 1, scaleY : 1}, 150).call(()=>{
                                    egret.Tween.removeTweens(unitgroup); 
                                    if(i == 3){
                                        if(view._totalScore){
                                            App.TweenUtil.numTween(scroeTxt, 0, view._totalScore);
                                        }
                                        if(view._totalCoin){
                                            App.TweenUtil.numTween(coinTxt, 0, view._totalCoin);
                                        }
                                        if(view._totalGem){
                                            App.TweenUtil.numTween(gemTxt, 0, view._totalGem);
                                        }
                                    }
                                },view);
                            }
                        }
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, closebtn, rewardGroup, [0,rewardGroup.height+50]);
                        basegroup.addChild(closebtn);
                        if(Api.GameinfoVoApi.checlIsInGuideId(15)){
                            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                        }
                    },view);

                   
                    if(db1){
                        egret.Tween.get(db1).to({y : tmpY}, 600).call(()=>{
                            egret.Tween.removeTweens(db1);
                        },view);

                        egret.Tween.get(db2).to({y : tmpY}, 600).call(()=>{
                            egret.Tween.removeTweens(db2);
                        },view);
                    }
                }
                else{
                    if(param.callback){
                        param.callback.apply(param.handle,[this]);
                    }	
                    if(param.type == 2 && Api.DailytaskVoApi.canGetOrpBox() && !Api.GameinfoVoApi.getIsFinishStepGuide(31)){
                        Api.GameinfoVoApi.setCurGudingId(31);
                        NetManager.request(NetConst.REQUEST_USER_STEPGUILD, {stepId:`31`});
                        PlatMgr.analyticsCompleteNewGuide();
                        App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                    }
                    view.hide();
                }
            }, view, null, 0, 0, ColorEnums.white, 182);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, downgroup, [0,downgroup.height+120]);
            basegroup.addChild(btn);
            btn.visible = true;
            view._rewaedBtn = btn;

            basegroup.height = btn.y + btn.height;

            light.mask = new egret.Rectangle(0,0,640,230);
            if(winflag == 1){
                basegroup.addChild(light);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, light, downgroup);
            }
            else{
                let rewardArr = view.param.data.rewardArr;
                let value = 0;
                for(let i in rewardArr){
                    if(rewardArr[i] && rewardArr[i].score){
                        value = rewardArr[i].score;
                        break;
                    }
                }
                if(value != 0){
                    let addTxt = ComponentMgr.getTextField(`${value}`, TextFieldConst.SIZE_28, 0xfb0f0f);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, addTxt, downgroup, [80,downgroup.height+15]);
                    basegroup.addChild(addTxt);
                }
            }

            if(App.CommonUtil.check_dragon()){
                let tmpHeight = topresult.height + topgroup.height + 80 + waveIcon.height + 80 - 20;
                downresult.visible = false;
                egret.Tween.get(basegroup).wait(350).call(()=>{
                    if(winflag == 1){
                        let db1 = App.DragonBonesUtil.getLoadDragonBones(`win_1`, 1, `win`);
                        db1.setPosition(downresult.x+downresult.width/2,tmpHeight);
                        basegroup.addChildAt(db1, basegroup.getChildIndex(downgroup) - 1);
                        db1.name = `db1`;

                        let db2 = App.DragonBonesUtil.getLoadDragonBones(`win_2`, 1, `win`);
                        db2.setPosition(downresult.x+downresult.width/2,tmpHeight);
                        basegroup.addChild(db2);
                        db2.name = `db2`;
                    }
                    else{
                        let db = App.DragonBonesUtil.getLoadDragonBones(`lose`, 1, `lose`);
                        db.setPosition(downresult.x+downresult.width/2,tmpHeight);
                        basegroup.addChild(db);
                    }
                    
                }, view).wait(1000).call(()=>{
                    // btn.visible = true;
                    egret.Tween.removeTweens(basegroup);
                },view);
            }
            basegroup.y = (view.height - basegroup.height) / 2;

            let rewardGroup = view.createRewardGroup();
            basegroup.addChild(rewardGroup);
            rewardGroup.y = view.height;
            rewardGroup.alpha = 0;
        } 
        else{
            SoundMgr.playEffect(SoundConst.EFFECT_SYNERGY);
            basegroup.height = view.height;
            let turns = param.turns;

            let powerNum = turns;
            if(turns > 50){
                powerNum = 50 + 3*(turns - 50);
            }
    
            let light = view.createLight();
            basegroup.addChild(light);
    
            let waveIcon = BaseBitmap.create(`resultwave`);

            let waveTxt = ComponentMgr.getTextField(LangMger.getlocal(`ranktip2`, [turns]), TextFieldConst.SIZE_40, ColorEnums.white);
            waveTxt.strokeColor = 0x0d4a87;
            waveTxt.stroke = 2;
    
            let icon = BaseBitmap.create(`task_power`);
            icon.name= "task_power"

            let valueTxt = ComponentMgr.getTextField(`+${powerNum}`, TextFieldConst.SIZE_28, ColorEnums.white);
            
            let btn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal(`confirmBtn`), ()=>{
                if(param.callback){
                    param.callback.apply(param.handle,[this]);
                }	
                if(param.type == 2 && Api.DailytaskVoApi.canGetOrpBox() && !Api.GameinfoVoApi.getIsFinishStepGuide(31)){
                    Api.GameinfoVoApi.setCurGudingId(31);
                    NetManager.request(NetConst.REQUEST_USER_STEPGUILD, {stepId:`31`});
                    PlatMgr.analyticsCompleteNewGuide();
                    App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                }
                Api.UserinfoVoApi.setFreshCard(false);
                App.MsgHelper.dispEvt(MsgConst.FLY_EFFECT, null);
                view.hide();
            }, view, null, 0, 0, ColorEnums.white, 182);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, basegroup, [0,50]);
            basegroup.addChild(btn);
    
            let topgroup = view.createInfoGroup(param.finfo);
            basegroup.addChild(topgroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topgroup, basegroup, [0,220]);
    
            let downgroup = view.createInfoGroup(param.info);
            basegroup.addChild(downgroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, downgroup, basegroup, [0,220]);
    
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, waveIcon, basegroup, [0,topgroup.y+148+(downgroup.y - (topgroup.y+148) - waveIcon.height)/2]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, waveTxt, waveIcon, [0,105]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, waveIcon, [(waveIcon.width-icon.width-valueTxt.textWidth-5)/2,waveIcon.height+15]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, valueTxt, icon, [icon.width+5,0]);
            
            light.setScale(0.7);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, light, waveIcon, [0,0]);
            if(App.CommonUtil.check_dragon()){
                egret.Tween.get(basegroup).wait(350).call(()=>{
                    let db = App.DragonBonesUtil.getLoadDragonBones(`battle_result_cop`, 0, `idle`);
                    db.setPosition(waveIcon.x+waveIcon.width/2,waveIcon.y+waveIcon.height/2+35);
                    basegroup.addChild(db);

                    waveTxt.visible = valueTxt.visible = false;
                    basegroup.addChild(waveTxt)
                    basegroup.addChild(valueTxt);
                }, view).wait(1500).call(()=>{
                    egret.Tween.removeTweens(basegroup);
                    waveTxt.visible = valueTxt.visible = true;
                },view);
            }
            else{
                basegroup.addChild(waveIcon);
                basegroup.addChild(waveTxt)
                basegroup.addChild(icon);
                basegroup.addChild(valueTxt);
            }
            basegroup.y = (view.height - basegroup.height) / 2;
        }
    }

    protected preInit():void{
        super.preInit();
        if(Api.GameinfoVoApi.checlIsInGuideId(13)){
            Api.GameinfoVoApi.setCurGudingId(14);
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
        }
    }

    //胜利的一些装饰图
    private createWinGroup():BaseDisplayObjectContainer{
        let view = this;
        let group = new BaseDisplayObjectContainer();
        group.width = 325;
        group.height = 116;
        let arr = [`v`,`i`,`c`,`t`,`o`,`r`,`y`];
        let pos = {
            v : [0,0],
            i : [62,0],
            c : [81,0],
            t : [130,0],
            o : [172,0],
            r : [232,0],
            y : [273,0],
        }
        let fontgroup = new BaseDisplayObjectContainer();
        fontgroup.width = 325;
        fontgroup.height = 85;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fontgroup, group, [0,0], true);
        group.addChild(fontgroup);
        for(let i in arr){
            let font = BaseBitmap.create(`win_${arr[i]}`);
            fontgroup.addChild(font);
            font.setPosition(pos[arr[i]][0], pos[arr[i]][1]);
        }

        let effpos = {
            1 : [-30,90],
            2 : [345,90],
            3 : [-60,63],
            4 : [315,65],
            5 : [340,30],
            6 : [173,0],
            7 : [-20,40],
            8 : [-10,115]
        }
        for(let i = 1; i < 9; ++ i){
            let eff = BaseBitmap.create(`wineffect${i}`);
            group.addChild(eff);
            eff.setPosition(effpos[i][0], effpos[i][1]);
        }

        let stars = BaseBitmap.create(`winstars`);
        stars.anchorOffsetX = stars.width / 2;
        stars.anchorOffsetY = stars.height / 2;
        group.addChild(stars);
        stars.setPosition(8,-20);

        let stars2 = BaseBitmap.create(`winstars`);
        stars2.anchorOffsetX = stars2.width / 2;
        stars2.anchorOffsetY = stars2.height / 2;
        group.addChild(stars2);
        stars2.rotation = -12;
        stars2.setPosition(-80,90);
        stars2.alpha = 0.5;

        let stars3 = BaseBitmap.create(`winstars`);
        stars3.anchorOffsetX = stars3.width / 2;
        stars3.anchorOffsetY = stars3.height / 2;
        group.addChild(stars3);
        stars3.rotation = 20;
        stars3.setPosition(405,55);
        stars3.alpha = 0.5;

        group.mask = new egret.Rectangle(-136,-200,600,group.height+205);
        return group;
    }

    //胜利的详细
    private createRewardGroup():BaseDisplayObjectContainer{
        let view = this;
        let group = new BaseDisplayObjectContainer();
        let arr = view.param.data.rewardArr;
        let scoretotal = 0;
        let goldtotal = 0;
        let gemtotal = 0;
        let colors = {
            1: 0xFFFFFF,
            2: 0x8DEDFF,
            3: 0xF3CA26
        }
        for(let i = 1; i <= 3; ++i){
            let unitgroup = new BaseDisplayObjectContainer();
            unitgroup.setScale(1.3);
            unitgroup.alpha = 0;
            unitgroup.name = `unitgroup${i}`;
            unitgroup.width = GameConfig.stageWidth;
            group.addChild(unitgroup);
            unitgroup.setPosition(0,(i - 1)*(70));

            let icon = BaseBitmap.create(`resulticon${i}`);
            unitgroup.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, unitgroup, [75,0]);

            let icontxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_18, colors[i]);
            unitgroup.addChild(icontxt);
            icontxt.text = LangMger.getlocal("resulticontxt"+i);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, icontxt, icon, [0,-icontxt.height + 2]);
            

            if(arr[i] && arr[i].score){
                App.DisplayUtil.changeToNormal(icon);
                App.DisplayUtil.changeToNormal(icontxt);
            }
            else{
                App.DisplayUtil.changeToGray(icon);
                App.DisplayUtil.changeToGray(icontxt);
            }
            if(i == 2 && arr[i] && arr[i].winNum && arr[i].winNum > 1){//
                let winnum = <BaseBitmapText>ComponentMgr.getBitmapText(arr[i].winNum,"win_fnt",NaN,TextFieldConst.SIZE_TITLE_COMMON,true);
                winnum.letterSpacing = -5;
                unitgroup.addChild(winnum);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, winnum, icon, [icon.width-25,3]);
            }

            let score = 0;
            if(arr[i] && arr[i].score > 0){
                score = arr[i].score;
            }
            scoretotal += score;
            let scroeIcon = BaseBitmap.create(`trophy_icon`);
            scroeIcon.setScale(0.336);
            unitgroup.addChild(scroeIcon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scroeIcon, icon, [icon.width+70,16]);

            let scroeTxt = ComponentMgr.getTextField(`+${score}`, TextFieldConst.SIZE_28);
            unitgroup.addChild(scroeTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scroeTxt, scroeIcon, [scroeIcon.width*scroeIcon.scaleX+10,0]);

            if(score == 0){
                App.DisplayUtil.changeToGray(scroeIcon);
                App.DisplayUtil.changeToGray(scroeTxt);
            }

            let coin = 0;
            if(arr[i] && arr[i].gold){
                coin = arr[i].gold;
            }
            goldtotal += coin;
            let coinIcon = BaseBitmap.create(`public_icon2`);
            unitgroup.addChild(coinIcon);
            coinIcon.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, coinIcon, scroeIcon, [scroeIcon.width*scroeIcon.scaleX+100,0]);

            let coinTxt = ComponentMgr.getTextField(`+${coin}`, TextFieldConst.SIZE_28, 0xfce690);
            unitgroup.addChild(coinTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, coinTxt, coinIcon, [coinIcon.width*coinIcon.scaleX+10,0]);

            if(coin == 0){
                App.DisplayUtil.changeToGray(coinIcon);
                App.DisplayUtil.changeToGray(coinTxt);
            }

            let gem = 0;
            if(arr[i] && arr[i].gem){
                gem = arr[i].gem;
            }
            gemtotal += gem;
            let gemIcon = BaseBitmap.create(`public_icon1`);
            unitgroup.addChild(gemIcon);
            gemIcon.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemIcon, coinIcon, [coinIcon.width*coinIcon.scaleX+100,0]);

            let gemTxt = ComponentMgr.getTextField(`+${gem}`, TextFieldConst.SIZE_28, 0xF29BFF);
            unitgroup.addChild(gemTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemTxt, gemIcon, [gemIcon.width*gemIcon.scaleX+10,0]);

            if(gem == 0){
                App.DisplayUtil.changeToGray(gemIcon);
                App.DisplayUtil.changeToGray(gemTxt);
            }
        }

        let unitgroup = new BaseDisplayObjectContainer();
        unitgroup.name = `unitgroup4`;
        unitgroup.width = GameConfig.stageWidth;
        group.addChild(unitgroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, unitgroup, group, [0,250]);

        let totalbg = BaseBitmap.create(`resultscorebg`);
        totalbg.width = 640;
        totalbg.height = 60;
        unitgroup.addChild(totalbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, totalbg, unitgroup);

        let totalTxt = ComponentMgr.getTextField(LangMger.getlocal(`systotal`),TextFieldConst.SIZE_32);
        unitgroup.addChild(totalTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, totalTxt, totalbg, [65,0]);

        let scroeIcon = BaseBitmap.create(`trophy_icon`);
        scroeIcon.setScale(0.336);
        unitgroup.addChild(scroeIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scroeIcon, totalTxt, [totalTxt.width+58,0]);

        view._totalScore = scoretotal;
        let scroeTxt = ComponentMgr.getTextField(`+${0}`, TextFieldConst.SIZE_28);
        unitgroup.addChild(scroeTxt);
        scroeTxt.name = `scroeTxt`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scroeTxt, scroeIcon, [scroeIcon.width*scroeIcon.scaleX+10,0]);

        if(scoretotal == 0){
            App.DisplayUtil.changeToGray(scroeIcon);
            App.DisplayUtil.changeToGray(scroeTxt);
        }

        let coinIcon = BaseBitmap.create(`public_icon2`);
        unitgroup.addChild(coinIcon);
        coinIcon.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, coinIcon, scroeIcon, [scroeIcon.width*scroeIcon.scaleX+100,0]);

        view._totalCoin = goldtotal;
        let coinTxt = ComponentMgr.getTextField(`+${0}`, TextFieldConst.SIZE_28, 0xfce690);
        unitgroup.addChild(coinTxt);
        coinTxt.name = `coinTxt`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, coinTxt, coinIcon, [coinIcon.width*coinIcon.scaleX+10,0]);

        if(goldtotal == 0){
            App.DisplayUtil.changeToGray(coinIcon);
            App.DisplayUtil.changeToGray(coinTxt);
        }

        let gemIcon = BaseBitmap.create(`public_icon1`);
        unitgroup.addChild(gemIcon);
        gemIcon.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemIcon, coinIcon, [coinIcon.width*coinIcon.scaleX+100,0]);

        view._totalGem = gemtotal;
        let gemTxt = ComponentMgr.getTextField(`+${0}`, TextFieldConst.SIZE_28, 0xF29BFF);
        unitgroup.addChild(gemTxt);
        gemTxt.name = `gemTxt`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemTxt, gemIcon, [gemIcon.width*gemIcon.scaleX+10,0]);

        if(gemtotal == 0){
            App.DisplayUtil.changeToGray(gemIcon);
            App.DisplayUtil.changeToGray(gemTxt);
        }
        return group;
    }

    //失败的一些装饰图
    private createLoseGroup():BaseDisplayObjectContainer{
        let view = this;
        let group = new BaseDisplayObjectContainer();
        group.width = 473;
        group.height = 116;

        let arr = [`l`,`o`,`s`,`e`];
        let pos = {
            l : [0,0],
            o : [61,0],
            s : [123,0],
            e : [169,0],
        }
        let fontgroup = new BaseDisplayObjectContainer();
        fontgroup.width = 194;
        fontgroup.height = 85;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fontgroup, group, [0,0], true);
        group.addChild(fontgroup);
        for(let i in arr){
            let font = BaseBitmap.create(`lose_${arr[i]}`);
            fontgroup.addChild(font);
            font.setPosition(pos[arr[i]][0], pos[arr[i]][1]);
            if(Number(i) == 0){
                font.anchorOffsetX = font.width / 2;
                font.anchorOffsetY = font.height / 2;
                font.x += font.anchorOffsetX;
                font.y += font.anchorOffsetY;
                font.rotation = -30;
            }
        }

        let zshi1 =  BaseBitmap.create(`loseeff1`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, zshi1, fontgroup, [-47,-10]);
        group.addChild(zshi1);

        let zshi2 =  BaseBitmap.create(`loseeff2`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, zshi2, fontgroup, [fontgroup.width+25,0]);
        group.addChild(zshi2);

        let zshi3 = BaseBitmap.create(`loseeff3`);
        group.addChild(zshi3);
        let zshi4 = BaseBitmap.create(`loseeff3`);
        group.addChild(zshi4);
        zshi4.anchorOffsetX = zshi4.width / 2;
        zshi4.anchorOffsetY = zshi4.height / 2;
        zshi4.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, zshi3, fontgroup, [-zshi4.width-80,-10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, zshi4, fontgroup, [fontgroup.width+95,-10]);

        return group;
    }

    private createInfoGroup(info : any):BaseDisplayObjectContainer{
        let view = this;
        let group = new BaseDisplayObjectContainer();
        group.width = 600;
        group.height = 200;

        let bg = BaseBitmap.create(`resultdicelinebg`);
        bg.width = group.width;
        bg.height = 148;
        group.addChild(bg);

        //出站队列
        let line = info.upInfo;
        let list = ComponentMgr.getScrollList(DiceTeamItem,line,new egret.Rectangle(0,0,575,140),0);
        list.verticalScrollPolicy = `off`;
        list.horizontalScrollPolicy = `off`;
		group.addChild(list);
        list.setPosition(16,17);
        for(let i = 0 ;i < line.length; ++ i){
            let item = <DiceTeamItem>list.getItemByIndex(i);
            item.status = 2;
        }

        //玩家信息
        let levelinfobg = BaseBitmap.create(`resultinfobg`);
        levelinfobg.width = 182;
        levelinfobg.height = 36;
        group.addChild(levelinfobg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelinfobg, bg, [40,bg.height+10]);

        // let levelbg = BaseBitmap.create(`public_level_${info.level}`);
        let levelbg = BaseLoadBitmap.create(`levelicon${info.level}`);
        group.addChild(levelbg);
        levelbg.setScale(0.175);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelbg, levelinfobg, [-levelbg.width*levelbg.scaleX/2,0]);

        let name = info.uid < 1000?Config.NamesCfg.getEnemyName(info):info.name;
        let nameTxt = ComponentMgr.getTextField(name, TextFieldConst.SIZE_24);
        group.addChild(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, levelinfobg);

        let winrateinfobg = BaseBitmap.create(`resultinfobg`);
        winrateinfobg.width = 142;
        winrateinfobg.height = 36;
        group.addChild(winrateinfobg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, winrateinfobg, levelinfobg, [levelinfobg.width+25,0]);

        let winrateicon = BaseBitmap.create(`battlelogicon`);
        winrateicon.setScale(1.1);
        group.addChild(winrateicon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, winrateicon, winrateinfobg, [-10,0]);

        let win = info.win ? info.win : 0;
        let lose = info.lose ? info.lose : 0; 
        let winrateTxt = ComponentMgr.getTextField(`${((win == 0 ? 0 : (win/(win+lose)))*100).toFixed(0)}%`, TextFieldConst.SIZE_24);
        group.addChild(winrateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, winrateTxt, winrateinfobg);

        let scoreinfobg = BaseBitmap.create(`resultinfobg`);
        scoreinfobg.width = 172;
        scoreinfobg.height = 36;
        group.addChild(scoreinfobg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreinfobg, winrateinfobg, [winrateinfobg.width+16,0]);

        let scoreicon = BaseBitmap.create(`trophy_icon`);
        scoreicon.setScale(0.4);
        group.addChild(scoreicon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scoreicon, scoreinfobg, [0,0]);

        let score = info.score ? info.score : 0;
        let scoreTxt = ComponentMgr.getTextField(`${score}`, TextFieldConst.SIZE_24);
        group.addChild(scoreTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, scoreinfobg);

        return group;
    }

    private createLight():BaseDisplayObjectContainer{
        let view = this;
        let group = new BaseDisplayObjectContainer();

        let light = BaseBitmap.create(`public_light`);
        group.addChild(light);
        light.anchorOffsetX = group.width / 2;
        light.anchorOffsetY = group.height / 2;
        egret.Tween.get(light, {loop : true}).to({rotation : 360}, 3000);

        group.width = light.width;
        group.height = light.height;

        light.x = group.width / 2;
        light.y = group.height / 2;
        return group;
    }

	public hide(){	
		super.hide();
	}
    
	public dispose():void{
        let view = this;
        view._isclick = false;
        view._totalScore = 0;
        view._totalCoin = 0;
        view._totalGem = 0;
        view._rewaedBtn = null;
        view._conBtn = null;
		super.dispose();
	}
}