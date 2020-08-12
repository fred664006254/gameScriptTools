/**
 * 加入房间
 * author qianjun
 * 
 */
class WarJoinRoomPopupView extends PopupView{

	private _end = false;
	private _roomTxt : BaseTextField = null;
	private _tipTxt : BaseTextField = null;
	private _showLoading : BaseBitmap = null;
	private _inputbg : BaseBitmap = null;
	private _iswait : boolean = false;

	public constructor() {
		super();
	}
	
	protected getNetConstEventArr():string[]{
		return [
            NetConst.BATTLE_FINDFRIEND
		];
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.BATTLE_FINDFRIEND:
                view.findResult(evt);
                break;
        }
    }

	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;

        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;
    }

    protected clickCancelHandler(data:any):void{
		let param = this.param;
        this._end = true;
		if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
		}
		this.hide();
	}

	protected isTouchMaskClose():boolean{
		return false;
	}
	
    protected getTitleStr(){
        let param = this.param.data;
		return LangMger.getlocal(`warwaitng2`);
	}
	
	// protected getCloseBtnName():string{
    //     return `popupview_closebtn${this.isWave ? `purple` : `red`}`;
    // }

	protected closeHandler(){
        let param = this.param;
         this._end = true;
        if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
		}
		super.closeHandler();
    }
    
    // protected getShowWidth():number{
	// 	return 552;
	// }

	protected getShowHeight():number{
		return 350;
	}

	public hide(){		
		super.hide()
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
		array.concat(super.getResourceList())
		return array.concat([
			`joinwarinputbg`,`joinwarpaste` 
		]);
	}

	protected getParent():egret.DisplayObjectContainer{
		if(this.param.data.inLayer){
			return this.param.data.inLayer;
		} 
		else{
			return super.getParent();
		}
	}
	
	protected resetBgSize():void{
        let view = this;
        view._end = false;
        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
		super.resetBgSize();

        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;
        let inputbg = BaseBitmap.create(`joinwarinputbg`);
        // let inputTextfield = ComponentMgr.getInputTextField(,);
        inputbg.width = 420;
        inputbg.height = 50;
        view.addChildToContainer(inputbg);
        inputbg.x = (view.viewBg.width - inputbg.width) / 2;
		inputbg.y = 15;
		view._inputbg = inputbg;

		let inputTxt = ComponentMgr.getInputTextField(ColorEnums.green,TextFieldConst.SIZE_CONTENT_SMALL_POPUP,inputbg.width,inputbg.height,``,LangMger.getlocal(`warcreateroomtip4`),ColorEnums.black);
		view.addChildToContainer(inputTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, inputTxt, inputbg);

		let roomTxt = <BaseTextField>inputTxt.getChildByName(`textField`);
		view._roomTxt = roomTxt;
		roomTxt.textColor = ColorEnums.white;
		roomTxt.bold = true;
        roomTxt.stroke = 1.5;
        roomTxt.strokeColor = ColorEnums.black;
		roomTxt.inputType = egret.TextFieldInputType.TEL;
		roomTxt.restrict = "/0-9/";
		// let pasteBtn = ComponentMgr.getButton(`joinwarpaste`, ``, ()=>{
		// 	//拷贝
		// 	let pasteEvent = new ClipboardEvent('paste', {dataType: 'text/plain', data: 'My string' } );
		// 	document.dispatchEvent(pasteEvent);
		// 	let input = document.createElement("input");
		// 	input.value = roomTxt.text;
		// 	document.body.appendChild(input);
		// 	input.select();
		// 	input.setSelectionRange(0, input.value.length),
		// 	document.execCommand('Paste');
		// 	document.body.removeChild(input);
		// 	App.CommonUtil.showTip(LangMger.getlocal("warcreateroomtip3"));
		// }, view);
		// view.addChildToContainer(pasteBtn);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, pasteBtn, inputbg), [0,0];

        let reloadImg = BaseBitmap.create(`reloading`);
        view.addChildToContainer(reloadImg);
        reloadImg.anchorOffsetX = reloadImg.width / 2;
        reloadImg.anchorOffsetY = reloadImg.height / 2;
        reloadImg.x = view.viewBg.width / 2; 
        reloadImg.y = 120;
		egret.Tween.get(reloadImg, {loop : true}).to({rotation : -360}, 1500);
		view._showLoading = reloadImg;
		reloadImg.visible = false;

        let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`warcreateroomtip5`), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.warnred);
        view.addChildToContainer(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, inputbg, [0,inputbg.height+20]);
		view._tipTxt = tipTxt;
		tipTxt.visible = false;

        //确认
        let confirmBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal(`confirmBtn`), ()=>{
			if(this._roomTxt.text == `` || this._roomTxt.text == LangMger.getlocal(`warcreateroomtip4`)){
				App.CommonUtil.showTip(LangMger.getlocal(`warcreateroomtip4`));
				return;
			}	
			// if(typeof Number(roomTxt.text) != `number`){
			// 	App.CommonUtil.showTip(LangMger.getlocal(`warcreateroomtip6`));
			// 	return;
			// }
			tipTxt.visible = false;
			reloadImg.visible = true;
			view.find();

		}, view, null, null, 28);
        view.addChildToContainer(confirmBtn);
        // confirmBtn.setTextPos(null,25);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, confirmBtn, tipTxt, [0,tipTxt.height+60]);
    }

    private _findTime:number=0;
	private _findTimeCount:number=-1;
	private _findNum:number=1;

	private find():void{
        if(this._end){
           if(this._findTimeCount!=-1){
			    egret.clearTimeout(this._findTimeCount);
			    this._findTimeCount=-1;
		    }
            return;
		}
        let param = this.param.data;
        //type 1对战 2协同
        let type = param.type;
		if(this._findTimeCount!=-1){
			egret.clearTimeout(this._findTimeCount);
			this._findTimeCount=-1;
		}
		this._findTime=egret.getTimer();
		NetManager.request(NetConst.BATTLE_FINDFRIEND,{
            findType:type,
			findNum:this._findNum,
			isCreate:0,
			passCode:Number(this._roomTxt.text)
		});
		this._findNum++;
	}

	// protected getTitleBgName():string{
    //     return `public_poptittle${this.isWave ? `purple` : `red`}`;
    // }

	private get isWave():boolean{
        let view = this;
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;
        return type == 2;
	}
	
    private findResult(e:egret.Event):void{
        let isSuccess:boolean=false;
        let param = this.param.data;
        //type 1对战 2协同
        let type = param.type;
		let rdata=e.data;
		if(rdata.ret){
			let result = rdata.data.data.matchFlag;
			if(result){
				isSuccess = true;	
				if(result == 1){
					if(rdata.data.data.randSeed){
                        BattleStatus.randSeed = rdata.data.data.randSeed;
                    }
					Api.BattleVoApi.startBattle(type);
					if(param.findcallback){
						param.findcallback.apply(param.handler,[this]);
					}
					this.hide();
				}
				else if(result == 2){
					App.CommonUtil.showTip(LangMger.getlocal(`warcreateroomtip8`));
				}
			}
			if(rdata.data.data.noThisRoom){
				isSuccess = true;
				App.CommonUtil.showTip(LangMger.getlocal(`warcreateroomtip6`));
				this._tipTxt.visible = true;
			}
		}
		if(!isSuccess){
			this._showLoading.visible = true;
			let t=egret.getTimer()-this._findTime;
			if(t>=980){
				this.find();
			}
			else{
				this._findTimeCount = egret.setTimeout(this.find,this,1000-t);
			}
		}
		else{
			this._showLoading.visible = false;
		}
    }
    
	public dispose():void{
		let view = this;
        view._findTime = 0;
        if(view._findTimeCount!=-1){
			egret.clearTimeout(view._findTimeCount);
			view._findTimeCount=-1;
		}
        view._findNum = 1;
		view._roomTxt = null;
		view._tipTxt = null;
		view._showLoading = null;
		view._iswait = false;
		super.dispose();
	}
}