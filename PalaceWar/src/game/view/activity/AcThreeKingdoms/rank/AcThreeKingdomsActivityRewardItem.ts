//物资供应活动奖励item
class AcThreeKingdomsActivityRewardItem  extends ScrollListItem{   
    private _data:any = null;
    private _btn : BaseButton = null;
    private _stateimg : BaseBitmap = null;

    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_THREEKINGDOMS;
    }

    private get code() : string{
        return this._code;
    }
    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
    
    private _code : string = '';

    protected initItem(index:number,data:any,itemparam:any)
    {   
        let view = this;
        view._data = data;
        view._code = itemparam;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETCROSSACTIVEREWARDS,this.rewardCallBack,this);
        // aid : arr[j],
        // acet : acet ,
        // acst : acst,
        // start : start,
        // end : end,
        // rank : App.MathUtil.getRandom(1,5000)

        let code = view.getUiCode();
        // let rewardcfg = view.cfg.
        view.width = 610; 
        view.height = 140; 

        let bg = BaseBitmap.create(`public_9_bg14`);
        bg.width = view.width;
        bg.height = view.height;
        view.addChild(bg);

        let cfg = view.cfg.getFood;
        let rewardnum = 0;
        for(let i in cfg){
            let unit : Config.AcCfg.ThreeKingdomsGetFoodRewardCfg = cfg[i];
            if(data.rank >= unit.rank[0] && data.rank <= unit.rank[1]){
                rewardnum = unit.food2;
                break;
            }
        }
        let rewardstr = `1046_1_${rewardnum}`;
        let rewardvo = GameData.formatRewardItem(rewardstr);
        let itemicon = GameData.getItemIcon(rewardvo[0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, bg, [10,0]);
        view.addChild(itemicon);

        let aid = data.aid.split(`-`);
        let name;
        if(aid[0] == "crossServerIntimacy" && aid[1] == "7")
        {
            name = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3ActicityName${aid[0]}`, "7"));
        }else
        {
            name = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3ActicityName${aid[0]}`, code));
        }
        let timeparam = `${App.DateUtil.getFormatBySecond(data.acet,15)}`;
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3Tip6`, code), [name,data.rank,timeparam]), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 5;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, itemicon, [itemicon.width+15,13]);

        //冲榜结算在本周日21：30之后 在下一轮0点开始领取
        if(data.acet < data.weekst && data.acet >= data.start){
            let descBg = BaseBitmap.create(`public_textbrownbg`);
            let tipdateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3Tip7`, code), [App.DateUtil.getFormatBySecond(data.weekst,7)]), 20, TextFieldConst.COLOR_BROWN);
            descBg.width = tipdateTxt.width + 100;
            view.addChild(descBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descBg, tipTxt, [0,tipTxt.textHeight+7]);
            view.addChild(tipdateTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipdateTxt, descBg);
        }


        let collectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"DragonBoatDayLq",()=>{
            if(GameData.serverTime >= data.end && data.acet < data.end){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3Tip8`, code), [data.num]));
                return;
            }
            if(data.acet > data.start && data.acet < data.weekst && GameData.serverTime < data.weekst){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3Tip9`, code), [data.num]));
                return;
            }
            this.vo.lastidx = this._index;
            this.vo.lastpos = collectBtn.localToGlobal(collectBtn.width/2,20);
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETCROSSACTIVEREWARDS,{
                crossActiveId : data.aid,
                activeId : this.vo.aidAndCode
            });
        },this);        
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, collectBtn, bg, [10,0]);
        view.addChild(collectBtn);
        view._btn = collectBtn;

        let stateimg = BaseBitmap.create(view.vo.isGetFoodReward(data.aid) ? `collectflag` : `threekingdomsheroattackstate5`);
        stateimg.anchorOffsetX = stateimg.width/2;
        stateimg.anchorOffsetY = stateimg.height/2;
        stateimg.setScale(0.7);
        stateimg.setPosition(500,70);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, stateimg, rewardbg, [rewardbg.width,0]);
        view.addChild(stateimg);
        view._stateimg = stateimg;

        TickManager.addTick(view.tick, view);
        view.tick();
    }

    public refreshUI(){
        let view = this;
        view._btn.visible = false;
        /**
         * 展示已领取
         */
        view._stateimg.visible = false;
        view._stateimg.setRes(`collectflag`);
        view._stateimg.anchorOffsetX = view._stateimg.width/2;
        view._stateimg.anchorOffsetY = view._stateimg.height/2;
        view._stateimg.setPosition(500,70);
        view._stateimg.setScale(1.3);
        view._stateimg.visible = true;
        egret.Tween.get(view._stateimg).to({scaleX:0.7,scaleY:0.7},300);
    }

    private rewardCallBack(evt : egret.Event):void{
		let view = this;
		if(evt.data.ret){
            let rData = evt.data.data.data;
            if(view._index != this.vo.lastidx){
                return;
            }
			// let rewards = rData.rewards;
			// let cfg = view.cfg.recharge[view.vo.lastidx];
			let str = `1046_1_${rData.specialReward2}`;
			let rewardList =  GameData.formatRewardItem(str);
			let pos = this.vo.lastpos;
			App.CommonUtil.playRewardFlyAction(rewardList,pos);
			this.refreshUI();
			this.vo.lastidx = null;
		}
	}

    public tick():void{
        let view = this;
        let data = view._data;
        //本周激战期

        let weekst = data.weekst;
        let weeket = data.weeket;
        let acet = data.acet;
        let acst = data.acst;
        let start = data.start;
        let end = data.end;

        // if(data.acet < data.weekst && data.acet >= data.start){
        view._stateimg.visible = false;
        view._btn.visible = true;

        if(view.vo.isGetFoodReward(view._data.aid)){
            view._stateimg.setRes(`collectflag`);
            view._stateimg.anchorOffsetX = view._stateimg.width/2;
            view._stateimg.anchorOffsetY = view._stateimg.height/2;
            view._stateimg.setPosition(500,70);
            view._btn.visible = false;
            view._stateimg.visible = true;
        }
        else{
            //是否过期
            if(GameData.serverTime >= end && acet < end){
                view._stateimg.setRes(`threekingdomsheroattackstate5`);
                view._stateimg.anchorOffsetX = view._stateimg.width/2;
                view._stateimg.anchorOffsetY = view._stateimg.height/2;
                view._stateimg.setPosition(500,70);
                view._btn.visible = false;
                view._stateimg.visible = true;
            }
            else{
                //结算时间在上周日21:30之后，本周一之前 计入本轮
                if(acet > start && acet < weekst && GameData.serverTime < data.weekst){
                    view._btn.setGray(true);
                }
                else{
                    view._btn.setGray(false);
                }
            }
        }  
    }

    // private getHeroIsWin(day : number):boolean{
    //     let view = this;
    //     let flag = false;
    //     let herolist = view._herolist;
    //     if(herolist && typeof herolist[day] != `undefined`){
    //         flag = herolist[day] == 0;
    //     }
    //     return flag;
    // }

    public dispose(): void {
        let view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETCROSSACTIVEREWARDS,this.rewardCallBack,this);
        TickManager.removeTick(view.tick, view);
        this._data = null;
        this._btn = null;
        view._stateimg = null;
        super.dispose();
	}
}