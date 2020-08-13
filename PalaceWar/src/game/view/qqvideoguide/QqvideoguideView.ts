/**
 * 腾讯视频入口引导
 * author 赵占涛
 * date 2018/07/03
 * @class QqvideoguideView
 */
class QqvideoguideView  extends BaseView
{
	public constructor() 
	{
		super();
	}
    public initView()
    { 
        let acImg = BaseBitmap.create("qqvideoguide_bigimage2");
        // acImg.scaleX = 64/75;
        // acImg.scaleY = 64/75;
        acImg.x = GameConfig.stageWidth/2 - acImg.width/2 * acImg.scaleX;
        acImg.y = GameConfig.stageHeigth/2 - acImg.height/2 * acImg.scaleY;
        this.addChild(acImg);
        
        let collectBtn = BaseBitmap.create("qqvideoguide_close");
        collectBtn.addTouchTap(this.okClick,this);
        collectBtn.x =  GameConfig.stageWidth/2 - collectBtn.width/2;
        collectBtn.y = acImg.y + acImg.height * acImg.scaleY + 20 ;
        this.addChild(collectBtn);

        let goBtn = BaseBitmap.create("public_alphabg");
        goBtn.width = 500;
        goBtn.height = 80;
        goBtn.addTouchTap(this.goClick,this);
        goBtn.x =  GameConfig.stageWidth/2 - goBtn.width/2;
        goBtn.y = acImg.y + acImg.height * acImg.scaleY  - 140;
        this.addChild(goBtn);

    }

    protected okClick()
    {
        this.hide(); 
    }

    protected goClick()
    {
        let urlPath =  "https://iwan.qq.com/community/h5index?hidetitlebar=1?ADTAG=txsp.xyx.yxdl";//"https://iwan.qq.com/m/vadr/h5games.htm"
        window.open(urlPath,"_self");
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "qqvideoguide_bigimage2","qqvideoguide_close"
		]);
	}

    public dispose():void
	{
		super.dispose();
	}
}