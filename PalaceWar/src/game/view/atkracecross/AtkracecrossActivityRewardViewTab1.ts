class AtkracecrossActivityRewardViewTab1 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _collectBtn:BaseButton;
	private _collectFlag:BaseBitmap;
	private _countDownTime:number = 0;
	private _countDownText:BaseTextField = null;
	
	public constructor() 
	{
		super();
		this.initView();
	}

	private get api() : AtkracecrossVoApi{
        return  Api.atkracecrossVoApi;
    }

	private get cfg() : Config.AcCfg.CrossServerAtkRaceCfg{
		let acode:number =  Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code;
        return  Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", acode);
    }

	protected getListType():number
	{
		return 1;
	}
	protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACEG_WINZIDREWARD),this.collectHandlerCallBack,this);
		this._nodeContainer = new BaseDisplayObjectContainer();
		// this.addChild(this._nodeContainer);

		let winBottomBg = BaseBitmap.create("public_9_bg23");
		winBottomBg.width = 628;
		winBottomBg.y =3;
		winBottomBg.x = 6;
		this._nodeContainer.addChild(winBottomBg);

		let winbg = BaseBitmap.create("atkracecross_rewatdbg1");
		winbg.y =winBottomBg.y;
		winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
		this._nodeContainer.addChild(winbg);

		let line1 =  BaseBitmap.create("public_line3");
		line1.width = 480;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = winbg.y + winbg.height/2 - line1.height/2;
		this._nodeContainer.addChild(line1);
		
		let txt1 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt1"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt1.x =  GameConfig.stageWidth/2 - txt1.width/2;;
		txt1.y = winbg.y + winbg.height/2 - txt1.height/2;
		this._nodeContainer.addChild(txt1);

		let cfg = this.cfg;
		let zrankinfo = this.api.zonerankinfos;
		let str = '';
		if(zrankinfo.length == 2){
			let txt1 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt1"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
			txt1.x =  GameConfig.stageWidth/2 - txt1.width/2;;
			txt1.y = winbg.y + winbg.height/2 - txt1.height/2;
			this._nodeContainer.addChild(txt1);

			let cfg = this.cfg;
			let winItemArr = cfg.getWinServerRewards();

			let tmpX = winBottomBg.x + 15;
			let scroStartY = winbg.y + winbg.height + 5;
			for (var index = 0; index < winItemArr.length; index++) {
				var element = winItemArr[index];
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				//换行处理
				if (tmpX-5 >= winBottomBg.x + winBottomBg.width)
				{
					tmpX = winBottomBg.x + 15;
					scroStartY += element.height + 10;
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+15);
				}
				this._nodeContainer.addChild(element);
			}
			scroStartY += 120;
			winBottomBg.height = scroStartY;
			scroStartY += 20;

			/**
			 * 奖励物资
			 */


			let failBottomBg = BaseBitmap.create("public_9_bg23");
			failBottomBg.width = winBottomBg.width;
			failBottomBg.y =scroStartY ;
			failBottomBg.x = winBottomBg.x;
			this._nodeContainer.addChild(failBottomBg);

			let failbg = BaseBitmap.create("atkracecross_rewatdbg1");
			failbg.y = failBottomBg.y;
			failbg.x = winbg.x;
			this._nodeContainer.addChild(failbg);

			let line2 =  BaseBitmap.create("public_line3");
			line2.width = line1.width;
			line2.x = line1.x;
			line2.y = failbg.y + failbg.height/2 - line2.height/2;
			this._nodeContainer.addChild(line2);

			let txt2 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt2"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
			txt2.x =  GameConfig.stageWidth/2 - txt2.width/2;
			txt2.y = failbg.y + failbg.height/2 - txt2.height/2;
			this._nodeContainer.addChild(txt2);

			let lossItemArr = cfg.getLossServerRewards() ;

			tmpX = winBottomBg.x + 15;
			scroStartY = failbg.y + failbg.height + 5;
			for (var index = 0; index < lossItemArr.length; index++) {
				var element = lossItemArr[index];
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				//换行处理
				if (tmpX-5 >= winBottomBg.x + winBottomBg.width)
				{
					tmpX = winBottomBg.x + 15;
					scroStartY += element.height + 10;
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+15);
				}
				this._nodeContainer.addChild(element);
			}
			scroStartY += 120;
			failBottomBg.height = scroStartY - failBottomBg.y;
			// scroStartY += 15;
		}
		else{
			let rankList = this.cfg.getMulServerRewards(zrankinfo.length);
			let rList = Object.keys(rankList);
			rList.sort( (a:string,b:string) => {
					return Number(a) - Number(b);
				}
			);

			let tmpX = 20;
			let scroStartY = 3;

			for (var index = 0; index < rList.length; index++) {
				
				let id = index;
				let key = rList[index];
				let rItem = rankList[key];

				let winBottomBg = BaseBitmap.create("public_9_bg23");
				winBottomBg.width = 628;
				winBottomBg.y =scroStartY;
				winBottomBg.x = 6;
				this._nodeContainer.addChild(winBottomBg);

				let winbg = BaseBitmap.create("atkracecross_rewatdbg3");
				winbg.y = scroStartY;
				winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
				this._nodeContainer.addChild(winbg);

				let line1 =  BaseBitmap.create("public_line3");
				line1.width = 480;
				line1.x = GameConfig.stageWidth/2 - line1.width/2;
				line1.y = winbg.y + winbg.height/2 - line1.height/2;
				this._nodeContainer.addChild(line1);
				
				let rewardStr = rItem.reward;
				let rank = rItem.rank

				let txt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
				
				if (Number(key) < 4)
				{
					txt.text =LanguageManager.getlocal("acRank_rank6",[key]);
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
						
				let rIcons = GameData.getRewardItemIcons(rewardStr,true,true);
				let len = rIcons.length;
				let startY = winbg.y +winbg.height+ 5;
				tmpX = 20;
				scroStartY = startY;
				for (let innerIdx = 0; innerIdx < len; innerIdx++) {
					var element = rIcons[innerIdx];
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+15);
					if (tmpX >= GameConfig.stageWidth)
					{
						tmpX = 20;
						scroStartY += element.height + 15;
						element.x = tmpX;
						element.y = scroStartY;
						tmpX +=  (element.width+8);
					}
					this._nodeContainer.addChild(element);
				}
				scroStartY += 130;
				winBottomBg.height = scroStartY -winBottomBg.y;
				scroStartY += 10;
			}
		}

		let crossVo:AcCrossServerAtkRaceVo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");

		let bottomRes = crossVo.checkIsFengyun() ? "arena_bottom" : "wifeview_bottombg";
		 // 膜拜背景
        let bottomBg = BaseBitmap.create(bottomRes);
        // bottomBg.width = 628
        bottomBg.height = 98;
        // bottomBg.x = 6;
        bottomBg.y = GameConfig.stageHeigth -bottomBg.height-150;
		this.addChild(bottomBg);

		let txt3 = ComponentManager.getTextField("",20);
		if(this.api.zonerankinfos.length == 2){
			if (AtkracecrossActivityRewardView._iszonewin == 1){
				txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt3");
			}else{
				txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt4");
			}
		}
		else{
			let rankOrder = 1;
			for(let i in this.api.zonerankinfos){
				let unit = this.api.zonerankinfos[i];
				if(Api.mergeServerVoApi.judgeIsSameServer(unit.zid, Api.mergeServerVoApi.getTrueZid())){
					rankOrder = Number(i) + 1;
					break;
				}
			}
			txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt7", [rankOrder.toString()]);
		}
		
		txt3.x =  bottomBg.x + 30;
		txt3.y = bottomBg.y + 25;
		this.addChild(txt3);

		TickManager.addTick(this.tick,this);
		let vo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		this._countDownTime = vo.et - GameData.serverTime
		this._countDownText = ComponentManager.getTextField("",20);
		this.tick();
		this._countDownText.x =  txt3.x;
		this._countDownText.y = txt3.y + 35;		
		this.addChild(this._countDownText);

		// let vo =  Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
        this._collectBtn.x = bottomBg.x + bottomBg.width - 150;
        this._collectBtn.y = bottomBg.y + bottomBg.height/2 - this._collectBtn.height/2;
        this._collectBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._collectBtn.setEnable(false);
		this.addChild(this._collectBtn);

		if(crossVo.getZonereward() == 1)
		{
			this._collectBtn.visible = false;
			this.createCollectFlag();
			this._collectFlag.setScale(0.75);
		}else{
			if(GameData.serverTime >= vo.st && GameData.serverTime <= vo.et &&  GameData.serverTime + 86400 > vo.et )
			{
				this._collectBtn.setEnable(true);
			}else{
				txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt6");
			}
		}
		

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-5);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = 3;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);

	}

	protected collectHandler()
    {
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		NetManager.request(NetRequestConst.REQUEST_ATKRACEG_WINZIDREWARD,{activeId:"crossServerAtkRace-" + crossVo.code});
	}
	
	protected collectHandlerCallBack(event:egret.Event)
    {
		let rdata = event.data.data
        if(rdata.ret != 0)
        {
            return;
        }
		this._collectBtn.visible = false;
        let rewards = rdata.data.rewards ;
        let rewardList =  GameData.formatRewardItem(rewards);
		// let pos = this._collectBtn.localToGlobal(this._collectBtn.width/2,this._collectBtn.height/2)
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
		App.CommonUtil.playRewardFlyAction(rewardList);

		this.createCollectFlag();
		this._collectFlag.setScale(1.0);
		this._collectFlag.visible = false;
		this._collectFlag.setScale(1.3);
		this._collectFlag.visible = true;
		egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:0.75,scaleY:0.75},300);
		this.tick();
       
    }
	public tick():void
	{	
		let vo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		if(this._collectBtn){
			if(vo.showZonerward()){
				App.CommonUtil.addIconToBDOC(this._collectBtn);
			}
			else{
				App.CommonUtil.removeIconFromBDOC(this._collectBtn);
			}
			
		}
		if (this._countDownText )
		{
			if(this._countDownTime >= 86400) {
				this._countDownText.text =LanguageManager.getlocal("atkracecrossCDTime2") + this.getCountTimeStr(this._countDownTime - 86400) ;
			}else if (this._countDownTime < 86400 && this._countDownTime >= 0){
				this._countDownText.text =LanguageManager.getlocal("atkracecrossCDTime4") + this.getCountTimeStr(this._countDownTime);
			}else{
				this._countDownText.text =LanguageManager.getlocal("atkracecrossCDTime2") + LanguageManager.getlocal("acRank_acCDEnd");
			}
			this._countDownTime--;
		}
	}

	private getCountTimeStr(time:number):string
	{	
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}
	protected createCollectFlag()
    {
        if(!this._collectFlag)
        {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
            this._collectFlag.x = this._collectBtn.x +  this._collectBtn.width/2 ;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height/2;
            this.addChild(this._collectFlag);
        }
    }

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACEG_WINZIDREWARD),this.collectHandlerCallBack,this);
		this._nodeContainer = null;
		this._collectBtn = null;
		this._collectFlag = null;

		this._countDownTime = 0;
		this._countDownText = null;
		TickManager.removeTick(this.tick,this);
		
		super.dispose();
	}

}