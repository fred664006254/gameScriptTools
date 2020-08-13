/**
 * author:qianjun
 * desc:三国争霸界面
*/
class AcThreeKingdomsMapView extends CommonView{

    private _dayCdTxt : BaseTextField = null;
    private _roundCdTxt : BaseTextField = null;
    private _curPeriod = 1;
    private _curRound = 1;
    private _enterBtn : BaseDisplayObjectContainer = null;
    private _timebg : BaseBitmap = null;
    private _bottomBg : BaseBitmap = null;
    private _moreArrow : BaseBitmap = null;
    private _bottomLogTxt : BaseTextField = null;
    private touchBoo:boolean =true;
	private moreBg:BaseBitmap =null;
	private describeTxt:BaseTextField =null;
	private moveContainer:BaseDisplayObjectContainer =null;
    private _isShowMore:boolean = false;
    private _touchBg:BaseBitmap =null;
    private _currMaskBmp:BaseBitmap =null;
    private isData:boolean =false;
    private listconditions:BaseTextField = null;
    private _scrollList: ScrollList;
    private _chatTxt :BaseTextField = null;
    private _tipTxt :BaseTextField = null;
    private _tipBg:BaseBitmap = null;
    private _topGroup:BaseDisplayObjectContainer = null;
    private _foodGroup:BaseDisplayObjectContainer = null;
    private _jzhouGroup:BaseDisplayObjectContainer = null;
    private _costTxt : BaseTextField = null;
    private _mapGroup:BaseDisplayObjectContainer = null;
    private _count = 0;
    private _junzhengbtn : BaseButton = null;
    private _battlelog : any[] = [];
    private _jzhoubg : BaseBitmap = null;
    private _showMore : BaseButton = null;
    private _rankbtn : BaseButton = null;
    private _foodTxt :BaseTextField = null;
    private _foodBg:BaseBitmap = null;
    private _resourceTxt :BaseTextField = null;
    private _resourceBg:BaseBitmap = null;

	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
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

	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
            `servant_mask`,`arena_bottom`,`arena_arrow`,`arena_more`,`arena_bottom_bg`,`threekingdomsmapview`,`threekingdomsbigmap`
		]);
    }
    
    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return App.CommonUtil.getResByCode(`threekingdomsmaptitle`, this.getUiCode());
    }

	// protected getBgName():string{
	// 	return null;
    // }
    
    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    protected getRuleInfo():string{
		return `acThreeKingdomsRule-${this.getUiCode()}`;
    }
    // protected getRequestData():{requestType:string,requestData:any}{	
	// 	return {
    //         requestType:NetRequestConst.REQUEST_MAINLAND_GETINFO,
    //         requestData:{
    //             activeId : this.acTivityId
    //         }
    //     };
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void{
    //     if(data.data.data){ 
           
    //     } 
    // }
    protected getContainerY():number{
        return 85;
    }

	public initView():void{	
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETLISTDETAIL, view.getlistdetailback, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_THREEKINGDOMS_RULEOUT, view.clickRuleBtnHandler, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, view.mapinfoback, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_TASKREWARDS, view.rewardback, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETLIST, view.getlistback, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_THREEKINGDOMS_QUIT, view.hide, view);
        
        let code = view.getUiCode();
        if(view.vo.getTodayWeek() > 5 && view.vo.isInWarTime() && view.vo.getCurWarPeriod() == 3 && view.vo.getCurPeriod()== 2 && view.vo.getMyKingdoms() && view.vo.getMyResource() > 0){
            let key:string = ServerCfg.selectServer.zid+"_pId_"+Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + `fightwarperiod3` + this.vo.getTodayWeek();
            let value:string = LocalStorageManager.get(key);
            if(!value){
                LocalStorageManager.set(key,"1");
            }
        }
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height - view.container.y;
        
        let topbg = BaseBitmap.create(`public_ac_notice_bg`); 
        topbg.width = view.width;
        view.addChildToContainer(topbg);

		let timeDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip13`, code), [view.vo.acTimeAndHour]), 20);
		timeDesc.x = 20;
		timeDesc.y = topbg.y + 10;
        view.addChildToContainer(timeDesc);
        timeDesc.addTouchTap(()=>{
            //时间说明
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSTIMEVIEW,{
                aid : view.aid,
                code : view.code
            });
        }, view, null);

        //参与区服
		let pkzidsTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode('acThreeKingdomsTip14', code)), 20);
		pkzidsTxt.x = timeDesc.x;
		pkzidsTxt.y = timeDesc.y + timeDesc.height + 5;
		view.addChildToContainer(pkzidsTxt);
		
		let joinServerTxt = ComponentManager.getLimitLengthServerName(view.vo.getPkzidsStr(), 20, topbg.width - pkzidsTxt.x - pkzidsTxt.width - 10, view, TextFieldConst.COLOR_WARN_GREEN);
		joinServerTxt.x = pkzidsTxt.x + pkzidsTxt.textWidth + 10;
		joinServerTxt.y = pkzidsTxt.y;
        view.addChildToContainer(joinServerTxt);

        let st = App.DateUtil.getWeeTs(GameData.serverTime) + view.cfg.activeTime[4].popularityRange[0] * 3600;
        let et = App.DateUtil.getWeeTs(GameData.serverTime) + view.cfg.activeTime[4].popularityRange[1] * 3600;
        let timeparam = `${App.DateUtil.getFormatBySecond(st,12)}-${App.DateUtil.getFormatBySecond(et,12)}`;
        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode('acThreeKingdomsTip15', code), [timeparam]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 605;
        descTxt.lineSpacing = 5;
        descTxt.x = pkzidsTxt.x;
		descTxt.y = pkzidsTxt.y + pkzidsTxt.height + 5;
        view.addChildToContainer(descTxt);
        
        topbg.height = descTxt.y + descTxt.textHeight - topbg.y + 25;


        //底部记录显示
        let bottomBg = BaseBitmap.create(`arena_bottom`);
        bottomBg.height = 86;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view.container, [0,0], true);
        view.addChildToContainer(bottomBg);
        view._bottomBg = bottomBg;
        view.initBottom();
        //中间地图区域
        let mapGroup = new BaseDisplayObjectContainer();
        mapGroup.width = 1280;
        let bgmap = BaseBitmap.create(`threekingdomsbigmap`);
        mapGroup.addChild(bgmap);
        // mapGroup.width = view.width * 2;
        //魏蜀吴三家城池
        let citypos = {
            1 : {
                1 : {type : LayoutConst.horizontalCentertop, param : [0,20], city : `1`, pos : {x : 630, y : 372}},
                2 : {type : LayoutConst.lefttop, param : [-100,150], city : `2`, pos : {x : 432, y : 436}},
                3 : {type : LayoutConst.righttop, param : [-100,150], city : `2`, pos : {x : 852, y : 453}},
                4 : {type : LayoutConst.lefttop, param : [100,300], city : `3`, pos : {x : 556, y : 540}},
                5 : {type : LayoutConst.righttop, param : [100,300], city : `3`, pos : {x : 764, y : 596}},
            },
            2 : {
                1 : {type : LayoutConst.lefttop, param : [0,300], city : `1`, pos : {x : 38, y : 877}},
                2 : {type : LayoutConst.lefttop, param : [50,50], city : `2`, pos : {x : 68, y : 695}},
                3 : {type : LayoutConst.lefttop, param : [250,450], city : `2`, pos : {x : 331, y : 971}},
                4 : {type : LayoutConst.lefttop, param : [250,200], city : `3`, pos : {x : 186, y : 570}},
                5 : {type : LayoutConst.lefttop, param : [400,350], city : `3`, pos : {x : 299, y : 799}},
            },
            3 : {
                1 : {type : LayoutConst.righttop, param : [0,300], city : `1`, pos : {x : 919, y : 856}},
                2 : {type : LayoutConst.righttop, param : [50,50], city : `2`, pos : {x : 945, y : 682}},
                3 : {type : LayoutConst.righttop, param : [250,450], city : `2`, pos : {x : 720, y : 944}},
                4 : {type : LayoutConst.righttop, param : [250,200], city : `3`, pos : {x : 767, y : 725}},
                5 : {type : LayoutConst.righttop, param : [400,350], city : `3`, pos : {x : 567, y : 847}},
            },
        };


        let centerCity = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomscentercity`, code));
        mapGroup.addChild(centerCity);
        view._mapGroup = mapGroup;
        centerCity.name = `centerCity`;
        centerCity.setPosition(386,620);

        let cityNameBg = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomscenternamebg`, code));
        mapGroup.addChild(cityNameBg);
        cityNameBg.name = `cityNameBg`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityNameBg, centerCity, [0,100]);

        let cityZhanju = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(``, code)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityZhanju, cityNameBg);
        mapGroup.addChild(cityZhanju);
        cityZhanju.name = `cityZhanju`;

        let cityName = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomcentercitynametxt${view.vo.getTodayWeek() == 6 ? 1 : 2}`, code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityName, centerCity, [0,125]);
        mapGroup.addChild(cityName);
        cityName.name = `cityName`;

        let cityNameFont = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsfont${1}`, code));
        mapGroup.addChild(cityNameFont);
        cityNameFont.setScale(0.85);
        cityNameFont.name = `cityNameFont`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cityNameFont, cityNameBg, [3,0]);

        //特效组
        let centerclipgroup = new BaseDisplayObjectContainer();
        centerclipgroup.name = `centerclipgroup`;
        mapGroup.addChild(centerclipgroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, centerclipgroup, centerCity);

        // let centerCitymask = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomscentercitymask`, code));
        // mapGroup.addChild(centerCitymask);
        // centerCitymask.setScale(4);
        // centerCitymask.setPosition(387,619);
        // centerCitymask.alpha = 0;

        let cencitystateGroup = new BaseDisplayObjectContainer();
        cencitystateGroup.width = 85;
        cencitystateGroup.name = `cencitystateGroup`;
      

        let state =  BaseBitmap.create(`threekingdomcentercitystate`);
        let statetxt =  BaseBitmap.create(`threekingdomcentercitystatetxt`);
        cencitystateGroup.addChild(state);
        cencitystateGroup.addChild(statetxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, statetxt, state, [0,state.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cencitystateGroup, centerCity, [0,-cencitystateGroup.height/2]);

        let tmpy = cencitystateGroup.y;
        egret.Tween.get(cencitystateGroup, {loop : true}).to({y : tmpy + 30}, 1000).to({y : tmpy}, 1000);
        

        centerCity.addTouchTap(view.centerCityClick,view);
        cencitystateGroup.addTouchTap(view.centerCityClick,view);

        for(let i in citypos){
            let kingdomid = Number(i);
            let unit = citypos[i];
            let group = new BaseDisplayObjectContainer();
            mapGroup.addChild(group);
            group.name = `group${i}`;
            group.width = mapGroup.width;
            group.height =  mapGroup.height;
            for(let j in unit){
                let cityid = Number(j);
                let cfg = unit[j];
                let city = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdoms${i}city${j}`, code));
                city.name = `city${cityid}`;
                city.pixelHitTest = true;
                city.setPosition(bgmap.x + cfg.pos.x, bgmap.y + cfg.pos.y);
                group.addChild(city);
                // group.addChild(citymask);
                // App.DisplayUtil.setLayoutPosition(cfg.type, city, group, cfg.param, true);
                city.addTouchTap((e : egret.Event)=>{
                    if(view._curPeriod == 3){
                        App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsEnter4-1`));
                        return;
                    }
                    if(view.vo.getMyKingdoms()){
                        //普通攻城期间
                        if(cityid > 3 && view.vo.isInWarTime() && view.vo.getCurWarPeriod() < 3){//
                            //可争夺城市
                            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSCITYWARPOPUPVIEW,{
                                aid : view.aid,
                                code : view.code,
                                kingdomid : kingdomid, 
                                cityid : cityid
                            });
                        }   

                        //神将突袭
                        if(cityid == 1 && view.vo.isInTuxiTime() && view.vo.getMyKingdoms() == kingdomid){
                            if(!view.vo.getMyKingdoms()){
                                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
                                return;
                            }
                            ViewController.getInstance().openView(ViewConst.BATTLE.ACTHREEKINGDOMSHEROATTACKVIEW,{
                                aid : view.aid,
                                code : view.code
                            });
                        }
                    }
                    else{
                        App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
                    }
                },view);

                let cityNameBg = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomscitynamebg${kingdomid}`, code));
                group.addChild(cityNameBg);
                cityNameBg.name = `cityNameBg${cityid}`;
                
                let cityNameFont = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsfont${kingdomid}`, code));
                group.addChild(cityNameFont);
                cityNameFont.setScale(0.85);
                cityNameFont.name = `cityNameFont${cityid}`;

                let cityName = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(``, code)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);//view.vo.isInTuxiTime();
                cityName.name = `cityName${cityid}`;
                group.addChild(cityName);

                cityNameBg.width = cityName.textWidth + 100;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityName, cityNameBg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityNameBg, city, [0,city.height-10]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cityNameFont, cityNameBg, [3,0]);

                //主城
                if(cityid == 1){
                    let flag = BaseBitmap.create(`threekingdomheroattackflag`);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, flag, cityNameBg, [0,cityNameBg.height-5]);
                    group.addChild(flag);
                    flag.name = `flag${cityid}`;
                    flag.visible = false;
                    flag.addTouchTap(()=>{
                        if(view._curPeriod == 3){
                            App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsEnter4-1`));
                            return;
                        }
                        if(!view.vo.getMyKingdoms()){
                            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
                            return;
                        }
                        ViewController.getInstance().openView(ViewConst.BATTLE.ACTHREEKINGDOMSHEROATTACKVIEW,{
                            aid : view.aid,
                            code : view.code
                        });
                    }, view);

                    let cityflag =  BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomcityflag${kingdomid}`, code));
                    group.addChild(cityflag);
                    cityflag.name = `cityflag${cityid}`;
                    if(kingdomid == 1){
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityflag, city, [cityflag.width/2-18,-cityflag.height+20]);
                    }
                    else if(kingdomid == 2){
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityflag, city, [cityflag.width/2-20,-cityflag.height+25]);
                    }
                    else if(kingdomid == 3){
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityflag, city, [cityflag.width/2-18,-cityflag.height+30]);
                    }
                }

                if(cityid > 3){
                    let citystateicon = BaseBitmap.create(`threekingdomcitystate1`);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, citystateicon, city, [0,-citystateicon.height]);
                    group.addChild(citystateicon);
                    citystateicon.name = `citystateicon${cityid}`;
                    citystateicon.addTouchTap(()=>{
                        if(view._curPeriod == 3){
                            App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsEnter4-1`));
                            return;
                        }
                        if(view.vo.getMyKingdoms()){
                            //普通攻城期间
                            if(cityid > 3 && view.vo.isInWarTime() && view.vo.getCurWarPeriod() < 3){//
                                //可争夺城市
                                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSCITYWARPOPUPVIEW,{
                                    aid : view.aid,
                                    code : view.code,
                                    kingdomid : kingdomid, 
                                    cityid : cityid
                                });
                            }   
                        }
                        else{
                            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
                        }
                    }, view);

                    let tmpy = citystateicon.y;
                    egret.Tween.get(citystateicon, {loop : true}).to({y : tmpy + 30}, 1000).to({y : tmpy}, 1000);

                    let threekingdomtaskarmybubble = BaseBitmap.create(`threekingdomtaskarmybubble`);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, threekingdomtaskarmybubble, city,);
                    group.addChild(threekingdomtaskarmybubble);
                    threekingdomtaskarmybubble.name = `threekingdomtaskarmybubble${cityid}`;
                    threekingdomtaskarmybubble.addTouchTap(()=>{
                        if(view._curPeriod == 3){
                            App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsEnter4-1`));
                            return;
                        }
                        if(view.vo.getMyKingdoms()){
                            //普通攻城期间
                            if(cityid > 3 && view.vo.isInWarTime() && view.vo.getCurWarPeriod() < 3){//
                                //可争夺城市
                                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSCITYWARPOPUPVIEW,{
                                    aid : view.aid,
                                    code : view.code,
                                    kingdomid : kingdomid, 
                                    cityid : cityid
                                });
                            }   
                        }
                        else{
                            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
                        }
                    }, view);
                    threekingdomtaskarmybubble.visible = false;

                    let tmp2y = threekingdomtaskarmybubble.y;
                    egret.Tween.get(threekingdomtaskarmybubble, {loop : true}).to({y : tmp2y + 30}, 1000).to({y : tmp2y}, 1000);

                    //特效组
                    let clipgroup = new BaseDisplayObjectContainer();
                    clipgroup.name = `clipgroup${cityid}`;
                    group.addChild(clipgroup);
                }

                let bubblegroup = new BaseDisplayObjectContainer();
                bubblegroup.name = `bubblegroup${cityid}`;
                group.addChild(bubblegroup);
                bubblegroup.width = 100;
                bubblegroup.height = 76;
                //气泡提示
                let bubble = BaseBitmap.create(`threekingdomtaskbubble1`);
                bubble.name = `bubble${cityid}`;
                bubblegroup.addChild(bubble);

                let txtbg = BaseBitmap.create(`public_itemtipbg2`);
                txtbg.name = `txtbg${cityid}`;
                bubblegroup.addChild(txtbg);

                let bubbleTxt = ComponentManager.getTextField(``, 20,TextFieldConst.COLOR_WARN_GREEN);
                bubblegroup.addChild(bubbleTxt);
                bubbleTxt.name = `bubbleTxt${cityid}`;

                bubblegroup.addTouchTap(()=>{
                    if(view._curPeriod == 3){
                        App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsEnter4-1`));
                        return;
                    }
                    if(!view.vo.getMyKingdoms()){
                        App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
                        return;
                    }
                    let taskinfo = view.vo.getCityTaskStaus(cityid);
                    if(view.vo.getTodayWeek() < 6 && bubble.visible){
                        if(taskinfo.status == 3){
                           //领取奖励
                            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_TASKREWARDS,{
                                activeId:view.acTivityId,
                                cityId : cityid == 1 ? 5 : (cityid - 1)
                            });
                        }
                        else{
                            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSTASKVIEW,{
                                aid : view.aid,
                                code : view.code,
                                kingdomid : kingdomid,
                                cityId : cityid
                            })
                        }
                    }
                }, view);

                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bubblegroup, city, [10,-bubblegroup.height]);
                let tmpy = bubblegroup.y;
                egret.Tween.get(bubblegroup, {loop : true}).to({y : tmpy + 30}, 1000).to({y : tmpy}, 1000);
            }        
        }
        mapGroup.addChild(cencitystateGroup);
        view.freshCity();
        let scrollview = ComponentManager.getScrollView(mapGroup, new egret.Rectangle(0,0,view.width, bottomBg.y - 25 - topbg.y - topbg.height));//tipBg.y-topGroup.y-topGroup.height-20
        view.addChildToContainer(scrollview);
        scrollview.bounces = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, topbg, [0,topbg.height]);
        scrollview.setShowArrow(false);

        //底部提示榜单
        let jzhouGroup = new BaseDisplayObjectContainer();
        jzhouGroup.width = view.width;
        jzhouGroup.height = 90;
        view.addChildToContainer(jzhouGroup);
        view._jzhouGroup = jzhouGroup;
        view._jzhouGroup.addTouchTap(()=>{
            if(view.vo.getCurWeek() >= 4 && view.vo.isInTuxiTime()){
                if(!view.vo.getMyKingdoms()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.BATTLE.ACTHREEKINGDOMSHEROATTACKVIEW,{
                    aid : view.aid,
                    code : view.code
                });
            }
        },view);

        let jzhoubg = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsjzhou`, code));
        jzhouGroup.addChild(jzhoubg);
        jzhoubg.setScale(0.6);
        view._jzhoubg = jzhoubg;

        let timebg = BaseBitmap.create(`public_9_bg61`);
        view.addChildToContainer(timebg);
        view._timebg = timebg;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, timebg, topbg, [20,topbg.height-(timebg.height/2)]);
        
        //活动日期倒计时
        let dayCdTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        let roundCdTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._dayCdTxt = dayCdTxt;
        view._roundCdTxt = roundCdTxt;
        view.addChildToContainer(dayCdTxt);
        view.addChildToContainer(roundCdTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dayCdTxt, timebg);

        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO,{
            activeId:view.acTivityId,
            all : 1
        });

        let mask = BaseBitmap.create(`public_alpha`);
        mask.width = mapGroup.width;
        mask.height = mapGroup.height;
        mapGroup.addChild(mask);
    
        //跨服聊天
        let chatbg = null;            
        chatbg = BaseBitmap.create(`mainui_chatbg`);
        chatbg.width = GameConfig.stageWidth;
        chatbg.height = 30;
        chatbg.x = 0;
        chatbg.y = bottomBg.y - 27;
        view.addChildToContainer(chatbg);
        chatbg.touchEnabled = true;
        chatbg.addTouchTap(()=>{
            if(view.vo.isSelectedKindom()){
                ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {
                    activeID : this.vo.aidAndCode,
                    aid : this.aid,
                    code : this.code,
                    isKingdom : true,
                    kingdoms : view.vo.getMyKingdoms()
                });
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip1`, code)));
            }
        },view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, jzhouGroup, chatbg, [0,chatbg.height+7]);

        let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
        chatIcon.anchorOffsetX = chatIcon.width/2;
        chatIcon.anchorOffsetY = chatIcon.height/2;
        chatIcon.x =  chatIcon.width/2+10;
        chatIcon.y = chatbg.y + chatbg.height/2;
        view.addChildToContainer(chatIcon);
        egret.Tween.get(chatIcon, {
            loop: true,//设置循环播放
        }).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
        
        let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
        if(!showStr)
        {
            showStr="";
        }
        else{
            let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,showStr.zoneid);
            showStr=LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
        }
        let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
        if (emoticonStr){
            showStr = emoticonStr;
        }
        view._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view._chatTxt.width = 480;
        view._chatTxt.height = 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._chatTxt, chatbg, [chatIcon.width + 5, 0]);
        view.addChildToContainer(view._chatTxt);

        //军资数量
        let costTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip23`, code), []), 18, TextFieldConst.COLOR_BROWN); 
        costTxt.lineSpacing = 5;
        costTxt.textAlign = egret.HorizontalAlign.CENTER;
        view._costTxt = costTxt;
        jzhouGroup.addChild(costTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, jzhoubg, jzhouGroup, [0,0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, costTxt, jzhoubg);

        //按钮
        let enterBtnGroup = new BaseDisplayObjectContainer();
        view.addChildToContainer(enterBtnGroup);
        view._enterBtn = enterBtnGroup;

        let enterBtn = ComponentManager.getButton(`threekingdomsselectteam`, '', ()=>{
            if(view._curPeriod == 1){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandAttendTip1-1`));
            }
            else if(view._curPeriod == 3){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsEnter4-1`));
            }
            else{
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSSELECTTEAMVIEW, {
                    aid : view.aid,
                    code : view.code
                });
            }
        }, view, null, 0);
        enterBtnGroup.width = enterBtn.width;
        enterBtnGroup.height = enterBtn.height;
        enterBtnGroup.addChild(enterBtn);

        let enterclip = ComponentManager.getCustomMovieClip(`threekingdomsentereff`, 10);
        enterclip.width = 286;
        enterclip.height = 73;
        enterBtnGroup.addChild(enterclip);
        enterclip.x = -14;
        enterclip.playWithTime(-1);
        enterclip.blendMode = egret.BlendMode.ADD;
     
        enterBtnGroup.visible = view.vo.isSelectedKindom();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, enterBtnGroup, chatbg, [0,45]);
        if(view.vo.isCanJoin() && !view.vo.isSelectedKindom()){
            //加特效
        }

        //军政按钮
        let junzhengBtn = ComponentManager.getButton(App.CommonUtil.getResByCode(`threekingdomsjunzheng`, code), '', ()=>{
            if(view.vo.getMyKingdoms()){
                ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSMEETINGVIEW,{
                    aid : view.aid,
                    code : view.code
                });
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
            }
        }, view);
        view.addChildToContainer(junzhengBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, junzhengBtn, chatbg, [0,chatbg.height+5]);
        view._junzhengbtn = junzhengBtn;
        //排名按钮
        let rankBtn = ComponentManager.getButton(App.CommonUtil.getResByCode(`threekingdomszhengba`, code), '', ()=>{
            ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW,{
                aid : view.aid,
                code : view.code
            });
        }, view);
        view.addChildToContainer(rankBtn);
        view._rankbtn = rankBtn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, rankBtn, chatbg, [0,chatbg.height+5]);

        let tipBg = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsmaptipbg`, code));
        view.addChildToContainer(tipBg);
        view._tipBg = tipBg;
        

        let tipTxt = ComponentManager.getTextField(``, 20);
        view._tipTxt = tipTxt;
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, enterBtn, [0, -tipBg.height-10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipBg);

        // view._mapGroup.alpha = 0;

        let boneName = `qianshijinsheng_tex_png`;
        if(0){//!Api.switchVoApi.checkCloseBone() && RES.hasRes(boneName) && App.CommonUtil.check_dragon()
            let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(`qianshijinsheng`,-1,'stop');
            droWifeIcon.x = 320;
            droWifeIcon.y = 500;
            droWifeIcon.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE,()=>{
                droWifeIcon.alpha = 0;
                droWifeIcon.stop();
                droWifeIcon.dispose();
                droWifeIcon = null;
            },this); 
            droWifeIcon.scaleY = 1.5;
            view.addChild(droWifeIcon);
            droWifeIcon.alpha = 0;

            egret.Tween.get(droWifeIcon).wait(200).call(()=>{
                droWifeIcon.alpha = 1;
                droWifeIcon.playDragonMovie(`idle`, 1);
            }, view).wait(600).call(()=>{
                view._mapGroup.alpha = 1;
                egret.Tween.removeTweens(droWifeIcon);
            }, view);
        }
        else{
            view._mapGroup.alpha = 1;
        }

        //顶部积分榜
        let topGroup = new BaseDisplayObjectContainer();
        topGroup.width = view.width;
        view.addChildToContainer(topGroup);
        view._topGroup = topGroup;

        for(let i = 1; i <= 3; ++ i){
            let group = new BaseDisplayObjectContainer();
            group.name = `group${i}`;
            topGroup.addChild(group);
            group.width = 165;
            group.x = 60 + (i - 1) * (165 + 30);

            let threekingdomsfont = BaseBitmap.create(`threekingdomsfont${i}`);
            group.addChild(threekingdomsfont);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, threekingdomsfont, group, [0,0], true);

            let pointbg = BaseBitmap.create(`threekingdomspoint${i}bg`);
            group.addChild(pointbg);
            pointbg.name = `pointbg${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointbg, threekingdomsfont, [0,30]);

            let point = view.vo.getPoint(i);
            let pointTxt = ComponentManager.getTextField(point.toString(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            group.addChild(pointTxt);
            pointTxt.name = `pointTxt${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, pointTxt, pointbg);

            let clip = ComponentManager.getCustomMovieClip(`threekingdomshightlight`, 12);
            clip.width = 165;
            clip.height = 61;
            clip.playWithTime(-1);
            clip.blendMode = egret.BlendMode.ADD;
            group.addChild(clip);
            clip.name = `clip${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, pointbg);
        }
        //活动时间
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topGroup, topbg, [0,topbg.height+20]);

        //资源组
        let foodGroup = new BaseDisplayObjectContainer();
        foodGroup.width = 170;
        foodGroup.height = 50;
        view.addChildToContainer(foodGroup);
        view._foodGroup = foodGroup;

        let resbg1 = BaseBitmap.create(`public_9_resbg`);
        view._foodBg = resbg1;
        foodGroup.addChild(resbg1);

        let icon1 = BaseBitmap.create(`threekingdomswarsmallicon1`);
        foodGroup.addChild(icon1);

        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, resbg1, foodGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon1, resbg1);

        let foodTxt = ComponentManager.getTextField(view.vo.getMyFood().toString(), 18);
        view._foodTxt = foodTxt;
        foodGroup.addChild(foodTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, foodTxt, resbg1);

        let resbg2 = BaseBitmap.create(`public_9_resbg`);
        view._resourceBg = resbg2;
        foodGroup.addChild(resbg2);

        let icon2 = BaseBitmap.create(`threekingdomswarsmallicon2`);
        foodGroup.addChild(icon2);

        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, resbg2, resbg1, [resbg1.width+5,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon2, resbg2);

        let resourceTxt = ComponentManager.getTextField(view.vo.getMyResource().toString(), 18);
        view._resourceTxt = resourceTxt;
        foodGroup.addChild(resourceTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, resourceTxt, resbg2);

        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, foodGroup, view, [20,view._topGroup.y + (view._topGroup.visible ?  view._topGroup.height : 0)]);
        //有阵营 视角切换下
        if(view.vo.getMyKingdoms()){
            let left = 0;
            let top = 0;
            switch(view.vo.getMyKingdoms()){
                case 1:
                    left = 380;
                    top = 150;
                    break;
                case 2:
                    left = 0;
                    top = 520;
                    break;
                case 3:
                    left = 500;
                    top = 520;
                    break;
            }
            if(view.vo.isInWarTime() && view.vo.getCurWarPeriod() == 3){
                left = 220;
                top = scrollview.height / 2;
            }
            scrollview.scrollLeft = left;
            scrollview.scrollTop = top;
        }
        else{
            scrollview.scrollLeft = 220;
            scrollview.scrollTop = scrollview.height / 2;
        }
        view.freshView();
        view.tick();
        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETLIST,{
            activeId:view.acTivityId,
        });
        
    }

	public tick():void{	
        let view = this;
        let code = view.getUiCode();
        let str = '';

        if(view.vo.getpublicRedhot1() || view.vo.getpublicRedhot7()){
            App.CommonUtil.addIconToBDOC(view._junzhengbtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._junzhengbtn);
        }

        if(view.vo.getpublicRedhot4() || view.vo.getpublicRedhot6() || view.vo.getpublicRedhot8()){
            App.CommonUtil.addIconToBDOC(view._rankbtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._rankbtn);
        }


        if(0){view.vo.listred
            App.CommonUtil.addIconToBDOC(view._showMore);
            let reddot = view._showMore.getChildByName("reddot");
            if(reddot){
                reddot.x = 100;
                reddot.y = -10;
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._showMore);
        }
        
        ++ view._count;
        if(view._count == 300){
            view._count = 0;
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO,{
                activeId:view.acTivityId,
                all : 1
            });
        }

        //当前活动阶段 1未开始 2进行中 3展示期 4已结束
        let period = view.vo.getCurPeriod();
        let round = view.vo.getCurRound();
        let daycdStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsDayTimeCD${period}`, code), [view.vo.getCountDown()]);
        view._dayCdTxt.text = daycdStr;
        
        let roundCdStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsDayRoundCD${round}`, code), [view.vo.getRoundDown()]);
        view._roundCdTxt.text = roundCdStr;

        view._timebg.width = view._dayCdTxt.textWidth +  view._roundCdTxt.textWidth + 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.right, view._timebg, view.container, [20]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._dayCdTxt, view._timebg, [20, 0])
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._roundCdTxt, view._dayCdTxt, [view._dayCdTxt.textWidth + 10, 0]);
        view.freshView();
        view._curPeriod = period;
        view._curRound = round;

        if(view._chatTxt){
			let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
			if(!showStr)
			{
				showStr="";
			}
			else{
				let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,showStr.zoneid);
				showStr=LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
            }
            let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
			if (emoticonStr){
				showStr = emoticonStr;
			}
			view._chatTxt.text = showStr;
        }
        //休战期
        let param = [];
        if(view.vo.isInActivity()){
            if(view.vo.isSelectedKindom()){
                //休战期
                if(view.vo.isInRest()){
                    if(view.vo.isLastWeek() && view.vo.getTodayWeek() == 7 && view.vo.isTodayWarEnd()){
                        str =  `acThreeKingdomsTip10`;
                    }
                    else{
                        str = 'acThreeKingdomsTip3';
                    } 
                    param = [view.vo.getNextRoundSt()];
                }
                else{
                    //周六日
                    if(view.vo.getTodayWeek() > 5){
                        //周六日攻城
                        if(view.vo.isInWarTime()){
                            //攻城剩余倒计时
                            str = `acThreeKingdomsTip8_${view.vo.getCurWarPeriod() == 3 ? (view.vo.getTodayWeek() == 6 ? 2 : 3) : 1}`;
                            param = [view.vo.getWarTimeCD(2)];
                        }
                        else{
                            //开启倒计时
                            if(view.vo.isTodayWarEnd()){
                                //周日结束后显示下轮开启倒计时
                                if(view.vo.isLastWeek()){
                                    str = view.vo.getTodayWeek() == 7 ? `acThreeKingdomsTip10` : `acThreeKingdomsTip7`;
                                }
                                else{
                                    str = view.vo.getTodayWeek() == 7 ? `acThreeKingdomsTip3` : `acThreeKingdomsTip7`;
                                }
                                
                                param = [view.vo.getWarTimeCD(1)];
                            }
                            else{
                                //攻城开启倒计时
                                str = `acThreeKingdomsTip9_${view.vo.getCurWarPeriod() == 2 ? (view.vo.getTodayWeek() == 6 ? 2 : 3) : 1}`;
                                param = [view.vo.getWarTimeCD(1)];
                            }
                            
                        }
                    }
                    else{
                        if(view.vo.getCurWeek() >= 4){
                            //第四周 周一到周五 神将突袭中
                            if(view.vo.isInTuxiTime()){
                                //神将突袭剩余倒计时
                                str = `acThreeKingdomsTip6`;
                                param = [view.vo.getTuxiTimeCD(2)];
                            }
                            else{
                                //神将突袭开启倒计时
                                if(view.vo.getTodayWeek() == 5 && view.vo.isTuxiEnd()){
                                    //周五结束后显示攻城倒计时
                                    str = `acThreeKingdomsTip7`;
                                    param = [view.vo.getWarFightTimeSt(1)];
                                }
                                else{
                                    //周一到周四
                                    str = `acThreeKingdomsTip5`;
                                    param = [view.vo.getTuxiTimeCD(1)];
                                }
                            }
                            
                        }
                        else{
                            //第一周-第三周 周一到周五 本轮攻城战开启日
                            str = `acThreeKingdomsTip4`;
                            param = [view.vo.getWarFightTimeSt(2)];
                        }
                    }
                }            
            }
            else{
                str = 'acThreeKingdomsTip2';
            }
        }
        else{
            str = `acThreeKingdomsDayTimeCD4`;
        }
        view._tipTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(str, code), param);
        view._tipBg.width = view._tipTxt.textWidth + 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._tipBg, view._enterBtn, [0, -view._tipBg.height-10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._tipTxt, view._tipBg);

        view.freshTop();
        view.freshCity();

        view._foodTxt.text = view.vo.getMyFood().toString();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._foodTxt, view._foodBg);

        view._resourceTxt.text = view.vo.getMyResource().toString();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._resourceTxt, view._resourceBg);

        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._foodGroup, view, [20,view._topGroup.y + (view._topGroup.visible ?  view._topGroup.height : 0)]);
    }

    private freshCity():void{
        let view = this;
        let code = view.getUiCode();
        for(let i = 1; i < 4; ++ i){
            let kingdomid = i;
            let group = <BaseDisplayObjectContainer>view._mapGroup.getChildByName(`group${kingdomid}`);
            for(let j = 1; j < 6; ++ j){
                let cityid = j;
                let city = <BaseBitmap>group.getChildByName(`city${cityid}`);
                let cityNameBg = <BaseBitmap>group.getChildByName(`cityNameBg${cityid}`);
                let citystateicon = <BaseBitmap>group.getChildByName(`citystateicon${cityid}`);
                let cityName = <BaseTextField>group.getChildByName(`cityName${cityid}`);
                let cityNameFont = <BaseBitmap>group.getChildByName(`cityNameFont${cityid}`);
                let threekingdomtaskarmybubble = <BaseBitmap>group.getChildByName(`threekingdomtaskarmybubble${cityid}`);
                let clipgroup = <BaseDisplayObjectContainer>group.getChildByName(`clipgroup${cityid}`);
                // let cityflag = <BaseBitmap>group.getChildByName(`cityflag${cityid}`);
                
                //每轮攻城战结束后显示结算
                let warperiod = view.vo.getCurWarPeriod();
                if(cityid > 3 && view.vo.getTodayWeek() > 5 && !view.vo.isInWarTime() && warperiod > 0 && warperiod < 3 && view.vo.getCurPeriod() == 2){//
                    let cityinfo = view.vo.getCurRoundCityWarInfo(kingdomid,cityid);
                    if(cityinfo.kingdoms == 0){
                        cityinfo.kingdoms = kingdomid;
                    }
                    cityNameBg.setRes(`threekingdomscitynamebg${cityinfo.kingdoms}`);
                    cityName.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip${cityinfo.kingdoms == kingdomid ? 56 : 55}`,code));
                    cityNameFont.setRes(`threekingdomsfont${cityinfo.kingdoms}`);
                    // cityflag.setRes(`threekingdomcityflag${cityinfo.kingdoms}`);
                }
                else{
                    cityNameBg.setRes(`threekingdomscitynamebg${kingdomid}`);
                    cityName.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${kingdomid}City${cityid}Name`,code));
                    cityNameFont.setRes(`threekingdomsfont${kingdomid}`);
                    // cityflag.setRes(`threekingdomcityflag${kingdomid}`);
                }
                
                //战争气泡
                if(((view.vo.isInWarTime() && view.vo.getCurWarPeriod() < 3)) && view.vo.getMyKingdoms()){
                    if(citystateicon){
                        citystateicon.setRes(view.vo.getMyKingdoms() == kingdomid ? `threekingdomcitystate1` : `threekingdomcitystate2`);
                        citystateicon.visible = true;
                    }
                    if(threekingdomtaskarmybubble){
                        let info = view.vo.myArmyInfo();
                        threekingdomtaskarmybubble.visible = info.kingdomid && info.kingdomid == kingdomid && info.cityid && cityid == info.cityid;
                    }
                    if(clipgroup && !clipgroup.getChildByName(`clip`)){
                        clipgroup.removeChildren();
                        let clip = ComponentManager.getCustomMovieClip(`threekingdomscitysmallfire`, 7);
                        clip.playWithTime(-1);
                        clip.blendMode = egret.BlendMode.ADD;
                        clip.width = 130;
                        clip.height = 187;
                        clipgroup.addChild(clip);
                        clipgroup.visible = true;
                        clip.name = `clip`;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, clipgroup, city);
                    }
                }
                else{
                    if(citystateicon){
                        citystateicon.visible = false;
                    }
                    if(threekingdomtaskarmybubble){
                        threekingdomtaskarmybubble.visible = false;
                    }
                    if(clipgroup){
                        clipgroup.removeChildren();
                        clipgroup.visible = false;
                    }
                }
                //神将突袭
                if(cityid == 1 && view.vo.getMyKingdoms() == kingdomid){
                    let flag =  <BaseBitmap>group.getChildByName(`flag${cityid}`);
                    flag.visible = view.vo.isInTuxiTime();
                }
                //派遣任务
                let bubblegroup = <BaseDisplayObjectContainer>group.getChildByName(`bubblegroup${cityid}`);
                let bubble = <BaseBitmap>bubblegroup.getChildByName(`bubble${cityid}`);
                let bubbleTxt = <BaseTextField>bubblegroup.getChildByName(`bubbleTxt${cityid}`);
                let txtbg = <BaseBitmap>bubblegroup.getChildByName(`txtbg${cityid}`);
    
                let vis = false;
                let taskinfo = view.vo.getCityTaskStaus(cityid);
                if(view.vo.getTodayWeek() < 6 && view.vo.getMyKingdoms() && view.vo.getCurPeriod() == 2){
                    //可领取
                    if(taskinfo.status == 3){
                        vis = true;
                    }
                    else{
                        if(taskinfo.status < 4){
                            vis = view.vo.isInTaskTime();
                            if(cityid == 1){
                                vis = vis && view.vo.getCurWeek() > 1;
                            }
                        }
                    }
                }
                bubblegroup.visible = vis && kingdomid == view.vo.getMyKingdoms();
                
                // cityNameFont.visible = cityNameBg.visible = cityName.visible = (bubblegroup.visible || (citystateicon && citystateicon.visible));

                bubble.setRes(`threekingdomtaskbubble${taskinfo.status}`);
                if(taskinfo.status == 2){
                    bubbleTxt.text = App.DateUtil.getFormatBySecond(taskinfo.et - GameData.serverTime);
                    txtbg.visible = kingdomid == view.vo.getMyKingdoms();
                }
                else{
                    bubbleTxt.text = '';
                    txtbg.visible  = false;
                }
                txtbg.width = bubbleTxt.textWidth + 100;
               
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bubble, bubblegroup,[0,0],true);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txtbg, bubble); 
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bubbleTxt, txtbg);

                cityNameBg.width = cityName.textWidth + 100;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityName, cityNameBg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityNameBg, city, [0,city.height-10]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cityNameFont, cityNameBg, [3,0]);
            }
        }

        let centercity = <BaseBitmap>view._mapGroup.getChildByName(`centerCity`);
        let centercityZhanju = <BaseTextField>view._mapGroup.getChildByName(`cityZhanju`);
        let cencitystateGroup = <BaseDisplayObjectContainer>view._mapGroup.getChildByName(`cencitystateGroup`);
        let centercityNameBg = <BaseBitmap>view._mapGroup.getChildByName(`cityNameBg`);
        let centercityName = <BaseBitmap>view._mapGroup.getChildByName(`cityName`);
        let centercityNameFont = <BaseBitmap>view._mapGroup.getChildByName(`cityNameFont`);
        let centerclipgroup = <BaseDisplayObjectContainer>view._mapGroup.getChildByName(`centerclipgroup`);
        centercityName.setRes(`threekingdomcentercitynametxt${view.vo.getTodayWeek() == 6 ? 1 : 2}`);
        //周六是荆州 周日赤壁
        if(view.vo.isInWarTime() && view.vo.getCurWarPeriod() == 3 && view.vo.getCurPeriod() == 2){
            App.DisplayUtil.changeToNormal(centercity);
            centercityName.visible = true;
            cencitystateGroup.visible = view.vo.getMyKingdoms() ? true : false;
            //特效
            if(centerclipgroup && !centerclipgroup.getChildByName(`clip`)){
                let clip = ComponentManager.getCustomMovieClip(`threekingdomscitybigfire`, 7);
                clip.playWithTime(-1);
                clip.blendMode = egret.BlendMode.ADD;
                clip.width = 300;
                clip.height = 380;
                centerclipgroup.addChild(clip);
                centerclipgroup.visible = true;
                clip.name = `clip`;
            }
        }
        else{
            //不在战争期间置灰
            App.DisplayUtil.changeToGray(centercity);
            cencitystateGroup.visible = false;
            centerclipgroup.removeChildren();
            centerclipgroup.visible = false;
            centercityName.visible = false;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, centerclipgroup, centercity, [0,50]);
        //每轮攻城战结束后显示结算
        let warperiod = view.vo.getCurWarPeriod();
        if(view.vo.getTodayWeek() > 5 && !view.vo.isInWarTime() && warperiod == 3 && view.vo.getCurPeriod() == 2){
            let cityinfo = view.vo.getCurRoundCenterCityWarInfo();
            centercityName.visible = true
            if(cityinfo.kingdoms){
                centercityNameBg.setRes(`threekingdomscitynamebg${cityinfo.kingdoms}`);
                centercityNameFont.setRes(`threekingdomsfont${cityinfo.kingdoms}`);
                centercityZhanju.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip55`, code));
                centercityNameFont.visible = centercityNameBg.visible = centercityZhanju.visible = true;
            }
            else{
                centercityNameFont.visible = centercityNameBg.visible = centercityZhanju.visible = false;
            }
        }
        else{
           centercityNameFont.visible = centercityNameBg.visible = centercityZhanju.visible = false;
        }
        centercityNameBg.width = centercityZhanju.width + 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, centercityNameBg, centercity, [0,100]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, centercityNameFont, centercityNameBg, [3,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, centercityZhanju, centercityNameBg);
        
    }

    //顶部的积分刷新
    private freshTop():void{
        let view = this;
        let topGroup = view._topGroup;
        let mykingdomid = view.vo.getMyKingdoms();
        let arr = [{
            id : 1,
            point : view.vo.getPoint(1)
        },{
            id : 2,
            point : view.vo.getPoint(2)
        },{
            id : 3,
            point : view.vo.getPoint(3)
        }];
        
        arr.sort((a,b)=>{
            return b.point - a.point;
            // if(a.id == mykingdomid){
            //     return -1;
            // }
            // else if(b.id == mykingdomid){
            //     return 1;
            // }
            // else{
            //     return b.point - a.point;
            // }
        });
        topGroup.visible = view.vo.getTodayWeek() > 5 && view.vo.isInWarTime();
        for(let i = 1; i <= arr.length; ++ i){
            let kingdomid = arr[i - 1].id;
            let group = <BaseDisplayObjectContainer>topGroup.getChildByName(`group${kingdomid}`);
            let clip = <CustomMovieClip>group.getChildByName(`clip${kingdomid}`);
            group.x = 60 + (i - 1) * (165 + 30);

            let point = view.vo.getPoint(kingdomid);
            let pointTxt = <BaseTextField>group.getChildByName(`pointTxt${kingdomid}`);
            pointTxt.text = point.toString();

            let pointbg = <BaseBitmap>group.getChildByName(`pointbg${kingdomid}`);
            pointbg.setRes(i == 1 ? `threekingdomspoint${kingdomid}bg_down` : `threekingdomspoint${kingdomid}bg`);
            
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointTxt, pointbg, [0,30]);
            clip.visible = i == 1;
        }
    }

    private freshView():void{
        let view = this;
        let code = view.getUiCode();
        view._enterBtn.visible = !view.vo.isSelectedKindom();


        let havenum = view.vo.getCurWarPeriod() == 3 ? view.vo.getMyResource() : view.vo.getMyFood();
        let cost = view.vo.getCurWarPeriod() == 3 ? view.cfg.costFood1 : view.cfg.costFood2;
        let str = '';
        let param = [];
        let vis = false;
        if(view.vo.getTodayWeek() > 5){
            if(view.vo.isInWarTime()){
                vis = true;
                str = `acThreeKingdomsTip23`;
                if((view.vo.isFightFree(1) && view.vo.getCurWarPeriod() < 3) || (view.vo.isFightFree(2) && view.vo.getCurWarPeriod() == 3)){
                    param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip61`, code)), TextFieldConst.COLOR_WARN_GREEN2 ,LanguageManager.getlocal(`acMidAutumnBoxNum`, [view.vo.getCurWarPeriod() < 3 ? view.cfg.freeNum1.toString() : view.cfg.freeNum2.toString()]));
                }
                else{
                    param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(view.vo.getCurWarPeriod() == 3 ? `acThreeKingdomsTip25` : `acThreeKingdomsTip24`, code)), String(havenum >= cost ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED),`${havenum}/${cost}`);
                }
            }
            else{
                if(view.vo.isTodayWarEnd()){
                    vis = true;
                    str = `acThreeKingdomsTip63`;
                    // str = view.vo.getTodayWeek() == 7 ? `acThreeKingdomsTip10` : `acThreeKingdomsTip63`;
                    let cityinfo = view.vo.getCenterCityWarInfo(view.vo.getTodayWeek() == 6 ? 1 : 2)
                    if(cityinfo.kingdoms){
                        param.push(LanguageManager.getlocal(`acThreeKingdomsTeam${cityinfo.kingdoms}-${code}`),LanguageManager.getlocal(`acThreeKingdomscenterCityName_${view.vo.getTodayWeek() == 6 ? 1 : 2}-${code}`));
                    }
                    else{
                        vis = false; 
                    }                   
                }
                else{
                    vis = false;
                    str = `acThreeKingdomsTip59`;
                    if((view.vo.isFightFree(1) && view.vo.getCurWarPeriod() < 3) || (view.vo.isFightFree(2) && view.vo.getCurWarPeriod() == 3)){
                        param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip61`, code)), TextFieldConst.COLOR_WARN_GREEN2 ,LanguageManager.getlocal(`acMidAutumnBoxNum`, [view.vo.getCurWarPeriod() < 3 ? view.cfg.freeNum1.toString() : view.cfg.freeNum2.toString()]));
                    }
                    else{
                        param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(view.vo.getCurWarPeriod() == 3 ? `acThreeKingdomsTip25` : `acThreeKingdomsTip24`, code)), String(havenum >= cost ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED),`${havenum}/${cost}`);
                    }
                }
            }
        }
        else{
            if(view.vo.getCurPeriod() == 2){
                vis = true;
                  //派遣任务
                if(view.vo.isInTaskTime()){
                    str = view.vo.getIsAllTaskFinish() ? `acThreeKingdomsTip47` : `acThreeKingdomsTip46`;
                }
                else if(view.vo.isTaskTimeEnd()){
                    str = `acThreeKingdomsTip57`;
                }
                else{
                    str = `acThreeKingdomsTip58`;
                }
                //神将突袭阶段
                if(view.vo.getCurWeek() >= 4 && view.vo.isInTuxiTime()){
                    str = `acThreeKingdomsTip48`;
                }
            }
            // vis = view.vo.isInTaskTime();
          
        }
        view._jzhouGroup.visible = view.vo.isSelectedKindom() && vis;
        view._costTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(str, code), param);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._costTxt, view._jzhoubg);

    }

     //底部
	private initBottom():void
	{	
        let view = this;
        let bottom = view._bottomBg;
		// this.swapChildren(maskDown,this.container);
	
		let showMore:BaseButton = ComponentManager.getButton(`arena_more`,"",this.showMoreHandle,this);
		showMore.setPosition(GameConfig.stageWidth-showMore.width-18,view.container.height - bottom.height/2  - showMore.height/2);
        this.addChildToContainer(showMore);
        this._showMore= showMore;


		this._moreArrow = BaseBitmap.create(`arena_arrow`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._moreArrow, showMore, [-this._moreArrow.width-5,0]);
        this.addChildToContainer(this._moreArrow);
        //文本
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip45`, view.getUiCode())), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 3;
        tipTxt.width = 480;
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, bottom, [,0]);
        view._bottomLogTxt = tipTxt;
    }

    private refreshText(data : any):void{	 
        let view = this;
        let code = view.getUiCode();
        //获取最新一条记录
        let str = ``;
        if(data){
            //魏 玩家 （15服） （编号：1）成功防御了 吴国 玩家 （17服） 的进攻
            let param = [];
            //胜利方信息data.
            let downinfo = data.pklogs[0][3];
            let upinfo = data.pklogs[0][4];
            let downuid = downinfo.uid;
            let upuid = upinfo.uid;
            let isdownwin = Number(data.winuid) == Number(downuid);
            let winkingdom = LanguageManager.getlocal(`acThreeKingdomsTeam${isdownwin ? data.kingdom1 : data.kingdom2}-${code}`);
            let winname = isdownwin ? downinfo.name : upinfo.name;
            let winzid = Api.mergeServerVoApi.getSeverName(Api.mergeServerVoApi.getTrueZid(isdownwin ? downinfo.uid : upinfo.uid));
            let winuid = isdownwin ? downuid : upuid;
            let fromkid = Math.ceil(data.mainland / 2);
            //1防御成功 2攻城成功
            let attacktype = isdownwin ? 2 : 1;
            let losekingdom = LanguageManager.getlocal(`acThreeKingdomsTeam${isdownwin ? data.kingdom2 : data.kingdom1}-${code}`);
            let losename = isdownwin ? upinfo.name : downinfo.name;
            let losezid = Api.mergeServerVoApi.getSeverName(Api.mergeServerVoApi.getTrueZid(isdownwin ? upinfo.uid : downinfo.uid));
            let loseuid = isdownwin ? upuid : downuid;
            param = [winkingdom,winname,winzid,winuid,losekingdom,losename,losezid];
            // pklogs[1]={firstflag,win,reports,ainfo,binfo}
            // ainfo = {uid=uid,name=mUserinfo.name,power=mUserinfo.power} 
            //attacklist[1]={id=id,attacklog=attacklog}
 
            //attacklog = {pklogs=pklogs,winuid=winuid,sidlist1=sidlist1,sidlist2=sidlist2,aBuff=aBuff,bBuff=bBuff,troopNum=troopNum,kingdom1=kingdom1,kingdom2=kingdom2,mainland=mainland,building=building}
            if(data.troopNum && data.troopNum.troopNum){
                attacktype = isdownwin ? 4 : 3;
                param.push(App.StringUtil.changeIntToText(data.troopNum.troopNum));
                // param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${fromkid}City${(data.mainland % 2 == 0 ? 2 : 1) + 3}Name`, code)));
                if(data.mainland == 7){
                    let time = App.DateUtil.getFormatBySecond(data.time,20);
                    let timearr = time.split(`-`);
                    param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdomcenter${Number(timearr[2]) == 6 ? 1 : 2}`, code), [data.building]));
                }
                else{
                    param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdom${fromkid}_${(data.mainland % 2 == 0 ? 2 : 1) + 3}`, code), [data.building]));
                }
                
            }
            param.push(App.DateUtil.getFormatBySecond(data.time, 2));
            str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsPklog${attacktype}`, code), param);
        }
        view._bottomLogTxt.text = str;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._bottomLogTxt, view._bottomBg, [10,0]);
    }

    private showMoreHandle():void
	{
        if(this.touchBoo)
		{
            // if(!this.vo.isInActivity()){
            //     App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
            //     return;
            // }
            this._isShowMore = !this._isShowMore;
            this._bottomLogTxt.visible = !this._isShowMore;
			if (this._isShowMore == true) {
				this._moreArrow.scaleY = -1;
                this._moreArrow.y += this._moreArrow.height;
                this.showList();
                // NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST,{activeId:this.acTivityId});
			}
			else {
				this._moreArrow.scaleY = 1;
				this._moreArrow.y -= this._moreArrow.height;
				this.closeList();
			}
		}
		
    }

    private closeList():void
	{
		this.touchBoo=false;
		if(this.listconditions)
		{
			this.listconditions.visible =false;
		}
	
		if(this.describeTxt)
		{
			this.describeTxt.visible =true;
		}
		
		if(this.moveContainer)
		{	
			egret.Tween.get(this.moveContainer).to({y:1150},500).call(function(){
			this.touchBoo=true;
            egret.Tween.removeTweens(this.moveContainer);
            this.moveContainer.dispose();
            this.moveContainer = null;
            if(this._scrollList){
                this._scrollList = null;
            }
		},this);
		}

		if(this._currMaskBmp&&this._currMaskBmp.parent)
		{
			this._currMaskBmp.parent.removeChild(this._currMaskBmp);
			this._currMaskBmp.dispose();
			this._currMaskBmp =null;
		}
		if(this._touchBg&&this._touchBg.parent)
		{
			this._touchBg.parent.removeChild(this._touchBg);
			this._touchBg.dispose();
			this._touchBg =null;
        }
        if(this._bottomLogTxt){
            this._bottomLogTxt.visible = true;
        }
	}
    
    private showList():void
	{	
        this.vo.listred = false;
        this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
        this._currMaskBmp.width=GameConfig.stageWidth;
        this._currMaskBmp.height=GameConfig.stageHeigth - this.container.y;
        this._currMaskBmp.touchEnabled = true;
        this.addChild(this._currMaskBmp);
        this.setChildIndex(this._currMaskBmp,this.getChildIndex(this._bottomBg));

        this.moveContainer= new BaseDisplayObjectContainer();
        this.addChild(this.moveContainer);

        this.moreBg = BaseBitmap.create("arena_bottom_bg");//arena_bottom_bg
        this.moreBg.width = 640;
        this.moreBg.height =GameConfig.stageHeigth - 230;
        this.moreBg.touchEnabled = true;
        this.moveContainer.addChild(this.moreBg);


        // 增加 点击区域
        this._touchBg = BaseBitmap.create("public_9_bg25");  
        this._touchBg.width = 640;
        this._touchBg.height =260;
        this._touchBg.x=0;
        this._touchBg.y=-240;
        this._touchBg.alpha =0;
        this._touchBg.addTouchTap(this.showMoreHandle,this);
        this.moveContainer.addChild(this._touchBg);

        let mylog = ComponentManager.getButton(`threekingdomsmylog`, ``, ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSMYLOGVIEW, {
                aid : this.aid,
                code : this.code,
            })
        }, this);
        this.moveContainer.addChild(mylog);
        mylog.visible = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, mylog, this.moreBg, [0,-mylog.height]);

        if(this._battlelog.length)//this._battlelog.length
        {
            let rect = egret.Rectangle.create();
            rect.setTo(0,5,620,this.moreBg.height - 20);

            // for(let i = 1; i <= 50; ++ i){
            //     let data = {
            //         id : i,
            //         attacklog : {
            //             pklogs : [[1,1,[],{
            //                 uid : i,
            //                 zid : i,
            //                 name : `男玩家${i}`,
            //             },{
            //                 uid : i + 1,
            //                 zid : i + 1,
            //                 name : `女玩家${i}`,
            //             }]],
            //             winuid : Math.random() > 0.5 ? i : (i + 1),
            //             troopNum : App.StringUtil.changeIntToText(App.MathUtil.getRandom(0,3) * 10000000),
            //             kingdom1 : App.MathUtil.getRandom(1,4),
            //             kingdom2 : App.MathUtil.getRandom(1,4),
            //             mainland : App.MathUtil.getRandom(1,7),
            //             building :  App.MathUtil.getRandom(1,26),
            //             time : GameData.serverTime
            //         },
            //     };
            //     this._battlelog.push(data);
            // }

            this._scrollList = ComponentManager.getScrollList(AcThreeKingdomsBattleLogItem, this._battlelog, rect, this.code);
            this.moveContainer.addChild(this._scrollList);
            this._scrollList.bounces = true;
            // let num = 20;
            // this._scrollList.bindMoveCompleteCallback(()=>{
            //     let view = this;
            //     let index = this._rankindex;
            //     if(!this._scrollList.checkShowArrow()){
            //         index += num;
            //     }
            //     else if(this._scrollList.scrollTop == 0){
            //         index = Math.max(0, index - num)
            //     }
            //     if(this._rankindex != index){
            //         this.request(NetRequestConst.REQUEST_MAINLAND_RECORDLIST, {
            //             activeId : view.acTivityId, 
            //             idx : index
            //         });
            //     }	
                
            // }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, this.moreBg, [0, 10]);
        }
        else
        {
            let atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
            atkracedes3.x =250;
            atkracedes3.y =300;
            this.moveContainer.addChild(atkracedes3);
        }	
        this.moveContainer.y =1150;
        this.touchBoo=false;
    

        //描述文字：击败门客20
        let num = 20;//this.cfg.getbeatNum();
        let listconditions = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsTip62-${this.getUiCode()}`,[num+""]), 20);
        listconditions.x = 30
        listconditions.y = this.height - 60;
        this.addChild(listconditions);
        this.listconditions = listconditions;

        if(this.listconditions)
        {
            this.listconditions.visible =false;
        }
        if(this.describeTxt)
        {
            this.describeTxt.visible =false;
        }

        // this.runText();
        
        egret.Tween.get(this.moveContainer).to({y:150},500).call(function()
        {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo =true;
            if(this.listconditions)
            {
                this.listconditions.visible =true;
            }
        },this);

    }

    private mapinfoback(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            let data = evt.data.data.data;
            view.vo.setMapInfo(data);
        }
    }

    private rewardback(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            let data = evt.data.data.data;
            let code = view.getUiCode();
            ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW,{
                rewards : data.rewards, 
                tipMsg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip13`, code), [data.addHeroExp])
            });
        }
    }

    
    private getlistdetailback(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            let attacklog = evt.data.data.data.attacklog;
            if(attacklog){//list.length
                ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSBATTLEVIEW,{
                    aid : view.aid,
                    code : view.code,
                    cityId : view.vo.tmpinfo.cityid,
                    kingdomid : view.vo.tmpinfo.kingdomid,
                    judianid :view.vo.tmpinfo.judianid,
                    pklogs : attacklog.pklogs,
                    winuid : attacklog.winuid,
                    sidlist1 : attacklog.sidlist1,
                    sidlist2 : attacklog.sidlist2,
                    aBuff : attacklog.aBuff,
                    bBuff : attacklog.bBuff,
                });
            }
        }
    }

    private getlistback(evt : egret.Event):void{
        if(evt.data.ret){
            let list = evt.data.data.data.attacklist;
            if(list.length){//list.length
                this.vo.listred = false;
                if(list.length != this._battlelog.length){
                    this.vo.listred = true;
                }
                this._battlelog = list;
                this.refreshText(list[0].attacklog);
            }
        }
    }

    private centerCityClick():void{
        let view = this;
        if(view._curPeriod == 3){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsEnter4-1`));
            return;
        }
        if(!view.vo.getMyKingdoms()){
            // App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
            return;
        }
        //普通攻城期间
        if(view.vo.isInWarTime() && view.vo.getCurWarPeriod() == 3){
            //可争夺城市
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSCITYWARPOPUPVIEW,{
                aid : view.aid,
                code : view.code,
                cityid : 6,
                kingdomid : 0
            });
        }
    }
    
	public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, view.mapinfoback, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_TASKREWARDS, view.rewardback, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETLIST, view.getlistback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_THREEKINGDOMS_RULEOUT, view.clickRuleBtnHandler, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETLISTDETAIL, view.getlistdetailback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_THREEKINGDOMS_QUIT, view.hide, view);
        view._dayCdTxt = null;
        view._roundCdTxt = null;
        view._curPeriod = 1;
        view._curRound = 1;
        view._enterBtn = null;
        view._timebg = null;
        view._bottomBg = null;
        view._moreArrow = null;
        view._bottomLogTxt = null;
        view.touchBoo =true;
        view.moreBg =null;
        view.describeTxt =null;
        view.moveContainer =null;
        view._isShowMore = false;
        view._touchBg =null;
        view._currMaskBmp =null;
        view.isData =false;
        view.listconditions = null;
        view._scrollList = null;
        view._chatTxt = null;
        view._tipTxt = null;
        view._tipBg = null;
        if (view._topGroup)
        {
             view._topGroup.dispose();
        }
        view._topGroup = null;
        if (view._jzhouGroup)
        {
             view._jzhouGroup.dispose();
        }
        view._jzhouGroup = null;
        view._costTxt = null;
        view._mapGroup = null;
        view._count = 0;
        view._junzhengbtn = null;
        view._battlelog = [];
        view._jzhoubg = null;
        view._showMore = null;
        view._rankbtn = null;
        view._foodTxt = null;
        view._foodBg = null;
        view._resourceTxt = null;
        view._resourceBg = null;
        if (view._foodGroup)
        {
            view._foodGroup.dispose();
        }
        view._foodGroup = null;
		super.dispose();
	}
}