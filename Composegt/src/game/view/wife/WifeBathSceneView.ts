/**
 * 场景宠幸动画界面
 * author dukunayng
 * date 2017/10/10
 * @class WifeLoveAniView
 */

class WifeBathSceneView extends BaseView
{

	// id 红颜ID
	private _wifeId:number = null;

	// private _wifePic:BaseLoadBitmap;

	//_type 类型 1随机宠幸 2 元宝宠幸
	// private _type:number = null;

	private _taoxinParticle:particle.GravityParticleSystem;
	// private _wifeScrollItem1:WifeScrollItem1;
	private _container:BaseDisplayObjectContainer;

	private _wifeContainer:BaseDisplayObjectContainer;

	// 遮罩层
	private _wifeMaskBmp:BaseBitmap; 

    private _sceneId:string = null;

	private _chuanglian:BaseLoadDragonBones = null;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();

        if (this.param.data ) {
			this._wifeId = this.param.data.id;
			
            this._sceneId = this.param.data.sceneId;
		}

		return rewardPic.concat(["taoxin","taoxin_json","taoxinani",
        	"wifebathscene_lovewordsbg",
			"wifescene_bg_"+this._sceneId
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
		//根据sceneid 重新设置背景
		if(RES.hasRes("wife_scenefull_"+this._sceneId+"_ske")&&App.DeviceUtil.CheckWebglRenderMode()&&!Api.switchVoApi.checkCloseBone()){
			return null;
		} else {
			return "wifescene_bg_"+this._sceneId;
		}

	}
	protected isShowOpenAni():boolean
	{
		return false;
	}
	// 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{

			this.viewBg = BaseBitmap.create(bgName);
			
			if(bgName=="commonview_bg1"&&(this.viewBg instanceof BaseBitmap))
			{
				this.viewBg.fillMode=egret.BitmapFillMode.REPEAT;
			}
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			this.addChild(this.viewBg);
			
			this.viewBg.width = GameConfig.stageWidth;
			this.viewBg.height = 1136;
			this.viewBg.y = GameConfig.stageHeigth / 2 - 1136 / 2;
			
		}
	}
	protected initView():void
	{
        // let id = this._wifeId;

				

		this._wifeMaskBmp = BaseBitmap.create("public_9_viewmask");
		this._wifeMaskBmp.width=GameConfig.stageWidth;
		this._wifeMaskBmp.height=GameConfig.stageHeigth;
		this._wifeMaskBmp.touchEnabled = true;
		this._wifeMaskBmp.alpha = 0;
		this.addChild(this._wifeMaskBmp);
		 
		this._wifeContainer = new BaseDisplayObjectContainer();
		this.addChild(this._wifeContainer);

		
		if(RES.hasRes("chuanglian_ske")&&App.DeviceUtil.CheckWebglRenderMode()&&!Api.switchVoApi.checkCloseBone()){
			egret.Tween.get(this)
			.wait(500)
			.call(()=>{
				
				this.showWifeAni();
			})
			

			this._chuanglian = App.DragonBonesUtil.getLoadDragonBones("chuanglian",1);
			this._chuanglian.stop();
			this._chuanglian.x = 320;
			this._chuanglian.y = GameConfig.stageHeigth/2;
			this.addChild(this._chuanglian);
			
		
		egret.Tween.get(this._chuanglian)
			
			.wait(1000)
			.call(()=>{
				
				this._chuanglian.playDragonMovie("idle",1);
			})
		} else {
			this.showWifeAni();
		}
		
		

	}

	private showWifeAni():void
	{		
		if (this._container){
			this.removeChild(this._container);
		}





		
		if(RES.hasRes("wife_scenefull_"+this._sceneId+"_ske")&&App.DeviceUtil.CheckWebglRenderMode()&&!Api.switchVoApi.checkCloseBone())
		{

			let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_scenefull_"+this._sceneId);
			// droWifeIcon.setScale(1.3)
			droWifeIcon.x =  310;
			droWifeIcon.y = GameConfig.stageHeigth + (1136-GameConfig.stageHeigth)/2;
			// this.addChildToContainer(droWifeIcon);
			this._wifeContainer.addChild(droWifeIcon);
			// this._wifePic.visible = false;
		} else {
			// let droWifeIcon = BaseLoadBitmap.create("wife_scenefull_"+this._sceneId);
			// droWifeIcon.width = 640;
			// droWifeIcon.height = 840;
			// droWifeIcon.x = 0;
			// droWifeIcon.y = GameConfig.stageHeigth /2  - droWifeIcon.height/2 + 70;
			// this._wifeContainer.addChild(droWifeIcon);

		}
			
		

		egret.Tween.get( this._wifeContainer ).to( { alpha:1 }, 1000 ).wait(700).call(this.changePic,this);
		egret.Tween.get( this._wifeContainer ).wait(1200).call(this.changePic2,this);
		// egret.Tween.get( this._wifeMaskBmp ).to( { alpha:0.8 }, 1000 );



		//红颜说的话背景
		let wordsBg:BaseBitmap = BaseBitmap.create("wifebathscene_lovewordsbg");
		// wordsBg.width = 430;
		// wordsBg.height = 90;
		wordsBg.x = 140;
		wordsBg.y = 0;
		this._wifeContainer.addChild(wordsBg);

		//红颜说的话
		let words = LanguageManager.getlocal("wifeSceneWords_"+this._sceneId+"_1");
		let wifeWordsText:BaseTextField = ComponentManager.getTextField(words,TextFieldConst.FONTSIZE_BUTTON_COMMON);
		wifeWordsText.setColor(TextFieldConst.COLOR_BROWN);
		wifeWordsText.width = 300;
		wifeWordsText.x = wordsBg.x + wordsBg.width/2 - wifeWordsText.width/2;
		wifeWordsText.y = wordsBg.y + 49 - wifeWordsText.height/2;
		
		this._wifeContainer.addChild(wifeWordsText);
		
		if(this._sceneId == "20801"){
			wordsBg.visible = false;
			wifeWordsText.visible = false;
		}
	
	}
	private changePic2():void
	{
		let upgradeClip = ComponentManager.getCustomMovieClip("taoxinani_",14,100);
		upgradeClip.setScale(2);
		upgradeClip.x = 0;
		upgradeClip.y = 320;
		this.addChild(upgradeClip);
		upgradeClip.playWithTime(1);
		upgradeClip.setEndCallBack(()=>{
			upgradeClip.visible = false;
		},this);
	}
	private playWifeSound():void
	{
		let soundName = "effect_wife_"+this._sceneId;
		SoundManager.playEffect(soundName);

	}
	private changePic():void
	{	
		SoundManager.pauseBg()
		if(!Api.wifeVoApi.getWifeIsBlue(this._wifeId)){
			SoundManager.playEffect(SoundConst.EFFECT_WIFE_LOVE);
		}
		this.playWifeSound();

		if(this.param.data.rewards)
		{
			let rewards= GameData.formatRewardItem(this.param.data.rewards);
			if(rewards&&rewards.length>0)
			{
				App.CommonUtil.playRewardFlyAction(rewards);
			}
		}	
		//脱衣后桃心
		let taoxinFullParticle = App.ParticleUtil.getParticle("taoxin");
		taoxinFullParticle.x = 0 ;
		taoxinFullParticle.y = GameConfig.stageHeigth - 560;
		// taoxinFullParticle.y = GameConfig.stageHeigth - 860;
		taoxinFullParticle.start();
		taoxinFullParticle.scaleX = 2;
		taoxinFullParticle.scaleY = 2;
		this.addChild(taoxinFullParticle);
		
		let timeNum = 0;
		egret.Tween.get(this._wifeContainer).wait(timeNum).call(()=>{

			this.addTouchTap(this.touchTap,this,null);
		});
	}

	private touchTap():void
	{
		this.hide();
		SoundManager.resumeBg()
		if (this.param.data.childData && !Api.rookieVoApi.isInGuiding){
			ViewController.getInstance().openView(ViewConst.BASE.WIFEGETCHILDVIEW,this.param.data.childData);
		}  

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFE_LOVECOM);
		// if(Api.rookieVoApi.isInGuiding){
		// 	Api.rookieVoApi.checkWaitingGuide();
		// }
		
	}

	public dispose():void
	{
		this._wifeId = null;
	
		this._container = null;
		this._wifeContainer = null;



		this._taoxinParticle = null;
		this._wifeMaskBmp = null;
        this._sceneId = null;
		super.dispose();
	}

}