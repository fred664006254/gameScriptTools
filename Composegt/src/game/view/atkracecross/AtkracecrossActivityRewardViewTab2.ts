class AtkracecrossActivityRewardViewTab2 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _collectBtn:BaseButton;
	private _collectFlag:BaseBitmap;

	public constructor() 
	{
		super();
		this.initView();
	}

	protected getListType():number
	{
		return 2;
	}
	protected initView():void
	{
		this._nodeContainer = new BaseDisplayObjectContainer();
		let vo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace",vo.code);
		let zidL = Api.atkracecrossVoApi.zidLength;
		// let zonerankinfos:any = Api.atkracecrossVoApi.zonerankinfos;
		let rankList = cfg.getServerRankRewards();
		if(zidL>2)
        {
			rankList = cfg.getMulServerPRankRewards(zidL);//cfg.rankList1
        }
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

			let winBottomBg = BaseBitmap.create("rechargevie_db_01");
			winBottomBg.width = 628;
			winBottomBg.y =scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);

			let winbg = BaseBitmap.create("public_9v_bg02");
			winbg.width = 628;
			winbg.height = 60; 
			winbg.y = scroStartY;
			winbg.visible =false;
			this._nodeContainer.addChild(winbg); 

			let line1 =  BaseBitmap.create("public_line3");
			line1.width = 480;
			line1.x = GameConfig.stageWidth/2 - line1.width/2;
			line1.y = winbg.y + winbg.height/2 - line1.height/2;
			this._nodeContainer.addChild(line1); 
			
			let rewardStr = rItem.reward;
			let rank = rItem.rank

			let txt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_BROWN);
			
            if (Number(key) < 4)
            {
                txt.text =LanguageManager.getlocal("acRank_rank"+key);
            }else
            {
                txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
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
		scroStartY += 10;
		 // 膜拜背景
        let bottomBg = BaseBitmap.create("wifeview_bottombg");
        bottomBg.width = 640
        bottomBg.height = 100;
        // bottomBg.x = 6;
        bottomBg.y = GameConfig.stageHeigth -bottomBg.height-150;


		let bottomBg2 = BaseBitmap.create("public_9v_bg03");
		bottomBg2.width = 640;
		bottomBg2.height = GameConfig.stageHeigth - 245;
		bottomBg2.x = 0;
		bottomBg2.y = 0;
		this.addChild(bottomBg2); 	
		this.addChild(bottomBg);

		
		let txt3 = ComponentManager.getTextField("",20);
		if(AtkracecrossActivityRewardView._merank )
		{
			txt3.text = LanguageManager.getlocal("acRank_myrank1",[String(AtkracecrossActivityRewardView._merank)]);
		}else{
			txt3.text = LanguageManager.getlocal("acRank_myrank1",[LanguageManager.getlocal("atkracedes4")]);
		}
		txt3.x =  bottomBg.x + 30;
		txt3.y = bottomBg.y + bottomBg.height/2 - txt3.height/2
		this.addChild(txt3);

		let txt4 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt5"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt4.x =  bottomBg.x + bottomBg.width - txt4.width - 30;
		txt4.y = txt3.y;
		this.addChild(txt4);


		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-10);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = 3;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);

	}

	public dispose():void
	{
		this._nodeContainer = null;
		this._collectBtn = null;
		this._collectFlag = null;

		super.dispose();
	}

}