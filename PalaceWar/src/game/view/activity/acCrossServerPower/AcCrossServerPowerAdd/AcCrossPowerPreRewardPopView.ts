/**
 * author wxz
 * date 2020.7.28
 * @class AcAskGodPreRewardPopView
 */
class AcCrossPowerPreRewardPopView extends PopupView
{
    private _scrollview1:ScrollView=null;
    private _scrollview2:ScrollView=null;
    private _bg:BaseBitmap = null;
    private _tabbarGroup:TabBarGroup = null;
    private _seleteIndex = 0;
    public constructor(data?:any)
    {
        super();
    }
    private getTabName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
	}
    protected get uiType():string
	{
		return "2";
	} 
    private getTabTextArr():Array<string>
	{
		return [`acCrossServerPowerSjTab1`, 
                `acCrossServerPowerSjTab2`,
		];
	}    
    private changeTabBar():void
    {
        if(this._seleteIndex == 0)
        {
            if(this._scrollview1)
            {
                this._scrollview1.visible = true;
            }else
            {
                let arr = this.cfg.getSjList();
                let reward = "";
                for(let i = 0; i < arr.length; i++)
                {
                    if(i != arr.length-1)
                    {
                        reward += arr[i].getReward1 + "|";
                    }else
                    {
                        reward += arr[i].getReward1;
                    }
                }
                let rewardArr = GameData.getRewardItemIcons(reward, true, false, false, 1);
                let rewardScale = 1;
                let scrolNode:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
                scrolNode.width = this._bg.width - 20;
                let rect = new egret.Rectangle(0, 0, this._bg.width - 20, this._bg.height - 10);
                let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode, rect);
                scrollview.bounces = false;
                scrollview.x = this._bg.x + 7;
                scrollview.y = this._bg.y + 5;
                scrollview.horizontalScrollPolicy = 'off';
                this.addChildToContainer(scrollview);
                this._scrollview1 = scrollview;
                for(let i in rewardArr)
                {
                    let icon = rewardArr[i];
                    icon.setScale(rewardScale);
                    let idx = Number(i);
                    icon.x = 14 + (idx % 4) * (icon.width * icon.scaleX + 20);
                    icon.y = 5 + Math.floor(idx / 4) * (icon.width * icon.scaleX + 12);
                    scrolNode.addChild(icon);
                }
            }
            if(this._scrollview2)
            {
                this._scrollview2.visible = false;
            }           
        }else
        {
            if(this._scrollview1)
            {
                this._scrollview1.visible = false;
            }
            if(this._scrollview2)
            {
                this._scrollview2.visible = true;
            }else
            {
                let arr = this.cfg.getSjList();
                let reward = "";
                for(let i = 0; i < arr.length; i++)
                {
                    if(i != arr.length-1)
                    {
                        reward += arr[i].getReward2 + "|";
                    }else
                    {
                        reward += arr[i].getReward2;
                    }
                }
                let rewardArr = GameData.getRewardItemIcons(reward, true, false,false,1);
                let rewardScale = 1;
                let scrolNode:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
                scrolNode.width = this._bg.width - 20;
                let height = 0;
                for(let i in rewardArr)
                {
                    let icon = rewardArr[i];
                    icon.setScale(rewardScale);
                    let idx = Number(i);
                    icon.x = 14 + (idx % 4) * (icon.width * icon.scaleX + 20);
                    icon.y = 5 + Math.floor(idx / 4) * (icon.height * icon.scaleY + 12);
                    scrolNode.addChild(icon);

                    height = icon.y + icon.height * icon.scaleY;
                }
                scrolNode.height = height+10;

                let rect = new egret.Rectangle(0, 0, this._bg.width - 20, this._bg.height - 10);
                let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode, rect);
                scrollview.bounces = false;
                scrollview.x = this._bg.x + 7;
                scrollview.y = this._bg.y + 5;
                scrollview.horizontalScrollPolicy = 'off';
                this.addChildToContainer(scrollview);
                this._scrollview2 = scrollview;
            }         
        }
    }
    public initView():void
    {
        this.container.x = 0;

        this.showabbarGroup();

        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 550;
        bg.setPosition(55-8.5, 65);
        this.addChildToContainer(bg);
        this._bg = bg;

        this.changeTabBar();
    }
	private showabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
			this._tabbarGroup = ComponentManager.getTabBarGroup(this.getTabName(),tabBarTextArr,this.clickTabHandler,this);
			
			this.addChildToContainer(this._tabbarGroup);
			if (this.uiType == "2")
			{
				this._tabbarGroup.setSpace(0);
				this._tabbarGroup.x+=5;
				this._tabbarGroup.setColor(0xe1ba86,0x472c26);
				this.setBigFameY(0);
            }
			this._tabbarGroup.selectedIndex=this._seleteIndex;
			if(this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2){
				this._tabbarGroup.addZshi();
			}
		}
	}
	private clickTabHandler(data:any):void
	{
		var index = Number(data.index);
        if(index == this._seleteIndex)
        {
            return;
        }
		this._seleteIndex = index;
		this.changeTabBar();
	}    
    protected resetBgSize():void
    {
        super.resetBgSize();
        this._tabbarGroup.setPosition(55,0);
    }
	protected getBgExtraHeight():number
	{
		return 0;
	}
	protected getShowHeight():number
	{
		return 710;
    }    
	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

    // protected resetBgSize():void
    // {
    //     super.resetBgSize();
    //     this.container.x = 0;
    // }    
	protected getTitleStr():string
	{
        return "acCrossServerPowerSjPreTitle";
	}  
    public dispose(){
        this._scrollview1 = null;
        this._scrollview2 = null;
        this._bg = null;
        if(this._tabbarGroup)
        {
            this._tabbarGroup.dispose();
            this._tabbarGroup = null;
        }
        super.dispose();
    }
}