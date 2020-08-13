//
class AcCrossServerWifeBattleRewardViewTab2 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _countDownText:BaseTextField = null;
	
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	// private get api() : CrossServerWipeBossVoApi{
    //     return Api.crossServerWipeBossVoApi;
    // }
	
	private get cfg() : Config.AcCfg.CrossServerWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		let view = this;
		view._nodeContainer = new BaseDisplayObjectContainer();
		this.addChild(this._nodeContainer);
		let str = '';

		let zidNum = this.vo.getPkzidNum();
		if(zidNum == 2){
			this.initDoubleServer(zidNum);

		} else {
			this.initMultiServer(zidNum);
		}



	}
	private initDoubleServer(zidNum){

		let rankList = this.cfg.getServerRankRewards();//this.vo.getArr('personRankReward');
		let tmpX = 20;
		let scroStartY = 8;

		for (let index = 0; index < rankList.length; index++) {
			let id = index;
			let rItem = rankList[index];
			let key =  index+1;//rItem.id;
			

			let winBottomBg = BaseBitmap.create("rechargevie_db_01");
			winBottomBg.width = 628;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);
			
		
			// let rIcons = rItem.rewardIcons;
			let rIcons:any[] = GameData.formatRewardItem(rItem.reward);

			//  GameData.getItemIcon(this._rewardArrList[count],true,true);
			let rank = rItem.rank
			let winbg = null;
			let txt = null;
			let offY = 0;
			let offH = 0;
			if(key == 1){
				let titleBg = BaseBitmap.create("public_up3");
				titleBg.width = 620;
				titleBg.height = 160;
				titleBg.x = GameConfig.stageWidth/2 - titleBg.width/2;
				titleBg.y = scroStartY+5;
				this._nodeContainer.addChild(titleBg);

				winbg = BaseBitmap.create("accrossserverwipeboss_first");
				winbg.y = scroStartY;
				winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
				this._nodeContainer.addChild(winbg);

				offY = 35;
				offH = 90;

				let firstData = this.vo.getRankFirstPlayer();

				if(firstData){
					// console.log(firstData);
					// console.log(firstData.info);
					// console.log(firstData.info.pic);
					// console.log(firstData.info.ptitle)
					let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(firstData.info?firstData.info.pic:null,firstData.info?firstData.info.ptitle:null);
					playerHead.x = 50;
					playerHead.y = winbg.y + winbg.height -30;
					this._nodeContainer.addChild(playerHead);

					let playerName = ComponentManager.getTextField(firstData.name,20,TextFieldConst.COLOR_BROWN);
					playerName.x = playerHead.x + playerHead.width + 25;
					playerName.y =  winbg.y + winbg.height +5;
					this._nodeContainer.addChild(playerName);

					let playerScore = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewScore",[String(firstData.point)]),20,TextFieldConst.COLOR_BROWN);
					playerScore.x = playerName.x;
					playerScore.y =  playerName.y + playerName.height+15;
					this._nodeContainer.addChild(playerScore);

					let serverText = null;
					if(this.vo.getQuByZid(firstData.zid) > 0){
						serverText = ComponentManager.getTextField(LanguageManager.getlocal("mergeServer",[String(this.vo.getQuByZid(firstData.zid)),String(firstData.zid)]),20,TextFieldConst.COLOR_WARN_GREEN);
					} else {
						// "ranserver2":"{1}服",
						serverText = ComponentManager.getTextField(LanguageManager.getlocal("ranserver2",[String(firstData.zid)]),20,TextFieldConst.COLOR_WARN_GREEN);
					}
					serverText.x = playerName.x + playerName.width + 150;
					serverText.y = playerName.y ;//serverText.y + serverText.height/2 - serverText.height/2;
					this._nodeContainer.addChild(serverText);

				} else {
					let noData = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNoData"),30,TextFieldConst.COLOR_BROWN);
					noData.x = GameConfig.stageWidth/2 - noData.width/2;
					noData.y = winbg.y+ 100;
					this._nodeContainer.addChild(noData);
				}



				// let vipImg = BaseLoadBitmap.create("vip_icon_"+firstData.vip);
				// vipImg.width = 65;
				// vipImg.height = 27;
				// vipImg.x = playerName.x + playerName.width + 5;
				// vipImg.y = playerName.y + playerName.height/2 - vipImg.height/2;
				// this._nodeContainer.addChild(vipImg);





			} else {
				winbg = BaseBitmap.create("public_ts_bg01");
				winbg.width = 250;
				winbg.y = scroStartY + 13;
				winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
				this._nodeContainer.addChild(winbg);

				txt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
				if (Number(key) < 4)
				{
					txt.text = LanguageManager.getlocal("acRank_rank6",[String(key)]);
				}else
				{
					if(rank[0] < rank[1]){
						txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
					}
					else{
						txt.text =LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
					}
				}
				txt.x = GameConfig.stageWidth/2 - txt.width/2;
				txt.y = winbg.y + winbg.height/2 - txt.height/2;
				this._nodeContainer.addChild(txt);

			}






			// let line1 = BaseBitmap.create("public_line3");
			// line1.width = 480;
			// line1.x = GameConfig.stageWidth/2 - line1.width/2;
			// line1.y = winbg.y + winbg.height/2 - line1.height/2;
			// this._nodeContainer.addChild(line1);
			


			
			let len = rIcons.length;
			let startY = winbg.y + winbg.height+ 10 + offH;
			tmpX = 20;
			// tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
			scroStartY = startY;

			for (let innerIdx = 0; innerIdx < len; innerIdx++) {
				// var element = rIcons[innerIdx];
				let element = GameData.getItemIcon(rIcons[innerIdx],true,false);
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				if (tmpX >= GameConfig.stageWidth)
				{
					tmpX = 20;
					scroStartY += element.height + 15;
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+ 15);
				}
				element.cacheAsBitmap = true;
				this._nodeContainer.addChild(element);
			}
			scroStartY += 130;
			winBottomBg.height = scroStartY - winBottomBg.y - 2;
		}
		
		 // 膜拜背景
        let bottomBg = BaseBitmap.create("adult_lowbg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
		bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width/2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 162;
		this.addChild(bottomBg);

		// let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab1', view.rankCLick, view);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
		// view.addChild(rankBtn);
		
		let txt3 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		let rankstr = '';
		let rankV = this.vo.getMyRank();
		if(rankV == 0){
			rankstr = LanguageManager.getlocal('atkracedes4');
		}
		else{
			rankstr = rankV.toString();
		}

		if(!this.vo.isCanJoin){
			rankstr = LanguageManager.getlocal('crossImacyNoAccess');
		}
		
		txt3.text = LanguageManager.getlocal("accrossserverwipeBossRank1", [rankstr]);
		txt3.x =  bottomBg.x + 30;
		txt3.y = bottomBg.y + 17;
		this.addChild(txt3);

		TickManager.addTick(this.tick,this);
		let vo = this.vo;
		this._countDownText = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this.tick();
		this._countDownText.x =  txt3.x;
		this._countDownText.y = txt3.y + 30;		
		this.addChild(this._countDownText);

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-3);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = -3;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);
		
		let bottomBgFrame = BaseBitmap.create("public_9v_bg03");
		bottomBgFrame.width = 640;
		bottomBgFrame.height = GameConfig.stageHeigth - 69 - 83;
		bottomBgFrame.x = 0;
		bottomBgFrame.y = 0;
		this.addChild(bottomBgFrame); 		


	}
	private initMultiServer(zidNum){
		let rankList = this.cfg.getMulServerPRankRewards(zidNum);//this.vo.getArr('personRankReward');
		let tmpX = 20;
		let scroStartY = 8;

		let rList = Object.keys(rankList);
		rList.sort( (a:string,b:string) => {
				return Number(a) - Number(b);
			}
		);

		for (let index = 0; index < rList.length; index++) {
			let id = index;
			let key = rList[index];
			let rItem = rankList[key];
			// let key =  index+1;//rItem.id;
			

			let winBottomBg = BaseBitmap.create("rechargevie_db_01");
			winBottomBg.width = 628;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);
			
			// let rIcons = rItem.rewardIcons;
			let rIcons:any[] = GameData.formatRewardItem(rItem.reward);
			let rank = rItem.rank
			let winbg = null;
			let txt = null;
			let offY = 0;
			let offH = 0;
			if(Number(key) == 1){
				let titleBg = BaseBitmap.create("public_up3");
				titleBg.width = 620;
				titleBg.height = 160;
				titleBg.x = GameConfig.stageWidth/2 - titleBg.width/2;
				titleBg.y = scroStartY+5;
				this._nodeContainer.addChild(titleBg);

				winbg = BaseBitmap.create("accrossserverwipeboss_first");
				winbg.y = scroStartY;
				winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
				this._nodeContainer.addChild(winbg);

				offY = 35;
				offH = 90;

				let firstData = this.vo.getRankFirstPlayer();

				if(firstData){
					let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(firstData.info?firstData.info.pic:null,firstData.info?firstData.info.ptitle:null);
					playerHead.x = 50;
					playerHead.y = winbg.y + winbg.height -30;
					this._nodeContainer.addChild(playerHead);

					let playerName = ComponentManager.getTextField(firstData.name,20,TextFieldConst.COLOR_BROWN);
					playerName.x = playerHead.x + playerHead.width + 25;
					playerName.y =  winbg.y + winbg.height +5;
					this._nodeContainer.addChild(playerName);

					let playerScore = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewScore",[String(firstData.point)]),20,TextFieldConst.COLOR_BROWN);
					playerScore.x = playerName.x;
					playerScore.y =  playerName.y + playerName.height+15;
					this._nodeContainer.addChild(playerScore);

					let serverText = null;
					if(this.vo.getQuByZid(firstData.zid) > 0){
						serverText = ComponentManager.getTextField(LanguageManager.getlocal("mergeServer",[String(this.vo.getQuByZid(firstData.zid)),String(firstData.zid)]),20,TextFieldConst.COLOR_WARN_GREEN);
					} else {
						// "ranserver2":"{1}服",
						serverText = ComponentManager.getTextField(LanguageManager.getlocal("ranserver2",[String(firstData.zid)]),20,TextFieldConst.COLOR_WARN_GREEN);
					}
					serverText.x = playerName.x + playerName.width + 150;
					serverText.y = playerName.y ;//serverText.y + serverText.height/2 - serverText.height/2;
					this._nodeContainer.addChild(serverText);

				} else {
					let noData = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNoData"),30,TextFieldConst.COLOR_BROWN);
					noData.x = GameConfig.stageWidth/2 - noData.width/2;
					noData.y = winbg.y+ 100;
					this._nodeContainer.addChild(noData);
				}



				// let vipImg = BaseLoadBitmap.create("vip_icon_"+firstData.vip);
				// vipImg.width = 65;
				// vipImg.height = 27;
				// vipImg.x = playerName.x + playerName.width + 5;
				// vipImg.y = playerName.y + playerName.height/2 - vipImg.height/2;
				// this._nodeContainer.addChild(vipImg);





			} else {
				winbg = BaseBitmap.create("public_ts_bg01");
				winbg.width = 250;
				winbg.y = scroStartY + 13;
				winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
				this._nodeContainer.addChild(winbg);

				txt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
				if (Number(key) < 4)
				{
					txt.text = LanguageManager.getlocal("acRank_rank6",[String(key)]);
				}else
				{
					if(rank[0] < rank[1]){
						txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
					}
					else{
						txt.text =LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
					}
				}
				txt.x = GameConfig.stageWidth/2 - txt.width/2;
				txt.y = winbg.y + winbg.height/2 - txt.height/2;
				this._nodeContainer.addChild(txt);

			}






			// let line1 = BaseBitmap.create("public_line3");
			// line1.width = 480;
			// line1.x = GameConfig.stageWidth/2 - line1.width/2;
			// line1.y = winbg.y + winbg.height/2 - line1.height/2;
			// this._nodeContainer.addChild(line1);
			


			
			let len = rIcons.length;
			let startY = winbg.y + winbg.height+ 10 + offH;
			tmpX = 20;
			// tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
			scroStartY = startY;

			for (let innerIdx = 0; innerIdx < len; innerIdx++) {
				// var element = rIcons[innerIdx];
				let element = GameData.getItemIcon(rIcons[innerIdx],true,false);
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				if (tmpX >= GameConfig.stageWidth)
				{
					tmpX = 20;
					scroStartY += element.height + 15;
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+ 15);
				}
				element.cacheAsBitmap = true;
				this._nodeContainer.addChild(element);
			}
			scroStartY += 130;
			winBottomBg.height = scroStartY - winBottomBg.y - 2;
		}
		
		 // 膜拜背景
        let bottomBg = BaseBitmap.create("adult_lowbg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
		bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width/2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 162;
		this.addChild(bottomBg);

		// let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab1', view.rankCLick, view);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
		// view.addChild(rankBtn);
		
		let txt3 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		let rankstr = '';
		let rankV = this.vo.getMyRank();
		if(rankV == 0){
			rankstr = LanguageManager.getlocal('atkracedes4');
		}
		else{
			rankstr = rankV.toString();
		}

		if(!this.vo.isCanJoin){
			rankstr = LanguageManager.getlocal('crossImacyNoAccess');
		}
		
		txt3.text = LanguageManager.getlocal("accrossserverwipeBossRank1", [rankstr]);
		txt3.x =  bottomBg.x + 30;
		txt3.y = bottomBg.y + 17;
		this.addChild(txt3);

		TickManager.addTick(this.tick,this);
		let vo = this.vo;
		this._countDownText = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this.tick();
		this._countDownText.x =  txt3.x;
		this._countDownText.y = txt3.y + 30;		
		this.addChild(this._countDownText);

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-3);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = -3;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);
		
		let bottomBgFrame = BaseBitmap.create("public_9v_bg03");
		bottomBgFrame.width = 640;
		bottomBgFrame.height = GameConfig.stageHeigth - 69 - 83;
		bottomBgFrame.x = 0;
		bottomBgFrame.y = 0;
		this.addChild(bottomBgFrame); 

	}
	public tick():void{	
		if (this._countDownText)
		{
			let countDownTime = this.vo.getCountDownTime();
			if(countDownTime > 0) {
				this._countDownText.text = LanguageManager.getlocal(`accrossserverwipeBoss_acCD`, [App.DateUtil.getFormatBySecond(countDownTime)]);
			}
			else{
				this._countDownText.text = LanguageManager.getlocal("acPunishEnd");
			}
		}
	}

	private rankCLick():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIPEBOSSRANKIEW,{
			aid : view.param.data.aid,
			code : view.param.data.code,
			index:0
		});
	}

	private getCountTimeStr(time:number):string
	{	
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	public dispose():void
	{
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		this._nodeContainer = null;
		this._countDownText = null;
		TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}