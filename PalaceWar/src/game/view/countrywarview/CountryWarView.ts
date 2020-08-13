/**
 * 门客战界面
 * author qianjun
 */
class CountryWarView extends CommonView {
    public constructor() {
		super();
    }

    private _init : boolean = false;
    private _countrywarleftbg : BaseBitmap = null;
    private _countrywarrightbg : BaseBitmap = null;
    private _timeDesc : BaseTextField = null;
    private _timeBg : BaseBitmap = null;
    private _chatTxt : BaseTextField = null;
    private _chatTxtPoint:BaseTextField;
    private _servantBg : BaseBitmap = null;
    private _servantList : ScrollList = null;
    private _myRoleGroup0 : BaseDisplayObjectContainer = null;
    private _myRoleGroup1 : BaseDisplayObjectContainer = null;
    private _myRoleGroup2 : BaseDisplayObjectContainer = null;
    private _myPos0 : number[] = [];
    private _myIdx0 : number = 0;
    private _myPos1 : number[] = [];
    private _myIdx1 : number = 0;
    private _myPos2 : number[] = [];
    private _myIdx2 : number = 0;
    private _noticeScrollView : ScrollView = null;

    private _lineGroup1 : BaseDisplayObjectContainer = null;
    private _lineGroup2 : BaseDisplayObjectContainer = null;
    private _lineGroup3 : BaseDisplayObjectContainer = null;
   
    private _midGroup : BaseDisplayObjectContainer = null;
    private _noticeGroup : BaseDisplayObjectContainer = null;
    private _speed : number = 10;
    private _prevServant : any = {};
    private _curMoveServant : any = {};
    private _city0 : BaseBitmap = null;
    private _city1 : BaseBitmap = null;
    private _city2 : BaseBitmap = null;
    private _city3 : BaseBitmap = null;
    private _city4 : BaseBitmap = null;
    private _city5 : BaseBitmap = null;

    private _cityServantarrow1 : BaseBitmap = null;
    private _cityServantarrow2 : BaseBitmap = null;
    private _cityServantarrow3 : BaseBitmap = null;
    private _cityServantarrow4 : BaseBitmap = null;
    private _cityServantarrow5 : BaseBitmap = null;
    
    private _cityServantGroup1 : BaseDisplayObjectContainer = null;
    private _cityServantGroup2 : BaseDisplayObjectContainer = null;
    private _cityServantGroup3 : BaseDisplayObjectContainer = null;
    private _cityServantGroup4 : BaseDisplayObjectContainer = null;
    private _cityServantGroup5 : BaseDisplayObjectContainer = null;

    private _cityServant1 : BaseLoadBitmap = null;
    private _cityServant2 : BaseLoadBitmap = null;
    private _cityServant3 : BaseLoadBitmap = null;
    private _cityServant4 : BaseLoadBitmap = null;
    private _cityServant5 : BaseLoadBitmap = null;

    private _cityName1 : BaseBitmap = null;
    private _cityDetailBg1 : BaseBitmap = null;
    private _cityDetailNumTxtleft1 : BaseBitmap = null;
    private _cityDetailNumTxtright1 : BaseBitmap = null;
    private _cityDetailFlagleft1 : BaseBitmap = null;
    private _cityDetailFlagright1 : BaseBitmap = null;
    private _cityName2 : BaseBitmap = null;
    private _cityDetailBg2 : BaseBitmap = null;
    private _cityDetailNumTxtleft2 : BaseBitmap = null;
    private _cityDetailNumTxtright2 : BaseBitmap = null;
    private _cityDetailFlagleft2 : BaseBitmap = null;
    private _cityDetailFlagright2 : BaseBitmap = null;
    private _cityName3 : BaseBitmap = null;
    private _cityDetailBg3 : BaseBitmap = null;
    private _cityDetailNumTxtleft3 : BaseBitmap = null;
    private _cityDetailNumTxtright3 : BaseBitmap = null;
    private _cityDetailFlagleft3 : BaseBitmap = null;
    private _cityDetailFlagright3 : BaseBitmap = null;
    private _cityName4 : BaseBitmap = null;
    private _cityDetailBg4 : BaseBitmap = null;
    private _cityDetailNumTxtleft4 : BaseBitmap = null;
    private _cityDetailNumTxtright4 : BaseBitmap = null;
    private _cityDetailFlagleft4 : BaseBitmap = null;
    private _cityDetailFlagright4 : BaseBitmap = null;
    private _cityName5 : BaseBitmap = null;
    private _cityDetailBg5 : BaseBitmap = null;
    private _cityDetailNumTxtleft5 : BaseBitmap = null;
    private _cityDetailNumTxtright5 : BaseBitmap = null;
    private _cityDetailFlagleft5 : BaseBitmap = null;
    private _cityDetailFlagright5 : BaseBitmap = null;
    private _editText : BaseTextField = null;
    private _editBg : BaseBitmap = null;
    private _midBg : BaseBitmap = null;
    private ruleBtn : BaseButton = null;
    private rankBtn : BaseButton = null;
    private _cloudGroup : BaseDisplayObjectContainer = null;
    private _vsBg : BaseBitmap = null;
    private _battlescoreleft : BaseBitmapText = null;
    private _battlescoreright : BaseBitmapText = null;

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            'crossservantrulevs','mainui_chatbg','mainui_chatIcon','palace_editBtn2','arena_bottom','prestige_titlebg','draftline',
            'countrywarbuild1','countrywarbuild2','countrywarbg','countrywarbuild3','countrywarfight','countrywarcitydamage','studyatk_arrow',
            'coutrywarwin','coutrywarmyarmyleftbottom','coutrywarmyarmylefttop','coutrywarotherarmyleftbottom','coutrywarotherarmyleftup',
            'coutrywarcloud1','coutrywarcloud2','coutrywarcloud3',`crossservantwin`,`crossservantlose`,`recharge2_fnt`
        ]);
    }

    private get api(){
        return Api.countryWarVoApi;
    }

    private get cfg(){
        return Config.CountrywarCfg;
    }

    protected getRuleInfo():string{
        return `CountryWarRuleInfo`
    }
    /**
     * 参数
     */
    protected getRuleInfoParam():string[]
	{
        let level = LanguageManager.getlocal("officialTitle" + Config.CountrywarCfg.unlock);
		return [level, this.cfg.loserPointAdd.toString()];
    }
    
    protected getTitleStr():string{
        return `CountryWarTitle`;
    }

    private _posArr : any = {
        0 : {x : 173, y : 472, anchorx : 120, anchory : 65},
        1 : {x : 96, y : 395,anchorx : 75, anchory : 45},
        2 : {x : 316, y : 355,anchorx : 75, anchory : 45},
        3 : {x : 466, y : 427,anchorx : 75, anchory : 45},
        4 : {x : 482, y : 655,anchorx : 75, anchory : 45},
        5 : {x : 437, y : 952,anchorx : 75, anchory : 45},
        6 : {x : 257, y : 833,anchorx : 75, anchory : 45},
        7 : {x : 241, y : 684,anchorx : 75, anchory : 45},
        8 : {x : 201, y : 997,anchorx : 75, anchory : 45},
        9 : {x : 8, y : 927,anchorx : 75, anchory : 45},
        10 : {x : 25, y : 773,anchorx : 75, anchory : 45},
    }

    protected getRequestData():{requestType:string,requestData:any}{	
		let view = this;
		if(0){
			
		}
		else{
			return {requestType:NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL,requestData:null};
		}
		// NetManager.request(NetRequestConst.REQUEST_ALLIANCEWAR_GETDETAIL,{
		// 	id:view._data.id
		// });
    }
    
    protected receiveData(rdata:any):void{
        if (!rdata.ret){
            return;
        }
        let view = this;
        if(!rdata.ret){
            return;
        }
        if(rdata.data.data.countrywar){
            view.api.formatData(rdata.data.data.countrywar);
        }
        
        if(rdata.data.data.announce){
            view.api.setAnnouce(rdata.data.data.announce);
        }

        if(rdata.data.data.numpercity){
            view.api.setMyCityInfo(rdata.data.data.numpercity);
        }
        if(rdata.data.data.tnumpercity){
            view.api.setEnermyCityInfo(rdata.data.data.tnumpercity);
        }
        if(rdata.data.data.history){
            view.api.setHistoryInfo(rdata.data.data.history);
        }
        if(view._init){
            let cityArr = view.api.getRandCity();
            for(let i in cityArr){
                view.freshCityNumText(cityArr[i]);
            }
        }
        if(view.api.getCurpeirod() == 3 && !view.api.result){
            if(view._init){
                view.api.result = true;
                view.freshView();
                ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARRESULTVIEW,{
                    result : view.api.getThisWarWin()
                })
            }
            else{
                view.api.result = false;
            }
           
        }
    }

    private editBtnhandlerCallback(event:egret.Event):void{
        let view = this;
        if(!event.data.ret){
            return;
        }
        let data = event.data.data.data;
        Api.countryWarVoApi.setAnnouce(data.announce);
        App.CommonUtil.showTip(LanguageManager.getlocal("palace_edit_succeed"));
        ViewController.getInstance().getView('CountryWarEditNoticePopupView').hide();
        view.freshNoticeTxt();
    }

    private freshNoticeTxt():void{
        let view = this;
        //刷新公告
        view._editText.text = view.api.getNotice();
    }

    protected initView():void{
        let view = this;
        view._sendTick = 0;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.doRefreshChat,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_COUNTRYWAY_UPDATEANNOUNCE),view.editBtnhandlerCallback,view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_COUNTRYWAR_CHANGESERVANT, view.changeServantCallback, view);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_POLICY_INDEX,view.kingCallback,view);
        // NetManager.request(NetRequestConst.REQUEST_POLICY_INDEX, {});
        //战斗结果
        view._curType = view.api.getCurpeirod();
        if(view._curType == 3 && !view.api.result){
            view.api.result = true;
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARRESULTVIEW,{
                result : view.api.getThisWarWin()
            })
        }
        let servantinfo = view.api.myServantInfo();
        view._prevServant = {};
        for(let i in servantinfo){
            view._prevServant[i] = servantinfo[i].cityId;
        }
        //中间主城
        let midGroup = new BaseDisplayObjectContainer();
        let cityarr = view.api.getRandCity();
        let city = Number(cityarr[0]);
        view.addChild(midGroup);
        view.viewBg.visible = false;
        view.swapChildren(midGroup,view.viewBg);
        view._midGroup = midGroup;

        view.createCity();
        // for(let i in cityarr){
        //     let cityId = cityarr[i];
        //     let cityIndex = view.api.getCityIndex(cityId);
        //     let pos = view._posArr[cityId];
        //     view.createLine(new egret.Point(view._posArr[0].x + 120, view._posArr[0].y + 65), new egret.Point(pos.x + 75, pos.y + 45));
        // }
        //顶部
        view.createTop('left');
        view.createTop('right');

        let vsbg = BaseBitmap.create(`crossservantrulevs`);
        let top = 75;
        if(view.api.getCurpeirod() == 3){
            vsbg.setRes(view.api.getIsWin() ? 'crossservantwin' : 'crossservantlose');
            top = 115;
        }
       
        vsbg.setScale(0.6);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsbg, view, [0,top]);
        view.addChild(vsbg);
        view._vsBg = vsbg;

        let ruleBtn = ComponentManager.getButton('countrywarrule', '', ()=>{
            // 打开规则奖励弹窗ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARENTERVIEW);
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARREWARDPOPUPVIEW);
         }, view);
         App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, ruleBtn, view.titleBg, [10,view.titleBg.height + 35]);
         view.addChild(ruleBtn);
         view.ruleBtn = ruleBtn;
 
        let rankBtn = ComponentManager.getButton('countrywarrank', '', ()=>{
            // 打开排行弹窗ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARENTERVIEW);
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARREWARDPOPUPVIEW,{type:4});
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rankBtn, view.titleBg, [10,view.titleBg.height + 35]);
        view.addChild(rankBtn);
        view.rankBtn = rankBtn;
        if(view.api.isShowRewardRedPoint()){
            App.CommonUtil.addIconToBDOC(ruleBtn);
            App.CommonUtil.addIconToBDOC(rankBtn);
        }

        let servantBg = BaseBitmap.create('countrywarservantbg');
        servantBg.addTouchTap(()=>{
            //打开派遣门客
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARREWARDPOPUPVIEW,{type:3});
        },view);
        view.addChild(servantBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servantBg, view.titleBg, [0,view.titleBg.height + 135]);
        view._servantBg = servantBg;

        let servantNameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`CountryWarServant`), 14, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, servantNameTxt, servantBg, [0,15]);
        view.addChild(servantNameTxt);


        let itemRect:egret.Rectangle =  new egret.Rectangle(0,0,servantBg.width - 20, 1);
		let scrollList = ComponentManager.getScrollList(CountryWayServantItem, null, itemRect);
        scrollList.touchChildren = false;
        scrollList.touchEnabled = false;
        scrollList.verticalScrollPolicy = 'off';
        view.addChild(scrollList);
        scrollList.setEmptyTip(`CountryWarServantEmpty`);
        view._servantList = scrollList;
        view.freshServantList();

        //倒计时
        let timeCDbg = BaseBitmap.create(`public_itemtipbg2`);
        view._timeBg = timeCDbg;
        view.addChild(timeCDbg);

        let period = view.api.getCurpeirod();
        let param = [];
        if(period == 3){
            param.push(view.api.getWinNum().toString());
            param.push((view.cfg.cityNum - view.api.getWinNum()).toString());
            param.push(LanguageManager.getlocal(`atkraceFight${view.api.getIsWin() ? `Win` : `Fail`}`));
        }
        param.push(App.DateUtil.getFormatBySecond(view.api.getCountTime()));

        let cdTxt = ComponentManager.getTextField(LanguageManager.getlocal(`CountryWarCDTxt${period}`,param), 20);
        if(period == 1 && view.api.getEmptyServant()){
            cdTxt.text = LanguageManager.getlocal('CountryWarCityTip2',param);
        }
        if(period == 3){
            cdTxt.text = LanguageManager.getlocal(`CountryWarCDTxt${period}-${view.api.isRedTeam(`left`) ? 1 : 2}`,param);
        }
        cdTxt.lineSpacing = 5;
        cdTxt.textAlign = egret.HorizontalAlign.CENTER;
        timeCDbg.width = cdTxt.textWidth + 100;
        timeCDbg.height = cdTxt.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeCDbg, view.titleBg, [0,view.titleBg.height+130]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cdTxt, timeCDbg);
        view.addChild(cdTxt);
        view._timeDesc = cdTxt;
        //聊天消息
        let chatbg = BaseBitmap.create('public_9_bg20');
        chatbg.width = GameConfig.stageWidth;
        chatbg.height = 35;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, chatbg, view);
        view.addChild(chatbg);
        chatbg.touchEnabled = true;
        chatbg.addTouchTap(view.chatBgClickHandler,view);

        let chatIcon = BaseBitmap.create('mainui_chatIcon');
        chatIcon.anchorOffsetX = chatIcon.width/2;
        chatIcon.anchorOffsetY = chatIcon.height/2;
        chatIcon.x =  chatIcon.width/2+10;
        chatIcon.y = chatbg.y + chatbg.height/2;
        view.addChild(chatIcon);
        egret.Tween.get(chatIcon, {
            loop: true,//设置循环播放
        }).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
        
        let showStr:string=Api.chatVoApi.getLastMessage();
        if(!showStr)
		{
			showStr="1";
		}

        view._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view._chatTxt.width = 480;
        view._chatTxt.height = 20;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
        view.addChild(view._chatTxt);

        view._chatTxtPoint = ComponentManager.getTextField("...",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		view._chatTxtPoint.x = 522;
		view._chatTxtPoint.y = chatIcon.y - view._chatTxtPoint.height/2 - 5;
        view._chatTxtPoint.visible = false;
        
        view.doRefreshChat();
        //国战公告
        let descBg = BaseBitmap.create('arena_bottom');
        descBg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descBg, chatbg, [0,chatbg.height]);
        view.addChild(descBg);
        view._editBg = descBg;

        let noticeGroup = new BaseDisplayObjectContainer();
        noticeGroup.width = GameConfig.stageWidth;
        view.addChild(noticeGroup);

        let str = view.api.getNotice();
        let descTxt = ComponentManager.getTextField(str, 20);
        descTxt.width = descBg.width - 20;
        descTxt.lineSpacing = 5;
        view._editText = descTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, noticeGroup, [0,0], true);
        noticeGroup.addChild(descTxt);

        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,100);
		let noticescrollView = ComponentManager.getScrollView(noticeGroup,rect);
        noticescrollView.y = descBg.y + 5;
        noticeGroup.y = 0;
		noticescrollView.horizontalScrollPolicy = "off";
        view.addChild(noticescrollView);
        view._noticeGroup = noticeGroup;
        view._noticeScrollView = noticescrollView;

        let titleBg = BaseBitmap.create('prestige_titlebg');
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, titleBg, descBg, [0,descBg.height]);
        view.addChild(titleBg);

        let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal('CountryWarNoticeTitle'), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, titleBg);
        view.addChild(titleTxt);

        let editBtn = ComponentManager.getButton('palace_editBtn2', '', ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWAREDITNOTICEPOPUPVIEW);
            // 打开排行弹窗ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARENTERVIEW);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, editBtn, descBg, [0,descBg.height + 5 + 30]);
        view.addChild(editBtn);
        editBtn.visible = view.api.canEditNotice();

        //调整位置
        // if(GameConfig.stageHeigth - 215 - chatbg.height - descBg.height){

        // } 
        //view.checkMovePos();

        view._curMoveServant = {};
        view.setChildIndex(view.closeBtn, 9999);
        view._init = true;
        let cityArr = view.api.getRandCity();
        let index = 0;
        for(let i in cityArr){
            let cityId = cityArr[i];
            view.freshCityNumText(cityArr[i]);
            view.freshCityServant(cityArr[i]);
            if(view.api.getCurpeirod() == 3){//
                if(!view.api.reback){
                    if(view.api.getJoinCityWar(cityId)){
                        let servant = view.api.getServant();
                        if(servant[Number(i) + 1]){
                            view[`_myIdx${index}`] = 0;
                            view[`_myPos${index}`] = [0];
                            view.checkMovePos(cityId, index, servant[Number(i) + 1].servant);
                            ++ index;
                        }
                    }
                }
            }
        }
        if(index > 0){
            view.api.reback = true;
        }

        if(city < 4){
            let api : any = view.api;
            let cityRandId = api.randcity - 1;
            let height = 0;
            if(noticescrollView.y - view._timeBg.y > 620){
                height = 40;
            }
            else{
                height = city == 3 ? -200 : -20;
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midGroup, view, [0, height]);
        }
        else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, midGroup, view._noticeScrollView, [0,100 - 10 - 30]);
        }  
    }

    private calRotain(from : {x : number, y : number}, target : {x : number, y : number}):number{
        let tan = (target.y - from.y) / (target.x - from.x);
        return Math.round(Math.atan2(target.y - from.y, target.x - from.x) / (Math.PI / 180));
    }

    private freshInit = false;
    private freshView():void{
        let view = this;
        let period = view.api.getCurpeirod();
        let cityArr = view.api.getRandCity();
        let vsbg = view._vsBg;
        let top = 75;
        vsbg.setRes(`crossservantrulevs`);
        view._battlescoreleft.visible = view._battlescoreright.visible = period == 3;
        if(period == 1){
            view.clearCityInfo();
            App.DisplayUtil.changeToNormal(view._countrywarrightbg);
            App.DisplayUtil.changeToNormal(view._countrywarleftbg);
        }
        else if(period == 2){
            for(let i in cityArr){
                view.createFightCity(cityArr[i]);
                view.freshCityServant(cityArr[i]);
            }
        }
        else if(period == 3){
            view._battlescoreleft.text = view.api.getWinNum().toString();
            view._battlescoreright.text = (view.cfg.cityNum - view.api.getWinNum()).toString();

            vsbg.setRes(view.api.getIsWin() ? 'crossservantwin' : 'crossservantlose');
            top = 115;
            view.clearCityInfo();
            let index = 0;
            for(let i in cityArr){
                let cityId = cityArr[i];
                view.freshCityServant(cityId);
                if(!view.api.getCityIsWin(cityId)){
                    view.createFailCity(cityId);
                }
                else{
                    view.createWinCity(cityId);
                }
                if(!view.api.reback){
                    if(view.api.getJoinCityWar(cityId)){
                        let servant = view.api.getServant();
                        if(servant[Number(i) + 1]){
                            view[`_myIdx${index}`] = 0;
                            view[`_myPos${index}`] = [0];
                            view.checkMovePos(cityId, index, servant[Number(i) + 1].servant);
                            ++ index;
                        }
                    }
                }
            }
            if(index > 0){
                view.api.reback = true;
            }
            if(view.api.getIsWin()){
                App.DisplayUtil.changeToGray(view._countrywarrightbg);
            }
            else{
                App.DisplayUtil.changeToGray(view._countrywarleftbg);
            }
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsbg, view, [0,top]);
    }

    private createWinCity(cityId : number):void{
        let view = this;
        let cityIndex = view.api.getCityIndex(cityId);
        let cityimg = view[`_city${cityIndex}`];
        
        let winclip = ComponentManager.getCustomMovieClip('coutrywarwin',4,140);
        winclip.width = 32;
        winclip.height = 53;
        //failclip.blendMode = egret.BlendMode.ADD;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, winclip, cityimg, [0,-30]);
        winclip.playWithTime(-1);
        view._midGroup.addChild(winclip);
    }

    private createCity():void{
        let view = this;
        let midGroup = view._midGroup;
        let midbg = BaseBitmap.create(`countrywarbg`);
        view._midBg = midbg;
        midGroup.addChild(midbg);
        for(let i in view._posArr){
            let pos = view._posArr[i];
            let cityId = Number(i);
            if(!view.api.getJoinCityWar(cityId) && cityId != 0){
                continue;
            }
            let cityimg = BaseBitmap.create(`countrywarbuild${cityId == 0 ? 2 : 1}`);
            cityimg.x = pos.x;
            cityimg.y = pos.y;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cityimg, view._midBg, [pos.x,pos.y]);
            midGroup.addChild(cityimg);
            let cityIndex = view.api.getCityIndex(cityId);
            view[`_city${cityIndex}`] = cityimg;

            let arrow = BaseBitmap.create("studyatk_arrow");
            arrow.visible = false;
            arrow.setScale(0.7);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, arrow, cityimg, [0,-10]);
            let tarY = arrow.y;
            egret.Tween.get(arrow,{loop:true}).to({y:tarY - 30 },1000).to({y:tarY },1000);
            midGroup.addChild(arrow);
            view[`_cityServantarrow${cityIndex}`] = arrow;

            let cityservantGroup = new BaseDisplayObjectContainer();
            cityservantGroup.visible = false;
            cityservantGroup.width = 64;
            cityservantGroup.height = 74;
            view[`_cityServantGroup${cityIndex}`] = cityservantGroup;
            midGroup.addChild(cityservantGroup);

            let bg = BaseBitmap.create('countrywarcityservant');
            cityservantGroup.addChild(bg);

            let cityServant = BaseLoadBitmap.create(``);
            cityServant.width = 180;
            cityServant.height = 177;
            cityServant.setScale(0.3);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityServant, bg, [0,8]);

            let circle:egret.Shape = new egret.Shape();
            circle.graphics.beginFill(0x0000ff);
            circle.graphics.drawCircle(27,25.5,25);
            circle.graphics.endFill();
            cityservantGroup.addChild(circle);
            cityServant.mask = circle;
            cityservantGroup.addChild(cityServant);
            
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, circle, bg, [0,8]);
            //servant_half_1008
            view[`_cityServant${cityIndex}`] = cityServant;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityservantGroup, cityimg, [0,-cityservantGroup.height]);

            let tmpY = cityservantGroup.y;
            egret.Tween.get(cityservantGroup,{loop:true}).to({y:tmpY - 30 },1000).to({y:tmpY },1000);
            let period = view.api.getCurpeirod();
            cityimg.addTouchTap(()=>{
                if(view.api.getJoinCityWar(cityId)){
                    if(period == 1 || period == 3){
                        ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARCITYPOPUPVIEW,{
                            cityId : cityId,
                        });
                    }
                    else if(period == 2){
                        if(view.api.canCheckVs()){
                            ViewController.getInstance().openView(ViewConst.COMMON.COUNTRYWARVSVIEW,{
                                cityId : cityId,
                            });
                        }
                        else{
                            App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip5"));
                        }
                    }
                }
            },view);

            if(cityId > 0){
                let cityname = BaseBitmap.create(`countrywarcity${cityId}`);
                cityname.setScale(0.65);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cityname, cityimg, [0,-cityname.height + 40]);
                midGroup.addChild(cityname);
                if(view.api.getJoinCityWar(cityId)){

                    let period = view.api.getCurpeirod();
                    if(period == 2){
                        view.createFightCity(cityId);
                    }
                    else if(period == 3){
                        if(!view.api.getCityIsWin(cityId)){
                            view.createFailCity(cityId);
                        }
                        else{
                            view.createWinCity(cityId);
                        }
                    }
                    // view.createWinCity(cityId);

                    let arr = view.api.getCityInfo(cityId);
                    let detailbg = BaseBitmap.create(`countrywarcitydetailbg`);
                    midGroup.addChild(detailbg);

                    let leftText = ComponentManager.getTextField(arr[0].toString(), 22, view.api.isRedTeam('left') ? 0xff3c3c : 0x649efa);
                    let rightText = ComponentManager.getTextField(arr[1].toString(), 22,view.api.isRedTeam('right') ? 0xff3c3c : 0x649efa);
                    midGroup.addChild(leftText);
                    midGroup.addChild(rightText);

                    let leftflag = BaseBitmap.create(view.api.isRedTeam('left') ? `countrywarcitydetailleft`:`countrywarcitydetailright`);
                    midGroup.addChild(leftflag);

                    let rightflag = BaseBitmap.create(view.api.isRedTeam('right') ? `countrywarcitydetailleft`:`countrywarcitydetailright`);
                    midGroup.addChild(rightflag);

                    view[`_cityName${cityIndex}`] = cityname;
                    view[`_cityDetailBg${cityIndex}`] = detailbg;
                    view[`_cityDetailNumTxtleft${cityIndex}`] = leftText;
                    view[`_cityDetailNumTxtright${cityIndex}`] = rightText;
                    view[`_cityDetailFlagleft${cityIndex}`] = leftflag;
                    view[`_cityDetailFlagright${cityIndex}`] = rightflag;
                }
            }
            else{
                view._city0 = cityimg;
            }
        }
        if(view._editBg){
            let cityarr = view.api.getRandCity();
            let city = Number(cityarr[0]);
            if(city < 4){
                let api : any = view.api;
                let cityRandId = api.randcity - 1;
                let height = 0;
                if(view._noticeScrollView.y - view._timeBg.y > 620){
                    height = 20;
                }
                else{
                    height = city == 3 ? -200 : -50;
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midGroup, view, [0, height]);
            }
            else{
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, midGroup, view._noticeScrollView, [0,100 - 10 - 30]);
            }  
        }  
    }

    private createFailCity(cityId : number):void{
        let view = this;
        let cityIndex = view.api.getCityIndex(cityId);
        let cityimg = view[`_city${cityIndex}`];
        cityimg.setRes(`countrywarbuild3`);
        
        let failclip = ComponentManager.getCustomMovieClip('countrywardamage',10,70);
        failclip.width = 160;
        failclip.height = 184;
        //failclip.blendMode = egret.BlendMode.ADD;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, failclip, cityimg, [5,-57]);
        failclip.playWithTime(-1);
        view._midGroup.addChild(failclip);
    }

    private createFightCity(cityId : number):void{
        let view = this;
        let cityIndex = view.api.getCityIndex(cityId);
        let cityimg = view[`_city${cityIndex}`];

        let fightclip = ComponentManager.getCustomMovieClip('countrywarfight',10,70);
        fightclip.width = 154;
        fightclip.height = 168;
        fightclip.blendMode = egret.BlendMode.ADD;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fightclip, cityimg, [-5,-40]);
        fightclip.playWithTime(-1);
        view._midGroup.addChild(fightclip);
    }


    private clearCityInfo():void{
        let view = this;
        view._midGroup.removeChildren();
        view.createCity();
    }

    private createLine(from : {x : number, y : number}, to : {x : number, y : number}, index : number):void{
        let view = this;
        let distance = view.get_distance_xy(from, to);
        let num = Math.round(distance / 27);

        let lineGroup = new BaseDisplayObjectContainer();
        lineGroup.width = num * 27;
        lineGroup.height = 15;
        lineGroup.anchorOffsetX = lineGroup.width / 2;
        lineGroup.anchorOffsetY = lineGroup.height / 2;
        lineGroup.mask = new egret.Rectangle(0, 0, lineGroup.width, lineGroup.height);
        let endX = lineGroup.width;
        let speed = 30;
        lineGroup.x = (from.x + to.x) / 2;
        lineGroup.y = (from.y + to.y) / 2;
        lineGroup.rotation = view.calRotain(from, to);
        view._midGroup.addChild(lineGroup);

        if(view[`_lineGroup${index}`]){
            view[`_lineGroup${index}`].removeChildren();
            view._midGroup.removeChild( view[`_lineGroup${index}`]);
            view[`_lineGroup${index}`] = null;
        }
        view[`_lineGroup${index}`] = lineGroup;
        

        for(let i = 0; i <= num; ++ i){
            let line = BaseBitmap.create('countrywarline1');
            let startX = (i - 1) * (line.width);
            line.x = startX;
            line.y = 0;
            lineGroup.addChild(line);

            let time1 = (endX - startX) / speed * 1000 + 100;
            let time2 = (startX - (-line.width)) / speed * 1000 + 100;
            
            egret.Tween.get(line, {loop : true}).to({x : endX}, time1).call(()=>{
                line.x = -line.width;
            },view).to({x : -line.width}, 1).to({x : startX}, time2);
        }
    }

    private freshCityNumText(cityId : number):void{
        let view = this;
        let cityIndex = view.api.getRandCity().indexOf(cityId) + 1;
        let arr = view.api.getCityInfo(cityId);
        let detailbg = view[`_cityDetailBg${cityIndex}`];

        let leftText =  view[`_cityDetailNumTxtleft${cityIndex}`];
        let rightText =  view[`_cityDetailNumTxtright${cityIndex}`];
        leftText.text = arr[0];
        rightText.text = arr[1];
        detailbg.width = leftText.textWidth + rightText.textWidth + 20 + 10;

        let cityname = view[`_cityName${cityIndex}`];
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailbg, cityname, [0,cityname.height * cityname.scaleY]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftText, detailbg, [10,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rightText, detailbg, [10,0]);
        
        let leftflag = view[`_cityDetailFlagleft${cityIndex}`];
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftflag, leftText, [-leftflag.width-5,0]);

        let rightflag = view[`_cityDetailFlagright${cityIndex}`];
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rightflag, rightText, [-rightflag.width-5,0]);
    }

    private chatBgClickHandler():void{	
		if(Api.rookieVoApi.isInGuiding)
		{
			return;
		}
		// App.LogUtil.log("chatBgClickHandler >>>>> ");
		ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEW);
    }
    
    //判断方向
    private judgePos(from : {x : number, y : number}, to : {x : number, y : number}):string{
        let pos = '';
        if(from.x > to.x){
            pos = 'left';
        }
        else{
            pos = 'right';
        }

        if(from.y > to.y){
            pos += '|top';
        }
        else{
            pos += '|bottom';
        }
        return pos;
    }

    private createRoleGroup(from : number, index : number, servantId : number):BaseDisplayObjectContainer{
        let view = this;
        let idx = view[`_myIdx${index}`];
        let pos = view[`_myPos${index}`];
        // let disX = from == 0 ? (234 / 2) : 0;
        // let disY = from == 0 ? (133 / 2) : 0;
        let fromCityIndex = view.api.getCityIndex(from);
        let toCity = Number(pos[idx]);
        let toCityIndex = view.api.getCityIndex(toCity);

        let rolegroup = new BaseDisplayObjectContainer();
        view._midGroup.addChild(rolegroup);

        let posfrom = view._posArr[from];
        let posto = view._posArr[toCity];
        let style = view.judgePos(posfrom, posto);
        let tmp = style.split('|');
        let rolestr = `coutrywarmyarmyleft${tmp[1]}`;
        let roleclip = ComponentManager.getCustomMovieClip(rolestr,5,200);
        if(tmp[1] == 'top'){
            roleclip.width = 107;
            roleclip.height = 89;
            rolegroup.width = 107;
            rolegroup.height = 89;
        }
        else{
            roleclip.width = 102;
            roleclip.height = 81;
            rolegroup.width = 102;
            rolegroup.height = 81;
        }
        rolegroup.anchorOffsetX = roleclip.width / 2;
        rolegroup.anchorOffsetY = roleclip.height / 2;
        roleclip.anchorOffsetX = roleclip.width / 2;
        roleclip.anchorOffsetY = roleclip.height / 2;
        
        rolegroup.scaleX = tmp[0] == 'left' ? 1 : -1;

        roleclip.playWithTime(-1);
        rolegroup.addChild(roleclip);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rolegroup, view[`_city${fromCityIndex}`]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, roleclip, rolegroup, [rolegroup.anchorOffsetX ,rolegroup.anchorOffsetY], true);
        
        view[`_myRoleGroup${index}`] = rolegroup;

        //人物头像
        let cityservantGroup = new BaseDisplayObjectContainer();
        cityservantGroup.width = 64;
        cityservantGroup.height = 74;
        rolegroup.addChild(cityservantGroup);

        let bg = BaseBitmap.create('countrywarcityservant');
        cityservantGroup.addChild(bg);

        let servantCloth = `servant_half_${servantId}`;
        let obj : ServantInfoVo= Api.servantVoApi.getServantObj(servantId.toString());
        if(obj && obj.equip){
            servantCloth = `skin_half_${obj.equip}`;
        }
        let cityServant = BaseLoadBitmap.create(servantCloth);
        cityServant.width = 180;
        cityServant.height = 177;
        cityServant.setScale(0.3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityServant, bg, [0,8]);

        let circle:egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(27,25.5,25);
        circle.graphics.endFill();
        cityservantGroup.addChild(circle);
        cityServant.mask = circle;
        cityservantGroup.addChild(cityServant);
        
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, circle, bg, [0,8]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cityservantGroup, rolegroup, [0,-cityservantGroup.height], true);
        cityservantGroup.x = 0;
        cityservantGroup.y = -74;

        rolegroup.addTouchTap(()=>{
            let child = rolegroup.getChildByName('planGroup');
            if(toCity == 0){
                //回城
                if(child){
                    egret.Tween.removeTweens(child);
                    rolegroup.removeChild(child);
                }
            }
            else{
                //不存在
                if(!child){
                    let planGroup = new BaseDisplayObjectContainer();
                    planGroup.name = 'planGroup';
                    rolegroup.addChild(planGroup);

                    let descBg = BaseBitmap.create('public_9_bg42');
                    planGroup.addChild(descBg);

                    let arrowBM = BaseBitmap.create("public_9_bg13_tail");
                    arrowBM.anchorOffsetX = arrowBM.width / 2;
                    arrowBM.scaleX = -1;
                    planGroup.addChild(arrowBM);

                    let descTxt =ComponentManager.getTextField(LanguageManager.getlocal(`CountryWarWalkTalk${App.MathUtil.getRandom(1,5)}`), 20, TextFieldConst.COLOR_BLACK);
                    descTxt.width = 150;
                    descTxt.lineSpacing = 5;
                    descTxt.textAlign = egret.HorizontalAlign.CENTER;
                    planGroup.addChild(descTxt);
                    
                    descBg.height = descTxt.textHeight + 30;
                    descBg.width = descTxt.textWidth + 30;
                    planGroup.width = descBg.width;
                    planGroup.anchorOffsetX = planGroup.width / 2;
                    planGroup.scaleX = rolegroup.scaleX;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descBg, planGroup, [0,0], true);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [25, descBg.height-3]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, descBg, [0,15]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, planGroup, rolegroup, [0,-planGroup.height+40],true);

                    egret.Tween.get(planGroup).wait(5000).call(()=>{
                        if(planGroup && rolegroup){
                            egret.Tween.removeTweens(planGroup);
                            planGroup.removeChildren();
                            rolegroup.removeChild(planGroup);
                        }
                    },view);
                }
            }
        }, view);
        return rolegroup;
    }

    private checkMovePos(from : number, index : number, servantId : number):void{
        let view = this;
        let role = view[`_myRoleGroup${index}`];
        let idx = view[`_myIdx${index}`];
        let pos = view[`_myPos${index}`];
        // let disX = from == 0 ? (234 / 2) : 0;
        // let disY = from == 0 ? (133 / 2) : 0;
        let fromCityIndex = view.api.getCityIndex(from);
        let toCity = Number(pos[idx]);
        let toCityIndex = view.api.getCityIndex(toCity);
        view.createLine({
            x : view._posArr[from].x + view._posArr[from].anchorx,
            y :  view._posArr[from].y + view._posArr[from].anchory,
        },{
            x : view._posArr[toCity].x + view._posArr[toCity].anchorx,
            y :  view._posArr[toCity].y + view._posArr[toCity].anchory
        },index);
        if(!role){
            role = view.createRoleGroup(from, index, servantId);
        }
        else{
            view._midGroup.swapChildren(role, view[`_lineGroup${index}`]);
        }

        let point = App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, role, view[`_city${toCityIndex}`], [0,0], false, true);
        let toX = point.x;
        let toY = point.y;
        
        if(!view._curMoveServant[servantId]){
            view._curMoveServant[servantId] = {};
        }
        view._curMoveServant[servantId][`fromId`] = from;
        view._curMoveServant[servantId][`toId`] = toCity;
        view._curMoveServant[servantId][`index`] = index;
        if(toCity == 0){
            let child = role.getChildByName('planGroup');
            if(child){
                egret.Tween.removeTweens(child);
                role.removeChild(child);
            }
        }
        

        let posstyle = view.judgePos({x : role.x, y : role.y}, point);
        let tmp = posstyle.split('|');
        role.scaleX = tmp[0] == 'left' ? 1 : -1;

        //文字气泡

        let distance = view.get_distance_xy({x : role.x, y : role.y},  {x : toX, y : toY});
        egret.Tween.get(role).to({x : toX, y : toY}, distance / view._speed * 1000).call(()=>{
            if(idx < (pos.length - 1)){
                ++ view[`_myIdx${index}`];
                view.checkMovePos(toCity, index, servantId);
            }
            else{
                view[`_myIdx${index}`] = 0;
                view[`_myPos${index}`] = [];

                delete view._curMoveServant[servantId];

                view[`_myRoleGroup${index}`].alpha = 0;
                view._midGroup.removeChild(view[`_myRoleGroup${index}`]);
                view[`_myRoleGroup${index}`] = null;

                if(view[`_lineGroup${index}`]){
                    view[`_lineGroup${index}`].removeChildren();
                    view._midGroup.removeChild(view[`_lineGroup${index}`]);
                    view[`_lineGroup${index}`] = null;
                }
                if(toCity > 0){
                    view.freshCityServant(toCity);
                }
            }
        },view);
    }

    private get_distance_xy(from : {x : number, y : number}, target : {x : number, y : number}):number{
        //返回格子数
        let view = this;
        let x1 = from.x;
        let x2 = target.x;
        let y1 = from.y;
        let y2 = target.y;
        let xdiff = Math.abs(x2 - x1);            // 计算两个点的横坐标之差
        let ydiff = Math.abs(y2 - y1);            // 计算两个点的纵坐标之差
        return Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5)
    }

    private createTop(type : string):void{
        let view = this;
        let isLeft = type == LayoutConst.left;
        let bgname = '';

        let bg = BaseBitmap.create(view.api.isRedTeam(type) ? `countrywarleft` : `countrywarright`);
        if((type == 'left' && !view.api.isRedTeam(type)) || (type == 'right' && view.api.isRedTeam(type))){
            bg.anchorOffsetX = bg.width / 2;
            bg.anchorOffsetY = bg.height / 2;
            bg.scaleX = -1;
        }
        if(view.api.getCurpeirod() == 3 && ((isLeft && !view.api.getIsWin()) || (!isLeft && view.api.getIsWin()))){
            App.DisplayUtil.changeToGray(bg);
        }

        App.DisplayUtil.setLayoutPosition(isLeft ? LayoutConst.lefttop : LayoutConst.righttop, bg, view.titleBg, [0,view.titleBg.height]);
        view.addChild(bg);

        let teamNameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`CountryWar${type}Team`, [LanguageManager.getlocal(`Countrywarvsname${view.api.isRedTeam(type) ? 'left' : 'right'}`),Api.mergeServerVoApi.getAfterMergeSeverName(null, true, isLeft ? Api.mergeServerVoApi.getTrueZid() : view.api.getEnermyZid())]), 20, view.api.isRedTeam(type) ? 0xff3c3c : TextFieldConst.COLOR_QUALITY_BLUE);
        App.DisplayUtil.setLayoutPosition(isLeft ? LayoutConst.righttop : LayoutConst.lefttop, teamNameTxt, bg, [40,7]);
        view.addChild(teamNameTxt);

        let msgTF:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(isLeft ? view.api.getWinNum() : (view.cfg.cityNum - view.api.getWinNum())),"recharge2_fnt");
        msgTF.setScale(1.5);
        App.DisplayUtil.setLayoutPosition(!isLeft ? LayoutConst.righttop : LayoutConst.lefttop, msgTF, teamNameTxt, [60,teamNameTxt.textHeight + 30]);
        if (PlatformManager.checkIsTextHorizontal()) {
            if (isLeft) {
                msgTF.x = teamNameTxt.x + 150;
            }
            else {
                msgTF.x = teamNameTxt.x + teamNameTxt.width - msgTF.width * 1.5 - 150;
            }

        }
        view.addChild(msgTF); 
        view[`_battlescore${type}`] = msgTF;
        view[`_countrywar${type}bg`] = bg;
        msgTF.visible = view.api.getCurpeirod() == 3;
    }

    private freshServantList():void{
        let view = this;
        let arr = view.api.getServantInfo();
        view._servantBg.height = arr.length * (78 + 5) + 60;
        let list : any = view._servantList;
        list._scrollRect.height = arr.length * (83 + 5);
        view._servantList.refreshData(arr);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._servantList, view._servantBg, [2,40]);
    }

    private _sendTick = 0;
    private _curType = 0;
    protected tick():void{
        let view = this;
        let period = view.api.getCurpeirod();
        if(period != view._curType){
            //跨阶段 刷新界面
            if(period == 3){
                view.api.result = false;
            }
            view.request(NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL,null);
        }

        let param = [];
        if(period == 3){
            if(view.api.isShowRewardRedPoint()){
                App.CommonUtil.addIconToBDOC(view.ruleBtn);
                App.CommonUtil.addIconToBDOC(view.rankBtn);
            }
            else{
                App.CommonUtil.removeIconFromBDOC(view.ruleBtn);
                App.CommonUtil.removeIconFromBDOC(view.rankBtn);
            }
            param.push(view.api.getWinNum().toString());
            param.push((view.cfg.cityNum - view.api.getWinNum()).toString());
            param.push(LanguageManager.getlocal(`atkraceFight${view.api.getIsWin() ? `Win` : `Fail`}`));
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view.ruleBtn);
            App.CommonUtil.removeIconFromBDOC(view.rankBtn);
        }
        param.push(App.DateUtil.getFormatBySecond(view.api.getCountTime()));

        let str = LanguageManager.getlocal(`CountryWarCDTxt${period}`,param);
        if(period == 1 && view.api.getEmptyServant()){
            str = LanguageManager.getlocal('CountryWarCityTip2',param);
        }
        if(period == 3){
            str = LanguageManager.getlocal(`CountryWarCDTxt${period}-${view.api.isRedTeam(`left`) ? 1 : 2}`,param);
        }
        view._timeDesc.text = str;
        view._timeBg.width = view._timeDesc.textWidth + 100;
        view._timeBg.height = view._timeDesc.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._timeBg, view.titleBg, [0,view.titleBg.height+130]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._timeDesc, view._timeBg);

        if(period == 1){//
            ++ view._sendTick;
            if(view._sendTick == 20){
                view.request(NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL,null);
                view._sendTick = 0;
            }
            if(!view._cloudGroup){
                let cloudGroup = new BaseDisplayObjectContainer();
                cloudGroup.width = GameConfig.stageWidth;
                cloudGroup.height = view._noticeScrollView.y - view._timeBg.y - view._timeBg.height;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cloudGroup, view._timeBg, [0,view._timeBg.height]);
                view.addChild(cloudGroup);
                view._cloudGroup = cloudGroup
                /*
                最上面的云走出画面用了24秒，等7秒然后从最左面走到初始位置用了9秒
                中间的云走出画面用了15秒，等7秒，然后从最左面走到初始位置用了18秒
                最下面的走出画面用了2秒，等8秒，然后从最左面走到初始位置用了30秒
                */
                let cloud1 = BaseBitmap.create(`coutrywarcloud1`);
                cloud1.x = 40;
                cloud1.y = 40;
                cloudGroup.addChild(cloud1);
                egret.Tween.get(cloud1, {loop : true}).to({x : GameConfig.stageWidth}, 24000).set({x : -cloud1.width}).wait(7000).to({x : 40}, 9000);

                let cloud2 = BaseBitmap.create(`coutrywarcloud2`);
                cloud2.x = 400;
                cloud2.y = 110;
                cloudGroup.addChild(cloud2);
                egret.Tween.get(cloud2, {loop : true}).to({x : GameConfig.stageWidth}, 15000).set({x : -cloud2.width}).wait(7000).to({x : 400}, 18000);

                let cloud3 = BaseBitmap.create(`coutrywarcloud3`);
                cloud3.x = 600;
                cloud3.y = 275;
                cloudGroup.addChild(cloud3);
                egret.Tween.get(cloud3, {loop : true}).to({x : GameConfig.stageWidth}, 2000).set({x : -cloud3.width}).wait(8000).to({x : 600}, 30000);
            }
        }
        else{
            if(view._cloudGroup){
                view._cloudGroup.dispose();
                view._cloudGroup = null;
            }
            
        }
        view._curType = period;
    }

    // protected getBgName():string{
    //     return `crosspowerenterbg-1`;
    // }
    private createNewMove(fromId : number, toId : number, servantId : number):void{
        let view = this;
        let curMove = Object.keys(view._curMoveServant).length;
        if(curMove >= 3){
            //让一只正在撤回的队伍迅速完成 减少渲染压力
            for(let i in view._curMoveServant){
                let obj = view._curMoveServant[i];
                if(obj.toId == 0){
                    let index = obj.index;
                    view[`_myIdx${index}`] = 0;
                    view[`_myPos${index}`] = [];   
                    egret.Tween.removeTweens(view[`_myRoleGroup${index}`]);
                    view[`_myRoleGroup${index}`].alpha = 0;
                    view._midGroup.removeChild(view[`_myRoleGroup${index}`]);
                    view[`_myRoleGroup${index}`] = null;
                    
                    view[`_myPos${index}`].push(toId);
                    view.checkMovePos(fromId, index, servantId);
                    break;     
                }
            }
        }
        else{
            for(let i = 0; i < 3; ++ i){
                if(!view[`_myRoleGroup${i}`]){
                    view[`_myIdx${i}`] = 0;
                    view[`_myPos${i}`].push(toId);
                    view.checkMovePos(fromId, i, servantId);
                    break;
                }
            }
        }
    }

    private clearArrow(cityId : number):void{
        let view = this;
        let cityIdx = view.api.getCityIndex(cityId);
        let arrow = view[`_cityServantarrow${cityIdx}`];
        let servantInfo = view.api.getServant();
        if(servantInfo[cityIdx] && servantInfo[cityIdx].servant){
            arrow.visible = false;
        }
        else{
            arrow.visible = true;
        }

        if(view.api.getCurpeirod() > 1 || !view.api.getEmptyServant()){
            arrow.visible = false;
        }

        if(view.api.getCurpeirod() == 3){
            arrow.visible = false;
        }
    }

    private freshCityServant(cityId : number):void{
        let view = this;
        let cityIdx = view.api.getCityIndex(cityId);
        let group = view[`_cityServantGroup${cityIdx}`];
        let servantImg = view[`_cityServant${cityIdx}`];
        let servantInfo = view.api.getServant();
        let arrow = view[`_cityServantarrow${cityIdx}`];
        view._midGroup.setChildIndex(group, 999);

        view.clearArrow(cityId);
        
        if(servantInfo[cityIdx] && servantInfo[cityIdx].servant){
            let servantCloth = `servant_half_${servantInfo[cityIdx].servant}`;
            let obj : ServantInfoVo= Api.servantVoApi.getServantObj(servantInfo[cityIdx].servant);
            if(obj && obj.equip){
                servantCloth = `skin_half_${obj.equip}`;
            }
            servantImg.setload(servantCloth);
            group.visible = true;
        }
        else{
            group.visible = false;
        }

        if(view.api.getCurpeirod() == 3){
            group.visible = false;
        }
    }

    private changeServantCallback(evt : egret.Event):void{
        let view = this;
        //刷新人数
        let cityArr = view.api.getRandCity();
        for(let i in cityArr){
            view.freshCityNumText(cityArr[i]);
            view.clearArrow(cityArr[i]);
            //view.freshCityServant(cityArr[i]);
        }

        let newServantInfo = {};
        let servantinfo = view.api.myServantInfo();
        for(let i in servantinfo){
            newServantInfo[i] = servantinfo[i].cityId;
        }

        for(let i in view._prevServant){
            let servantId = Number(i);
            let toPrevCity = view._prevServant[i];

            if(newServantInfo[servantId]){
                //派遣后门客还在
                //比对目的地是否相同
                let toNewCity = newServantInfo[servantId];
                if(toNewCity != toPrevCity){
                    //目的地不同 需要移动门客
                    let unit = view._curMoveServant[servantId];
                    //门客如果正在移动中
                    if(unit){
                        let index = unit.index;
                        let lineGroup = view[`_lineGroup${index}`];
                        lineGroup.removeChildren();
                        view._midGroup.removeChild(lineGroup);
                        view[`_lineGroup${index}`] = null;
                        //view.createLine(new egret.Point(view._posArr[0].x + 120, view._posArr[0].y + 65), new egret.Point(pos.x + 75, pos.y + 45));
                        //新目的地回城 半路返回
                        if(toNewCity == 0){
                            let role = view[`_myRoleGroup${index}`];
                            egret.Tween.removeTweens(role);
                            view[`_myPos${index}`] = [0];
                            view[`_myIdx${index}`] = 0;
                            view.checkMovePos(toPrevCity, index, servantId);
                        }
                        else{
                            //新目的地是别的城市 则视为瞬间撤回 再派出
                            view[`_myIdx${index}`] = 0;
                            view[`_myPos${index}`] = [];   
                            egret.Tween.removeTweens(view[`_myRoleGroup${index}`]);
                            view[`_myRoleGroup${index}`].alpha = 0;
                            view._midGroup.removeChild(view[`_myRoleGroup${index}`]);
                            view[`_myRoleGroup${index}`] = null;
                            //新动画
                            view.createNewMove(0, toNewCity, servantId);
                        }
                    }
                    else{
                        view.freshCityServant(toPrevCity);
                        //新动画toPrevCity
                        view.createNewMove(0, toNewCity, servantId);
                    }
                }
            }
            else{
                //派遣后门客不在，被撤回了
                let unit = view._curMoveServant[servantId];
                view.freshCityServant(toPrevCity);
                //门客如果正在移动中
                if(unit){
                    let index = unit.index;
                    let lineGroup = view[`_lineGroup${index}`];
                    lineGroup.removeChildren();
                    view._midGroup.removeChild(lineGroup);
                    view[`_lineGroup${index}`] = null;

                    let role = view[`_myRoleGroup${index}`];
                    egret.Tween.removeTweens(role);
                    view[`_myPos${index}`] = [0];
                    view[`_myIdx${index}`] = 0;
                    view.checkMovePos(toPrevCity, index, servantId);
                }
                else{
                    //新动画
                    view.createNewMove(toPrevCity, 0, servantId);
                }
            }
        }

        for(let i in newServantInfo){
            let servantId = Number(i);
            let toNewCity = newServantInfo[i];
            //之前没有派出
            if(!view._prevServant[servantId]){
                let unit = view._curMoveServant[servantId];
                //门客如果正在移动中
                if(unit){
                    let index = unit.index;
                    let role = view[`_myRoleGroup${index}`];
                    let lineGroup = view[`_lineGroup${index}`];
                    lineGroup.removeChildren();
                    view._midGroup.removeChild(lineGroup);
                    view[`_lineGroup${index}`] = null;
                    //之前正在撤回中 瞬间完成
                    if(unit.toId == 0){
                        view[`_myIdx${index}`] = 0;
                        view[`_myPos${index}`] = [];   
                        egret.Tween.removeTweens(view[`_myRoleGroup${index}`]);
                        view[`_myRoleGroup${index}`].alpha = 0;
                        view._midGroup.removeChild(view[`_myRoleGroup${index}`]);
                        view[`_myRoleGroup${index}`] = null;

                        //新派出的门客
                        view.createNewMove(0, toNewCity, servantId);
                    }
                }
                else{
                    //新派出的门客
                    view.createNewMove(0, toNewCity, servantId);
                }
            }
        }

        //替换最新的门课派遣情况
        view._prevServant = {};
        for(let i in newServantInfo){
            view._prevServant[i] = newServantInfo[i];
        }
    }

    protected doRefreshChat()
	{
		if(!this._chatTxt)
		{
			return;
        }
        let showStr = Api.chatVoApi.getLastMessage();
        let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
        if (emoticonStr){
            showStr = emoticonStr;
        }
		this._chatTxt.text = showStr;
		let chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		if(chatTxt.width >= 480){
			this._chatTxtPoint.visible = true;
		}
		else{
			this._chatTxtPoint.visible = false;
		}
    }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.doRefreshChat,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_COUNTRYWAY_UPDATEANNOUNCE),view.editBtnhandlerCallback,view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COUNTRYWAR_CHANGESERVANT, view.changeServantCallback, view);
    
        view._timeDesc = null;
        view._timeBg = null;
        view._chatTxt = null;
        view._chatTxtPoint = null;
        for(let i = 0; i < 4; ++ i){
            if(view[`_myRoleGroup${i}`]){
                view[`_myRoleGroup${i}`].removeTouchTap();
                view[`_myRoleGroup${i}`].dispose();
                view[`_myRoleGroup${i}`] = null;
            }
            
            view[`_myPos${i}`] = [];
            view[`_myIdx${i}`] = 0;
            if(view[`_lineGroup${i}`]){
                view[`_lineGroup${i}`].dispose();
                view[`_lineGroup${i}`] = null;
            }
        }
        view[`_city0`] = null;
        for(let i = 1; i < 6; ++ i){
            view[`_city${i}`] = null;
            view[`_cityName${i}`] = null;
            view[`_cityDetailBg${i}`] = null;
            view[`_cityDetailNumTxtleft${i}`] = null;
            view[`_cityDetailNumTxtright${i}`] = null;
            view[`_cityDetailFlagleft${i}`] = null;
            view[`_cityDetailFlagright${i}`] = null;
            if(view[`_cityServant${i}`]){
                BaseLoadBitmap.release(view[`_cityServant${i}`]);
                view[`_cityServant${i}`] = null;
            }
            if(view[`_cityServantarrow${i}`]){
                egret.Tween.removeTweens(view[`_cityServantarrow${i}`]);
                view[`_cityServantarrow${i}`] = null;
            }
            if(view[`_cityServantGroup${i}`]){
                view[`_cityServantGroup${i}`].dispose();
                view[`_cityServantGroup${i}`] = null;
            }
        }
        view._midGroup = null;
        view._prevServant = {};
        view._curMoveServant = {};
        if(view._servantBg){
            view._servantBg.removeTouchTap();
            view._servantBg = null;
        }
        view._servantList = null;
        view._editBg = null;
        view._editText = null;
        view._sendTick = 0;
        view._init = false;
        view._countrywarleftbg = null;
        view._countrywarrightbg = null;
        view._midBg = null;
        view._noticeGroup = null;
        view._noticeScrollView = null;
        view._vsBg = null;
        view._battlescoreleft = null;
        view._battlescoreright = null;
        if(view._cloudGroup){
            view._cloudGroup.dispose();
            view._cloudGroup = null;
        }
        super.dispose();
    }
}