/**
 * 门客加成
 * author shaolaing
 * date 2020/7/2
 * @class SixSection1BattleAddView
 */

class SixSection1BattleAddView extends CommonView
{
     public constructor() {
		super();
	}

    protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

	protected getContainerY():number
	{
		return 0;
	}

    protected getTitlePic():string{
        return "newatkracecrossbufflistviewtitle";
    }
    
    protected getTitleStr():string
	{
        return null;
    } 


    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "dailytask_topbg","newcrossatkrace_bufficon","public_scrollitembg",
            "progress19_cloud","progress17_bg", "progress17","progress19_bg","specialview_commoni_namebg","newatkracecrossbufflistviewtitle"
		]);
	}

    public initView():void
    {
        this.setBigFameY(178);
		this.setBigFameCorner(2);


        let topBg = BaseBitmap.create("dailytask_topbg");
		topBg.y = 0;
		this.addChildToContainer(topBg);

        let desc = ComponentManager.getTextField(LanguageManager.getlocal(`sixSection1BattleAdd_buffInfo`),24,TextFieldConst.COLOR_WHITE);
		desc.lineSpacing = 5;
        desc.width = 560;
        desc.textAlign = egret.HorizontalAlign.LEFT;
        desc.setPosition(this.viewBg.width/2-desc.width/2,33);
        this.addChildToContainer(desc);

       
        let values = Api.sixsection1VoApi.getBaseBuff();
        let v2 = Math.floor(values[0]* 1000+0.5)/10;
        let v3 = Math.floor(values[1]* 1000+0.5)/10;

        let value2 = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleDetail_buff1",[String(v2)]),24,TextFieldConst.COLOR_LIGHT_YELLOW);
        value2.setPosition(this.viewBg.width/2-value2.width-40,desc.y+desc.height+28);
        this.addChildToContainer(value2);

        let value3 = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleDetail_buff2",[String(v3)]),24,TextFieldConst.COLOR_LIGHT_YELLOW);
        value3.setPosition(this.viewBg.width/2+40,value2.y);
        this.addChildToContainer(value3);


        //门客滚顶区域
		let scrollH = GameConfig.stageHeigth-295;
		let rect = new egret.Rectangle(0,0,600,scrollH);

        let list = Api.sixsection1VoApi.getBaseBuffList();
		let scrollList = ComponentManager.getScrollList(SixSection1BattleAddScrollItem, list ,rect);
		scrollList.x = 20;
		scrollList.y = topBg.y+topBg.height+13;
		this.addChildToContainer(scrollList);

     
    }

    public dispose():void
	{
		
		super.dispose();
	}
}