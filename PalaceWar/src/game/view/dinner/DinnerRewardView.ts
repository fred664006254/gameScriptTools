/**
 *  奖励
 * date 2017/11/14
 * @class DinnerRewardView
 */

class DinnerRewardView extends CommonView
{
	private _isOpend:boolean = false;
	private _callbackF:Function = null;
	private _obj:any = null;

	public constructor() {
		super();
	}


	protected getResourceList():string[]
	{
		return ["dinner_reward_box","promotion_officerbg1"];
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

	protected getCloseBtnName():string
	{
		return null;
	}

	private touchTap():void
	{
		if (!this._isOpend) {
			return;
		}
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		this.hide();
	}


	protected initView():void
	{	
		this._isOpend= false;

		this.addTouchTap(this.touchTap,this,null);

		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		let body:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerPortrait(this.param.data.level,this.param.data.pic);
		body.setScale(1.3);
		body.setPosition(GameConfig.stageWidth/2 - body.width/2*body.scaleX, GameConfig.stageHeigth/2 - 230);
		this.addChildToContainer(body);

		let nameBg:BaseBitmap = BaseBitmap.create("promotion_officerbg1");
		nameBg.setPosition(GameConfig.stageWidth/2 - nameBg.width/2, GameConfig.stageHeigth/2 +360);
		this.addChildToContainer(nameBg);

		let nameText:BaseTextField = ComponentManager.getTextField(this.param.data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(nameBg.x + nameBg.width/2 - nameText.width/2, nameBg.y + nameBg.height/2 - nameText.height/2);
		this.addChildToContainer(nameText);

		this.container.alpha = 0;
		egret.Tween.get(this.container).to({alpha:1},300).wait(500).call(this.showView,this);
	}

	private showView():void
	{	
		this._isOpend= true;
		//对话框
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
		wordsBg.width = 504;
		wordsBg.height=104;
		wordsBg.setPosition(GameConfig.stageWidth/2 - wordsBg.width/2, GameConfig.stageHeigth/2 - 380);
		this.addChildToContainer(wordsBg);

		let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
		wordsCornerBg.x = wordsBg.x+wordsBg.width/2+120;
		wordsCornerBg.y = wordsBg.y +wordsBg.height -3;
		this.addChildToContainer(wordsCornerBg);

		let wordsText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerRewardTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		wordsText.width = 466;
		wordsText.lineSpacing = 6;
		wordsText.setPosition(wordsBg.x + wordsBg.width/2 - wordsText.width/2, wordsBg.y + wordsBg.height/2 - wordsText.height/2);
		this.addChildToContainer(wordsText);

		let box:BaseBitmap = BaseBitmap.create("dinner_reward_box");
		box.setPosition(GameConfig.stageWidth/2 - box.width/2, GameConfig.stageHeigth/2  + 5);
		this.addChildToContainer(box);

		let pos:egret.Point = egret.Point.create(GameConfig.stageWidth/2,box.y+box.height/2 -30);

		let awards:any[] = [];
		awards.push({ tipMessage: LanguageManager.getlocal("dinnerGetScore") +"+"+this.param.data.point});
		if (!Api.switchVoApi.checkCloseDinnerNewFunc())
		{
			awards.push({ tipMessage: LanguageManager.getlocal("dinnerScore") +"+"+this.param.data.point});
		}
		if (this.param.data.reward && typeof(this.param.data.reward)=="string" && this.param.data.reward != "") {
			let rewardVo = GameData.formatRewardItem(this.param.data.reward);
			for (let k in rewardVo) 
			{
				let vo = rewardVo[k];
				awards.push({icon:vo.icon,tipMessage:"+"+vo.num});
			}
		}

		App.CommonUtil.playRewardFlyAction(awards,pos);
	}



	public dispose():void
	{
		this._isOpend= false;
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}
}