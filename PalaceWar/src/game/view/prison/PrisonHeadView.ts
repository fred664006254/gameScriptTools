class PrisonHeadView extends CommonView
{

    //囚犯头像
    private prisonHeadImage: BaseBitmap =null;
    private redCrossImage: BaseBitmap =null;
    public  id:number =0;
    private headIcon:BaseBitmap =null;
     
    public constructor() 
	{
		super();
	}
	protected initView():void
	{
        
    }
    public showHead(index:number=0,prisonNum:number=0):void
    {

        //头像背景
        let headend:BaseLoadBitmap=BaseLoadBitmap.create("mainui_bottombtnbg");
        headend.anchorOffsetX =headend.width/2;
        headend.anchorOffsetY=headend.height/2;
        headend.x=headend.x-35;
        headend.y=headend.y-25;
        this.headIcon = headend;
		this.addChild(headend);


        //人物头像
        var iconNum= index+21;
        this.prisonHeadImage= BaseLoadBitmap.create("prison_icon"+iconNum);
        this.prisonHeadImage.anchorOffsetX =60;
        this.prisonHeadImage.anchorOffsetY =60;
        this.prisonHeadImage.scaleX =0.6;
        this.prisonHeadImage.scaleY =0.6;
        this.prisonHeadImage.y+=10;

        var num:number =0;
        // if(index==0)
        // {
        //     num = Api.prisonVoApi.getCurrPrisonId()+21;
        // }
        // else
        // {
             num = Api.prisonVoApi.getCurrPrisonId()+20;
        // }

        if(iconNum==num)
        {
            let moveCall:()=>void=()=>
            {
                egret.Tween.get(this.prisonHeadImage).to({scaleX:0.7,scaleY:0.7,},1000).to({scaleX:0.6,scaleY:0.6,},1000).call(moveCall,this);
            };
           moveCall();
        }
		this.addChild(this.prisonHeadImage);
        this.prisonHeadImage.name = iconNum+"";
        this.prisonHeadImage.addTouchTap(this.touchPrisonHandler,this);
        
        //红叉
        this.redCrossImage= BaseBitmap.create("prisonview_redx"); 
		this.redCrossImage.width=63;
        this.redCrossImage.anchorOffsetX =this.redCrossImage.width/2;
        this.redCrossImage.anchorOffsetY =this.redCrossImage.height/2;
        
        this.redCrossImage.y = this.prisonHeadImage.y;//+10;
		this.addChild(this.redCrossImage);

        if(prisonNum==0)
        {
            App.DisplayUtil.changeToGray(this.prisonHeadImage);
            App.DisplayUtil.changeToGray(this.headIcon);
        }
        else
        {
            this.redCrossImage.visible =false;
        }
    }
    
    
    public touchPrisonHandler(evt:egret.TouchEvent):void
    {
        var index = Number(evt.currentTarget.name);
        ViewController.getInstance().openView(ViewConst.POPUP.PRISONDETAILSPOPUPVIEW,index);
    }

    public dispose(): void
    {
        super.dispose();
        this.prisonHeadImage =null;
        this.redCrossImage =null;
        this.id =0;
        this.headIcon =null;
    }
}