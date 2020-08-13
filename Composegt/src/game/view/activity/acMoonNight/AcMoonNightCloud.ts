class AcMoonNightCloud extends BaseDisplayObjectContainer 
{

    private cloudL1:BaseBitmap = null;
    private cloudR1:BaseBitmap = null;


    public constructor() 
	{
		super();
        this.init();
	}
    public init():void
    {
        this.width = 100;
        this.height = 100;
        this.cloudL1 = BaseBitmap.create("moonnight_cloud22-1");
        this.cloudR1 = BaseBitmap.create("moonnight_cloud21-1");
        this.cloudL1.anchorOffsetX = this.cloudL1.width/2;
        this.cloudL1.anchorOffsetY = this.cloudL1.height/2;

        this.cloudR1.anchorOffsetX = this.cloudR1.width/2;
        this.cloudR1.anchorOffsetY = this.cloudR1.height/2;
        // this.cloudL2 = BaseBitmap.create("moonnight_cloud21-1");
        // this.cloudR2 = BaseBitmap.create("moonnight_cloud22-1");


        this.cloudL1.x = 10;
        this.cloudL1.y = 0 + 30;
        this.addChild(this.cloudL1);
       

        this.cloudR1.x = this.width - 10;
        this.cloudR1.y = this.height - 30;
        this.addChild(this.cloudR1);
    }

    public playIdle():void
    {
        egret.Tween.get(this.cloudL1,{loop:true})
        .to({x:0},1000)
        // .to({x:10},1000)
        .to({x:20},2000)
        .to({x:10},1000)

        egret.Tween.get(this.cloudR1,{loop:true})
        .to({x:this.width - 10 + 10},1000)
        .to({x:this.width - 10 - 10},2000)
        .to({x:this.width - 10},1000)
    }

    public playDiss():void
    {
        if(this.cloudL1){
            egret.Tween.removeTweens(this.cloudL1);
        }
        if(this.cloudR1){
            egret.Tween.removeTweens(this.cloudR1);
        }
        egret.Tween.get(this.cloudL1)
        .to({alpha:0,x:-100},1000)

        egret.Tween.get(this.cloudR1)
        .to({alpha:0,x:this.width + 100},1000)    
    }

    public dispose():void
	{

        if(this.cloudL1){
            egret.Tween.removeTweens(this.cloudL1);
        }
        if(this.cloudR1){
            egret.Tween.removeTweens(this.cloudR1);
        }

        this.cloudL1 = null;
		this.cloudR1 = null;

        super.dispose();
    }

}