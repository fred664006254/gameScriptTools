/**
 * author:xz
 * desc:跨服权势--精兵利器
*/
class AcCrossPowerDbSub1PopupView extends PopupView
{
	public _scrollList:ScrollList = null;
	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"palace_bg5","public_popupscrollitembg","shopview_itemtitle","public_scrolllistbg","progress3",
			'progress3_bg'
		]);
	}

	protected getTitleStr():string
	{
		return "acCrossServerPowerDbTitle"+this.param.data.index;
	}
	private get api() : CrossPowerVoApi{
        return Api.crossPowerVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	private get code() : string{
        return this.param.data.code;
	}
	
	protected getUiCode():string
	{
		let code = `1`;
		switch(Number(this.code)){
			default:
				code = `1`;
				if (this.vo.checkIsFengyun()){
					code = `7`;
				}
				break;
		}
		return code;
	}

	protected initView():void
	{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETSOLIDERREWARD, this.getRwdCallback, this);      
		
		let typeBg:BaseBitmap = BaseBitmap.create("crosspower_numbg");
		typeBg.width = 500;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 10);
		this.addChildToContainer(typeBg);

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 710;
		bg.setPosition(this.viewBg.width/2-bg.width/2, typeBg.y+typeBg.height+5);
		this.addChildToContainer(bg);

		let txt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerDbAcTxt2"), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt.setPosition(typeBg.x+typeBg.width/2-txt.width/2,typeBg.y+typeBg.height/2-txt.height/2);
		this.addChildToContainer(txt);		

		let index = this.param.data.index;
        let rect =  new egret.Rectangle(0, 0, bg.width, bg.height-10);
		let arr = [];
		if(this.cfg.solider && this.cfg.solider[index-1])
		{
			for(let item in this.cfg.solider[index-1])
			{
				this.cfg.solider[index-1][item]["id"] = item;
				arr.push(this.cfg.solider[index-1][item]);
			}
			arr.sort((a:any,b:any)=>
			{
				return a.needPower - b.needPower;
			});
		}
		let scrollList = ComponentManager.getScrollList(AcCrossPowerDbSub1ScrollItem, arr, rect, {aid:this.vo.aid, code:this.code,num:index});
        scrollList.setPosition(bg.x+bg.width/2-rect.width/2, bg.y+5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
	}
    private getRwdCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!rData)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(rData.rewards)
        {
            let rewardVoList = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
        this.refreshView();
    }

    private refreshView():void
    {
        if (!this.vo)
        {
            return;
        }
		let index = this.param.data.index;
		let arr = [];
		if(this.cfg.solider && this.cfg.solider[index-1])
		{
			for(let item in this.cfg.solider[index-1])
			{
				this.cfg.solider[index-1][item]["id"] = item;
				arr.push(this.cfg.solider[index-1][item]);
			}
			arr.sort((a:any,b:any)=>
			{
				return a.needPower - b.needPower;
			});
		} 
		this._scrollList.refreshData(arr,{aid:this.vo.aid, code:this.code,num:index});
    }

	protected getBgExtraHeight():number
	{
		return 20;
	}

	public dispose():void
	{
		super.dispose();
		this._scrollList = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETSOLIDERREWARD, this.getRwdCallback, this);  		
	}
}