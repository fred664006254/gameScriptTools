/**
 * 创建/加入帮会动画
 * author dukunayng
 * date 2017/10/10
 * @class AllianceCreateAniView
 */

class AllianceCreateAniView extends BaseView
{

	private _lighePic:BaseBitmap;


	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();

      

		return rewardPic.concat(["alliance_create_ani",
		"alliance_joinpic","alliance_createpic",
		]);
	}


	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_9_bg8";
	}

	protected initView():void
	{
		this.addTouchTap(this.touchTap,this,null);

		let picStr = "alliance_createpic";
		if(this.param.data.type == 2)
		{
			picStr = "alliance_joinpic";
		}

		this._lighePic = BaseBitmap.create("public_rotatelight");
		this._lighePic.scaleX = 3/2;
		this._lighePic.scaleY = 3/2;
		this._lighePic.anchorOffsetX = this._lighePic.width/2;
		this._lighePic.anchorOffsetY = this._lighePic.height/2;
		this._lighePic.setPosition(GameConfig.stageWidth/2 , GameConfig.stageHeigth/2 );
		this.addChild(this._lighePic);
		this._lighePic.visible = false;
		this._lighePic.blendMode = egret.BlendMode.ADD;

		let aniBB:BaseBitmap = BaseBitmap.create("alliance_create_ani_1");

		let itemClip = ComponentManager.getCustomMovieClip("alliance_create_ani_",6,100);
		itemClip.x = GameConfig.stageWidth/2 - aniBB.width;
		itemClip.y = GameConfig.stageHeigth/2 - aniBB.height;
		itemClip.setScale(2);
		// itemClip.x = 300;
		// itemClip.y = 400;
		this.addChild(itemClip);
		itemClip.playWithTime(1);
		itemClip.blendMode = egret.BlendMode.ADD;
		// itemClip.play();
		itemClip.setEndCallBack(
			this.lightAni
			
			,this)

		let container = new BaseDisplayObjectContainer();
		this.addChild(container)
		let textBB:BaseBitmap = BaseBitmap.create(picStr);
		textBB.anchorOffsetX = textBB.width/2;
		textBB.anchorOffsetY = textBB.height/2;
		container.x = GameConfig.stageWidth/2 - container.width/2;
		container.y = GameConfig.stageHeigth/2 - container.height/2;
		container.setScale(0.01);

		container.addChild(textBB);
		egret.Tween.get(container,).to({scaleX:1,scaleY:1},200);

	}
	private lightAni()
	{
		
		this._lighePic.visible = true;
		egret.Tween.get(this._lighePic,{loop:true})
			.to({rotation: 360}, 8000)
	}


	private touchTap():void
	{
		this.hide();
	}

	public dispose():void
	{
		this._lighePic = null;
		super.dispose();
	}

}