class StorychallengeView extends CommonView
{   
    private _topContiner:BaseDisplayObjectContainer=null;
	private _middleContiner:BaseDisplayObjectContainer=null;
	private _buttomContiner:BaseDisplayObjectContainer=null;
    private _bigChannel:number = 0;
    private _scrollContiner:BaseDisplayObjectContainer=null;

    public constructor() 
    {
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"challenge_bg1",
					"challenge_pass",
					"battle_boss",
                    "channel_bg",
					"challenge_arrow",
					"challenge_story_bg",
					"challenge_top_bg",
                    "channel_light",
					]);
	}

    protected getTitleStr():string
	{
		return "challengeTitle" + this.param.data.info;
	}

	protected getSoundBgName():string
	{
		return SoundConst.MUSIC_CHALLENGE;
	}

    public initView():void
	{
        this._bigChannel = this.param.data.info;

        this.container.y = this.getTitleButtomY();
		this._scrollContiner = new BaseDisplayObjectContainer();

        //不拖动
		this.addChildToContainer(this._scrollContiner);

		this._topContiner=new BaseDisplayObjectContainer();
		this._scrollContiner.addChild(this._topContiner);

		this.initTop();
		this.initMiddle();
		this.initButtom();

    }

    private initTop():void
	{
		let topinfobg:BaseBitmap=BaseBitmap.create("challenge_top_bg");
		this._topContiner.addChild(topinfobg);

		let titleText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_tip"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BLACK);
		titleText.setPosition(GameConfig.stageWidth/2 - titleText.width/2, 50);
		this._topContiner.addChild(titleText);
		
	}

    private initMiddle():void
	{	

		this._middleContiner=new BaseDisplayObjectContainer();
		this._middleContiner.y = 105;
		this._scrollContiner.addChild(this._middleContiner);

		this._scrollContiner.swapChildren(this._topContiner,this._middleContiner);

		let middleBg:BaseBitmap=BaseBitmap.create("challenge_bg1");
		middleBg.setPosition(0,GameConfig.stageHeigth - middleBg.height -  225);
		this._middleContiner.addChild(middleBg);


		let posTab:number[][] = [[150,0],[376,90],[154,180],[380,270],[149,360],[377,450]];

		let offsetY = GameConfig.stageHeigth/2 - 195 + 160;
		for (let i=0; i<6; i++)
		{	
			if (i<=4) {

				let arrowIcon:BaseBitmap=BaseBitmap.create("challenge_arrow");
				arrowIcon.anchorOffsetX = arrowIcon.width/2;
				arrowIcon.anchorOffsetY = arrowIcon.height/2;
				arrowIcon.x = posTab[i][0]/2 + posTab[i+1][0]/2 + 65;
				arrowIcon.y = offsetY - posTab[i][1]/2 - posTab[i+1][1]/2 + 65;
				
				if (i%2 == 1) {
					arrowIcon.scaleX = -1;
					arrowIcon.rotation = 25;
				}
				else {
					arrowIcon.rotation = -25;
				}

				App.DisplayUtil.changeToGray(arrowIcon);
				this._middleContiner.addChild(arrowIcon);
			}

			if (i <=4 ) {

				let passTip:BaseButton=ComponentManager.getButton("challenge_pass","",this.onClickAttack,this,[i],0);
				passTip.setPosition(posTab[i][0],offsetY-posTab[i][1]);
				this._middleContiner.addChild(passTip);
			}
			else
            {
                let attButtom:ChallengeButton = new ChallengeButton();
                attButtom.initButton(this.onClickAttack,this,i,this._bigChannel)
                attButtom.setPosition(posTab[i][0],offsetY-posTab[i][1]);
                this._middleContiner.addChild(attButtom);
            }
		}
	}

    private initButtom():void
	{
		this._buttomContiner=new BaseDisplayObjectContainer();
		this._buttomContiner.y =  GameConfig.stageHeigth - 195 - this.getTitleButtomY();
		this._scrollContiner.addChild(this._buttomContiner);
	
		let buttomBg:BaseBitmap=BaseBitmap.create("challenge_story_bg");
		this._buttomContiner.addChild(buttomBg);

		let line1 = BaseBitmap.create("public_line3");
		line1.width = 480;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = buttomBg.y + 24;
		this._buttomContiner.addChild(line1);

		this.titleTF.text = String(this._bigChannel) + ". "+ LanguageManager.getlocal("challengeTitle" + this._bigChannel);

		let titleText:BaseTextField = ComponentManager.getTextField(this.titleTF.text,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BLACK);
		titleText.setPosition(GameConfig.stageWidth/2 - titleText.width/2, 24);
		this._buttomContiner.addChild(titleText);

		this.titleTF.text = titleText.text;
		this.titleTF.x = GameConfig.stageWidth/2 - this.titleTF.width/2;

		let descText = ComponentManager.getTextField(LanguageManager.getlocal("challengeDesc"+this._bigChannel),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		descText.width = GameConfig.stageWidth - 100;
		descText.lineSpacing = 6;
		this._buttomContiner.addChild(descText);
		descText.setPosition(50, 56);
		
	}


    private onClickAttack(idx:number):void
	{   
		let smallId:number = (this._bigChannel-1)*41+idx*8+1;
        let challengeConfig:any = ChallengeCfg.getChallengeCfgById(smallId);
        if ( challengeConfig.dialogue ) 
        {
             ViewController.getInstance().openView(ViewConst.BASE.CHALLENGESTORY,{dialogue:challengeConfig.dialogue,recall:true,cid:smallId,f2:this.refreshInfo,o2:this});
        }
    }

	private refreshInfo(bid:number):void
	{	

		if (this._bigChannel != bid) {
			this._bigChannel = bid;
			this._middleContiner.dispose();
			this.initMiddle();
			this._buttomContiner.dispose();
			this.initButtom();
			
		}
	}

	public hide():void
	{
		let f:Function = this.param.data.f;
		f.apply(this.param.data.o,[this._bigChannel]);
		super.hide();
	}

    public dispose():void
	{
        this._bigChannel = 0;
        this._scrollContiner = null;

        super.dispose();
    }
}