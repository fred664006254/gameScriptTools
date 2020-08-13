//神将突袭奖励item
class AcThreeKingdomsHeroAttackItem  extends ScrollListItem
{   
    private _data:any = null;
    private _btn : BaseButton = null;
    private _herolist : any = null;
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
        view._code = itemparam.code;
        view._herolist = itemparam.heroHpList;
        let bosshp = itemparam.bosshp;
        let code = view.getUiCode();
        let tarColor = TextFieldConst.COLOR_BROWN

        let islock = view.vo.getCurWeek() < 4;
        // let rewardcfg = view.cfg.
        view.width = 639; 
        view.height = 289 + 10; 

        let bg = BaseBitmap.create(`threekingdomsprankofficerlistbg`);
        view.addChild(bg);

        let arr = {
			1 : [2014,2015,1038,1037,1033],
			2 : [1038,1037,1058,1020,1033],
			3 : [1058,1020,2014,2015,1033]
		};

		let sid = arr[view.vo.getMyKingdoms()][data - 1];
		let cfg = Config.ServantCfg.getServantItemById(sid);
        

        let hero = null;        
        if(islock){
            hero = BaseBitmap.create(`threekingdomsprankofficerunkown`);
            view.addChild(hero);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, hero, bg, [40,15]);
        }
        else{
            if(data > view.vo.getTodayWeek()){
                hero = BaseBitmap.create(`threekingdomsprankofficerunkown`);
                view.addChild(hero);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, hero, bg, [40,15]);
            }
            else{
                hero = BaseLoadBitmap.create(cfg.fullIcon);
                hero.width = 405;
                hero.height = 467;
                hero.setScale(0.5);
                view.addChild(hero);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, hero, bg, [40,15]);
                
                let inattack = BaseBitmap.create(`threekingdomsprankofficerinattack`);
                view.addChild(inattack);
                inattack.visible = false;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, inattack, hero, [0,60]);

                let namebg = BaseBitmap.create(`specialview_commoni_namebg`);
                let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdomsheroattacktip5`, code), [cfg.name]),18,TextFieldConst.COLOR_LIGHT_YELLOW);
                namebg.width = nameTxt.width + 40;
                view.addChild(namebg);
                view.addChild(nameTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, inattack, [0,inattack.height]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
                
                if(data == view.vo.getTodayWeek()){
                    if(view.vo.isInTuxiTime()){
                        inattack.visible = true;

                        let light = BaseBitmap.create("public_9_bg57")
                        light.width = 600
                        light.height = 310;
                        light.setPosition(20, -10);
                        this.addChild(light);
                        egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
                    }
                }
                //是否已被击败
                if(view.getHeroIsWin(data)){
                    inattack.visible = false;
                    App.DisplayUtil.changeToGray(hero);
                    let txt = BaseBitmap.create(`threekingdomsheroattackstate2`)
                    view.addChild(txt);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, hero, [0,0]);
                }
            }
        }
        let descBg = BaseBitmap.create(`alliance_taskwotdbg1`);
        descBg.width = 340;
        descBg.height = 80;
        descBg.alpha = 0.4;
        view.addChild(descBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descBg, bg, [235,25]);

        //第四周
		let start = view.vo.activeSt + (4 - 1) * (7 * 86400);
		let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[1];
		let tmp = data;
		let datest = start;
		let dateet = start + 4 * 86400;
		let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
		let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        let timeparam2 = `${App.DateUtil.getFormatBySecond(st,15)}-${App.DateUtil.getFormatBySecond(et,15)}`;
        
        let addExp = view.cfg.addHeroExp;
        let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdomsheroattacktip6`, code), [timeparam2, addExp.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(dateTxt);
        dateTxt.lineSpacing = 6;
        dateTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dateTxt, descBg);

        //奖励
        let rewardTab = view.cfg.officer2.split('|');

        let rect = egret.Rectangle.create();
        rect.setTo(0,0,386,110);
        let rewardNode = new BaseDisplayObjectContainer();

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
            element.setScale(0.8);
            rewardNode.addChild(element);
        }else{
            for (let index = 0; index < rIcons.length; index++) {
                let element = rIcons[index];
                element.anchorOffsetX = element.width/2;
                element.anchorOffsetY = element.height/2;
                element.setScale(0.8);
                element.x = tmpX+ element.width/2;
                element.y = scroStartY + element.height/2;
                tmpX +=  (element.width * element.scaleX + 5);
                if (tmpX >= GameConfig.stageWidth)
                {
                    tmpX = 0;
                    scroStartY += element.height + 15;
                    element.x = tmpX + element.width/2;
                    element.y = scroStartY+element.height/2;
                    tmpX +=  (element.width * element.scaleX + 5);
                }
                //egret.Tween.get(element,{loop:false}).wait(100*index).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
                rewardNode.addChild(element);
            }
        }

        let listbg = BaseBitmap.create(`public_9_downbg`);
        listbg.width = 398;
        listbg.height = 105;
        view.addChild(listbg);

        let scrollView = ComponentManager.getScrollView(rewardNode,rect);
        scrollView.verticalScrollPolicy = "off";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, descBg, [0,descBg.height]);
        view.addChild(scrollView);

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listbg, scrollView);
        scrollView.x = 196;
        listbg.x = 196;

        let collectBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"DragonBoatDayLq",()=>{
            if(this.vo.et < GameData.serverTime){
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            this.vo.lastidx = this._index;
            this.vo.lastpos = collectBtn.localToGlobal(collectBtn.width/2 + 50,20);
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_HEROREWARD,{
                rkey : data,
                activeId : this.vo.aidAndCode
            });
        },this);        
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, collectBtn, scrollView, [0,scrollView.height-5]);
        view.addChild(collectBtn);
        view._btn = collectBtn;

        if(islock){
            collectBtn.setEnable(false);
        }
        else{
            if(view.vo.getMyKingdoms() && view.vo.canGetHeroAttackReward(data)){
                if(view.vo.isGetHeroWinReward(data)){
                    collectBtn.visible = false;
                    let collectFlag = BaseBitmap.create("collectflag");
                    collectFlag.anchorOffsetX = collectFlag.width/2;
                    collectFlag.anchorOffsetY = collectFlag.height/2;
                    collectFlag.setScale(0.7);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectFlag, collectBtn, [0,-20]);
                    this.addChild(collectFlag);
                }
                else{
                    if(data <= view.vo.getTodayWeek()){
                        if(view.getHeroIsWin(data)){
                            collectBtn.setEnable(true);
                        }
                        else{
                            if(data == view.vo.getTodayWeek()){
                                collectBtn.setEnable(false);
                            }
                            else{
                                collectBtn.visible = false;
                                //击退失败
                                let txt = BaseBitmap.create(`threekingdomsheroattackstate1`);
                                view.addChild(txt);
                                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, collectBtn);
                            }
                        }
                    }
                    else{
                        collectBtn.setEnable(false);
                    }
                }
            }
            else{
                collectBtn.visible = false;
                //未参与
                let txt = BaseBitmap.create(`threekingdomsheroattackstate3`);
                view.addChild(txt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, collectBtn);
            }
        }
    }

    public refreshUI(){
        let view = this;
        view._btn.visible = false;
        /**
         * 展示已领取
         */
        let collectFlag = BaseBitmap.create("collectflag")
        collectFlag.anchorOffsetX = collectFlag.width/2;
        collectFlag.anchorOffsetY = collectFlag.height/2;
        collectFlag.setScale(0.7);
        this.addChild(collectFlag);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectFlag, view._btn, [0,-20]);

        collectFlag.visible = false;
        collectFlag.setScale(1.3);
        collectFlag.visible = true;
        egret.Tween.get(collectFlag).to({scaleX:0.7,scaleY:0.7},300);
    }

    private getHeroIsWin(day : number):boolean{
        let view = this;
        let flag = false;
        let herolist = view._herolist;
        if(herolist && typeof herolist[day] != `undefined`){
            flag = herolist[day] <= 0;
        }
        return flag;
    }

    public dispose(): void {
        this._data = null;
        this._btn = null;
        super.dispose();
	}
}