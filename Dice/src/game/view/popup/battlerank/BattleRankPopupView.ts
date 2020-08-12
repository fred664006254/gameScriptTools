/**
 * 对战排位
 * author qianjun
 * 
 */
class BattleRankPopupView extends PopupView{
    private _arr = [];

	public constructor() {
		super();
    }

	protected getResourceList():string[]{	
		let array:string[] = [];
        array.concat(super.getResourceList());
        let param = this.param.data;
		return array.concat([
            `battlelogview`,`public_rank1`,`public_rank2`,`public_rank3`,`public_rankbg`,
		]);
    }

    private get isWave():boolean{
        let param = this.param.data;
        return param == `pve`;
    }

	protected isTouchMaskClose():boolean{
		return false;
    }

    protected getTitleStr(){
		return LangMger.getlocal(this.isWave ? `menu_operation_rank` : `menu_fight_rank`);
	}

	protected closeHandler(){
		super.closeHandler();
    }

	protected getShowHeight():number{
		return 860;
    }

    protected getRequestData():{requestType:string,requestData:any}{
		return {
            requestType : this.isWave ? NetConst.BATTLE_GETPVERANK : NetConst.BATTLE_GETPVPRANK,
            requestData : {}
        };
    }
    
    protected netEventCallBack(evt:egret.Event){
        let data = evt.data;
        if(data && data.ret){
			let rdata = data.data.data;
			switch (data.data.cmd) {
				case NetConst.BATTLE_GETPVERANK:
                    this._arr = rdata.pveRank;
                    break;
                case NetConst.BATTLE_GETPVPRANK:
                    this._arr = rdata.pvpRank;
                    break;
				default:
					break;
			}
		}
    }

	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
        let listBg = BaseBitmap.create("ab_bird_infoattrbg");
        this.addChildToContainer(listBg);
        listBg.width = 498;
        listBg.height = 760;
        listBg.x = (this.getShowWidth() - listBg.width) / 2;
        listBg.y = 0;
        let arr = view._arr;
        let list = ComponentMgr.getScrollList(BattleRankInfoItem, arr, new egret.Rectangle(0,0,498,750), view.isWave);
        view.addChildToContainer(list);
        list.x = (this.getShowWidth() - list.width) / 2;
        list.y = 0;
        list.setEmptyTip(LangMger.getlocal(`ranktip1`));
        list.bounces = false;
    }

    // 背景图名称
    protected getBgName():string
    {
        return "ab_task_view_bg";
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
		super.dispose();
	}
}