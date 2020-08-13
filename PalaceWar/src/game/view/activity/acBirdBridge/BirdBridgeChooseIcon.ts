

class BirdBridgeChooseIcon extends BaseDisplayObjectContainer 
{   
    private _light:BaseBitmap = null;
    private _code:string = null;

    public cfg:Config.AcCfg.BirdBridgeWishItem = null;

    public constructor() 
	{
		super();    
    }


    public init(data:Config.AcCfg.BirdBridgeWishItem,gotNum:number,wishNum:number ,code:string,f:Function,o:any):void
    {
        this._code = code;
        this.cfg = data;

        let bg = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_kuang1",code));
        this.addChild(bg);

        let rewardvo = GameData.formatRewardItem(data.getReward)[0];
        let namestr= rewardvo.name;
        if (rewardvo.type == 10)
        {
            namestr = LanguageManager.getlocal("wifeName_"+rewardvo.id)
        }
        let name = ComponentManager.getTextField(namestr, 22, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name, bg,[0,13]);
        this.addChild(name);

        let icon = GameData.getRewardItemIcons(data.getReward,true)[0];
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg,[0,40]);
        this.addChild(icon);

        let lessTime = data.limitTime - gotNum;
       
        if (lessTime>0)
        {   
            let timebg = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_limitbg",code));
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timebg, icon,[0,3]);
            this.addChild(timebg);

            let lessTimeText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgeWishGetTime",code),
            [String(lessTime)]), 16 ,TextFieldConst.COLOR_WHITE);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lessTimeText, timebg,[3,0]);
            this.addChild(lessTimeText);

            if(data.showTag == 1)
            {
                let effect = ComponentManager.getCustomMovieClip("acaskgodexchangeeff", 15, 70);
                effect.setPosition(timebg.x-11,timebg.y-11);
                this.addChild(effect);
                effect.playWithTime(0);
            }
        }
        else
        {
        }

        let wishTimeText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgeWishTime",code),
        [String(wishNum),String(data.needTime)]), 18, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wishTimeText, bg,[0,150]);
        this.addChild(wishTimeText);

        let progressbar = ComponentManager.getProgressBar("progress24", "progress24_bg", 140);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, bg,[0,170]);
        progressbar.setPercentage(wishNum/data.needTime);
		this.addChild(progressbar);

        if (lessTime>0)
        {
            let light = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_light1",code));
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, light, bg,[0,0]);
            this.addChild(light);
            this._light = light;
            light.visible = false;
            bg.addTouchTap(()=>{
                f.apply(o,[this]);
            },this);
        }
        else
        {
            App.DisplayUtil.changeToGray(icon);

            let light = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_got",code));
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, light, bg,[0,135]);
            this.addChild(light);
        }
       

        
    }

    public setSelect(v:boolean):void
    {   
        if ( this._light)
        {
            this._light.visible = v;
        }
    }

    public dispose():void
	{	
        this._light = null;
        this._code = null;
        this.cfg = null;

		super.dispose();
	}
}