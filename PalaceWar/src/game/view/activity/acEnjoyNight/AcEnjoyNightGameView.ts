
/**
 * 猜拳游戏
 * author shaoliang
 */

class AcEnjoyNightGameView extends CommonView
{
    private _progressbar1:ProgressBar = null;
    private _npc:BaseBitmap = null;

    private _isMoving:boolean = false;

    private _timeRate:number = 1;

    private _win:BaseBitmap = null;
    private _shakeStTime:number = 0;
    private _isShakeing:boolean = false;

    public constructor() {
		super();
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

	protected getBgName():string
	{
		return "acenjoynight_gamebg-1";
	}

    protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			this.addChild(this.viewBg);
			this.viewBg.y = GameConfig.stageHeigth - this.viewBg.height;
		}
	}

	protected isShowMask():boolean
	{
		return true;
	}

    protected getResourceList():string[]
    {	
        let guidePic:string[] = [];

        return guidePic.concat([
            "enjoynight_game",
            "acenjoynightgameeffect","acenjoynight_gamer-1","acenjoynight_gamer2-1","acenjoynight_gamebg-1",
            "progress5","progress3_bg","progress3",
		]);
    }


	protected initView():void
	{   
        let endbg1:BaseBitmap = BaseBitmap.create("acen_game_endsbg1");
        this.addChild(endbg1);

        let name1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightStoryDesc_19_name1"),22);
        name1.setPosition(20, endbg1.y+endbg1.height/2-name1.height/2);
        this.addChild(name1);

        this._progressbar1 = ComponentManager.getProgressBar("progress3", "progress3_bg", 480);
		this._progressbar1.setPosition(128, endbg1.y+endbg1.height/2-this._progressbar1.height/2);
		this.addChild(this._progressbar1);

        let endbg2:BaseBitmap = BaseBitmap.create("acen_game_endsbg2");
        endbg2.y = GameConfig.stageHeigth - endbg2.height;
        this.addChild(endbg2);

        let name2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightStoryDesc_19_name2"),22);
        name2.setPosition(20, endbg2.y+endbg1.height/2-name2.height/2);
        this.addChild(name2);

        let progressbar2 = ComponentManager.getProgressBar("progress5", "progress3_bg", 480);
		progressbar2.setPosition(128, endbg2.y+endbg1.height/2-this._progressbar1.height/2);
		this.addChild(progressbar2);

        this._npc = BaseBitmap.create("acenjoynight_gamer-1");
        this._npc.setPosition(GameConfig.stageWidth/2 - this._npc.width/2,GameConfig.stageHeigth - 385 -this._npc.height);
        this.addChild(this._npc);

        for (let i =1 ; i<=3; i++)
        {
            let btn = ComponentManager.getButton("acen_game_btn"+i,null,this.gameHandle,this,[i]);
            btn.setPosition(95 + (i-1)*148,GameConfig.stageHeigth-210);
            this.addChild(btn);
        }
	}

    private gameHandle(i:number):void
    {
        if (this._isMoving == true)
        {
            return;
        }
        this._isMoving = true;


        let container1 = new BaseDisplayObjectContainer();
        container1.setPosition(-1000,GameConfig.stageHeigth/2-110);
        this.addChild(container1);

        let middlebg1 = BaseBitmap.create("acen_game_middlebg1");
        container1.addChild(middlebg1);

        let hand1 = BaseBitmap.create("acen_game_icon"+i);
        hand1.setPosition(0,middlebg1.height/2-hand1.height/2);
        container1.addChild(hand1);

        let container2 = new BaseDisplayObjectContainer();
        this.addChild(container2);

        let middlebg2 = BaseBitmap.create("acen_game_middlebg2");
        container2.addChild(middlebg2);
        container2.setPosition(GameConfig.stageWidth-middlebg2.width+1000,GameConfig.stageHeigth/2-130);

        let i2 = i==3? 1 : i+1;
        let hand2 = BaseBitmap.create("acen_game_icon"+i2);
        hand2.setPosition(middlebg2.width,middlebg2.height/2-hand2.height/2);
        hand2.scaleX = -1;
        container2.addChild(hand2);

        //光 
        let light = BaseBitmap.create("acen_game_light");
        light.setScale(1.7);
        light.setPosition(GameConfig.stageWidth/2 - light.width/2*1.7,GameConfig.stageHeigth/2 - light.height/2*1.7);
        this.addChild(light);

        let lightx1:number = GameConfig.stageWidth/2 - light.width/2;
        let lighty1:number = GameConfig.stageHeigth/2 - light.height/2;
        light.alpha = 0;

        //飞入
        let posx1:number = 0;
        let posy1:number = container1.y;
        let posx1_2 = posx1+10;
        let posy1_2 = posy1+17;

        let posx2:number = GameConfig.stageWidth-middlebg2.width;
        let posy2:number = container2.y;
        let posx2_2 = posx2-10;
        let posy2_2 = posy2-17;
        //飞入时间
        let t1:number = 200*this._timeRate;
        //等待时间
        let t2:number = 170*this._timeRate;
        //移动
        let t3:number = 1500*this._timeRate;
        //飞出
        let t4:number = 100*this._timeRate;
        let view = this;

        let lightT1 = 70*this._timeRate;
        let lightT2 = t2+t3-lightT1;


        egret.Tween.get(container1).wait(500).
        to({x:posx1},t1).call(()=>{
            view.playAnim();
            light.alpha = 1;
            egret.Tween.get(light).to({x:lightx1,y:lighty1,scaleX:1,scaleY:1},lightT1).wait(lightT2).to({alpha:0},t4);
        }).
        wait(t2).
        to({x:posx1_2,y:posy1_2},t3).call(this.play2,this).
        to({x:posx1_2-1000},t4).wait(1000).call(this.hide,this);

        egret.Tween.get(container2).wait(500).
        to({x:posx2},t1).
        wait(t2).
        to({x:posx2_2,y:posy2_2},t3).
        to({x:posx2+1000},t4);


    }

    private playAnim():void
    {   
        this._npc.texture = ResourceManager.getRes("acenjoynight_gamer2-1");
        this._progressbar1.setPercentage(0);

        let clip = ComponentManager.getCustomMovieClip("acenjoynightgameeffect",10,30*this._timeRate);
        let temppic = BaseBitmap.create("acenjoynightgameeffect1");
        clip.setPosition(GameConfig.stageWidth/2 - temppic.width/2,GameConfig.stageHeigth/2 - temppic.height/2);
        BaseBitmap.release(temppic);
       
         this.addChild(clip);
        let win:BaseBitmap = BaseBitmap.create("acen_game_win");
        this.addChild(win);
        this._win = win;


        


        let winx1:number = GameConfig.stageWidth/2 - win.width/2;
        let winy1:number = GameConfig.stageHeigth/2 - win.height/2;
        let winx2:number = GameConfig.stageWidth/2 - win.width/2*20;
        let winy2:number = GameConfig.stageHeigth/2 - win.height/2*20;
        let winx3:number = GameConfig.stageWidth/2 - win.width/2*1.2;
        let winy3:number = GameConfig.stageHeigth/2 - win.height/2*1.2;
        let winx4:number = GameConfig.stageWidth/2 - win.width/2*0.7;
        let winy4:number = GameConfig.stageHeigth/2 - win.height/2*0.7;

        win.setPosition(winx2,winy2);
        // win.alpha = 0.2;
        win.setScale(20);

        let t1:number = 170*this._timeRate;
        let t2:number = 70*this._timeRate;
        let t3:number = 70*this._timeRate;

        let view = this;
        egret.Tween.get(win).
        to({x:winx4,y:winy4,alpha:1,scaleX:0.7,scaleY:0.7},t1).call(()=>{
            clip.setEndCallBack(()=>{
                clip.visible = false;
                 egret.stopTick(view.shakeScreen,view);
            },view);
            clip.playWithTime(1);

            view.stopshakeScreen();
        }).
        to({x:winx3,y:winy3,scaleX:1.2,scaleY:1.2},t2).
        to({x:winx1,y:winy1,scaleX:1,scaleY:1},t3);
    }

    private play2():void
    {
        if (this._win)
        {   
            let win = this._win;
            egret.Tween.removeTweens(this._win);
            let t1:number = 170*this._timeRate;
            let winx1:number = GameConfig.stageWidth/2 - win.width;
            let winy1:number = GameConfig.stageHeigth/2 - win.height;

            egret.Tween.get(win).to({x:winx1,y:winy1,alpha:0,scaleX:2,scaleY:2},t1);
        }
       
    }

    private stopshakeScreen():void
    {
        this.x = 0;
        this.y = 0;
        this._isShakeing=false;

        egret.startTick(this.shakeScreen,this);
    }

    private shakeScreen(timeStamp:number):boolean
	{
		var spaceTime:number = 100;
		if (timeStamp < this._shakeStTime)
        {   
			 if (this._isShakeing==true && (timeStamp - this._shakeStTime) > spaceTime/5){
                this.x = 0;
                this.y = 0;
                this._isShakeing=false;
            }
        }
		else {
			this._shakeStTime =  timeStamp + 100;
			this._isShakeing=true;
            this.x =5-App.MathUtil.getRandom(0,10);
            this.y =5-App.MathUtil.getRandom(0,10);
		}
		 return false;
	}	

    public hide(isDispose?:boolean):void
	{	
		let view = this;
		
		if (this.param.data.callBack)
        {
            this.param.data.callBack.apply(this.param.data.obj);
        }
		super.hide();
	}

    public dispose():void 
    {
        egret.stopTick(this.shakeScreen,this);
        this._progressbar1 = null;
        this._npc = null;
        this._isMoving = false;
        this._win = null;
        this._shakeStTime = 0;
        this._isShakeing = false;

        super.dispose();
    }
}