/**
 * 战斗记录
 * author qianjun
 * 
 */
class BattleLogPopupView extends PopupView{
    private _list : ScrollList = null;

	public constructor() {
		super();
    }

    protected getNetConstEventArr():string[]{
		return [
            NetConst.BATTLE_COMPLAIN
		];
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
        array.concat(super.getResourceList());
        let param = this.param.data;
        //type 1对战 2协同
        let type = param.type;
		return array.concat([
            `battlelogview`,"joinwarinputbg",
		]);
    }

	protected isTouchMaskClose():boolean{
		return false;
    }

    protected getTitleStr(){
        let param = this.param.data;
        //type 1对战 2协同
        let type = param.type;
		return LangMger.getlocal(`menu_fight_history`);
	}

	protected closeHandler(){
		super.closeHandler();
    }

    // 背景图名称
    protected getBgName():string
    {
        return "ab_task_view_bg";
    }

	protected getShowHeight():number{
		return 841;
    }

    protected getRequestData():{requestType:string,requestData:any}{
		return {
            requestType : NetConst.BATTLE_GETLOG,
            requestData : {}
        };
    }
    
    protected netEventCallBack(evt:egret.Event){
        let data = evt.data;
        let view = this;
        if(data && data.ret){
            switch (data.data.cmd) {
				case NetConst.BATTLE_GETLOG:
                    break;
                case NetConst.BATTLE_COMPLAIN:
                    view.upgardeBack(evt);
                    break;
				default:
					break;
			}
		}
    }

	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
        let arr = Api.BattlelogVoApi.getbattleLog();
        let list = ComponentMgr.getScrollList(BattleLogItem, arr, new egret.Rectangle(0,0,520,740));
        view.addChildToContainer(list);
        list.x = (this.getShowWidth() - list.width) / 2;
        list.y = 0;
        list.setEmptyTip(LangMger.getlocal(`battlelogtip3`));
        list.bounces = false;
        view._list = list;
    }

    private upgardeBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                title : LangMger.getlocal("sysTip"),
                msg : LangMger.getlocal(`battlelogtip2`),
                needCancel : false,
                needClose : 1,
            });

            let idx = Api.BattlelogVoApi.getlastidx();
            let item = <BattleLogItem>view._list.getItemByIndex(idx);
            item.freshInfo();
        }
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
        view._list = null;
		super.dispose();
	}
}