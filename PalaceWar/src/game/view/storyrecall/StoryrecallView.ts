/**
 * 剧情回忆
 * author shaoliang
 * date 2019/4/12
 * @class StoryrecallView
 */
class StoryrecallView extends CommonView
{
	private _itemContainer:BaseDisplayObjectContainer = null;
	private _frontPage:BaseButton = null;
	private _nextPage:BaseButton = null;
	private _curPageText:BaseTextField = null;

	private _curPage:number = 0;
	private _prePageNum:number = 0;
	private _maxPage:number = 0;
	private _maxChapter:number = 0;
	private _titleText:BaseTextField = null;
	private _descText:BaseTextField = null;

	private _itemTab:BaseDisplayObjectContainer[] = [];

    public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"storyrecall_bg","storyrecalleffect","story_3page_1","story_3page_2","story_3page_3","story_3page_4",
					"story_page_1","story_page_2","story_page_3","story_page_4",
					]);
	}

    protected getTitleStr():string
	{
		return null;
	}

	protected getTitleBgName():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "storyrecall_bg";
	}

	protected getCloseBtnName():string
	{
		return "storyrecall_close";
	}

	private showRule():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW,LanguageManager.getlocal("storyrecall_ruleInfo"));
	}

    public initView():void
	{
		this._ruleBtn = ComponentManager.getButton("storyrecall_ask","",this.showRule,this);
		this._ruleBtn.x = 30 + (PlatformManager.hasSpcialCloseBtn()?100:0);
		this._ruleBtn.y = 30;
		this.addChild(this._ruleBtn);

		this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()?30:(this.viewBg.width - this.closeBtn.width - 30);
		this.closeBtn.y = this._ruleBtn.y;

		this._itemContainer = new BaseDisplayObjectContainer();
		this.addChild(this._itemContainer);

		let title:BaseBitmap = BaseBitmap.create("storyrecall_title");
		title.setPosition(GameConfig.stageWidth/2-title.width/2,45);
		this.addChild(title);

		let mask:BaseBitmap = BaseBitmap.create("storyrecall_mask");
		mask.height = GameConfig.stageHeigth;
		this.addChild(mask);
		
		let maxBigStory:number = ChallengeCfg.getMaxStoryBigId();
		this._maxChapter = Api.challengeVoApi.getCurBigChannelId() < maxBigStory ? Api.challengeVoApi.getCurBigChannelId() : maxBigStory;
		//底部
		let titleStr:string = String(this._maxChapter-1) + ". "+LanguageManager.getlocal("challengeTitle" + (this._maxChapter-1));
		this._titleText = ComponentManager.getTextField(titleStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		this._titleText.setPosition(GameConfig.stageWidth/2 - this._titleText.width/2, GameConfig.stageHeigth - 246);
		this.addChild(this._titleText);

		this._descText = ComponentManager.getTextField(LanguageManager.getlocal("challengeDesc"+(this._maxChapter-1)),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		this._descText.width = GameConfig.stageWidth - 108;
		this._descText.lineSpacing = 6;
		this._descText.setPosition(54, this._titleText.y+this._titleText.height+14);
		this.addChild(this._descText);

		let choosePage:BaseButton = ComponentManager.getButton("storyrecall_choosepage","",this.choosePageHandle,this);
		choosePage.setPosition(GameConfig.stageWidth/2 - choosePage.width/2, GameConfig.stageHeigth - 70);
		this.addChild(choosePage);

		this._frontPage = ComponentManager.getButton("storyrecall_front","",this.changePageHandle,this,[1]);
		this._frontPage.setPosition(68, GameConfig.stageHeigth - 96);
		this.addChild(this._frontPage);

		this._nextPage = ComponentManager.getButton("storyrecall_nextpage","",this.changePageHandle,this,[2]);
		this._nextPage.setPosition(GameConfig.stageWidth-this._nextPage.width- 68, GameConfig.stageHeigth - 96);
		this.addChild(this._nextPage);

		this._curPageText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		this._curPageText.y = GameConfig.stageHeigth - 90;
		this.addChild(this._curPageText);

		//
		
		this._prePageNum = Math.floor((GameConfig.stageHeigth-442)/72);

	

		this._maxPage = Math.ceil((this._maxChapter-1)/this._prePageNum);
		this._curPage = this._maxPage;

		if (Api.challengeVoApi.lastRecallId >0)
		{	
			this._curPage = Math.ceil(Api.challengeVoApi.lastRecallId/this._prePageNum);
			this.resetInfo(Api.challengeVoApi.lastRecallId);
		}

		this.resetItemInfo();

    }

	private resetItemInfo():void
	{	
		this._curPageText.text = LanguageManager.getlocal("storyRecall_page",[String(this._curPage)]);
		this._curPageText.x = GameConfig.stageWidth/2 - this._curPageText.width/2;

		this._frontPage.setEnable(!(this._curPage <= 1));
		this._nextPage.setEnable(!(this._curPage >= this._maxPage));

		if (this._itemTab.length>0)
		{
			for (let i:number=0; i<this._itemTab.length; i++)
			{	
				this._itemContainer.removeChild(this._itemTab[i]);
				this._itemTab[i].dispose();
			}
			this._itemTab.length = 0;
		}

		let startIdx:number = 1 + (this._curPage-1)*this._prePageNum;
		let endIdx:number = this._curPage * this._prePageNum;
		if (this._maxPage <= this._curPage)
		{
			endIdx = this._maxChapter-1;
		}

		let index:number = 0;
		for (let j:number=startIdx; j<=endIdx; j++)
		{
			let container:BaseDisplayObjectContainer = this.getItemByBigId(j);
			container.setPosition(GameConfig.stageWidth/2-container.width/2,152+72*index);
			this._itemContainer.addChild(container);
			container.addTouchTap(this.touchChapterHandle,this,[j]);
			this._itemTab.push(container);

			index++;
		}
	}

	private getItemByBigId(bid:number):BaseDisplayObjectContainer
	{
		let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		let bg:BaseBitmap = BaseBitmap.create("storyrecall_itembg");
		bg.width = 514;
		bg.height = 60;
		container.addChild(bg);

		let chapter:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_chapter",[String(bid)]),30,TextFieldConst.COLOR_LIGHT_BLACK);
		chapter.setPosition(16,bg.height/2- chapter.height/2);
		container.addChild(chapter);

		let name:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("challengeTitle"+bid),30,TextFieldConst.COLOR_LIGHT_BLACK);
		name.setPosition(chapter.x+chapter.width+40,chapter.y);
		container.addChild(name);

		return container;
	}

	private touchChapterHandle(event:any,idx:number):void
	{
		 ViewController.getInstance().openView(ViewConst.COMMON.STORYCHALLENGEVIEW,{info:idx,f:this.resetInfo,o:this});
	}

	private resetInfo(bid:number):void
	{	
		Api.challengeVoApi.lastRecallId = bid;
		let titleStr:string = String(bid) + ". "+LanguageManager.getlocal("challengeTitle" + (bid));
		this._titleText.text = titleStr;
		this._titleText.x = (GameConfig.stageWidth/2 - this._titleText.width/2);
		this.addChild(this._titleText);

		this._descText.text = LanguageManager.getlocal("challengeDesc"+bid);

		let num:number = Math.ceil(bid/this._prePageNum);
		if (this._curPage != num)
		{	
			
			this._curPage = num;
			this.resetItemInfo();
		}
	}

	private choosePageHandle():void
	{	
		if (this._maxPage == 0)
		{
			
			App.CommonUtil.showTip(LanguageManager.getlocal("storyrecall_noRecord"));
			return ;
		}
		let curNum:number = Api.challengeVoApi.lastRecallId >0 ?  Api.challengeVoApi.lastRecallId : (this._maxChapter-1);
		ViewController.getInstance().openView(ViewConst.POPUP.STORYRECALLCHOOOSEPOPUPVIEW,{maxNum:this._maxChapter-1,f:this.choosePageCallback,o:this,num:curNum});
	}

	private choosePageCallback(n:number):void
	{	
		let num:number = Math.ceil(n/this._prePageNum);
		if (this._curPage != num)
		{	
			let offset:number = num -this._curPage;
			this._curPage = num;
			
			let pageType:number;
			if (offset>0)
			{
				pageType = 1;
			}
			else
			{
				pageType = 2;
				offset = 0-offset;
			}
			if (offset>3)
			{
				offset=3;
			}
			let effect = new StoryPageEffect();
			LayerManager.maskLayer.addChild(effect);
			effect.init(offset,pageType);
			// this.showMaskAnim(offset,pageType);
			this.resetItemInfo();
		}
	}


	private changePageHandle(parms:number):void
	{	
		let pageType:number;
		if (parms ==1)
		{
			this._curPage--;
			pageType = 2;
		}
		else
		{
			this._curPage++;
			pageType = 1;
		}

		let effect = new StoryPageEffect();
		LayerManager.maskLayer.addChild(effect);
		effect.init(1,pageType);
		// this.showMaskAnim(1,pageType);
		this.resetItemInfo();
	}


	private showMaskAnim(page:number,type:number):void
	{
		let renderTexture:egret.RenderTexture = new egret.RenderTexture();
		renderTexture.drawToTexture(this);

		let maskPanl:BaseBitmap = BaseBitmap.create();
		maskPanl.texture = renderTexture;
		this.addChild(maskPanl);
		// maskPanl.mask = new egret.Rectangle(0, 0, 320, GameConfig.stageHeigth);
		let tweenTime:number;
		if (type == 1)
		{
			tweenTime = (page==2? 570 : 500);
			egret.Tween.get(maskPanl).wait(tweenTime).call(function(){
				maskPanl.mask = new egret.Rectangle(0, 0, 320, GameConfig.stageHeigth);
			}).wait(140).call(function(){
				maskPanl.mask = new egret.Rectangle(0, 0, 140, GameConfig.stageHeigth);
			}).wait(100)
			.call(function(){
				maskPanl.dispose();
			});
		}
		else
		{
			tweenTime = (page==2? 470 : 400);

			egret.Tween.get(maskPanl).wait(tweenTime).call(function(){
				maskPanl.mask = new egret.Rectangle(180, 0, 460, GameConfig.stageHeigth);
			}).wait(70).call(function(){
				maskPanl.mask = new egret.Rectangle(320, 0, 320, GameConfig.stageHeigth);
			}).wait(70).call(function(){
				maskPanl.mask = new egret.Rectangle(360, 0, 280, GameConfig.stageHeigth);
			}).wait(100)
			.call(function(){
				maskPanl.dispose();
			});
		}

		
	}

	public dispose():void
	{
		this._itemContainer = null;
		this._curPageText = null;
		this._frontPage = null;
		this._nextPage = null;

		this._curPage = 0;
		this._prePageNum = 0;
		this._maxPage = 0;
		this._itemTab.length = 0;
		this._maxChapter = 0;
		this._titleText = null;
		this._descText = null;

		super.dispose();
	}
}