/**
 * 更新日志
 * author qianjun
 * 
 */
class UpdateNoticeView extends PopupView{

    private _arr = [];
    private _list : ScrollList = null;
    private _lastidx : number = 0;

	public constructor() {
		super();
    }

	protected getResourceList():string[]{	
        return super.getResourceList().concat([
            "update_cn",`updatenoticeview`
        ]);
    }

	protected isTouchMaskClose():boolean{
		return false;
    }

    protected getTitleStr(){
		return LangMger.getlocal(`menu_update`);
	}

	protected closeHandler(){
		super.closeHandler();
    }

    protected getBgName():string{
        return "ab_task_view_bg"
    }

	protected getShowHeight():number{
		return 841;
    }

    protected getMsgConstEventArr():string[]{
		return [
            MsgConst.UPDATELOG_SHOWIDX
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case MsgConst.UPDATELOG_SHOWIDX:
                view.showContent(evt);
                break;
        }
    }

	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
        view._arr = [];
        let arr = [];
        let count = 0;

        let data = RES.getRes(`update_cn`);
        for(let i in data){
            arr.push({
                key : i,
                content : data[i],
                show : count == 0 ? 1 : 0
            });
            ++ count;
        }
        view._arr = arr;

        let list = ComponentMgr.getScrollList(UpdateNoticeItem, arr, new egret.Rectangle(0,0,516,720));
        view.addChildToContainer(list);
        list.x = (this.getShowWidth() - list.width) / 2;
        list.y = 10;
        list.setEmptyTip(LangMger.getlocal(`updatelogtip1`));
        list.bounces = false;
        view._list = list;
        // let json = RES.getResByUrl(`/resource/config/language/${GameData.languageUsing}_update.json`, (data)=>{
        //     if(data){
                
        //     }
        // }, view);
    }

    private showContent(evt : egret.Event):void{
        let view = this;
        let idx = evt.data.idx;
        let show = evt.data.show;
        if(view._arr[view._lastidx]){
            view._arr[view._lastidx].show = 0;
        }
        view._arr[idx].show = 1;
        view._list.refreshData(view._arr);
        view._lastidx = idx;
    }

	protected resetBgSize():void{
        let view = this;
        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
        super.resetBgSize();
    }

	public hide(){		
		super.hide()
	}
    
	public dispose():void{
        let view = this;
        view._arr = [];
        view._list = null;
        view._lastidx = 0;
		super.dispose();
	}
}