
class BetheKingTaskPopupView extends PopupView
{	
	public constructor() {
		super();
	}

	private _aid:string;
	private _code:string;
	private _acVo:AcBeTheKingVo;
	private __scrollList:ScrollList
	protected initView():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_TASK,this.voteCallBackHandler,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_BEKING_TASK,this.refreshListFromVo,this);
		this._aid = this.param.data.aid;
		this._code = this.param.data.code;
		this._acVo = <AcBeTheKingVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);

		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		rankBg.width = 540;
		rankBg.height = 626;
		rankBg.setPosition(39,10);
		this.addChildToContainer(rankBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,rankBg.width-20,rankBg.height-20 );
		BetheKingTaskScrollItem._ACVO = this._acVo;
		
		let _scrollList = ComponentManager.getScrollList(BetheKingTaskScrollItem,[],rect);
		_scrollList.setPosition(rankBg.x + 10 ,rankBg.y + 10);
		this.addChildToContainer(_scrollList);
		this.__scrollList = _scrollList;
		this.refreshList();
	}

	private refreshList()
	{
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid , this._code);
		let tmpList = cfg.getTaskItemLists(this._acVo.getMaxTaskId());
		// tmpList 需要排序
		let list1 = [];//默认
		let list2 = [];//未解锁
		let list3 = [];//已完成
		for (var index = 0; index < tmpList.length; index++) {
			var element = tmpList[index];
			if(this._acVo.isgetTaskReward(element.stage)){
				list3.push(element);
			}else{
				if( element.unlock && !this._acVo.isgetTaskReward(element.unlock)){
					list2.push(element);
				}else{
					list1.push(element);
				}
			}
		}
		if(list2.length > 0){
			list2[0]["isFirst"] = 1;
		}
		let tarList = list1.concat(list2).concat(list3);
		this.__scrollList.refreshData(tarList);
	}
	private refreshListFromVo()
	{
		egret.Tween.get(this,{loop:false},).wait(300).call(this.refreshList,this);
	}
	protected voteCallBackHandler(event:egret.Event):void
	{
        let data:{ret:boolean,data:any}=event.data;
		let ret = data.data.ret;
		if(ret == 0 )
		{
			this.refreshListFromVo();//主要是走统一的延时处理
		}
	}


	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"collectflag","betheking_horn",
		]);
	}

	public dispose():void
	{	
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_TASK,this.voteCallBackHandler,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_BEKING_TASK,this.refreshListFromVo,this);

		this._aid = null;
		this._code = null;
		this._acVo = null;

		super.dispose();
	}
}