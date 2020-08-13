/**
 * 三国我的战报
 * author qianjun
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 * 
 */
class AcThreeKingdomsMyLogView extends PopupView{

    private _battlelog : any[] = [];

	public constructor() {
		super();
    }
    
    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
    }

    private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 1:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GETLIST,
            requestData:{
                activeId:this.vo.aidAndCode,
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.ret){ 
            if(data.data.data){
                let list = data.data.data.attacklist;
                if(list.length){//list.length
                    this.vo.listred = false;
                    if(list.length != this._battlelog.length){
                        this.vo.listred = true;
                    }
                    this._battlelog = list;
                }
            }
        } 
    }

	// 打开该面板时，需要传参数msg
	public initView():void{
        
		let bg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
        bg.width=530;
		bg.height=618;
		bg.x = 45;
		bg.y = 20;// GameConfig.stageHeigth - bg.height-240;
		this.addChildToContainer(bg);

		let rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, 610);
        let scrollList = ComponentManager.getScrollList(AcThreeKingdomsMyBattleLogItem, this._battlelog, rect, this.code);
        this.addChildToContainer(scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, bg);
        scrollList.setEmptyTip(LanguageManager.getlocal(`atkracedes3`));
	}


	protected resetBgSize():void{
		// this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
		super.resetBgSize();
    }
    // protected getShowWidth():number{
    //     return 640;
    // }

	protected isTouchMaskClose():boolean{
		return true;
    }
    
    protected getTitleStr(){
        return `acthreekingdomsmylog`;
    }


	public dispose():void{
        let view = this;
        view._battlelog = [];
		super.dispose();
	}
}