/**
 * 宴会结算
 * author shaoliang
 * date 2017/11/2
 * @class DinnerFinishView
 */

class DinnerFinishView extends BaseView 
{	
	private _scrollList:ScrollList;
	protected _scroRect:egret.Rectangle;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"dinner_finish_word",
				"dinner_finish_word2",
				"dinner_finish_type1",
				"dinner_finish_type2",
				"dinner_finish_line",
				"dinner_list_title_bg",
				"dinner_list_bg",
				"dinner_rankbg",
		]);
	}
	protected getBgName():string
	{
		return "public_9_bg8";
	}

	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected initView():void
	{
		let info:any = this.param.data.info;

		let descBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		descBg.width = GameConfig.stageWidth;
		descBg.height = 728;
		descBg.setPosition(0, GameConfig.stageHeigth/2 - 413);
		this.addChildToContainer(descBg);

		let finishWord:BaseBitmap = BaseBitmap.create("dinner_finish_word");
		finishWord.setPosition(GameConfig.stageWidth/2  - finishWord.width/2, descBg.y - finishWord.height/2);
		this.addChildToContainer(finishWord);

		let finishWord2:BaseBitmap = BaseBitmap.create("dinner_finish_word2");
		let finishType:BaseBitmap = BaseBitmap.create("dinner_finish_type"+info.dtype);

		let totoalWidth:number = finishWord2.width + finishType.width;

		finishWord2.setPosition(GameConfig.stageWidth/2  - totoalWidth/2, descBg.y + 61);
		this.addChildToContainer(finishWord2);

		finishType.setPosition(finishWord2.x + finishWord2.width +8, finishWord2.y);
		this.addChildToContainer(finishType);

		let totalGuest:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerTotalGuest",[String(info.num)]),TextFieldConst.FONTSIZE_TITLE_SMALL);
		totalGuest.setPosition(GameConfig.stageWidth/2  - totalGuest.width/2 , descBg.y + 115);
		this.addChildToContainer(totalGuest);

		let finishLine:BaseBitmap = BaseBitmap.create("dinner_finish_line");
		finishLine.scaleX = 582/finishLine.width;
		finishLine.setPosition(GameConfig.stageWidth/2  - 582/2, descBg.y + 160);
		this.addChildToContainer(finishLine);



		//奖励
		let dinnerReward:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerReward"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
		dinnerReward.setPosition(66,  descBg.y + 183);
		this.addChildToContainer(dinnerReward);

		let dinnerPoint:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("playerScore")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		dinnerPoint.setPosition(dinnerReward.x, dinnerReward.y+36);
		this.addChildToContainer(dinnerPoint);

		let pointText:BaseTextField = ComponentManager.getTextField(info.point,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		pointText.setPosition(dinnerPoint.x + dinnerPoint.width + 10, dinnerPoint.y);
		this.addChildToContainer(pointText);

		let scorePoint:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerGetScore")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		scorePoint.setPosition(dinnerReward.x + 320, pointText.y);
		this.addChildToContainer(scorePoint);

		let scoreText:BaseTextField = ComponentManager.getTextField(info.score,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		scoreText.setPosition(scorePoint.x + scorePoint.width + 10, scorePoint.y);
		this.addChildToContainer(scoreText);

		//记录
		let dinnerRecord:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerRecord"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
		dinnerRecord.setPosition(dinnerReward.x, descBg.y + 270);
		this.addChildToContainer(dinnerRecord);


		let listBg:BaseBitmap = BaseBitmap.create("dinner_list_bg");
		listBg.width = 584;
		listBg.height = 418;
		listBg.setPosition(GameConfig.stageWidth/2  - listBg.width/2, descBg.y + 304);
		this.addChildToContainer(listBg);

		let listTitleBg:BaseBitmap = BaseBitmap.create("dinner_list_title_bg");
		listTitleBg.width = 582;
		listTitleBg.height = 46;
		listTitleBg.setPosition(GameConfig.stageWidth/2  - listTitleBg.width/2, listBg.y + 1);
		this.addChildToContainer(listTitleBg);

		let titleOrder:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("orderNumber"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		titleOrder.setPosition(dinnerReward.x+10, listTitleBg.y+listTitleBg.height/2 - titleOrder.height/2);
		this.addChildToContainer(titleOrder);

		let titleName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		titleName.setPosition(titleOrder.x+175, titleOrder.y);
		this.addChildToContainer(titleName);

		let titleScore:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		titleScore.setPosition(titleName.x+218, titleOrder.y);
		this.addChildToContainer(titleScore);

		//info.dtype
		let baodiNum:number = 0;
		if ( this.param.data.baodi )
		{
			baodiNum = Number(this.param.data.baodi);
		}
		else 
		{	
			// let count:number = Config.DinnerCfg.getFeastItemCfg(info.dtype).contain;
			// baodiNum = count-info.jinfo.length;
		}
		let infoArray:any[] = [];
		if (info.jinfo.length>0)
		{
			infoArray = info.jinfo;
		}
		for (let i = 0; i<baodiNum; i++)
		{
			infoArray.push({dtype:999,name:LanguageManager.getlocal("dinnerGuest")});
		}


		this._scroRect = new egret.Rectangle(0, 0, listBg.width,listBg.height - listTitleBg.height - 8);
		this._scrollList  = ComponentManager.getScrollList(DinnerFinishItem, infoArray , this._scroRect);
		this._scrollList.x = listBg.x;
		this._scrollList.y = listBg.y + listTitleBg.height;
		this.addChildToContainer(this._scrollList);

		
		//按钮
		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
		confirmBtn.setPosition(GameConfig.stageWidth/2 - confirmBtn.width/2, descBg.y+descBg.height+40);
		this.addChildToContainer(confirmBtn);
	}

	public hide():void
	{
		super.hide();

		if (ViewController.getInstance().getView(ViewConst.COMMON.DINNERDETAILVIEW))
		{
			ViewController.getInstance().getView(ViewConst.COMMON.DINNERDETAILVIEW).hide();
		}
		if (ViewController.getInstance().getView(ViewConst.POPUP.DINNERSHAREPOPUPVIEW))
		{
			ViewController.getInstance().getView(ViewConst.POPUP.DINNERSHAREPOPUPVIEW).hide();
		}
	}

	public dispose():void
	{	
		 this._scroRect = null;
		 this._scrollList = null;
		super.dispose();
	}

}