/**
 * 皇陵海层数宝箱item
 * author qianjun
 */
class AcLocTombSeaBoxItem  extends ScrollListItem
{
    private _icon : BaseLoadBitmap = null;
    private _data : any = null;
    private _alpha : BaseBitmap = null;
    private _done : BaseBitmap = null;

    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.LocTombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLocTombVo{
        return <AcLocTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	private get aid() : string{
        return AcConst.AID_LOCTOMB;
	}
	
	private get code() : string{
        return this._code;
    }

    private _code;
    protected initItem(index:number,data,itemparam)
    {
        /*  
            floor//当前层数,
            id//对应编号,
        */
        let view = this;
        view._code = itemparam;
        view.width = 103;
        view.height = 80;
        view._data = data;
        
        let iconStr = `teamiconstatus1-${view.code}`;
        let icon = BaseLoadBitmap.create(iconStr);
        icon.width = 77;
        icon.height = 77;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, view, [10,2], true);
        view.addChild(icon);

        icon.addTouchTap(()=>{
            let boxdata = view.vo.getBoxDataById(data.id);
            if(view.vo.moviePlay || !boxdata){
                return;
            }
            if(!this.vo.getAttendQUality()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`loctombattend2-${this.code}`, [Api.playerVoApi.getPlayerOfficeByLevel(this.cfg.lvNeed)]));
                return;
            }
            if(this.vo.et < GameData.serverTime){
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if(!this.vo.isInActTime()){
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if(!view.vo.isInFightTime()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc6"));
                return;
            }

            let cfg = view.cfg.getBossNpcItemCfgById(boxdata.foe);
            let status = view.vo.getBoxStatusById(data.id);
            let param = view.vo.getParamMap(data.id);
            if(status == 1){
                let finished = view.vo.getBoxRewardById(data.id);
                if(finished){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`loctombattacktip3-${view.code}`));
                    return;
                }

                let searchBuyNum = view.vo.getTanSuoNum().num;
                if(!searchBuyNum){
                    let searchBuyNum = view.vo.getBuySearchNum();
                    let needNum = view.cfg.buyNumCost[Math.min(searchBuyNum,9)];

                    let message = LanguageManager.getlocal(`loctombbuysearchtip-${view.code}`,[String(needNum)]);
                    let mesObj = {
                        confirmCallback:()=>{
                            let searchBuyNum = view.vo.getBuySearchNum();
                            let needNum = view.cfg.buyNumCost[Math.min(searchBuyNum,9)];
                            if(Api.playerVoApi.getPlayerGem() >= needNum){
                                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBBUYSEARCH, {
                                    activeId : view.vo.aidAndCode,
                                });	
                            }
                            else{
                                App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
                            }
                        }, 
                        handler: this, 
                        icon:  "itemicon1",
                        iconBg: "itembg_1", 
                        num: Api.playerVoApi.getPlayerGem(), 
                        useNum:needNum,
                        msg: message ,
                        id : 1,
                    };
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj);
                    return;
                }
                //发消息
                /*** 
                 *** 
                */
                view.vo.setClickIdx('1',data.id);
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBDIG, {
                    activeId : view.vo.aidAndCode,
                    index : param.index,
                    x : param.x,
                    y : param.y
                });
            }
            else if(status == 2){
                if(cfg.type == 2){
                    let finished = view.vo.getBoxRewardById(data.id);
                    if(finished){
                        App.CommonUtil.showTip(LanguageManager.getlocal(`loctombfloorboxtip2-${view.code}`));
                    }
                    else{
                        SoundManager.playEffect(SoundConst.EFFECT_TOMB_REWARD);
                        
                        //宝箱飞出特效
                        view._icon.alpha = 0;
                        let icon = BaseBitmap.create(cfg.getnpcPic(view.code));
                        icon.anchorOffsetX = icon.width / 2;
                        icon.anchorOffsetY = icon.height / 2;
                        icon.setScale(0.345);
                        icon.x = 50;
                        icon.y = 40;
                        view.addChild(icon);
                        let point = icon.localToGlobal(icon.x, icon.y);

                        let circle = BaseBitmap.create(`tombboxcircle${cfg.id}-${view.code}`);
                        circle.anchorOffsetX = circle.width / 2;
                        circle.anchorOffsetY = circle.height / 2;
                        circle.setScale(0.69);
                        circle.x = 50;
                        circle.y = 40;
                        circle.alpha = 0;
                        view.addChild(circle);
                        
                        view.vo.moviePlay = true;
                        //光晕动画
                        egret.Tween.get(icon).to({scaleX : 0.4, scaleY : 0.4},130).to({scaleX : 0.345, scaleY : 0.345},200).call(()=>{
                            egret.Tween.removeTweens(icon);
                        }, view);

                        egret.Tween.get(circle).to({alpha : 1}, 250).to({alpha : 0}, 80).call(()=>{
                            egret.Tween.removeTweens(circle);
                            view.removeChild(circle);
                            //宝箱飞行动画
                            ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBSEARCHRESULTVIEW,{
                                aid : view.aid,
                                code : view.code,
                                foeId : cfg.id,
                                bosskey : boxdata.bossId,//evt.data.data.data.bosskey
                                func : view.update,
                                obj : view,
                                point : point,
                                id : view._data.id
                            });
                        }, view);
                        view.removeChild(icon);
                        //egret.Tween.get(circle).to({scaleX : 0.8, scaleY : 0.8},130).to({scaleX : 0.69, scaleY : 0.69},200);
                    }
                }
                else if(cfg.type == 1){
                    ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBBATTLEVIEW,{
                        aid : view.aid,
                        code : view.code,
                        foeId : cfg.id,
                        bosskey : boxdata.bossId,
                        id : view._data.id
                    });
                }
                else if(cfg.type == 3){
                    let finished = view.vo.getBoxRewardById(data.id);
                    if(finished){
                        App.CommonUtil.showTip(LanguageManager.getlocal(`loctombattacktip3-${view.code}`));
                        return;
                    }
                    //物品奖励
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBATTACK, {
                        activeId : view.vo.aidAndCode,
                        index : param.index,
                        x : param.x,
                        y : param.y
                    });
                }
            }
            else if(status == 3){
                let finished = view.vo.getBoxRewardById(data.id);
                if(finished){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`loctombattacktip3-${view.code}`));
                    return;
                }
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, view, [10,2], true);
        view.addChild(icon);
        view._icon = icon;

        let alpha = BaseBitmap.create(`tombboxalpha-${view.code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, alpha, view._icon);
        view.addChild(alpha);
        view._alpha = alpha;

        let done = BaseBitmap.create(`tombboxdone-${view.code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, done, view._icon, [-5,-5]);
        view.addChild(done);
        view._done = done;
        alpha.visible = done.visible = false;

        view.update();
    }

    private playBoxEff(data : any):void{
        let view = this;
        view.vo.moviePlay = true;
        /** tombboxef1-  tombdoor1- doorlight-1 tombbubble1-
         * 首先播放1文件夹里的序列。帧间隔0.07s，最后一帧停留0.21s，
        然后播放2文件夹里的序列，帧间隔0.07s，播放2的同时
        门光出现，透明度变化100%-0%，用时0.28s。缩放比例是400%
        播放2文件序列的0.07s后，播放泡泡序列，帧间隔0.07s。位置在门框上。
        这里面，1和2的序列是正常模式，泡泡和门光是oneone模式
        */
        let tombboxef = ComponentManager.getCustomMovieClip(`tombboxef${view.code}-`, 5, 70);
		tombboxef.width = 125;
		tombboxef.height = 145;
		tombboxef.anchorOffsetX = tombboxef.width / 2;
		tombboxef.anchorOffsetY = tombboxef.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tombboxef, view, [-2,0], true);
        view.addChild(tombboxef);
        tombboxef.playWithTime(1);
        tombboxef.setEndCallBack(()=>{
            tombboxef.setStopFrame(4);
            egret.Tween.get(tombboxef).wait(700).call(()=>{
                let boxdata = view.vo.getBoxDataById(view._data.id);
                let cfg = view.cfg.getBossNpcItemCfgById(boxdata.foe);
                let icon = ``;
                //出现结果 宝箱 怪物 空格 物品奖励
                let itemreward = boxdata.rewards !== '';
                if(itemreward){
                    let rewardvo = GameData.formatRewardItem(boxdata.rewards)[0];//
                    icon = rewardvo.icon;
                }
                else{
                    icon = cfg.getnpcIcon(view.code);
                }
                view._icon.setload(icon);

                let parent = view.parent.parent.parent;
                let tombdoor = ComponentManager.getCustomMovieClip(`tombdoor${view.code}-`, 7, 50);
                tombdoor.width = 218;
                tombdoor.height = 218;
                tombdoor.anchorOffsetX = tombdoor.width / 2;
                tombdoor.anchorOffsetY = tombdoor.height / 2;
                tombdoor.x = view.x + 60;
                tombdoor.y = 100;
                tombdoor.playWithTime(1);
                parent.addChild(tombdoor);
                parent.setChildIndex(tombdoor, 9999);
                tombdoor.setEndCallBack(()=>{
                    parent.removeChild(tombdoor);
                },view);

                let tombdoorlight = BaseBitmap.create(`doorlight-${view.code}`);
                tombdoorlight.anchorOffsetX = tombdoorlight.width / 2;
                tombdoorlight.anchorOffsetY = tombdoorlight.height / 2;
                tombdoorlight.x = view.x + 60;
                tombdoorlight.y = 107;
                parent.addChild(tombdoorlight);
                tombdoorlight.setScale(4);
                egret.Tween.get(tombdoorlight).to({alpha : 0}, 280).call(()=>{
                    parent.removeChild(tombdoorlight);
                },view);

                tombdoor.setFrameEvent(1,()=>{
                    view.removeChild(tombboxef);

                    let tombbubble = ComponentManager.getCustomMovieClip(`tombbubble${view.code}-`, 18, 70);
                    tombbubble.width = 72;
                    tombbubble.height = 85;
                    tombbubble.anchorOffsetX = tombbubble.width / 2;
                    tombbubble.anchorOffsetY = tombbubble.height / 2;
                    tombbubble.blendMode = egret.BlendMode.ADD;
                    tombbubble.x = view.x + 60;
                    tombbubble.y = 45;
                    tombbubble.playWithTime(1);
                    parent.addChild(tombbubble);
                    tombbubble.setEndCallBack(()=>{
                        //泡泡消失
                        parent.removeChild(tombbubble);

                        view.update();
                        view.vo.moviePlay = false;
                    },view);
                },view);

            },view);
        }, view);
    }

    public update():void{
        let view = this;
        let id = view._data.id;
        let data = view.vo.getBoxDataById(id);
        let iconStr = '';
        if(data){
            let status = view.vo.getBoxStatusById(id);
            let cfg = view.cfg.getBossNpcItemCfgById(data.foe);
            if(status == 2){
                if(cfg.type == 3){
                    let reward = GameData.formatRewardItem(data.rewards)[0];
                    iconStr = reward.icon;
                }
                else{
                    iconStr = cfg.getnpcIcon(view.code);
                }
            }
            else{
                iconStr = `teamiconstatus${status}-${view._code}`
            }
        }
        // else{
        //     iconStr = `teamiconstatus${3}-${view._code}`
        // }
        view._icon.alpha = 1;
        view._icon.setload(iconStr);
        //已完成
        let finished = view.vo.getBoxRewardById(id);
        if(finished){
            App.DisplayUtil.changeToGray(view._icon);
            view._alpha.visible = view._done.visible = true;
        }
        else{
            view._alpha.visible = view._done.visible = false;
        }
    }

    public freshAfterDig():void{
        let view = this;
        SoundManager.playEffect(SoundConst.EFFECT_TOMB_BOX);
        //打开宝箱特效
        view.playBoxEff(null);
    }

    public dispose():void{
        let view = this;
        view._data = null;
        view._icon.removeTouchTap();
        view._icon = null;
        view._alpha = null;
        view._done = null;
        super.dispose();
    }
}