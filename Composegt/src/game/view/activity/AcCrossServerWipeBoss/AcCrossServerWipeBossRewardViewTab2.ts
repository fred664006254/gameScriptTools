//
class AcCrossServerWipeBossRewardViewTab2 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _countDownText:BaseTextField = null;
	
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	private get api() : CrossServerWipeBossVoApi{
        return Api.crossServerWipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerWipeBossVo{
        return <AcCrossServerWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
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

		let rankList = view.vo.getArr('serverRankReward');
		let tmpX = 20;
		let scroStartY = 8;

		let zidNum = this.api.getPkzidNum();
		

		for (let index = 0; index < rankList.length; index++) {
			let id = index;
			let rItem = rankList[index];
			let key =  rItem.id;

			if(rItem.minRank > zidNum){
				break;
			}
			if(rItem.minRank <= zidNum && rItem.maxRank > zidNum){
				rItem.maxRank = zidNum;
			}

			let winBottomBg = BaseBitmap.create("rechargevie_db_01");
			winBottomBg.width = 628;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);


			let offH = 0;
			let winbg = null;
			let rIcons = rItem.rewardIcons;
			if(key == 1){
				let titleBg = BaseBitmap.create("public_up3");
				titleBg.width = 620;
				titleBg.height = 110;
				titleBg.x = GameConfig.stageWidth/2 - titleBg.width/2;
				titleBg.y = scroStartY+15;
				this._nodeContainer.addChild(titleBg);

				winbg = BaseBitmap.create("accrossserverwipeboss_rankbg");
				winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
				winbg.y = titleBg.y +25;
				this._nodeContainer.addChild(winbg);

				let red1 = BaseBitmap.create("accrossserverwipeboss_rank1");
				red1.x = winbg.x - red1.width/2;
				red1.y = winbg.y + winbg.height/2 - red1.height/2;
				this._nodeContainer.addChild(red1);
				
				let server = this.api.getFirstServerName();
				let serverTxt = ComponentManager.getTextField(server,24,TextFieldConst.COLOR_LIGHT_YELLOW);
				serverTxt.x = winbg.x + winbg.width/2 - serverTxt.width/2;
				serverTxt.y = winbg.y + winbg.height/2 - serverTxt.height/2;
				this._nodeContainer.addChild(serverTxt);
				offH = 45;
			} else {
				winbg = BaseBitmap.create("public_ts_bg01");
				winbg.width = 250;
				winbg.y = scroStartY + 13;
				winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
				this._nodeContainer.addChild(winbg);


				
				// let rank = rItem.rank
				let txt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
				if (Number(key) < 4)
				{
					txt.text = LanguageManager.getlocal("acRank_rank6",[key]);
				}else
				{
					// if(rank[0] < rank[1]){
					// 	txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
					// }
					// else{
					// 	txt.text =LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
					// }
					if(rItem.minRank < rItem.maxRank){
						txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rItem.minRank),String(rItem.maxRank)]);
					}
					else{
						txt.text =LanguageManager.getlocal("acRank_rank6", [rItem.minRank.toString()]);
					}
				}
				txt.x =  GameConfig.stageWidth/2 - txt.width/2;
				txt.y = winbg.y + winbg.height/2 - txt.height/2;
				this._nodeContainer.addChild(txt);
			}



			



			// let descbg = BaseBitmap.create('accrossserverwipeboss_namebg');
			// descbg.width = 250;
			// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, winbg, [0,winbg.height + 10]);
			// view._nodeContainer.addChild(descbg);

			// let alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_masterget1'),22,TextFieldConst.COLOR_LIGHT_YELLOW);
			// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, alltxt, descbg);
			// view._nodeContainer.addChild(alltxt);
			
			let len = rIcons.length;
			let startY = winbg.y + winbg.height+ 10 + offH;
			// tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
			tmpX = 20;
			scroStartY = startY;
			for(let innerIdx = 0; innerIdx < len; innerIdx++) {
				let element = rIcons[innerIdx];
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				if (tmpX >= GameConfig.stageWidth)
				{
					// tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
					// scroStartY += element.height + 15;
					// element.x = tmpX;
					// element.y = scroStartY;
					// tmpX +=  (element.width+15);
					tmpX = 20;
					scroStartY += element.height + 15;
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+ 15);
				}
				view._nodeContainer.addChild(element);
			}

			// let orddescbg = BaseBitmap.create('accrossserverwipeboss_namebg');
			// orddescbg.width = 250;
			// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, orddescbg, winbg, [0,winbg.height + 10]);
			// view._nodeContainer.addChild(orddescbg);
			// orddescbg.y = scroStartY + 106 + 15;

			// let ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_memberget'),22,TextFieldConst.COLOR_LIGHT_YELLOW);
			// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ordtxt, orddescbg);
			// view._nodeContainer.addChild(ordtxt);

			
		
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
		view.addChild(bottomBg);

		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acCrossServerWipeBoss_rankTabTitle2', view.rankCLick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
		view.addChild(rankBtn);
		let rankstr = '';
		let rankV = view.api.getMyServerRank();
		if(rankV == 0){
			rankstr = LanguageManager.getlocal('atkracedes4');
		}
		else{
			rankstr = rankV.toString();
		}
		
		let txt3 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt3.text = LanguageManager.getlocal("accrossserverwipeBossRank2", [rankstr]);
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

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-5);
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
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIPEBOSSRANKIEWTAB2,{
			aid : view.param.data.aid,
			code : view.param.data.code,
			index:1,
			
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