/**
 * 防守消息
 */
class AcGroupWifeBattleVisitViewTab1 extends PopupViewTab
{

	public defenseList=[];
	public _scrollList: ScrollList=null;

	private noDataTxt:BaseTextField =null;
	public static AtkaceType:number =0;
    public constructor(data?) 
	{
		super();
		this.param = data;
		this.initView();
	}

	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }
	
	public initView():void
	{
		let bg= BaseBitmap.create("public_9_probiginnerbg");
		bg.width=516;
		bg.height=618;
		bg.x =25;
		bg.y =60;
		this.addChild(bg);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_ENERMY), this.freshlist, this);
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_ENERMY, {
			activeId : this.acTivityId
		});
		AcGroupWifeBattleVisitViewTab1.AtkaceType = 0;
	}

   public showList(): void 
   {
	
	   if(this._scrollList==null)
	   {
		    let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 640, 610);
			this._scrollList = ComponentManager.getScrollList(AcGroupWifeBattleVisitTab1Item, this.defenseList, rect);
			this.addChild(this._scrollList);
			this._scrollList.setPosition(-35, 60);
	   }
	}

	public freshlist(evt : egret.Event):void{

		if (evt.data.ret == false)
        {
            return;
        }

		if(evt.data.data.data && evt.data.data.data.dinfo){
			if(AcGroupWifeBattleVisitViewTab1.AtkaceType ==0){
				if (this._scrollList){
					this._scrollList.dispose();
					this._scrollList = null;
				}
				let dinfo = evt.data.data.data.dinfo;
				if(dinfo && dinfo.length>=1)
				{
					this.defenseList = dinfo;
					this.showList();

				}
				else 
				{
					//没有数据消息
					if(this.noDataTxt==null)
					{
						this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
						this.noDataTxt.text =LanguageManager.getlocal("atkracedes1");
						this.noDataTxt.x = 220;//rankImg.x+60
						if(PlatformManager.checkIsEnLang()){
							this.noDataTxt.x = 570 / 2 - this.noDataTxt.width / 2;
						}
						this.noDataTxt.y = 300;//rankImg.y+10;
					}
					this.addChild(this.noDataTxt);
				}	
			}
		}
		// NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
	}

    public dispose():void
	{

		this.noDataTxt  =null;
		this.defenseList =[];
		this._scrollList=null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_ENERMY), this.freshlist, this);
   		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
		AcGroupWifeBattleVisitViewTab1.AtkaceType =0;
		super.dispose();
   }
}