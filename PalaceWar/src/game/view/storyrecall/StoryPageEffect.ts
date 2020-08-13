class StoryPageEffect extends BaseDisplayObjectContainer
{

    public constructor() 
	{
		super();
	}

	/**
	 * @param pageNum 翻几页  1 ～ 3
	 * @param type 1 往后翻  2 往前翻
	 */
	public init(pageNum:number,type:number):void
	{
		let alpha:BaseBitmap = BaseBitmap.create("public_alphabg");
        alpha.width = GameConfig.stageWidth;
        alpha.height = GameConfig.stageHeigth;
        this.addChild(alpha);

		let view = ViewController.getInstance().getView(ViewConst.COMMON.STORYRECALLVIEW);
		let renderTexture:egret.RenderTexture = new egret.RenderTexture();
		renderTexture.drawToTexture(view);

		let maskPanl:BaseBitmap = BaseBitmap.create();
		maskPanl.texture = renderTexture;
		this.addChild(maskPanl);

        this.touchEnabled = true;
		let framerate:number = 45;
		let anim1_pre:string;
		if (pageNum == 3)
		{
			anim1_pre = "story_3page_";
		}
		else
		{
			anim1_pre = "story_page_";
		}
		let anim2_pre:string = anim1_pre + "full";

		let b1:number,b2:number,e1:number,e2:number;
		let ani1_frames:string[] = [];
		let ani2_frames:string[] = [];
		if (type == 1)
		{
			b1 = 1;
			b2 = 1;
			e1 = 4;
			e2 = 8;

			for (let i:number = b1; i<= e1; i++)
			{
				ani1_frames.push(anim1_pre+i);
			}
			for (let i:number = b2; i<= e2; i++)
			{
				ani2_frames.push(anim2_pre+i);
			}
		}
		else
		{
			b1 = 4;
			b2 = 8;
			e1 = 1;
			e2 = 1;

			for (let i:number = b1; i>= e1; i--)
			{
				ani1_frames.push(anim1_pre+i);
			}
			for (let i:number = b2; i>= e2; i--)
			{
				ani2_frames.push(anim2_pre+i);
			}
		}

		let tempAnim1:BaseBitmap = BaseBitmap.create(ani1_frames[0]);

		let myClip:CustomMovieClip = ComponentManager.getCustomMovieClip();
		myClip.playFrameRate = framerate;
		myClip.frameImages = ani1_frames;
		myClip.y = GameConfig.stageHeigth - tempAnim1.height;
		this.addChild(myClip);

		let fullClip:CustomMovieClip = ComponentManager.getCustomMovieClip();
		fullClip.playFrameRate = framerate;
		fullClip.frameImages = ani2_frames;
		fullClip.height = GameConfig.stageHeigth;
		this.addChild(fullClip);

		let that = this;
		//双翻
		if (pageNum == 2)
		{
			let myClip2:CustomMovieClip = ComponentManager.getCustomMovieClip();
			myClip2.playFrameRate = framerate;
			myClip2.frameImages = ani1_frames;
			myClip2.y = GameConfig.stageHeigth - tempAnim1.height;
			this.addChild(myClip2);

			let fullClip2:CustomMovieClip = ComponentManager.getCustomMovieClip();
			fullClip2.playFrameRate = framerate;
			fullClip2.frameImages = ani2_frames;
			fullClip2.height = GameConfig.stageHeigth;
			this.addChild(fullClip2);

			//正翻
			if (type == 1)
			{	

				TimerManager.doTimer(framerate,1,function(){
					myClip2.setEndCallBack(function(){
						myClip.visible = false;
						myClip2.visible = false;
						maskPanl.mask = new egret.Rectangle(0, 0, 460, GameConfig.stageHeigth);

						fullClip.playWithTime(1);
						TimerManager.doTimer(framerate,1,function(){
							fullClip2.setEndCallBack(that.closeAnim,that);
							maskPanl.mask = new egret.Rectangle(0, 0, 460, GameConfig.stageHeigth);
							fullClip2.setEndCallBack(that.closeAnim,that);
							fullClip2.setFrameEvent(3,function(){
								maskPanl.mask = new egret.Rectangle(0, 0, 290, GameConfig.stageHeigth);
							},this);
							fullClip2.setFrameEvent(5,function(){
								maskPanl.mask = new egret.Rectangle(0, 0, 130, GameConfig.stageHeigth);
							},this);
							fullClip.setFrameEvent(6,function(){
								maskPanl.visible = false;
							},this);
								},that);

					},that);
					myClip2.playWithTime(1);	
				},this);
				
				myClip.playWithTime(1);				
			}
			//倒翻
			else
			{	
				TimerManager.doTimer(framerate,1,function(){
					fullClip2.setEndCallBack(function(){
						fullClip.visible = false;
						fullClip2.visible = false;
						maskPanl.visible = false;
						myClip.playWithTime(1);
						TimerManager.doTimer(framerate,1,function(){
							myClip2.setEndCallBack(that.closeAnim,that);
							myClip2.playWithTime(1);
						},that);

					},that);
					fullClip2.setFrameEvent(5,function(){
					maskPanl.mask = new egret.Rectangle(200, 0, 440, GameConfig.stageHeigth);
					},this);
					fullClip2.setFrameEvent(7,function(){
						maskPanl.mask = new egret.Rectangle(340, 0, 300, GameConfig.stageHeigth);
					},this);
					fullClip2.setFrameEvent(8,function(){
						maskPanl.mask = new egret.Rectangle(430, 0, 210, GameConfig.stageHeigth);
					},this);
					fullClip2.playWithTime(1);	
				},this);
				
				fullClip.playWithTime(1);	
			}
		}
		//单翻
		else
		{
			if (type == 1)
			{
				myClip.setEndCallBack(function(){
					myClip.visible = false;
					maskPanl.mask = new egret.Rectangle(0, 0, 460, GameConfig.stageHeigth);
					fullClip.setEndCallBack(that.closeAnim,that);
					fullClip.setFrameEvent(3,function(){
						maskPanl.mask = new egret.Rectangle(0, 0, 290, GameConfig.stageHeigth);
					},this);
					fullClip.setFrameEvent(5,function(){
						maskPanl.mask = new egret.Rectangle(0, 0, 130, GameConfig.stageHeigth);
					},this);
					fullClip.setFrameEvent(6,function(){
						maskPanl.visible = false;
					},this);
					fullClip.playWithTime(1);
				},that);
				myClip.playWithTime(1);
			}
			else
			{	
				fullClip.setEndCallBack(function(){
					fullClip.visible = false;
					maskPanl.visible = false;
					myClip.setEndCallBack(that.closeAnim,that);
					myClip.playWithTime(1);
				},that);
				fullClip.setFrameEvent(5,function(){
					maskPanl.mask = new egret.Rectangle(200, 0, 440, GameConfig.stageHeigth);
				},this);
				fullClip.setFrameEvent(7,function(){
					maskPanl.mask = new egret.Rectangle(340, 0, 300, GameConfig.stageHeigth);
				},this);
				fullClip.setFrameEvent(8,function(){
					maskPanl.mask = new egret.Rectangle(430, 0, 210, GameConfig.stageHeigth);
				},this);
	
				fullClip.playWithTime(1);
			}
		}

		tempAnim1.dispose();
	}

	private closeAnim():void
	{
		 this.dispose();
	}
}