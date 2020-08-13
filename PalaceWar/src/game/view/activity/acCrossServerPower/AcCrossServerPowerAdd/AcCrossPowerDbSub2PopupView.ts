/**
 * author:xz
 * desc:跨服权势--门客名薄
*/
class AcCrossPowerDbSub2PopupView extends PopupView
{
	public _scrollList:ScrollList = null;
	private _txt1:BaseTextField = null;
	private _txt2:BaseTextField = null;
	private _txt3:BaseTextField = null;
	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"palace_bg5",
		]);
	}

	protected getTitleStr():string
	{
		return "acCrossServerPowerDbTitle4";
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

	protected initView():void
	{
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

		let txt1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerDbAcTxt3"), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		txt1.setPosition(60,15);
		this.addChildToContainer(txt1);
		this._txt1 = txt1;

		let txt2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerDbAcTxt4"), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		txt2.setPosition(txt1.x,txt1.y+txt1.height+5);
		this.addChildToContainer(txt2);
		this._txt2 = txt2;	

		let txt3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerDbAcTxt5"), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		txt3.setPosition(txt1.x,txt2.y+txt2.height+5);
		this.addChildToContainer(txt3);
		this._txt3 = txt3;

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 630;
		bg.setPosition(this.viewBg.width/2-bg.width/2, txt3.y+txt3.height+10);
		this.addChildToContainer(bg);

        let rect =  new egret.Rectangle(0, 0, bg.width-20, bg.height-10);
		let scrollList = ComponentManager.getScrollList(AcCrossPowerDbSub2ScrollItem, [], rect, {aid:this.vo.aid, code:this.code});
        scrollList.setPosition(bg.x+bg.width/2-rect.width/2, bg.y+5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;

		this.refreshView();
	}

    private refreshView():void
    {
        if (!this.vo)
        {
            return;
        }

		let arr = [];

		if(this.vo.upsid)
		{
			for(let item in this.vo.upsid)
			{
				arr.push({sid:item,score:this.vo.upsid[item]});
			}
			arr.sort((a:any,b:any)=>
			{
				return b.score - a.score;
			});
		}

		let keys = Api.servantVoApi.getServantInfoIdListWithSort(2);
		for(let i = 0; i < keys.length; i++)
		{
			if(this.vo.upsid && this.vo.upsid[keys[i]])
			{
				continue;
			}else
			{
				arr.push({sid:keys[i], score:0});
			}
		}

        this._scrollList.refreshData(arr, {aid:this.vo.aid, code:this.vo.code});  

		let obj = this.vo.getDbProcessObjByNum(1);
		if(obj)
		{
			if(obj["max"])
			{
				this._txt1.text = LanguageManager.getlocal("acCrossServerPowerDbAcTxt3Max",[obj["needNum"]+"",obj["needPower"]+""]);
			}else
			{
				this._txt1.text = LanguageManager.getlocal("acCrossServerPowerDbAcTxt3",[obj["needNum"]+"",obj["needPower"]+"",obj["curNum"]+"",obj["needNum"]+""]);
			}
		}
		obj = this.vo.getDbProcessObjByNum(2);
		if(obj)
		{
			if(obj["max"])
			{
				this._txt2.text = LanguageManager.getlocal("acCrossServerPowerDbAcTxt4Max",[obj["needNum"]+"",obj["needPower"]+""]);
			}else
			{
				this._txt2.text = LanguageManager.getlocal("acCrossServerPowerDbAcTxt4",[obj["needNum"]+"",obj["needPower"]+"",obj["curNum"]+"",obj["needNum"]+""]);
			}
		}
		obj = this.vo.getDbProcessObjByNum(3);
		if(obj)
		{
			if(obj["max"])
			{
				this._txt3.text = LanguageManager.getlocal("acCrossServerPowerDbAcTxt5Max",[obj["needNum"]+"",obj["needPower"]+""]);
			}else
			{
				this._txt3.text = LanguageManager.getlocal("acCrossServerPowerDbAcTxt5",[obj["needNum"]+"",obj["needPower"]+"",obj["curNum"]+"",obj["needNum"]+""]);
			}
		}		
    }

	protected getBgExtraHeight():number
	{
		return 20;
	}

	public dispose():void
	{
		super.dispose();
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this); 
		this._scrollList = null;
		this._txt1 = null;
		this._txt2 = null;
		this._txt3 = null;
	}
}