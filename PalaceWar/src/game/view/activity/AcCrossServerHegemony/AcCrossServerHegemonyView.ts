/**
 * author:jiangly
 * desc:群雄逐鹿
*/
class AcCrossServerHegemonyView extends AcCommonView
{

    private _curRoundDetailTxt :BaseTextField = null;
    private _curRoundDetailBg:BaseBitmap = null;
    private _curRoundName:BaseTextField = null;
    private _chatTxt :BaseTextField = null;
    private _changeServantBtn:BaseButton = null;
    private _showRewardBtn:BaseButton = null;
    private _detailTipTxt:BaseTextField;

    private _matchDetailNode:BaseDisplayObjectContainer = null;
    private _acTimeTxt:BaseTextField = null;
    private _cdTimeTxt:BaseTextField = null;

    private _scrollList:ScrollList = null;

    // private _isChangeServant = false;
    private _lmnameTxt:BaseTextField = null;
    private _rankBtn:BaseButton = null;
	public constructor() 
	{
		super();
	}
	
	private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private getTyeCode():string{
        return this.code;
    }


	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_ACHEGEMONY_HEGEMONYOPEN,requestData:{
			activeId : this.vo.aidAndCode,
        }};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (data.ret){
            App.LogUtil.log("receiveData hegemonyview");
        }
	}
    private refreshRedDot():void{
        // this._rankBtn = this.vo.checkFlagRankRed();
        // (this._changeServantBtn
        if(!this._rankBtn || !this._changeServantBtn){
            return ;
        }
        if(this.vo.checkFlagRankRed()){
            App.CommonUtil.addIconToBDOC(this._rankBtn);
        } else {
            App.CommonUtil.removeIconFromBDOC(this._rankBtn);
        }
        if(this.vo.checkFightScoreRed()){
            App.CommonUtil.addIconToBDOC(this._changeServantBtn);
        } else {
            App.CommonUtil.removeIconFromBDOC(this._changeServantBtn);
        }
    }

    private refreshCurStatus():void
    {
        let curStatus = this.vo.getCurStatus();
        let roundNameStr = "";
        let roundDetailStr = "";
        if(curStatus == 1 || curStatus == 2){
            roundNameStr = LanguageManager.getlocal("acCrossServerHegemonyRoundName1");
            roundDetailStr = LanguageManager.getlocal("acCrossServerHegemonyRoundTip1",["32"]);
        } else if(curStatus == 10 || curStatus == 11){
            roundNameStr = LanguageManager.getlocal("acCrossServerHegemonyRoundName2");
            roundDetailStr = LanguageManager.getlocal("acCrossServerHegemonyRoundTip1",["16"]);  
        } else if(curStatus == 12){
            roundNameStr = LanguageManager.getlocal("acCrossServerHegemonyRoundName3");
            roundDetailStr = LanguageManager.getlocal("acCrossServerHegemonyRoundTip1",["8"]);  
        } else if(curStatus == 13){
            roundNameStr = LanguageManager.getlocal("acCrossServerHegemonyRoundName4");
            roundDetailStr = LanguageManager.getlocal("acCrossServerHegemonyRoundTip1",["4"]);              
        } else if(curStatus == 14){
            roundNameStr = LanguageManager.getlocal("acCrossServerHegemonyRoundName5");
            roundDetailStr = LanguageManager.getlocal("acCrossServerHegemonyRoundTip1",["2"]);              
        } else if(curStatus == 15){
            roundNameStr = LanguageManager.getlocal("acCrossServerHegemonyRoundName6");
            roundDetailStr = LanguageManager.getlocal("acCrossServerHegemonyRoundTip2");             
        } else if(curStatus == 16){
            roundNameStr = LanguageManager.getlocal("acCrossServerHegemonyRoundName8");
            roundDetailStr = LanguageManager.getlocal("acCrossServerHegemonyRoundTip3");   
        } else if(curStatus == 0){
            roundNameStr = LanguageManager.getlocal("acCrossServerHegemonyRoundName6");
            roundDetailStr = LanguageManager.getlocal("acCrossServerHegemonyRoundTip3");              
        }
        this._curRoundName.text = roundNameStr;
        this._curRoundName.x = GameConfig.stageWidth/2 - this._curRoundName.width/2;

        this._curRoundDetailTxt.text = roundDetailStr;
        this._curRoundDetailTxt.x = GameConfig.stageWidth/2 - this._curRoundDetailTxt.width/2;

    }
    private getCdTimeTxt():string
    {
        let curMatchId = this.vo.getNextMatchId();
        // App.LogUtil.log("getCdTimeTxt: "+ curMatchId);
        if(curMatchId > 29){
            curMatchId = 29;
        }
        let status = this.vo.checkStatusByMatchId(curMatchId);
        let returnStr:string = "";
        if(status == 1 || status == 2){
            let cdStr = this.vo.getCdStrByMatchId(curMatchId);
            returnStr = LanguageManager.getlocal("acCrossServerHegemonyBattleCdTime",[cdStr])
        } else if(status == 3){
            let cdStr = this.vo.getCdStrByMatchId(curMatchId);
            returnStr = LanguageManager.getlocal("acCrossServerHegemonyRoundTip4",[cdStr]);
        } else if(status == 4){
            //这个类型不应该有
            returnStr = LanguageManager.getlocal("acCrossServerHegemonyRoundTip3");
        }

        return returnStr;
        
    }
	public initView():void
	{	
        // this.vo.isEnter = true;

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.refreshView,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLIANCEINFO,this.getAlliDetail,this);

        this.setBigFameY(this.titleBg.y + this.titleBg.height - 5);

        let titleBg = BaseBitmap.create("accshegemony_maintitlebg");
        titleBg.x = GameConfig.stageWidth/2 - titleBg.width/2;
        titleBg.y = this.titleBg.y + this.titleBg.height + 6;
        this.addChildToContainer(titleBg);

        this._curRoundName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyTitle1"),36,0xffe09a);
        this._curRoundName.x = GameConfig.stageWidth/2 - this._curRoundName.width/2;
        this._curRoundName.y = titleBg.y + 10;
        this.addChildToContainer(this._curRoundName);

        this._curRoundDetailTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyTitleTip1"),20,TextFieldConst.COLOR_WARN_YELLOW);
        this._curRoundDetailTxt.x = GameConfig.stageWidth/2 - this._curRoundDetailTxt.width/2;
        this._curRoundDetailTxt.y = titleBg.y + 70 - this._curRoundDetailTxt.height/2;
        this.addChildToContainer(this._curRoundDetailTxt);

        //详情
        let detailBtnBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
        detailBtnBg.x = titleBg.x + 10;
        detailBtnBg.y = titleBg.y + 10;
        this.addChildToContainer(detailBtnBg);

        let detailBtn:BaseButton = ComponentManager.getButton("accshegemony_detailbtn",null,this.detailBtnListener,this);
        detailBtn.x = detailBtnBg.x + detailBtnBg.width/2 - detailBtn.width/2;
        detailBtn.y = detailBtnBg.y + detailBtnBg.height/2 - detailBtn.height/2;
        this.addChildToContainer(detailBtn);

        let detailBtnTxt = BaseBitmap.create("accshegemony_maindetailtxt");
        detailBtnTxt.x = detailBtnBg.x + detailBtnBg.width/2 - detailBtnTxt.width/2;
        detailBtnTxt.y = detailBtnBg.y + detailBtnBg.height - detailBtnTxt.height;
        this.addChildToContainer(detailBtnTxt);
        //排行榜
        let rankBtnBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
        rankBtnBg.x = titleBg.x + titleBg.width - 10 - rankBtnBg.width;
        rankBtnBg.y = titleBg.y + 10;
        this.addChildToContainer(rankBtnBg);

        let rankBtn = ComponentManager.getButton("accshegemony_mainrankicon",null,this.rankBtnListener,this);
        rankBtn.x = rankBtnBg.x + rankBtnBg.width/2 - rankBtn.width/2;
        rankBtn.y = rankBtnBg.y + rankBtnBg.height/2 - rankBtn.height/2;
        this.addChildToContainer(rankBtn);  
        this._rankBtn = rankBtn;

        let rankBtnTxt = BaseBitmap.create("accshegemony_mainranktxt");
        rankBtnTxt.x = rankBtnBg.x + rankBtnBg.width/2 - rankBtnTxt.width/2;
        rankBtnTxt.y = rankBtnBg.y + rankBtnBg.height - rankBtnTxt.height;
        this.addChildToContainer(rankBtnTxt);

        let redBg = BaseBitmap.create("accshegemony_ranktitlebg");
        redBg.width = 620;
        redBg.x = GameConfig.stageWidth/2 - redBg.width/2;
        redBg.y = titleBg.y + titleBg.height;
        this.addChildToContainer(redBg);

        let redRankTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRank"),22,TextFieldConst.COLOR_WARN_YELLOW);
        redRankTip.x = 83 - redRankTip.width/2 - 10;
        redRankTip.y = redBg.y + redBg.height /2 - redRankTip.height/2;
        this.addChildToContainer(redRankTip);

        let redNameTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyAllName2"),22,TextFieldConst.COLOR_WARN_YELLOW);
        redNameTip.x = 196 - redNameTip.width/2 + 5;
        redNameTip.y = redBg.y + redBg.height /2 - redNameTip.height/2;
        this.addChildToContainer(redNameTip);

        let redQuTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyQu"),22,TextFieldConst.COLOR_WARN_YELLOW);
        redQuTip.x = 327 - redQuTip.width/2 + 5;
        redQuTip.y = redBg.y + redBg.height /2 - redQuTip.height/2;
        this.addChildToContainer(redQuTip);

        let redWinNumTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyWinNum"),22,TextFieldConst.COLOR_WARN_YELLOW);
        redWinNumTip.x = 427 - redWinNumTip.width/2 + 15;
        redWinNumTip.y = redBg.y + redBg.height /2 - redWinNumTip.height/2;
        this.addChildToContainer(redWinNumTip);

        let redPowerUpTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyPowerPlus"),22,TextFieldConst.COLOR_WARN_YELLOW);
        redPowerUpTip.x = 537 - redPowerUpTip.width/2 + 15;
        redPowerUpTip.y = redBg.y + redBg.height /2 - redPowerUpTip.height/2;
        this.addChildToContainer(redPowerUpTip);

        // let topBg = BaseBitmap.create("accshegemony_maintopbg");
        // topBg.width = 640;
        // topBg.height = 555 - (1136-GameConfig.stageHeigth)/2;
        // topBg.x = GameConfig.stageWidth/2 - topBg.width/2;
        // topBg.y = redBg.y + redBg.height-2;
        // this.addChildToContainer(topBg);
        // topBg.visible = false;
        let listContainer = new BaseDisplayObjectContainer();
        listContainer.width = 620;
        // listContainer.height = 555 - (1136-GameConfig.stageHeigth)/2;
        listContainer.height = GameConfig.stageHeigth - (redBg.y + redBg.height + 315);
        listContainer.x = GameConfig.stageWidth/2 - listContainer.width/2;
        listContainer.y = redBg.y + redBg.height;
        this.addChildToContainer(listContainer);

        
        this.setBigFameHeight(listContainer.y + listContainer.height + 6 - this.titleBg.y - this.titleBg.height + 1);

        let topBg = BaseBitmap.create("accshegemony_maintopbg");
        topBg.width = 620;
        topBg.height = listContainer.height;
        topBg.x = GameConfig.stageWidth/2 - topBg.width/2;
        topBg.y = redBg.y + redBg.height;
        this.addChildToContainer(topBg);
        topBg.visible = false;

        let list = [];
        // let scrollList = ComponentManager.getScrollList(AcArcadeGameRewardScrollItem, cfg.poolListItemCfg, rect, { aid: aid, code: code });
		// scrollList.setPosition(bg.x + 10, bg.y + 10);
        let listRect = new egret.Rectangle(0,0, 620, listContainer.height - 90);
        let scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyMainScrollList,list,listRect,{aid:this.aid,code:this.code});
		scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2;
		scrollList.y = redBg.y + redBg.height + 5;
		this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        // this.vo.
        let cdTimeStr = this.getCdTimeTxt();
        this._cdTimeTxt = ComponentManager.getTextField(cdTimeStr,20,TextFieldConst.COLOR_WARN_YELLOW);
        this._cdTimeTxt.x = 30;
        this._cdTimeTxt.y = scrollList.y + scrollList.height + 20;
        this.addChildToContainer(this._cdTimeTxt);

        let topTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyClickTip"), 20 , 0x9cb1c7);
        topTip.x = this._cdTimeTxt.x;
        topTip.y = this._cdTimeTxt.y + this._cdTimeTxt.height + 5;
        this.addChildToContainer(topTip);

        this._changeServantBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"acCrossServerHegemonySelectServantBtn",this.changeServantBtnListener,this,null,null,null,TextFieldConst.COLOR_BLACK);
        this._changeServantBtn.x = GameConfig.stageWidth - 25 - this._changeServantBtn.width;
        this._changeServantBtn.y =  this._cdTimeTxt.y - 6;
        this.addChildToContainer(this._changeServantBtn);

        ///下面
        let downBg = BaseBitmap.create("accshegemony_mainuibottombg");
        downBg.width = 640;
        // downBg.height = 315 - (1136 - GameConfig.stageHeigth)/2;
        downBg.height = 270;
        downBg.x = GameConfig.stageWidth/2 - downBg.width/2;
        // downBg.y = chatbg.y + chatbg.height+5;
        downBg.y = GameConfig.stageHeigth - downBg.height;

        let line = BaseBitmap.create("commonview_line");
        line.width = 620;
        this.addChildToContainer(line);
        line.setPosition(GameConfig.stageWidth/2 - line.width/2, scrollList.y + scrollList.height);

        let bar = BaseBitmap.create("commonview_bottom_bar");
        bar.setPosition(GameConfig.stageWidth/2 - bar.width/2, downBg.y - 7);        
        this.addChildToContainer(bar);
        this.addChildToContainer(downBg);

        // 聊天
		let chatbg = null;
		if(1){
			//跨服聊天消息
			chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
			chatbg.width = GameConfig.stageWidth;
			chatbg.height = 35;
			chatbg.x = 0;
            // chatbg.y = listContainer.y + listContainer.height;
            chatbg.y = downBg.y - chatbg.height - 5;
			this.addChildToContainer(chatbg);
			chatbg.touchEnabled = true;
			chatbg.addTouchTap(this.chatBgClickHandler,this);

			let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
			chatIcon.anchorOffsetX = chatIcon.width/2;
			chatIcon.anchorOffsetY = chatIcon.height/2;
			chatIcon.x =  chatIcon.width/2+10;
			chatIcon.y = chatbg.y + chatbg.height/2;
			this.addChildToContainer(chatIcon);
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
			this._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._chatTxt.width = GameConfig.stageWidth - (chatIcon.x + chatIcon.width + 5);
			this._chatTxt.height = 20;
			this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
			this.addChildToContainer(this._chatTxt);
		}

        this._showRewardBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"acCrossServerHegemonyRewarBtn",this.showRewardBtnListener,this,null,null,null,TextFieldConst.COLOR_BLACK);
        this._showRewardBtn.x = GameConfig.stageWidth - 25 - this._showRewardBtn.width;
        // this._showRewardBtn.y = downBg.y + downBg.height - 10 - this._showRewardBtn.height;
        this._showRewardBtn.y = downBg.y + 25;
        this.addChildToContainer(this._showRewardBtn);

        this._matchDetailNode = new BaseDisplayObjectContainer();
        // this._matchDetailNode.width = detailBg.width - 40;
        this._matchDetailNode.width = 560;
        this._matchDetailNode.setPosition(downBg.x + downBg.width/2 - this._matchDetailNode.width/2, downBg.y + 40);
        this.addChildToContainer(this._matchDetailNode);
		// let rect = new egret.Rectangle(0, 0, detailBg.width - 40,detailBg.height - 30);
		// let scrollView = ComponentManager.getScrollView(this._matchDetailNode,rect);
        // scrollView.x = detailBg.x + detailBg.width/2 - scrollView.width/2;
        // scrollView.y = detailBg.y + detailBg.height/2 - scrollView.height/2;
        // this.addChildToContainer(scrollView);

        let lmnameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyAllname",[this.vo.getAllName()]),20 ,TextFieldConst.COLOR_BROWN);
        lmnameTxt.x = 0;//this._acTimeTxt.x;
        lmnameTxt.y = 0;
        this._matchDetailNode.addChild(lmnameTxt);
        this._lmnameTxt = lmnameTxt;    

        this._acTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyAcTime",[this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._acTimeTxt.x = this._lmnameTxt.x;
        this._acTimeTxt.y = this._lmnameTxt.y + this._lmnameTxt.height + 5;
        this._matchDetailNode.addChild(this._acTimeTxt);

 
        let detailTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRule"),20,TextFieldConst.COLOR_BROWN);
        detailTxt.width = 554;
        detailTxt.lineSpacing = 5;
        detailTxt.x = this._acTimeTxt.x;
        detailTxt.y = this._acTimeTxt.y + this._acTimeTxt.height + 5;
        this._matchDetailNode.addChild(detailTxt);

        if(this.vo.isCanJoin()){
            let zigeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyCanJoin"),20 ,TextFieldConst.COLOR_WARN_GREEN4);
            zigeTxt.x = this._acTimeTxt.x;
            zigeTxt.y = detailTxt.y + detailTxt.height + 5;
            this._matchDetailNode.addChild(zigeTxt);
        } else {
            let zigeStr = "acCrossServerHegemonyNoAllianceJoin";
            if (this.vo.isHasAlliance()){
                zigeStr = "acCrossServerHegemonyNotCanJoin";
            }
            let zigeTxt = ComponentManager.getTextField(LanguageManager.getlocal(zigeStr),20 , 0xbe4545);
            zigeTxt.x = this._acTimeTxt.x;
            zigeTxt.y = detailTxt.y + detailTxt.height + 5;
            this._matchDetailNode.addChild(zigeTxt);
        }

        
        let touchPanel = BaseBitmap.create("public_alphabg");
        touchPanel.width = this._matchDetailNode.width;
        touchPanel.height = this._matchDetailNode.height;
        this._matchDetailNode.addChild(touchPanel);
	

        this.updateRankRequest();

		this.refreshCurStatus();
        this.refreshRedDot();

        this.ShowNotOpenView();
	}
    private updateRankRequest(){
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETRANK,this.updateRankData,this);
        NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETRANK,{activeId:this.vo.aidAndCode});
    }



    private updateRankData(event?:egret.Event){

        
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETRANK,this.updateRankData,this);
        // let ret = event.data.data.ret;
        if(event && event.data.ret && event.data.data && event.data.data.ret == 0){
            let data = event.data.data.data;
            let rankData = data.rank;
            // console.log(data);
            Api.crossServerHegemonyVoApi.setRank(rankData);
            this.vo.myWinNum = Number(data.myrank.win);
            this.vo.setAllName(data.myrank.name);
            this._scrollList.refreshData(rankData,{aid:this.aid,code:this.code});

            this._lmnameTxt.text = LanguageManager.getlocal("acCrossServerHegemonyAllname",[this.vo.getAllName()]);
            this.refreshRedDot();
        }

    }
    private changeServantBtnListener()
    {
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return;
        }
        if (!this.vo.isOpenActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyRoundTip0"));
            return ;
        }
        if (!this.vo.isHasAlliance()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyNoAllianceJoin"));
            return;
        }
        if(!this.vo.isCanJoin()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyNoCanJoin"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYBATTLEVIEW,{
            aid : this.aid,
            code : this.code,
            
        });  
    }    

    private getAlliDetail(event?:egret.Event){
        
        if(event && event.data && event.data.ret){
            let d = event.data.data.data;
            // console.log(d);
            let achegemonyinfo = d.achegemonyinfo;
            // console.log(achegemonyinfo);

            if(Api.crossServerHegemonyVoApi.getMainSearchDetail())
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYDETAILPOPUPVIEW,{
                    aid : this.aid,
                    code : this.code,
                    data: achegemonyinfo
                });
                Api.crossServerHegemonyVoApi.setMainSearchDetail(false);
            }
            

        }


        // this._isChangeServant = false;

    }
    private showRewardBtnListener()
    {
        if (!this.vo.isOpenActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyRoundTip0"));
            return ;
        }
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYREWARDVIEW,{
			aid : this.aid,
			code : this.code
		});        

    }
    private detailBtnListener()
    {
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return;
        }
        let curStatus = this.vo.getCurStatus();
        let viewName = ViewConst.POPUP.ACCROSSSERVERHEGEMONYMATCHVIEW;
        if (curStatus == 12){
            viewName = ViewConst.POPUP.ACCROSSSERVERHEGEMONYMATCHVIEWTAB2;
        }
        else if (curStatus == 13){
            viewName = ViewConst.POPUP.ACCROSSSERVERHEGEMONYMATCHVIEWTAB3;
        }
        else if (curStatus > 13){
            viewName = ViewConst.POPUP.ACCROSSSERVERHEGEMONYMATCHVIEWTAB4;
        }
        ViewController.getInstance().openView(viewName, {
			aid : this.aid,
			code : this.code
		}); 
    }
    private rankBtnListener()
    {
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYFLAGVIEW,{
			aid : this.aid,
			code : this.code
		}); 
    }
    private chatBgClickHandler():void{
        // if(this._stopTouch){
        //     return;
        // }
        // if(!this.vo.getAttendQuality()){
        //     App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
        //     return;
        // }
        if(Api.switchVoApi.checkCloseChat())
		{
			App.CommonUtil.showTip("很抱歉，聊天系统维护中");
			return;
        }
        let notChat:boolean = true;
        if (this.vo.isCanJoin()){
            notChat = false;
        }
        let sendTip = LanguageManager.getlocal("acCrossServerHegemonyNotChatTip");
		ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {activeID : this.vo.aidAndCode, notChat: notChat, sendTip: sendTip});
    }
    
    private ShowNotOpenView():void{
        let container = <BaseDisplayObjectContainer>this.container.getChildByName("notOpenContainer");
        if (!this.vo.isOpenActivity()){
            if (!container){
                let notOpenContainer = new BaseDisplayObjectContainer();
                notOpenContainer.width = GameConfig.stageWidth;
                notOpenContainer.height = GameConfig.stageHeigth;
                this.addChildToContainer(notOpenContainer);
                notOpenContainer.name = "notOpenContainer";
                notOpenContainer.setPosition(0, this.titleBg.y + this.titleBg.height);

                let touchPos = BaseBitmap.create("public_9_viewmask");//public_alphabg public_9_viewmask 
                touchPos.width = GameConfig.stageWidth;
                touchPos.height = GameConfig.stageHeigth - this.titleBg.height;
                notOpenContainer.addChild(touchPos);
                touchPos.name = "notOpenTouchPos";
                touchPos.alpha = 0.8;
                touchPos.touchEnabled = true;

                let tipBg:BaseBitmap=BaseBitmap.create("public_tipbg");
                tipBg.setPosition(notOpenContainer.width/2 - tipBg.width/2, notOpenContainer.height/2 - tipBg.height/2);
                tipBg.name="tipBg";
                notOpenContainer.addChild(tipBg);

                let msgText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRoundTip0"), TextFieldConst.FONTSIZE_TITLE_SMALL);
                msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
                msgText.textAlign=egret.HorizontalAlign.CENTER;
                msgText.name="msgText";
                msgText.lineSpacing=2;
                notOpenContainer.addChild(msgText);
            }
        }
        else{
            if (container){
                container.visible = false;
                container.dispose();
            }
        }
    }

    private refreshNotOpenView():void{
        let container = <BaseDisplayObjectContainer>this.container.getChildByName("notOpenContainer");
        if (this.vo.isOpenActivity()){
            if (container){
                container.visible = false;
                container.dispose();
            }
        }
    }

    public tick():void
	{	
        if(this._chatTxt){
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
			this._chatTxt.text = showStr;
        }
        let cdTimeStr = this.getCdTimeTxt();
        if(this._cdTimeTxt){
            this._cdTimeTxt.text = cdTimeStr;
        }
        this.refreshCurStatus();
        this.refreshRedDot();
        this.refreshNotOpenView();
	}

    private refreshView()
    {

    }

    protected get uiType():string
	{
		return "2";
    }

    protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

    protected isHideTitleBgShadow():boolean{
        return true;
    }
    
    protected getTitleBgName():string{
        return ResourceManager.hasRes("achegemony_titlebg-"+this.code) ? "achegemony_titlebg-"+this.code : "achegemony_titlebg-1";
    }

    protected getTitleStr():string{
        return "";
    }

    protected getCloseBtnName():string{
        return ButtonConst.COMMON_CLOSE_1;
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            //main
            "accshegemony_maindetailtxt",
            "accshegemony_mainranktxt",
            "accshegemony_mainredbg",
            "accshegemony_maintalkbg",
            "accshegemony_maintitlebg",
            "accshegemony_maintopbg",
            "accshegemony_mainrankicon",
            "accshegemony_detailbtn",
            "mainui_bottombtnbg",

            "accshegemony_shopitembg",
            "accshegemony_shopitemline",
            "accshegemony_rulebtn",
            "rankbg_1",
            "rankbg_2",
            "rankbg_3",
            "rank_1",
            "rank_2",
            "rank_3",
            "activity_charge_red",
            "accshegemony_reward_item_icon",
            "accshegemony_allreward",
            "acsingledayitembg",
            "accshegemony_ranktitlebg",
            "accshegemonyranklistbg",
            "accshegemony_ranklistbg",
            "accshegemony_ranklistbg1",
            "accshegemony_ranklistbg2",
            "accshegemony_ranklistbg3",
            "accshegemony_mainuibottombg",
            "commonview_bottom_bar",
            "accshegemonyprank1",
            "accshegemonyprank2",
            "accshegemonyprank3",
            "public_popupscrollitembg",
            "commonview_line",
            "achegemony_titlebg-1",
            "servantpkxunhuan",
		]);
	}

    protected getRuleInfoParam():string[]{

        let scoreRebate = this.cfg.flagScoreRebate;
        let paramStr = "";
		for(let i = scoreRebate.length - 1 ; i >= 0; i --){

			let rebateCfg = scoreRebate[i];
			if(rebateCfg.multiplying <= 0){
				continue;
			}
			let msgStr = LanguageManager.getlocal("acCrossServerHegemonyFlagRule2",[String(rebateCfg.rank[0]),String(rebateCfg.rank[1]),String(rebateCfg.multiplying * this.cfg.flagScoreNum)]);
			if(rebateCfg.rank[0] == rebateCfg.rank[1] && rebateCfg.rank[1] == 1){
				msgStr = LanguageManager.getlocal("acCrossServerHegemonyFlagRule5",[String(rebateCfg.multiplying * this.cfg.flagScoreNum)]);
			} 

			paramStr  = paramStr + msgStr + "\n";

		}
		return [paramStr];
	}
	public dispose():void
	{

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.refreshView,this);
        
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETRANK,this.updateRankData,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLIANCEINFO,this.getAlliDetail,this);
        this._curRoundDetailTxt = null;
        this._curRoundDetailBg = null;
        this._curRoundName = null;
        this._chatTxt = null;
        this._changeServantBtn = null;
        this._showRewardBtn = null;
        this._detailTipTxt = null;;

        this._matchDetailNode = null;
        this._acTimeTxt = null;
        this._cdTimeTxt = null;

        this._scrollList = null;
        // this._isChangeServant = false;
        this._lmnameTxt = null;

        this._rankBtn = null;
        Api.chatVoApi.clearAcCrossChatList();
		super.dispose();
	}
}