//
class AcBattleGroundDetailsViewTab3 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _countDownText:BaseTextField = null;
	
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	// private get api() : WipeBossVoApi{
    //     return Api.wipeBossVoApi;
    // }
	
	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getListType():number
	{
		return 2;
	}

	protected initView():void
	{
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		let view = this;
		view._nodeContainer = new BaseDisplayObjectContainer();
		// this.addChild(this._nodeContainer);
		let str = '';

		let rankList = this.cfg.indivdualRank; 
		let tmpX = 20;
		let scroStartY = 5;

		for (let index = 0; index < rankList.length; index++) {
			let id = index;
			let rItem = rankList[index];
			let key =  Number(id+1);//rItem.id;


			let winBottomBg = BaseBitmap.create("rechargevie_db_01");
			winBottomBg.width = 628;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);


			let rIcons1 = GameData.getRewardItemIcons(rItem.getReward,true,true);
			let rank = rItem.idvRank
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

				winbg = BaseBitmap.create("battleground_first");
				winbg.y = scroStartY;
				winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
				this._nodeContainer.addChild(winbg);
				offY = 35;
				offH = 90;

				let firstData = this.vo.getRankFirstPlayer();

				let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(firstData.pic,this.cfg.titleID);
				playerHead.x = 50;
				playerHead.y = winbg.y + winbg.height -30;
				this._nodeContainer.addChild(playerHead);

				let playerName = ComponentManager.getTextField(firstData.name,20,TextFieldConst.COLOR_BROWN);
				playerName.x = playerHead.x + playerHead.width + 25;
				playerName.y =  winbg.y + winbg.height +5;
				this._nodeContainer.addChild(playerName);

				let playerScore = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewScore",[String(firstData.value)]),20,TextFieldConst.COLOR_BROWN);
				playerScore.x = playerName.x;
				playerScore.y =  playerName.y + playerName.height+15;
				this._nodeContainer.addChild(playerScore);

				let vipImg = BaseLoadBitmap.create("vip_icon_"+firstData.vip);
				vipImg.width = 65;
				vipImg.height = 27;
				vipImg.x = playerName.x + playerName.width + 5;
				vipImg.y = playerName.y + playerName.height/2 - vipImg.height/2;
				this._nodeContainer.addChild(vipImg);


				let serverText = null;
				if(firstData.qu > 0){
					serverText = ComponentManager.getTextField(LanguageManager.getlocal("mergeServer",[String(firstData.qu),String(firstData.zid)]),20,TextFieldConst.COLOR_WARN_GREEN);
				} else {
					// "ranserver2":"{1}服",
					serverText = ComponentManager.getTextField(LanguageManager.getlocal("ranserver2",[String(firstData.zid)]),20,TextFieldConst.COLOR_WARN_GREEN);
				}
				serverText.x = vipImg.x + vipImg.width + 100;
				serverText.y = playerName.y;//serverText.y + serverText.height/2 - serverText.height/2;
				this._nodeContainer.addChild(serverText);

			} else {
				winbg = BaseBitmap.create("public_ts_bg01");
				winbg.width = 250;
				winbg.y = scroStartY + 13 ;
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
				txt.x =  GameConfig.stageWidth/2 - txt.width/2;
				txt.y = winbg.y + winbg.height/2 - txt.height/2;
				this._nodeContainer.addChild(txt);

			}



			
			let len = rIcons1.length;
			let startY = winbg.y + winbg.height +10 + offH;
			tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
			scroStartY = startY;

			let startX = 0;
			
			for(let innerIdx = 0; innerIdx < len; innerIdx++) {
				let element = rIcons1[innerIdx];

				if(startX == 0){
					startX = GameConfig.stageWidth/2 - (element.width * 5 + 15 * 4)/2;	
				}
				element.x = startX + (innerIdx % 5) * (element.width + 15);
				element.y = startY + Math.floor(innerIdx / 5) * (element.height + 15);

			
				view._nodeContainer.addChild(element);
				scroStartY = element.y + element.height + 20;
			}
			// scroStartY += 130;
			winBottomBg.height = scroStartY - winBottomBg.y+2;//scroStartY - winBottomBg.y + 25;
		}
		
		 // 膜拜背景
        let bottomBg = BaseBitmap.create("adult_lowbg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
		bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width/2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 162;
		view.addChild(bottomBg);

		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acBattleGroundDetailsViewPlayerBtn', view.rankCLick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,2]);
		view.addChild(rankBtn);
		let rankstr = '';
		// let rankV = view.api.getMyAllPrank();
        let rankV = this.vo.getRankPlayerRank();
		if(rankV == 0){
			rankstr = LanguageManager.getlocal('atkracedes4');
		}
		else{
			rankstr = rankV.toString();
		}
		
		let txt3 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt3.text = LanguageManager.getlocal("acBattleRankPopupViewPlayerRank", [rankstr]);
		txt3.x =  bottomBg.x + 30;
		txt3.y = bottomBg.y + 15;
		this.addChild(txt3);

		let txt4 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		if(this.vo.getRankPlayerScore() == null || this.vo.getRankPlayerScore() == undefined){
			txt4.text = LanguageManager.getlocal("acBattleRankPopupViewPlayerScore", [LanguageManager.getlocal("acBattleRankPopupOut")]);
		} else {
			txt4.text = LanguageManager.getlocal("acBattleRankPopupViewPlayerScore", [String(this.vo.getRankPlayerScore())]);
		}
		if(!this.vo.getAttendQuality()){
			txt3.visible = false;
			txt4.visible = false;
		}
		
		txt4.x = txt3.x;
		txt4.y = txt3.y + txt3.height + 10;
		this.addChild(txt4);


		let vo = this.vo;
		this._countDownText = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);

		this._countDownText.x =  txt3.x;
		this._countDownText.y = txt3.y + 30;		
		this.addChild(this._countDownText);

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-5-25);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = 0;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);

		let warnText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewMail"),18,TextFieldConst.COLOR_WHITE);
		warnText.x = GameConfig.stageWidth/2 - warnText.width/2;
		warnText.y = bottomBg.y - 5 - warnText.height;
		this.addChild(warnText);

		let bottomBgFrame = BaseBitmap.create("public_9v_bg03");
		bottomBgFrame.width = 640;
		bottomBgFrame.height = GameConfig.stageHeigth - 69 - 83;
		bottomBgFrame.x = 0;
		bottomBgFrame.y = 0;
		this.addChild(bottomBgFrame); 
	}



	private rankCLick():void{
		let view = this;
		ViewController.getInstance().openView("AcBattleRankPopupView",{
			aid : view.param.data.aid,
			code : view.param.data.code,
			// curIndex:0
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

		super.dispose();
	}

}