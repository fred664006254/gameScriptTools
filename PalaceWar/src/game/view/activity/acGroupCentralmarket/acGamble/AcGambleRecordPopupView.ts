/**
 * 赌坊下注记录
 * author qianjun
 */
class AcGambleRecordPopupView extends PopupView
{
	
	private _arr = [];
	// 滑动列表
	public constructor(){
		super();
    }
    private get cfg() : Config.AcCfg.GambleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcGambleVo{
        return <AcGambleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
	}
	
	protected getRequestData():{requestType:string,requestData:any}{	
		let view = this;
		if(0){
			
		}
		else{
			return {
				requestType : NetRequestConst.REQUST_ACTIVITY_GAMBLELOG,
				requestData : {
					activeId : view.acTivityId
				}
			};
		}
    }

    protected receiveData(rdata:any):void{
		let view = this;
		let data = rdata.data.data.logValue;
		view._arr = [];
		if(data){
			let curTime = view.vo.getCurTime();
			for(let i in data){
				if(data[i].reward){
					view._arr.push(data[i]);
				}
			}
			view._arr.sort((a,b)=>{
				return b.st - a.st;
			});
		}
	}

	public initView():void{		
		let view = this;
		let code = view.param.data.code;
		let contentBg = BaseBitmap.create("public_9_bg32");
		contentBg.width = 522;
		contentBg.height = 677;
		contentBg.x = view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 20;
		view.addChildToContainer(contentBg);
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,502,contentBg.height - 20);

		let scrollList = ComponentManager.getScrollList(GambleRecordItem,view._arr,rect,code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, contentBg, [0,10]);
		view.addChildToContainer(scrollList);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
			'accarnivalview_tab_red',
		]);
    }

	protected getTitleStr():string{
		return `acGambleRecordView-${this.param.data.code}`;
	}
	
	protected getShowHeight():number{
		return 800+10;
	}

	protected getShowWidth():number{
		return 565+GameData.popupviewOffsetX*2;
	}
	
    /**
	 * 获取活动配置
	 */
    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
    }

	public dispose():void{
		let view = this;
		view._arr = [];
		super.dispose();
	}
}