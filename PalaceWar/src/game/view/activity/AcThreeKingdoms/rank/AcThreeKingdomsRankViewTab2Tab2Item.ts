//攻城期普通攻城战奖励item
class AcThreeKingdomsRankViewTab2Tab2Item  extends ScrollListItem{   
    private _data:any = null;
    private _btn : BaseButton = null;
    private _stateimg : BaseBitmap = null;
    private _click = false;

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

        let code = view.getUiCode();
        // let rewardcfg = view.cfg.
        view.width = 610; 
        view.height = 230; 
        //激战期分荆州赤壁 
        let bg = BaseBitmap.create(`public_9_bg14`);
        bg.width = view.width;
        bg.height = view.height;
        view.addChild(bg);

        let descBg = BaseBitmap.create(`common_titlebg`);
        view.addChild(descBg);
        descBg.y = 5;
        //防御自己 夺取敌人
        let isdefense = index < 2;
        let attacktype = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank2Tip${isdefense ? 8 : 9}`, code));
        let cityname = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${data.kingdoms}City${(data.cityid % 2 == 0 ? 2 : 1) + 3}Name`, code))
        let descTxt = ComponentManager.getTextField(`${attacktype}${cityname}`, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(descTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, descBg, [15,0]);

        let rewardcfg : Config.AcCfg.ThreeKingdomsCityRewardCfg = view.cfg.cityReward[isdefense ? 0 : 1];

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank2Tip10`, code), [data.num, attacktype, cityname, rewardcfg.addKingdomScore]), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 5;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, bg, [20,60]);

        let rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 420;
        rewardbg.height = 105;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, rewardbg, bg, [10,10]);
        view.addChild(rewardbg);
        
        //本周激战期
        let week = view.vo.getCurWeek();
		let start = view.vo.activeSt + (week - 1) * (7 * 86400);
        let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[data.num % 2 == 1 ? 2 : 3];
        //周六
		let tmp = data.num < 3 ? 6 : 7;
		let datest = start;
		let dateet = start + 4 * 86400;
		let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
		let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        let timeparam2 = `${App.DateUtil.getFormatBySecond(st,15)}-${App.DateUtil.getFormatBySecond(et,15)}`;
        //奖励
        let rewardstr = `1046_1_${rewardcfg.specialReward2}|${rewardcfg.getReward}`;
        let rewardTab = rewardstr.split('|');

        let rect = egret.Rectangle.create();
        rect.setTo(0,0,410,88);
        let rewardNode = new BaseDisplayObjectContainer();

        let delscale = 0.8;
        let len = Math.min(5,rewardTab.length);
        let tmpX = 0;
        let scroStartY = 0;//(bottomBg.height - (Math.ceil(rewardTab.length / 5) * 106 + (Math.ceil(rewardTab.length / 5) - 1) * 20)) / 2;//15;
        let rIcons = GameData.getRewardItemIcons(rewardTab.join("|"),true,false);
        if(rIcons.length == 1)
        {
            let element = rIcons[0];
            element.anchorOffsetX = element.width/2;
            element.anchorOffsetY = element.height/2;
            element.x = GameConfig.stageWidth/2;
            element.y = scroStartY + element.height/2;
            element.setScale(delscale);
            rewardNode.addChild(element);
        }else{
            for (let index = 0; index < rIcons.length; index++) {
                let element = rIcons[index];
                element.anchorOffsetX = element.width/2;
                element.anchorOffsetY = element.height/2;
                element.setScale(delscale);
                element.x = tmpX+ 45;
                element.y = 45;
                tmpX +=  (element.width * element.scaleX + 5);
                if (tmpX >= GameConfig.stageWidth)
                {
                    tmpX = 0;
                    scroStartY += element.height + 15;
                    element.x = tmpX + 45;
                    element.y = scroStartY+45;
                    tmpX +=  (element.width * element.scaleX + 5);
                }
                //egret.Tween.get(element,{loop:false}).wait(100*index).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
                rewardNode.addChild(element);
            }
        }

        // let listbg = BaseBitmap.create(`public_9_downbg`);
        // listbg.width = 398;
        // listbg.height = 105;
        // view.addChild(listbg);

        let scrollView = ComponentManager.getScrollView(rewardNode,rect);
        scrollView.verticalScrollPolicy = "off";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollView, rewardbg);
        view.addChild(scrollView);

        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listbg, scrollView);
        // scrollView.x = 196;
        // listbg.x = 196;

        let collectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"DragonBoatDayLq",()=>{
            if(this.vo.et < GameData.serverTime){
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            if(GameData.serverTime < st){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank2Tip11`, code), [data.num]));
                return;
            }
            if(GameData.serverTime < et){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank2Tip12`, code), [data.num]));
                return;
            }
            let citywarinfo = view.vo.getCityWarInfo(view._data.cityid, view._data.num);
            if(citywarinfo.kingdoms == view.vo.getMyKingdoms()){
                if(citywarinfo.ischange){
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank2Tip5`, code)));
                }
                else{
                    if(!view._click){
                        view._click = true;
                        this.vo.lastidx = this._index;
                        this.vo.lastpos = collectBtn.localToGlobal(collectBtn.width/2 + 50,20);
                        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_CITYREWARD,{
                            activeId : this.vo.aidAndCode,
                            round : view.vo.getCurWeek(),
                            day : data.num < 3 ? 6 : 7,
                            ftype :  data.num % 2 == 1 ? 3 : 4,
                            mainland : data.cityid
                        });
                    }
                }
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank2Tip4`, code)));
            }
            // NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_HEROREWARD,{
            //     rkey : data,
            //     activeId : this.vo.aidAndCode
            // });
        },this);        
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, collectBtn, rewardbg, [rewardbg.width + 20,0]);
        view.addChild(collectBtn);
        view._btn = collectBtn;

        let stateimg = BaseBitmap.create(view.vo.isGetCityReward(data.cityid, data.num) ? `collectflag` : `threekingdomsheroattackstate4`);
        stateimg.anchorOffsetX = stateimg.width/2;
        stateimg.anchorOffsetY = stateimg.height/2;
        stateimg.setScale(131/stateimg.width);
        stateimg.setPosition(530,160);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, stateimg, rewardbg, [rewardbg.width,0]);
        view.addChild(stateimg);
        view._stateimg = stateimg;
        if(!view.vo.isGetCityReward(data.cityid, data.num)){
            App.DisplayUtil.changeToGray(stateimg);
        }

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
        let scale = 131/view._stateimg.width;
        view._stateimg.anchorOffsetX = view._stateimg.width/2;
        view._stateimg.anchorOffsetY = view._stateimg.height/2;
        view._stateimg.setScale(scale);
        App.DisplayUtil.changeToNormal(view._stateimg);
        view._stateimg.setPosition(530,160);
       
        view._stateimg.setScale(1.3);
        view._stateimg.visible = true;
        egret.Tween.get(view._stateimg).to({scaleX:scale,scaleY:scale},300);

        view._click = false;
    }

    public tick():void{
        let view = this;
        //本周激战期
        let week = view.vo.getCurWeek();
		let start = view.vo.activeSt + (week - 1) * (7 * 86400);
        let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[view._data.num % 2 == 1 ? 2 : 3];
        //周六 周日
		let tmp = view._data.num < 3 ? 6 : 7;
		let datest = start;
		let dateet = start + 4 * 86400;
		let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        
        view._stateimg.visible = false;
        view._btn.visible = true;
        if(GameData.serverTime < et){
            view._btn.setGray(true);
        }
        else{
            let citywarinfo = view.vo.getCityWarInfo(view._data.cityid, view._data.num);
            if(citywarinfo.kingdoms == view.vo.getMyKingdoms()){
                if(citywarinfo.ischange){
                    //结算后才转阵营而来
                    view._btn.setGray(true);
                }
                else{
                    if(view.vo.isGetCityReward(view._data.cityid, view._data.num)){
                        view._btn.visible = false;
                        view._stateimg.visible = true;
                    }
                    else{
                        view._btn.setGray(false);
                    }
                }
            }
            else{
                //未达成
                view._stateimg.setRes(`threekingdomsheroattackstate4`);
                view._stateimg.anchorOffsetX = view._stateimg.width/2;
                view._stateimg.anchorOffsetY = view._stateimg.height/2;
                view._stateimg.setScale(131/view._stateimg.width);
                App.DisplayUtil.changeToGray(view._stateimg);
                view._stateimg.setPosition(530,160);
                view._btn.visible = false;
                view._stateimg.visible = true;
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
        view._click = false;
        TickManager.removeTick(view.tick, view);
        this._data = null;
        this._btn = null;
        view._stateimg = null;
        super.dispose();
	}
}