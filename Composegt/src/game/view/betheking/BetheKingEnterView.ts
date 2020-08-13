class BetheKingEnterView extends CommonView
{
	private _cdtxt:BaseTextField;
	private _myVoteTxt:BaseTextField;
	private _aid:string;
	private _code:string;
	private _acVo:AcBeTheKingVo;
	private _nodeContainer:BaseDisplayObjectContainer;
	private _scrollView:ScrollList;
	private _zidgroup: boolean = false;//是否跨服
	//排行数据
    private _ranks: {uid: number, name: string, cheer_num: number, "zid": number,"v": number}[] = [];
    private _roleNode1:BetheKingRankRoleNode;
	private _roleNode2:BetheKingRankRoleNode;
	private _roleNode3:BetheKingRankRoleNode;
	private _officerTxt:BaseTextField;
	private _rankTxt:BaseTextField;
	private _powerAddTxt:BaseTextField;
	private _powerTxt:BaseTextField;
	private _getKingBtn:BaseButton;
	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"betheking_bg","adult_lowbg","rank_biao","rank_1","rank_2","rank_3","betheking_rolebg_king","betheking_rolebg",
			"betheking_rolebg_king_ani","palace_role_empty", "betheking_getking_icon","betheking_getking_txt",
		]);
	}

	// private get cfg() : Config.AcCfg.BeTheKingCfg{
    //     return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    // }

	public initView():void
	{		
		this._aid = this.param.data.aid;
		this._code = this.param.data.code;
		this._acVo = <AcBeTheKingVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_VOTE,this.voteCallBackHandler,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_EXCHANGE,this.voteCallBackHandler,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_TASK,this.voteCallBackHandler,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_KINGINFO,this.receiveDatas,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this._nodeContainer.y = -10;
		this.addChildToContainer(this._nodeContainer);

        let bg = BaseLoadBitmap.create("betheking_bg");
        bg.width = 640;
        bg.height = 1136;
		bg.y = GameConfig.stageHeigth - this.container.y - bg.height;
		// bg.y = - this.container.y;
        this._nodeContainer.addChild(bg);

        let cdbg = BaseBitmap.create("public_lockbg");
		cdbg.width = 460;
        cdbg.x = GameConfig.stageWidth/2 - cdbg.width/2 ;
        cdbg.y = -5;
        this._nodeContainer.addChild(cdbg);

        this._cdtxt = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryTitleTime_7",[this._acVo.getBattleTimeStr()]),18,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._cdtxt.y = cdbg.y + cdbg.height/2 - this._cdtxt.height/2;
		this._cdtxt.x = cdbg.x + cdbg.width/2;
		this._cdtxt.anchorOffsetX = this._cdtxt.width/2;
		this._nodeContainer.addChild(this._cdtxt);

		let cheerbg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
		cheerbg.x = GameConfig.stageWidth - cheerbg.width - 15;
		cheerbg.y = 10;
		this.addChildToContainer(cheerbg);

		let cheerBtn = ComponentManager.getButton("betheking_cheerIcon","",this.cheerHandler,this);
		cheerBtn.x = cheerbg.x  + cheerbg.width/2 -  cheerBtn.width/2 ;
		cheerBtn.y = cheerbg.y  + cheerbg.height/2 -  cheerBtn.height/2 ;
		this.addChildToContainer(cheerBtn);

		let cheerTxtImg = BaseBitmap.create("betheking_cheerIcon_txt");
        cheerTxtImg.x = cheerBtn.x + cheerBtn.width/2 -  cheerTxtImg.width/2 ;
        cheerTxtImg.y = cheerBtn.y + cheerBtn.height - cheerTxtImg.height;
        this.addChildToContainer(cheerTxtImg);

		let rewardbg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
		rewardbg.x =  cheerbg.x ;
		rewardbg.y = cheerbg.y + cheerbg.height + 15;
		this.addChildToContainer(rewardbg);

		let reeardBtn = ComponentManager.getButton("betheking_rewardIcon","",this.rewardHandler,this);
		reeardBtn.x = rewardbg.x  + rewardbg.width/2 -  reeardBtn.width/2 ;
		reeardBtn.y = rewardbg.y  + rewardbg.height/2 -  reeardBtn.height/2 ;
		this.addChildToContainer(reeardBtn);

		let rewardTxtImg = BaseBitmap.create("betheking_rewardIcon_txt");
        rewardTxtImg.x = reeardBtn.x + reeardBtn.width/2 -  rewardTxtImg.width/2 ;
        rewardTxtImg.y = reeardBtn.y + reeardBtn.height - rewardTxtImg.height;
        this.addChildToContainer(rewardTxtImg);

		let getKingbg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
		getKingbg.x = cheerbg.x ;
		getKingbg.y = rewardbg.y + rewardbg.height + 15;
		this.addChildToContainer(getKingbg);

		let getKingBtn = ComponentManager.getButton("betheking_getking_icon","",this.getKingHandler,this);
		getKingBtn.x = rewardbg.x  + rewardbg.width/2 -  getKingBtn.width/2 ;
		getKingBtn.y = getKingbg.y  + getKingbg.height/2 -  getKingBtn.height/2 ;
		this.addChildToContainer(getKingBtn);
		this._getKingBtn = getKingBtn;

		let getKingTxtImg = BaseBitmap.create("betheking_getking_txt");
        getKingTxtImg.x = getKingBtn.x + getKingBtn.width/2 -  getKingTxtImg.width/2 ;
        getKingTxtImg.y = getKingBtn.y + getKingBtn.height - getKingTxtImg.height;
        this.addChildToContainer(getKingTxtImg);

		let buttombg = BaseBitmap.create("adult_lowbg");
		buttombg.y = GameConfig.stageHeigth - this.container.y - buttombg.height-10;
		buttombg.x = this.width/2 - buttombg.width/2;
		this.addChildToContainer(buttombg);

		this._myVoteTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._myVoteTxt.text = LanguageManager.getlocal("betheking_my_popularity",["" + this._acVo.cnum])
		this._myVoteTxt.y = buttombg.y + buttombg.height/2 - this._myVoteTxt.height/2;
		this._myVoteTxt.x = buttombg.x + 30;
		this.addChildToContainer(this._myVoteTxt);

		let voteBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"betheking_votebtntxt",this.voteHandler,this);
		voteBtn.x = GameConfig.stageWidth - voteBtn.width - 20;
		voteBtn.y = buttombg.y + buttombg.height/2 - voteBtn.height/2;
		this.addChildToContainer(voteBtn);

		let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"betheking_exbtntxt",this.exchangeHandler,this);
		exchangeBtn.x = voteBtn.x  - voteBtn.width - 20;
		exchangeBtn.y = voteBtn.y;
		this.addChildToContainer(exchangeBtn);

		let bottomBorder = BaseBitmap.create("public_9v_bg03");
		bottomBorder.width = GameConfig.stageWidth;
		bottomBorder.height = 445;//GameConfig.stageHeigth -this.container.y - 500;
		bottomBorder.x = 0;
		bottomBorder.y = GameConfig.stageHeigth - this.container.y - bottomBorder.height;// -10;
		this.addChildToContainer(bottomBorder);

		let lineSp = BaseBitmap.create("public_line");
		lineSp.width = GameConfig.stageWidth;
		lineSp.x = 0;
		lineSp.y = bottomBorder.y - 5;
		this.addChildToContainer(lineSp);

		let rbg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		rbg.width = 620;
		rbg.height = bottomBorder.height - buttombg.height - 30;
		rbg.x = GameConfig.stageWidth/2 - rbg.width/2;
		rbg.y = bottomBorder.y + 15;
		this.addChildToContainer(rbg);

		let rbg2:BaseBitmap = BaseBitmap.create("public_left2");
		rbg2.width = rbg.width -10;
		rbg2.height = 70;
		rbg2.x = GameConfig.stageWidth/2 - rbg2.width/2;
		rbg2.y = rbg.y + rbg.height-5 -rbg2.height ;
		this.addChildToContainer(rbg2);

		 //标头
        let titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = rbg.width - 20;
        titleBg.x = GameConfig.stageWidth/2 - titleBg.width/2;
        titleBg.y = rbg.y + 10;
		this.addChildToContainer(titleBg);

		 //标头信息
        let  title_rankTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_rankTxt.text = LanguageManager.getlocal("rankorder");
        title_rankTxt.x =  titleBg.x +40; 
        title_rankTxt.y =   titleBg.y  + titleBg.height/2 -title_rankTxt.height/2+2 ;
        this.addChildToContainer(title_rankTxt);

        let title_nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_nameTxt.text = LanguageManager.getlocal("ranknickName");
        title_nameTxt.x = title_rankTxt.x + 160 - title_nameTxt.width/2;
        title_nameTxt.y = title_rankTxt.y
        this.addChildToContainer(title_nameTxt);

        let title_officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_officerTxt.text = LanguageManager.getlocal("betheking_popularity");
        title_officerTxt.x = title_rankTxt.x + 350 - title_officerTxt.width/2;
        title_officerTxt.y = title_rankTxt.y;
        this.addChildToContainer(title_officerTxt);

        let title_powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_powerTxt.text = LanguageManager.getlocal("betheking_kingpower");
        title_powerTxt.x = title_rankTxt.x + 480 - title_powerTxt.width/2;
        title_powerTxt.y = title_rankTxt.y;
        this.addChildToContainer(title_powerTxt);


		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,rbg.height- 100 - titleBg.height);
		BetheKingRankScrollItem._ACVO = this._acVo;
		let scrollView = ComponentManager.getScrollList(BetheKingRankScrollItem,[],rect);
		this._scrollView = scrollView;
		this._scrollView.refreshData(this._ranks);
		scrollView.x = 0;
		scrollView.y = titleBg.y + titleBg.height + 6;
		this.addChildToContainer(scrollView);
		

		let roleNode1 = new BetheKingRankRoleNode();
		// roleNode1.init(0,this._ranks[0]);
		roleNode1.x = GameConfig.stageWidth/2 - 312/2 + 20;
		roleNode1.y = bottomBorder.y - 360 ;//185;//GameConfig.stageHeigth/2 - roleNode1.height/2 - 200;
		this.addChildToContainer(roleNode1);
		
		let roleNode2 = new BetheKingRankRoleNode();
		// roleNode2.init(1,this._ranks[1]);
		roleNode2.x = -30;
		roleNode2.y = roleNode1.y + 120;
		this.addChildToContainer(roleNode2);

		let roleNode3 = new BetheKingRankRoleNode();
		// roleNode3.init(2,this._ranks[2]);
		roleNode3.x = GameConfig.stageWidth - 312 - roleNode2.x;
		roleNode3.y = roleNode2.y + 20;
		this.addChildToContainer(roleNode3);
		this._roleNode1 = roleNode1;
		this._roleNode2 = roleNode2;
		this._roleNode3 = roleNode3;

		if(this._acVo.buff == 0){
			let noGemTipTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
			noGemTipTxt.text = LanguageManager.getlocal("betheKing_enter_tip3");
			noGemTipTxt.x =  rbg2.x + rbg2.width/2 - noGemTipTxt.width/2 ; 
			noGemTipTxt.y =  rbg2.y  + rbg2.height/2 -noGemTipTxt.height/2 ;
			noGemTipTxt.lineSpacing = 5;
			noGemTipTxt.textAlign = egret.HorizontalAlign.CENTER;
			this.addChildToContainer(noGemTipTxt);
		}
		
		//底部个人排行信息
		let powerTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		powerTxt.text = LanguageManager.getlocal("betheking_mypower",[""+this._acVo.kingPower]);
		powerTxt.x =  rbg2.x + 30 ; 
		powerTxt.y =  rbg2.y  + 15;
		this.addChildToContainer(powerTxt);
		this._powerTxt = powerTxt;

		let rankTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		if(this._acVo.merank && this._acVo.merank >= 999999){
			rankTxt.text = LanguageManager.getlocal("acRank_myrank1",["10000+"]);
		}else{
			rankTxt.text = LanguageManager.getlocal("acRank_myrank1",[""+this._acVo.merank]);//+this._acVo.merank
		}
		
		rankTxt.x = powerTxt.x;
		rankTxt.y = powerTxt.y + 30;
		this.addChildToContainer(rankTxt);
		this._rankTxt = rankTxt;

		let powerAddTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		powerAddTxt.text = LanguageManager.getlocal("bethekingViewPlus",[""+this._acVo.getPowerAddValue()]) ; 
		powerAddTxt.x = powerTxt.x + 340;
		powerAddTxt.y = rankTxt.y;
		this.addChildToContainer(powerAddTxt);
		this._powerAddTxt = powerAddTxt;
		this._powerTxt.visible = this._powerAddTxt.visible =  this._rankTxt.visible = this._acVo.buff > 0;

		this.refreshRankList();
		this.tick();
	}	
	
	private refreshRankList()
	{
		this._ranks = this._acVo.getRankInfos();
		this._scrollView.refreshData(this._ranks );
		this._roleNode1.refreshUI(0,this._ranks[0]);
		this._roleNode2.refreshUI(1,this._ranks[1]);
		this._roleNode3.refreshUI(2,this._ranks[2]);

		if(this._acVo.merank && this._acVo.merank >= 999999){
			this._rankTxt.text = LanguageManager.getlocal("acRank_myrank1",["10000+"]);
		}else{
			this._rankTxt.text = LanguageManager.getlocal("acRank_myrank1",[""+this._acVo.merank]);//+this._acVo.merank
		}
		for (var index = 0; index < this._ranks.length; index++) {
			var element = this._ranks[index];
			if(element.uid == Api.playerVoApi.getPlayerID()){
				// this._rankTxt.text = LanguageManager.getlocal("acRank_myrank1",[""+(index+1)]);
				// this._officerTxt.text = LanguageManager.getlocal("betheking_inrank_case",[""+element.cheer_num]) ;
				break;
			}
		}
		this._powerAddTxt.text = LanguageManager.getlocal("bethekingViewPlus",[""+this._acVo.getPowerAddValue()]) ;
		this._powerTxt.text = LanguageManager.getlocal("betheking_mypower",[""+this._acVo.kingPower]);
		this._powerTxt.visible = this._powerAddTxt.visible =  this._rankTxt.visible = this._acVo.buff > 0;
	}

	private cheerHandler()
	{
		// NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:2, kid:"bethekingAc"});
		ViewController.getInstance().openView(ViewConst.POPUP.BETHEKINGTASKPOPUPVIEW,{aid:this._aid,code:this._code});
	}

	private exchangeHandler()
	{
		// NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:4, kid:"bethekingAc"});
		ViewController.getInstance().openView(ViewConst.POPUP.BETHEKINGEXPOPUPVIEW,{aid:this._aid,code:this._code});
	}

	private rewardHandler()
	{
		// NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:3, kid:"bethekingAc"});
		ViewController.getInstance().openView(ViewConst.COMMON.BETHEKINGREWARDVIEW,{aid:this._aid,code:this._code});
	}

	private voteHandler()
	{
		// NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:5, kid:"bethekingAc"});
		if(!this._acVo.isStart){
			App.CommonUtil.showTip( LanguageManager.getlocal("acPunishEnd") );
            return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.BETHEKINGVOTEPOPUPVIEW,{aid:this._aid,code:this._code});
	}
	private getKingHandler()
	{
		// NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:5, kid:"bethekingAc"});
		if(!this._acVo.isStart){
			App.CommonUtil.showTip( LanguageManager.getlocal("acPunishEnd") );
            return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.BETHEKINGGETKINGPOPUPVIEW,{aid:this._aid,code:this._code});
	}

	protected receiveDatas(event:egret.Event):void
    {
		let data:{ret:boolean,data:any}=event.data;
		let rData = data.data;
        if(rData.ret == 0)
        {
			let cmd = rData.cmd;
			if(cmd == NetRequestConst.REQUEST_KINGS_KINGINFO){
				let rdata = rData.data;
				this._zidgroup = rdata.zidgroup;
				this._ranks = rdata.ranks;
				this._acVo.setRankInfos(this._ranks);
				this._acVo.zidgroup = rdata.zidgroup;
				this._acVo.mepoint = rdata.mepoint;
				this._acVo.merank = rdata.merank;

				if(this._powerTxt){
					this.refreshRankList();
				}
			}
        }
    }


	public tick()
	{
		if(!this._acVo.isDuringPreview() && ( this._acVo.et - GameData.serverTime -86400 >= 0) ){
			let str_ = App.DateUtil.getFormatBySecond(this._acVo.et - GameData.serverTime -86400  ,8);
            this._cdtxt.text = LanguageManager.getlocal("acLotteryTitleTime_7",[str_]);
        }else{
            this._cdtxt.text = LanguageManager.getlocal("acPunishEnd");
        }
		// let convStatus = this._acVo.getConvertStatus();
		// if(convStatus == 1){
		// 	App.CommonUtil.addIconToBDOC(this._getKingBtn);
		// }else{
		// 	App.CommonUtil.removeIconFromBDOC(this._getKingBtn);
		// }
		this._cdtxt.anchorOffsetX = this._cdtxt.width/2;
	}

	protected getTitleStr():string
	{
		return "bethekingViewTitle";
	}

	protected voteCallBackHandler(event:egret.Event):void
	{
        let data:{ret:boolean,data:any}=event.data;
		let ret = data.data.ret;
		if(ret == 0 )
		{
			this._myVoteTxt.text = LanguageManager.getlocal("betheking_my_popularity",["" + this._acVo.cnum]);
		}
	}

	protected getRuleInfo():string
	{
		return "betheKingRuleInfo";
	}

	public dispose():void
	{	
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_VOTE,this.voteCallBackHandler,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_EXCHANGE,this.voteCallBackHandler,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_TASK,this.voteCallBackHandler,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_KINGINFO,this.receiveDatas,this);

		this._cdtxt = null;
		this._myVoteTxt = null;
		this._aid = null;
		this._code = null;
		this._zidgroup = null;
		this._ranks = null;
		this._scrollView = null;
		this._officerTxt = null;	
		this._rankTxt = null;
		this._powerTxt = null;
		this._powerAddTxt = null;
		this._roleNode1 = null;
		this._roleNode2 = null;
		this._roleNode3 = null;
		this._getKingBtn = null;

		super.dispose();
	}
}